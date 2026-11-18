import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { ArrowIcon } from '../components/Icons'

/**
 * The category section from the Figma refresh (node 71:22).
 *
 * The design groups the four catalogue ranges into three cards — moringa and
 * spirulina are shown together as "Superfoods", which has no route of its own,
 * so that card goes to the full shop.
 */
const CARDS = [
  {
    slug: 'superfoods',
    eyebrow: 'Organic Powders',
    title: 'Superfoods',
    to: '/shop',
    image: '/images/products/packs/moringa-leaf-powder-1.webp',
    alt: 'A pouch of Tatvyra Natural Moringa Powder on a table with nuts, a glass of water and fresh leaves.',
  },
  {
    slug: 'nut-butters',
    eyebrow: 'Rich & Creamy',
    title: 'Nut Butters',
    to: '/shop/nut-butters',
    image: '/images/products/packs/natural-peanut-butter-creamy-2.webp',
    alt: 'A spoon lifting creamy peanut butter from an open jar of Tatvyra Natural Peanut Butter Creamy, its lid beside it.',
  },
  {
    slug: 'wild-honey',
    eyebrow: 'Pure & Raw',
    title: 'Wild Honey',
    to: '/shop/raw-honey',
    image: '/images/products/packs/wild-forest-honey-2.webp',
    alt: 'A wooden dipper drizzling honey into an open jar of Tatvyra Wild Forest Honey, its lid beside it.',
  },
]

export default function ShopByCategory() {
  return (
    <section className="section categories" aria-labelledby="categories-title">
      <div className="shell">
        <div className="categories__header">
          <p className="categories__eyebrow">Organic Curation</p>
          <div className="categories__title-row">
            <h2 id="categories-title" className="categories__title">
              Explore Our Products
            </h2>
          </div>
        </div>

        <ul className="categories__grid">
          {CARDS.map((card, index) => (
            <Reveal as="li" key={card.slug} delay={index * 80} className="categories__item">
              <Link to={card.to} className="catcard">
                <img className="catcard__img" src={card.image} alt={card.alt} loading="lazy" decoding="async" />
                <span className="catcard__scrim" aria-hidden="true" />
                <span className="catcard__body">
                  <span className="catcard__eyebrow">{card.eyebrow}</span>
                  <span className="catcard__name">{card.title}</span>
                  <span className="catcard__cta">
                    Explore
                    <ArrowIcon width={16} height={16} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
