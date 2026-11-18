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

/* ------------------------------------------------------------------ *
 * Hidden sections. Removed in the team feedback round (commits up to
 * 5a8f40a) and kept here, switched off. Flip one to true and the
 * section returns in its original place.
 * ------------------------------------------------------------------ */

/** Homepage: "What happens on the call" (three steps) and the "Not ready for a call?" Tourism Talks card. */
export const SHOW_HOME_CALL_SECTION = false;

/** Homepage: the building-supply case study teaser (src/lib/buildingSupplyCase.ts). */
export const SHOW_HOME_CASE_STUDY = false;

/**
 * AI Training page: the building-supply case study (#case-study), its
 * CaseSwitcher tabs and the hero link "See a real build ↓". The homepage
 * teaser and the Work chapter link to #case-study only while this is on.
 */
export const SHOW_AI_CASE_STUDY = false;

/** AI Training page: the testimonials section (its cards are placeholders, so it also needs SHOW_PLACEHOLDERS). */
export const SHOW_AI_TESTIMONIALS = false;

/** Work page: the building-supply chapter (and its route-map stop, if any). Grounds and sides alternate either way. */
export const SHOW_WORK_SUPPLIER_CASE = false;

/** Marketing strategy page: "Real regions. Real numbers." proof section. */
export const SHOW_STRATEGY_PROOF = false;

/** Homepage carousel: the price lines on the Accelerator and AI Training cards (the prices stay in the data). */
export const SHOW_CAROUSEL_PRICES = false;

/* ------------------------------------------------------------------ *
 * Custom Training, eLearningU and the soft launch.
 * ------------------------------------------------------------------ */

/**
 * Custom Training: the program sketcher (ProgramSketcher). Off: a short
 * "Tell us who needs training" CTA on the same Forest ground instead. The
 * Contact page's sketch pre-fill keeps working either way.
 */
export const SHOW_TRAINING_SKETCHER = false;

/**
 * eLearningU page: the JUNCTION_U wordmark in the hero. Off: "eLearningU" set
 * in the page's Oswald (or public/images/elearningu/logo.svg once it exists).
 */
export const SHOW_JU_WORDMARK = false;

/**
 * eLearningU page: the "Get the email" Sage band (#email), and the Work
 * page's link to it. TODO: the band's signup isn't wired to a list yet.
 */
export const SHOW_ELU_EMAIL_BAND = false;

/**
 * Every user-visible placeholder ("[ … ]" labels, "to come" answers, the
 * Placeholder component's boxes, placeholder testimonials). Off for the soft
 * launch: labels are dropped where the rest still works, and whole elements
 * are dropped (with their grids reflowing) where nothing would be left.
 */
export const SHOW_PLACEHOLDERS = false;

/**
 * Testimonials that haven't been verified (Kathy Cooper, Avery Bramadat and
 * Joanne Wolnik's short "Invaluable support…" line; src/lib/testimonials.ts).
 * On: each returns in its original place, after any verified quote that took
 * that place.
 */
export const SHOW_UNVERIFIED_QUOTES = false;

/** Homepage hero: the team photo beside the headline. Off: the headline runs on two lines from 1280px. */
export const SHOW_HOME_HERO_PHOTO = false;

/* ------------------------------------------------------------------ *
 * Review round (Andrea's notes).
 * ------------------------------------------------------------------ */

/** Accelerator: "This is what week one looks like." (the plan demo, #plan). Off: the touchpoints move onto Forest. */
export const SHOW_ACC_WEEK_ONE = false;
