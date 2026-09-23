import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import Reveal from './Reveal'
import IndiaMapArt from './IndiaMapArt'
import { projectIndia } from '../lib/indiaMap'
import { LiverIcon, LungsIcon, MoleculeIcon, PlasterIcon, ShieldCrossIcon } from './Icons'

const ICONS = {
  immunity: ShieldCrossIcon,
  topical: PlasterIcon,
  antioxidant: MoleculeIcon,
  respiratory: LungsIcon,
  liver: LiverIcon,
}

const pad = (n) => String(n).padStart(2, '0')
const round = (n) => Math.round(n * 10) / 10

/* A route from a photograph's edge (centre and diameter in hundredths of the
   stage's width) to the place it points at, in the map's units, bowed a little
   so it reads as a flight path. */
function routeFor([px, py, pd], place, [vx, vy, vw], bend = 0.14) {
  const u = vw / 100
  const cx = vx + px * u, cy = vy + py * u, r = (pd / 2) * u
  const [ex0, ey0] = projectIndia(...place)
  const dx = ex0 - cx, dy = ey0 - cy
  const len = Math.hypot(dx, dy)
  const ux = dx / len, uy = dy / len
  const sx = cx + ux * (r + 12), sy = cy + uy * (r + 12)
  const ex = ex0 - ux * 12, ey = ey0 - uy * 12
  const qx = (sx + ex) / 2 - uy * len * bend, qy = (sy + ey) / 2 + ux * len * bend
  return {
    d: `M${round(sx)} ${round(sy)}Q${round(qx)} ${round(qy)} ${round(ex)} ${round(ey)}`,
    dot: [round(ex0), round(ey0)],
  }
}

/* The map turns interactive only where hovering is real: a fine pointer, on
   anything wider than the phone layout. Touch screens keep their labels in
   view, and phones keep the plain numbered list. */
const EXPLORE_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 48.0625rem)'

function useMedia(query) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/**
 * The "Origin & process" band for a product page: a headline and benefit row
 * on the left, and on the right an illustrated map with photographs pinned to
 * it, each with its label.
 *
 * Driven entirely by `product.origin` in the catalogue and renders nothing
 * without it. The map is IndiaMapArt — India's official outline, painted —
 * shown through `map.view` (in the outline's units, matching the stage's
 * shape), with each photograph's dotted route ending at a real latitude and
 * longitude. The photographs, labels and lettering are live elements placed
 * over it in hundredths of the stage's width (container query units), so the
 * whole composition holds together at any size.
 *
 * With a mouse, each photograph is a trigger: hovering or focusing it lifts its
 * label into view as a card, and Escape puts it away. Without one, the labels
 * simply stay in place, and on narrow screens they leave the map for a
 * numbered list beneath it.
 */
export default function ProductOrigin({ product }) {
  const explore = useMedia(EXPLORE_QUERY)
  const [open, setOpen] = useState(null)
  const closing = useRef(0)
  const uid = useId()

  // A short grace period lets the pointer cross from a photograph to its card
  // without the card closing in between.
  const show = (index) => {
    window.clearTimeout(closing.current)
    setOpen(index)
  }
  const hide = () => {
    window.clearTimeout(closing.current)
    closing.current = window.setTimeout(() => setOpen(null), 160)
  }

  useEffect(() => () => window.clearTimeout(closing.current), [])

  useEffect(() => {
    if (open === null) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const origin = product.origin
  if (!origin) return null
  const { map, country, points } = origin
  const [vx, vy, vw] = map.view
  const vh = (vw * 887) / 1044
  const routes = points.map((point) => routeFor(point.photo, point.place, map.view, point.bend))

  const listClass = [
    'origin__points',
    explore && 'origin__points--explore',
    explore && open !== null && 'has-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="origin" aria-labelledby="origin-title">
      {origin.drip && (
        <img className="origin__drip" src={origin.drip} alt="" loading="lazy" decoding="async" />
      )}

      <div className="shell origin__grid">
        <Reveal className="origin__intro">
          <p className="origin__eyebrow">{origin.eyebrow}</p>
          <h2 id="origin-title" className="origin__title">
            {origin.title.map((line) => (
              <span key={line}>{line} </span>
            ))}
            <span className="origin__title-accent">{origin.accent}</span>
          </h2>
          <p className="origin__lede">{origin.intro}</p>
        </Reveal>

        <Reveal className="origin__atlas" delay={80}>
          <div className="origin__stage">
            <svg
              className="origin__svg"
              viewBox={`${vx} ${vy} ${vw} ${round(vh)}`}
              role="img"
              aria-label={map.alt}
              focusable="false"
            >
              <IndiaMapArt paintings={map.paintings} />
              {routes.map((route, index) => (
                <g
                  key={points[index].title}
                  className={`origin__route${explore && open === index ? ' is-active' : ''}`}
                >
                  <path d={route.d} />
                  <circle cx={route.dot[0]} cy={route.dot[1]} r="7" />
                </g>
              ))}
            </svg>
            <p
              className="origin__country"
              style={{ '--x': country.at[0], '--y': country.at[1] }}
            >
              {country.label}
            </p>
          </div>

          <ol className={listClass}>
            {points.map((point, index) => {
              const titleId = `${uid}-title-${index}`
              const bodyId = `${uid}-body-${index}`
              const image = <img src={point.image} alt={point.alt} loading="lazy" decoding="async" />

              return (
                <li
                  key={point.title}
                  className={`origin__point${explore && open === index ? ' is-open' : ''}`}
                  style={{
                    '--i': index,
                    '--px': point.photo[0],
                    '--py': point.photo[1],
                    '--pd': point.photo[2],
                    '--lx': point.label[0],
                    '--ly': point.label[1],
                    '--lm': point.label[2],
                  }}
                  onMouseEnter={explore ? () => show(index) : undefined}
                  onMouseLeave={explore ? hide : undefined}
                >
                  {/* The index is shown only once the labels leave the map, to
                      tie each photograph to its entry in the list below. */}
                  {explore ? (
                    <button
                      type="button"
                      className="origin__photo"
                      data-index={pad(index + 1)}
                      aria-labelledby={titleId}
                      aria-describedby={bodyId}
                      aria-expanded={open === index}
                      onFocus={() => show(index)}
                      onBlur={hide}
                    >
                      {image}
                    </button>
                  ) : (
                    <span className="origin__photo" data-index={pad(index + 1)}>
                      {image}
                    </span>
                  )}
                  <div className="origin__label">
                    <h3 id={titleId} className="origin__point-title">
                      <span className="origin__point-num" aria-hidden="true">
                        {pad(index + 1)}
                      </span>
                      {point.title}
                    </h3>
                    <p id={bodyId} className="origin__point-body">
                      {point.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          <p className="origin__tagline">
            {origin.tagline.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </p>
          <p className="origin__signoff">{origin.signoff}</p>
        </Reveal>

        <Reveal className="origin__benefits" delay={120}>
          <h3 className="origin__benefits-title">{origin.benefitsTitle}</h3>
          <ul className="origin__benefit-list">
            {origin.benefits.map(({ icon, body }) => {
              const Icon = ICONS[icon]
              return (
                <li key={body}>
                  <Icon className="origin__benefit-icon" width={34} height={34} strokeWidth={1.15} />
                  <p>{body}</p>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
