import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  PLATFORM_DIMENSIONS,
  STEVEN_BOSCH_ID,
  NICK_ERASMUS_ID,
  CLICKUP_TEAM_ID,
  PARENT_TASK_ID,
  BRAND_DOC_ID,
  CLICKUP_TAGS,
  SHORTLINKS,
  getNextMonthPublishDates,
  ONE_HOUR_MS,
} from '../../shared/platformConfig.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const batchId = `batch_${Date.now()}`;
    const now = new Date();
    const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

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
        brandGuidelines = (pages || []).map((p: any) => p.content || '').join('\n\n');
      }
    } catch (err) {
      console.error('Failed to fetch brand doc:', err);
    }

    // 1. Fetch existing topics to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.SocialMediaPost.list('-created_date', 200);
    const usedTopics = existingPosts.map((p: any) => p.topic).filter(Boolean);

    // 2. Calculate next month's Mon/Wed/Fri publish dates (12 dates)
    const publishDates = getNextMonthPublishDates();

    // 3. Build shortlink reference string for the prompt
    const shortlinkRef = Object.entries(SHORTLINKS)
      .filter(([platform, links]) => links.length > 0)
      .map(([platform, links]) => {
        const linkStr = links.map(l => `${l.url} (${l.label})`).join(', ');
        return `${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${linkStr}`;
      })
      .join('\n');

    // 4. Research trends + generate 36 posts in one LLM call (web search enabled)
    const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are an expert social media manager for Fahrenheit Marketing, a digital marketing agency specializing in AI-first marketing.

Research the latest trends in AI-first digital marketing, SEO best practices, PPC advertising, and general AI technology.

Then create a FULL MONTH of social media content: 12 posts for EACH of these 3 platforms (36 posts total), spread across the upcoming month.

PUBLISH SCHEDULE (use these exact dates — 3 posts per week per platform):
${publishDates.map((d, i) => `Date ${i + 1}: ${d}`).join('\n')}

Each of the 3 platforms posts on ALL 12 dates. That means on each date, there are 3 posts (one per platform).

CRITICAL RULES:
- On any given date, ALL 3 platforms must cover DIFFERENT topics — a user following all 3 platforms should never see the same topic 3 times in one day
- Never repeat topics across platforms or within a platform
- Every post must include a clear CTA
- Facebook: 1-2 sentences, conversational, community-focused, 1-2 emojis max, encourage discussion
- Instagram: 1-2 sentences + 5-10 hashtags, visual-first, trendy, emoji-friendly, punchy hook — NEVER include links in the copy
- LinkedIn: 3-4 sentences, professional thought-leadership, no emojis, data-driven, industry insights

SHORTLINKS (use ONLY when the post naturally references a service we offer or a relevant page on our website):
${shortlinkRef}
- Instagram: NEVER include any links in the copy
- Only include a shortlink when the post content genuinely relates to the linked page — do not force links
- Place the shortlink naturally at the end of the post or as part of the CTA

${usedTopics.length > 0 ? `\nPreviously used topics (DO NOT repeat these or similar angles): ${usedTopics.join(', ')}\n` : ''}
${brandGuidelines ? `\nBRAND GUIDELINES (from the FM Brand Identity Document on ClickUp — follow these strictly for tone, style, messaging, and visual direction):\n${brandGuidelines}\n` : ''}

Return the research summary and all 36 posts. Each post must include: platform, topic, content, image_prompt, proposed_publish_date (one of the dates listed above), and shortlink (the short link URL used, or null if none).`,
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
                image_prompt: { type: 'string' },
                proposed_publish_date: { type: 'string', description: 'YYYY-MM-DD' },
                shortlink: { type: 'string', description: 'The short link URL used, or null if none' }
              }
            }
          }
        },
        required: ['research_summary', 'posts']
      }
    });

    const { research_summary, posts } = llmResult;

    // 5. Generate images for all posts in parallel
    const images = await Promise.all(
      posts.map(async (post: any) => {
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

    // 6. Save all posts to SocialMediaPost entity
    const postsToCreate = posts.map((post: any, i: number) => ({
      platform: post.platform,
      content: post.content,
      image_url: images[i],
      topic: post.topic,
      status: 'pending_approval',
      batch_id: batchId,
      research_summary: research_summary,
      proposed_publish_date: post.proposed_publish_date,
    }));
    const createdPosts = await base44.asServiceRole.entities.SocialMediaPost.bulkCreate(postsToCreate);

    // 7. Create ONE ClickUp task for the entire batch
    let clickupTaskUrl = null;
    try {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection('clickup');
      const listId = Deno.env.get('CLICKUP_LIST_ID');

      if (accessToken && listId) {
        const platforms = ['facebook', 'instagram', 'linkedin'];
        let description = `# Social Media Posts — ${monthYear}\n\n## Research Summary\n${research_summary}\n`;
        for (const platform of platforms) {
          const platformPosts = createdPosts.filter((p: any) => p.platform === platform);
          if (platformPosts.length === 0) continue;
          description += `\n## ${platform.charAt(0).toUpperCase() + platform.slice(1)} Posts\n`;
          for (const post of platformPosts) {
            description += `\n### ${post.topic}\n📅 ${post.proposed_publish_date || 'TBD'}\n${post.content}\nImage: ${post.image_url || 'N/A'}\n`;
          }
        }
        description += `\n---\nStatus: Pending Approval\nAssignees: Steven (Copy + Design), Nick (Design)\nComment "Approved for Publish" or "Approved for Schedule" to approve. Comment with changes to request revisions.`;

        const { startDate, dueDate } = getMonthlyTaskDates();
        const taskResp = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `FM - Agentic Social Posts ${monthYear}`,
            description,
            assignees: [STEVEN_BOSCH_ID, NICK_ERASMUS_ID],
            parent: PARENT_TASK_ID,
            tags: CLICKUP_TAGS,
            start_date: String(startDate),
            due_date: String(dueDate),
            time_estimate: String(ONE_HOUR_MS),
          }),
        });
        const taskData = await taskResp.json();

        if (taskData.id) {
          clickupTaskUrl = `https://app.clickup.com/t/${taskData.id}`;

          // Ensure tags are applied (fallback if create task body didn't accept them)
          if (!taskData.tags || taskData.tags.length === 0) {
            for (const tagName of CLICKUP_TAGS) {
              try {
                await fetch(
                  `https://api.clickup.com/api/v2/task/${taskData.id}/tag/${encodeURIComponent(tagName)}`,
                  { method: 'POST', headers: { 'Authorization': `Bearer ${accessToken}` } }
                );
              } catch (tagErr) {
                console.error(`Tag add failed for "${tagName}":`, tagErr);
              }
            }
          }

          // Attach all images to the task
          await Promise.all(createdPosts.map(async (post: any) => {
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
      publish_dates: publishDates,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});