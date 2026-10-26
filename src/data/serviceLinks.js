// Central internal-link map. Anchor text is descriptive on purpose.
export const SERVICES = {
  seo: { to: '/services/seo', anchor: 'AI-powered SEO services', blurb: 'Technical SEO, content and local search that earn qualified organic traffic.' },
  sem: { to: '/services/sem', anchor: 'AI-assisted PPC and search advertising', blurb: 'Paid search campaigns that are tested, tuned and reported against revenue.' },
  smm: { to: '/services/smm', anchor: 'social media marketing management', blurb: 'Social content, community and paid social that build an engaged audience.' },
  cro: { to: '/services/cro', anchor: 'conversion rate optimization', blurb: 'Heat maps, testing and UX fixes that turn more visitors into leads.' },
  strategy: { to: '/services/strategy', anchor: 'digital marketing strategy consulting', blurb: 'A clear, data-backed plan that connects channels to business goals.' },
  automation: { to: '/services/marketing-automation', anchor: 'marketing automation services', blurb: 'Automated follow-up and lead nurturing that run without manual effort.' },
  dev: { to: '/services/software-development', anchor: 'AI-enabled software and web development', blurb: 'Fast, accessible websites and custom tools built by senior developers.' },
  email: { to: '/services/email-marketing', anchor: 'managed cold email marketing', blurb: 'Deliverability-first outbound email that fills your pipeline.' },
  hosting: { to: '/services/managed-hosting', anchor: 'managed hosting and cybersecurity', blurb: 'Secure, monitored hosting with backups, updates and 2FA included.' },
};

// Each service page links to related service pages (every service receives 2+ inbound links).
export const RELATED_BY_SERVICE = {
  seo: ['cro', 'strategy', 'dev'],
  sem: ['cro', 'seo', 'strategy'],
  smm: ['strategy', 'email', 'sem'],
  cro: ['seo', 'dev', 'sem'],
  strategy: ['seo', 'sem', 'automation'],
  automation: ['email', 'cro', 'strategy'],
  dev: ['hosting', 'cro', 'seo'],
  email: ['automation', 'sem', 'smm'],
  hosting: ['dev', 'seo', 'automation'],
};

// Blog category -> service pages (3 links per post).
export const SERVICES_BY_CATEGORY = {
  'SEO': ['seo', 'strategy', 'cro'],
  'Data & Analytics': ['strategy', 'cro', 'seo'],
  'Heat Mapping & UX': ['cro', 'dev', 'seo'],
  'Conversion Rate Optimization': ['cro', 'sem', 'dev'],
  'AI-Assisted PPC': ['sem', 'cro', 'strategy'],
  'AI-Enabled Development': ['dev', 'hosting', 'automation'],
  'Strategy & Growth': ['strategy', 'seo', 'sem'],
  'Social Media & Influencer': ['smm', 'strategy', 'email'],
  'UX & Accessibility': ['dev', 'cro', 'seo'],
};
export const DEFAULT_BLOG_SERVICES = ['strategy', 'seo', 'cro'];

// Contact form "Service Interest" options — every service in the site's Services menu.
export const SERVICE_OPTIONS = [
  { value: 'strategy', label: 'Strategic Planning' },
  { value: 'seo', label: 'SEO' },
  { value: 'sem', label: 'SEM / PPC' },
  { value: 'smm', label: 'Social Media Marketing' },
  { value: 'cro', label: 'Conversion Rate Optimization' },
  { value: 'automation', label: 'Marketing Automation' },
  { value: 'software-development', label: 'Software Development' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'hosting', label: 'Managed Hosting & Security' },
  { value: 'general', label: 'General Inquiry' },
];