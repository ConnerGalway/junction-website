# Junction design system

The design system lives in code:

- **Tokens, tones and type classes:** `src/app/globals.css`
- **Components:** `src/components/ui/`, exported from `@/components`
- **Navigation data** (shared by the header dropdown, mobile menu, footer and `/programs`): `src/lib/navigation.ts`

This file explains the rules behind them. If you're adding a page, compose it from `Section`, `Container` and the components below. Don't hand-roll colours, font styles or spacing.

## Hard rules

- **Never use pure white.** Newsprint (`#F4F0E8`) replaces white everywhere: cards, inputs, badges and text. The default Tailwind palette is cleared, so `bg-white` and `text-white` no longer exist.
- **Bebas Neue is for the `JUNCTION_` wordmark only.** Use the `<Wordmark />` component.
- **No hex or rgba values in pages, and no inline font styles.** Use tokens and type classes.
- **No hard edges.** Every box, control and media frame is rounded.

## Colour tokens

Defined directly in `@theme`, so each token generates `bg-*`, `text-*`, `border-*` and similar utilities.

| Token | Value | Use |
|---|---|---|
| `carbon` | `#1C1C1A` | Text on Newsprint; dark ground |
| `flint` | `#6A6862` | Muted text on Newsprint (the only muted value on light) |
| `newsprint` | `#F4F0E8` | Main ground; replaces white |
| `forest` | `#1A4D2E` | Closing CTA band; text on Sage |
| `canopy` | `#2E7D4F` | Rules and fills (not text) |
| `canopy-text` | `#2B764A` | Links, text and primary button fill on light |
| `fern` | `#7FC99A` | Eyebrows and links on Carbon or Forest |
| `sage` | `#C8E8D4` | Inside boxes only (quote cards, chips) |
| `accent-1` | `#C4963A` | Burnt yellow. Stats, **on Carbon only** |
| `accent-2` | `#A55527` | Copper. Eyebrows and stats on Newsprint (text-safe) |
| `break` | `#E0176A` | Dots, outlines, underlines (not body text) |
| `break-on-light` | `#CD1561` | Pink text and fills on Newsprint |
| `break-on-dark` | `#ED5192` | Pink text on Carbon and Forest |
| `newsprint-muted` | `rgba(244,240,232,.8)` | Muted text on dark |
| `hairline` | `rgba(28,28,26,.14)` | 1px separators on light |
| `hairline-dark` | `rgba(244,240,232,.15)` | 1px separators on dark |

Contrast on the intended ground (WCAG AA is 4.5:1 for normal text):

- **On Newsprint:**
  - flint 4.9
  - canopy-text 4.87 (newsprint on canopy-text is the same, 4.87)
  - accent-2 4.70
  - break-on-light 4.77
- **On Carbon:**
  - fern 8.7
  - accent-1 6.3
  - break-on-dark 5.0
  - newsprint-muted 10.0
- **On Forest:**
  - fern 5.0
  - newsprint-muted 6.1
- **On Sage:** forest 7.4

## Colour roles: grounds and tones

Every section has a **tone**. `<Section tone="…">` (and `<Card tone="carbon">`) applies a `.tone-*` class. The class sets the ground colour plus CSS variables that every component reads, so text, links, eyebrows, stats, buttons and the focus ring all adapt automatically:

- `--tone-text`
- `--tone-muted`
- `--tone-eyebrow`
- `--tone-link`
- `--tone-link-hover`
- `--tone-focus`
- `--tone-rule`
- `--tone-hairline`
- `--tone-stat`
- `--tone-highlight`
- `--tone-btn-*`

You can read the variables directly in a page with classes such as `text-(--tone-stat)` or `border-(--tone-rule)`. `text-muted` is shorthand for the muted colour.

| | Newsprint (about 80% of a page) | Carbon (about 12%) | Forest (about 8%) |
|---|---|---|---|
| Where | Default ground | Dark sections and panels | **The closing CTA band only.** One per page, always the last section. |
| Text | carbon | newsprint | newsprint |
| Muted | flint | newsprint-muted | newsprint-muted |
| Eyebrow | accent-2 | fern | fern |
| Links | canopy-text | fern | fern |
| Link hover | break-on-light | break-on-dark | break-on-dark (see the exception below) |
| Rules | canopy | fern / hairline-dark | fern / hairline-dark |
| Stats | accent-2 | accent-1 | newsprint (no accent-1 on Forest) |
| Primary button | canopy-text fill, newsprint text | newsprint fill, carbon text | newsprint fill, forest text |
| Secondary button | 1.5px carbon outline | 1.5px newsprint outline | 1.5px newsprint outline |
| Focus ring | 2px canopy-text | 2px fern | 2px fern |

Other ground rules:

- **Sage is never a full-width section.** Use it only inside boxes such as quote cards and chips. Sage boxes use the `tone-sage` variables, with forest text. Avoid putting links on Sage: canopy-text is only 4.2:1 there.
- **accent-1 (burnt yellow) appears only on Carbon.**
- **Dark boxes inside a Newsprint section are Carbon** (`<Card tone="carbon">`). There are no Forest boxes.

### Links turn pink on hover

All links turn pink on hover, and the text and underline change together:

- break-on-light on Newsprint
- break-on-dark on Carbon and Forest

**Known exception:** break-on-dark on Forest is **2.9:1**, which is below AA. This is accepted for the hover state only. The resting link colour (fern, 5.0:1) passes, and the colour change is not the only hover cue, because the underline stays.

## Type scale

The type classes live in `@layer components`, so a colour utility can still override them.

| Class | Font | Size | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| `type-display` | Epilogue 900 | clamp(56px, 7.5vw, 120px) | .92 | -0.045em | `text-wrap: balance`. Page h1, plus closing-CTA headlines. |
| `type-h2` | Epilogue 900 | clamp(40px, 4.8vw, 72px) | .98 | -0.045em | Section headings |
| `type-h3` | Epilogue 900 | clamp(26px, 2.4vw, 36px) | 1.05 | -0.03em | Card and sub-section titles |
| `type-h4` | Epilogue 600 | 22px | 1.15 | -0.015em | List and step titles, index numbers |
| `type-lead` | DM Sans 300 | clamp(20px, 1.7vw, 24px) | 1.5 | — | Max 34ch. Hero intros. |
| `type-body` | DM Sans 300 | 18px | 1.8 | — | Max 680px. All running copy. |
| `type-small` | DM Sans 400 | 15px | 1.6 | — | Muted colour (flint, or newsprint-muted on dark) |
| `type-eyebrow` | DM Sans 500 | 13px | 1.4 | .14em, uppercase | Tone eyebrow colour. Use `<Eyebrow>`. |
| `type-quote` | Fraunces 900 italic | clamp(28px, 3vw, 44px) | 1.15 | — | Pull quotes only |
| `type-button` | DM Sans 500 | 16px | 1.2 | — | Sentence case. There is no uppercase button style. |
| `type-stat` | Epilogue 900 | clamp(64px, 7.5vw, 104px) | .9 | -0.05em | Use `<Stat>` |
| `type-wordmark` | Bebas Neue 400 | — | 1 | .08em | Wordmark only |

Fonts are loaded in `src/app/layout.tsx` with `next/font/google` and exposed as `--nf-*` variables. They map to the `font-sans` (DM Sans 300/400/500), `font-display` (Epilogue 600/900), `font-quote` (Fraunces 900 italic) and `font-wordmark` (Bebas Neue 400) utilities.

Use real heading elements in order: h1, then h2, then h3, with no skipped levels. The visual class is independent of the element. For example, a closing-CTA `h2` can use `type-display`.

## Spacing, widths, radius

| Token / utility | Value | Use |
|---|---|---|
| `py-section` (`--spacing-section`) | clamp(96px, 11.5vw, 168px) | Default section top and bottom |
| `py-section-tight` | clamp(72px, 8vw, 120px) | Stacked sections that belong together, and heroes |
| `px-gutter` | clamp(20px, 4vw, 60px) | Side gutter (applied by `Section`) |
| `card-pad` | 32px (24px under 640px) | Card padding (applied by `Card`) |
| `gap-6` | 24px | Gap between components |
| `mt-9` / `mb-9` | 36px | Heading to content (32–40px) |
| `max-w-wide` | 1320px | Default container |
| `max-w-headline` | 1040px | Headline measure |
| `max-w-body` | 680px | Body column for running copy |
| `rounded-control` | 10px | Buttons, inputs, chips, badges, menu items |
| `rounded-card` | 14px | Cards, panels, the dropdown, media frames, tables |

## Components (`@/components`)

| Component | Usage rules |
|---|---|
| `Section` | `tone="newsprint" \| "carbon" \| "forest"` and `spacing="default" \| "tight"`. `flush="top" \| "bottom"` drops one side's padding when a section continues the one above. Forest is only for the last, closing CTA band. |
| `Container` | `width="wide" \| "headline" \| "body"`, centred. Use `as` to render a list or other element. |
| `Button` | `variant="primary" \| "secondary"`. Renders a `Link`, an `<a>` (external links open in a new tab; mailto) or a `<button>` (defaults to `type="button"`). 52px minimum height, radius 10, colours from the tone. Every "Book a 20-min call" button uses `CALENDLY_URL`. |
| `TextLink` | Underlined; colour from the tone, with a pink hover on text and underline. `arrow` appends " →". Don't add it when the copy already ends in an arrow. |
| `Eyebrow` | Tone eyebrow colour. `variant="highlight"` adds a break dot and pink text (break-on-light on light, break-on-dark on dark). |
| `Stat` | `value` and `label`. `variant="everyday"`: accent-2 number on Newsprint with a 1.5px accent-2 top rule. `variant="feature"`: accent-1 number, on Carbon only. |
| `Card` | Radius 14, hairline border, no fill (Newsprint shows through). `tone="carbon"` makes a Carbon panel. `href` makes the whole card a link, and its border turns pink on hover. |
| `QuoteCard` | Sage fill, radius 14, `type-quote` quote with a forest caption. For pull quotes in a box. |
| `Badge` | `outline`: 2px break border, break-on-light text, break dot. `filled`: break-on-light fill with newsprint text. Radius 10. |
| `Chip` | `sage`: sage fill, forest text. `outline`: 1.5px forest outline, forest text. Radius 10. |
| `Input`, `Select`, `Textarea` | Always labelled. `hideLabel` keeps the label available to screen readers only. Flint 1.5px border, newsprint fill, canopy-text focus border plus a tone-coloured ring. |
| `NewsletterSignup` | One row (email input and Subscribe button), labelled "Get The Brief in your inbox", with the helper line "[ Frequency ] · unsubscribe anytime". Submission is a TODO. |
| `Placeholder` | Dashed stand-in for missing media or content. Keep the `[ … ]` copy. |
| `Wordmark` | `JUNCTION_` in Bebas with a canopy underscore. |
| `SkipLink` | Rendered once by the root layout. Jumps to `<main id="main">`. |

Toggle pills (filters and type pickers) are `<button type="button" aria-pressed>` elements inside a `role="group"` with an accessible name. They have a 1.5px forest outline; the active one is a forest fill with newsprint text. FAQ toggles use `aria-expanded` and `aria-controls`.

## Navigation

- **Programs** links to `/programs`. Hover, or the chevron button (click, tap, or Enter/Space), opens a static dropdown that is right-aligned under the nav.
- **Escape** closes it and returns focus to the chevron. The dropdown also closes on an outside press, on blur and on route change.
- **Mobile:** a collapsible panel with the same groups stacked.
- **Editing:** the groups live in `src/lib/navigation.ts`, so edit them there.

## Motion

- Links and buttons transition only `color`, `background-color`, `border-color`, `text-decoration-color`, `opacity` and `transform`, over 0.15s ease-out.
- Buttons press down 1px when active.
- `prefers-reduced-motion` disables transitions.
- Framer Motion and Lenis are not installed yet.
