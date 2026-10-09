# Junction design system

The design system lives in code:

- **Tokens, tones and type classes:** `src/app/globals.css`
- **Components:** `src/components/ui/`, exported from `@/components`
- **Navigation data** (shared by the header dropdown, mobile menu and `/programs`): `src/lib/navigation.ts`

This file explains the rules behind them. If you're adding a page, compose it from `Section`, `Container` and the components below. Don't hand-roll colours, font styles or spacing.

## Hard rules

- **Never use pure white.** Newsprint (`#F4F0E8`) replaces white everywhere: cards, inputs, badges and text. The default Tailwind palette is cleared, so `bg-white` and `text-white` don't exist.
- **Bebas Neue is for the `JUNCTION_` wordmark and numerals only.** Numerals here means stats, index numbers, prices and durations. Use `<Wordmark>` / `<LogoLockup>`, `type-stat`, `type-numeral` and `type-price`.
- **No hex or rgba values in pages, and no inline font styles.** Use tokens and type classes.
- **No hard edges.** Every box, control and media frame is rounded.
- **Examples use one of two businesses:** "Conner's Cabins" (the example small business) or the building-supply case. No other client names in mock-ups, sample data or placeholders.

## Colour tokens

Defined directly in `@theme`, so each token generates `bg-*`, `text-*`, `border-*` and similar utilities.

| Token | Value | Use |
|---|---|---|
| `carbon` | `#1C1C1A` | Headings and UI text on Newsprint; dark ground |
| `ink-soft` | `#3C3C39` | Body copy on Newsprint (Carbon at about 85%) |
| `flint` | `#6A6862` | Muted text on Newsprint (captions, small print) |
| `newsprint` | `#F4F0E8` | Main ground; replaces white |
| `newsprint-hover` | `#EDE6DA` | Hover and focus fill for clickable list rows |
| `forest` | `#1A4D2E` | Dark ground (sections and boxes); prices on light; card top rule |
| `canopy` | `#2E7D4F` | Rules and fills (not text); the wordmark underscore |
| `canopy-text` | `#2B764A` | Links, text and primary button fill on light |
| `fern` | `#7FC99A` | Eyebrows and links on Carbon or Forest |
| `sage` | `#C8E8D4` | Inside boxes only (quote cards, chips) |
| `sage-25` | `#E9EEE3` | Table body rows |
| `accent-1` | `#C4963A` | Gold, the **primary accent**. Numerals on Carbon and Forest. |
| `accent-1-on-light` | `#A57E31` | Gold on Newsprint. **24px and up only** (3.3:1). |
| `accent-2` | `#A55527` | Copper, the **secondary accent**. Eyebrows on Newsprint. No numerals. |
| `break` | `#E0176A` | Dots, outlines, underlines (not body text) |
| `break-on-light` | `#CD1561` | Pink text and fills on Newsprint |
| `break-on-dark` | `#ED5192` | Pink text on Carbon and Forest |
| `newsprint-muted` | `rgba(244,240,232,.8)` | Body and muted text on dark grounds |
| `hairline` | `rgba(28,28,26,.14)` | 1px separators on light |
| `hairline-dark` | `rgba(244,240,232,.15)` | 1px separators on dark |
| `logo-on-light` | `rgba(28,28,26,.6)` | One-colour logos on Newsprint |
| `logo-on-dark` | `rgba(244,240,232,.7)` | One-colour logos on Carbon and Forest |
| `price-on-light` | `rgba(28,28,26,.6)` | Bebas price/duration lines on Newsprint (large text, 4.3:1) |
| `price-on-dark` | `rgba(244,240,232,.6)` | Bebas price/duration lines on Carbon and Forest |
| `logo-text-on-light` | `rgba(28,28,26,.64)` | Text stand-ins in a logo wall on Newsprint (4.9:1; 60% would be 4.3:1, below AA for text) |

Contrast on the intended ground:

- **On Newsprint:**
  - ink-soft 9.7
  - flint 4.9
  - canopy-text 4.87
  - accent-2 4.70
  - break-on-light 4.77
  - accent-1-on-light 3.3 (large text only)
  - forest 8.6
- **On Carbon:**
  - fern 8.7
  - accent-1 6.3
  - break-on-dark 5.0
- **On Forest:**
  - fern 5.0
  - newsprint-muted 6.1
  - accent-1 3.6 (numerals of 24px and up only)
- **On Sage-25:** ink-soft 9.4
- **On newsprint-hover:** break-on-light 4.4 (the row titles are 24px and up)

## Colour roles: grounds and tones

Every section and dark box has a **tone**. `<Section tone="…">` and `<Card tone="carbon" | "forest">` apply a `.tone-*` class. The class sets the ground colour plus CSS variables that every component reads:

- `--tone-text`
- `--tone-body`
- `--tone-muted`
- `--tone-eyebrow`
- `--tone-numeral`
- `--tone-price`
- `--tone-link`
- `--tone-link-hover`
- `--tone-focus`
- `--tone-rule`
- `--tone-hairline`
- `--tone-btn-*`
- `--tone-card-*`

Read them in a page with classes such as `text-(--tone-numeral)` or `border-(--tone-rule)`. `text-muted` is shorthand for the muted colour.

| | Newsprint | Carbon | Forest |
|---|---|---|---|
| Where | Default ground (most of each page) | Sections and boxes | Sections and boxes |
| Headings | carbon | newsprint | newsprint |
| Body / lead | ink-soft | newsprint-muted | newsprint-muted |
| Muted | flint | newsprint-muted | newsprint-muted |
| Eyebrow | accent-2 (copper) | fern | fern |
| Numerals | accent-1-on-light | accent-1 | newsprint (no accent-1 on Forest) |
| Prices and durations | price-on-light (Carbon 60%) | price-on-dark (Newsprint 60%) | price-on-dark (Newsprint 60%) |
| Section dividers | 2px canopy | 2px fern | 2px fern |
| Links | canopy-text | fern | fern |
| Link hover | break-on-light | break-on-dark | break-on-dark (see the exception below) |
| Primary button | canopy-text fill, newsprint text | newsprint fill, carbon text | newsprint fill, forest text |
| Secondary button | 1.5px carbon outline | 1.5px newsprint outline | 1.5px newsprint outline |
| Focus ring | 2px canopy-text | 2px fern | 2px fern |

Other ground rules:

- **Carbon and Forest are both allowed** for full sections and for boxes.
- **Neighbouring dark boxes alternate.** If two dark boxes sit side by side, make one Forest and one Carbon, as with the two audience cards on Custom Training.
- **Two dark sections of the same colour should never touch.**
- **Sage is never a full-width section.** Use it only inside boxes.
  - **Callouts** (`<Callout>`): sage-25 background with Forest text and Forest links (8.3:1).
  - **Quote cards** (`<QuoteCard>`): Sage background, also with Forest text.
- **Avoid canopy-text links on Sage**, because they're only 4.2:1 there. Links inside callouts and sage boxes are Forest.
- **Section dividers:** one weight everywhere, 2px (`border-t-2 border-(--tone-rule)`). Canopy on Newsprint, Fern on Carbon and Forest.

### Accent hierarchy

- **Gold (accent-1) is the primary accent.** Every numeral uses it: index numbers, stats and highlighted figures. On Newsprint that means `accent-1-on-light`, and only at 24px and up. On Carbon it's `accent-1`.
- **On Forest, numerals and stats are Newsprint.** accent-1 is not used on Forest. Revisit this if the accents change.
- **Copper (accent-2) is the secondary accent.** It's for eyebrows on Newsprint. Never set numerals in copper.
- **Exception: copper editable values in the Offload calculator** ("What is that job costing you?") **only.** The four values in its sentence are copper (Epilogue 900, 3px copper underline) and turn break-on-light while their popover is open. This is a one-off, not a general rule for editable values.
- **Exception: score bands on the quick score card** (Accelerator page) **only.** Area bars and their Bebas grade letters are coloured by band: healthy (65+) Canopy (letters in canopy-text), middling (45–64) accent-1-on-light, weak (under 45) copper. The two weakest area names in "Your biggest gaps" are copper too. Grade letters count as numerals here. No pink on the card.

### Pink means clickable

Pink appears only on things you can click. Non-clickable elements never get a pink hover.

- **Links:** pink text (and underline) on hover, as below.
- **Clickable cards:** the whole card is the link (`<Card href>`), with no button or second link inside. On hover and keyboard focus it gets a 2px break-pink outline, offset 4px.
- **Clickable list rows:** the newsprint-hover highlight plus a pink title (see Surfaces).
- **Exception: `Badge`** (outline and filled). A badge is a status label and isn't clickable, but it may be pink: the outline badge ("Quick check · a general snapshot" on the Accelerator page) and the filled badge ("New" on the Offload hero). Badges are the only non-clickable pink component.
- **Exception: the Offload guarantee strip.** A break-on-light strip (radius 14) with "Guaranteed" in Fraunces 900 italic and the promise in Epilogue 600, both Newsprint (4.8:1). It's the only non-clickable pink surface, and the only Fraunces outside pull quotes. Don't reuse it elsewhere.

### Eyebrows are for meta labels only

Use `<Eyebrow>` only for meta labels: case-study meta ("Travel Yukon · Training · 4 years"), dates, categories, roles. **Never put an eyebrow above a section or page heading.**

- **Card and box labels are meta labels and stay:** the Custom Training audience cards, "The guarantee" and "The Brief · weekly". Mock-UI labels inside product mockups also stay.
- **Section headings are always real headings** (`<h2 className="type-h2">`), never eyebrow-styled. Examples: "Questions", "What we believe", "Formats".
- **Hero meta without eyebrows:** put durations and audiences under the lead as a price line (`type-price`, for example "90 days · small businesses"). Put other facts in a small muted caption (`type-small`, for example "Formerly eLearningU", "100+ articles").

### Faces

The only faces on the site are the Junction team's. Testimonials and quote cards never carry a headshot.

### Links turn pink on hover

All links turn pink on hover, and the text and underline change together:

- break-on-light on Newsprint
- break-on-dark on Carbon and Forest

**Known exception:** break-on-dark on Forest is **2.9:1**, which is below AA. This is accepted for the hover state only. The resting colour (fern, 5.0:1) passes, and the underline stays as a second cue.

## Hero headlines

On landing pages the hero headline is **at most three lines at desktop widths (1280px and up)**, within the display type scale.

- Choose the breaks per page: explicit breaks for desktop only (`<br className="hidden xl:inline" />` between `xl:whitespace-nowrap` spans) or balanced wrapping with a max width in ch. Tablet and mobile wrap freely.
- A long line may run over the hero visual if nothing overlaps: start the visual lower with `xl:mt-[calc(var(--hero-line)*N+…)]`, where `--hero-line` is one display line (font size × .94).
- Accelerator: "A 90-day marketing / plan you'll / actually work." (the preview starts one line lower). Offload: "We automate one of your / bottlenecks in 30 days. / Guaranteed." (the visual starts below the second line).

## Type scale

The type classes live in `@layer components`, so a colour utility can still override them. Headings use the tone's text colour (Carbon on Newsprint), and body and lead copy use `--tone-body` (ink-soft on Newsprint).

| Class | Font | Size | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| `type-display` | Epilogue 900 | clamp(48px, 6vw, 92px) | .94 | -0.045em | Balanced. Page h1 and closing-CTA headlines. |
| `type-h2` | Epilogue 900 | clamp(34px, 3.8vw, 56px) | 1 | -0.04em | Section headings |
| `type-h3` | Epilogue 900 | clamp(24px, 2vw, 30px) | 1.05 | -0.035em | Card, row and sub-section titles |
| `type-h4` | Epilogue 600 | 20px | 1.15 | -0.015em | Step and list titles |
| `type-lead` | DM Sans 300 | clamp(18px, 1.5vw, 21px) | 1.5 | — | Max 34ch. Hero intros. |
| `type-body` | DM Sans 300 | 17px | 1.5 | — | Max 680px. Ink-soft on Newsprint. |
| `type-small` | DM Sans 400 | 14px | 1.5 | — | Muted colour |
| `type-eyebrow` | DM Sans 500 | 13px | 1.4 | .14em, uppercase | Use `<Eyebrow>` |
| `type-quote` | Fraunces 900 italic | clamp(24px, 2.6vw, 36px) | 1.15 | — | Pull quotes only |
| `type-button` | DM Sans 500 | 15px | 1.2 | — | Sentence case |
| `type-wordmark` | Bebas Neue 400 | — | 1 | .08em | Wordmark |

### Numerals (Bebas Neue)

| Class | Size | Line height | Use |
|---|---|---|---|
| `type-stat` | clamp(96px, 13vw, 200px) | .85 | Big stats. Use `<Stat>`, which has no rule and a body-size label below, and always fits its container (see Components). |
| `type-numeral` | clamp(40px, 3.4vw, 48px) | .9 | Index numbers (01, 02…) in lists and cards |
| `type-price` | 40px | 1 | Prices and durations ("$2,500 · 90 days", "30 days"). Carbon 60% on light, Newsprint 60% on dark. In a program hero the price may be set larger (`type-price text-[56px]`) with the duration and audience beside it at 28px; both keep the 60% colour. |

Fonts are loaded in `src/app/layout.tsx` with `next/font/google` and exposed as `--nf-*` variables. They map to the `font-sans` (DM Sans 300/400/500), `font-display` (Epilogue 600/900), `font-quote` (Fraunces 900 italic) and `font-wordmark` (Bebas Neue 400) utilities.

Use real heading elements in order: h1, then h2, then h3, with no skipped levels. The visual class is independent of the element.

## Spacing, widths, radius

| Token / utility | Value | Use |
|---|---|---|
| `py-section` | clamp(80px, 9vw, 136px) | Default section top and bottom |
| `py-section-tight` | clamp(64px, 7vw, 100px) | Stacked sections that belong together, and heroes |
| `px-gutter` | clamp(20px, 4vw, 60px) | Side gutter (applied by `Section`) |
| `card-pad` | 28px (24px under 640px) | Card padding (applied by `Card`) |
| `card-pad-sm` | 20px | Compact padding for small cards (`<Card padded="sm">`), such as the homepage video card |
| `gap-6` | 24px | Gap between components |
| `mt-9` / `mb-9` | 36px | Heading to content |
| `max-w-wide` / `-headline` / `-body` | 1320 / 1040 / 680px | Containers |
| `rounded-control` | 10px | Buttons, inputs, chips, badges, menu items, list-row highlights |
| `rounded-card` | 14px | Cards, panels, the dropdown, media frames, tables |
| `shadow-card` | `0 1px 2px rgba(28,28,26,.06), 0 10px 28px rgba(28,28,26,.07)` | Default card elevation |
| `shadow-preview` | `0 1px 2px rgba(28,28,26,.06), 0 24px 60px rgba(28,28,26,.12)` | Product previews (the dashboard preview) |

Controls:

- Buttons and fields have a 48px minimum height and a 15px label.
- The nav CTA uses `<Button size="sm">`, which is 44px.

## Surfaces

- **Card (default):** the same colour as its ground, with a soft `shadow-card` and a **3px Forest top rule**. There's no hairline border, and the radius is 14.
  - On Carbon or Forest grounds the shadow can't show, so the card gets a 1px hairline-dark border and a Fern top rule instead.
  - The shadow and 3px Forest top line are **only** for boxes and cards on a ground of their own colour.
  - Linked cards (`href`) get the 2px break-pink outline (offset 4px) on hover and focus. Nothing inside them is a button or another link.
- **Dark panels:** `<Card tone="carbon">` and `<Card tone="forest">`. Neighbouring dark panels alternate.
- **Light panels on dark grounds:** `<Card tone="newsprint">`, a Newsprint box with radius 14, no shadow and no top line (for example the homepage program cards on Carbon).
- **Swappable images:** some images are meant to be replaced on GitHub by uploading a file with the same name, such as the homepage video card cover, `public/images/tourism-talks-cover.png` (16:9). Reference them by that exact path, fill the slot with `object-fit: cover`, and never hardcode their pixel size.
- **Photos:** never get an outline or the 3px top line. A floating photo may have a soft shadow (`shadow-card`) and radius 14. **Photos are dark, so they never overlap headline text:** when space runs out, the photo shrinks or moves into the flow instead.
- **Exception: the Offload KitCarousel** dims its side cards to 50% (below the 75% rule): they're previews, the spotlight card is at full opacity, and the live region announces it.
- **Dimmed rows** (`.dim-row`): rows that sit at 75% and come to full opacity on hover and keyboard focus (200ms). 75% keeps body text above AA (ink-soft at 75% is about Flint, 4.9:1); don't dim text further, such as the Accelerator steps. Pointer devices only: on touch (`hover: none`) they stay at full opacity. Make each row focusable (`tabIndex={0}`) so keyboard users can bring it forward.
- **Ghost numerals:** a big Bebas numeral fully inside a card's top-right corner, 16px from the top and right edges and about 70% of the card's height (it scales with the card). Never cropped. Carbon at 6% (Newsprint at 7% on Carbon), behind the text, `aria-hidden`. Drawn as an SVG whose viewBox is the digit's ink box, so its height is the numeral's height. Used on the Accelerator touchpoint cards.
- **Edge fades:** `.fade-out-left`, `.fade-out-right` and `.fade-out-bottom` (mask). Give a faded element enough padding to keep its shadow inside the mask.
- **Tables:** use a real `<table className="data-table">` inside `<div className="data-table-frame">`.
  - Header row: Carbon, with Newsprint eyebrow-style labels.
  - Body rows: Sage-25, with ink-soft cells.
  - Row labels: `<th scope="row">` in Carbon 500.
  - The whole table has radius 14. On narrow screens it scrolls inside the frame.
- **Clickable list rows** (articles, programs): put `.row-link` on the row's link and `.row-title` on its title.
  - On hover and keyboard focus the whole row fills with newsprint-hover (radius 10), and the title turns break-on-light.
  - The highlight extends 16px past the text on each side, so rows stay aligned with the page.

## Components (`@/components`)

| Component | Usage rules |
|---|---|
| `Section` | `tone="newsprint" \| "carbon" \| "forest"` and `spacing="default" \| "tight"`. `flush="top" \| "bottom"` drops one side's padding. Newsprint sections paint no fill of their own (the body is already Newsprint), so lowest-layer decoration such as the hero wordmark shows through them. |
| `Container` | `width="wide" \| "headline" \| "body"`, centred. Use `as` for lists. |
| `Button` | `variant="primary" \| "secondary"` and `size="default" \| "sm"`. Renders a `Link`, an `<a>` (external links open in a new tab) or a `<button>`. Every "Book a 20-min call" button uses `CALENDLY_URL`. |
| `TextLink` | Underlined; colour from the tone, with a pink hover on text and underline. |
| `Eyebrow` | Meta labels only (never above a heading). Tone eyebrow colour. `variant="highlight"` adds a break dot and pink text. |
| `Stat` | `value`, `label` and `maxSize`. A Bebas number with the label below in body size, and no rule. Gold on Newsprint and Carbon, Newsprint on Forest. **It always fits:** as large as `maxSize` (default the `type-stat` clamp) but never wider than its container, via a container query and the value's width from Bebas glyph widths. Set a smaller size with `maxSize`, never a `text-*` class. |
| `Card` | See Surfaces. `tone`, `href` and `padded` (`true`, `"sm"` for 20px compact padding, or `false`). |
| `QuoteCard` | Sage fill, radius 14, `type-quote` with a Forest caption. No headshots (faces rule). |
| `Callout` | sage-25 box, radius 14, Forest text and links. For a short highlighted statement. |
| `Badge` | `outline` (2px break border, pink text, dot) or `filled` (break-on-light fill). Radius 10. Badges are the one non-clickable pink component (see Pink means clickable). |
| `Accordion` | Questions sections, everywhere. `items` (`q`, `a`). Each question is a full-width button row (`aria-expanded`, `aria-controls`) under a 2px divider, all collapsed by default (any number can be open). A gold chevron (accent-1-on-light, 20px, 2px stroke; a UI graphic, so 3:1 is enough) on the right turns 180° when open; the answer opens with a 250ms height animation (instant with reduced motion). The question turns pink on hover. No "+" icons. |
| `DashboardPreview`, `OffloadPreview` | Product previews (`src/components/`), each with a `thumbnail` variant for program cards: scaled to fill the slot's width, top-aligned, bottom faded, `inert` and `aria-hidden`. `OffloadPreview` is the Offload hero visual (journey track + Session 3 quote generator); its thumbnail is drawn at 560px. Used on the homepage orbit (The Accelerator, Offload Program) and the Programs dropdown (The Accelerator). |
| `ChevronButton` | Carousel previous / next: a thin 20px chevron (1.6px rounded stroke), no box, tone text at 70%, the tone's pink on hover and focus, 40% when disabled at the ends of a non-looping carousel. Needs an `aria-label`. Used by the program orbit and the KitCarousel. |
| `Chip` | `sage` (sage fill, Forest text), `outline` (1.5px Forest) or `fern-outline` (1.5px Fern border and text, for dark grounds). Radius 10. |
| `Input`, `Select`, `Textarea` | Always labelled. 48px, with a Flint border and a canopy-text focus. |
| `NewsletterSignup` | One row (email and Subscribe), labelled "Get The Brief in your inbox", with the helper line "[ Frequency ] · unsubscribe anytime". Submission is a TODO. |
| `Placeholder` | Dashed stand-in for missing media or content |
| `Wordmark` | `JUNCTION_` in Bebas with a Canopy underscore. The underscore is part of the logo. |
| `LogoLockup` | Wordmark, a 1px divider (20% of the text colour, 34px tall) and the tagline "Strategy & / Capacity Building" (DM Sans 400, 14px, muted, .04em). Links to `/`. With `collapseOnSmall`, the divider and tagline are dropped under 420px. |
| `SkipLink` | Rendered once by the root layout |
| `LogoWall` | `logos`, `label`, and `variant="marquee" \| "row" \| "grid" \| "auto"`. See below. |

Toggle pills are `<button aria-pressed>` elements inside a labelled `role="group"`. FAQ toggles use `aria-expanded` and `aria-controls`.

## Homepage hero

- **Headline, lead and CTAs** on the left; no dashboard area or other block behind them.
- **Team photo** on the right, vertically centred on the text (radius 14, soft shadow, -1.5°):
  - **1024px and wider:** text and photo sit side by side with a 56px gap (48px minimum, plus room for the tilt). The photo is at most 220px wide (300px from 1280px), and shrinks rather than overlapping the headline.
  - **Below 1024px:** the photo sits in the page flow under the buttons, right-aligned.

### Hero wordmark

`src/components/HeroWordmark.tsx`, rendered by the homepage with one line and switched by `SHOW_HERO_WORDMARK` in `src/lib/flags.ts` (default `true`).

- **Look:** `JUNCTION` in Bebas Neue, Carbon at 10%, letter-spacing .04em, followed by the underscore as a solid Canopy bar at full opacity. The bar's bottom sits on the letters' baseline, like the logo. In em of the wordmark's font size: bar 0.42 wide and 0.11 tall, with a 0.04 gap before it.
- **768px and wider:** right-aligned to the main container. The font size is fluid (container query units) so letters plus underscore span the container exactly, never cropped.
- **Below 768px:** only `J_`, right-aligned, about 45vw wide.
- **Position:** the underscore's bottom edge sits at `100svh + 2/3` of the underscore height from the top of the page, so on any screen the fold cuts through the underscore with two-thirds of it below the fold. The rest of the wordmark is revealed as you scroll.
- **Layer:** the lowest one (`-z-10`): behind all hero and logo-wall content, above the page background. It's `aria-hidden` and `pointer-events: none`, and it takes no space.
- **Slower scroll:** it moves at 85% of the page's scroll speed (it drifts down by 0.15 × the scroll distance), via framer-motion `useScroll` + `useTransform`. The drift stops once it has scrolled out of view. With `prefers-reduced-motion` there is no parallax; it scrolls with the page.
- **Self-contained:** nothing else depends on it. With the flag off, the page's layout, spacing and layering are unchanged.

**How to remove:** set `SHOW_HERO_WORDMARK` to `false` in `src/lib/flags.ts`. To remove it for good, delete `src/components/HeroWordmark.tsx` and its one line (and import) in `src/app/page.tsx`, and the flag. framer-motion can then be uninstalled if nothing else uses it.

## Program orbit (homepage "Find your program")

`src/app/ProgramOrbit.tsx`, styled by `.orbit-stage` / `.orbit-card` in globals.css. It's data-driven: adding a program adds a stop.

- **Stage:** perspective 1800px. Cards are `min(440px, 78vw)` wide.
- **Front card:** no transform, full opacity and a soft shadow (`--shadow-orbit`, `0 30px 70px rgba(0,0,0,.45)`). It's the only card with the pink outline on hover and focus, the only tabbable card, and the only one that navigates on click.
- **Side cards** (previous and next): `translateX(∓68%) translateZ(-160px) rotateY(±14°)`, angled gently inward. They're darkened by a 72% Carbon overlay (`::after`), with no gradient masks. Clicking one brings it to the centre; it never navigates. Side cards are `aria-hidden` and not focusable.
- **All other cards:** hidden behind the front card (`opacity 0`, `translateZ(-420px) scale(.7)`). Nothing peeks out.
- **Motion:** transform, opacity, shadow and the overlay transition over 700ms with `cubic-bezier(.22,1,.36,1)` (`--ease-orbit`). With `prefers-reduced-motion` there are no transitions.
- **Arrows:** previous and next sit at either end of the program-name stops row under the stage, 12px from the names. They're thin chevrons (20px, 1.6px stroke, rounded ends) with no box or border, in Newsprint at 70%; hover and focus turn them break-on-dark pink, with the tone's focus ring. They're labelled "Previous program" / "Next program".
- **Input:** one stop per input, with a 520ms lock between steps. Inputs are the arrow buttons, the stop labels, the ← → keys, horizontal wheel or trackpad (accumulated `deltaX`, one step past 40px; mostly-vertical scrolls are ignored) and touch or drag (one step past 50px).
- **Mobile:** one card at a time, with the same stops and swipe.

## Accelerator page

`src/app/accelerator/`. Order: hero, video, steps + quick score (`#quick-score`), week one (Forest), touchpoints, proof, questions, closing CTA (Forest).

- **Hero:** headline, lead, price row (`$2,500` and "90 days · small businesses", see Numerals), caption, then the Calendly button and "Get your free score in 3 minutes ↓". On the right, the dashboard preview bleeds off the right edge with a bottom fade (1024px+); from 768 to 1023px it sits under the text at full width; below 768px it's hidden.
- **Video:** `VideoPlayer` is a 16:9 Carbon frame (radius 14) with a Newsprint round play button and a Bebas duration. It takes `src` and `poster` later and plays inline (muted, controls visible). Until then the button is disabled.
- **Steps:** a 2px divider, then `.dim-row` rows with Bebas numerals; step 01 carries the six area chips.
- **Touchpoints:** three equal cards (two Newsprint cards, one Carbon), each with a ghost numeral and a Bebas day label (Day 1, Day 45, Day 90) in the tone's numeral colour.
- **Questions:** the H2 on the left; the `Accordion` on the right.

## Offload Program page

`src/app/ai-accelerator/`. Order: hero, teams who've been through it, what you leave with, calculator (`#calculator`), case study (Forest, `#case-study`), thirty days (Carbon), guarantee, testimonials, questions, closing CTA (Forest).

- **Hero:** filled "New" badge, the three-line H1, lead, `$5,000` with "30 days · any industry" (both price colour), "Per team · on site or Zoom.", Calendly and "See a real build ↓". On the right a static two-card visual (`OffloadHeroVisual`, aria-hidden): the four-step journey track and a Session 3 quote generator for Conner's Cabins. From 1280px it starts below the H1's second line.
- **Teams:** `LogoWall variant="auto"`.
- **What you leave with** (`KitCarousel`): a horizontal scroll-snap track of five cards, each an artifact box (aria-hidden illustration) over a label (Bebas gold number, h4, body). **Every slot has the same fixed width and height at all times** (no layout animation), so the snap centre never moves. The spotlight is transform and opacity only: its 220px artifact box scales to 1.15 from its bottom centre inside a zone that already reserves the scaled height; its label doesn't scale, it's at full opacity and gains a 2px Canopy line. The others sit at 50% (see Surfaces). 400ms soft ease, instant with reduced motion. Slots snap to the centre, and the spotlight only updates after scrolling settles (`scrollend`, or a 150ms debounce). Artifacts must fit the 220px box. Starts on 03. `ChevronButton`s around a Bebas "03 / 05" counter (current Carbon, "/ 05" at 45%). Drag, swipe, trackpad and arrow keys move one card (`scroll-snap-stop: always`); clicking a side card brings it forward. A labelled region with a live announcement.
- **Calculator** (`TimeBackCalculator`, data in `src/lib/timeBack.ts`): a sentence (Epilogue 600, 26–44px) with four copper values (see Accent hierarchy) that open popovers (Newsprint, radius 14, soft shadow): styled native range sliders (sage-25 track, Canopy fill, Newsprint thumb with a Canopy ring; pink while dragging, with min/max below) or the job menu. Each slider has a small number field beside it for an exact value: any whole number in the range (cost: any whole dollar amount), clamped on Enter or blur, and in sync with the slider. Ranges: hours a week per person 1–40, people 1–50, hourly cost $20–$300 (slider steps of 5). Escape and outside clicks close a popover and return focus to its value. The Carbon result card shows yearly hours (Bebas gold) and cost (Bebas Newsprint) as `<Stat>`s, so they fit the card even at the maximum (104,000 h, $31,200,000), counting to new values in 300ms, the formula, "What we'd build", and an email row.
- **Case study** (`CaseSwitcher`): a tablist of four areas (selected: Newsprint fill, Carbon text, gold number; others Newsprint text, number at 50%), default Quotes; a Newsprint panel with the big number, Before / What it cost, and "What we built" on sage-25 (a darker Newsprint "Next" box for a roadmap item). A horizontal row above the panel on mobile. Then "What we measured".
- **Thirty days** (`ThirtyDays`), on Carbon. The heading row, then the content after the standard heading-to-content space (`clamp(28px, 5.5svh, 48px)`); the row of cards sits directly under the heading, not centred.
  - **Session cards:** Newsprint, radius 14 (the last one gold, Carbon text), 16px padding. Row state: small caps label (DM Sans 500, 12px, +0.12em, copper; Carbon on gold: "Week 0", "Session 1"…), title (Epilogue 600, 18px), one-line description (DM Sans 14px); no day number. Five equal cards across the full width with an 8px gap, 128–150px tall with the viewport height (never shorter than their content). Calendar state: "Day N" in the same label style and position, then the title.
  - **Calendar:** 6 × 5 with 8px gaps. Empty days have no box: a 1px Newsprint hairline at 14% along the top and the day number in Bebas (18px, Newsprint 32%) top-left. Session cards cover their date cells, inset 4px top and bottom. Row height = (stage height − gaps) / 5, at least 64px, so the calendar and heading fit one screen.
  - **Interaction** (768px+ wide and 640px+ tall, motion allowed): a track of the sticky stage height plus a travel of 35% of the viewport; the sticky container (below the 64px nav) holds the heading and the stage. Progress = clamp((0.5 × viewport − section top) / ((0.5 × viewport − nav) + travel)), so it starts when the section's top reaches the middle of the screen. 0–.08 hold on the row; .08–.72 the cards move and resize into their cells (eased in-out cubic; down to their rows by .40, then across into their columns, so no card crosses another; size changes over the whole span; transforms for position, width and height on the absolutely positioned cards); .08–.32 the row label and description fade out; .42–.70 "Day N" fades in; .27–.68 the empty days fade in; .72–1 hold, then the sticky releases. Reversible. Layouts are measured off-screen on mount, after fonts load and on resize (debounced), never mid-animation; one rAF update per scroll frame.
  - **Fallbacks:** reduced motion, or 768px+ but under 640px tall: the final calendar, static (no pin). Under 768px: a vertical list of row-state cards.
  - **Exception:** the calendar's "Day N" labels use the small caps label style rather than Bebas (unlike other number-led lines); the empty-day numbers stay Bebas.
- **Guarantee:** its own section; see Pink means clickable. No terms link until the terms are approved.
- **Testimonials:** a Sage quote card and two placeholders, no names or faces.

> **Calculator: front-end demo only.** The email is format-checked in the browser; nothing is stored or sent. Needs approval, a backend, the estimate email and a CASL check before going live (like the quick score).

### Building-supply case study

Every fact lives in `src/lib/buildingSupplyCase.ts` (areas, numbers, before, cost, what we built, measures, tools). The Offload page tells the full story (`#case-study`); the homepage shows a teaser built from the same data: chip and meta, "A building supplier's 30 days.", the intro, the four numbers (area label in Newsprint 65%, 4.6:1; Bebas number; label; 2px Fern line above), the four tools under thin Newsprint rules, and "See the full story →". Change the data file, never one page.

### Quick score

`QuickScore.tsx`, with every question, answer, weight and band in `src/lib/quickScore.ts`.

> **Quick score: front-end demo only.** Needs approval, real questions and scoring from Conner, backend scoring and storage, a report email and a CASL check before going live.

- **Deck:** three cards, right-aligned, up to 500px wide. Only the front card is fully visible; two plain shells peek out above it (16px and 32px up, inset 18px and 36px, soft shadow). The shell directly behind hints at the next card: Carbon when the inbox card is next, newsprint-hover otherwise.
- **Question card:** a meta label and "About 3 minutes", an 8-segment progress bar (Canopy done, sage-25 to do), the question (`type-h3`) and answer tiles: newsprint-hover fill with no outline; selected = Sage fill, Forest text and a filled radio. "← Back" and "Next". Next with no answer shows "Pick an answer to continue" (the button is never disabled).
- **Score card:** a Canopy donut on a sage-25 track, six area rows coloured by score band (see Accent hierarchy), the two biggest gaps, then the email row. The email is format-checked in the browser only.
- **Inbox card:** Carbon, "Report sent" in Fern, and "Retake the check" (a secondary button) back to question 1.
- **Scoring:** scored questions have four answers worth 100, 66, 33 and 0, plus "I'm not sure" (0). The overall score is the average of the six areas. Grades: 85+ A, 75+ B+, 65+ B, 55+ B−, 45+ C, 35+ D+, 25+ D, under 25 F.
- **Motion:** the outgoing card slides down and fades as the next one rises into place (400ms, `--ease-orbit` curve, framer-motion). With `prefers-reduced-motion` the swap is instant. Focus moves to the new card's title.

### Dashboard preview

`src/components/DashboardPreview/` is a port of the approved product prototype, `design/redesign/accelerator-dashboard-prototype-v3.html`. Change the prototype first, then the port.

- **It's the product's UI, not the site's:** its own small type sizes and layout, drawn at its design size (1280×760) and scaled to its container's width with a CSS transform. Colours, fonts and radii map to site tokens (`.dp-*` in globals.css). As a product mock-up it keeps the product's own colour coding (gold and copper grades and metrics, Bebas metric values) and its own subtle hovers, never the site's pink.
- **Display only:** the sidebar and the tactic tabs switch views; nothing navigates, nothing saves, and the checkboxes aren't interactive.
- **Accessible:** a region labelled "Interactive Accelerator dashboard preview, example business"; `tablist`/`tab`/`tabpanel` roles with arrow keys (↑ ↓ in the sidebar, ← → in the tactic tabs).
- **Thumbnail** (`<DashboardPreview variant="thumbnail" />`): the Dashboard screen only, scaled to fill its container's width, top-aligned, with the bottom faded out (`.fade-out-bottom`). Not interactive at all: `inert`, `aria-hidden` and no pointer events; the card around it carries the accessible name and the link. Put it in a slot with its own size, radius and `overflow: hidden`. Used in the Accelerator card of the Programs dropdown (16:9, radius 10) and on The Accelerator card in the homepage orbit (16:10, radius 14).

## Logo walls

`<LogoWall>` shows organization logos in **one colour**: each logo is drawn through a CSS mask filled with the tone's logo colour (`logo-on-light` or `logo-on-dark`), so every logo matches whatever its original colours were.

- **Accessible names:** each logo is `role="img"` with the organization's name.
- **Data:** the logo files live in `public/logos/`, with their sources in `public/logos/SOURCES.md`. The data lives in `src/lib/logos.ts`: `name`, `src`, `ratio` (width/height) and an optional `scale` override to tune a logo by eye.
- **Missing files:** an organization without a file shows its name in DM Sans 500, in the same colour. On Newsprint the text is slightly darker (64% Carbon) so it passes AA.
- **Optical sizing:** logos sit in a 48px slot (36px on mobile), scaled by aspect ratio so wide wordmarks and square badges carry the same weight.
- **Hover:** hovering the wall dims every logo to 50% except the one under the cursor (opacity only, 200ms).
- **Variants:**
  - `marquee`: one row with a 40s seamless loop and faded edges. It pauses on hover and keyboard focus, and becomes a static wrapped row under `prefers-reduced-motion`. It uses CSS animation only.
  - `row`: static and evenly spaced, wrapping on small screens.
  - `grid`: 7 columns on desktop, 4 on tablet and 3 on mobile, with no tiles or borders.
  - `auto`: one static row while the logos fit the width; it switches to the marquee only when they overflow (measured on a hidden copy, so it can't flicker). `marqueeClassName` adds the edge fades in marquee mode. Used for "Teams who've been through it" on the Offload page.
- **No separator lines:** no grey rules above, below or around a logo wall.
- **Event names** (such as "Recent stages") stay text: DM Sans 500 names separated by small Flint dots.

## Navigation and footer

- **Header:**
  - The `LogoLockup` sits on the left. Links are DM Sans 400, 17px, Carbon.
  - **Seamless at the top of the page:** no border and no shadow. Once the page scrolls, the header gets slightly more compact (84px → 64px), with Newsprint at about 92% opacity, a light backdrop blur and a soft shadow.
  - **No jumping:** the header is `position: fixed`, over an 84px spacer in the page flow that never changes size, so the shrink can't move the page content.
  - **Hysteresis:** the header switches to compact when `scrollY > 48px`, and back to expanded only when `scrollY < 16px`; between the two it keeps its state. Scroll position is read in a passive listener throttled with `requestAnimationFrame`.
  - Programs links to `/programs`. Hover or the chevron opens the static dropdown, with `aria-expanded`; Escape and an outside tap close it.
  - The Brief has a break dot.
  - The dropdown's Accelerator card shows "90 days" as a price line (Bebas, Newsprint 60%), not an eyebrow.
  - The Calendly CTA is 44px.
  - The groups live in `src/lib/navigation.ts`.
- **Footer** (on Carbon):
  - The `LogoLockup` in Newsprint, plus the NewsletterSignup.
  - Columns:
    - **Programs:** The Accelerator, Offload Program (AI Accelerator), Speaking, See all programs
    - **Strategy:** Marketing strategy, Destination partnerships
    - **Training:** Custom Training, JunctionU
    - **Company:** Work, About, The Brief, Contact
    - **Talk to us:** Calendly, email, LinkedIn

## Motion

- Links and buttons transition only `color`, `background-color`, `border-color`, `text-decoration-color`, `opacity` and `transform`, over 0.15s ease-out.
- Cards transition their outline, border and shadow, and list rows their fill.
- Buttons press down 1px when active.
- `prefers-reduced-motion` disables transitions.
- **framer-motion** (pinned) is used only for the hero wordmark's slower scroll and the quick score card swap. Everything else is CSS or small scroll handlers (the Offload calendar).
