import Reveal from '../components/Reveal'
import { MARKS } from '../data/brand'

/**
 * Quotes the on-pack mark definitions from the catalogue verbatim. Each mark
 * carries the exact scope the brand published — including the note that raw
 * honey is excluded from the vegan mark.
 */
const ORDER = ['clean-label', 'vegan', 'gluten-free', 'nutrition-forward', 'single-origin']

export default function CleanLabel() {
  return (
    <section className="section cleanlabel section--purple on-dark" aria-labelledby="cleanlabel-title">
      <div className="shell cleanlabel__inner">
        <Reveal className="cleanlabel__lead">
          <p className="eyebrow eyebrow--on-dark">Standards</p>
          <h2 id="cleanlabel-title" className="display display--l cleanlabel__title">
            What each mark means.
          </h2>
          <p className="cleanlabel__intro">
            The marks on a Tatvyra pack are defined, not decorative. Here is exactly what each one
            claims, and where it applies.
          </p>
        </Reveal>

        <dl className="cleanlabel__list">
          {ORDER.map((key, index) => (
            <Reveal as="div" className="cleanlabel__item" key={key} delay={index * 60}>
              <dt className="cleanlabel__term">
                <span className="cleanlabel__index">{String(index + 1).padStart(2, '0')}</span>
                {MARKS[key].label}
              </dt>
              <dd className="cleanlabel__def">{MARKS[key].definition}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
