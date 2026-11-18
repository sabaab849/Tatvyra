import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'
import { PRODUCTS } from '../data/catalogue'

/* The counts in the line under the headline are read off the catalogue, so
   they stay true as products come and go. */
const WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
  'Nineteen', 'Twenty',
]
const inWords = (n) => WORDS[n] ?? String(n)

/* The most a word turns towards the pointer, in degrees, at its edge. */
const TILT = 9

/* Turn every word towards the pointer: the nearer the pointer is to a word's
   edge, the further that edge comes forward. */
function tilt(event) {
  if (event.pointerType !== 'mouse') return
  for (const word of event.currentTarget.querySelectorAll('.cta__word')) {
    const box = word.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1))
    const y = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1))
    word.style.setProperty('--tilt-y', `${(x * TILT).toFixed(2)}deg`)
    word.style.setProperty('--tilt-x', `${(-y * TILT * 0.7).toFixed(2)}deg`)
  }
}

function settle(event) {
  for (const word of event.currentTarget.querySelectorAll('.cta__word')) {
    word.style.removeProperty('--tilt-x')
    word.style.removeProperty('--tilt-y')
  }
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * The closing band on the About page, set as a poster: the brand line in large
 * capitals, "Rise." and "Nourish." in Warm White on lines of their own, and
 * "Thrive." larger again in Burnt Orange on its own line beneath them — no
 * word overlapping another. The line of copy sits in the space beside "Rise.",
 * the two buttons under the end of "Thrive.", and one soft disc of lighter
 * Purple sits behind it all.
 *
 * The words arrive once, as the section comes into view — "Thrive." sliding in
 * from the left last. After that, under a mouse, each word tilts a few degrees
 * in 3D towards the pointer and settles flat when it leaves (TILT). The disc
 * drifts slowly as the page scrolls; that part is CSS alone. Under
 * prefers-reduced-motion everything is simply in place.
 */
export default function FinalCTA() {
  const ref = useRef(null)
  // Browsers without IntersectionObserver simply start in place.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -22% 0px', threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className={`cta section--purple on-dark${inView ? ' is-in' : ''}`}
      aria-labelledby="cta-title"
    >
      <span className="cta__disc cta__disc--far" aria-hidden="true" />

      <div className="cta__stage">
        <h2
          id="cta-title"
          className="cta__title"
          onPointerMove={reduceMotion() ? undefined : tilt}
          onPointerLeave={settle}
        >
          <span className="cta__word cta__word--rise">Rise.</span>{' '}
          <span className="cta__word cta__word--nourish">Nourish.</span>{' '}
          <span className="cta__word cta__word--thrive">Thrive.</span>
        </h2>

        <div className="cta__aside">
          <p className="cta__eyebrow">Start here</p>
          <p className="cta__body">
            {inWords(PRODUCTS.length)} products, in the formats you will actually keep using.
          </p>
        </div>

        <div className="cta__actions">
          <Button
            to="/shop"
            variant="accent"
            size="lg"
            icon={<ArrowIcon width={18} height={18} />}
          >
            Shop All Products
          </Button>
          <Button to="/contact" variant="on-dark" size="lg">
            Talk to the team
          </Button>
        </div>
      </div>
    </section>
  )
}
