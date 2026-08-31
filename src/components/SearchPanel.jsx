import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CloseIcon, SearchIcon } from './Icons'
import { searchProducts, getCategory, CATEGORIES } from '../data/catalogue'
import { useOverlay } from '../lib/useOverlay'

export default function SearchPanel({ open, onClose }) {
  const panelRef = useRef(null)
  const [query, setQuery] = useState('')
  const [wasOpen, setWasOpen] = useState(open)
  useOverlay(open, onClose, panelRef)

  // Clear the query as the panel closes, so it reopens empty.
  if (wasOpen !== open) {
    setWasOpen(open)
    if (!open) setQuery('')
  }

  const results = searchProducts(query).slice(0, 6)

  return (
    <div className={`overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="overlay__scrim"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close search"
      />
      <div
        className="overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        ref={panelRef}
      >
        <div className="overlay__inner shell">
          <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="visually-hidden" htmlFor="site-search">
              Search Tatvyra products
            </label>
            <SearchIcon className="search__icon" width={22} height={22} />
            <input
              id="site-search"
              type="search"
              className="search__input"
              placeholder="Search moringa, honey, nut butter…"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-autofocus
              tabIndex={open ? 0 : -1}
            />
            <button type="button" className="search__close" onClick={onClose} aria-label="Close search">
              <CloseIcon />
            </button>
          </form>

          <div className="search__results" aria-live="polite">
            {query.trim() === '' ? (
              <div className="search__suggest">
                <p className="eyebrow">Browse the range</p>
                <ul>
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <Link to={`/shop/${category.slug}`} tabIndex={open ? 0 : -1}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : results.length === 0 ? (
              <p className="search__empty">
                Nothing matches “{query}”. Try a category name, or{' '}
                <Link to="/shop" tabIndex={open ? 0 : -1}>
                  browse everything
                </Link>
                .
              </p>
            ) : (
              <ul className="search__list">
                {results.map((product) => {
                  const category = getCategory(product.category)
                  // "Raw Honey · Raw honey" reads as a mistake; collapse it.
                  const meta =
                    product.format.toLowerCase() === category.name.toLowerCase()
                      ? category.name
                      : `${category.name} · ${product.format}`

                  return (
                    <li key={product.slug}>
                      <Link
                        to={`/product/${product.slug}`}
                        className="search__result"
                        tabIndex={open ? 0 : -1}
                      >
                        <span className="search__result-name">{product.name}</span>
                        <span className="search__result-meta">{meta}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
