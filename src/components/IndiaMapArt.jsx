import { useId } from 'react'
import { INDIA_PATH, projectIndia } from '../lib/indiaMap'

/* The region the filters work in: the outline's box with room for the paint to
   bleed past it. */
const REGION = { x: -80, y: -80, width: 1160, height: 1297, filterUnits: 'userSpaceOnUse' }

/* A slow noise that nudges the outline a unit or two either way — enough to
   read as painted by hand, never enough to move a border. */
function Warp() {
  return <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="5" result="warp" />
}

/* Where a painting sits, in the outline's units. Either `at` ([x, y, width,
   height]), or `place` ([lat, lon]) with `size` ([width, height]), which
   stands the painting's foot on that point. */
function boxFor({ at, place, size }) {
  if (at) return at
  const [x, y] = projectIndia(...place)
  return [x - size[0] / 2, y - size[1], size[0], size[1]]
}

/**
 * A painted map of India, drawn as an SVG layer in the outline's own units so
 * any origin map can set it beneath its routes and pins: India's official
 * outline as a sepia watercolour wash on crumpled paper, darker where the
 * pigment pools at the rim and bleeding softly into the page past it.
 *
 * `paintings` lays painted artwork over it — the Himalaya, forests — each as
 * { src, at | place + size, opacity, flip }. Artwork is masked to the painted
 * land, so nothing is painted past the border.
 */
export default function IndiaMapArt({ paintings = [] }) {
  const uid = useId().replace(/:/g, '')
  const id = (name) => `${uid}-${name}`

  return (
    <g className="ima">
      <defs>
        {/* The land as painted, softened: for masking the artwork to it. */}
        <filter id={id('shape')} {...REGION}>
          <Warp />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <filter id={id('paint')} {...REGION} colorInterpolationFilters="sRGB">
          <Warp />
          <feDisplacementMap in="SourceAlpha" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="3" result="soft" />

          {/* Crumpled paper: a soft relief, lit from the upper left, kept low. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="4" seed="11" result="bump" />
          <feDiffuseLighting in="bump" surfaceScale="2.6" diffuseConstant="1.12" result="relief">
            <feDistantLight azimuth="225" elevation="56" />
          </feDiffuseLighting>
          <feFlood className="ima__wash-colour" result="wash" />
          <feComposite in="wash" in2="relief" operator="arithmetic" k1="0.35" k2="0.65" result="paper" />

          {/* Creases: the fine valleys of a folded noise, drawn as faint veins. */}
          <feTurbulence type="turbulence" baseFrequency="0.011" numOctaves="2" seed="7" result="folds" />
          <feColorMatrix
            in="folds"
            type="matrix"
            values="0 0 0 0 0.36  0 0 0 0 0.3  0 0 0 0 0.26  -2.6 0 0 0 0.12"
            result="veins"
          />
          <feGaussianBlur in="veins" stdDeviation="0.7" result="creases" />

          {/* Pigment pooling in slow, soft patches, and a few paler lifts. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.007" numOctaves="3" seed="21" result="blotch" />
          <feColorMatrix
            in="blotch"
            type="matrix"
            values="0 0 0 0 0.4  0 0 0 0 0.33  0 0 0 0 0.28  -1.7 0 0 0 0.68"
            result="pools"
          />
          <feColorMatrix
            in="blotch"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.6 0 0 0 -0.78"
            result="lifts"
          />

          <feComposite in="pools" in2="paper" operator="over" result="pooled" />
          <feComposite in="lifts" in2="pooled" operator="over" result="lifted" />
          <feComposite in="creases" in2="lifted" operator="over" result="washed" />
          <feComposite in="washed" in2="soft" operator="in" result="body" />

          {/* Pigment pooling at the rim: the shape less a wider blur of it. */}
          <feGaussianBlur in="shape" stdDeviation="22" result="wide" />
          <feComposite in="soft" in2="wide" operator="arithmetic" k2="1" k3="-1" result="rim" />
          <feGaussianBlur in="rim" stdDeviation="3" result="rimSoft" />
          <feFlood className="ima__rim-colour" result="rimInk" />
          <feComposite in="rimInk" in2="rimSoft" operator="in" result="edge" />

          {/* The wash bleeding softly into the page beyond the edge. */}
          <feGaussianBlur in="shape" stdDeviation="12" result="spread" />
          <feFlood className="ima__bleed-colour" result="bleedInk" />
          <feComposite in="bleedInk" in2="spread" operator="in" result="bleed" />

          <feMerge>
            <feMergeNode in="bleed" />
            <feMergeNode in="body" />
            <feMergeNode in="edge" />
          </feMerge>
        </filter>

        <mask
          id={id('land')}
          maskUnits="userSpaceOnUse"
          x={REGION.x}
          y={REGION.y}
          width={REGION.width}
          height={REGION.height}
        >
          <path d={INDIA_PATH} fill="white" filter={`url(#${id('shape')})`} />
        </mask>
      </defs>

      <path className="ima__land" d={INDIA_PATH} filter={`url(#${id('paint')})`} />

      {paintings.length > 0 && (
        <g mask={`url(#${id('land')})`}>
          {paintings.map((painting) => {
            const [x, y, width, height] = boxFor(painting)
            return (
              <image
                key={`${painting.src}-${Math.round(x)}-${Math.round(y)}`}
                className="ima__painting"
                href={painting.src}
                x={x}
                y={y}
                width={width}
                height={height}
                opacity={painting.opacity ?? 1}
                preserveAspectRatio="none"
                transform={painting.flip ? `translate(${2 * x + width} 0) scale(-1 1)` : undefined}
              />
            )
          })}
        </g>
      )}

      {/* The border itself, fine and faint, so the outline stays exact under
          the soft painted edge. */}
      <path className="ima__border" d={INDIA_PATH} />
    </g>
  )
}
