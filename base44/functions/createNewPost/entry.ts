import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  PLATFORM_IMAGE_COMPOSITION,
  APPROVED_LOGOS,
  LOGO_INSTRUCTION,
  SHORTLINKS,
} from '../../shared/platformConfig.ts';
import { resizeImageToPlatform } from '../../shared/imageResizer.ts';
import { buildBrandImagePrompt } from '../../shared/brandImagePrompt.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const { based_on_post_id } = body;

    let platform = 'linkedin';
    let existingTopic = '';
    let researchSummary = '';

    if (based_on_post_id) {
      const sourcePost = await base44.asServiceRole.entities.SocialMediaPost.get(based_on_post_id);
      platform = sourcePost.platform;
      existingTopic = sourcePost.topic;
      researchSummary = sourcePost.research_summary || '';
    }

    // Fetch existing topics to avoid repetition
    const existingPosts = await base44.asServiceRole.entities.SocialMediaPost.list('-created_date', 200);
    const usedTopics = existingPosts.map((p: any) => p.topic).filter(Boolean);

    const shortlinkRef = Object.entries(SHORTLINKS)
      .filter(([p, links]) => links.length > 0 && p === platform)
      .map(([p, links]) => {
        const linkStr = links.map(l => `${l.url} (${l.label})`).join(', ');
        return `${p.charAt(0).toUpperCase() + p.slice(1)}: ${linkStr}`;
      })
      .join('\n');

    const platformGuidelines = {
      facebook: '1-2 sentences, conversational, community-focused, 1-2 emojis max, encourage discussion',
      instagram: '1-2 sentences + 5-10 hashtags, visual-first, trendy, emoji-friendly, punchy hook — NEVER include links in the copy',
      linkedin: '3-4 sentences, professional thought-leadership, no emojis, data-driven, industry insights',
    };

    const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are an expert social media manager for Fahrenheit Marketing, a digital marketing agency specializing in AI-first marketing.

Create ONE new social media post for **${platform}**.

${existingTopic ? `The original post was about "${existingTopic}" — create a DIFFERENT post on a related but distinct angle, or a completely new topic.` : ''}

Platform guidelines: ${platformGuidelines[platform]}
Every post must include a clear CTA.

${shortlinkRef ? `SHORTLINKS (use ONLY when the post naturally references a service we offer):\n${shortlinkRef}\n` : ''}
${platform === 'instagram' ? '- Instagram: NEVER include any links in the copy\n' : ''}
${usedTopics.length > 0 ? `Previously used topics (DO NOT repeat these): ${usedTopics.join(', ')}\n` : ''}

Return the post with: platform, topic, content, image_prompt (a concise vivid visual scene description directly illustrating the topic — NOT a generic office scene), and shortlink (the URL used or null).`,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          posts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                platform: { type: 'string', enum: ['facebook', 'instagram', 'linkedin'] },
                topic: { type: 'string' },
                content: { type: 'string' },
                image_prompt: { type: 'string' },
                shortlink: { type: 'string' }
              }
            }
          }
        },
        required: ['posts']
      }
    });

    const post = llmResult.posts[0];
    if (!post) {
      return Response.json({ error: 'No post generated' }, { status: 500 });
    }

    // Generate image
    const composition = PLATFORM_IMAGE_COMPOSITION[platform] || '';
    const brandPrompt = buildBrandImagePrompt(post.image_prompt, platform, post.topic, composition);
    const imgResult = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt: brandPrompt });

    let finalUrl = imgResult.url;
    try {
      finalUrl = await resizeImageToPlatform(
        imgResult.url,
        platform,
        async (file: Blob) => {
          const uploadResult = await base44.asServiceRole.integrations.Core.UploadFile({ file });
          return uploadResult.file_url;
        }
      );
    } catch (resizeErr) {
      console.warn('Resize failed, using original:', resizeErr);
    }

    const created = await base44.asServiceRole.entities.SocialMediaPost.create({
      platform: post.platform,
      content: post.content,
      image_url: finalUrl,
      image_prompt: post.image_prompt,
      topic: post.topic,
      status: 'pending_approval',
      batch_id: `single_${Date.now()}`,
      research_summary: researchSummary || 'Single post generation',
    });

    return Response.json({
      status: 'success',
      post: created,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});