/**
 * Marketing strategy page content (src/app/(site)/marketing-strategy/).
 *
 * The hero shelf is ILLUSTRATIVE (no client details). Each item can be
 * replaced by a designed image: public/images/marketing-strategy/<n>.jpg,
 * where n is the item's position (1 = first). Checked at build time.
 * PLACEHOLDERS: the engagement length and the Kootenay Rockies number.
 */

export type ShelfCover = {
  kind: "cover";
  /** Cover colour: Newsprint, gold (accent-1, Carbon text) or Carbon. */
  tone: "newsprint" | "gold" | "carbon";
  meta: string;
  title: string;
};

export type ShelfSpread = {
  kind: "spread";
  meta: string;
  title: string;
  /** Right page: a small bar chart, or a big Bebas figure with a caption. */
  right: { chart: number[] } | { figure: string; caption: string };
};

export type ShelfItem = ShelfCover | ShelfSpread;

export const SHELF: ShelfItem[] = [
  { kind: "cover", tone: "newsprint", meta: "Research · Volume 1", title: "Traveller Insights Study" },
  { kind: "spread", meta: "Traveller profiles", title: "Who visits, and why they come back", right: { chart: [38, 62, 46, 84, 57] } },
  { kind: "cover", tone: "gold", meta: "Strategy · Five-year plan", title: "Destination Marketing Strategy" },
  { kind: "spread", meta: "Investment priorities", title: "Where next year's budget goes", right: { figure: "4", caption: "priorities, ranked by return" } },
  { kind: "cover", tone: "carbon", meta: "Handover", title: "Operating Model & Playbook" },
  { kind: "spread", meta: "Operating model", title: "Who runs what, every quarter", right: { chart: [70, 45, 88, 60] } },
];

/** How a strategy engagement works. */
export const PHASES = [
  {
    title: "Research foundation",
    line: "We tailor the process, goals and outcomes to your organization through interviews and planning sessions.",
    output: "Project plan: guidelines, milestones, deliverables",
  },
  {
    title: "Data collection",
    line: "Visitor data, traveller profiles, insights from neighbouring DMOs and search trends, gathered and analyzed.",
    output: "Data summary, and a database with an AI assistant",
  },
  {
    title: "Strategy and recommendations",
    line: "Insights turned into positioning, investment priorities and the moves worth making, in plain language.",
    output: "Strategy report your board can read",
  },
  {
    title: "Implementation support",
    line: "Quarterly reviews: progress, updated planning, feedback on execution and changes in the market.",
    output: "Quarterly review session and report",
  },
];

/** TODO: the typical engagement length. */
export const ENGAGEMENT_LINE = "[ TYPICAL LENGTH ] · SCOPED TO YOU";

/** Built around your year: the phase of each month, and the legend. */
export type YearPhase = "research" | "board" | "season" | "funding";

export const MONTHS: { label: string; phase: YearPhase }[] = [
  { label: "Jan", phase: "research" },
  { label: "Feb", phase: "research" },
  { label: "Mar", phase: "board" },
  { label: "Apr", phase: "board" },
  { label: "May", phase: "season" },
  { label: "Jun", phase: "season" },
  { label: "Jul", phase: "season" },
  { label: "Aug", phase: "season" },
  { label: "Sep", phase: "season" },
  { label: "Oct", phase: "funding" },
  { label: "Nov", phase: "research" },
  { label: "Dec", phase: "research" },
];

export const YEAR_LEGEND: { phase: YearPhase; title: string; line: string }[] = [
  { phase: "research", title: "Research and planning", line: "Timed so findings land before your annual plan." },
  { phase: "board", title: "Board reporting", line: "Numbers ready for your fiscal year-end." },
  { phase: "season", title: "Season in market", line: "Support while your campaigns run." },
  { phase: "funding", title: "Funding and RFPs", line: "We help you scope, apply and respond." },
];

/** Real regions. Real numbers. */
export const PROOF = [
  { meta: "Travel Yukon · Training", value: "300+", line: "Businesses through Travel Yukon's Go Digital program in four years.", href: "/work#case-yukon" },
  { meta: "Ontario's Southwest · Research", value: "2026", line: "Ontario's Southwest tourism strategy, driven by our traveller research.", href: "/work#case-osw" },
  // TODO: the Kootenay Rockies number.
  { meta: "Kootenay Rockies · Strategy", value: "[ # ]", line: "Kootenay Rockies: marketing operations rebuilt around what works.", href: "/work#case-kootenay" },
];
