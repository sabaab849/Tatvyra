import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'
import SkyCanvas from '../components/jungle/SkyCanvas'
import { getProduct } from '../data/catalogue'
import { CAMERA_END, STATE_DURATION, STATE_EASE } from '../components/jungle/path'
import '../styles/jungle.css'

/* The scene brings three.js with it, so it is fetched only when this section
   comes near the screen, not with the rest of the site. */
const loadScene = () => import('../components/jungle/JungleScene')
const JungleScene = lazy(loadScene)

/**
 * The homepage's close, straight above the footer: a journey down a jungle
 * tunnel, driven by the scroll. The section is a tall track with a stage that
 * sticks for the length of it; the scene (components/jungle) fills the stage
 * and this file lays the brand's type over it and decides which product is in
 * focus.
 *
 * The products, their names and the line under each are the catalogue's own
 * (`name`, `descriptor`): change the catalogue and this follows. The opening
 * line is the brand's own from the About page; the closing one — "A little
 * indulgence. A lot of goodness." — was supplied for this section.
 *
 * The headlines are in the site's own heading face and weight, and the copy
 * in its body face, as everywhere else on the site.
 *
 * STOPS are the products met along the way, in order: where along the path
 * each hangs (`t`, 0 to 1) and on which side. A product comes into focus as
 * the camera approaches it; pointing at one, or tapping it, takes the focus
 * instead.
 *
 * Under reduced motion there is no tunnel and nothing is pinned: the same
 * products are set out as a plain row.
 */
const STOPS = [
  { slug: 'moringa-leaf-powder', t: 0.2, side: -1 },
  { slug: 'spirulina-powder', t: 0.37, side: 1 },
  { slug: 'natural-peanut-butter-creamy', t: 0.54, side: -1 },
  { slug: 'wild-forest-honey', t: 0.71, side: 1 },
]

/* The walk's pace, in track per second: the whole walk takes about ten
   seconds at full pace, a product every second and a half or so. And how
   quickly it gathers or sheds that pace, in track per second per second. */
const WALK_PACE = 0.1
const WALK_EASE = 0.16
/* On a phone the walk goes about half as fast again (some fifteen seconds
   of scrolling become about seven): a narrow screen covers less ground at a
   glance, so the desktop pace feels slow there. */
const PHONE_PACE = 0.15
const PHONE_EASE = 0.24

/* How far ahead of the camera, along the path, a product takes the focus. */
// The near end matches where the product fades away (FloatingProducts), so
// its caption leaves with it.
const REACH = [0.042, 0.095]

export default function JungleJourney() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  // How far through the track the page is scrolled, 0 to 1, measured straight
  // off the track each frame the page moves — so it is exactly 0 as the
  // stage pins and exactly 1 as it lets go, whatever has loaded above it.
  const scrollYProgress = useMotionValue(0)
  // Where the track sits on the page and how tall it and the stage are,
  // measured only when something changes size, never while scrolling: the
  // scroll handlers below work from these and window.scrollY alone, so a
  // scroll never makes the browser lay the page out again mid-frame.
  const geometry = useRef({ top: 0, height: 0, stage: 0 })
  // Whether the page is within a screen of the track (inRange), and whether
  // any of it is on screen at all (onScreen). Both are worked out in the same
  // scroll handler as the walk, from the measures above, so they change in
  // the very frame the page moves (an observer reports a moment later, and a
  // jump to the top of the page left the tunnel drawing, unseen, meanwhile).
  // Away from the track nothing of the walk can be seen, so it is not
  // animated and the page's wheel and touch are left entirely to the browser
  // (see below); off screen, the tunnel and the sky stop drawing.
  const [inRange, setInRange] = useState(false)
  const inRangeRef = useRef(false)
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    if (reduce) return undefined
    const track = trackRef.current
    if (!track) return undefined
    let frame = 0
    const read = () => {
      const box = track.getBoundingClientRect()
      // Measured against the stage, which is the thing that pins, rather than
      // against the window. The track is sized in vh and the stage in svh, and
      // neither follows window.innerHeight, which on a phone grows and shrinks
      // as the URL bar hides and returns. Subtracting it made the span move
      // under a steady scroll, so progress jumped and the camera walked back
      // and forth. The stage's own height holds still, so the walk is exactly
      // 0 where it pins and 1 where it lets go.
      const stage = stageRef.current
      geometry.current = {
        top: box.top + window.scrollY,
        height: box.height,
        stage: stage ? stage.getBoundingClientRect().height : window.innerHeight,
      }
    }
    const measure = () => {
      frame = 0
      const { top, height, stage } = geometry.current
      const y = window.scrollY
      const screen = window.innerHeight
      const near = height > 0 && y + screen * 2 > top && y < top + height + screen
      if (near !== inRangeRef.current) {
        inRangeRef.current = near
        setInRange(near)
      }
      const visible = height > 0 && y + screen > top && y < top + height
      setOnScreen((current) => (current === visible ? current : visible))
      const span = height - stage
      scrollYProgress.set(span > 0 ? Math.min(1, Math.max(0, (window.scrollY - top) / span)) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    const onResize = () => {
      read()
      onScroll()
    }
    read()
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // A resize event is not the only way the geometry changes — an
    // orientation change, or a late font or image above the section moving it
    // down the page, can do it without one — and a stale measure is what
    // sends the walk backwards, so watch the elements and the page itself.
    const watcher = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)
    if (watcher) {
      watcher.observe(track)
      if (stageRef.current) watcher.observe(stageRef.current)
      watcher.observe(document.documentElement)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      watcher?.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduce, scrollYProgress])

  // THE WALK. The scroll says where the walk should be; the walk goes there
  // at one steady pace and no faster, however hard the page is scrolled. It
  // eases up to that pace from a standstill, holds it, and brakes in time to
  // stop exactly where the scroll stopped — never past it — and it does the
  // same going back. The camera (JungleScene) and everything laid over the
  // scene (the opening line, the captions, the closing line) all read this one
  // value, so they always move together.
  const glide = useMotionValue(0)
  useEffect(() => {
    if (reduce) return undefined
    const phone = window.innerWidth < 720
    const PACE = phone ? PHONE_PACE : WALK_PACE
    const EASE = phone ? PHONE_EASE : WALK_EASE
    let frame = 0
    let last = 0
    let speed = 0
    // The paced position, and the walk itself drawn after it on a
    // critically damped spring: the pacing sets one steady speed, and the
    // spring rounds off every change in it — setting off, settling to the
    // pace, braking — so the camera never jolts from one to the next.
    let paced = scrollYProgress.get()
    let drift = 0
    const SMOOTH = 7
    glide.set(paced)
    // The loop runs only while the walk is catching up, and stops once it
    // has settled; a change in the scroll wakes it again.
    const wake = () => {
      // Out of sight, there is no walk to watch: it is simply where the
      // scroll says, and nothing is animated.
      if (!inRangeRef.current) {
        cancelAnimationFrame(frame)
        frame = 0
        last = 0
        speed = 0
        drift = 0
        paced = scrollYProgress.get()
        glide.set(paced)
        return
      }
      if (!frame) {
        last = 0
        frame = requestAnimationFrame(step)
      }
    }
    const step = (now) => {
      // The page has left while the walk was still catching up (a jump to
      // the top, say): there is nothing left to watch, so it lands at once.
      if (!inRangeRef.current) {
        frame = 0
        wake()
        return
      }
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      const at = paced
      const gap = scrollYProgress.get() - at
      const distance = Math.abs(gap)
      if (distance < 0.00005 && Math.abs(speed) < 0.002) {
        speed = 0
        paced = at + gap
      } else {
        // The fastest it may go here: the cruising pace, or less when the
        // stop is close enough that it must already be braking.
        const allowed = Math.min(PACE, Math.sqrt(2 * EASE * distance) * 0.92)
        const wanted = Math.sign(gap) * allowed
        const change = Math.max(-EASE * dt, Math.min(EASE * dt, wanted - speed))
        speed += change
        let next = at + speed * dt
        // Never past the stop.
        if ((gap > 0 && next > at + gap) || (gap < 0 && next < at + gap)) {
          next = at + gap
          speed = 0
        }
        paced = next
      }
      const shown = glide.get()
      const pull = (paced - shown) * SMOOTH * SMOOTH - drift * 2 * SMOOTH
      drift += pull * dt
      const settled = Math.abs(paced - shown) < 0.00002 && Math.abs(drift) < 0.0005
      if (settled) {
        drift = 0
        if (shown !== paced) glide.set(paced)
        // Arrived where the scroll is, and still: nothing left to do.
        if (speed === 0 && paced === scrollYProgress.get()) {
          frame = 0
          return
        }
      } else glide.set(shown + drift * dt)
      frame = requestAnimationFrame(step)
    }
    const stop = scrollYProgress.on('change', wake)
    wake()
    return () => {
      stop()
      cancelAnimationFrame(frame)
    }
  }, [reduce, scrollYProgress, glide])
  // HELD IN THE WALK. Once the page is inside the walk it cannot leave it
  // until the walk has caught up: going down, the page stops at the walk's
  // last screen until the walk has reached its end; going up, it stops at the
  // first screen until the walk is back at its start. Wheel, touch and keys
  // are held at the edge before they move the page; anything else that
  // scrolls (a drag of the scrollbar) is brought back to the edge at once.
  //
  // These listeners can cancel a scroll, and a listener that can do that makes
  // the browser wait for this script before it scrolls at all. So they are
  // attached only while the page is within a screen of the walk, and the rest
  // of the page scrolls entirely on the browser's own thread.
  useEffect(() => {
    if (reduce || !inRange) return undefined
    const bounds = () => {
      const { top, height } = geometry.current
      if (!height) return null
      return { top, end: top + height - window.innerHeight }
    }
    const unfinished = (forward) => (forward ? glide.get() < 0.995 : glide.get() > 0.005)
    const pin = (y) => window.scrollTo({ top: y, behavior: 'instant' })
    let previous = window.scrollY

    const hold = (event, delta) => {
      const edge = bounds()
      if (!edge || !delta) return
      const y = window.scrollY
      if (delta > 0 && y >= edge.top - 1 && y <= edge.end + 1 && y + delta > edge.end && unfinished(true)) {
        event.preventDefault()
        pin(edge.end)
      } else if (delta < 0 && y <= edge.end + 1 && y >= edge.top - 1 && y + delta < edge.top && unfinished(false)) {
        event.preventDefault()
        pin(edge.top)
      }
    }
    const onWheel = (event) => hold(event, event.deltaY)
    // A finger on a phone: held the same way, before the page moves, so a
    // swipe cannot carry the page out of the walk either.
    let touchY = null
    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY ?? null
    }
    const onTouchMove = (event) => {
      const y = event.touches[0]?.clientY
      if (touchY === null || y === undefined) return
      hold(event, touchY - y)
      touchY = y
    }
    const KEYS = { ArrowDown: 40, PageDown: 600, ' ': 600, End: 1e6, ArrowUp: -40, PageUp: -600, Home: -1e6 }
    const onKey = (event) => {
      if (event.target.closest?.('input, textarea, select, [contenteditable]')) return
      const delta = KEYS[event.key] * (event.key === ' ' && event.shiftKey ? -1 : 1)
      if (delta) hold(event, delta)
    }
    const onScroll = () => {
      const edge = bounds()
      const y = window.scrollY
      if (edge) {
        if (previous <= edge.end + 1 && previous >= edge.top - 1 && y > edge.end + 1 && unfinished(true)) {
          pin(edge.end)
          previous = edge.end
          return
        }
        if (previous >= edge.top - 1 && previous <= edge.end + 1 && y < edge.top - 1 && unfinished(false)) {
          pin(edge.top)
          previous = edge.top
          return
        }
      }
      previous = y
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduce, inRange, glide])

  const products = useMemo(
    () =>
      STOPS.map((stop) => {
        const product = getProduct(stop.slug)
        return product && { ...stop, name: product.name, line: product.descriptor, image: product.image }
      }).filter(Boolean),
    [],
  )

  // Set the scene up as the section comes within five screens of view, and
  // run it only while the section is on screen. Setting up early, paused,
  // leaves the graphics driver time to compile the leaves' shaders in the
  // background before the first frame needs them; set up a screen away, the
  // first frame had to wait for them, and the scroll froze.
  const [near, setNear] = useState(false)
  useEffect(() => {
    const section = sectionRef.current
    if (!section || reduce || typeof IntersectionObserver === 'undefined') return undefined
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          loader.disconnect()
        }
      },
      { rootMargin: '500% 0px' },
    )
    // The code itself is fetched and parsed further out still, eight screens
    // away, while the reader is on the sections above.
    const fetcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadScene()
          fetcher.disconnect()
        }
      },
      { rootMargin: '800% 0px' },
    )
    loader.observe(section)
    fetcher.observe(section)
    return () => {
      loader.disconnect()
      fetcher.disconnect()
    }
  }, [reduce])

  const [lite] = useState(() => typeof window !== 'undefined' && window.innerWidth < 720)

  // Focus: the product the camera is coming up to, unless one is pointed at.
  const [approaching, setApproaching] = useState(null)
  const [pointed, setPointed] = useState(null)
  useMotionValueEvent(glide, 'change', (value) => {
    const at = value * CAMERA_END
    const index = products.findIndex((item) => item.t - at > REACH[0] && item.t - at < REACH[1])
    setApproaching(index === -1 ? null : index)
    setPointed(null)
  })
  const active = pointed ?? approaching
  const shown = active === null ? null : products[active]

  // Gone before the first product's caption comes in, so the two never overlap.
  const introOpacity = useTransform(glide, [0, 0.05, 0.1], [1, 1, 0])
  const introY = useTransform(glide, [0, 0.1], [0, -40])
  // The closing line rises in over a longer stretch, a little larger to its
  // own size, so it arrives rather than appears.
  const outroOpacity = useTransform(glide, [0.82, 0.95], [0, 1])
  const outroY = useTransform(glide, [0.82, 0.95], [44, 0])
  const outroScale = useTransform(glide, [0.82, 0.95], [0.96, 1])
  const outroEvents = useTransform(glide, (value) => (value > 0.88 ? 'auto' : 'none'))
  const cueOpacity = useTransform(glide, [0, 0.05], [1, 0])
  // The jungle opens out into blue sky as the walk comes to its end.
  const skyOpacity = useTransform(glide, [0.82, 0.95], [0, 1])
  // The sky is only drawn once it is coming into view.
  const [skyOn, setSkyOn] = useState(false)
  // Once the sky is fully faded in (skyOpacity reaches 1 at 0.95) it hides
  // the tunnel completely, so the tunnel stops drawing until the walk turns
  // back and the sky begins to clear.
  const [covered, setCovered] = useState(false)
  useMotionValueEvent(glide, 'change', (value) => {
    const on = value > 0.78
    setSkyOn((current) => (current === on ? current : on))
    const hidden = value >= 0.952
    setCovered((current) => (current === hidden ? current : hidden))
  })

  if (!products.length) return null

  if (reduce) {
    return (
      <section className="jungle jungle--still" aria-labelledby="jungle-title">
        <div className="shell jungle__still">
          <h2 id="jungle-title" className="jungle__line">
            The Essence of Vitality, Distilled From Nature.
          </h2>
          <ul className="jungle__row">
            {products.map((item) => (
              <li key={item.slug}>
                <Link to={`/product/${item.slug}`} className="jungle__card">
                  <img src={item.image} alt="" width={800} height={1000} loading="lazy" decoding="async" />
                  <span className="jungle__name">{item.name}</span>
                  <span className="jungle__desc">{item.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Button to="/shop" variant="accent" size="lg" icon={<ArrowIcon width={18} height={18} />}>
            Shop All Products
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="jungle" ref={sectionRef} aria-labelledby="jungle-title">
      <div className="jungle__track" ref={trackRef}>
        <div
          className={`jungle__stage${pointed !== null ? ' is-pointing' : ''}`}
          ref={stageRef}
        >
          {near && (
            <Suspense fallback={null}>
              <JungleScene
                progress={glide}
                running={onScreen && !covered}
                lite={lite}
                products={products}
                active={active}
                onHover={setPointed}
                onSelect={setPointed}
              />
            </Suspense>
          )}

          {/* The way in. */}
          <motion.div className="jungle__intro" style={{ opacity: introOpacity, y: introY }}>
            <Logo reversed width={220} to={null} className="jungle__logo" />
            <h2 id="jungle-title" className="jungle__line">
              The Essence of Vitality, Distilled From Nature.
            </h2>
          </motion.div>

          {/* Which way to go, until the walk has begun. */}
          <motion.p className="jungle__cue" style={{ opacity: cueOpacity }} aria-hidden="true">
            Scroll to walk through
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.p>

          {/* The product in focus. Live, so it is read out as it changes. */}
          <div className="jungle__caption" aria-live="polite">
            {/* Each caption comes in and goes out on the same 0.8s curve as
                the products, so the change from one product to the next is
                a crossfade rather than a cut. */}
            <AnimatePresence>
              {shown && (
                <motion.div
                  key={shown.slug}
                  className={`jungle__focus jungle__focus--${shown.side === 1 ? 'left' : 'right'}`}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: STATE_DURATION, ease: STATE_EASE }}
                >
                  <p className="jungle__name">{shown.name}</p>
                  <p className="jungle__desc">{shown.line}</p>
                  <Link to={`/product/${shown.slug}`} className="jungle__shop">
                    Shop {shown.name} <ArrowIcon width={16} height={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Out into the open: a clear blue sky with drifting cloud and the
              sun high on the left, its soft rays fanning out (SkyCanvas). */}
          <motion.div className="jungle__sky" style={{ opacity: skyOpacity }} aria-hidden="true">
            <SkyCanvas running={skyOn && onScreen} />
          </motion.div>

          {/* Out into the light. */}
          <motion.div
            className="jungle__outro"
            style={{ opacity: outroOpacity, y: outroY, scale: outroScale, pointerEvents: outroEvents }}
          >
            <p className="jungle__tagline">
              <span>A Little Indulgence.</span>
              <span>A Lot of Goodness.</span>
            </p>
            <Button to="/shop" variant="primary" size="lg" icon={<ArrowIcon width={18} height={18} />}>
              Shop All Products
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
