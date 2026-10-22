import { getBlogPostUrl } from '@/lib/blogUtils';

export const SITE_URL = 'https://fahrenheit.fmkt.agency';
export const SITE_NAME = 'Fahrenheit AI Agency';
export const SITE_LOGO = 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/0b10edc43_logo.png';

const TITLE_MAX = 60;
const DESC_MAX = 155;

// Cut at the last full word within max characters; no ellipsis or trailing punctuation.
function cutAtWord(text, max) {
  const t = (text || '').trim();
  if (t.length <= max) return t;
  let cut = t.slice(0, max);
  if (!/\s/.test(t[max])) {
    const i = cut.lastIndexOf(' ');
    if (i > 0) cut = cut.slice(0, i);
  }
  return cut.replace(/[\s,;:.\-–—!?]+$/, '');
}

export function buildTitle(post) {
  const title = (post.title || '').trim();
  const candidates = [
    post.seo_title && post.seo_title.trim(),
    `${title} | ${SITE_NAME}`,
    title.includes(':') ? `${title.split(':')[0].trim()} | ${SITE_NAME}` : null,
    title,
  ];
  const fit = candidates.find((c) => c && c.length <= TITLE_MAX);
  return fit || cutAtWord(title, TITLE_MAX);
}

export function buildDescription(post) {
  if (post.meta_description && post.meta_description.trim()) return post.meta_description.trim();
  return cutAtWord(post.excerpt || '', DESC_MAX);
}

export function buildPostSeo(post) {
  const title = buildTitle(post);
  const description = buildDescription(post);
  const url = `${SITE_URL}${getBlogPostUrl(post)}`;
  const image = SITE_LOGO;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url,
    image,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: SITE_LOGO },
    },
  };
  if (description) jsonLd.description = description;
  if (post.published_date) jsonLd.datePublished = post.published_date;
  if (post.updated_date) jsonLd.dateModified = post.updated_date;
  if (post.author) jsonLd.author = { '@type': 'Person', name: post.author };

  return { title, description, url, image, jsonLd };
}