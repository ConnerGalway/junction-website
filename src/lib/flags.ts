/** Feature flags. Flip a flag to switch a self-contained feature off. */

/** The large faded JUNCTION_ wordmark behind the homepage hero (src/components/HeroWordmark.tsx). */
export const SHOW_HERO_WORDMARK = true;

/**
 * The "Watch the reel" pill beside the Speaking hero buttons. Shows only when
 * this is true AND public/images/speaking/reel.mp4 exists.
 */
export const SHOW_SPEAKING_REEL = false;

/**
 * The "▶ Watch the trailer" button in the JunctionU hero.
 * TODO: switch on (and set JU_TRAILER_URL in src/lib/junctionu.ts) once the trailer exists.
 */
export const SHOW_JU_TRAILER = false;

/** The small designed thumbnails (ProgramThumb) on the contact form's program tiles. Off: title + line only. */
export const SHOW_CONTACT_TILE_ART = true;
