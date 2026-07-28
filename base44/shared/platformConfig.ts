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