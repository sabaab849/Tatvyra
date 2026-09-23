import Reveal from './Reveal'

const pad = (n) => String(n).padStart(2, '0')

/**
 * An editorial "journey" band for the product page: a headline, a sequence of
 * stages joined by one connecting rule, and either a closing lifestyle frame or
 * a side column of short qualities and a closing line.
 *
 * Driven entirely by `product.journey` in the catalogue and renders nothing
 * without it, so it appears only on products that have been given one. Its
 * brief asks for the body sans throughout, so it sets no serif and no display
 * face — see .journey in pages.css.
 *
 * A stage's `display` lines are set large in its caption, for a sequence
 * carried by type as much as by photographs, and `narrow` moves the stage to
 * that position in the single-column sequence on small screens. A `finale`
 * closes the band with lines set larger still, beside one product photograph.
 */
export default function ProductJourney({ product }) {
  const journey = product.journey
  if (!journey) return null
  const last = journey.stages.length - 1
  const aside = Boolean(journey.qualities || journey.line)
  const finale = journey.finale

  const stageClass = (stage) =>
    [
      'journey__stage',
      stage.product && 'journey__stage--product',
      stage.frame && `journey__stage--${stage.frame}`,
      stage.display && 'journey__stage--display',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <section className={`journey journey--${journey.stages.length}`} aria-labelledby="journey-title">
      <div className="shell">
        <Reveal className="journey__head">
          <p className="journey__eyebrow">{journey.eyebrow}</p>
          <div className={`journey__title-row${journey.intro ? '' : ' journey__title-row--solo'}`}>
            <h2 id="journey-title" className="journey__title">
              {journey.title}
            </h2>
            {journey.intro && <p className="journey__intro">{journey.intro}</p>}
          </div>
        </Reveal>

        <div className={`journey__track${aside ? ' journey__track--aside' : ''}`}>
          <ol className="journey__stages">
            {journey.stages.map((stage, index) => {
              // A stage with no title of its own is headed by its display line.
              const Display = stage.title ? 'p' : 'h3'
              const reordered = stage.narrow && stage.narrow !== index + 1

              return (
                <Reveal
                  as="li"
                  key={stage.title ?? stage.display.join(' ')}
                  delay={index * 90}
                  className={stageClass(stage)}
                  style={{ '--narrow-order': stage.narrow ?? index + 1 }}
                >
                  <div className="journey__media">
                    <img
                      src={stage.image}
                      alt={stage.alt}
                      width={stage.width}
                      height={stage.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="journey__caption">
                    {/* The numeral and the rule running on to the next stage. The
                        list already announces its order, so this is decoration.
                        A stage that moves on small screens carries both
                        numbers, so each layout counts in the order it shows. */}
                    <p
                      className={`journey__marker${index === last ? ' journey__marker--end' : ''}`}
                      aria-hidden="true"
                    >
                      {reordered ? (
                        <span className="journey__num">
                          <span className="journey__num-wide">{pad(index + 1)}</span>
                          <span className="journey__num-narrow">{pad(stage.narrow)}</span>
                        </span>
                      ) : (
                        <span className="journey__num">{pad(index + 1)}</span>
                      )}
                      <span className="journey__line" />
                    </p>
                    {stage.title && <h3 className="journey__stage-title">{stage.title}</h3>}
                    {stage.display && (
                      <Display className="journey__display">
                        {stage.display.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </Display>
                    )}
                    {stage.body && <p className="journey__body">{stage.body}</p>}
                    {stage.note && <p className="journey__note">{stage.note}</p>}
                  </div>
                </Reveal>
              )
            })}
          </ol>

          {/* Beside the finished product: the qualities as small set labels on
              the photographs' baseline, and the closing line on the captions'. */}
          {journey.qualities && (
            <Reveal as="ul" className="journey__qualities" delay={journey.stages.length * 90}>
              {journey.qualities.map((quality) => (
                <li key={quality}>{quality}</li>
              ))}
            </Reveal>
          )}
          {journey.line && (
            <Reveal as="p" className="journey__aside-line" delay={journey.stages.length * 90 + 90}>
              {journey.line}
            </Reveal>
          )}
        </div>

        {journey.closing && (
          <Reveal className="journey__closing">
            <div className="journey__closing-copy">
              <p className="journey__closing-label">{journey.closing.label}</p>
              <p className="journey__closing-body">{journey.closing.body}</p>
            </div>
            <div className="journey__closing-media">
              <img
                src={journey.closing.image}
                alt={journey.closing.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="journey__statement">{journey.closing.statement}</p>
          </Reveal>
        )}

        {finale && (
          <div className="journey__finale">
            <Reveal className="journey__finale-copy">
              <h3 className="journey__finale-title">
                {finale.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              {finale.callout && <p className="journey__finale-callout">{finale.callout}</p>}
            </Reveal>
            <Reveal className="journey__finale-media" delay={110}>
              <img
                src={finale.image}
                alt={finale.alt}
                width={finale.width}
                height={finale.height}
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
