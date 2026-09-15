import Reveal from '../components/Reveal'

/**
 * A struck seal: two true circles and a line of type on the lower arc.
 *
 * Nothing here is displaced — these are meant to read as pressed dies, so the
 * circles stay exactly round. Depth is a blind deboss: each ring is stroked
 * twice, a dark pass offset up-left and a light pass offset down-right, which
 * with the light reading from the top-left sinks the ring into the ground.
 *
 * The arc path runs left to right beneath the centre with an anticlockwise
 * sweep, which is what keeps the lettering upright rather than inverted.
 */
function Seal({ id }) {
  const arcId = `seal-arc-${id}`

  return (
    <svg className="shelf__rings" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <path id={arcId} d="M 38 104 A 62 62 0 0 0 162 104" fill="none" />
      </defs>

      <g fill="none">
        <g className="shelf__rings-shade" transform="translate(-0.9 -1.1)">
          <circle cx="100" cy="100" r="92" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="76" strokeWidth="1.1" />
        </g>
        <g className="shelf__rings-lit" transform="translate(0.9 1.1)">
          <circle cx="100" cy="100" r="92" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="76" strokeWidth="1.1" />
        </g>
      </g>

      <text className="shelf__arc">
        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
          Tatvyra
        </textPath>
      </text>
    </svg>
  )
}

/**
 * The four differentiators, set as pressed seals on a grainy beige ground.
 *
 * The seal carries a short two-line form of each point and the sentence sits
 * beneath it, so the row scans as four marks first and reads as prose second.
 */
const POINTS = [
  {
    id: 'clean-label',
    mark: ['True Clean', 'Label'],
    body: 'No hydrogenated oils, added sugar, salt or preservatives across the entire range; verifiable, not just claimed.',
  },
  {
    id: 'formats',
    mark: ['Format', 'Innovation'],
    body: 'The only range offering powder, tablet, capsule and effervescent formats across moringa and spirulina.',
  },
  {
    id: 'one-brand',
    mark: ['One-Brand', 'Daily Ritual'],
    body: 'Five categories under one label: a retailer stocks one trusted brand instead of five unknown ones.',
  },
  {
    id: 'validated',
    mark: ['Traditional', '+ Validated'],
    body: 'Rooted in Ayurvedic use, backed by consistent, testable manufacturing standards.',
  },
]

export default function ShelfTrust() {
  return (
    <section className="section shelf" aria-labelledby="shelf-title">
      <div className="shell shelf__inner">
        <div className="shelf__header">
          <p className="shelf__eyebrow">The Difference</p>
          <h2 id="shelf-title" className="shelf__title">
            Built to be trusted on the shelf, not just tried once
          </h2>
        </div>

        <ul className="shelf__grid">
          {POINTS.map((point, index) => (
            <Reveal as="li" className="shelf__item" key={point.id} delay={index * 90}>
              <span className="shelf__seal" aria-hidden="true">
                <Seal id={point.id} />
                <span className="shelf__mark">
                  {point.mark[0]}
                  <br />
                  {point.mark[1]}
                </span>
              </span>
              {/* The seal carries the words visually; this repeats them as a
                  real heading so the list still has structure when read out. */}
              <h3 className="visually-hidden">{point.mark.join(' ')}</h3>
              <p className="shelf__body">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
