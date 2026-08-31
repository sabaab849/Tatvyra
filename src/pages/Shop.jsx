import { useMemo, useState } from 'react'
import { NavLink, useParams, Navigate } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import Reveal from '../components/Reveal'
import { CATEGORIES, PRODUCTS, getCategory, productsByCategory } from '../data/catalogue'
import usePageMeta from '../lib/usePageMeta'

const FORMAT_ORDER = ['Spread', 'Powder', 'Tablets', 'Capsules', 'Effervescent', 'Gummies', 'Raw honey']

export default function Shop() {
  const { categorySlug } = useParams()
  const category = categorySlug ? getCategory(categorySlug) : null
  const [format, setFormat] = useState('all')

  const products = useMemo(
    () => (category ? productsByCategory(category.slug) : PRODUCTS),
    [category],
  )

  const formats = useMemo(() => {
    const present = new Set(products.map((p) => p.format))
    return FORMAT_ORDER.filter((f) => present.has(f))
  }, [products])

  const visible = format === 'all' ? products : products.filter((p) => p.format === format)

  usePageMeta({
    title: category
      ? `${category.name} — Tatvyra`
      : 'Shop all — Tatvyra Wellness Essentials',
    description: category ? category.description : 'The full Tatvyra range across four ranges.',
  })

  if (categorySlug && !category) return <Navigate to="/shop" replace />

  return (
    <div className="shop">
      <header className="shop__head">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{category ? `${category.number} — Range` : 'Wellness Essentials'}</p>
            <h1 className="display display--l shop__title">
              {category ? category.name : 'The full range'}
            </h1>
            <p className="lede shop__intro">
              {category
                ? category.description
                : 'Sixteen products across nut butters, moringa, spirulina and raw honey.'}
            </p>
          </Reveal>
        </div>
      </header>

      <nav className="shop__ranges" aria-label="Product ranges">
        <div className="shell">
          <ul className="shop__range-list">
            <li>
              <NavLink to="/shop" end className={({ isActive }) => (isActive ? 'is-active' : '')}>
                All
              </NavLink>
            </li>
            {CATEGORIES.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={`/shop/${item.slug}`}
                  className={({ isActive }) => (isActive ? 'is-active' : '')}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="shell shop__body">
        {formats.length > 1 && (
          <div className="shop__filters">
            <span className="shop__filter-label" id="format-label">Format</span>
            <div className="shop__filter-set" role="group" aria-labelledby="format-label">
              <button
                type="button"
                className={`chip ${format === 'all' ? 'is-selected' : ''}`}
                aria-pressed={format === 'all'}
                onClick={() => setFormat('all')}
              >
                All
              </button>
              {formats.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip ${format === option ? 'is-selected' : ''}`}
                  aria-pressed={format === option}
                  onClick={() => setFormat(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="shop__count" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        )}

        <ProductGrid products={visible} columns={category ? 3 : 4} priorityCount={4} />
      </div>
    </div>
  )
}
