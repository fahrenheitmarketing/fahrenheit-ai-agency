import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Public read path for blog posts. The BlogPost entity is admin-read-only, so this is the only
// way visitors get post data, and it only ever returns posts that are live right now:
// publish_at empty, or at/before the current time. Evaluated on every request.
const isLive = (p: any, now: number): boolean => {
  if (!p) return false;
  if (p.publish_at === undefined || p.publish_at === null || p.publish_at === '') return true;
  const t = new Date(p.publish_at).getTime();
  return !isNaN(t) && t <= now;
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { action, slug, category } = body || {};
    const now = Date.now();
    const posts = base44.asServiceRole.entities.BlogPost;

    if (action === 'list') {
      const items: any[] = await posts.list('-published_date', 100);
      return Response.json({ posts: items.filter((p) => isLive(p, now)) });
    }

    if (action === 'get') {
      if (typeof slug !== 'string' || !slug) return Response.json({ post: null, related: [] });
      let post: any = (await posts.filter({ slug }, { limit: 1 })).items[0] || null;
      if (!post) post = await posts.get(slug).catch(() => null);
      if (!isLive(post, now)) return Response.json({ post: null, related: [] });
      const rel = await posts.filter({ category: post.category }, { limit: 20 });
      const related = rel.items.filter((p: any) => p.id !== post.id && isLive(p, now)).slice(0, 3);
      return Response.json({ post, related });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('getBlogPosts error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}