import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'

/**
 * "The Four Pillars of Daily Ritual" — the four ranges as irregular blobs
 * scattered across an editorial composition, each carrying its packshot under a
 * drawn lid that pops off on hover and lets a few of the contents drift out.
 *
 * GEOMETRY. The lid is drawn, not photographed, so it has to land exactly on
 * the jar in every frame. Per pillar:
 *
 *   lid  — the cap's box, measured off the cropped photograph in
 *          public/images/pillars/ as fractions of that image.
 *   cap  — how round the cap's ellipse reads, which differs per shot: the two
 *          jars were photographed from above (a deep ellipse, `round` ~34%) and
 *          the two tablet bottles almost side on (a shallow one, ~15-21%).
 *          Using one value for all four is what made the caps look wrong.
 *          `round`/`roundBot` are the ellipse's vertical radius at the top and
 *          bottom of the cap as a percentage of the cap's height; `face` is the
 *          whole top ellipse, so it is twice `round`.
 *
 * Each frame is cut to the same 0.82 aspect as the blob, so the photograph
 * fills the blob and these fractions convert to figure-box percentages once
 * (--stage-*) for the lid, the neck, the glow and the pieces to share.
 *
 * `piece` is what tips out of an open bottle — tablets, and only for the two
 * that hold tablets. The jars have nothing countable to spill, so they carry
 * `doodles` instead: hand-drawn marks that draw themselves on around the
 * opening. `w` is the doodle's width as a percentage of the figure, `dx`/`dy`
 * its offset from the centre of the jar's mouth, and both are chosen to keep
 * clear of the lid's flight path, which goes up and to the right.
 *
 * `mouth` is the drawn opening. Honey and nut butter were photographed with
 * their jars open, so the lid reveals the real thing and nothing is drawn
 * (mouth: 0). The tablet bottles were photographed sealed, so the drawn cap
 * hides the real one and a drawn neck takes its place (mouth: 1).
 *
 * `blob` is a clip path in objectBoundingBox units, so one path fits any card
 * width. Each is a different irregular shape, and each was checked against its
 * cap — a blob that pinches in too early clips the cap off.
 */
const PILLARS = [
  {
    slug: 'honey',
    name: 'Honey',
    benefit: 'Pure Energy',
    note: 'Four single-origin harvests, bottled apart.',
    to: '/shop/raw-honey',
    image: '/images/pillars/honey.webp',
    alt: 'An open jar of Tatvyra multifloral honey on a wooden table, honeycomb and chamomile flowers around it.',
    srcAspect: 0.82,
    lid: { x: 0.258, y: 0.118, w: 0.502, h: 0.238 },
    cap: { round: 25, roundBot: 21, face: 50 },
    doodles: [
      { art: 'bang', w: 10, dx: -30, dy: -6, rot: -5, d: 140 },
      { art: 'bee', w: 40, dx: 18, dy: -6, rot: -4, d: 560 },
    ],
    mouth: 0,
    blob: 'M0.9650,0.3303C0.9986,0.4378 0.9615,0.5853 0.9125,0.6919C0.8636,0.7985 0.7711,0.9352 0.6714,0.9697C0.5718,1.0042 0.4189,0.9495 0.3144,0.8989C0.2099,0.8484 0.0845,0.7658 0.0444,0.6663C0.0043,0.5668 0.0233,0.3992 0.0738,0.3018C0.1244,0.2044 0.2412,0.1245 0.3474,0.0820C0.4536,0.0395 0.6080,0.0053 0.7109,0.0466C0.8138,0.0880 0.9314,0.2227 0.9650,0.3303Z',
  },
  {
    slug: 'moringa',
    name: 'Moringa',
    benefit: 'Nourishment',
    note: 'Powder, tablets, capsules and gummies.',
    to: '/shop/moringa',
    image: '/images/pillars/moringa.webp',
    alt: 'A sealed amber bottle of Tatvyra moringa tablets on a wooden board, fresh moringa leaves and a bowl of green powder around it.',
    srcAspect: 0.8198,
    lid: { x: 0.2937, y: 0.1679, w: 0.4, h: 0.1444 },
    cap: { round: 19.6, roundBot: 14.8, face: 39.2 },
    piece: 'tablet',
    mouth: 1,
    blob: 'M0.8949,0.7157C0.8440,0.8175 0.7417,0.9514 0.6408,0.9798C0.5398,1.0082 0.3917,0.9429 0.2891,0.8861C0.1864,0.8294 0.0571,0.7405 0.0250,0.6394C-0.0071,0.5383 0.0376,0.3723 0.0963,0.2795C0.1551,0.1867 0.2703,0.1190 0.3775,0.0826C0.4848,0.0462 0.6449,0.0135 0.7397,0.0612C0.8345,0.1090 0.9203,0.2600 0.9462,0.3691C0.9721,0.4782 0.9458,0.6140 0.8949,0.7157Z',
  },
  {
    slug: 'spirulina',
    name: 'Spirulina',
    benefit: 'Vitality',
    note: 'Protein-dense, in three simple formats.',
    to: '/shop/spirulina',
    image: '/images/pillars/spirulina.webp',
    alt: 'A sealed amber bottle of Tatvyra spirulina tablets on a wooden board beside loose tablets and a bowl of green powder.',
    srcAspect: 0.8203,
    lid: { x: 0.3087, y: 0.1974, w: 0.3624, h: 0.1016 },
    cap: { round: 18.4, roundBot: 10.5, face: 36.8 },
    piece: 'tablet',
    mouth: 1,
    blob: 'M0.7268,0.9456C0.6280,0.9906 0.4722,0.9568 0.3638,0.9184C0.2555,0.8800 0.1332,0.8110 0.0767,0.7155C0.0201,0.6199 -0.0128,0.4465 0.0245,0.3453C0.0618,0.2440 0.1959,0.1597 0.3004,0.1079C0.4049,0.0560 0.5508,0.0031 0.6516,0.0340C0.7525,0.0650 0.8547,0.1912 0.9055,0.2936C0.9563,0.3960 0.9862,0.5399 0.9564,0.6485C0.9267,0.7572 0.8256,0.9006 0.7268,0.9456Z',
  },
  {
    slug: 'nut-butter',
    name: 'Nut Butter',
    benefit: 'Wholeness',
    note: 'Milled from the nut. Nothing hydrogenated.',
    to: '/shop/nut-butters',
    image: '/images/pillars/nut-butter.webp',
    alt: 'An open jar of Tatvyra organic premium peanut butter on a green checked cloth, its purple lid, peanuts and buttered toast beside it.',
    srcAspect: 0.82,
    lid: { x: 0.162, y: 0.203, w: 0.556, h: 0.205 },
    cap: { round: 35.9, roundBot: 30, face: 71.9 },
    doodles: [
      { art: 'star', w: 17, dx: -16, dy: -8, rot: -9, d: 140 },
      { art: 'bang', w: 10, dx: 31, dy: -2, rot: 6, d: 480 },
    ],
    mouth: 0,
    blob: 'M0.7485,0.1129C0.8443,0.1688 0.9592,0.2920 0.9788,0.3957C0.9983,0.4993 0.9281,0.6362 0.8660,0.7350C0.8040,0.8338 0.7103,0.9611 0.6065,0.9885C0.5027,1.0160 0.3336,0.9653 0.2434,0.8997C0.1531,0.8341 0.0926,0.7064 0.0652,0.5948C0.0379,0.4831 0.0228,0.3189 0.0793,0.2298C0.1358,0.1408 0.2926,0.0798 0.4042,0.0603C0.5157,0.0408 0.6528,0.0570 0.7485,0.1129Z',
  },
]

/**
 * Hand-drawn marks. Stroke-only or lightly filled, deliberately a little
 * off-symmetric so they read as drawn rather than plotted. `len` is the path's
 * measured length in its own viewBox units, which is what lets each stroke draw
 * itself on: CSS dashes it by exactly that much and animates the offset to
 * nought. (pathLength cannot do this job — its scaling is not applied to a
 * dasharray that comes from a stylesheet.) A path flagged `trail` keeps a dash
 * pattern of its own, so it fades in instead of drawing.
 *
 * `ink` is the line colour: Aubergine by default, which reads as the sketch
 * line, or Burnt Orange for the two marks that are pure accent.
 */
const DOODLE_ART = {
  bang: {
    box: '0 0 20 46',
    ink: 'orange',
    paths: [
      { d: 'M10.4 5.5c1.7 8.2 1.9 16.4.9 24.6', w: 4, len: 26 },
      { d: 'M9.7 37.2c.15 1.4.25 2.2.3 2.4', w: 4.4, len: 4 },
    ],
  },
  star: {
    box: '0 0 36 36',
    ink: 'orange',
    paths: [
      { d: 'M18.4 3.2c1.4 3.8 2.9 7.6 4.4 11.3 3.9.4 7.9.7 11.8 1-3.1 2.6-6.3 5.1-9.4 7.6 1 3.9 2.1 7.7 3.1 11.6-3.4-2.2-6.8-4.4-10.2-6.5-3.3 2.2-6.6 4.4-9.9 6.6.9-3.9 1.9-7.8 2.8-11.7-3.2-2.4-6.3-4.9-9.5-7.3 3.9-.4 7.9-.8 11.8-1.2 1.6-3.8 3.3-7.6 5.1-11.4Z', w: 3.1, len: 122 },
    ],
  },
  /* Faces left, so the trail streams back to the right over the honey's own
     blob rather than reaching across to the bottle beside it. */
  bee: {
    box: '0 0 104 50',
    paths: [
      { d: 'M43.00,22.00C45.97,14.43 37.33,5.42 28.84,3.88C28.28,12.48 34.94,23.05 43.00,22.00Z', w: 1.7, len: 53, fill: 'wing' },
      { d: 'M44.00,20.50C50.57,14.46 46.55,0.93 39.04,-5.02C34.31,3.31 35.65,17.36 44.00,20.50Z', w: 1.7, len: 59, fill: 'wing' },
      { d: 'M46.00,20.50C54.18,18.62 56.95,5.89 53.42,-2.33C45.72,2.24 40.49,14.17 46.00,20.50Z', w: 1.7, len: 55, fill: 'wing' },
      { d: 'M47.50,22.00C54.19,23.71 60.54,15.58 60.70,8.33C53.46,8.74 45.56,15.37 47.50,22.00Z', w: 1.7, len: 44, fill: 'wing' },
      { d: 'M24.4 20.2c-2.2-3.4-4.8-5.4-7-5-2.6.5-3.4 3.6-1.3 4.9 1.8 1.1 3.5-.4 2.8-2', w: 1.5, len: 22 },
      { d: 'M53.31,26.67C55.06,32.03 50.51,38.31 43.15,40.70C35.80,43.09 28.43,40.68 26.69,35.33C24.94,29.97 29.49,23.69 36.85,21.30C44.20,18.91 51.57,21.32 53.31,26.67Z', w: 2, len: 78, fill: 'body' },
      { d: 'M31.74,23.93C32.54,26.40 30.89,29.15 28.05,30.07C25.22,30.99 22.27,29.74 21.46,27.27C20.66,24.80 22.31,22.05 25.15,21.13C27.98,20.21 30.93,21.46 31.74,23.93Z', w: 1.8, len: 33, fill: 'ink' },
      { d: 'M35 22.4c-2.3 5.6-2.6 11.2-.9 16.8', w: 2, len: 19 },
      { d: 'M42.6 21.2c-2.4 5.8-2.6 11.6-.7 17.4', w: 2, len: 19 },
      { d: 'M49.4 23.4c-2 5-2.1 10-.5 15', w: 1.8, len: 17 },
      { d: 'M56.6 39.6c6.6 3.6 13.1 3.9 19.5.9 6.4-3 11.9-2.2 16.4 2.4 2.9 3 6 3.6 9.3 1.8', w: 1.8, len: 50, trail: true },
    ],
  },
}

/** One class per path, covering its dash behaviour and its fill. */
function doodlePathClass(path) {
  const names = []
  if (path.trail) names.push('pillar__doodle-trail')
  if (path.fill) names.push('pillar__doodle-fill', `pillar__doodle-fill--${path.fill}`)
  return names.join(' ') || undefined
}

/**
 * Five pieces of the product drift up out of each open jar. Fixed drift, spin
 * and delay per piece so they read as a slow, uneven trickle rather than a
 * pulse — the delays spread across most of the cycle.
 */
const PIECES = [
  { x: '-2.1rem', r: '-42deg', s: 1, d: 0 },
  { x: '1.5rem', r: '28deg', s: 0.82, d: 660 },
  { x: '-0.6rem', r: '56deg', s: 1.08, d: 1320 },
  { x: '2.5rem', r: '-20deg', s: 0.74, d: 1980 },
  { x: '-1.6rem', r: '36deg', s: 0.94, d: 2640 },
]

export default function FourPillars() {
  const listRef = useRef(null)

  /**
   * Hover carries the interaction on a mouse. On touch there is no hover, so
   * each pillar opens while it sits in the middle band of the viewport and
   * closes as it leaves — the same `is-open` state, driven by scroll.
   */
  useEffect(() => {
    const list = listRef.current
    if (!list || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(hover: hover)').matches) return

    const cards = Array.from(list.querySelectorAll('.pillar'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-open', entry.isIntersecting)
        }
      },
      { rootMargin: '-38% 0px -38% 0px' },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section pillars" aria-labelledby="pillars-title">
      {/* Blob silhouettes, in objectBoundingBox units so one path fits any size. */}
      <svg className="pillars__defs" aria-hidden="true" focusable="false">
        <defs>
          {PILLARS.map((pillar) => (
            <clipPath
              key={pillar.slug}
              id={`pillar-blob-${pillar.slug}`}
              clipPathUnits="objectBoundingBox"
            >
              <path d={pillar.blob} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div className="shell">
        <Reveal className="pillars__header">
          <p className="pillars__eyebrow">The Daily Ritual</p>
          <h2 id="pillars-title" className="pillars__title">
            The Four Pillars of Daily Ritual.
          </h2>
          <p className="pillars__intro">
            Four ingredients, each doing one job properly. Lift a lid to see what is
            inside.
          </p>
        </Reveal>

        <ul className="pillars__grid" ref={listRef}>
          {PILLARS.map((pillar, index) => (
            <Reveal
              as="li"
              key={pillar.slug}
              delay={index * 110}
              className={`pillars__item pillars__item--${pillar.slug}`}
            >
              <Link
                to={pillar.to}
                className={`pillar pillar--${pillar.slug}`}
                style={{
                  '--src-aspect': pillar.srcAspect,
                  '--lid-x': pillar.lid.x,
                  '--lid-y': pillar.lid.y,
                  '--lid-w': pillar.lid.w,
                  '--lid-h': pillar.lid.h,
                  '--cap-round': pillar.cap.round,
                  '--cap-round-bot': pillar.cap.roundBot,
                  '--cap-face': pillar.cap.face,
                  '--mouth-open': pillar.mouth,
                  '--blob': `url(#pillar-blob-${pillar.slug})`,
                }}
              >
                <span className="pillar__figure">
                  <span className="pillar__blob">
                    <span className="pillar__stage">
                      <img
                        className="pillar__photo"
                        src={pillar.image}
                        alt={pillar.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="pillar__wash" aria-hidden="true" />
                    <span className="pillar__glow" aria-hidden="true" />
                    <span className="pillar__mouth" aria-hidden="true" />
                  </span>

                  {pillar.piece && (
                    <span className="pillar__pieces" aria-hidden="true">
                      {PIECES.map((piece) => (
                        <span
                          key={piece.d}
                          className={`pillar__piece pillar__piece--${pillar.piece}`}
                          style={{
                            '--piece-x': piece.x,
                            '--piece-r': piece.r,
                            '--piece-s': piece.s,
                            '--piece-delay': `${piece.d}ms`,
                          }}
                        />
                      ))}
                    </span>
                  )}

                  {pillar.doodles?.map((doodle, n) => (
                    <span
                      key={`${doodle.art}-${n}`}
                      className={[
                        'pillar__doodle',
                        DOODLE_ART[doodle.art].ink === 'orange' && 'pillar__doodle--orange',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden="true"
                      style={{
                        '--dd-w': doodle.w,
                        '--dd-x': doodle.dx,
                        '--dd-y': doodle.dy,
                        '--dd-rot': `${doodle.rot}deg`,
                        '--dd-delay': `${doodle.d}ms`,
                      }}
                    >
                      <svg viewBox={DOODLE_ART[doodle.art].box} fill="none">
                        {DOODLE_ART[doodle.art].paths.map((path) => (
                          <path
                            key={path.d}
                            className={doodlePathClass(path)}
                            style={{ '--len': path.len }}
                            strokeWidth={path.w}
                            d={path.d}
                          />
                        ))}
                      </svg>
                    </span>
                  ))}

                  <span className="pillar__lid" aria-hidden="true">
                    <span className="pillar__lid-face" />
                  </span>
                </span>

                <span className="pillar__caption">
                  <span className="pillar__name">{pillar.name}.</span>
                  <span className="pillar__benefit">{pillar.benefit}.</span>
                  <span className="pillar__note">{pillar.note}</span>
                  <span className="pillar__cta">
                    Explore
                    <ArrowIcon width={15} height={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="pillars__outro">
          <p className="pillars__closer">Elevate Your Morning Ritual.</p>
        </Reveal>
      </div>
    </section>
  )
}
