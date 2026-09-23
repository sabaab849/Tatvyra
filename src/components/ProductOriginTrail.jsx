import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import IndiaMapArt from './IndiaMapArt'
import { projectIndia } from '../lib/indiaMap'

const pad = (n) => String(n).padStart(2, '0')
const round = (n) => Math.round(n * 10) / 10

/* Every route leaves its photograph's edge and ends just short of the source
   pin, bowed by `bend` (a fraction of its length, signed for the side). */
function routeFor([cx, cy, r], [px, py], bend) {
  const dx = px - cx, dy = py - cy
  const len = Math.hypot(dx, dy)
  const ux = dx / len, uy = dy / len
  const sx = cx + ux * (r + 14), sy = cy + uy * (r + 14)
  const ex = px - ux * 16, ey = py - uy * 16
  const qx = (sx + ex) / 2 - uy * len * bend, qy = (sy + ey) / 2 + ux * len * bend
  return `M${round(sx)} ${round(sy)}Q${round(qx)} ${round(qy)} ${round(ex)} ${round(ey)}`
}

/**
 * An "Origin & process" band in which every point leads back to one place: a
 * headline on the left, and on the right a map of India with photographs
 * around it, each joined by a dotted route to a pin on the honey's source.
 *
 * Driven entirely by `product.originTrail` in the catalogue and renders
 * nothing without it. The map is IndiaMapArt — India's official outline — and
 * everything on it is placed in that outline's units: the source pin from its
 * real latitude and longitude, the photographs and labels around it within
 * `view`. HTML laid over the drawing is sized in the same units, scaled to the
 * width the map is drawn at.
 *
 * With a mouse the labels wait off the map and arrive when the map is hovered
 * or focused; pointing at one point lights its route. Touch screens keep the
 * labels in view, and on phones they leave the map for a numbered list.
 */
export default function ProductOriginTrail({ product }) {
  const trail = product.originTrail
  const [active, setActive] = useState(null)
  const layout = useMemo(() => {
    if (!trail) return null
    const pin = projectIndia(...trail.source.place)
    return { pin, routes: trail.points.map((p) => routeFor(p.circle, pin, p.bend ?? 0.12)) }
  }, [trail])
  if (!trail) return null

  const [vx, vy, vw, vh] = trail.view
  // Positions for the HTML over the map: outline units, from the view's corner.
  const at = ([x, y]) => ({ '--x': round(x - vx), '--y': round(y - vy) })
  const place = (latLon) => at(projectIndia(...latLon))
  const point = (index) => ({
    onPointerEnter: () => setActive(index),
    onPointerLeave: () => setActive(null),
  })
  const [pinX, pinY] = layout.pin

  return (
    <section className="trail" aria-labelledby="trail-title" style={{ '--sw': vw, '--sh': vh }}>
      <img className="trail__drip" src={trail.drip} alt="" loading="lazy" decoding="async" />
      <img className="trail__sprig" src={trail.sprig} alt="" loading="lazy" decoding="async" />

      <div className="shell trail__grid">
        <Reveal className="trail__intro">
          <p className="trail__eyebrow">{trail.eyebrow}</p>
          <h2 id="trail-title" className="trail__title">
            {trail.title.map((line) => (
              <span key={line}>{line} </span>
            ))}
            {/* One element for both accent lines, so their gradient runs
                down the pair rather than restarting on each. */}
            <span className="trail__title-accent">
              {trail.accent.map((line) => (
                <span key={line}>{line} </span>
              ))}
            </span>
          </h2>
          <p className="trail__lede">{trail.intro}</p>
          <p className="trail__tagline">{trail.tagline}</p>
        </Reveal>

        {/* Focusable so the labels can be brought in from the keyboard too. */}
        <Reveal
          className={`trail__atlas${active === null ? '' : ' has-active'}`}
          delay={80}
          tabIndex={0}
          aria-label={trail.mapLabel}
        >
          <div className="trail__frame">
            <div className="trail__stage">
              <svg
                className="trail__svg"
                viewBox={`${vx} ${vy} ${vw} ${vh}`}
                aria-hidden="true"
                focusable="false"
              >
                <IndiaMapArt paintings={trail.paintings} />
                {trail.points.map((p, index) => (
                  <path
                    key={p.title}
                    className={`trail__route${active === index ? ' is-active' : ''}`}
                    d={layout.routes[index]}
                  />
                ))}
                <g className="trail__pin" transform={`translate(${round(pinX)} ${round(pinY)})`}>
                  <circle className="trail__pin-pulse" r="22" />
                  <circle className="trail__pin-ring" r="12" />
                  <circle className="trail__pin-core" r="4.6" />
                </g>
              </svg>

              <p className="trail__country" style={place(trail.country.place)}>
                {trail.country.label}
              </p>
              <p
                className="trail__place"
                style={at([pinX + trail.source.labelAt[0], pinY + trail.source.labelAt[1]])}
              >
                {trail.source.label}
              </p>

              {trail.points.map((p, index) => (
                <span
                  key={p.title}
                  className={`trail__photo${active === index ? ' is-active' : ''}`}
                  data-index={pad(index + 1)}
                  style={{ ...at(p.circle), '--r': p.circle[2], '--i': index }}
                  {...point(index)}
                >
                  <img src={p.image} alt={p.alt} width={172} height={172} loading="lazy" decoding="async" />
                </span>
              ))}
            </div>
          </div>

          <ol className="trail__points">
            {trail.points.map((p, index) => (
              <li
                key={p.title}
                className={`trail__label${active === index ? ' is-active' : ''}`}
                style={{ ...at(p.label), '--lw': p.label[2], '--i': index }}
                {...point(index)}
              >
                <h3 className="trail__label-title">
                  <span className="trail__label-num" aria-hidden="true">
                    {pad(index + 1)}
                  </span>
                  {p.title}
                </h3>
                {p.body?.map((text) => (
                  <p key={text} className="trail__label-body">
                    {text}
                  </p>
                ))}
                {p.list && (
                  <>
                    <p className="trail__label-lead">{p.list.title}</p>
                    <ul className="trail__label-list">
                      {p.list.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ol>

          <p className="trail__hint" aria-hidden="true" style={at(trail.hintAt)}>
            {trail.hint}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
