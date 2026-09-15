import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import QuantitySelector from './QuantitySelector'
import { MARKS } from '../data/brand'
import { priceFor } from '../data/catalogue'
import { formatINR } from '../lib/money'
import { useCart } from '../context/useCart'

/**
 * Renders only the fields that actually exist for a product. Ingredients,
 * nutrition tables, dosage and certifications are not published in the supplied
 * catalogue, so those blocks state that plainly instead of being filled in.
 */
export default function ProductInfo({ product, category }) {
  const [size, setSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const price = formatINR(priceFor(product, size))
  const { addItem } = useCart()

  return (
    <div className="pinfo">
      <p className="pinfo__category">
        <Link to={`/shop/${category.slug}`}>{category.name}</Link>
        <span className="pinfo__sku">{product.sku}</span>
      </p>

      <h1 className="display display--m pinfo__name">{product.name}</h1>
      <p className="pinfo__descriptor">{product.descriptor}</p>

      <div className="pinfo__price">
        {price ? (
          <span className="pinfo__price-value">{price}</span>
        ) : (
          <>
            <span className="pinfo__price-tbc">Price on request</span>
            <span className="pinfo__price-note">
              Retail pricing for this SKU is not published yet.
            </span>
          </>
        )}
      </div>

      <div className="pinfo__buy">
        <fieldset className="pinfo__sizes">
          <legend className="pinfo__legend">
            {product.sizes.length > 1 ? 'Size' : 'Pack size'}
          </legend>
          {product.sizes.length > 1 ? (
            <div className="pinfo__size-set">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip chip--lg ${size === option ? 'is-selected' : ''}`}
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <p className="pinfo__size-single">{product.sizes[0]}</p>
          )}
        </fieldset>

        <div className="pinfo__actions">
          <QuantitySelector value={quantity} onChange={setQuantity} label={`Quantity of ${product.name}`} />
          <Button
            variant="primary"
            full
            onClick={() => addItem(product.slug, size, quantity)}
          >
            Add to cart
          </Button>
        </div>
      </div>

      <div className="pinfo__blocks">
        <section className="pinfo__block">
          <h2 className="pinfo__block-title">Key benefits</h2>
          <ul className="pinfo__benefits">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="pinfo__source">As stated in the Tatvyra product catalogue.</p>
        </section>

        <section className="pinfo__block">
          <h2 className="pinfo__block-title">On-pack marks</h2>
          <dl className="pinfo__marks">
            {product.marks.map((key) => (
              <div key={key}>
                <dt>{MARKS[key].label}</dt>
                <dd>{MARKS[key].definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="pinfo__block">
          <h2 className="pinfo__block-title">Ingredients & nutrition</h2>
          <p className="pinfo__pending">
            The full ingredient declaration and nutrition panel for this SKU are not published in
            the current catalogue. They will be listed here as soon as they are confirmed — until
            then, the on-pack label is the authority. Ask us at{' '}
            <a href="mailto:connect@feynmanfoodcraft.com">connect@feynmanfoodcraft.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
