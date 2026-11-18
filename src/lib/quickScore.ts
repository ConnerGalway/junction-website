/**
 * Quick score: questions, answers, weights and grade bands for the
 * Accelerator page's free quick check (src/app/accelerator/QuickScore.tsx).
 *
 * Questions written for any small business (review round). Conner may still
 * refine the questions, answers and scoring; everything that decides the
 * score lives in this file.
 *
 * Front-end demo only. Nothing is stored or sent (see QuickScore.tsx).
 */

export const AREAS = [
  "Marketing plan",
  "Channels",
  "Consistency",
  "Email list",
  "Tracking",
  "Time",
] as const;

export type Area = (typeof AREAS)[number];

export type Answer = {
  label: string;
  /** Points for a scored question (0–100). Context questions have none. */
  points?: number;
};

export type Question = {
  text: string;
  /** The area this question scores. Omitted for context questions. */
  area?: Area;
  answers: Answer[];
};

/** Added to every scored question. */
export const NOT_SURE: Answer = { label: "I'm not sure", points: 0 };

/**
 * Written for any small business (no rooms, guests or bookings): two context
 * questions and six scored ones, each worth 100 / 66 / 33 / 0.
 */
export const QUESTIONS: Question[] = [
  {
    text: "What kind of business are you?",
    answers: [
      { label: "Retail or online store" },
      { label: "Food, drink or hospitality" },
      { label: "Trades or professional services" },
      { label: "Something else" },
    ],
  },
  {
    text: "Do you have a written marketing plan?",
    area: "Marketing plan",
    answers: [
      { label: "Yes, and we follow it", points: 100 },
      { label: "Yes, but we rarely look at it", points: 66 },
      { label: "It's in my head", points: 33 },
      { label: "No plan yet", points: 0 },
    ],
  },
  {
    text: "Do you know which channels bring you customers?",
    area: "Channels",
    answers: [
      { label: "Yes, we know where each customer comes from", points: 100 },
      { label: "We have a good idea", points: 66 },
      { label: "We're mostly guessing", points: 33 },
      { label: "No idea", points: 0 },
    ],
  },
  {
    text: "How consistently do you post or share updates?",
    area: "Consistency",
    answers: [
      { label: "Every week, on a schedule", points: 100 },
      { label: "Most weeks", points: 66 },
      { label: "When someone has a spare minute", points: 33 },
      { label: "Hardly ever", points: 0 },
    ],
  },
  {
    text: "Do you collect customers' email addresses?",
    area: "Email list",
    answers: [
      { label: "Yes, and we email them regularly", points: 100 },
      { label: "Yes, but we rarely send anything", points: 66 },
      { label: "Only now and then", points: 33 },
      { label: "No", points: 0 },
    ],
  },
  {
    text: "Do you track the results of your marketing?",
    area: "Tracking",
    answers: [
      { label: "Yes, every month, with clear numbers", points: 100 },
      { label: "Now and then", points: 66 },
      { label: "We only look at sales", points: 33 },
      { label: "Not really", points: 0 },
    ],
  },
  {
    text: "How much time does marketing get each week?",
    area: "Time",
    answers: [
      { label: "A set block of time every week", points: 100 },
      { label: "A few hours, when we can", points: 66 },
      { label: "Whatever's left over", points: 33 },
      { label: "Almost none", points: 0 },
    ],
  },
  {
    text: "What do you most want from the next 90 days?",
    answers: [
      { label: "More customers" },
      { label: "Steadier sales through the year" },
      { label: "Less time spent on marketing" },
      { label: "A clear plan to follow" },
    ],
  },
];

/** The answers shown for a question (scored questions get "I'm not sure"). */
export function answersFor(question: Question): Answer[] {
  return question.area ? [...question.answers, NOT_SURE] : question.answers;
}

/** Score → grade letter. Checked top to bottom; the first match wins. */
export const GRADE_BANDS: { min: number; grade: string }[] = [
  { min: 85, grade: "A" },
  { min: 75, grade: "B+" },
  { min: 65, grade: "B" },
  { min: 55, grade: "B−" },
  { min: 45, grade: "C" },
  { min: 35, grade: "D+" },
  { min: 25, grade: "D" },
  { min: 0, grade: "F" },
];

/** Colour band for an area score: healthy (B and up), middling (C–B−), weak. */
export type ScoreBand = "healthy" | "middling" | "weak";

export const SCORE_BANDS: { min: number; band: ScoreBand }[] = [
  { min: 65, band: "healthy" },
  { min: 45, band: "middling" },
  { min: 0, band: "weak" },
];

export function gradeFor(score: number) {
  return GRADE_BANDS.find((b) => score >= b.min)?.grade ?? "F";
}

export function bandFor(score: number): ScoreBand {
  return SCORE_BANDS.find((b) => score >= b.min)?.band ?? "weak";
}

export type AreaResult = { area: Area; score: number; grade: string; band: ScoreBand };

export type QuickScoreResult = {
  /** Average of the six areas, rounded. */
  overall: number;
  areas: AreaResult[];
  /** The two weakest areas (ties keep the AREAS order). */
  gaps: [Area, Area];
};

/**
 * Score a full set of answers. `answers[i]` is the index of the answer
 * picked for QUESTIONS[i] (in answersFor order).
 */
export function scoreQuickCheck(answers: number[]): QuickScoreResult {
  const areas: AreaResult[] = AREAS.map((area) => {
    const scored = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.area === area);
    const points = scored.map(({ q, i }) => answersFor(q)[answers[i]]?.points ?? 0);
    const score = points.length ? Math.round(points.reduce((a, b) => a + b, 0) / points.length) : 0;
    return { area, score, grade: gradeFor(score), band: bandFor(score) };
  });
  const overall = Math.round(areas.reduce((sum, a) => sum + a.score, 0) / areas.length);
  const [first, second] = [...areas].sort((a, b) => a.score - b.score);
  return { overall, areas, gaps: [first.area, second.area] };
}
