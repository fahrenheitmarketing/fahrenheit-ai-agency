import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { PLATFORM_IMAGE_COMPOSITION, APPROVED_LOGOS } from '../../shared/platformConfig.ts';
import { resizeImageToPlatform } from '../../shared/imageResizer.ts';

/**
 * Brand-compliant image prompt following FM Brand Reference Guide Edition 1.2.
 * Six-part photographic structure: shot type, casting, action, setting, mood & light, constraints.
 * NEVER: upward-scaling arrows, warm/saturated grades, handshakes, celebrations, text or logos in photos.
 * Colors: Ink #1C1917, Cream #F8F5F1, Ember #E64D1E accent.
 */
function buildBrandImagePrompt(platform: string, topic: string): string {
  const composition = PLATFORM_IMAGE_COMPOSITION[platform] || '';
  const dimensionConstraint = platform === 'linkedin'
    ? 'Output dimensions: 1200x627 pixels'
    : 'Output dimensions: 1080x1350 pixels';

  // Vary casting across topics for batch consistency (as per brand guide p.32)
  const castings = [
    'a CMO in her 40s (South Asian) and a CFO in his 30s (Black)',
    'a marketing director in her 50s (Latina) and an engineering lead in his 30s (white)',
    'a CEO in his 40s (East Asian) and a CMO in her 30s (Black)',
    'a CFO in her 40s (white) and a marketing director in his 50s (Middle Eastern)',
    'a strategy lead in her 30s (South Asian) and a CEO in his 50s (Latino)',
  ];
  // Use topic length as a stable but varied index
  const casting = castings[topic.length % castings.length];

  return `A photorealistic shot of ${casting} reviewing ${topic.toLowerCase()} analytics on a large monitor in a modern glass-walled office with clean architectural lines, minimal furniture, and floor-to-ceiling windows. Relevant data visualizations — cost curves, ROAS trend lines, or spend-by-channel breakdowns — appear softly blurred on a background screen. Their body language conveys focused scrutiny and deliberate assessment — pointing at data, taking notes, quiet realization. The mood is analytically confident and deliberate. Soft natural daylight, slightly cool color grade. Deep near-black backgrounds (#1C1917), clean surfaces (#F8F5F1), single accent detail (#E64D1E). Absolutely no upward-scaling arrows, no generic stock photo clichés, no celebrations, no handshakes, no high-fives, no warm or saturated color grades, no posed group shots facing camera. No text, logos, overlays, watermarks, or written elements anywhere on the image. ${composition}. ${dimensionConstraint}.`;
}

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
      // Regenerate specific posts
      posts = await Promise.all(
        post_ids.map((id: string) => base44.asServiceRole.entities.SocialMediaPost.get(id))
      );
    } else {
      // Regenerate all pending/draft posts
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
      await Promise.all(batch.map(async (post: any) => {
        try {
          const prompt = buildBrandImagePrompt(post.platform, post.topic);
          console.log(`Generating image for ${post.platform}/${post.topic}`);
          // Generate photographic image — brand guide states no logos/text in photographic images
          const result = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt });

          if (!result || !result.url) {
            throw new Error('No image URL returned from GenerateImage');
          }

          // Attempt resize; fall back to original URL on canvas failure
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