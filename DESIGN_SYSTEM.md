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

### Pink means clickable

Pink appears only on things you can click. Non-clickable elements never get a pink hover.

- **Links:** pink text (and underline) on hover, as below.
- **Clickable cards:** the whole card is the link (`<Card href>`), with no button or second link inside. On hover and keyboard focus it gets a 2px break-pink outline, offset 4px.
- **Clickable list rows:** the newsprint-hover highlight plus a pink title (see Surfaces).

### Eyebrows are for meta labels only

Use `<Eyebrow>` only for meta labels: case-study meta ("Travel Yukon · Training · 4 years"), dates, categories, roles. **Never put an eyebrow above a section or page heading.**

- **Card and box labels are meta labels and stay:** the Custom Training audience cards, "The guarantee" and "The Brief · weekly". Mock-UI labels inside product mockups also stay.
- **Section headings are always real headings** (`<h2 className="type-h2">`), never eyebrow-styled. Examples: "Questions", "What we believe", "Formats".
- **Hero meta without eyebrows:** put durations and audiences under the lead as a price line (`type-price`, for example "90 days · small businesses"). Put other facts in a small muted caption (`type-small`, for example "Formerly eLearningU", "100+ articles").

### Faces

The only faces on the site are the Junction team's. Testimonials and quote cards never carry a headshot. `AvatarSlot` (the round photo placeholder) is only for team members, such as Conner on step 01 of "What happens on the call".

### Links turn pink on hover

All links turn pink on hover, and the text and underline change together:

- break-on-light on Newsprint
- break-on-dark on Carbon and Forest

**Known exception:** break-on-dark on Forest is **2.9:1**, which is below AA. This is accepted for the hover state only. The resting colour (fern, 5.0:1) passes, and the underline stays as a second cue.

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
| `type-stat` | clamp(96px, 13vw, 200px) | .85 | Big stats. Use `<Stat>`, which has no rule and a body-size label below. |
| `type-numeral` | clamp(40px, 3.4vw, 48px) | .9 | Index numbers (01, 02…) in lists and cards |
| `type-price` | 40px | 1 | Prices and durations ("$2,500 · 90 days", "30 days"). Carbon 60% on light, Newsprint 60% on dark. |

Fonts are loaded in `src/app/layout.tsx` with `next/font/google` and exposed as `--nf-*` variables. They map to the `font-sans` (DM Sans 300/400/500), `font-display` (Epilogue 600/900), `font-quote` (Fraunces 900 italic) and `font-wordmark` (Bebas Neue 400) utilities.

Use real heading elements in order: h1, then h2, then h3, with no skipped levels. The visual class is independent of the element.

## Spacing, widths, radius

| Token / utility | Value | Use |
|---|---|---|
| `py-section` | clamp(80px, 9vw, 136px) | Default section top and bottom |
| `py-section-tight` | clamp(64px, 7vw, 100px) | Stacked sections that belong together, and heroes |
| `px-gutter` | clamp(20px, 4vw, 60px) | Side gutter (applied by `Section`) |
| `card-pad` | 28px (24px under 640px) | Card padding (applied by `Card`) |
| `gap-6` | 24px | Gap between components |
| `mt-9` / `mb-9` | 36px | Heading to content |
| `max-w-wide` / `-headline` / `-body` | 1320 / 1040 / 680px | Containers |
| `rounded-control` | 10px | Buttons, inputs, chips, badges, menu items, list-row highlights |
| `rounded-card` | 14px | Cards, panels, the dropdown, media frames, tables |
| `shadow-card` | `0 1px 2px rgba(28,28,26,.06), 0 10px 28px rgba(28,28,26,.07)` | Default card elevation |

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
- **Photos:** never get an outline or the 3px top line. A floating photo may have a soft shadow (`shadow-card`) and radius 14.
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
| `Section` | `tone="newsprint" \| "carbon" \| "forest"` and `spacing="default" \| "tight"`. `flush="top" \| "bottom"` drops one side's padding. |
| `Container` | `width="wide" \| "headline" \| "body"`, centred. Use `as` for lists. |
| `Button` | `variant="primary" \| "secondary"` and `size="default" \| "sm"`. Renders a `Link`, an `<a>` (external links open in a new tab) or a `<button>`. Every "Book a 20-min call" button uses `CALENDLY_URL`. |
| `TextLink` | Underlined; colour from the tone, with a pink hover on text and underline. |
| `Eyebrow` | Meta labels only (never above a heading). Tone eyebrow colour. `variant="highlight"` adds a break dot and pink text. |
| `Stat` | `value` and `label`. A Bebas number with the label below in body size, and no rule. Gold on Newsprint and Carbon, Newsprint on Forest. |
| `Card` | See Surfaces. `tone`, `href` and `padded`. |
| `QuoteCard` | Sage fill, radius 14, `type-quote` with a Forest caption. No headshots (faces rule). |
| `Callout` | sage-25 box, radius 14, Forest text and links. For a short highlighted statement. |
| `AvatarSlot` | Small round dashed placeholder for a Junction team member's photo (never a client's). |
| `Badge` | `outline` (2px break border, pink text, dot) or `filled` (break-on-light fill). Radius 10. |
| `Chip` | `sage` (sage fill, Forest text), `outline` (1.5px Forest) or `fern-outline` (1.5px Fern border and text, for dark grounds). Radius 10. |
| `Input`, `Select`, `Textarea` | Always labelled. 48px, with a Flint border and a canopy-text focus. |
| `NewsletterSignup` | One row (email and Subscribe), labelled "Get The Brief in your inbox", with the helper line "[ Frequency ] · unsubscribe anytime". Submission is a TODO. |
| `Placeholder` | Dashed stand-in for missing media or content |
| `Wordmark` | `JUNCTION_` in Bebas with a Canopy underscore. The underscore is part of the logo. |
| `LogoLockup` | Wordmark, a 1px divider (20% of the text colour, 34px tall) and the tagline "Strategy & / Capacity Building" (DM Sans 400, 14px, muted, .04em). Links to `/`. With `collapseOnSmall`, the divider and tagline are dropped under 420px. |
| `SkipLink` | Rendered once by the root layout |
| `LogoWall` | `logos`, `label`, and `variant="marquee" \| "row" \| "grid"`. See below. |

Toggle pills are `<button aria-pressed>` elements inside a labelled `role="group"`. FAQ toggles use `aria-expanded` and `aria-controls`.

## Homepage hero

The hero has three layers, bottom to top:

1. **Dashboard area** (`.hero-dashboard`, a placeholder for now). One large newsprint-hover block that:
   - starts 40% from the left, 16px below the nav, and bleeds off the right edge of the viewport;
   - ends at the bottom of the CTA row;
   - has radius 14 on its left corners and a gradient fade to transparent on its left side, so it melts into the page under the headline;
   - shows its label in the visible right part, clear of the photo, with no dashed border;
   - is hidden below 1024px.
2. **Headline, lead and CTAs**, overlapping the dashboard's faded left side.
3. **Team photo**, floating over the dashboard's right part (radius 14, soft shadow, -1.5°).

## Program orbit (homepage "Find your program")

`src/app/ProgramOrbit.tsx`, styled by `.orbit-stage` / `.orbit-card` in globals.css. It's data-driven: adding a program adds a stop.

- **Stage:** perspective 1800px. Cards are `min(440px, 78vw)` wide.
- **Front card:** no transform, full opacity and a soft shadow (`--shadow-orbit`, `0 30px 70px rgba(0,0,0,.45)`). It's the only card with the pink outline on hover and focus, the only tabbable card, and the only one that navigates on click.
- **Side cards** (previous and next): `translateX(∓68%) translateZ(-160px) rotateY(±14°)`, angled gently inward. They're darkened by a 72% Carbon overlay (`::after`), with no gradient masks. Clicking one brings it to the centre; it never navigates. Side cards are `aria-hidden` and not focusable.
- **All other cards:** hidden behind the front card (`opacity 0`, `translateZ(-420px) scale(.7)`). Nothing peeks out.
- **Motion:** transform, opacity, shadow and the overlay transition over 700ms with `cubic-bezier(.22,1,.36,1)` (`--ease-orbit`). With `prefers-reduced-motion` there are no transitions.
- **Input:** one stop per input, with a 520ms lock between steps. Inputs are the arrow buttons, the stop labels, the ← → keys, horizontal wheel or trackpad (accumulated `deltaX`, one step past 40px; mostly-vertical scrolls are ignored) and touch or drag (one step past 50px).
- **Mobile:** one card at a time, with the same stops and swipe.

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
- **No separator lines:** no grey rules above, below or around a logo wall.
- **Event names** (such as "Recent stages") stay text: DM Sans 500 names separated by small Flint dots.

## Navigation and footer

- **Header:**
  - The `LogoLockup` sits on the left. Links are DM Sans 400, 17px, Carbon.
  - **Seamless at the top of the page:** no border and no shadow. Once the page scrolls, the header gets slightly more compact, with Newsprint at about 92% opacity, a light backdrop blur and a soft shadow.
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
