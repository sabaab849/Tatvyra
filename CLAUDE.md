# Tatvyra website — design rules

These rules hold for every page and component. The tokens they name live in
`src/styles/tokens.css`. Use the tokens rather than raw values, and when a
change seems to need a value the system does not have, change the system here
and in `tokens.css` first.

## Type

**One family.** Every piece of text is `var(--font-sans)`: Helvetica Neue,
then Helvetica, then Arial. It is set once on `body` and inherited. Never
declare another family for text. The only exceptions are the logo
(`--font-logo`), the handwritten notes on the homepage (`--font-script`) and
order references and codes (monospace).

**Headings.** Every heading, at every size and in every section — hero, page,
section, card, product and range names — uses:

| Property       | Value                         |
| -------------- | ----------------------------- |
| font-family    | `var(--font-sans)` (inherited) |
| font-weight    | `var(--type-heading-weight)` plus `--weight-stroke: var(--heading-stroke)` and `paint-order: stroke fill` (Semibold) |
| letter-spacing | `var(--heading-tracking)` (-0.02em as seen) |
| font-size      | a step from the scale below   |
| line-height    | the leading that step takes   |

Helvetica, Helvetica Neue and Arial have no Semibold cut: asked for 600, they
draw their Bold. So a heading is set in the Regular cut, thickened by a
hairline outline in its own colour, which lands between Regular and Bold.
Every rule that sets `font-weight: var(--type-heading-weight)` also sets
`--weight-stroke: var(--heading-stroke)` and `paint-order: stroke fill`. Never
use 600 or 700 for a heading.

- **Sizing the outline.** A universal rule in `base.css` turns
  `--weight-stroke` into the outline, worked out against each element's own
  font size. Do not set `-webkit-text-stroke` directly: on a heading whose
  words are sized inside it, an em width fixes at the heading's size and shows
  as a hairline on the larger words.
- **Letter spacing.** For the same reason, words sized inside a heading set
  their own `letter-spacing: var(--heading-tracking)`.
- **Tracking token.** It gives back the width the outline adds, so the space
  between letters reads as -0.02em.

**Case.** Hero and page titles are in Title Case ("A Little Indulgence. A Lot
of Goodness."). Section headings and everything smaller are in sentence case.

`h1`–`h6` pick up the family, weight, tracking and a default line height from
`base.css`. Components set only the size, the matching line height, colour
and spacing.

### Type scale

Fluid steps. Each one grows from its first size on a 360px screen to its
second at 1440px. Body copy is 18–19px; nothing meant to be read as a
sentence is set below `--step--1` (15–16px).

| Step       | Size        | Use                                         | Line height |
| ---------- | ----------- | ------------------------------------------- | ----------- |
| `--step-6` | 48 – 112px  | Display: jungle closing line                | `--leading-display` (1) |
| `--step-5` | 40 – 78px   | Hero and page titles, big statements        | `--leading-display` (1) |
| `--step-4` | 32 – 54px   | Section headings                            | `--leading-heading` (1.1) |
| `--step-3` | 27 – 38px   | Sub-sections, category cards                | `--leading-heading` (1.1) |
| `--step-2` | 23 – 28px   | Block headings, drawer and form titles      | `--leading-subhead` (1.25) |
| `--step-1` | 20 – 23px   | Card and product names; ledes               | `--leading-subhead` (1.25) or `--leading-lede` (1.5) |
| `--step-0` | 18 – 19px   | Running copy; small inline headings         | `--leading-body` (1.6) |
| `--step--1`| 15 – 16px   | Secondary copy, captions, buttons, cart lines | `--leading-body` (1.6) |
| `--step--2`| 12 – 13px   | Labels only                                 | — |

Choose a heading's step by its **role**, not by what fits: a section heading
is `--step-4` on every page.

### Line height

There are five settings and no others:

- `--leading-display` (1): step-5 and step-6.
- `--leading-heading` (1.1): step-3 and step-4.
- `--leading-subhead` (1.25): headings at step-2 and below.
- `--leading-lede` (1.5): an intro paragraph at step-1 or step-2.
- `--leading-body` (1.6): all running text.

### Labels, buttons and body text

These are not headings, and keep their own settings:

- **Labels** (eyebrows, kickers, metadata, ornaments): `--step--2`, uppercase,
  `var(--type-label-weight)`. Tracking is 0.18em for an eyebrow or name,
  0.12em for metadata and 0.26em for an ornament.
- **Buttons and quiet CTA links**: `--step--1`, uppercase,
  `var(--type-button-weight)`.
- **Product names in running text** may use `var(--type-product-weight)`.
  Where a product or range name is the heading of its card, it is a heading.
- **Running text** is never tracked and never bold, except for a deliberate
  word of emphasis.

## Spacing

Every margin, padding and gap comes from the spacing scale:

| Token          | Size  | Typical use                                   |
| -------------- | ----- | --------------------------------------------- |
| `--space-3xs`  | 4px   | Icon to text, tight inline gaps               |
| `--space-2xs`  | 8px   | Label to heading                              |
| `--space-xs`   | 12px  | Between list items                            |
| `--space-s`    | 16px  | Heading to its copy; between paragraphs       |
| `--space-m`    | 24px  | Copy to buttons; inside cards                 |
| `--space-l`    | 32px  | Between blocks within a section               |
| `--space-xl`   | 48px  | Section header to its content                 |
| `--space-2xl`  | 64px  | Between major groups                          |
| `--space-3xl`  | 96px  | Rare: very large separations                  |
| `--section-y`  | 44 – 80px | Top and bottom of a section               |
| `--section-y-tight` | 36 – 56px | A section that continues the one above |
| `--section-y-snug` | 28 – 44px | Every section of a page that runs as one story (About) |
| `--gutter`     | 20 – 48px | Page side margins                         |

The rhythm inside a section is always the same, from top to bottom:

1. Label → heading: `--space-2xs`
2. Heading → copy: `--space-s`
3. Copy → buttons: `--space-m`
4. Section header → its content: `--space-xl`

Sections are padded with `--section-y` and never with raw values. Horizontal
page margins are `--gutter` (inside `.shell`).

## Exceptions, on purpose

A few headings are sized to an illustration or a poster and scale with their
container (`cqi`/`cqw`), not with the screen: the product origin and benefit
maps, the journey finale, and the "Rise. Nourish. Thrive." poster on the About
page. They keep their own sizes, and the poster keeps its tight line height,
but they still take the heading weight and tracking. Do not add new ones
without a reason this strong.

## Current gaps

When these rules were introduced, every heading was moved onto them. Spacing
was only partly migrated: values that already equalled a step were converted,
but about 200 declarations still use raw values (0.35rem, 0.6rem, 1.25rem,
bespoke `clamp()`s). When you touch a rule that has one, move it to the
nearest token as part of that change.

## Content

- **Product names never contain commas.** Write "Peanut Butter Creamy", never
  "Peanut Butter, Creamy".
- **No long dashes (— or –) anywhere in the site's text.** This includes page
  titles, alt text and screen-reader text. Use a comma, colon, full stop or
  brackets instead, whichever the sentence needs. Page titles are written
  "Page | Tatvyra". Hyphens inside compound words (clean-label, gluten-free,
  co-founder) are fine. Code comments are not site text.
- Product copy, claims and benefits come from the catalogue
  (`src/data/catalogue.js`). Do not write new claims, and make no sugar claims
  anywhere.

## Checking a change

Run the site (`npm run dev`) and look at the page at 1440px and 390px wide.
Every visible `h1`–`h6` should compute to Helvetica (or Arial), the heading
weight with its outline and the heading tracking, with no horizontal scroll.
