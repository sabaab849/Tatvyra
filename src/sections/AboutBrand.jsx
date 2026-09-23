import { Link } from 'react-router-dom'
import { getProduct } from '../data/catalogue'

/**
 * "The brand" — the opening section of the About page.
 *
 * Every sentence of copy here is the brand's own text, kept whole and in order;
 * the only additions are the structural labels ("01 / The brand", "The story",
 * "The name"). The headline is lifted from that text rather than written.
 * "The name" closes the section as a ruled row under the photographs.
 *
 * The product lists under the photographs are the catalogue's own products,
 * looked up by slug so a renamed or removed SKU drops out instead of linking
 * to nothing. `label` shortens a name only where the column heading already
 * says the range.
 */
const RANGES = [
  {
    key: 'moringa',
    name: 'Moringa',
    tone: 'purple',
    to: '/shop/moringa',
    image: '/images/about/brand-moringa.webp',
    alt: 'A mound of fine green moringa leaf powder among fresh moringa leaves.',
    items: [
      { slug: 'moringa-leaf-powder', label: 'Leaf Powder' },
      { slug: 'moringa-tablets', label: 'Tablets' },
      { slug: 'moringa-capsules', label: 'Capsules' },
      { slug: 'moringa-gummies', label: 'Gummies' },
    ],
  },
  {
    key: 'nut-butters',
    name: 'Nut Butters',
    tone: 'accent',
    to: '/shop/nut-butters',
    image: '/images/about/brand-nut-butters.webp',
    alt: 'A glass jar of creamy nut butter with a spoon standing in it, cashews scattered around the base.',
    items: [
      { slug: 'natural-peanut-butter-creamy', label: 'Peanut, Creamy' },
      { slug: 'chocolate-peanut-butter', label: 'Chocolate Peanut, Cream & Crunchy' },
      { slug: 'almond-butter-creamy', label: 'Almond, Creamy' },
      { slug: 'cashew-butter-creamy', label: 'Cashew, Creamy' },
    ],
  },
  {
    key: 'spirulina',
    name: 'Spirulina',
    tone: 'purple',
    to: '/shop/spirulina',
    image: '/images/about/brand-spirulina.webp',
    alt: 'A ceramic bowl heaped with deep green spirulina powder among long green leaves.',
    items: [
      { slug: 'spirulina-powder', label: 'Powder' },
      { slug: 'spirulina-tablets', label: 'Tablets' },
      { slug: 'spirulina-capsules', label: 'Capsules' },
    ],
  },
  {
    key: 'raw-honey',
    name: 'Raw Honey',
    tone: 'accent',
    to: '/shop/raw-honey',
    image: '/images/about/brand-raw-honey.webp',
    alt: 'Honey drizzling from a wooden dipper into a glass jar of raw honey.',
    items: [
      { slug: 'wild-forest-honey', label: 'Wild Forest' },
      { slug: 'multifloral-honey', label: 'Multifloral' },
      { slug: 'himalayan-honey', label: 'Himalayan' },
      { slug: 'kashmiri-white-acacia-honey', label: 'Kashmiri White Acacia' },
    ],
  },
  {
    key: 'acv',
    name: 'ACV / Effervescent',
    tone: 'purple',
    to: '/product/moringa-acv-effervescent-tablets',
    image: '/images/about/brand-acv.webp',
    alt: 'A glass of apple cider vinegar beside a red apple.',
    items: [{ slug: 'moringa-acv-effervescent-tablets', label: 'ACV Moringa Effervescent' }],
  },
]

export default function AboutBrand() {
  return (
    <section className="about-brand" aria-labelledby="about-title">
      <div className="shell">
        <div className="about-brand__head">
          <div className="about-brand__lead">
            <p className="about-brand__index">
              {/* One inline run: as bare flex children the label would lose the
                  space before the slash. */}
              <span>
                <span className="about-brand__index-no">01</span> / The brand
              </span>
            </p>
            <h1 id="about-title" className="display about-brand__title">
              The essence of vitality, distilled from nature.
            </h1>
          </div>
          <p className="about-brand__intro">
            Tatvyra is a health &amp; wellness company committed to delivering premium-quality
            health and wellness supplements, which are healthy nutraceuticals derived from
            moringa, spirulina &amp; honey, along with top-notch quality nut butter derived from
            peanuts, almonds, cashews, etc.
          </p>
        </div>

        <div className="about-brand__body">
          <ul className="about-brand__ranges">
            {RANGES.map((range) => {
              const products = range.items.filter((item) => getProduct(item.slug))
              return (
                <li key={range.key} className="about-brand__range">
                  <div className="about-brand__frame">
                    <img src={range.image} alt={range.alt} width={190} height={431} decoding="async" />
                  </div>
                  <p className={`about-brand__name about-brand__name--${range.tone}`}>
                    <Link to={range.to}>{range.name}</Link>
                  </p>
                  <ul className="about-brand__products">
                    {products.map((item) => (
                      <li key={item.slug}>
                        <Link to={`/product/${item.slug}`}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>

          <div className="about-brand__story">
            <p className="about-brand__kicker">The story</p>
            <h2 className="about-brand__story-title">
              Tatvyra is the wellness-nutrition brand of Feynman Foodcraft Pvt. Ltd.
            </h2>
            <p>
              Built by founders who set out to fix a simple problem: India’s healthiest
              traditions, moringa, spirulina, raw honey, and cold-pressed nut butters, were
              scattered across unbranded, inconsistent, low-trust supply chains.
            </p>
            <p>
              We build each product the way a chemist and a grandmother would agree on: rooted in
              natural, superior quality and traditional use; validated by clean-label science;
              and manufactured to consistent, testable standards, so a shopper can build an
              entire daily wellness ritual under one trusted name.
            </p>
          </div>
        </div>

        {/* A ruled row of its own under the photographs, rather than the foot of
            the story column: there it ran the narrow column far past the product
            lists and left the space under the photographs empty. */}
        <div className="about-brand__naming">
          <p className="about-brand__note">The name</p>
          <p>
            “Tatvyra” draws from the Sanskrit roots “tatva” (essence) and “vyra”: the essence of
            vitality, distilled from nature.
          </p>
          <p>
            From a single spoon of superfood powder to a jar of nut butter on the breakfast table,
            Tatvyra is designed to be the everyday nutrition brand for health-conscious Indian
            households.
          </p>
        </div>
      </div>
    </section>
  )
}
