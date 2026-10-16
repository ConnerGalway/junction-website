/**
 * Course "posters" for the Custom Training hero shelf (CourseShelf).
 *
 * Titles only, no client names. A poster image is picked up automatically
 * when a file named after the course's slug exists at
 * public/images/custom-training/posters/<slug>.jpg (or set `poster` to a
 * path). Without one, the card shows its colour design.
 */

export type CourseVariant = "newsprint" | "carbon" | "sage" | "gold";

export type Course = {
  title: string;
  variant: CourseVariant;
  /** Optional poster path under /public; overrides the slug lookup. */
  poster?: string;
};

export const COURSES = ["Export readiness", "Idea to experience", "Become a Red Deer Region Expert"];

/** The shelf: the three titles repeated across the row, cycling the colour variants. */
export const SHELF: Course[] = [
  { title: COURSES[0], variant: "newsprint" },
  { title: COURSES[1], variant: "carbon" },
  { title: COURSES[2], variant: "sage" },
  { title: COURSES[0], variant: "gold" },
  { title: COURSES[1], variant: "newsprint" },
  { title: COURSES[2], variant: "carbon" },
];

export function courseSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
