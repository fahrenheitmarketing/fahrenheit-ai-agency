// Simple per-key call limiter backed by the RateLimit entity (one record per key).
export function clientIp(req: Request): string {
  const h = req.headers;
  const direct = h.get('cf-connecting-ip') || h.get('x-real-ip');
  if (direct) return direct.trim();
  return (h.get('x-forwarded-for') || 'unknown').split(',')[0].trim() || 'unknown';
}

// Returns true if the call is allowed, false once `max` calls were made within `windowSec`.
// deno-lint-ignore no-explicit-any
export async function allow(base44: any, key: string, max: number, windowSec: number): Promise<boolean> {
  const db = base44.asServiceRole.entities.RateLimit;
  const now = Date.now();

  // Occasionally clear records whose window ended more than a day ago.
  if (Math.random() < 0.02) {
    await db.deleteMany({ window_start: { $lt: now - 86400000 } });
  }

  // Plain query (no options) returns the same shape on every SDK version used by the functions.
  const found = await db.filter({ key });
  const rec = (Array.isArray(found) ? found : found?.items || [])[0];
  if (!rec) {
    await db.create({ key, window_start: now, count: 1 });
    return true;
  }
  if (now - rec.window_start >= windowSec * 1000) {
    await db.update(rec.id, { window_start: now, count: 1 });
    return true;
  }
  if (rec.count >= max) return false;
  await db.update(rec.id, { count: rec.count + 1 });
  return true;
}