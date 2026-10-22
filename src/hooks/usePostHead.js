import { useEffect } from 'react';
import { buildPostSeo, SITE_NAME } from '@/lib/postSeo';

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  const created = !el;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return { el, created };
}

// Sets <title>, meta, canonical and BlogPosting JSON-LD for a post; restores on unmount.
export default function usePostHead(post) {
  useEffect(() => {
    if (!post) return undefined;
    const seo = buildPostSeo(post);
    const prevTitle = document.title;
    const touched = [];

    const setMeta = (attr, key, content) => {
      if (!content) return;
      const { el, created } = upsert(`meta[${attr}="${key}"]`, () => {
        const m = document.createElement('meta');
        m.setAttribute(attr, key);
        return m;
      });
      touched.push({ el, created, prev: created ? null : el.getAttribute('content') });
      el.setAttribute('content', content);
    };

    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:image', seo.image);
    setMeta('property', 'og:url', seo.url);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);

    const canonical = upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
    const prevHref = canonical.created ? null : canonical.el.getAttribute('href');
    canonical.el.setAttribute('href', seo.url);

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.setAttribute('data-post-jsonld', 'true');
    ld.text = JSON.stringify(seo.jsonLd);
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      touched.forEach(({ el, created, prev }) => {
        if (created) el.remove();
        else if (prev !== null) el.setAttribute('content', prev);
      });
      if (canonical.created) canonical.el.remove();
      else if (prevHref !== null) canonical.el.setAttribute('href', prevHref);
      ld.remove();
    };
  }, [post]);
}