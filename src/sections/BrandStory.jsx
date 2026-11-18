import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'
import { BRAND } from '../data/brand'
import { CATEGORIES } from '../data/catalogue'
import useMedia from '../lib/useMedia'

/* The four ranges, in the order the orbit turns through them. Each is shown by
   one ingredient scene — the food itself, never the pack — and carries a
   brand colour for its pip, its tick and the light it throws on the page. The
   two short lines are drawn from the catalogue's own description of the
   range; names come from the catalogue too. */
const RANGES = [
  {
    slug: 'moringa',
    tone: 'var(--tatvyra-lilac)',
    lines: ['Nutrient-rich.', 'A traditional superfood.'],
    alt: 'Bright green moringa leaf powder filling a terracotta bowl, a small wooden scoop lying in it.',
  },
  {
    slug: 'spirulina',
    tone: 'var(--tatvyra-purple)',
    lines: ['Plant-based.', 'Powder and capsule.'],
    alt: 'A cone of deep green spirulina powder heaped on a wooden spoon, loose powder scattered around it.',
  },
  {
    slug: 'nut-butters',
    tone: 'var(--tatvyra-peach)',
    lines: ['Creamy or crunchy.', 'Nothing hydrogenated.'],
    alt: 'Creamy cashew butter swirled in a glass bowl, a spoonful and whole cashews beside it.',
  },
  {
    slug: 'raw-honey',
    tone: 'var(--tatvyra-orange)',
    lines: ['Single origin.', 'Four natural harvests.'],
    alt: 'Raw honey drizzling from a wooden dipper into a glass bowl of honey.',
  },
].map((range) => ({
  ...range,
  name: CATEGORIES.find((category) => category.slug === range.slug).name,
  scene: `/images/story/orbit/${range.slug}.webp`,
}))

const LAST = RANGES.length - 1

/* Pinned — the section holds still while scrolling turns the orbit — only on
   a wide, tall enough screen for the whole stage to fit, and only where
   motion is welcome. Everywhere else it sits in the page and is turned by its
   pips, its tabs, its arrows or a swipe across the pod. */
const PIN_QUERY =
  '(min-width: 62rem) and (min-height: 42rem) and (prefers-reduced-motion: no-preference)'

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))

/* The magnet. Scroll maps linearly onto the ranges, 0 to LAST, but each range
   holds still for the first and last quarter of its stretch and the turn to
   the next happens in the middle half, eased — so the orbit settles on a range
   and snaps across to the next rather than drifting. */
function magnet(x) {
  const n = Math.floor(x)
  const t = clamp((x - n - 0.25) / 0.5, 0, 1)
  return n + t * t * (3 - 2 * t)
}

/**
 * The homepage's brand section: who makes Tatvyra, and the four ranges it
 * makes, shown one at a time in a floating glass pod ringed by an orbit.
 *
 * The pod holds one ingredient scene; four pips on the ring stand for the
 * ranges, and the tabs beside it name them. Turning to the next range spins
 * the ring a quarter turn, bringing its pip to the top, while the scene in the
 * pod turns with it and dissolves into the next.
 *
 * Everything that moves reads one number, --s: the range shown, 0 to 3, with
 * the turn between two ranges as the fraction. Pinned, scrolling drives it
 * directly and the controls scroll the page to their range; otherwise the
 * controls set it and CSS eases it (it is a registered property).
 */
export default function BrandStory() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const tabRefs = useRef([])
  const swipeRef = useRef(null)
  const uid = useId()
  const pinned = useMedia(PIN_QUERY)
  const [active, setActive] = useState(0)

  // Pinned: scroll position → --s (and --progress, for the scroll cue).
  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!pinned || !section || !sticky) return undefined

    let frame = 0
    // The section's place on the page, its travel and the sticky offset are
    // measured only when something changes size. Measuring them every frame,
    // straight after the frame before had written --s, made the browser
    // recalculate style and layout in the middle of each scrolled frame.
    const geometry = { start: 0, travel: 1 }
    const read = () => {
      const top = parseFloat(getComputedStyle(sticky).top) || 0
      geometry.travel = section.offsetHeight - sticky.offsetHeight
      geometry.start = section.getBoundingClientRect().top + window.scrollY - top
    }
    const written = { s: '', progress: '' }
    const update = () => {
      frame = 0
      const progress = clamp((window.scrollY - geometry.start) / geometry.travel, 0, 1)
      const s = magnet(progress * LAST)
      // Nothing is written when nothing has moved. (--s holds still on each
      // range's resting stretch while --progress, the cue, keeps going.)
      const nextS = s.toFixed(4)
      const nextProgress = progress.toFixed(4)
      if (nextS !== written.s) {
        written.s = nextS
        section.style.setProperty('--s', nextS)
      }
      if (nextProgress !== written.progress) {
        written.progress = nextProgress
        section.style.setProperty('--progress', nextProgress)
      }
      setActive(Math.round(s))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onResize = () => {
      read()
      onScroll()
    }
    let listening = false
    const listen = (on) => {
      if (on === listening) return
      listening = on
      const method = on ? 'addEventListener' : 'removeEventListener'
      window[method]('scroll', onScroll, { passive: true })
      window[method]('resize', onResize)
    }

    read()
    update()
    const observer = new IntersectionObserver(([entry]) => {
      listen(entry.isIntersecting)
      if (entry.isIntersecting) {
        read()
        update()
      }
    })
    observer.observe(section)
    // Late images, fonts or a reflow above move the section without a resize
    // event, so the page's own size is watched too.
    const watcher = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)
    watcher?.observe(section)
    watcher?.observe(document.documentElement)
    return () => {
      observer.disconnect()
      watcher?.disconnect()
      listen(false)
      cancelAnimationFrame(frame)
    }
  }, [pinned])

  const goTo = (index) => {
    const next = clamp(index, 0, LAST)
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (pinned && section && sticky) {
      // To the middle of that range's resting stretch.
      const top = parseFloat(getComputedStyle(sticky).top) || 0
      const travel = section.offsetHeight - sticky.offsetHeight
      const start = section.getBoundingClientRect().top + window.scrollY - top
      window.scrollTo({ top: start + (travel * next) / LAST, behavior: 'smooth' })
    }
    setActive(next)
    return next
  }

  // Arrow keys move along the tabs, as a tab list should.
  const onTabKey = (event) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]
    const jump = { Home: 0, End: LAST }[event.key]
    if (step === undefined && jump === undefined) return
    event.preventDefault()
    const next = goTo(jump ?? active + step)
    tabRefs.current[next]?.focus({ preventScroll: true })
  }

  // A swipe across the pod turns it, where the page is not doing the turning.
  const onPodDown = (event) => {
    swipeRef.current = pinned ? null : event.clientX
  }
  const onPodUp = (event) => {
    if (swipeRef.current === null) return
    const dx = event.clientX - swipeRef.current
    swipeRef.current = null
    if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1))
  }

  const panelId = `${uid}-pod`
  const tabId = (index) => `${uid}-tab-${index}`
  const current = RANGES[active]

  return (
    <section
      ref={sectionRef}
      className={`orbit ${pinned ? 'is-pinned' : ''}`.trim()}
      aria-labelledby="orbit-title"
      data-active={active}
      style={pinned ? undefined : { '--s': active, '--progress': active / LAST }}
    >
      <div ref={stickyRef} className="orbit__sticky">
        <div className="shell orbit__inner">
          <Reveal className="orbit__copy">
            <p className="orbit__eyebrow">The brand</p>
            <h2 id="orbit-title" className="orbit__title">
              <span className="orbit__title-accent">Tatvyra,</span> <span>By Feynman</span>{' '}
              <span>Foodcraft.</span>
            </h2>
            <p className="orbit__lede">{BRAND.promise}</p>
            <div className="orbit__sign">
              <p className="orbit__signoff">
                <span>Real ingredients.</span> <span>Brighter days.</span>
              </p>
              <Link to="/about" className="orbit__story">
                Read the full story <ArrowIcon width={16} height={16} />
              </Link>
            </div>
          </Reveal>

          <div className="orbit__stage">
            {/* The ground under the pod: its shadow, and the light each
                range's scene throws through the glass. */}
            <div className="orbit__ground" aria-hidden="true">
              {RANGES.map((range, k) => (
                <span
                  key={range.slug}
                  className="orbit__caustic"
                  style={{ '--k': k, '--tone': range.tone }}
                />
              ))}
              <span className="orbit__shadow" />
            </div>

            {/* The ring turns; its pips ride on it. They repeat the tabs for
                the pointer, so they stay out of the tab order. */}
            <div className="orbit__ring" aria-hidden="true">
              {RANGES.map((range, k) => (
                <button
                  key={range.slug}
                  type="button"
                  tabIndex={-1}
                  className={`orbit__pip ${k === active ? 'is-active' : ''}`.trim()}
                  style={{ '--k': k, '--tone': range.tone }}
                  onClick={() => goTo(k)}
                >
                  <span className="visually-hidden">{range.name}</span>
                </button>
              ))}
            </div>
            <span className="orbit__glint" aria-hidden="true" />

            <div
              id={panelId}
              className="orbit__pod"
              role="tabpanel"
              aria-labelledby={tabId(active)}
              onPointerDown={onPodDown}
              onPointerUp={onPodUp}
              onPointerCancel={() => { swipeRef.current = null }}
            >
              <div className="orbit__glass">
                {RANGES.map((range, k) => (
                  <img
                    key={range.slug}
                    className="orbit__scene"
                    style={{ '--k': k }}
                    src={range.scene}
                    alt={k === active ? range.alt : ''}
                    aria-hidden={k === active ? undefined : true}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                ))}
              </div>
              <span className="orbit__shine" aria-hidden="true" />
            </div>
          </div>

          <div className="orbit__ranges">
            <div
              className="orbit__tabs"
              role="tablist"
              aria-label="Tatvyra products"
              aria-orientation="vertical"
              onKeyDown={onTabKey}
            >
              {RANGES.map((range, k) => (
                <button
                  key={range.slug}
                  ref={(node) => { tabRefs.current[k] = node }}
                  id={tabId(k)}
                  type="button"
                  role="tab"
                  aria-selected={k === active}
                  aria-controls={panelId}
                  tabIndex={k === active ? 0 : -1}
                  className="orbit__tab"
                  style={{ '--k': k, '--tone': range.tone }}
                  onClick={() => goTo(k)}
                >
                  <span className="orbit__thumb" aria-hidden="true">
                    <img src={range.scene} alt="" width={800} height={800} loading="lazy" decoding="async" />
                  </span>
                  <span className="orbit__tab-text">
                    <span className="orbit__tab-name">{range.name}</span>
                    <span className="orbit__tab-lines">
                      {range.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* The tab in view, spelled out under the row of pods on a phone,
                where the tabs keep their words only for assistive tech. */}
            <p className="orbit__caption" aria-hidden="true">
              <span className="orbit__tab-name">{current.name}</span>
              <span className="orbit__tab-lines">
                {current.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </p>

            <div className="orbit__nav">
              <button
                type="button"
                className="orbit__arrow orbit__arrow--prev"
                aria-label="Previous product"
                disabled={active === 0}
                onClick={() => goTo(active - 1)}
              >
                <ArrowIcon width={16} height={16} />
              </button>
              <button
                type="button"
                className="orbit__arrow"
                aria-label="Next product"
                disabled={active === LAST}
                onClick={() => goTo(active + 1)}
              >
                <ArrowIcon width={16} height={16} />
              </button>
              <Link to={`/shop/${current.slug}`} className="orbit__shop">
                Shop {current.name}
              </Link>
            </div>
          </div>
        </div>

        <div className="shell orbit__foot" aria-hidden="true">
          <p className="orbit__cue">
            <span>Scroll to explore</span>
            <span className="orbit__cue-track">
              <span className="orbit__cue-knob" />
            </span>
          </p>
          <p className="orbit__wisdom">
            <span>Traditional wisdom</span> <span>for a brighter tomorrow</span>
          </p>
        </div>
      </div>
    </section>
  )
}
