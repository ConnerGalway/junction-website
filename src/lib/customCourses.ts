/**
 * Custom Training programs: the hero shelf (CourseShelf), its homepage
 * thumbnail and the DMO panel's small card all read this one list.
 *
 * Each card shows the client (small caps label), the program title and its
 * format. Colours rotate Newsprint, Carbon, Sage, gold. No client logos.
 *
 * Posters: add public/images/custom-training/<slug>.jpg and that card shows
 * the image instead of its colour design (checked at build time; no code
 * change). `poster` overrides the path.
 */

export type CourseVariant = "newsprint" | "carbon" | "sage" | "gold";

export type Course = {
  /** The client, shown as the card's top label. */
  client: string;
  /** The program title. */
  title: string;
  /** The format, under the title ("Custom course", "Cohort program" …). */
  format: string;
  /** Poster filename: public/images/custom-training/<slug>.jpg */
  slug: string;
  variant: CourseVariant;
  /** Optional poster path under /public; overrides the slug lookup. */
  poster?: string;
};

const VARIANTS: CourseVariant[] = ["newsprint", "carbon", "sage", "gold"];

const PROGRAMS: Omit<Course, "variant">[] = [
  { client: "Tourism Yukon", title: "Yukon Export Readiness", format: "Custom course", slug: "yukon-export-readiness" },
  { client: "Tourism Red Deer", title: "Become a Red Deer Region Expert", format: "Custom course", slug: "red-deer-region-expert" },
  { client: "Town of Okotoks", title: "Okotoks Tourism Accelerator", format: "Cohort program", slug: "okotoks-tourism-accelerator" },
  { client: "South Canadian Rockies", title: "Tourism Marketing Micro-Certification", format: "Live certification", slug: "tourism-marketing-micro-certification" },
  { client: "Tourism Golden", title: "Tourism Golden TAP", format: "Custom accelerator", slug: "tourism-golden-tap" },
  { client: "Ontario's Southwest", title: "Idea to Experience", format: "Custom course", slug: "idea-to-experience" },
];

/** The shelf, in order, with the colour rotation applied. */
export const SHELF: Course[] = PROGRAMS.map((p, i) => ({ ...p, variant: VARIANTS[i % VARIANTS.length] }));
