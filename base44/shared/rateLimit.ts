// Per-key call limiter backed by the RateLimit entity.
// Each call writes its own record, then counts the records in the window. Creating a record is
// atomic, so a burst of simultaneous requests cannot all read the same stale number and slip past.
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

  // Occasionally clear records older than a day (the longest window used is one day).
  if (Math.random() < 0.02) {
    await db.deleteMany({ window_start: { $lt: now - 2 * 86400000 } });
  }

  const mine = await db.create({ key, window_start: now, count: 1 });

  const query = { key, window_start: { $gte: now - windowSec * 1000 } };
  const list = async () => {
    const found = await db.filter(query);
    return Array.isArray(found) ? found : found?.items || [];
  };
  const used = typeof db.count === 'function' ? await db.count(query) : (await list()).length;
  if (used <= max) return true;

  // Over the limit. When several attempts land at the same moment, the earliest `max` still pass.
  const rows = (await list()).sort((a, b) =>
    String(a.created_date).localeCompare(String(b.created_date)) || String(a.id).localeCompare(String(b.id)));
  const rank = rows.findIndex((r) => r.id === mine.id);
  if (rank >= 0 && rank < max) return true;

  // Blocked: drop this attempt's record so a blocked caller does not keep the counter inflated.
  await db.delete(mine.id).catch(() => {});
  return false;
}