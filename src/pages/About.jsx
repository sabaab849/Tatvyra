import Reveal from '../components/Reveal'
import Button from '../components/Button'
import WhyTatvyra from '../sections/WhyTatvyra'
import FinalCTA from '../sections/FinalCTA'
import { BRAND } from '../data/brand'
import { CATEGORIES } from '../data/catalogue'
import usePageMeta from '../lib/usePageMeta'

export default function About() {
  usePageMeta({
    title: 'About — Tatvyra',
    description:
      'Tatvyra is the clean-label wellness range from Feynman Foodcraft Pvt. Ltd. — nut butters, moringa, spirulina and single-origin raw honey.',
  })

  return (
    <div className="about">
      <header className="about__hero">
        <div className="shell">
          <Reveal className="about__hero-inner">
            <p className="eyebrow">About Tatvyra</p>
            <h1 className="display display--l about__title">
              Clean-label wellness, kept honest.
            </h1>
            <p className="lede about__lede">{BRAND.promise}</p>
          </Reveal>
        </div>
      </header>

      <section className="section about__story" aria-labelledby="about-story">
        <div className="shell about__story-inner">
          <Reveal className="about__story-copy">
            <h2 id="about-story" className="display display--s">
              Four foods that were already good.
            </h2>
            <p>
              Tatvyra is made by {BRAND.company} The range is deliberately narrow — nut butters,
              moringa, spirulina and raw honey — because these are foods that work perfectly well
              on their own and mostly need someone not to interfere with them.
            </p>
            <p>
              So the nut butters are milled from the nut, without hydrogenated oils, added sugar or
              preservatives. Moringa leaf and spirulina go into powders, tablets, capsules and
              gummies so the format can change without the ingredient changing. The four raw honeys
              stay separate by origin, because a dense forest floral and a high-altitude Himalayan
              harvest are genuinely different things.
            </p>
            <p>
              Every batch runs through an FSSAI-certified process. Every mark on a pack has a written
              definition, published on the product page it belongs to.
            </p>
            <Button to="/shop" variant="outline">Shop the range</Button>
          </Reveal>

          <Reveal className="about__story-media" delay={110}>
            <div className="frame frame--3x4">
              <img
                src="/images/hero-scene.webp"
                alt="The Tatvyra range — nut butter, moringa, spirulina and raw honey — laid out on a wooden table."
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--sunken about__ranges" aria-labelledby="about-ranges">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">The ranges</p>
            <h2 id="about-ranges" className="display display--m">What we make.</h2>
          </Reveal>
          <ul className="about__range-list">
            {CATEGORIES.map((category, index) => (
              <Reveal as="li" key={category.slug} delay={index * 70}>
                <span className="about__range-number">{category.number}</span>
                <h3 className="about__range-name display display--s">{category.name}</h3>
                <p>{category.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <WhyTatvyra />
      <FinalCTA />
    </div>
  )
}
