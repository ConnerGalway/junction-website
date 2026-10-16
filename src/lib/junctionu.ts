/**
 * JunctionU content: nav, courses, workshops and Tourism Talks.
 *
 * Courses and workshops still live on eLearningU; when they move to
 * JunctionU's own platform, change `url` here (and the sign-in link).
 * PLACEHOLDERS for team review: course prices ("[ $ ]"), course lengths
 * (all "6 HRS" for now) and workshop lengths ("[ x HRS ]").
 */

const ELEARNINGU = "https://elearningu.com";

/** TODO: confirm the eLearningU sign-in URL; replace with JunctionU's own platform. */
export const JU_SIGN_IN_URL = `${ELEARNINGU}/login`;

/** Industry Scan page (TODO: build it; for now a placeholder page). */
export const JU_SCAN_URL = "/junctionu/industry-scan";

/** "Start free": the existing target (the catalogue). */
export const JU_START_URL = "/junctionu#catalogue";

/** Nav links (top bar and footer). Section anchors are absolute so they work from any JunctionU page. */
export const JU_NAV = [
  { label: "Browse", href: "/junctionu#catalogue", section: "catalogue" },
  { label: "Courses", href: "/junctionu#courses", section: "courses" },
  { label: "Workshops", href: "/junctionu#workshops", section: "workshops" },
  { label: "Tourism Talks", href: "/junctionu#talks", section: "talks" },
  { label: "For DMOs", href: "/junctionu#dmos", section: "dmos" },
  { label: "Industry Scan", href: JU_SCAN_URL, section: null },
] as const;

export type JuCourse = {
  title: string;
  kind: "course" | "workshop";
  /** Length label, set in Bebas ("6 HRS"). */
  length: string;
  modules?: number;
  /** Price, set in Bebas. */
  price: string;
  url: string;
  /** 16:9 still under /public (courses); a placeholder gradient without one. */
  still?: string;
};

export const COURSES: JuCourse[] = [
  // TODO: link each course to its own page (eLearningU for now, then JunctionU's platform).
  { title: "Elevated Tourism Marketing Masterclass", kind: "course", length: "6 HRS", modules: 6, price: "[ $ ]", url: ELEARNINGU, still: "/images/custom-training/formats-custom-course.jpg" },
  { title: "Tourism Digital Marketing Essentials", kind: "course", length: "6 HRS", modules: 6, price: "[ $ ]", url: ELEARNINGU },
  { title: "Idea to Experience", kind: "course", length: "6 HRS", modules: 6, price: "[ $ ]", url: ELEARNINGU },
  { title: "Trailhead: Tourism & Culture Bootcamp for Entrepreneurs", kind: "course", length: "6 HRS", modules: 6, price: "[ $ ]", url: ELEARNINGU },
  { title: "Sustainable Tourism", kind: "course", length: "6 HRS", modules: 8, price: "[ $ ]", url: ELEARNINGU },
];

export const WORKSHOPS: JuCourse[] = [
  { title: "The Email Marketing Blueprint for Tourism", kind: "workshop", length: "[ x HRS ]", price: "$129 CAD", url: `${ELEARNINGU}/course/tourism-email-marketing-blueprint` },
  { title: "Making the Most of Local Business Listings", kind: "workshop", length: "[ x HRS ]", price: "$129 CAD", url: `${ELEARNINGU}/course/local-business-listings` },
  { title: "AI: Your Business Superpower", kind: "workshop", length: "[ x HRS ]", price: "$129 CAD", url: `${ELEARNINGU}/course/ai-business-superpower` },
  { title: "How to Install and Use Google Analytics 4", kind: "workshop", length: "[ x HRS ]", price: "$29 CAD", url: `${ELEARNINGU}/course/how-to-install-use-google-analytics-4` },
];

/** Tourism Talks: YouTube video IDs. Titles and thumbnails come from YouTube's oEmbed at build time. */
export const TALK_IDS = ["KVe_7-ov7yI", "Z4Co4xD436I", "c8OyR70XEJg", "1eaLkk6s1TU"];

/** TODO: the JunctionU trailer (shown when SHOW_JU_TRAILER is on). */
export const JU_TRAILER_URL = "#";

/** "See all →" for each shelf; each goes somewhere different. TODO: confirm the eLearningU catalogue URLs. */
export const JU_SEE_ALL = {
  courses: `${ELEARNINGU}/courses`,
  workshops: `${ELEARNINGU}/workshops`,
  talks: "https://youtube.com/playlist?list=PLUvaA_x2Z8df8djNodScqE1XZTFz8a16f",
};
