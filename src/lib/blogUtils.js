// Maps BlogPost category to its service URL segment
export const categoryToServiceSlug = {
  'SEO': 'seo',
  'Data & Analytics': 'seo',
  'Heat Mapping & UX': 'cro',
  'Conversion Rate Optimization': 'cro',
  'AI-Assisted PPC': 'sem',
  'AI-Enabled Development': 'software-development',
  'Strategy & Growth': 'strategy',
  'Social Media & Influencer': 'smm',
};

// Returns the canonical URL for a blog post
export function getBlogPostUrl(post) {
  const serviceSlug = categoryToServiceSlug[post.category] || 'blog';
  const postSlug = post.slug || post.id;
  return `/services/${serviceSlug}/${postSlug}`;
}