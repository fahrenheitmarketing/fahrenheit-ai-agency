// Shared platform configuration for social media content functions
export const PLATFORM_DIMENSIONS = {
  facebook: '1080x1350 pixels, vertical portrait 4:5 aspect ratio',
  instagram: '1080x1350 pixels, vertical portrait 4:5 aspect ratio',
  linkedin: '1200x627 pixels, wide horizontal landscape banner format',
};

// ClickUp user IDs for task assignment and approval tracking
export const STEVEN_BOSCH_ID = 81933967; // Head of Marketing — can approve Copy + Design
export const NICK_ERASMUS_ID = 43160121; // Head of Design — can approve Design only

// ClickUp configuration
export const CLICKUP_TEAM_ID = '30952573';
export const CLICKUP_LIST_ID = '162976350'; // Fahrenheit Marketing > Tasks list
export const PARENT_TASK_ID = '86ajr7570'; // "FM - Agentic Social Posts [Parent]"
export const BRAND_DOC_ID = 'xgk3x-20813'; // "FM Brand Identity Document" on ClickUp

// Tags applied to every social media child task
export const CLICKUP_TAGS = [
  'agentic content',
  'content',
  'collateral',
  'design',
  'fm',
  'marketing',
  'organic social',
  'qa',
  'social media',
];

// Helper: calculate start_date (1st) and due_date (5th) of the current month as Unix ms timestamps
export function getMonthlyTaskDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const startDate = new Date(Date.UTC(year, month, 1)).getTime();
  const dueDate = new Date(Date.UTC(year, month, 5, 23, 59, 59)).getTime();
  return { startDate, dueDate };
}

// 1 hour in milliseconds
export const ONE_HOUR_MS = 3600000;

// Social media publishing targets
export const FACEBOOK_PAGE_ID = '121996364508916'; // Fahrenheit Marketing Facebook page
export const LINKEDIN_ORG_ID = '1042077'; // Fahrenheit Marketing LinkedIn company page
export const INSTAGRAM_IG_USER_ID = null; // Fetched dynamically from Instagram API

// Platform-specific shortlinks — only include when relevant to post content
// Instagram NEVER has links in the copy
export const SHORTLINKS: Record<string, { label: string; url: string }[]> = {
  linkedin: [
    { label: 'Promo2', url: 'b.link/LPR21-FM' },
    { label: 'Software Development', url: 'b.link/LSD1-FM' },
    { label: 'Marketing Automation', url: 'b.link/LMA1-FM' },
    { label: 'CRO', url: 'b.link/LCRO1-FM' },
    { label: 'Social Media', url: 'b.link/LSMM1-FM' },
    { label: 'SEM/PPC', url: 'b.link/LSEM1-FM' },
    { label: 'SEO', url: 'b.link/LSEO1-FM' },
    { label: 'Strategy', url: 'b.link/LST1-FM' },
    { label: 'Contact', url: 'b.link/LC1-FM' },
    { label: 'Pricing', url: 'b.link/LP1-FM' },
    { label: 'Home', url: 'b.link/LH1-FM' },
  ],
  facebook: [
    { label: 'Promo2', url: 'b.link/FPR21-FM' },
    { label: 'Software Development', url: 'b.link/FSD1-FM' },
    { label: 'Marketing Automation', url: 'b.link/FMA1-FM' },
    { label: 'CRO', url: 'b.link/FCRO1-FM' },
    { label: 'Social Media', url: 'b.link/FSMM1-FM' },
    { label: 'SEM/PPC', url: 'b.link/FSEM1-FM' },
    { label: 'SEO', url: 'b.link/FSEO1-FM' },
    { label: 'Strategy', url: 'b.link/FST1-FM' },
    { label: 'Contact', url: 'b.link/FC1-FM' },
    { label: 'Pricing', url: 'b.link/FP1-FM' },
    { label: 'Home', url: 'b.link/FH1-FM' },
  ],
  instagram: [],
};

// Helper: calculate next month's publish dates per platform
// LinkedIn: Mon-Fri (5 days/week = 20 dates), Facebook & Instagram: Tue & Thu (2 days/week = 8 dates each)
export function getPublishDatesByPlatform(): { linkedin: string[]; facebook: string[]; instagram: string[] } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const targetYear = month === 11 ? year + 1 : year;
  const targetMonth = month === 11 ? 0 : month + 1;

  const linkedin: string[] = [];
  const facebook: string[] = [];
  const instagram: string[] = [];

  const day = new Date(Date.UTC(targetYear, targetMonth, 1));
  // Find first Monday
  while (day.getUTCDay() !== 1) {
    day.setUTCDate(day.getUTCDate() + 1);
  }
  // Collect 4 weeks
  for (let week = 0; week < 4; week++) {
    const monday = new Date(day);
    monday.setUTCDate(day.getUTCDate() + week * 7);

    const tue = new Date(monday); tue.setUTCDate(monday.getUTCDate() + 1);
    const wed = new Date(monday); wed.setUTCDate(monday.getUTCDate() + 2);
    const thu = new Date(monday); thu.setUTCDate(monday.getUTCDate() + 3);
    const fri = new Date(monday); fri.setUTCDate(monday.getUTCDate() + 4);

    // LinkedIn: Mon, Tue, Wed, Thu, Fri
    linkedin.push(formatDate(monday), formatDate(tue), formatDate(wed), formatDate(thu), formatDate(fri));
    // Facebook & Instagram: Tue, Thu
    facebook.push(formatDate(tue), formatDate(thu));
    instagram.push(formatDate(tue), formatDate(thu));
  }
  return { linkedin, facebook, instagram };
}

function formatDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}