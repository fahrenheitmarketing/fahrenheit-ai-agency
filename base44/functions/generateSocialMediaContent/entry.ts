import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { PLATFORM_DIMENSIONS, STEVEN_BOSCH_ID, NICK_ERASMUS_ID, CLICKUP_TEAM_ID, PARENT_TASK_ID, BRAND_DOC_ID } from '../../shared/platformConfig.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const batchId = `batch_${Date.now()}`;
    const monthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // 0. Fetch brand guidelines from ClickUp doc
    let brandGuidelines = '';
    try {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection('clickup');
      const pagesResp = await fetch(
        `https://api.clickup.com/api/v3/workspaces/${CLICKUP_TEAM_ID}/docs/${BRAND_DOC_ID}/pages`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      );
      if (pagesResp.ok) {
        const pages = await pagesResp.json();
        brandGuidelines = (pages || []).map(p => p.content || '').join('\n\n');
      }
    } catch (err) {
      console.error('Failed to fetch brand doc:', err);
    }

    // 1. Fetch existing topics to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.SocialMediaPost.list('-created_date', 200);
    const usedTopics = existingPosts.map(p => p.topic).filter(Boolean);

    // 2. Research trends + generate 12 posts in one LLM call (web search enabled)
    const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are an expert social media manager for Fahrenheit Marketing, a digital marketing agency specializing in AI-first marketing.

Research the latest trends in AI-first digital marketing, SEO best practices, PPC advertising, and general AI technology.

Then create 4 unique social media posts for EACH of these 3 platforms (12 posts total):
- Facebook: conversational, community-focused, 1-2 emojis max, encourage discussion
- Instagram: visual-first, trendy, emoji-friendly, 5-10 hashtags, punchy hook
- LinkedIn: professional thought-leadership, no emojis, data-driven, industry insights

CRITICAL RULES:
- Each platform must cover 4 DISTINCTLY different topics
- Never repeat topics across platforms
- Every post must include a clear CTA
- Facebook: 1-2 sentences, Instagram: 1-2 sentences + hashtags, LinkedIn: 3-4 sentences
${usedTopics.length > 0 ? `\nPreviously used topics (DO NOT repeat these or similar angles): ${usedTopics.join(', ')}` : ''}

Also provide a detailed image_prompt for each post describing a visually striking image to accompany the content.
${brandGuidelines ? `\nBRAND GUIDELINES (from the FM Brand Identity Document on ClickUp — follow these strictly for tone, style, messaging, and visual direction):\n${brandGuidelines}` : ''}

Return the research summary and all 12 posts.`,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          research_summary: { type: 'string' },
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                platform: { type: 'string', enum: ['facebook', 'instagram', 'linkedin'] },
                topic: { type: 'string' },
                content: { type: 'string' },
                image_prompt: { type: 'string' }
              }
            }
          }
        },
        required: ['research_summary', 'posts']
      }
    });

    const { research_summary, posts } = llmResult;

    // 3. Generate images for all posts in parallel
    const images = await Promise.all(
      posts.map(async (post) => {
        try {
          const dims = PLATFORM_DIMENSIONS[post.platform] || 'square format';
          const result = await base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: `${post.image_prompt}. Image dimensions: ${dims}. Professional, eye-catching, high-quality digital marketing visual.`
          });
          return result.url;
        } catch (err) {
          console.error(`Image generation failed for ${post.platform}/${post.topic}:`, err);
          return null;
        }
      })
    );

    // 4. Save all posts to SocialMediaPost entity
    const postsToCreate = posts.map((post, i) => ({
      platform: post.platform,
      content: post.content,
      image_url: images[i],
      topic: post.topic,
      status: 'pending_approval',
      batch_id: batchId,
      research_summary: research_summary,
    }));
    const createdPosts = await base44.asServiceRole.entities.SocialMediaPost.bulkCreate(postsToCreate);

    // 5. Create ONE ClickUp task for the entire batch
    let clickupTaskUrl = null;
    try {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection('clickup');
      const listId = Deno.env.get('CLICKUP_LIST_ID');

      if (accessToken && listId) {
        // Build task description with all posts grouped by platform
        const platforms = ['facebook', 'instagram', 'linkedin'];
        let description = `# Social Media Posts — ${monthYear}\n\n## Research Summary\n${research_summary}\n`;
        for (const platform of platforms) {
          const platformPosts = createdPosts.filter(p => p.platform === platform);
          if (platformPosts.length === 0) continue;
          description += `\n## ${platform.charAt(0).toUpperCase() + platform.slice(1)} Posts\n`;
          for (const post of platformPosts) {
            description += `\n### ${post.topic}\n${post.content}\nImage: ${post.image_url || 'N/A'}\n`;
          }
        }
        description += `\n---\nStatus: Pending Approval\nAssignees: Steven (Copy + Design), Nick (Design)\nComment "Approved for Publish" or "Approved for Schedule" to approve. Comment with changes to request revisions.`;

        // Create the task as a child of the parent task
        const taskResp = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `FM - Social Posts ${monthYear}`,
            description,
            assignees: [STEVEN_BOSCH_ID, NICK_ERASMUS_ID],
            parent: PARENT_TASK_ID,
          }),
        });
        const taskData = await taskResp.json();

        if (taskData.id) {
          clickupTaskUrl = `https://app.clickup.com/t/${taskData.id}`;

          // Attach all images to the task
          await Promise.all(createdPosts.map(async (post) => {
            if (!post.image_url) return;
            try {
              const imageResp = await fetch(post.image_url);
              const imageBlob = await imageResp.blob();
              const formData = new FormData();
              formData.append('file', imageBlob, `image_${post.platform}_${post.topic}.png`);
              await fetch(`https://api.clickup.com/api/v2/task/${taskData.id}/attachment`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
                body: formData,
              });
            } catch (attachErr) {
              console.error(`Image attachment failed for ${post.topic}:`, attachErr);
            }
          }));

          // Update all posts with the same clickup_task_id
          await base44.asServiceRole.entities.SocialMediaPost.updateMany(
            { batch_id: batchId },
            { $set: { clickup_task_id: taskData.id } }
          );
        }
      }
    } catch (err) {
      console.error('ClickUp task creation failed:', err);
    }

    return Response.json({
      status: 'success',
      batch_id: batchId,
      posts_created: createdPosts.length,
      clickup_task_url: clickupTaskUrl,
      research_summary: research_summary,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});