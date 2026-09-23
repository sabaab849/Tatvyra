import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import PhilosophyForm from '../components/PhilosophyForm'

/* The headline, a line at a time: what we tell you is set in Purple, what is
   not in it is left quieter, on purpose. */
const HEADLINE = [
  { text: 'We tell you', said: true },
  { text: 'what is in it,', said: true },
  { text: 'and what isn’t.', said: false },
]

/* The four clean-label standards, each with the line it says when chosen.
   `at` places it on the canvas — left and top as percentages — so the four sit
   asymmetrically rather than on a grid. */
const CLAIMS = [
  { word: 'No', label: 'Hydrogenated oils', says: 'Just the good stuff.', at: [6, 2] },
  { word: 'No', label: 'Added sugar', says: 'Nothing sweetened behind your back.', at: [50, 26] },
  { word: 'No', label: 'Preservatives', says: 'Nothing artificial.', at: [10, 53] },
  { word: 'FSSAI', label: 'Certified', says: 'A higher standard.', at: [52, 78] },
]

/* One lavender form per standard, all eight curves in the same order, so the
   shape travels from one to the next rather than cutting. */
const SHAPES = [
  'M50 2.5C58.7 3.7 64.9 22.2 72.9 29.9C80.9 37.5 98.7 42.6 99.7 50C100.7 57.4 87 67.5 79 75.5C71 83.5 58.7 99.9 50 99.4C41.3 98.8 32.5 80.1 24.8 72.2C17.1 64.2 3.5 58 2.5 50C1.5 42 11 30.1 18.7 22.5C26.4 14.8 41.3 1.3 50 2.5Z',
  'M50 8.4C58.9 7.6 71.5 15.9 80.2 22.6C89 29.3 105.6 42.3 104.2 50C102.9 57.7 80.9 63.2 72.1 70.1C63.4 76.9 58.2 91.6 50 92.5C41.8 93.5 29.8 82.9 21.2 76.1C12.6 69.2 -3.8 57.9 -3.2 50C-2.6 42.1 16.3 34 24.9 27.3C33.5 20.6 41.1 9.2 50 8.4Z',
  'M50 -1.6C59.5 0 68.2 16.4 74.6 24.8C81 33.1 88.2 40.4 89.6 50C91.1 59.6 89.9 79.1 83.5 84.4C77.1 89.6 60.5 83.1 50 82.7C39.5 82.4 24.5 87.5 18.6 82.3C12.6 77 13.7 60.9 13.3 50C12.8 39.1 9.9 23.3 15.8 14.9C21.7 6.6 40.5 -3.1 50 -1.6Z',
  'M50 10.3C59.7 9.6 76.9 7.4 81.9 13.8C87 20.2 81.8 38.9 81.3 50C80.8 61.1 83.7 74.1 78.6 82.5C73.6 91 57.9 103.8 50 102.3C42.1 100.7 36.8 81.3 29.8 72.9C22.8 64.5 8 58.8 6.7 50C5.5 41.2 15 24.6 22 18.2C29 11.8 40.3 11 50 10.3Z',
]

/* Where the form sits and how large it stands for each standard: x, y and
   scale. It leans toward whichever standard is speaking. */
const SHAPE_AT = [
  [0, 0, 1],
  [4, -3, 1.05],
  [-3, 4, 0.98],
  [2, 6, 1.06],
]

const pad = (n) => String(n).padStart(2, '0')

/**
 * The homepage's brand statement: what Tatvyra puts in, and what it leaves
 * out. An editorial spread on Warm White — the headline set large on the left,
 * the four clean-label standards placed as loose typography on the right, and
 * between them one lavender form, cut as an object rather than blurred as a
 * glow.
 *
 * The standards are buttons. Choosing one quietens the others, brings up the
 * line it says, and sends the form leaning its way. Until one is pressed,
 * scrolling through the section moves along them itself; pressing one settles
 * it there and scroll no longer moves it. The section reads as finished before
 * anything is pressed — the first standard speaks from the start — and nothing
 * it does moves the page.
 *
 * The form is drawn twice. The flat one, in SVG, is what a browser without
 * WebGL — or a visitor who has asked for less motion — sees; over it,
 * PhilosophyForm lights the same form as an object in three.js, which the
 * scroll, the standard in hand and the cursor all move.
 */
export default function BrandPhilosophy() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  // Once a standard is pressed it stays: scroll stops choosing for the reader.
  const [locked, setLocked] = useState(false)
  const [x, y, scale] = SHAPE_AT[active]

  // While nothing is pressed, the section's passage through the viewport moves
  // along the standards, a band each, measured on a frame rather than in the
  // scroll listener.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || locked) return undefined

    let frame = 0
    const measure = () => {
      frame = 0
      const box = section.getBoundingClientRect()
      // Its whole passage: 0 as the top arrives at the foot of the screen,
      // 1 as the bottom leaves the head of it. A standard to each quarter.
      const travelled =
        (window.innerHeight - box.top) / (window.innerHeight + box.height)
      const band = Math.floor(Math.max(0, Math.min(0.999, travelled)) * CLAIMS.length)
      setActive((current) => (current === band ? current : band))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [locked])

  const choose = (index) => {
    setActive(index)
    setLocked(true)
  }

  return (
    <section className="philosophy" ref={sectionRef} aria-labelledby="philosophy-title">
      <div className="shell philosophy__inner">
        <Reveal className="philosophy__lead">
          <p className="philosophy__eyebrow">Real food.</p>
          <h2 id="philosophy-title" className="philosophy__title">
            {HEADLINE.map((line) => (
              <span
                key={line.text}
                className={`philosophy__line ${line.said ? 'is-said' : 'is-unsaid'}`}
              >
                {line.text}
              </span>
            ))}
          </h2>
          <p className="philosophy__text">
            Tatvyra is built by Feynman Foodcraft around four real foods — nut butters, moringa,
            spirulina and raw honey. Each one is made to a clean-label standard and sold in the
            format that actually fits a routine: a spread for the morning, a powder for the
            smoothie, a tablet for the desk drawer.
          </p>
        </Reveal>

        {/* The form: one flat lavender shape with a deeper one behind it, and
            over them the lit object, once it is worth loading. */}
        <div className="philosophy__form" aria-hidden="true">
          <PhilosophyForm active={active} sectionRef={sectionRef} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" focusable="false">
            <path
              className="philosophy__shape philosophy__shape--under"
              d={SHAPES[(active + 2) % SHAPES.length]}
              style={{
                d: `path("${SHAPES[(active + 2) % SHAPES.length]}")`,
                translate: `${-x * 0.6}% ${-y * 0.6}%`,
                scale: 1.04,
              }}
            />
            <path
              className="philosophy__shape"
              d={SHAPES[active]}
              style={{ d: `path("${SHAPES[active]}")`, translate: `${x}% ${y}%`, scale }}
            />
          </svg>
        </div>

        <Reveal className="philosophy__canvas" delay={120}>
          <ul className="philosophy__claims">
            {CLAIMS.map((claim, index) => (
              <li
                key={claim.label}
                className={`philosophy__claim${index === active ? ' is-active' : ''}`}
                style={{ '--x': `${claim.at[0]}%`, '--y': `${claim.at[1]}%`, '--i': index }}
              >
                <button
                  type="button"
                  className="philosophy__claim-button"
                  aria-pressed={index === active}
                  onClick={() => choose(index)}
                >
                  <span className="philosophy__claim-index">{pad(index + 1)}</span>
                  <span className="philosophy__claim-word">{claim.word}</span>
                  <span className="philosophy__claim-label">{claim.label}</span>
                </button>
                {/* Kept in place whether it is speaking or not, so choosing a
                    standard never moves anything. */}
                <p className="philosophy__says" aria-hidden={index !== active}>
                  {claim.says}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
