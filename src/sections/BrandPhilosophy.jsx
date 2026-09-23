import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import KineticText from '../components/KineticText'

/* The headline, a line at a time: what we tell you is set in Purple, what is
   not in it is left quieter, on purpose. */
const HEADLINE = [
  { text: 'We tell you', said: true },
  { text: 'what is in it,', said: true },
  { text: 'and what isn’t.', said: false },
]

/* The four clean-label standards, each with the line it says when chosen. */
const CLAIMS = [
  { line: 'No hydrogenated oils', says: 'Just the good stuff.' },
  { line: 'No added sugar', says: 'Nothing sweetened behind your back.' },
  { line: 'No preservatives', says: 'Nothing artificial.' },
  { line: 'FSSAI certified', says: 'A higher standard.' },
]

const pad = (n) => String(n).padStart(2, '0')

/**
 * The homepage's brand statement: what Tatvyra puts in, and what it leaves
 * out. An editorial spread on Warm White — the headline set large on the left,
 * the four clean-label standards as lines of type on the right.
 *
 * The section carries no illustration: the interaction is the typography. Each
 * standard is a line of KineticText, which ripples under the pointer, loosens
 * its tracking, lags the page as it scrolls, and — when it becomes the active
 * one — is taken over by Purple behind an ink mask that wipes across it.
 *
 * The standards are buttons. Choosing one quietens the others and brings up
 * the line it says. Until one is pressed, scrolling through the section moves
 * along them itself; pressing one settles it there and scroll no longer moves
 * it. The section reads as finished before anything is pressed — the first
 * standard speaks from the start — and nothing it does moves the page.
 */
export default function BrandPhilosophy() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  // Once a standard is pressed it stays: scroll stops choosing for the reader.
  const [locked, setLocked] = useState(false)

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
              <KineticText
                key={line.text}
                as="span"
                className={`philosophy__line ${line.said ? 'is-said' : 'is-unsaid'}`}
                text={line.text}
                pointer={false}
                split={false}
                intensity={0.6}
              />
            ))}
          </h2>
          <p className="philosophy__text">
            Tatvyra is built by Feynman Foodcraft around four real foods — nut butters, moringa,
            spirulina and raw honey. Each one is made to a clean-label standard and sold in the
            format that actually fits a routine: a spread for the morning, a powder for the
            smoothie, a tablet for the desk drawer.
          </p>
        </Reveal>

        <Reveal className="philosophy__canvas" delay={120}>
          <ul className="philosophy__claims">
            {CLAIMS.map((claim, index) => (
              <li
                key={claim.line}
                className={`philosophy__claim${index === active ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  className="philosophy__claim-button"
                  aria-pressed={index === active}
                  onClick={() => choose(index)}
                >
                  <span className="philosophy__claim-index" aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  <KineticText
                    className="philosophy__claim-line"
                    text={claim.line}
                    active={index === active}
                    wipe
                  />
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
