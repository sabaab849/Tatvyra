import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'
import WhyTatvyra from '../sections/WhyTatvyra'
import FinalCTA from '../sections/FinalCTA'
import { BRAND, MARKS } from '../data/brand'
import { CATEGORIES, PRODUCTS } from '../data/catalogue'
import usePageMeta from '../lib/usePageMeta'

/**
 * The range photography for each category, from the purple-label shoot. The
 * catalogue's own category images predate it, so the About page maps its own
 * rather than changing what the shop and homepage draw from CATEGORIES.
 */
const RANGE_PHOTOS = {
  'nut-butters': {
    src: '/images/pillars/nut-butter.webp',
    alt: 'An open jar of Tatvyra organic premium peanut butter, a spoon lifting a ribbon of it beside the jar.',
  },
  moringa: {
    src: '/images/pillars/moringa.webp',
    alt: 'An amber bottle of Tatvyra moringa tablets on a wooden board, fresh moringa leaves around it.',
  },
  spirulina: {
    src: '/images/pillars/spirulina.webp',
    alt: 'An amber bottle of Tatvyra spirulina tablets on a wooden board beside a few loose tablets.',
  },
  'raw-honey': {
    src: '/images/pillars/honey.webp',
    alt: 'An open jar of Tatvyra multifloral honey with honeycomb above it and chamomile flowers around it.',
  },
}

/* Counted from the catalogue rather than typed in, so the hero never
   disagrees with the shop. */
const FACTS = [
  { term: 'Ranges', value: String(CATEGORIES.length).padStart(2, '0') },
  { term: 'Products', value: String(PRODUCTS.length) },
  { term: 'Certified process', value: 'FSSAI' },
]

export default function About() {
  usePageMeta({
    title: 'About — Tatvyra',
    description:
      'Tatvyra is the clean-label wellness range from Feynman Foodcraft Pvt. Ltd. — nut butters, moringa, spirulina and single-origin raw honey.',
  })

  return (
    <div className="about">
      {/* Its own photograph, not the homepage banner — sharing that made the
          two pages read as one. The copy comes first in the DOM, so the stacked
          layout on narrow screens reads headline before picture. */}
      <header className="about-hero" aria-labelledby="about-title">
        <div className="shell about-hero__inner">
          <div className="about-hero__copy">
            <p className="about-eyebrow">About Tatvyra</p>
            <h1 id="about-title" className="display about-hero__title">
              {BRAND.positioning}
            </h1>
            <p className="about-hero__lede">
              The wellness range from {BRAND.company} — four real foods, made to a clean-label
              standard.
            </p>
            <dl className="about-hero__facts">
              {FACTS.map((fact) => (
                <div key={fact.term}>
                  <dt>{fact.term}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-hero__media">
            <img
              className="about-hero__photo"
              src="/images/products/range-green.webp"
              alt="The Tatvyra moringa range — leaf powder, effervescent tablets, capsules and gummies — beside a bowl of moringa powder and fresh leaves."
              width={800}
              height={1000}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </header>

      <section className="about-intro" aria-labelledby="about-intro-title">
        <div className="shell">
          <Reveal className="about-intro__inner">
            <p className="about-eyebrow">Our approach</p>
            <h2 id="about-intro-title" className="about-intro__statement">
              A simpler approach to better ingredients.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="section about-story" aria-labelledby="about-story-title">
        <div className="shell about-story__inner">
          <Reveal className="about-story__media">
            <img
              className="about-story__photo about-story__photo--main"
              src="/images/products/range-nut-butters.webp"
              alt="Jars of Tatvyra nut butter, peanut and cashew among them, with a spoon pouring peanut butter into a bowl beside toast and whole nuts."
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
            {/* The moringa range opens the page now, so the second photograph
                here is the honey rather than the same shot twice. */}
            <img
              className="about-story__photo about-story__photo--inset"
              src="/images/categories/cat-wild-honey.webp"
              alt="Honey running from a piece of honeycomb into an open jar of Tatvyra wild forest honey."
              width={820}
              height={1160}
              loading="lazy"
              decoding="async"
            />
          </Reveal>

          <Reveal className="about-story__copy" delay={110}>
            <p className="about-eyebrow">Our story</p>
            <h2 id="about-story-title" className="about-heading">
              Made the plain way.
            </h2>
            <p>
              Tatvyra started with a simple frustration: the foods that have been part of Indian
              kitchens for generations — moringa, honey, ground nuts — kept turning up on shelves
              padded with things nobody asked for.
            </p>
            <p>
              So the nut butters are milled from the nut, without hydrogenated oils, added sugar or
              preservatives. Moringa leaf and spirulina go into powders, tablets, capsules and
              gummies, so the format can change without the ingredient changing. And the four raw
              honeys stay separate by origin, because a dense forest floral and a high-altitude
              Himalayan harvest are genuinely different things.
            </p>
            <dl className="about-story__facts">
              <div>
                <dt>Company</dt>
                <dd>{BRAND.company}</dd>
              </div>
              <div>
                <dt>Registered office</dt>
                <dd>{BRAND.contact.address.at(-1)}</dd>
              </div>
              <div>
                <dt>Write to us</dt>
                <dd>
                  <a href={`mailto:${BRAND.contact.emails[0]}`}>{BRAND.contact.emails[0]}</a>
                </dd>
              </div>
            </dl>
            <Button to="/shop" variant="outline">
              Shop the range
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section about-ranges" aria-labelledby="about-ranges-title">
        <div className="shell">
          <Reveal className="about-head">
            <p className="about-eyebrow">The ranges</p>
            <div className="about-head__row">
              <h2 id="about-ranges-title" className="about-heading">
                What we make.
              </h2>
              <p className="about-head__intro">
                Four ranges, in the formats that fit a routine — spreads, powders, tablets, capsules
                and gummies.
              </p>
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
              Every mark on the pack is defined.
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
