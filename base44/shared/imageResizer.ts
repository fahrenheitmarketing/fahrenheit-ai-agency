import { PLATFORM_RESIZE_DIMENSIONS } from './platformConfig.ts';

/**
 * Resizes an AI-generated image to platform-specific dimensions using a "cover crop" strategy.
 * Scales the source to cover the target aspect ratio, then center-crops the excess.
 *
 * Falls back to the original URL if the environment lacks canvas APIs or any step fails,
 * so image generation never breaks even if resizing is unavailable.
 */
export async function resizeImageToPlatform(
  imageUrl: string,
  platform: string,
  uploadFn: (file: Blob) => Promise<string>
): Promise<string> {
  const dims = PLATFORM_RESIZE_DIMENSIONS[platform];
  if (!dims) return imageUrl;

  // Guard: canvas APIs may not exist in all Deno sandbox versions
  if (typeof createImageBitmap === 'undefined' || typeof OffscreenCanvas === 'undefined') {
    console.warn('Canvas APIs unavailable — skipping image resize');
    return imageUrl;
  }

  try {
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();

    const bitmap = await createImageBitmap(blob);
    const srcW = bitmap.width;
    const srcH = bitmap.height;

    // Calculate source crop region for "cover" strategy
    const targetAspect = dims.width / dims.height;
    const srcAspect = srcW / srcH;

    let sx: number, sy: number, sWidth: number, sHeight: number;

    if (srcAspect > targetAspect) {
      // Source is wider than target → crop horizontally (left/right)
      sHeight = srcH;
      sWidth = Math.round(srcH * targetAspect);
      sx = Math.round((srcW - sWidth) / 2);
      sy = 0;
    } else {
      // Source is taller than target → crop vertically (top/bottom)
      sWidth = srcW;
      sHeight = Math.round(srcW / targetAspect);
      sx = 0;
      sy = Math.round((srcH - sHeight) / 2);
    }

    const canvas = new OffscreenCanvas(dims.width, dims.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, sx, sy, sWidth, sHeight, 0, 0, dims.width, dims.height);

    const resizedBlob = await canvas.convertToBlob({ type: 'image/png' });
    const newUrl = await uploadFn(resizedBlob);
    return newUrl;
  } catch (err) {
    console.error(`Image resize failed for ${platform}:`, err);
    return imageUrl;
  }
}