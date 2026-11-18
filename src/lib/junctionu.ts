/**
 * eLearningU storefront content (/elearningu): nav, courses, workshops and
 * Tourism Talks. The learning brand on this site is eLearningU (JunctionU is
 * on hold); code names (this file, JU_*, Ju* components, ju-* tokens) stay.
 *
 * Every course and workshop links out to its own eLearningU (LearnWorlds)
 * landing page via `url`.
 * Course types, lengths and prices are real (Idea to Experience's length and
 * price are still to confirm, so it shows neither). PLACEHOLDERS for team
 * review (shown only with SHOW_PLACEHOLDERS): workshop lengths ("[ x HRS ]").
 */

export const ELEARNINGU_URL = "https://www.elearningu.com";
const ELEARNINGU = ELEARNINGU_URL;

/** "Sign in": the eLearningU sign-in page. TODO: confirm /login is the right LearnWorlds sign-in path. */
export const JU_SIGN_IN_URL = `${ELEARNINGU}/login`;

/** The Industry Scan landing page on this site. */
export const JU_SCAN_URL = "/elearningu/industry-scan";

/** Hero background video (Vimeo, background-player mode; the hero still is its poster). */
export const JU_HERO_VIDEO = { id: "1237666578", url: "https://vimeo.com/1237666578", title: "eLearningU" };

/** "Start free": eLearningU itself. */
export const JU_START_URL = ELEARNINGU;

/** Nav links (top bar and footer). Section anchors are absolute so they work from any eLearningU page. */
export const JU_NAV = [
  { label: "Browse", href: "/elearningu#catalogue", section: "catalogue" },
  { label: "Courses", href: "/elearningu#courses", section: "courses" },
  { label: "Workshops", href: "/elearningu#workshops", section: "workshops" },
  { label: "Tourism Talks", href: "/elearningu#tourism-talks", section: "tourism-talks" },
  { label: "For DMOs", href: "/elearningu#dmos", section: "dmos" },
  { label: "Industry Scan", href: JU_SCAN_URL, section: null },
] as const;

export type JuCourse = {
  title: string;
  kind: "course" | "workshop";
  /** Courses: the type label (small caps, top-left of the card's image slot), e.g. "CERTIFICATE COURSE". */
  type?: string;
  /** Length label, set in Bebas ("6 WEEKS"). Omitted: no label. */
  length?: string;
  /** Price, set in Bebas ("$995 CAD", "Free"). Omitted: no label. */
  price?: string;
  /** The product's eLearningU landing page (the card links out to it). */
  url: string;
  /**
   * Courses: the still's filename, public/images/junctionu/courses/<slug>.<ext>
   * (checked at build time). Without the file the card shows a designed
   * title card. See src/lib/junctionuImages.ts.
   */
  slug?: string;
};

export const COURSES: JuCourse[] = [
  { title: "Elevated Tourism Marketing Masterclass", slug: "elevated-tourism-marketing-masterclass", kind: "course", type: "Masterclass", length: "6 WEEKS", price: "$2,500 CAD", url: `${ELEARNINGU}/course/elevated-tourism-marketing` },
  { title: "Tourism Digital Marketing Essentials", slug: "tourism-digital-marketing-essentials", kind: "course", type: "Certificate course", length: "12 MODULES", price: "$995 CAD", url: `${ELEARNINGU}/course/tourism-digital-marketing-essentials` },
  // TODO: Andrea to confirm Idea to Experience's price (no price label until then).
  { title: "Idea to Experience", slug: "idea-to-experience", kind: "course", type: "Cohort program", length: "7 MODULES", url: `${ELEARNINGU}/course/idea-to-experience-development-cohort-2` },
  { title: "Trailhead: Tourism & Culture Bootcamp for Entrepreneurs", slug: "trailhead-tourism-culture-bootcamp", kind: "course", type: "Free · Yukon entrepreneurs", length: "6 MODULES", price: "Free", url: `${ELEARNINGU}/course/trailhead` },
  { title: "Sustainable Tourism", slug: "sustainable-tourism", kind: "course", type: "Certificate course", length: "8 MODULES", price: "$495 CAD", url: `${ELEARNINGU}/course/sustainable-tourism-course` },
];

export const WORKSHOPS: JuCourse[] = [
  { title: "The Email Marketing Blueprint for Tourism", kind: "workshop", length: "[ x HRS ]", price: "$129 CAD", url: `${ELEARNINGU}/course/tourism-email-marketing-blueprint` },
  { title: "Making the Most of Local Business Listings", kind: "workshop", length: "[ x HRS ]", price: "$129 CAD", url: `${ELEARNINGU}/course/local-business-listings` },
  { title: "AI: Your Business Superpower", kind: "workshop", length: "[ x HRS ]", price: "$129 CAD", url: `${ELEARNINGU}/course/ai-business-superpower` },
  { title: "How to Install and Use Google Analytics 4", kind: "workshop", length: "[ x HRS ]", price: "$29 CAD", url: `${ELEARNINGU}/course/how-to-install-use-google-analytics-4` },
];

/** Tourism Talks fallback (if the playlist feed is unreachable): YouTube video IDs. The playlist itself is TALKS_PLAYLIST_ID in src/lib/junctionuTalks.ts. */
export const TALK_IDS = ["KVe_7-ov7yI", "Z4Co4xD436I", "c8OyR70XEJg", "1eaLkk6s1TU"];

/** TODO: the trailer (shown when SHOW_JU_TRAILER is on). */
export const JU_TRAILER_URL = "#";

/** "See all →" for each shelf; each goes somewhere different. TODO: confirm the eLearningU catalogue URLs. */
export const JU_SEE_ALL = {
  courses: `${ELEARNINGU}/courses`,
  workshops: `${ELEARNINGU}/workshops`,
  talks: "https://youtube.com/playlist?list=PLUvaA_x2Z8df8djNodScqE1XZTFz8a16f",
};
