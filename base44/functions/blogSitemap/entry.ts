import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Mirrors src/lib/siteConfig.js (SITE_URL) and src/lib/blogUtils.js (categoryToServiceSlug).
// Functions cannot import from src/, so keep these in sync with those files.
const SITE_URL = 'https://www.fahrenheitmarketing.com';
const categoryToServiceSlug: Record<string, string> = {
  'SEO': 'seo',
  'Data & Analytics': 'seo',
  'Heat Mapping & UX': 'cro',
  'Conversion Rate Optimization': 'cro',
  'AI-Assisted PPC': 'sem',
  'AI-Enabled Development': 'software-development',
  'Strategy & Growth': 'strategy',
  'Social Media & Influencer': 'smm',
  'UX & Accessibility': 'software-development',
};

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const toIsoDate = (v: unknown): string | null => {
  if (!v) return null;
  const d = new Date(v as string);
  return isNaN(d.getTime()) ? null : d.toISOString();
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const posts: any[] = [];
    let cursor: string | undefined = undefined;
    do {
      const page: any = await base44.asServiceRole.entities.BlogPost.list(cursor ? { sort: '-created_date', limit: 200, cursor } : { sort: '-created_date', limit: 200 });
      const items = Array.isArray(page) ? page : page.items || [];
      posts.push(...items);
      cursor = !Array.isArray(page) && page.has_more ? page.next_cursor : undefined;
    } while (cursor);

    const urls = posts
      .map((p) => {
        const serviceSlug = categoryToServiceSlug[p.category] || 'blog';
        const postSlug = p.slug || p.id;
        const loc = escapeXml(`${SITE_URL}/services/${serviceSlug}/${postSlug}`);
        const lastmod = toIsoDate(p.updated_date) || toIsoDate(p.published_date);
        return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}