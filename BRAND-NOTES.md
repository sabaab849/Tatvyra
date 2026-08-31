# Tatvyra — brand implementation notes

How the site maps onto the Tatvyra brand guidelines, and where the guidelines
forced a decision. Read this before changing colours, type or product copy.

---

## Source material

Everything factual on this site comes from `/Brand Assets`:

| File | What was taken from it |
| --- | --- |
| `Catalogue V7.pdf` | The Tatvyra logo (as vector), the four category descriptions, all 16 SKUs with their sizes and key benefits, the five on-pack mark definitions, the FSSAI mark, the brand line, and the range photography |
| `Tatvyra Busniess cards copy.pdf` | Company name, email addresses, phone numbers, registered address, `www.tatvyra.com` |

Nothing else was invented. See **What is deliberately missing** below.

---

## Logo

`public/brand/tatvyra-logo.svg` (roundel + wordmark) and
`public/brand/tatvyra-logo-full.svg` (adds the brand line) were extracted as
**vector paths** from the catalogue artwork — not redrawn, not traced, not set
as live text. Proportions, spacing, the leaf mark and the wordmark are exactly
as supplied. The only change is that the CMYK-converted values in the PDF
(`#592d85`, `#e64630`) were restored to the official brand hexes (`#5A218A`,
`#F26422`).

`public/favicon.svg` is the Feynman Foodcraft roundel from the same lockup. The
guidelines say the **leaf mark must not appear on its own** until the brand is
established, so the favicon keeps the leaf inside the roundel rather than
isolating it.

Rules enforced in `src/components/Logo.jsx`:

- Intrinsic aspect ratio is fixed per variant and never distorted.
- Width is clamped to the 120px digital minimum for the full lockup.
- Clear space is applied as padding on `.logo` (roughly the leaf-mark height).
- No shadow, glow, outline, bevel, rotation, or placement over busy imagery.
- On the aubergine footer the lockup sits on a Warm White holding shape — the
  mark itself is never recoloured.

---

## Colour

Only the seven brand colours appear anywhere in the CSS. You can verify this:

```bash
grep -rhoE "#[0-9a-fA-F]{3,8}" src/styles/ | sort -u
# → #2a2118 #30143f #5a218a #c9b8e8 #f26422 #f6b39b #f8f5ec
```

Every tint (`--surface-sunken`, `--text-muted`, `--line`, …) is a `color-mix()`
of two brand colours, so no eighth hue is ever introduced. Shadows use Ink with
alpha rather than black.

Balance follows the guidelines: Warm White is the page ground throughout, Ink
carries body copy, Purple carries headlines and the primary button, and Burnt
Orange stays an accent — the announcement rule, section rules, list bullets,
the active-nav underline, the cart badge, and one CTA button per view.

**No purple/orange gradient exists.** The only gradient on the site is the
single lilac wash behind the hero, which fades from Lilac to transparent Lilac.

### Where orange was pulled back, and why

Burnt Orange on Warm White measures about **2.9:1** — below the 4.5:1 needed for
body-size text. Rather than break either the palette or accessibility, orange is
used as *ground and graphic*, never as small text on Warm White:

- Eyebrows, numerals and category labels are Purple or Ink tints.
- The accent button is orange ground with **Deep Aubergine** text (5.0:1).
- The cart badge is orange ground with Deep Aubergine digits.
- Rules, bullets and underlines stay orange — they carry no text.

On dark grounds Soft Peach does the accent work, which clears AA comfortably.

---

## Typography

| Role | Face |
| --- | --- |
| Hero headline, section headings, large editorial statements | **Lumaire** (`--font-display`) |
| Navigation, body, buttons, forms, labels, product info | **Helvetica** (`--font-body`) |
| Anything | **Never Poppins** — the guidelines reserve it for the catalogue |

### Lumaire is not installed

The licensed Lumaire files are not in `/Brand Assets`, so they are not in this
repository, and no look-alike was substituted. Until they are supplied,
headlines render in Helvetica — the brand's own second face — so the site stays
compliant rather than approximating the display face with something random.

**To switch headlines to Lumaire:**

1. Put `Lumaire.woff2` (and optionally `Lumaire.woff`) in `public/fonts/`.
2. Uncomment the `@font-face` block in `src/styles/fonts.css`.

Nothing else changes — `--font-display` already lists `'Lumaire'` first.

---

## Photography

The catalogue contains range photography but **no per-SKU packshots**, and the
files are small (the widest is 660px). Consequences:

- Product cards and galleries fall back to the authentic photograph for that
  range. Each SKU has a `focus` (object-position) and `zoom` value in
  `src/data/catalogue.js` so sibling products read as different frames of the
  same shoot rather than the identical image repeated.
- Media frames are 4:3 (1:1 on phones) because a taller crop would upscale the
  source past the point where it holds up.
- Product detail pages say so in the gallery caption rather than implying the
  image is the pack.

**When real packshots arrive:** add an `image` (card) and/or `images` array
(gallery) to the SKU in `src/data/catalogue.js`. Both the card and the gallery
already prefer them and the caption disappears automatically. No packaging was
recreated, retouched or relabelled anywhere on the site.

---

## What is deliberately missing

The supplied material contains no prices, ingredient declarations, nutrition
panels, dosage guidance, certifications beyond FSSAI, reviews, ratings or
policies. None were invented. Instead:

| Missing | How the site handles it |
| --- | --- |
| Prices | "Price on request", with a note on the PDP. `price: null` is ready for real values. |
| Checkout | The cart is real and persists, but routes to a pricing enquiry — no fake payment step. |
| Ingredients / nutrition | The PDP states plainly that they are not yet published and points to the on-pack label and a real email address. |
| Reviews, ratings, awards | Absent. No placeholder stars, no "as seen in". |
| FAQ, shipping, returns, privacy, terms | Real routes that say the page is being prepared and give a working contact. Better an honest blank than invented terms. |
| Newsletter / contact submission | Forms validate and are wired, but say no endpoint is connected and hand the visitor an email address. |
| Social links | Omitted — no URLs were supplied. |

### Claims

Product benefits are transcribed **verbatim** from the catalogue. The five
on-pack marks carry the catalogue's own definitions word for word, including
the scope limits — e.g. the Vegan mark explicitly excludes raw honey, and it is
not applied to any honey SKU. Marks are assigned per SKU by hand in
`src/data/catalogue.js`, never applied blanket-fashion. "FSSAI-certified process
behind every batch" is used with the same wording as the catalogue, and the
FSSAI mark is the brand's own supplied asset.

No medical promise, superlative or unsupported claim appears in the copy.
