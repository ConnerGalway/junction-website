/**
 * Program sketcher rules (Custom Training, "Tell us who needs training").
 *
 * PLACEHOLDERS: the programs, lengths and session weeks need team approval.
 * Rules are checked top to bottom; the first match wins.
 */

export const WHO = [
  { id: "operators", label: "Operators in my region", noun: "operators" },
  { id: "leadership", label: "Our leadership team", noun: "leaders" },
  { id: "board", label: "Our board", noun: "board members" },
  { id: "staff", label: "Our staff", noun: "staff" },
] as const;

export const HOW = [
  { id: "in-person", label: "In person" },
  { id: "live-online", label: "Live online" },
  { id: "self-paced", label: "Self-paced" },
  { id: "mix", label: "A mix" },
] as const;

export const SIZE = [
  { id: "under-20", label: "Under 20", phrase: "for up to 20" },
  { id: "20-100", label: "20–100", phrase: "for 20–100" },
  { id: "100-500", label: "100–500", phrase: "for 100–500" },
  { id: "500-plus", label: "500+", phrase: "for 500+" },
] as const;

export type Who = (typeof WHO)[number]["id"];
export type How = (typeof HOW)[number]["id"];
export type Size = (typeof SIZE)[number]["id"];

export const DEFAULTS: { who: Who; how: How; size: Size } = { who: "operators", how: "mix", size: "100-500" };

export type Sketch = {
  title: string;
  weeks: number;
  /** Weeks with a live session (1-based). */
  live: number[];
  /** A self-paced course runs throughout. */
  course?: boolean;
};

type Rule = { who?: Who; how?: How; sketch: Sketch };

const RULES: Rule[] = [
  { who: "board", sketch: { title: "A board workshop", weeks: 1, live: [1] } },
  { how: "self-paced", sketch: { title: "A custom course on JunctionU", weeks: 4, live: [1], course: true } },
  { who: "operators", how: "mix", sketch: { title: "A webinar series plus a course on JunctionU", weeks: 6, live: [1, 3, 5], course: true } },
  { who: "operators", how: "in-person", sketch: { title: "A live workshop series for your operators", weeks: 4, live: [1, 3] } },
  { who: "operators", how: "live-online", sketch: { title: "A webinar series for your operators", weeks: 4, live: [1, 2, 3, 4] } },
  { who: "leadership", how: "in-person", sketch: { title: "A leadership program, in person", weeks: 8, live: [1, 3, 5, 7] } },
  { who: "leadership", how: "live-online", sketch: { title: "A leadership program, live online", weeks: 8, live: [1, 3, 5, 7] } },
  { who: "leadership", how: "mix", sketch: { title: "A leadership program, in person and online", weeks: 8, live: [1, 3, 5, 7] } },
  { who: "staff", how: "live-online", sketch: { title: "A webinar series", weeks: 4, live: [1, 2, 3, 4] } },
  { who: "staff", how: "in-person", sketch: { title: "A live workshop for your staff", weeks: 1, live: [1] } },
  { who: "staff", how: "mix", sketch: { title: "A webinar series plus a course on JunctionU", weeks: 6, live: [1, 3, 5], course: true } },
];

const FALLBACK: Sketch = { title: "A program built around your people", weeks: 6, live: [1, 3, 5] };

export function sketchProgram(who: Who, how: How): Sketch {
  return RULES.find((r) => (!r.who || r.who === who) && (!r.how || r.how === how))?.sketch ?? FALLBACK;
}

/** e.g. "About 6 weeks · 3 live sessions · course throughout · monthly reporting · for 100–500 operators" */
export function sketchSummary(sketch: Sketch, who: Who, size: Size) {
  const noun = WHO.find((w) => w.id === who)?.noun ?? "people";
  const phrase = SIZE.find((s) => s.id === size)?.phrase ?? "";
  const parts = [
    sketch.weeks === 1 ? "One week" : `About ${sketch.weeks} weeks`,
    `${sketch.live.length} live session${sketch.live.length === 1 ? "" : "s"}`,
    sketch.course ? "course throughout" : null,
    sketch.weeks > 1 ? "monthly reporting" : null,
    `${phrase} ${noun}`,
  ];
  return parts.filter(Boolean).join(" · ");
}
