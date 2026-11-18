import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import KineticText from '../components/KineticText'

/* The headline, a line at a time: what we tell you is set in Purple, what is
   not in it is left quieter, on purpose. */
const HEADLINE = [
  { text: 'We Tell You', said: true },
  { text: 'What Is in It,', said: true },
  { text: 'and What Isn’t.', said: false },
]

/* The three clean-label standards, each with the line it says when chosen. */
const CLAIMS = [
  { line: 'No hydrogenated oils', says: 'Just the good stuff.' },
  { line: 'No preservatives', says: 'Nothing artificial.' },
  { line: 'FSSAI certified', says: 'A higher standard.' },
]

const pad = (n) => String(n).padStart(2, '0')

/**
 * The homepage's brand statement: what Tatvyra puts in, and what it leaves
 * out. An editorial spread on Warm White — the headline set large on the left,
 * the three clean-label standards as lines of type on the right.
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
    // Where the section sits on the page and how tall it is, measured only
    // when something changes size, so scrolling never asks for layout.
    const geometry = { top: 0, height: 0 }
    const read = () => {
      const box = section.getBoundingClientRect()
      geometry.top = box.top + window.scrollY
      geometry.height = box.height
    }
    const measure = () => {
      frame = 0
      const top = geometry.top - window.scrollY
      // Its whole passage: 0 as the top arrives at the foot of the screen,
      // 1 as the bottom leaves the head of it. A standard to each third.
      const travelled =
        (window.innerHeight - top) / (window.innerHeight + geometry.height)
      const band = Math.floor(Math.max(0, Math.min(0.999, travelled)) * CLAIMS.length)
      setActive((current) => (current === band ? current : band))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    const onResize = () => {
      read()
      onScroll()
    }

    // Listening only while the section is on screen: off it, the answer
    // cannot change what anyone sees.
    let listening = false
    const listen = (on) => {
      if (on === listening) return
      listening = on
      const method = on ? 'addEventListener' : 'removeEventListener'
      window[method]('scroll', onScroll, { passive: true })
    }
    read()
    measure()
    window.addEventListener('resize', onResize)
    const watcher = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)
    watcher?.observe(section)
    watcher?.observe(document.documentElement)
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            listen(entry.isIntersecting)
            // One last reading on the way out, so the band is right at the edge.
            onScroll()
          })
    if (observer) observer.observe(section)
    else listen(true)
    return () => {
      listen(false)
      observer?.disconnect()
      watcher?.disconnect()
      window.removeEventListener('resize', onResize)
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
            Tatvyra is built by Feynman Foodcraft around four real foods: nut butters, moringa,
            spirulina and raw honey. Each one is made to an honest standard and sold in the
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
                  {/* Kept whole under the pointer: the per-letter lean and the
                      ripple read as broken type on a line this size, so the
                      standards only ripple with the scroll, as the headline
                      does, and answer a hover with colour alone. */}
                  <KineticText
                    className="philosophy__claim-line"
                    text={claim.line}
                    active={index === active}
                    wipe
                    pointer={false}
                    split={false}
                    intensity={0.6}
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
