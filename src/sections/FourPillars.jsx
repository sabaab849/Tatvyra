import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'

/**
 * "The Four Pillars of Daily Ritual" — the four ranges as irregular blobs
 * scattered across an editorial composition, each carrying its packshot under a
 * drawn lid that lifts away on hover, letting a soft light rise from the jar.
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
 * (--stage-*) for the lid, the neck, the glow and the motes to share.
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
    mouth: 0,
    blob: 'M0.7485,0.1129C0.8443,0.1688 0.9592,0.2920 0.9788,0.3957C0.9983,0.4993 0.9281,0.6362 0.8660,0.7350C0.8040,0.8338 0.7103,0.9611 0.6065,0.9885C0.5027,1.0160 0.3336,0.9653 0.2434,0.8997C0.1531,0.8341 0.0926,0.7064 0.0652,0.5948C0.0379,0.4831 0.0228,0.3189 0.0793,0.2298C0.1358,0.1408 0.2926,0.0798 0.4042,0.0603C0.5157,0.0408 0.6528,0.0570 0.7485,0.1129Z',
  },
]

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
