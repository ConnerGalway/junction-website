import fs from "node:fs";
import path from "node:path";
import type { JuCourse } from "./junctionu";

/**
 * JunctionU images by filename (server only: checked at build time). Upload a
 * file with the right name to public/images/junctionu/ and it's used; until
 * then the page falls back as noted.
 *
 *   hero.jpg                        hero still (fallback: the custom course still)
 *   industry-scan-thumbnail.jpg     Industry Scan thumbnail / video poster (same fallback)
 *   courses/<slug>.jpg              course stills, 16:9 (fallback: the placeholder gradient)
 */
const DIR = "/images/junctionu";
const FALLBACK_STILL = "/images/custom-training/formats-custom-course.jpg";

/** The public path if the file exists under /public, else undefined. */
function ifExists(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath)) ? publicPath : undefined;
}

export const JU_HERO_IMAGE = ifExists(`${DIR}/hero.jpg`) ?? FALLBACK_STILL;

/** The Industry Scan's thumbnail: the ScanTeaser card, and the video poster on the Scan page once it's built. */
export const JU_SCAN_THUMBNAIL = ifExists(`${DIR}/industry-scan-thumbnail.jpg`) ?? FALLBACK_STILL;

/** Courses with their still resolved from courses/<slug>.jpg (none: the card shows the placeholder gradient). */
export function withStills(courses: JuCourse[]): (JuCourse & { still?: string })[] {
  return courses.map((c) => ({ ...c, still: ifExists(`${DIR}/courses/${c.slug}.jpg`) }));
}
