# Featured product videos

The four cards under "Featured" in the header menu each play a short video
while hovered. The cards, their photographs and their video paths are listed in
`src/data/featured.js`. Until a video file exists, its card simply stays on the
product photograph, so the videos can be added one at a time.

## The rule that matters: the product must not change

An AI video model redraws every frame. Left to itself it will re-letter the
label, change the logo, move the FSSAI mark, or reshape the jar. A video that
does any of that shows a product Tatvyra does not sell, and must not be used.

To keep the pack identical to the real one:

1. **Use image-to-video, never text-to-video.** Start from the product's own
   photograph (the `imagePath` in `src/data/featured.js`) as the first frame.
   If the tool accepts a last frame too, give it the same photograph, so the
   clip ends where it began and loops cleanly.
2. **Keep the pack still.** Ask for motion *around* the product — pouring,
   drizzling, steam, powder settling, light moving — and for a locked camera.
   The less the label moves, the less the model redraws it.
3. **Do not ask for anything that covers or turns the label**: no hands on the
   jar, no rotating the pack, no opening or closing the lid, no zoom into the
   label text.
4. **Check every clip against the photograph before using it** (see the
   checklist below). Regenerate rather than accept a near miss.

If a tool cannot hold the label steady after a few attempts, the safe
fallback is a clip made from the real photograph alone — a slow push-in with
no AI involved. It is plainer, but the product in it is guaranteed correct.

## File spec

| | |
| --- | --- |
| Location | `public/videos/featured/<id>.mp4`, where `<id>` is the card's `id` |
| Format | MP4, H.264 video, no audio track |
| Shape | Portrait 4:5 — 720 × 900 is plenty for a menu card |
| Length | 4–6 seconds, ending on the frame it started on |
| Size | Under about 1.5 MB each |

File names, so they match `src/data/featured.js` without editing it:

- `natural-peanut-butter-creamy.mp4`
- `moringa-leaf-powder.mp4`
- `wild-forest-honey.mp4`
- `spirulina-powder.mp4`

## Prompts

Give the tool the product photograph as the start (and end) frame, then the
prompt. Every prompt ends with the same block, which is what protects the pack.

**Protection block — append to every prompt:**

> The product pack stays completely still and exactly as in the image: same
> jar or pouch shape, same label, same logo, same text, same colours, same
> position. Do not change, redraw, blur, move or cover the label. Locked-off
> camera, no zoom, no pan, no rotation. No hands, no people, no new objects,
> no added text or graphics. Soft natural studio light, shallow depth of
> field, realistic commercial food photography. Seamless loop: the last frame
> matches the first.

**Natural Peanut Butter Creamy** — `public/images/products/peanut-butter-creamy-1.webp`

> A slow, glossy ribbon of creamy peanut butter runs off the spoon into the
> small glass bowl beside the jar and folds into the surface. The peanuts on
> the cloth stay where they are.

**Moringa Leaf Powder** — `public/images/products/moringa-leaf-powder.webp`

> A fine drift of green moringa powder falls gently into the front bowl and
> settles on the mound, a faint haze of powder catching the light. The wooden
> scoops, the second bowl and the leaves on the table stay where they are.

**Wild Forest Honey** — `public/images/products/wild-forest-honey.webp`

> Thick golden honey drips slowly from the honeycomb on the dipper down into
> the open jar, the drops stretching and catching the light. The dipper and
> honeycomb hold their position.

**Spirulina Powder** — `public/images/products/spirulina-powder.webp`

> A fine drift of deep green spirulina powder falls gently into the front
> bowl and settles on the mound, with a soft shift of light across its
> surface. The wooden scoops, the second bowl and the leaves stay where they
> are.

## Checklist before a clip goes live

Open the clip next to its photograph and step through it.

- [ ] The brand name and product name read exactly as on the real pack in
      every frame — no misspelt, melted or shifting letters.
- [ ] The logo and every mark printed on the pack (the vegetarian mark, the
      eco mark, the SKU, the net weight) are unchanged and in the same place.
- [ ] The pack is the same shape, size and colour throughout.
- [ ] Nothing new has appeared (extra jars, hands, text, props).
- [ ] The last frame matches the first; the loop has no jump.
- [ ] No audio track; the file is under about 1.5 MB.

Then put the file in `public/videos/featured/` and hover the card in the menu.
