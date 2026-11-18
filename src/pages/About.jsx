import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'
import WhyTatvyra from '../sections/WhyTatvyra'
import FinalCTA from '../sections/FinalCTA'
import AboutBrand from '../sections/AboutBrand'
import AboutLeaders from '../sections/AboutLeaders'
import AboutPhilosophy from '../sections/AboutPhilosophy'
import { MARKS } from '../data/brand'
import { CATEGORIES } from '../data/catalogue'
import usePageMeta from '../lib/usePageMeta'

/**
 * The range photography for each category, from the purple-label shoot. The
 * catalogue's own category images predate it, so the About page maps its own
 * rather than changing what the shop and homepage draw from CATEGORIES.
 */
const RANGE_PHOTOS = {
  'nut-butters': {
    src: '/images/products/packs/natural-peanut-butter-creamy-2.webp',
    alt: 'A spoon lifting creamy peanut butter from an open jar of Tatvyra Natural Peanut Butter Creamy.',
  },
  moringa: {
    src: '/images/products/packs/moringa-leaf-powder-1.webp',
    alt: 'A pouch of Tatvyra Natural Moringa Powder on a table with nuts, a glass of water and fresh leaves.',
  },
  spirulina: {
    src: '/images/products/packs/spirulina-powder-1.webp',
    alt: 'A pouch of Tatvyra Natural Spirulina Powder on a table with nuts, a glass of water and fresh leaves.',
  },
  'raw-honey': {
    src: '/images/products/packs/multifloral-honey-2.webp',
    alt: 'A wooden dipper drizzling honey into an open jar of Tatvyra Multifloral Honey.',
  },
}

export default function About() {
  usePageMeta({
    title: 'About | Tatvyra',
    description:
      'Tatvyra is the wellness brand from Feynman Foodcraft Pvt. Ltd.: nut butters, moringa, spirulina and single-origin raw honey.',
  })

  return (
    <div className="about">
      <AboutBrand />
      <AboutLeaders />

      {/* The approach shares the philosophy's ground, so the leaf mark and the
          wash run on behind it. */}
      <AboutPhilosophy>
        <section className="about-intro" aria-labelledby="about-intro-title">
          <div className="shell">
            <Reveal className="about-intro__inner">
              <p className="about-eyebrow">Our approach</p>
              <h2 id="about-intro-title" className="about-intro__statement">
                A Simpler Approach to Better Ingredients.
              </h2>
            </Reveal>
          </div>
        </section>
      </AboutPhilosophy>

      <section className="section about-story" aria-labelledby="about-story-title">
        <div className="shell about-story__inner">
          <Reveal className="about-story__media">
            <img
              className="about-story__photo about-story__photo--main"
              src="/images/about/story-peanut-butter-feast.webp"
              alt="Jars of Tatvyra Chocolate Peanut Butter Crunchy, Chocolate Peanut Butter Creamy and Natural Peanut Butter Creamy on a green checked cloth, with chocolate pieces, peanuts, a spoon of peanut butter and chocolate peanut butter on toast."
              width={946}
              height={1183}
              loading="lazy"
              decoding="async"
            />
            {/* The honey inset sits over the corner of the jars photograph. */}
            <img
              className="about-story__photo about-story__photo--inset"
              src="/images/about/story-wild-forest-honey.webp"
              alt="A jar of Tatvyra Wild Forest Honey on a honeycomb-patterned table, with a glass of tea and a bowl of fruit behind it."
              width={880}
              height={1100}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <Reveal className="about-story__copy" delay={110}>
            <p className="about-eyebrow">Our story</p>
            <h2 id="about-story-title" className="about-heading">
              Thoughtfully Made, Naturally Good
            </h2>
            <p>
              Tatvyra started with a simple observation: the foods that have been part of Indian
              kitchens for generations (moringa, honey, ground nuts) kept turning up on shelves
              padded with things nobody asked for.
            </p>
            <p>
              So the nut butters are milled from the nut, without hydrogenated oils or
              preservatives. Moringa leaf and spirulina go into powders, tablets, capsules and
              gummies, so the format can change without the ingredient changing. And the three raw
              honeys stay separate by origin, because a dense forest floral and a pale Kashmiri
              acacia are genuinely different things.
            </p>
            <Button to="/shop" variant="outline">
              Shop All Products
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section about-ranges" aria-labelledby="about-ranges-title">
        <div className="shell">
          <Reveal className="about-head">
                        <div className="about-head__row">
              <h2 id="about-ranges-title" className="about-heading">
                Our Products
              </h2>
            </div>
          </Reveal>

          <ul className="about-ranges__grid">
            {CATEGORIES.map((category, index) => {
              const photo = RANGE_PHOTOS[category.slug]
              return (
                <Reveal as="li" key={category.slug} delay={index * 90}>
                  <Link to={`/shop/${category.slug}`} className="about-range">
                    <span className="about-range__frame">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        width={720}
                        height={878}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="about-range__number">{category.number}</span>
                    <span className="about-range__name">{category.name}</span>
                    <span className="about-range__desc">{category.description}</span>
                    <span className="about-range__cta">
                      Explore
                      <ArrowIcon width={15} height={15} />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <section
        className="section section--aubergine on-dark about-marks"
        aria-labelledby="about-marks-title"
      >
        <div className="shell about-marks__inner">
          <Reveal className="about-marks__lead">
            <p className="about-eyebrow about-eyebrow--on-dark">Standards</p>
            <h2 id="about-marks-title" className="about-heading about-heading--on-dark">
              Every Mark on the Pack Is Defined.
            </h2>
            <p>
              Every batch runs through an FSSAI-certified process, and every mark on a pack has a
              written definition, published on the product page it belongs to. This is what each
              one means.
            </p>
            {/* The supplied mark is white on transparent — which is why it
                lives on the one dark band on the page. */}
            <img
              className="about-marks__fssai"
              src="/images/fssai-mark.webp"
              alt="FSSAI certification mark"
              width={600}
              height={291}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <Reveal as="dl" className="about-marks__list" delay={110}>
            {Object.entries(MARKS).map(([id, mark]) => (
              <div key={id}>
                <dt>{mark.label}</dt>
                <dd>{mark.definition}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <WhyTatvyra />
      <FinalCTA />
    </div>
  )
}
