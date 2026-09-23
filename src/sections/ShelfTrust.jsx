import { Fragment } from 'react'
import Reveal from '../components/Reveal'

/**
 * "The Difference" — the four differentiators as bright numbered cards on the
 * grained purple ground. Each card is a numeral and the point's name, a
 * hairline, the sentence, then a three-line motto beside a small drawn mark.
 *
 * `tone` picks the card's colour set in sections.css. The marks are inline SVG
 * in a shared 120-unit box whose bottom edge is the card's, so a mark can grow
 * up out of the card's foot. They all run through the one grain filter
 * declared in <ShelfDefs>, which gives their flat shapes the same printed tooth
 * as the ground behind them. The filter sits inside each group that moves on
 * hover, so the grain turns with its shape rather than sliding across it.
 */
const POINTS = [
  {
    id: 'clean-label',
    tone: 'coral',
    title: 'True Clean Label',
    body: 'No hydrogenated oils, added sugar, salt or preservatives across the entire range; verifiable, not just claimed.',
    motto: ['Cleaner', 'choices', 'brighter days'],
    Art: CleanLabelArt,
  },
  {
    id: 'formats',
    tone: 'lime',
    title: 'Format Innovation',
    body: 'The only range offering powder, tablet, capsule and effervescent formats across moringa and spirulina.',
    motto: ['Different', 'formats', 'same goodness'],
    Art: FormatsArt,
  },
  {
    id: 'one-brand',
    tone: 'lilac',
    title: 'One-Brand Daily Ritual',
    body: 'Five categories under one label: a retailer stocks one trusted brand instead of five unknown ones.',
    motto: ['One brand', 'a healthier', 'tomorrow'],
    Art: OneBrandArt,
  },
  {
    id: 'validated',
    tone: 'butter',
    title: 'Traditional + Validated',
    body: 'Rooted in Ayurvedic use, backed by consistent, testable manufacturing standards.',
    motto: ['Tradition', 'meets', 'tomorrow'],
    Art: ValidatedArt,
  },
]

export default function ShelfTrust() {
  return (
    <section className="section shelf" aria-labelledby="shelf-title">
      <ShelfDefs />

      <div className="shell shelf__inner">
        <div className="shelf__header">
          <p className="shelf__eyebrow">
            <Sparkle />
            The Difference
            <Sparkle />
          </p>
          <h2 id="shelf-title" className="shelf__title">
            <span>Built to be trusted on the shelf,</span>{' '}
            <span className="shelf__title-turn">not just tried once</span>
          </h2>
        </div>

        <ol className="shelf__grid">
          {POINTS.map(({ id, tone, title, body, motto, Art }, index) => (
            <Reveal
              as="li"
              className={`shelf__card shelf__card--${tone}`}
              key={id}
              delay={index * 90}
            >
              <div className="shelf__card-head">
                {/* The list already announces its order. */}
                <span className="shelf__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="shelf__card-title">{title}</h3>
              </div>
              <p className="shelf__body">{body}</p>
              <div className="shelf__foot">
                {/* One line per span, joined by spaces so the motto still
                    reads as a phrase to a screen reader. */}
                <p className="shelf__motto">
                  {motto.map((line, i) => (
                    <Fragment key={line}>
                      {i > 0 && ' '}
                      <span>{line}</span>
                    </Fragment>
                  ))}
                </p>
                <Art />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* --- Shared definitions ---------------------------------------------------
   Declared once and referenced by id from every mark. The host is sized to
   nothing rather than display:none, which would stop Chrome resolving the
   references. */

function ShelfDefs() {
  return (
    <svg className="shelf__defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {/* Grain: one noise field split into a dark speckle (the high values)
            and a light one (the low values), each clipped to the shape's own
            alpha so it never spills onto the card. */}
        <filter
          id="shelf-grain"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.19  0 0 0 0 0.08  0 0 0 0 0.12  1.7 0 0 0 -0.98"
            result="dark"
          />
          <feComposite in="dark" in2="SourceAlpha" operator="in" result="darkIn" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.7 0 0 0 0.7"
            result="light"
          />
          <feComposite in="light" in2="SourceAlpha" operator="in" result="lightIn" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="darkIn" />
            <feMergeNode in="lightIn" />
          </feMerge>
        </filter>

        {/* The soft cast shadow under the capsules. */}
        <filter id="shelf-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>

        <radialGradient id="shelf-spark">
          <stop offset="0" stopColor="#fee899" />
          <stop offset="1" stopColor="#f7c763" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/** The four-point star either side of the eyebrow. */
function Sparkle() {
  return (
    <svg className="shelf__spark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 0C13.1 8.2 15.8 10.9 24 12 15.8 13.1 13.1 15.8 12 24 10.9 15.8 8.2 13.1 0 12 8.2 10.9 10.9 8.2 12 0Z"
        fill="url(#shelf-spark)"
      />
    </svg>
  )
}

const artProps = {
  className: 'shelf__art',
  viewBox: '0 0 120 120',
  'aria-hidden': true,
  focusable: false,
}

/* A lance leaf pointing straight up from its base at 0,0, drawn as two halves
   so each side of the midrib can take its own tone. */
const LEAF_NEAR = 'M0 0C-23-24-20-72 0-100Z'
const LEAF_FAR = 'M0 0C23-24 20-72 0-100Z'

/* A capsule lying along the x axis, centred on 0,0: the whole shell, and the
   right-hand half that takes the second colour. */
const capsule = (length, girth) => {
  const r = girth / 2
  const half = length / 2
  return {
    shell: { x: -half, y: -r, width: length, height: girth, rx: r },
    cap: `M0 ${-r}H${half - r}A${r} ${r} 0 0 1 ${half - r} ${r}H0Z`,
    shine: `M${-half + r} ${-r * 0.45}H${half - r}`,
  }
}

/** 01 — a sprout and a checked seal: clean, and verified. */
function CleanLabelArt() {
  return (
    <svg {...artProps}>
      <defs>
        <linearGradient id="shelf-coral-ring" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#b3503a" />
          <stop offset="0.55" stopColor="#cf6e53" />
          <stop offset="1" stopColor="#f3a78c" />
        </linearGradient>
        <radialGradient id="shelf-coral-disc" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffd3c3" />
          <stop offset="1" stopColor="#fdb39b" />
        </radialGradient>
      </defs>
      <g className="shelf__sway shelf__sway--left">
        <g filter="url(#shelf-grain)" transform="translate(72 121) rotate(-39)">
          <path d={LEAF_NEAR} fill="#d06a4f" />
          <path d={LEAF_FAR} fill="#ec8e72" />
          <path d="M2-38V-62" stroke="#fff1ea" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>
      <g className="shelf__sway shelf__sway--right">
        <g filter="url(#shelf-grain)" transform="translate(83 122) rotate(37) scale(0.58)">
          <path d={LEAF_NEAR} fill="#dc785c" />
          <path d={LEAF_FAR} fill="#f29c80" />
        </g>
      </g>
      <g filter="url(#shelf-grain)">
        <circle cx="86" cy="38" r="28" fill="url(#shelf-coral-disc)" />
        <circle cx="86" cy="38" r="28" fill="none" stroke="url(#shelf-coral-ring)" strokeWidth="2.6" />
      </g>
      <path
        className="shelf__check"
        d="M72.5 38.5 82.2 48 103 27.5"
        pathLength="1"
        fill="none"
        stroke="#b24f39"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** 02 — the formats side by side: capsule, tablet, powder and granules. */
function FormatsArt() {
  const pill = capsule(56, 20)
  return (
    <svg {...artProps}>
      <defs>
        <linearGradient id="shelf-lime-round" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#2a2118" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="shelf-lime-mound" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3dc55" />
          <stop offset="1" stopColor="#9ba223" />
        </linearGradient>
      </defs>
      <g className="shelf__tilt">
        <g filter="url(#shelf-grain)" transform="translate(31 51) rotate(-39)">
          <rect {...pill.shell} fill="#c8d246" />
          <path d={pill.cap} fill="#949b20" />
          <rect {...pill.shell} fill="url(#shelf-lime-round)" stroke="#7b800f" strokeOpacity="0.35" strokeWidth="1" />
          <path d={pill.shine} stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      <g className="shelf__spin">
        <g filter="url(#shelf-grain)">
          <path d="M96 5a19 19 0 0 0 0 38Z" fill="#d6df5c" />
          <path d="M96 5a19 19 0 0 1 0 38Z" fill="#adb533" />
          <circle cx="96" cy="24" r="19" fill="url(#shelf-lime-round)" stroke="#7b800f" strokeOpacity="0.3" strokeWidth="1" />
          <path d="M96 6.5v35" stroke="#7b800f" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>
      <g filter="url(#shelf-grain)">
        <ellipse cx="76" cy="57" rx="2" ry="2.6" fill="#8d921d" />
        <path d="M40 104C52 94 64 72 76 64 88 72 100 94 112 104Z" fill="url(#shelf-lime-mound)" />
      </g>
      <g className="shelf__drift" fill="#878c17">
        <circle cx="101" cy="67" r="1.9" />
        <circle cx="108.5" cy="70" r="2.4" />
        <circle cx="115" cy="75.5" r="1.6" />
        <circle cx="104" cy="79" r="2.5" />
        <circle cx="111.5" cy="84" r="2" />
        <circle cx="117" cy="90" r="1.7" />
        <circle cx="108" cy="92.5" r="2.1" fill="#a3aa2b" />
      </g>
    </svg>
  )
}

/* Five capsules radiating from one point, one per category. The first and
   last two are the pale shell; the pair to the right is the deep one. */
const RING = [
  { angle: -90, tone: 'pale' },
  { angle: -18, tone: 'deep' },
  { angle: 54, tone: 'deep' },
  { angle: 126, tone: 'pale' },
  { angle: 198, tone: 'pale' },
]

const RING_TONES = {
  pale: { inner: '#b88de6', outer: '#e2c8fb' },
  deep: { inner: '#8a5dc0', outer: '#5f3490' },
}

/* Each capsule's centre sits this far out from the flower's heart. */
const RING_REACH = 31

/** 03 — five capsules as one flower: one brand across the categories. */
function OneBrandArt() {
  const pill = capsule(40, 17)
  const place = (angle) => `rotate(${angle} 62 60) translate(${62 + RING_REACH} 60)`
  return (
    <svg {...artProps}>
      <defs>
        <linearGradient id="shelf-lilac-round" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#30143f" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <g className="shelf__ring">
        {RING.map(({ angle }) => (
          <g key={angle} transform={place(angle)}>
            <rect {...pill.shell} x={pill.shell.x + 2} y={pill.shell.y + 4} fill="#8a5cc2" opacity="0.32" filter="url(#shelf-soft)" />
          </g>
        ))}
        <g filter="url(#shelf-grain)">
          {RING.map(({ angle, tone }) => (
            <g key={angle} transform={place(angle)}>
              <rect {...pill.shell} fill={RING_TONES[tone].inner} />
              <path d={pill.cap} fill={RING_TONES[tone].outer} />
              <rect {...pill.shell} fill="url(#shelf-lilac-round)" stroke="#5d3386" strokeOpacity="0.28" strokeWidth="1" />
              <path d={pill.shine} stroke="#fff" strokeOpacity="0.5" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          ))}
          <circle cx="62" cy="60" r="6" fill="#5d3386" />
        </g>
      </g>
    </svg>
  )
}

/** 04 — a traditional sprig with a spark: tradition, meeting tomorrow. */
function ValidatedArt() {
  return (
    <svg {...artProps}>
      <defs>
        <linearGradient id="shelf-butter-open" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fbe39e" />
          <stop offset="1" stopColor="#fdeebe" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="shelf-butter-full" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f1bf4f" />
          <stop offset="1" stopColor="#fbe29b" />
        </linearGradient>
        <linearGradient id="shelf-butter-bud" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#f3c457" />
          <stop offset="1" stopColor="#fde9b0" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="shelf-butter-spark">
          <stop offset="0" stopColor="#fbd774" />
          <stop offset="1" stopColor="#e9a92e" />
        </radialGradient>
      </defs>
      <g className="shelf__sway shelf__sway--stem">
        <g filter="url(#shelf-grain)" stroke="#e5a731" strokeLinecap="round" strokeLinejoin="round">
          <path d="M56 121C57 108 55 96 53 84 51 72 53 62 58 55" fill="none" strokeWidth="2.4" />
          <path d="M58 55C60 32 82 10 112 4 108 30 88 50 58 55Z" fill="url(#shelf-butter-open)" strokeWidth="2.2" />
          <path d="M60 53C74 40 92 22 109 7" fill="none" strokeWidth="1.5" />
          <path d="M54.5 94C32 94 12 76 6 50 30 52 50 70 54.5 94Z" fill="url(#shelf-butter-full)" strokeWidth="1.8" />
          <path d="M53 91C40 79 23 64 9 53" fill="none" strokeWidth="1.1" opacity="0.7" />
          <path d="M20 61 31 70" stroke="#fffaf0" strokeWidth="1.8" opacity="0.85" />
          <path d="M56.5 114C58 102 68 92 80 88 78 100 70 110 56.5 114Z" fill="url(#shelf-butter-bud)" stroke="none" />
        </g>
      </g>
      <path
        className="shelf__twinkle"
        d="M98 68C99.4 78.6 102.2 81.6 113 83 102.2 84.4 99.4 87.4 98 98 96.6 87.4 93.8 84.4 83 83 93.8 81.6 96.6 78.6 98 68Z"
        fill="url(#shelf-butter-spark)"
      />
    </svg>
  )
}
