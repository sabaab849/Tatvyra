import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'

/**
 * "The Four Pillars of Daily Ritual": the four ranges as irregular blobs
 * scattered across an editorial composition, each carrying its packshot under a
 * lid that lifts away on hover, letting a soft light rise from the jar.
 *
 * ARTWORK. Everything comes from the packshots in "product images": each jar
 * and bottle photographed open and cut out, set on a transparent frame cut to
 * the blob's 0.82 aspect (public/images/pillars/*-jar.webp, *-bottle.webp),
 * and its own lid or cap photographed on its own (lid-*.webp, cap-black.webp).
 * At rest the lid sits over the open neck, so what it lifts off is the real
 * opening.
 *
 * GEOMETRY. The lid has to land exactly on the neck in every frame. Per pillar:
 *
 *   lid  — the lid's box on the neck, as fractions of the frame: it covers the
 *          threaded neck from just above the rim down to the shoulder. The lid
 *          photograph is stretched to this box, which only changes how far
 *          from above it seems to be seen.
 *   crop — zoom, and where the lid's top edge sits in the blob (capTop, in
 *          blob percent). With zoom 1 and capTop at the lid's own y, the frame
 *          fills the blob exactly. Everything else on the blob is measured off
 *          this stage, so the lid follows the crop.
 *
 * `doodles` are the hand-drawn marks that come on around the opening: the
 * bee over the honey, the star over the nut butter. `w` is the mark's width as
 * a percentage of the figure, `dx`/`dy` its offset from the centre of the jar's
 * mouth, and both are chosen to keep clear of the lid's flight path, which goes
 * up and slightly to the right.
 *
 * `pills` marks the two capsule bottles, which open differently: the bottle
 * stays still, the cap unscrews and tips back on its rear edge, and six
 * capsules rise out of the mouth and settle in a loose cluster above it.
 * `capsule` is that product's own capsule, cut from its bottle's photograph,
 * and `capsuleWidth` its length in percent of the figure. `rim` is the ellipse
 * of the neck's opening, which the capsules rise out of, as fractions of the
 * frame. No glow and no motes. Honey and nut butter keep the lid-lift.
 *
 * `blob` is a clip path in objectBoundingBox units, so one path fits any card
 * width. Each is a different irregular shape, and each was checked against its
 * lid: a blob that pinches in too early clips the lid off.
 */
const PILLARS = [
  {
    slug: 'moringa',
    name: 'Moringa',
    benefit: 'Nourishment',
    note: 'Powder, tablets, capsules and gummies.',
    to: '/shop/moringa',
    image: '/images/pillars/moringa-bottle.webp',
    lidImage: '/images/pillars/cap-black.webp',
    alt: 'An open amber bottle of Tatvyra Moringa Capsules.',
    crop: { zoom: 1, capTop: 12.45 },
    lid: { x: 0.3279, y: 0.1245, w: 0.3387, h: 0.14 },
    rim: { cx: 0.498, cy: 0.1648, rx: 0.1366, ry: 0.0179 },
    pills: 'moringa',
    capsule: '/images/pillars/capsule-moringa.webp',
    capsuleWidth: 10,
    blob: 'M0.8949,0.7157C0.8440,0.8175 0.7417,0.9514 0.6408,0.9798C0.5398,1.0082 0.3917,0.9429 0.2891,0.8861C0.1864,0.8294 0.0571,0.7405 0.0250,0.6394C-0.0071,0.5383 0.0376,0.3723 0.0963,0.2795C0.1551,0.1867 0.2703,0.1190 0.3775,0.0826C0.4848,0.0462 0.6449,0.0135 0.7397,0.0612C0.8345,0.1090 0.9203,0.2600 0.9462,0.3691C0.9721,0.4782 0.9458,0.6140 0.8949,0.7157Z',
  },
  {
    slug: 'spirulina',
    name: 'Spirulina',
    benefit: 'Vitality',
    note: 'Protein-dense, in two simple formats.',
    to: '/shop/spirulina',
    image: '/images/pillars/spirulina-bottle.webp',
    lidImage: '/images/pillars/cap-black.webp',
    alt: 'An open amber bottle of Tatvyra Spirulina Capsules.',
    crop: { zoom: 1, capTop: 13.39 },
    lid: { x: 0.3391, y: 0.1339, w: 0.3167, h: 0.1537 },
    rim: { cx: 0.4994, cy: 0.171, rx: 0.1293, ry: 0.0186 },
    pills: 'spirulina',
    capsule: '/images/pillars/capsule-spirulina.webp',
    capsuleWidth: 10.5,
    blob: 'M0.7268,0.9456C0.6280,0.9906 0.4722,0.9568 0.3638,0.9184C0.2555,0.8800 0.1332,0.8110 0.0767,0.7155C0.0201,0.6199 -0.0128,0.4465 0.0245,0.3453C0.0618,0.2440 0.1959,0.1597 0.3004,0.1079C0.4049,0.0560 0.5508,0.0031 0.6516,0.0340C0.7525,0.0650 0.8547,0.1912 0.9055,0.2936C0.9563,0.3960 0.9862,0.5399 0.9564,0.6485C0.9267,0.7572 0.8256,0.9006 0.7268,0.9456Z',
  },
  {
    slug: 'nut-butter',
    name: 'Nut Butter',
    benefit: 'Wholeness',
    note: 'Milled from the nut. Nothing hydrogenated.',
    to: '/shop/nut-butters',
    image: '/images/pillars/nut-butter-jar.webp',
    lidImage: '/images/pillars/lid-nut-butter.webp',
    alt: 'An open jar of Tatvyra Natural Peanut Butter Creamy.',
    crop: { zoom: 1, capTop: 14.5 },
    lid: { x: 0.2439, y: 0.145, w: 0.5091, h: 0.181 },
    doodles: [
      { art: 'star', w: 17, dx: -16, dy: -8, rot: -9, d: 260 },
      { art: 'bang', w: 10, dx: 31, dy: -2, rot: 6, d: 620 },
    ],
    blob: 'M0.7485,0.1129C0.8443,0.1688 0.9592,0.2920 0.9788,0.3957C0.9983,0.4993 0.9281,0.6362 0.8660,0.7350C0.8040,0.8338 0.7103,0.9611 0.6065,0.9885C0.5027,1.0160 0.3336,0.9653 0.2434,0.8997C0.1531,0.8341 0.0926,0.7064 0.0652,0.5948C0.0379,0.4831 0.0228,0.3189 0.0793,0.2298C0.1358,0.1408 0.2926,0.0798 0.4042,0.0603C0.5157,0.0408 0.6528,0.0570 0.7485,0.1129Z',
  },
  {
    slug: 'honey',
    name: 'Honey',
    benefit: 'Pure Energy',
    note: 'Three single-origin harvests, bottled apart.',
    to: '/shop/raw-honey',
    image: '/images/pillars/honey-jar.webp',
    lidImage: '/images/pillars/lid-honey.webp',
    alt: 'An open jar of Tatvyra Multifloral Honey.',
    crop: { zoom: 1, capTop: 17.96 },
    lid: { x: 0.2559, y: 0.1796, w: 0.4851, h: 0.1602 },
    doodles: [
      { art: 'bang', w: 10, dx: -30, dy: -6, rot: -5, d: 260 },
      { art: 'bee', w: 40, dx: 18, dy: -6, rot: -4, d: 700 },
    ],
    blob: 'M0.9650,0.3303C0.9986,0.4378 0.9615,0.5853 0.9125,0.6919C0.8636,0.7985 0.7711,0.9352 0.6714,0.9697C0.5718,1.0042 0.4189,0.9495 0.3144,0.8989C0.2099,0.8484 0.0845,0.7658 0.0444,0.6663C0.0043,0.5668 0.0233,0.3992 0.0738,0.3018C0.1244,0.2044 0.2412,0.1245 0.3474,0.0820C0.4536,0.0395 0.6080,0.0053 0.7109,0.0466C0.8138,0.0880 0.9314,0.2227 0.9650,0.3303Z',
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
 * Motes of light rising out of the open jar: few, small and slow, each on its
 * own drift and delay so they read as an uneven shimmer rather than a pulse.
 * `x` is the sideways drift over the rise, `s` the mote's size and `d` its
 * delay into the loop.
 */
const MOTES = [
  { x: '-1.1rem', s: '4px', d: 0 },
  { x: '0.8rem', s: '3px', d: 900 },
  { x: '-0.2rem', s: '5px', d: 1800 },
  { x: '1.4rem', s: '3px', d: 2700 },
  { x: '-1.7rem', s: '3.5px', d: 3600 },
]

/**
 * The capsules that rise out of an opened bottle and settle in a loose cluster
 * above its mouth. Each is a real capsule cut from the product photography,
 * placed by hand so that no two share a height, a gap or an angle.
 *
 *   x     where it settles across the opening, from the mouth's centre
 *   rise  where its lower edge settles above the rim; at or below 0 it stays
 *         partly inside the bottle, cut off by the rim
 *   drift how far it has slid sideways by then, so paths are not vertical
 *   from  its angle inside the bottle; tilt the angle it settles at
 *   s     size, smaller reading as further back; z its place in the stack
 *   d     when it starts to rise, ms after the cap starts to move
 *   dur   how long it takes to rise and settle
 *   out   its delay going back in, so the return is not the opening reversed
 *   shade a touch of light or shadow on the photograph, so copies differ
 *
 * x, rise and drift are in percent of the figure's width. The settled cluster
 * leans left, to the side the cap has tipped away from.
 */
const PILLS = [
  { x: -2.4, rise: 5.1, drift: 0.5, from: 15, tilt: 4, s: 0.97, z: 6, d: 950, dur: 1450, out: 70, shade: 1.03 },
  { x: 6.8, rise: -1.7, drift: 1.1, from: -12, tilt: -5, s: 0.93, z: 4, d: 1060, dur: 1320, out: 0, shade: 0.98 },
  { x: -6.8, rise: 11.2, drift: -0.9, from: -21, tilt: -8, s: 1, z: 5, d: 1190, dur: 1700, out: 200, shade: 1 },
  { x: -11.4, rise: 0.3, drift: -1.8, from: 24, tilt: 11, s: 1.02, z: 7, d: 1330, dur: 1500, out: 160, shade: 0.95 },
  { x: -13.2, rise: 8.6, drift: -1.4, from: 9, tilt: 3, s: 0.86, z: 1, d: 1420, dur: 1850, out: 300, shade: 0.9 },
  { x: 12.4, rise: 1.2, drift: 1.6, from: 19, tilt: 9, s: 0.88, z: 2, d: 1590, dur: 1380, out: 110, shade: 0.92 },
]

/**
 * A little chance, rolled once each time a capsule bottle opens and held for as
 * long as it stays open: every capsule shifts a fraction from its authored
 * place, angle and moment, so the cluster is never quite the same twice but
 * never loses its shape. Nothing moves while the bottle stays open.
 */
function rollTablets(card) {
  if (!card?.classList.contains('pillar--tablets')) return
  const jitter = (range) => (Math.random() * 2 - 1) * range
  card.querySelectorAll('.pillar__pill').forEach((pill) => {
    pill.style.setProperty('--jx', jitter(0.9).toFixed(2))
    pill.style.setProperty('--jy', jitter(0.8).toFixed(2))
    pill.style.setProperty('--jr', `${jitter(3.5).toFixed(1)}deg`)
    pill.style.setProperty('--jd', `${Math.round(jitter(45))}ms`)
  })
}

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
          if (entry.isIntersecting && !entry.target.classList.contains('is-open')) {
            rollTablets(entry.target)
          }
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
            Get to know what goes into every jar.
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
                className={`pillar pillar--${pillar.slug}${pillar.pills ? ' pillar--tablets' : ''}`}
                onPointerEnter={
                  pillar.pills
                    ? (event) => event.pointerType === 'mouse' && rollTablets(event.currentTarget)
                    : undefined
                }
                style={{
                  '--zoom': pillar.crop.zoom,
                  '--cap-top': pillar.crop.capTop,
                  '--lid-x': pillar.lid.x,
                  '--lid-y': pillar.lid.y,
                  '--lid-w': pillar.lid.w,
                  '--lid-h': pillar.lid.h,
                  '--blob': `url(#pillar-blob-${pillar.slug})`,
                  '--lid-photo': `url(${pillar.lidImage})`,
                  ...(pillar.rim && {
                    '--rim-cx': pillar.rim.cx,
                    '--rim-cy': pillar.rim.cy,
                    '--rim-rx': pillar.rim.rx,
                    '--rim-ry': pillar.rim.ry,
                    '--capsule-w': pillar.capsuleWidth,
                  }),
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
                  </span>

                  {pillar.pills ? (
                    <span
                      className={`pillar__pills pillar__pills--${pillar.pills}`}
                      aria-hidden="true"
                    >
                      {PILLS.map((pill) => (
                        <span
                          key={pill.d}
                          className="pillar__pill"
                          style={{
                            '--pill-x': pill.x,
                            '--pill-rise': pill.rise,
                            '--pill-drift': pill.drift,
                            '--pill-from': `${pill.from}deg`,
                            '--pill-tilt': `${pill.tilt}deg`,
                            '--pill-s': pill.s,
                            '--pill-z': pill.z,
                            '--pill-in': `${pill.d}ms`,
                            '--pill-dur': `${pill.dur}ms`,
                            '--pill-out': `${pill.out}ms`,
                            '--pill-shade': pill.shade,
                          }}
                        >
                          <span className="pillar__pill-rise">
                            <img
                              className="pillar__pill-img"
                              src={pillar.capsule}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              draggable="false"
                            />
                          </span>
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="pillar__motes" aria-hidden="true">
                      {MOTES.map((mote) => (
                        <span
                          key={mote.d}
                          className="pillar__mote"
                          style={{
                            '--mote-x': mote.x,
                            '--mote-s': mote.s,
                            '--mote-delay': `${mote.d}ms`,
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

                  <span className="pillar__lid" aria-hidden="true" />
                </span>

                <span className="pillar__caption">
                  <span className="pillar__meta">
                    <span className="pillar__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="pillar__benefit">{pillar.benefit}</span>
                  </span>
                  <span className="pillar__name">{pillar.name}</span>
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
      </div>
    </section>
  )
}
