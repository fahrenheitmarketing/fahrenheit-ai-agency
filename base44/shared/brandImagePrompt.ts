/**
 * Builds a brand-compliant image prompt that uses the post's actual subject
 * (from the LLM-generated image_prompt or topic+content) rather than forcing
 * a fixed scene. Brand style constraints are applied as a style layer.
 *
 * Brand Reference Guide (Edition 1.2):
 * - Colors: Ink #1C1917, Cream #F8F5F1, Ember #E64D1E, Stone #796D67
 * - NEVER: upward-scaling arrows, warm/saturated grades, handshakes, celebrations,
 *   text or logos rendered into photographs, invented statistics, decorative screen content
 */
export function buildBrandImagePrompt(subjectPrompt: string, platform: string, topic: string, composition: string): string {
  const dimensionConstraint = {
    facebook: 'Output dimensions: 1080x1350 pixels',
    instagram: 'Output dimensions: 1080x1350 pixels',
    linkedin: 'Output dimensions: 1200x627 pixels',
  }[platform] || 'Output dimensions: 1080x1350 pixels';

  return `Subject: ${subjectPrompt}

Style: Photorealistic, editorial marketing photography. Soft natural daylight with a slightly cool color grade. Color palette: deep near-black Ink (#1C1917) for dark areas, Cream (#F8F5F1) for light surfaces, with a single Ember (#E64D1E) accent element. Clean, minimal, modern aesthetic. The visual must directly and clearly depict the subject described above — it must be relevant to and illustrative of the post topic "${topic}".

Constraints: No upward-scaling arrows, no generic stock photo clichés, no celebrations, no handshakes, no high-fives, no warm or saturated color grades, no posed group shots facing camera. No text, logos, overlays, watermarks, or written elements anywhere on the image. ${composition}. ${dimensionConstraint}.`;
}