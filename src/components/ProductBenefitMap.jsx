import { useEffect, useId, useMemo, useState } from 'react'
import Reveal from './Reveal'

/* Length of a route (M then C commands only, as the catalogue writes them),
   in the drawing's pixels. Sampled, which is ample for pacing the trace. */
function routeLength(d) {
  const n = d.match(/-?\d+(?:\.\d+)?/g).map(Number)
  let [x, y] = n
  let length = 0
  for (let i = 2; i + 5 < n.length; i += 6) {
    const [x1, y1, x2, y2, x3, y3] = n.slice(i, i + 6)
    let px = x, py = y
    for (let step = 1; step <= 16; step++) {
      const t = step / 16, s = 1 - t
      const qx = s * s * s * x + 3 * s * s * t * x1 + 3 * s * t * t * x2 + t * t * t * x3
      const qy = s * s * s * y + 3 * s * s * t * y1 + 3 * s * t * t * y2 + t * t * t * y3
      length += Math.hypot(qx - px, qy - py)
      px = qx
      py = qy
    }
    x = x3
    y = y3
  }
  return length
}

/* Each hotspot readied for the page, and every drop on the drawing — the
   benefits' own and the rest along the range — in the order they breathe in:
   west to east, the way light would travel along the range. */
function layoutFor(map) {
  const spots = map.benefits.map(({ hotspot }) => {
    if (!hotspot) return null
    const [x, y, corner] = hotspot.card
    const right = corner[1] === 'r', bottom = corner[0] === 'b'
    return {
      ...hotspot,
      // A steady hand: a short route draws quickly, a long one takes longer.
      trace: `${Math.round(420 + routeLength(hotspot.route) * 1.9)}ms`,
      cardStyle: {
        '--card-x': x,
        '--card-y': y,
        '--card-tx': right ? '-100%' : '0%',
        '--card-ty': bottom ? '-100%' : '0%',
        '--card-origin': `${right ? 'right' : 'left'} ${bottom ? 'bottom' : 'top'}`,
        '--drop-x': hotspot.drop[0],
      },
    }
  })

  const drops = [
    ...spots.flatMap((spot, index) => (spot ? [{ at: spot.drop, spot: index }] : [])),
    ...(map.drops ?? []).map((at) => ({ at, spot: null })),
  ]
  const west = drops.map(({ at }) => at[0]).sort((a, b) => a - b)
  drops.forEach((drop) => { drop.order = west.indexOf(drop.at[0]) })

  return { spots, drops, interactive: spots.some(Boolean) }
}

/**
 * A benefit map for the product page: an illustration with the product's
 * benefits called out around it, each joined to it by a drawn line.
 *
 * Driven entirely by `product.benefitMap` in the catalogue and renders nothing
 * without it. The illustration carries the drawing, its icons and the lines
 * between them; the heading and every label are live text laid over it,
 * placed in fractions of the illustration and sized in units of its width
 * (container query units), so they stay on their marks at any size. Below the
 * stacking width the text leaves the illustration: the heading goes above it
 * and the labels become a list beneath, each with its icon cut from the
 * drawing.
 *
 * Where a benefit has a `hotspot`, the drawing itself is explored. Its honey
 * drop is a button: hovering it with a mouse, or reaching it from the
 * keyboard, lifts the drop and warms its route and benefit; pressing it keeps
 * the drop lifted, traces the route from its source on the map, through the
 * honey, to the benefit, and opens a small card beside it (beneath the
 * drawing, on narrower screens). Pressing it again, or Escape, closes it.
 * Nothing is redrawn: the lifted drops are the drawing's own pixels, and the
 * routes and glows are inked over it.
 */
export default function ProductBenefitMap({ product }) {
  const map = product.benefitMap
  const uid = useId()
  const layout = useMemo(() => (map ? layoutFor(map) : null), [map])
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)
  // The card last opened. It outlives the card closing, so the card fades
  // out as it was rather than emptying first.
  const [shown, setShown] = useState(null)

  useEffect(() => {
    if (active === null) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  if (!map) return null

  const { spots, drops, interactive } = layout
  const glowId = `${uid}-glow`
  const detailId = `${uid}-detail`
  const focused = active !== null || hovered !== null
  const stateOf = (index) =>
    [index === active && 'is-active', index === hovered && 'is-hovered']
      .filter(Boolean)
      .join(' ')

  const toggle = (index) => {
    setActive((current) => (current === index ? null : index))
    setShown(index)
  }

  // Only a real hover previews: a touch is a press, and is answered by it.
  const hoverProps = (index) => ({
    onPointerEnter: (event) => {
      if (event.pointerType === 'mouse') setHovered(index)
    },
    onPointerLeave: (event) => {
      if (event.pointerType === 'mouse') setHovered((current) => (current === index ? null : current))
    },
    onFocus: (event) => {
      if (event.currentTarget.matches(':focus-visible')) setHovered(index)
    },
    onBlur: () => setHovered((current) => (current === index ? null : current)),
  })

  // A press anywhere on the drawing but a drop puts the card away.
  const onStageClick = (event) => {
    if (!event.target.closest('.benefit-map__spot')) setActive(null)
  }

  const cardClass = [
    'benefit-map__card',
    interactive && 'is-interactive',
    focused && 'has-focus',
  ]
    .filter(Boolean)
    .join(' ')

  const shownBenefit = shown === null ? null : map.benefits[shown]

  return (
    <section className="benefit-map" aria-labelledby="benefit-map-title">
      <div className="shell">
        <Reveal
          className={cardClass}
          style={{ '--sw': map.image.width, '--sh': map.image.height }}
        >
          <div className="benefit-map__head">
            <h2 id="benefit-map-title" className="benefit-map__title">
              {map.title}
            </h2>
            {map.notes.map((note) => (
              <p key={note.join(' ')} className="benefit-map__note">
                <Lines lines={note} />
              </p>
            ))}
          </div>

          <div className="benefit-map__stage" onClick={interactive ? onStageClick : undefined}>
            <img
              className="benefit-map__art"
              src={map.image.src}
              alt={map.image.alt}
              width={map.image.width}
              height={map.image.height}
              loading="lazy"
              decoding="async"
            />

            {interactive && (
              <>
                {/* Ink laid over the drawing in multiply, so the paper and
                    linework show through: each hotspot's glow and ripple, its
                    route (a soft copy to preview, a traced one when open), the
                    point it starts from, and the wash and ring on its icon. */}
                <svg
                  className="benefit-map__ink"
                  viewBox={`0 0 ${map.image.width} ${map.image.height}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <radialGradient id={glowId}>
                      <stop className="benefit-map__glow-stop" offset="0.5" stopOpacity="0" />
                      <stop className="benefit-map__glow-stop" offset="0.68" stopOpacity="0.15" />
                      <stop className="benefit-map__glow-stop" offset="1" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {spots.map((spot, index) => {
                    if (!spot) return null
                    const [cx, cy, r] = spot.drop
                    const [rx, ry, rr] = spot.ring
                    return (
                      <g
                        key={spot.route}
                        className={`benefit-map__spot-ink ${stateOf(index)}`.trim()}
                        style={{ '--trace': spot.trace }}
                      >
                        <circle className="benefit-map__glow" cx={cx} cy={cy} r={r * 1.8} fill={`url(#${glowId})`} />
                        <circle className="benefit-map__ripple" cx={cx} cy={cy} r={r * 1.1} />
                        <path className="benefit-map__route" d={spot.route} />
                        <path className="benefit-map__trace" d={spot.route} pathLength="1" />
                        {spot.source && (
                          <circle className="benefit-map__source" cx={spot.source[0]} cy={spot.source[1]} r="3.6" />
                        )}
                        <circle className="benefit-map__wash" cx={rx} cy={ry} r={rr - 1.5} />
                        <circle className="benefit-map__halo" cx={rx} cy={ry} r={rr + 8} />
                      </g>
                    )
                  })}
                </svg>

                {/* The drops themselves, cut from the drawing: hidden while
                    they sit still, shown only to lift, dim or breathe. */}
                <div
                  className="benefit-map__drops"
                  style={{ '--art': `url("${map.image.src}")` }}
                  aria-hidden="true"
                >
                  {drops.map(({ at: [cx, cy, r], spot, order }) => {
                    const lifted = spot !== null && (spot === active || spot === hovered)
                    return (
                      <span
                        key={`${cx} ${cy}`}
                        className="benefit-map__drop"
                        data-state={lifted ? 'lift' : focused ? 'dim' : undefined}
                        style={{ '--cx': cx, '--cy': cy, '--r': r, '--order': order }}
                      />
                    )
                  })}
                </div>

                {spots.map((spot, index) => {
                  if (!spot) return null
                  const [cx, cy, r] = spot.drop
                  return (
                    <button
                      key={spot.route}
                      type="button"
                      className="benefit-map__spot"
                      style={{ '--cx': cx, '--cy': cy, '--r': r }}
                      aria-label={map.benefits[index].title}
                      aria-expanded={active === index}
                      aria-controls={detailId}
                      onClick={() => toggle(index)}
                      {...hoverProps(index)}
                    />
                  )
                })}
              </>
            )}
          </div>

          {interactive && (
            <div
              id={detailId}
              className="benefit-map__detail"
              data-open={active !== null || undefined}
              style={shown === null ? undefined : spots[shown].cardStyle}
              aria-live="polite"
            >
              <div className="benefit-map__detail-clip">
                {shownBenefit && (
                  <div key={shown} className="benefit-map__detail-card">
                    <h3 className="benefit-map__detail-title">{shownBenefit.title}</h3>
                    <p className="benefit-map__detail-text">{shownBenefit.detail}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <ul className="benefit-map__benefits">
            {map.benefits.map((benefit, index) => (
              <li
                key={benefit.icon}
                className={`benefit-map__benefit ${stateOf(index)}`.trim()}
                style={{
                  '--x': benefit.at[0],
                  '--y': benefit.at[1],
                  '--trace': spots[index]?.trace,
                }}
              >
                {/* The same icon is drawn on the map; this copy shows only in
                    the list. */}
                <img
                  className="benefit-map__icon"
                  src={benefit.icon}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                />
                <p>
                  <Lines lines={benefit.lines} />
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* The drawing's own line breaks, held while the text sits on it. Once it
   leaves the drawing the lines run on as one sentence (.benefit-map__line). */
function Lines({ lines }) {
  return lines.map((line, index) => (
    <span key={line} className="benefit-map__line">
      {line}
      {index < lines.length - 1 && ' '}
    </span>
  ))
}
