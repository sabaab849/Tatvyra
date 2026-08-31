import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'
import { productsByCategory } from '../data/catalogue'

/**
 * The long-form feature block used once per range on the homepage and again at
 * the top of each category page. Alternating image side gives the page its
 * asymmetry without needing a new layout each time.
 */
export default function CategoryFeature({ category, reversed = false, headline, body, tone = 'light' }) {
  const products = productsByCategory(category.slug)

  return (
    <section
      className={`cfeature cfeature--${tone} ${reversed ? 'cfeature--reversed' : ''}`}
      aria-labelledby={`cfeature-${category.slug}`}
    >
      <div className="shell cfeature__inner">
        <Reveal className="cfeature__media">
          <div className="frame frame--4x3">
            <img
              src={category.image}
              alt={category.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal className="cfeature__copy" delay={100}>
          <p className={`eyebrow ${tone === 'dark' ? 'eyebrow--on-dark' : ''}`}>
            {category.number} — {category.name}
          </p>
          <h2 id={`cfeature-${category.slug}`} className="display display--m cfeature__title">
            {headline}
          </h2>
          <p className="cfeature__body">{body ?? category.description}</p>

          <ul className="cfeature__products">
            {products.map((product) => (
              <li key={product.slug}>
                <Link to={`/product/${product.slug}`} className="cfeature__product">
                  <span className="cfeature__product-name">{product.name}</span>
                  <span className="cfeature__product-meta">{product.sizes.join(' · ')}</span>
                  <ArrowIcon width={18} height={18} />
                </Link>
              </li>
            ))}
          </ul>

          <Button to={`/shop/${category.slug}`} variant={tone === 'dark' ? 'on-dark' : 'outline'}>
            Shop {category.name}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
