import { Fragment } from 'react'
import Reveal from './Reveal'
import { ArrowIcon } from './Icons'

/**
 * A process sequence for a single SKU, laid out from the supplied editorial
 * reference: a lead-in, four staged photographs joined by arrows, then whichever
 * closing blocks the story carries — a daily-routine band beside a wide feature
 * image, a comparison of form, and a final product moment.
 *
 * Driven entirely by the SKU's `story` field and renders nothing without one.
 * Every line of copy lives in the catalogue next to the product it describes,
 * so what this section may claim stays reviewable in one place.
 *
 * `theme` opts a story into a variant look (`timeline` joins the stages with
 * one hairline timeline instead of arrows), and `title` may be an array of
 * phrases, each set in a span so the variant can colour one.
 */

/* Every photographic slot a story has, so a missing one can be caught before
   anything renders. */
function imageSlots(story) {
  return [
    ...story.stages,
    ...(story.routine?.uses ?? []),
    ...(story.feature ? [story.feature] : []),
    ...(story.finale?.images ?? []),
  ]
}

/* A photograph, or — while one is still being commissioned — a labelled slot
   holding its place in the layout. The slot only ever renders in development:
   a production build drops the whole story first (see below). */
function Photo({ slot, className }) {
  if (slot.image) {
    return (
      <img
        className={className}
        src={slot.image}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <div className={`${className} pstory__pending`} role="img" aria-label={`Photograph needed: ${slot.pending}`}>
      <span className="pstory__pending-kicker">Photograph needed</span>
      <span className="pstory__pending-brief">{slot.pending}</span>
    </div>
  )
}

const pad = (n) => String(n).padStart(2, '0')

export default function ProductStory({ product }) {
  const story = product.story
  if (!story) return null

  // A story with photographs still outstanding never ships half-built: a
  // production build renders nothing until every slot has its image.
  const incomplete = imageSlots(story).some((slot) => !slot.image)
  if (incomplete && !import.meta.env.DEV) return null

  const { stages, routine, feature, compare, finale } = story

  return (
    <section
      className={`pstory${story.theme ? ` pstory--${story.theme}` : ''}`}
      aria-labelledby="pstory-title"
    >
      <div className="shell">
        <Reveal className="pstory__head">
          <p className="pstory__eyebrow">{story.eyebrow}</p>
          <div className="pstory__lead">
            <h2 id="pstory-title" className="pstory__title">
              {Array.isArray(story.title)
                ? story.title.map((phrase, i) => (
                    <Fragment key={phrase}>
                      {i > 0 && ' '}
                      <span>{phrase}</span>
                    </Fragment>
                  ))
                : story.title}
            </h2>
            {story.intro && <p className="pstory__intro">{story.intro}</p>}
          </div>
        </Reveal>

        <Reveal as="ol" className="pstory__stages" delay={80}>
          {stages.map((stage, index) => (
            <li key={stage.label} className="pstory__stage">
              <div className="pstory__media">
                {index > 0 && (
                  <span className="pstory__arrow" aria-hidden="true">
                    <ArrowIcon width={22} height={22} />
                  </span>
                )}
                <Photo slot={stage} className="pstory__img" />
              </div>
              <div className="pstory__text">
                {/* The list already carries the order for assistive tech. */}
                <p className="pstory__index" aria-hidden="true">
                  {pad(index + 1)}
                </p>
                <h3 className="pstory__label">{stage.label}</h3>
                {stage.callout && <p className="pstory__callout">{stage.callout}</p>}
                {stage.body && <p className="pstory__body">{stage.body}</p>}
                {stage.specs && (
                  <dl className="pstory__specs">
                    {stage.specs.map(([term, value]) => (
                      <div key={term}>
                        <dt>{term}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          ))}
        </Reveal>

        {compare && (
          <Reveal className="pstory__compare" delay={80}>
            {/* The note speaks for the whole comparison, so it leads it rather
                than sitting under one side, where it read as that side's caption. */}
            <div className="pstory__compare-lead">
              <p className="pstory__eyebrow">{compare.label}</p>
              <p className="pstory__note">{compare.note}</p>
            </div>
            <dl className="pstory__versus">
              {compare.items.map((item) => (
                <div key={item.name} className="pstory__versus-item">
                  <dt>{item.name}</dt>
                  <dd>{item.form}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {(routine || feature) && (
          <div className="pstory__foot">
            {routine && (
              <Reveal className="pstory__routine" delay={80}>
                <p className="pstory__index" aria-hidden="true">
                  {pad(stages.length + 1)}
                </p>
                <h3 className="pstory__label">{routine.label}</h3>
                <p className="pstory__body pstory__body--wide">{routine.body}</p>
                <ul className="pstory__uses">
                  {routine.uses.map((use) => (
                    <li key={use.label}>
                      <Photo slot={use} className="pstory__use-img" />
                      <span className="pstory__use-label">{use.label}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {feature && (
              <Reveal as="figure" className="pstory__feature" delay={160}>
                <Photo slot={feature} className="pstory__feature-img" />
                <figcaption className="pstory__quote">{feature.quote}</figcaption>
              </Reveal>
            )}
          </div>
        )}

        {finale && (
          <div className="pstory__finale">
            <Reveal className="pstory__finale-copy">
              <h3 className="pstory__finale-title">
                {finale.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              {finale.callout && <p className="pstory__callout">{finale.callout}</p>}
            </Reveal>
            <Reveal className="pstory__finale-media" delay={110}>
              {finale.images.map((slot) => (
                <Photo key={slot.image ?? slot.pending} slot={slot} className="pstory__finale-img" />
              ))}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
