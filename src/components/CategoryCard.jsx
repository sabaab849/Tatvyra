import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import { productsByCategory } from '../data/catalogue'

export default function CategoryCard({ category, size = 'lg' }) {
  const count = productsByCategory(category.slug).length

  return (
    <Link
      to={`/shop/${category.slug}`}
      className={`ccard ccard--${size} ccard--${category.accent}`}
    >
      <span className="ccard__media frame">
        <img src={category.image} alt={category.imageAlt} loading="lazy" decoding="async" />
      </span>
      <span className="ccard__body">
        <span className="ccard__number" aria-hidden="true">{category.number}</span>
        <span className="ccard__name display display--m">{category.name}</span>
        <span className="ccard__teaser">{category.teaser}</span>
        <span className="ccard__more">
          <span>{count} products</span>
          <ArrowIcon width={22} height={22} />
        </span>
      </span>
    </Link>
  )
}
