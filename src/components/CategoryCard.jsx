import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import { productsByCategory } from '../data/catalogue'

export default function CategoryCard({ category, size = 'md' }) {
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
        <span className="ccard__number">{category.number}</span>
        <span className="ccard__name display display--s">{category.name}</span>
        <span className="ccard__teaser">{category.teaser}</span>
        <span className="ccard__more">
          <span>{count} products</span>
          <ArrowIcon width={18} height={18} />
        </span>
      </span>
    </Link>
  )
}
