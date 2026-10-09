/**
 * Quick score: questions, answers, weights and grade bands for the
 * Accelerator page's free quick check (src/app/accelerator/QuickScore.tsx).
 *
 * PLACEHOLDER CONTENT: Conner will replace the questions, answers and
 * scoring. Everything that decides the score lives in this file.
 *
 * Front-end demo only. Nothing is stored or sent (see QuickScore.tsx).
 */

export const AREAS = [
  "Website",
  "Reviews",
  "Booking",
  "Social",
  "Customer experience",
  "Local visibility",
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

export const QUESTIONS: Question[] = [
  {
    text: "What kind of business are you?",
    answers: [
      { label: "Accommodation" },
      { label: "Food and drink" },
      { label: "Tours and activities" },
      { label: "Retail or services" },
    ],
  },
  {
    text: "How does your website look on a phone?",
    area: "Website",
    answers: [
      { label: "Great: fast and easy to use", points: 100 },
      { label: "Fine, but a bit slow or fiddly", points: 66 },
      { label: "Hard to use on a phone", points: 33 },
      { label: "We don't have a website", points: 0 },
    ],
  },
  {
    text: "How do most customers book with you today?",
    area: "Booking",
    answers: [
      { label: "Online, in a few clicks", points: 100 },
      { label: "Online, but it takes a few steps", points: 66 },
      { label: "By phone or email", points: 33 },
      { label: "There's no clear way to book", points: 0 },
    ],
  },
  {
    text: "How often do you ask customers for a review?",
    area: "Reviews",
    answers: [
      { label: "After every visit", points: 100 },
      { label: "Now and then", points: 66 },
      { label: "Rarely", points: 33 },
      { label: "Never", points: 0 },
    ],
  },
  {
    text: "How often do you post on social media?",
    area: "Social",
    answers: [
      { label: "Several times a week", points: 100 },
      { label: "About once a week", points: 66 },
      { label: "Once a month or less", points: 33 },
      { label: "We don't post", points: 0 },
    ],
  },
  {
    text: "Do you follow up with customers after they visit?",
    area: "Customer experience",
    answers: [
      { label: "Always, with a thank-you", points: 100 },
      { label: "Sometimes", points: 66 },
      { label: "Rarely", points: 33 },
      { label: "Never", points: 0 },
    ],
  },
  {
    text: "Is your Google profile complete and up to date?",
    area: "Local visibility",
    answers: [
      { label: "Yes, complete and current", points: 100 },
      { label: "Mostly", points: 66 },
      { label: "It's out of date", points: 33 },
      { label: "We don't have one", points: 0 },
    ],
  },
  {
    text: "What do you most want from the next 90 days?",
    answers: [
      { label: "More bookings" },
      { label: "Busier quiet seasons" },
      { label: "Less time on marketing" },
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
