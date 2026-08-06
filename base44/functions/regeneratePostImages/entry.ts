import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { PLATFORM_IMAGE_COMPOSITION } from '../../shared/platformConfig.ts';
import { buildBrandImagePrompt } from '../../shared/brandImagePrompt.ts';
import { resizeImageToPlatform } from '../../shared/imageResizer.ts';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    // Fetch all posts that need image regeneration (pending_approval or draft)
    const body = await req.json().catch(() => ({}));
    const { post_ids } = body;

    let posts;
    if (post_ids && post_ids.length > 0) {
      posts = await Promise.all(
        post_ids.map((id: string) => base44.asServiceRole.entities.SocialMediaPost.get(id))
      );
    } else {
      const pending = await base44.asServiceRole.entities.SocialMediaPost.filter(
        { status: 'pending_approval' }, '-created_date', 100
      );
      const drafts = await base44.asServiceRole.entities.SocialMediaPost.filter(
        { status: 'draft' }, '-created_date', 100
      );
      posts = [...pending, ...drafts];
    }

    let updated = 0;
    let failed = 0;

    // Process in batches of 5 to avoid overwhelming the image API
    const batchSize = 5;
    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);

      // For posts without a stored image_prompt, generate one via LLM
      const postsNeedingPrompt = batch.filter((p: any) => !p.image_prompt);
      if (postsNeedingPrompt.length > 0) {
        try {
          const contextStr = postsNeedingPrompt.map((p: any, idx: number) =>
            `[Post ${idx + 1}] Topic: ${p.topic}\nPlatform: ${p.platform}\nContent: ${p.content}`
          ).join('\n\n');

          const promptResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: `You are a creative director at a digital marketing agency. For each social media post below, write a concise, vivid visual scene description (1-2 sentences) that a photographer or AI image generator could use to create a compelling image that directly illustrates the post's topic.

The image must be visually relevant to the specific topic — NOT a generic "people in an office" shot. Think about what visual would actually represent the subject matter. For example: if the topic is about voice search, show someone speaking to a smart speaker; if about email marketing, show a beautifully designed email on a phone screen; if about data analytics, show an abstract data visualization.

Return one image_prompt per post, matching the order given.

${contextStr}`,
            response_json_schema: {
              type: 'object',
              properties: {
                prompts: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      topic: { type: 'string' },
                      image_prompt: { type: 'string' }
                    },
                    required: ['topic', 'image_prompt']
                  }
                }
              },
              required: ['prompts']
            }
          });

          for (const item of (promptResult.prompts || [])) {
            const post = postsNeedingPrompt.find((p: any) => p.topic === item.topic);
            if (post && item.image_prompt) {
              post.image_prompt = item.image_prompt;
            }
          }
        } catch (llmErr) {
          console.error('LLM prompt generation failed:', llmErr);
        }
      }

      await Promise.all(batch.map(async (post: any) => {
        try {
          const subjectPrompt = post.image_prompt || `A visual representation of ${post.topic}`;
          const composition = PLATFORM_IMAGE_COMPOSITION[post.platform] || '';
          const prompt = buildBrandImagePrompt(subjectPrompt, post.platform, post.topic, composition);
          console.log(`Generating image for ${post.platform}/${post.topic}`);
          const result = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });

          if (!result || !result.url) {
            throw new Error('No image URL returned from GenerateImage');
          }

          let finalUrl = result.url;
          try {
            finalUrl = await resizeImageToPlatform(
              result.url,
              post.platform,
              async (file: Blob) => {
                const uploadResult = await base44.asServiceRole.integrations.Core.UploadFile({ file });
                return uploadResult.file_url;
              }
            );
          } catch (resizeErr) {
            console.warn(`Resize failed for ${post.platform}/${post.topic}, using original:`, resizeErr);
          }

          await base44.asServiceRole.entities.SocialMediaPost.update(post.id, {
            image_url: finalUrl,
            image_prompt: post.image_prompt || subjectPrompt,
          });
          updated++;
        } catch (err) {
          console.error(`Image regen failed for post ${post.id} (${post.platform}/${post.topic}): ${err?.message || err}`);
          failed++;
        }
      }));
    }

    return Response.json({
      status: 'success',
      total: posts.length,
      updated,
      failed,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}