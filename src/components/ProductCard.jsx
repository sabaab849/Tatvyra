import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategory } from '../data/catalogue'
import { useCart } from '../context/useCart'

/**
 * One card for every product surface on the site.
 *
 * Deliberately spare: no ratings, no review counts, no invented badges. The
 * only chip shown is the product's format, which is printed in the catalogue.
 * Where a product has no published price the card says so plainly instead of
 * showing a number.
 */
export default function ProductCard({ product, priority = false }) {
  const category = getCategory(product.category)
  const [size, setSize] = useState(product.sizes[0])
  const { addItem } = useCart()
  const hasSizeChoice = product.sizes.length > 1

  return (
    <article className="pcard">
      <Link to={`/product/${product.slug}`} className="pcard__media frame frame--4x5" tabIndex={-1} aria-hidden="true">
        <img
          src={product.image ?? category.image}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: product.focus, '--zoom': product.zoom }}
        />
        <span className="pcard__format">{product.format}</span>
      </Link>

      <div className="pcard__body">
        <p className="pcard__category">{category.name}</p>
        <h3 className="pcard__name">
          <Link to={`/product/${product.slug}`} className="pcard__link">
            {product.name}
          </Link>
        </h3>
        <p className="pcard__descriptor">{product.descriptor}</p>

        {hasSizeChoice ? (
          <div className="pcard__sizes" role="group" aria-label={`Size for ${product.name}`}>
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                className={`pcard__size ${size === option ? 'is-selected' : ''}`}
                aria-pressed={size === option}
                onClick={() => setSize(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <p className="pcard__size-single">{product.sizes[0]}</p>
        )}

        <div className="pcard__foot">
          <p className="pcard__price">
            {product.price ? (
              <span className="pcard__price-value">{product.price}</span>
            ) : (
              <span className="pcard__price-tbc">Price on request</span>
            )}
          </p>
          <div className="pcard__actions">
            <button
              type="button"
              className="pcard__add"
              onClick={() => addItem(product.slug, size)}
            >
              Add to cart
              <span className="visually-hidden"> — {product.name}, {size}</span>
            </button>
            <Link to={`/product/${product.slug}`} className="pcard__view">
              View product
              <span className="visually-hidden"> — {product.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
