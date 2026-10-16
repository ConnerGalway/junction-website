/**
 * Tourism Industry Scan: the landing page (/junctionu/industry-scan) and its
 * ScanPreview. Content is from the August 2026 issue. The Scan itself is
 * being redesigned, so the preview will be updated later; everything it
 * shows lives here.
 *
 * NEW COPY for team review: the page lead, section lines and FAQ.
 * PLACEHOLDERS: "[ … ]" FAQ answers; the subscription link and team
 * pricing are TODOs.
 */

/** TODO: link to the Scan subscription / checkout (no Scan sign-up exists in the codebase yet). */
export const SCAN_SUBSCRIBE_URL = "/contact";
export const SCAN_LATEST = { label: "Read August's issue →", href: "https://scan.elearningu.com/august-2026/" };
export const SCAN_PRICE = "$30";

/** The executive briefing video (Descript). The embed loads only when someone presses play. */
export const SCAN_VIDEO = {
  share: "https://share.descript.com/view/VovW2dgYr34",
  embed: "https://share.descript.com/embed/VovW2dgYr34",
  byline: "Conner Galway · latest issue",
};

export const SCAN_ISSUE = {
  month: "August 2026",
  meta: "Monthly intelligence report for Canadian DMO leaders",
  title: "Tourism Industry Scan · August 2026",
};

export const SCAN_TABS = ["Overview", "Key trends", "Insights", "Stats", "Actions", "Reading"] as const;
export type ScanTab = (typeof SCAN_TABS)[number];

export const SCAN_OVERVIEW = {
  heading: "What changed this month",
  items: [
    { label: "Channels", text: "Short-form video is now the primary discovery channel: 70% of Gen Z and Millennials find destinations through TikTok and Reels." },
    { label: "Influencers", text: "Micro-influencers outperform every paid channel: $6 average ROI per $1 spent, 5% booking conversion." },
    { label: "Operations", text: "94% of social messages go unanswered." },
  ],
  tiles: [
    { value: "70%", label: "find destinations through short video" },
    { value: "$6", label: "ROI per $1 on micro-influencers" },
    { value: "94%", label: "of social messages unanswered" },
    { value: "34 PTS", label: "drop in DMOs prioritizing awareness" },
  ],
};

export const SCAN_TRENDS = [
  "Short-form video is the new discovery channel",
  "DMOs shift from brand to performance",
  "Micro-influencers outperform every paid channel",
  "Montreal's marketing playbook: Reality TV campaign drives record results",
  "The response gap: 94% of social messages go unanswered",
];

export const SCAN_INSIGHTS = [
  { value: "70%", label: "of Gen Z and Millennials find destinations through TikTok and Reels" },
  { value: "340%", label: "reach advantage of a 15-second behind-the-scenes reel over a professional property tour" },
  { value: "82%", label: "of travellers trust creator recommendations over traditional advertising" },
  { value: "94%", label: "of social messages go unanswered" },
  { value: "34 pts", label: "drop in DMOs prioritizing awareness (59% to 25%) in one year" },
];

export const SCAN_STATS = [
  { value: "5.91%", label: "YouTube Shorts engagement" },
  { value: "$6.50", label: "ROI per $1 on micro-influencers" },
  { value: "12.5M", label: "projected Montreal visitors" },
  { value: "47%", label: "of DMOs running full-funnel campaigns" },
];

export const SCAN_ACTIONS = [
  "Shift to short-form video as your primary content format",
  "Test micro-influencer partnerships with long-term relationship goals",
  "Audit your social response rate and set a 24-hour reply target",
  "Run full-funnel campaigns that connect awareness to booking",
  "Test TikTok Travel Ads for full-funnel conversion",
  "Study the Montreal model",
];

export const SCAN_READING = [
  "Sojern State of Destination Marketing 2026",
  "TikTok Travel Category Insights 2026",
  "Evok Destination Influencer Marketing Guide",
  "Dash Social Benchmarks 2026",
  "Tourisme Montreal / Strategy Magazine",
  "Sprout Social Industry Benchmarks",
  "Destination Canada performance data",
  "Influencer Marketing Hub Benchmark 2026",
];

/** Built for the boardroom. `mark` is set in Fern Oswald 700, or Bebas when it's a number. */
export const SCAN_FEATURES = [
  { mark: "⌘K", numeric: false, title: "Search the whole report", line: "Find any trend, stat, action or source instantly, without leaving the page." },
  { mark: "●●○", numeric: false, title: "Source confidence ratings", line: "Know which numbers are solid enough to lead with at your board meeting." },
  { mark: "2025", numeric: true, title: "Compare last year", line: "Toggle prior-year data on the charts to see exactly what shifted." },
  { mark: "→", numeric: false, title: "Evidence + action", line: "Every recommended action shows its evidence and a move for your week." },
];

/** FAQ. Answers are placeholders. */
export const SCAN_FAQ = [
  { q: "Who is the Scan for?", a: "[ Answer to come ]" },
  { q: "What sources do you use?", a: "[ Answer to come ]" },
  { q: "When does each issue come out?", a: "[ Answer to come ]" },
  { q: "Can my whole team read it?", a: "[ Answer to come ]" },
  { q: "How do I cancel?", a: "[ Answer to come ]" },
];
