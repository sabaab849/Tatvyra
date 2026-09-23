import { useId, useLayoutEffect, useRef } from 'react'
import Reveal from '../components/Reveal'
import { FlaskIcon, LeafMarkIcon, ShieldCheckIcon, SugarCubeIcon } from '../components/Icons'

/* The headline, a line at a time. What we tell you is inked in Purple as it
   scrolls into view; what is not in it is left in muted Ink, on purpose. */
const HEADLINE = [
  { text: 'We tell you', said: true },
  { text: 'what is in it,', said: true },
  { text: 'and what', said: false },
  { text: 'is not.', said: false },
]

const CLAIMS = [
  { Icon: LeafMarkIcon, label: 'No hydrogenated oils' },
  { Icon: FlaskIcon, label: 'No preservatives' },
  { Icon: SugarCubeIcon, label: 'No added sugar' },
  { Icon: ShieldCheckIcon, label: 'FSSAI-certified process' },
]

const clamp01 = (n) => Math.min(1, Math.max(0, n))

/* Scroll position, handed to CSS as two numbers on the section:
   --p   the section's passage through the viewport, 0 as its top enters at
         the bottom to 1 as its bottom leaves at the top (the rings, the rule,
         the washes);
   --ink how far the headline has been written in, 0 as it enters to 1 once
         it has risen well into view.
   Listens only while the section is near the viewport. With reduced motion
   it settles on the finished state and never listens at all. */
function useScrollScrub(sectionRef, headlineRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    if (!section || !headline) return undefined

    const set = (p, ink) => {
      section.style.setProperty('--p', p.toFixed(4))
      section.style.setProperty('--ink', ink.toFixed(4))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      set(0.5, 1)
      return undefined
    }

    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const s = section.getBoundingClientRect()
      const h = headline.getBoundingClientRect()
      const start = vh * 0.88
      set(
        clamp01((vh - s.top) / (vh + s.height)),
        clamp01((start - h.top) / (vh * 0.34 + h.height * 0.3)),
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const listen = (on) => {
      const method = on ? 'addEventListener' : 'removeEventListener'
      window[method]('scroll', onScroll, { passive: true })
      window[method]('resize', onScroll)
    }

    update()
    if (typeof IntersectionObserver === 'undefined') {
      listen(true)
      return () => listen(false)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        listen(entry.isIntersecting)
        if (entry.isIntersecting) update()
      },
      { rootMargin: '15% 0px' },
    )
    observer.observe(section)
    return () => {
      observer.disconnect()
      listen(false)
      cancelAnimationFrame(frame)
    }
  }, [sectionRef, headlineRef])
}

/* Words set around a circle, reading clockwise from nine o'clock and spaced
   to close the ring exactly. Decorative: the words are said elsewhere or are
   a flourish, so the ring is hidden from assistive technology. */
function RingText({ text, className, children }) {
  const id = useId()
  return (
    <div className={className} aria-hidden="true">
      <svg className="philosophy__ring" viewBox="0 0 120 120" focusable="false">
        <defs>
          <path id={id} d="M12 60a48 48 0 1 1 96 0a48 48 0 1 1 -96 0" />
        </defs>
        <text>
          {/* Capitals set here: SVG text does not reliably take text-transform. */}
          <textPath href={`#${id}`} textLength="301" lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  )
}

/**
 * The homepage's brand statement: what Tatvyra puts in, and what it leaves
 * out. An editorial spread on Warm White under soft Lilac and Purple washes —
 * the headline on the left, the brand and its four clean-label standards on
 * the right, joined by a ruled axis carrying a turning seal.
 *
 * Scrolling writes the headline in, word by word, turns the two seals in
 * opposite directions, draws the axis down and lets the washes drift; the
 * standards' icons draw themselves in as they arrive.
 */
export default function BrandPhilosophy() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  useScrollScrub(sectionRef, headlineRef)

  let index = 0
  const lines = HEADLINE.map((line) => ({
    ...line,
    words: line.text.split(' ').map((word) => ({ word, i: index++ })),
  }))

  return (
    <section
      ref={sectionRef}
      className="philosophy"
      aria-labelledby="philosophy-title"
      style={{ '--words': index }}
    >
      <div className="philosophy__wash" aria-hidden="true">
        <span className="philosophy__orb" />
        <span className="philosophy__moon" />
        <span className="philosophy__haze philosophy__haze--low" />
        <span className="philosophy__haze philosophy__haze--high" />
      </div>

      <div className="shell philosophy__inner">
        <div className="philosophy__lead">
          <Reveal as="p" className="philosophy__eyebrow">
            Clean-label wellness, kept honest
          </Reveal>
          <h2 ref={headlineRef} id="philosophy-title" className="philosophy__title">
            {lines.map((line) => (
              <span
                key={line.text}
                className={`philosophy__line ${line.said ? 'is-said' : 'is-unsaid'}`}
              >
                {line.words.map(({ word, i }, n) => (
                  <span key={word + i}>
                    <span className="philosophy__word" style={{ '--i': i }}>
                      {word}
                    </span>
                    {n < line.words.length - 1 && ' '}
                  </span>
                ))}{' '}
              </span>
            ))}
          </h2>
          <Reveal as="p" className="philosophy__signoff" delay={120}>
            <span>Real foods.</span> <span>Nothing else.</span>
          </Reveal>
        </div>

        <div className="philosophy__axis">
          <span className="philosophy__rule" aria-hidden="true" />
          <RingText
            className="philosophy__seal philosophy__seal--axis"
            text="Cleaner choices • Brighter tomorrows • "
          >
            <span className="philosophy__seal-dot" />
          </RingText>
          <span className="philosophy__rule" aria-hidden="true" />
        </div>

        <div className="philosophy__body">
          <Reveal as="p" className="philosophy__text" delay={60}>
            Tatvyra is built by Feynman Foodcraft around four real foods — nut butters, moringa,
            spirulina and raw honey. Each one is made to a clean-label standard and sold in the
            format that actually fits a routine: a spread for the morning, a powder for the
            smoothie, a tablet for the desk drawer.
          </Reveal>

          <ul className="philosophy__claims" aria-label="Our clean-label standard">
            {CLAIMS.map(({ Icon, label }, n) => (
              <Reveal
                key={label}
                as="li"
                className="philosophy__claim"
                delay={140 + n * 110}
                style={{ '--n': n }}
              >
                <span className="philosophy__chip">
                  <Icon />
                </span>
                <span className="philosophy__claim-label">{label}</span>
              </Reveal>
            ))}
          </ul>

          <div className="philosophy__close">
            <Reveal as="p" className="philosophy__signoff philosophy__signoff--close" delay={200}>
              <span>Same goodness.</span> <span>A higher standard.</span>
            </Reveal>
            <RingText
              className="philosophy__seal philosophy__seal--fssai"
              text="Made with care • For a healthier tomorrow • "
            >
              {/* The brand's supplied FSSAI mark, painted through as a mask so
                  it takes Aubergine on this light ground. */}
              <span className="philosophy__fssai" />
            </RingText>
          </div>
        </div>
      </div>

      <p className="philosophy__rail" aria-hidden="true">
        Honest nutrition <span>•</span> A brighter you
      </p>
    </section>
  )
}
