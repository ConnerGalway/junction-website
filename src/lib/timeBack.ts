/**
 * "What is that job costing you?" calculator on the Offload page
 * (src/app/ai-accelerator/TimeBackCalculator.tsx).
 *
 * PLACEHOLDERS: the jobs, defaults, ranges and "what we'd build" lines are
 * pending team approval. Everything the calculator shows lives here.
 *
 * Front-end demo only. Nothing is stored or sent.
 */

export type Job = {
  /** Shown in the sentence ("on [quotes]") and the result title. */
  label: string;
  /** What we'd build for it. */
  build: string;
  /** One placeholder line about the build. */
  line: string;
};

export const JOBS: Job[] = [
  { label: "Quotes", build: "A quote generator", line: "[ Drafts quotes in your format from a short job description. ]" },
  { label: "Collections", build: "A collections assistant", line: "[ Drafts reminders in your voice from the aging report. ]" },
  { label: "Invoices", build: "An invoice matching assistant", line: "[ Matches POs, invoices and packing slips for you to check. ]" },
  { label: "Scheduling", build: "A scheduling assistant", line: "[ Proposes schedules from your bookings and crew availability. ]" },
  { label: "Follow-ups", build: "A follow-up assistant", line: "[ Drafts the follow-up after every job or visit. ]" },
  { label: "Reporting", build: "An automated weekly report", line: "[ Pulls the week's numbers into one report, ready on Monday. ]" },
  { label: "Something else", build: "A tool built around your bottleneck", line: "[ We pick the build together in Week 0. ]" },
];

export type Range = { min: number; max: number; step: number };

/** Hours a week, per person. */
export const HOURS: Range = { min: 1, max: 40, step: 1 };
/** People doing the job. */
export const PEOPLE: Range = { min: 1, max: 50, step: 1 };
/** Hourly cost per person, including overhead ($). */
/** Slider steps by 5; the number field takes any whole dollar amount. */
export const RATE: Range = { min: 20, max: 300, step: 5 };

export const DEFAULTS = { hours: 6, people: 3, rate: 45, job: 0 };

export const WEEKS_PER_YEAR = 52;

export function yearlyHours(hours: number, people: number) {
  return hours * people * WEEKS_PER_YEAR;
}
