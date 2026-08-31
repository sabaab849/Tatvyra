import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { VOICE_TRAITS } from '../data/brand'

/**
 * Restrained markers only — editorial numerals and rules, no wellness icons.
 */
export default function WhyTatvyra() {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="shell">
        <SectionHeading
          id="why-title"
          eyebrow="Why Tatvyra"
          title="Four things we hold ourselves to."
          size="l"
        />

        <ol className="why__list">
          {VOICE_TRAITS.map((trait, index) => (
            <Reveal as="li" className="why__item" key={trait.id} delay={index * 70}>
              <span className="why__number">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="why__title">{trait.title}</h3>
              <p className="why__body">{trait.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
