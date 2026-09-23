# Fonts

This folder holds two faces, each for one job only. Site typography uses the
Helvetica Neue / Helvetica / Arial system stack and needs no files here.

- **`OoohBaby-Regular-latin.woff2`** — the handwritten notes on the homepage
  brand section, and nothing else. "Oooh Baby" by Robert Leuschke, SIL Open
  Font License 1.1, so it may be bundled and self-hosted. Committed.
- **Luminaire** — the logo's face. See below.

The files are licensed and deliberately not committed. To enable Luminaire:

1. Add `Luminaire.woff2` (and optionally `Luminaire.woff`) to this folder.
2. Uncomment the `@font-face` block in `src/styles/fonts.css`.

It is left switched off until then, because a declaration pointing at a missing
file would 404 on every page load. Do not substitute a downloaded look-alike.

**Note:** the current logo (`public/brand/tatvyra-logo.svg`) is vector artwork
with its wordmark drawn as outlined paths, not set as text. Enabling Luminaire
styles the `.logo` element, but a font cannot redraw those paths — it only takes
effect if the wordmark is ever set as live text. To change the logo itself,
re-export the artwork.
