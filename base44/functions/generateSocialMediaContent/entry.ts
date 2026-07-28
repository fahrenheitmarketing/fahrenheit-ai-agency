import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const PLATFORM_DIMENSIONS = {
  facebook: '1080x1350 pixels, vertical portrait 4:5 aspect ratio',
  instagram: '1080x1350 pixels, vertical portrait 4:5 aspect ratio',
  linkedin: '1200x627 pixels, wide horizontal landscape banner format',
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const batchId = `batch_${Date.now()}`;

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

    // 5. Create ClickUp tasks for each post
    let clickupCreated = 0;
    try {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection('clickup');
      const listId = Deno.env.get('CLICKUP_LIST_ID');

      if (accessToken && listId) {
        const taskResults = await Promise.all(
          createdPosts.map(async (post) => {
            try {
              const response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: `[${post.platform}] ${post.topic}`,
                  description: `${post.content}\n\n---\nImage: ${post.image_url || 'N/A'}\nStatus: Pending Approval`,
                  status: 'Open',
                }),
              });
              const data = await response.json();
              if (data.id) {
                await base44.asServiceRole.entities.SocialMediaPost.update(post.id, { clickup_task_id: data.id });
                return data;
              }
              return null;
            } catch (err) {
              console.error(`ClickUp task creation failed for ${post.topic}:`, err);
              return null;
            }
          })
        );
        clickupCreated = taskResults.filter(t => t && t.id).length;
      }
    } catch (err) {
      console.error('ClickUp connection failed:', err);
    }

    return Response.json({
      status: 'success',
      batch_id: batchId,
      posts_created: createdPosts.length,
      clickup_tasks_created: clickupCreated,
      research_summary: research_summary,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});