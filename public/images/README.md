# Site images: where to upload what

Upload a file with the **exact name** below into the right folder and the site uses it on the next deploy. No code change is needed. Folder names stay as they are, even where the folder is named after the old JunctionU brand.

Sizes don't matter much: images fill their frames with `object-fit: cover` and are compressed for the web. Keep the shape noted, and keep faces near the upper middle of the photo.

## `images/` (root)

| File | Page | Notes |
|---|---|---|
| `home-hero-team.jpg` | Homepage hero (hidden for now: `SHOW_HOME_HERO_PHOTO`) | Also the Accelerator video's fallback poster if Vimeo can't be reached. |
| `tourism-talks-cover.png` | Homepage "Not ready for a call?" card (hidden for now: `SHOW_HOME_CALL_SECTION`) | 16:9. |

## `images/custom-training/`: Custom Training (`/custom-training`)

| File | Where | Shape |
|---|---|---|
| `who-dmos.jpg` | "Who it's for": DMOs tab photo | Landscape frame; portrait photos work (cropped at 50% 30%). |
| `who-leadership.jpg` | "Who it's for": leadership tab photo | Same as above. |
| `formats-live-workshop.jpg` | Formats: Live workshop | Tall panel, any shape. |
| `formats-webinar-series.jpg` | Formats: Webinar series | Tall panel, any shape. |
| `formats-leadership-program.jpg` | Formats: Leadership program | Portrait works (cropped at 50% 30%). |
| `formats-custom-course.jpg` | Formats: Custom course still | Also the eLearningU hero's fallback still. |
| `formats-custom-course.mp4` | Formats: Custom course video loop (optional) | Muted loop; the jpg is its poster. |
| `<slug>.jpg` | Hero shelf: a program poster (optional; replaces that card's colour design) | 250 × 300 card. |

Program poster slugs: `yukon-export-readiness`, `okotoks-tourism-accelerator`, `tourism-marketing-micro-certification` (shown), and `red-deer-region-expert`, `tourism-golden-tap`, `idea-to-experience` (hidden for now).

## `images/junctionu/`: eLearningU (`/elearningu` and the Industry Scan page)

Any of `.jpg`, `.jpeg`, `.png` or `.webp` works (first match wins, in that order).

| File | Where | Shape |
|---|---|---|
| `hero.<ext>` | eLearningU hero still (also the background video's poster) | Landscape, subject right of centre. |
| `industry-scan-thumbnail.<ext>` | Industry Scan teaser card, the Scan briefing poster, the Marketing strategy Scan panel | 16:9. |
| `courses/<slug>.<ext>` | Course card stills (real course screengrabs). Until a course has one, its card shows a designed title card. | 16:9. |

Course stills to upload into `junctionu/courses/` (any of `.jpg`, `.jpeg`, `.png`, `.webp`):

| Course | Filename |
|---|---|
| Elevated Tourism Marketing Masterclass | `elevated-tourism-marketing-masterclass.jpg` |
| Tourism Digital Marketing Essentials | `tourism-digital-marketing-essentials.jpg` |
| Idea to Experience | `idea-to-experience.jpg` |
| Trailhead: Tourism & Culture Bootcamp for Entrepreneurs | `trailhead-tourism-culture-bootcamp.jpg` |
| Sustainable Tourism | `sustainable-tourism.jpg` |

`junctionu/courses/_old/` holds the retired temporary stills; files there are ignored.

## `images/elearningu/`: eLearningU logo (folder not created yet)

| File | Where |
|---|---|
| `logo.svg` | The official eLearningU logo in the eLearningU nav and footer (and the Marketing strategy thumbnail). Until it exists, "eLearningU" is set in type. |

## `images/speaking/`: Speaking (`/speaking`)

| File | Where | Shape |
|---|---|---|
| `hero-conner-stage.webp` | Hero cutout of Conner at the podium (also the homepage carousel's Speaking card) | Transparent background. |
| `conner-portrait.jpg` | "Conner Galway" section portrait | Portrait. |
| `talk-01.jpg` | Talk 01: AI and the work only people can do | 16:9 (1600 × 900). |
| `talk-02.jpg` | Talk 02: Marketing trends worth acting on | 16:9. |
| `talk-03.jpg` | Talk 03: Tourism strategy and marketing | 16:9. |
| `reel.mp4` | "Watch the reel" (only with `SHOW_SPEAKING_REEL` on) | Video. |

## `images/marketing-strategy/`: Marketing strategy (folder not created yet)

| File | Where |
|---|---|
| `1.jpg` … `6.jpg` | Hero deliverables shelf: item n becomes a designed image (1, 3, 5 are report covers, 230 × 310; 2, 4, 6 are spreads, 420 × 290). |

## `images/team/`: About (`/about`)

| File | Where |
|---|---|
| `conner.jpg`, `brooke.jpg`, `andrea.jpg` | Team portraits (fill a 220 × 280 card). A new person needs an entry in `src/lib/about.ts` too. |

Client logos are in `public/logos/` (see `SOURCES.md` there).
