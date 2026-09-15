# Fonts

`Lumaire.woff2` (and optionally `Lumaire.woff`) belong in this directory.

The files are licensed and are deliberately not committed. The `@font-face`
block in `src/styles/fonts.css` is already active and `--font-display` already
lists `'Lumaire'` first, so dropping the files in here is the only step left —
no code change is needed.

Until they are present the request 404s and headlines fall back to Helvetica,
the brand's own secondary face. Do not substitute a downloaded look-alike.
