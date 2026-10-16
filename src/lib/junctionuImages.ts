import fs from "node:fs";
import path from "node:path";
import type { JuCourse } from "./junctionu";

/**
 * JunctionU images by filename (server only: checked at build time). Upload a
 * file with the right name to public/images/junctionu/ and it's used; until
 * then the page falls back as noted. Any of .jpg, .jpeg, .png or .webp works
 * (first match wins, in that order). Images are served through next/image,
 * so large files are resized and compressed for the web.
 *
 *   hero.<ext>                      hero still (fallback: the custom course still)
 *   industry-scan-thumbnail.<ext>   Industry Scan thumbnail / video poster (same fallback)
 *   courses/<slug>.<ext>            course stills, 16:9 (fallback: the placeholder gradient);
 *                                   also found directly in junctionu/, but courses/ wins
 */
const DIR = "/images/junctionu";
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const FALLBACK_STILL = "/images/custom-training/formats-custom-course.jpg";

/** The first existing public path for `base` (no extension) in any of `dirs`, else undefined. */
function findImage(base: string, dirs: string[] = [DIR]) {
  for (const dir of dirs) {
    for (const ext of EXTENSIONS) {
      const publicPath = `${dir}/${base}.${ext}`;
      if (fs.existsSync(path.join(process.cwd(), "public", publicPath))) return publicPath;
    }
  }
  return undefined;
}

export const JU_HERO_IMAGE = findImage("hero") ?? FALLBACK_STILL;

/** The Industry Scan's thumbnail: the ScanTeaser card, and the video poster on the Scan page once it's built. */
export const JU_SCAN_THUMBNAIL = findImage("industry-scan-thumbnail") ?? FALLBACK_STILL;

/** Courses with their still resolved from courses/<slug>.<ext> (none: the card shows the placeholder gradient). */
export function withStills(courses: JuCourse[]): (JuCourse & { still?: string })[] {
  return courses.map((c) => ({ ...c, still: c.slug ? findImage(c.slug, [`${DIR}/courses`, DIR]) : undefined }));
}
