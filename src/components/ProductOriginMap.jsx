import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Reveal from './Reveal'
import { PinIcon } from './Icons'
import IndiaMapArt from './IndiaMapArt'
import { projectIndia } from '../lib/indiaMap'
import useMedia from '../lib/useMedia'

/* The map answers the pointer only where hovering is real: a fine pointer on
   anything wider than the phone layout. Everywhere else it is a still picture
   with its details listed beneath it. */
const EXPLORE_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 48.0625rem)'

const pad = (n) => String(n).padStart(2, '0')
const round = (n) => Math.round(n * 10) / 10

/* Everything on the map in one coordinate space — the outline's own units —
   then expressed for the page as hundredths of the map's width, so the HTML
   laid over the drawing (photographs, labels, lettering) scales with it. */
function layoutFor(map) {
  const [vx, vy, vw] = map.view
  const toX = (x) => round(((x - vx) / vw) * 100)
  const toY = (y) => round(((y - vy) / vw) * 100)

  const points = map.points.map((point) => {
    const [cx, cy, r] = point.circle
    const [px, py] = projectIndia(...point.place)
    // The route leaves the photograph's edge and stops just short of the pin,
    // bowed a little so it reads as a flight path rather than a leader line.
    const dx = px - cx, dy = py - cy
    const len = Math.hypot(dx, dy)
    const ux = dx / len, uy = dy / len
    const sx = cx + ux * (r + 16), sy = cy + uy * (r + 16)
    const ex = px - ux * 14, ey = py - uy * 14
    const bend = Math.min(90, len * 0.18)
    const qx = (sx + ex) / 2 - uy * bend, qy = (sy + ey) / 2 + ux * bend
    const labelX = point.align === 'end' ? cx + r * 0.9 : cx - r * 0.9

    return {
      ...point,
      pin: [px, py],
      route: `M${round(sx)} ${round(sy)}Q${round(qx)} ${round(qy)} ${round(ex)} ${round(ey)}`,
      style: {
        '--cx': toX(cx),
        '--cy': toY(cy),
        '--d': round(((r * 2) / vw) * 100),
        '--lx': toX(labelX),
        '--ly': toY(cy + r + 22),
      },
      // Pin and photograph, in page hundredths, for the nearest-point test.
      hit: { pin: [toX(px), toY(py)], circle: [toX(cx), toY(cy), ((r / vw) * 100)] },
    }
  })

  const [lat, lon] = map.countryAt ?? [25.4, 76.6]
  const [kx, ky] = projectIndia(lat, lon)
  return { points, country: { '--x': toX(kx), '--y': toY(ky) } }
}

/**
 * The "Origin & process" map for a product page: a headline on the left, a map
 * of India in the middle with each source's photograph joined to the place it
 * is pinned, and the product's own notes on the right.
 *
 * Driven entirely by `product.originMap` in the catalogue and renders nothing
 * without it. The outline is drawn from India's official boundary and every pin
 * is placed from a real latitude and longitude, so each route ends where its
 * region actually is.
 *
 * With a mouse, the map is explored by moving across it: the nearest source
 * lifts its details into view and its route lights up, and the photographs are
 * buttons, so the same works from the keyboard. Without one, and on phones, the
 * details are listed beneath the map instead.
 */
export default function ProductOriginMap({ product }) {
  const map = product.originMap
  const explore = useMedia(EXPLORE_QUERY)
  const [active, setActive] = useState(null)
  const stageRef = useRef(null)
  const uid = useId()
  const layout = useMemo(() => (map ? layoutFor(map) : null), [map])

  useEffect(() => {
    if (active === null) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  if (!map) return null
  const [vx, vy, vw, vh] = map.view
  const titleId = `${uid}-title`

  // Anywhere over the map, the nearest source answers: its pin or the edge of
  // its photograph, whichever the pointer is closer to.
  const onPointerMove = (event) => {
    const stage = stageRef.current
    if (!stage) return
    // Reading an open card holds it open, even where another pin is nearer.
    if (event.target.closest?.('.omap__point.is-active')) return
    const box = stage.getBoundingClientRect()
    if (event.clientY > box.bottom) return
    const x = ((event.clientX - box.left) / box.width) * 100
    const y = ((event.clientY - box.top) / box.width) * 100
    let best = 0, bestDistance = Infinity
    layout.points.forEach(({ hit }, index) => {
      const toPin = Math.hypot(x - hit.pin[0], y - hit.pin[1])
      const toPhoto = Math.max(0, Math.hypot(x - hit.circle[0], y - hit.circle[1]) - hit.circle[2])
      const distance = Math.min(toPin, toPhoto)
      if (distance < bestDistance) { bestDistance = distance; best = index }
    })
    setActive(best)
  }

  const figureClass = [
    'omap__figure',
    explore ? 'is-explore' : 'is-list',
    explore && active !== null && 'has-active',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className="omap" aria-labelledby={titleId}>
      {map.drip && <img className="omap__drip" src={map.drip} alt="" loading="lazy" decoding="async" />}

      <div className="shell omap__grid">
        <Reveal className="omap__intro">
          <p className="omap__eyebrow">{map.eyebrow}</p>
          <h2 id={titleId} className="omap__title">
            {map.title.map((line) => (
              <span key={line}>{line} </span>
            ))}
            {map.accent.map((line) => (
              <span key={line} className="omap__title-accent">
                {line}{' '}
              </span>
            ))}
          </h2>
          <p className="omap__lede">{map.intro}</p>
        </Reveal>

        <Reveal
          className={figureClass}
          delay={80}
          onPointerMove={explore ? onPointerMove : undefined}
          onPointerLeave={explore ? () => setActive(null) : undefined}
        >
          <div className="omap__stage" ref={stageRef} style={{ aspectRatio: `${vw} / ${vh}` }}>
            <svg
              className="omap__svg"
              viewBox={`${vx} ${vy} ${vw} ${vh}`}
              aria-hidden="true"
              focusable="false"
            >
              {/* The shared painted map of India. */}
              <IndiaMapArt paintings={map.paintings} />
              {layout.points.map((point, index) => (
                <g
                  key={point.title}
                  className={`omap__route${explore && active === index ? ' is-active' : ''}`}
                >
                  <path className="omap__line" d={point.route} />
                  <circle className="omap__halo" cx={point.pin[0]} cy={point.pin[1]} r="20" />
                  <circle className="omap__pin" cx={point.pin[0]} cy={point.pin[1]} r="7.5" />
                </g>
              ))}
            </svg>
            <p className="omap__country" style={layout.country}>
              {map.country}
            </p>
          </div>

          <ol className="omap__points">
            {layout.points.map((point, index) => {
              const labelId = `${uid}-label-${index}`
              const detailId = `${uid}-detail-${index}`
              const image = <img src={point.image} alt={point.alt} loading="lazy" decoding="async" />
              return (
                <li
                  key={point.title}
                  className={`omap__point omap__point--${point.align}${
                    explore && active === index ? ' is-active' : ''
                  }`}
                  style={{ ...point.style, '--i': index }}
                  onPointerEnter={explore ? () => setActive(index) : undefined}
                >
                  {explore ? (
                    <button
                      type="button"
                      className="omap__photo"
                      aria-labelledby={labelId}
                      aria-describedby={detailId}
                      aria-expanded={active === index}
                      onFocus={() => setActive(index)}
                      onBlur={() => setActive(null)}
                    >
                      {image}
                    </button>
                  ) : (
                    <span className="omap__photo" data-index={pad(index + 1)}>
                      {image}
                    </span>
                  )}
                  <div className="omap__label">
                    <h3 id={labelId} className="omap__label-title">
                      <span className="omap__num" aria-hidden="true">
                        {pad(index + 1)}
                      </span>
                      {point.title}
                    </h3>
                    <div id={detailId} className="omap__detail">
                      <p className="omap__label-body">{point.body}</p>
                      <p className="omap__region">
                        <PinIcon width={14} height={14} />
                        {point.region}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {explore && (
            <p className="omap__hint" aria-hidden="true">
              {map.hint}
            </p>
          )}
        </Reveal>

        <Reveal className="omap__aside" delay={140}>
          <p className="omap__tagline">
            {map.tagline.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </p>
          <div className="omap__note">
            <h3 className="omap__note-title">{map.about.title}</h3>
            <p className="omap__note-body">{map.about.body}</p>
          </div>
          <div className="omap__note">
            <h3 className="omap__note-title">{map.goodness.title}</h3>
            <p className="omap__note-lead">{map.goodness.lead}</p>
            <ul className="omap__benefits">
              {map.goodness.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
