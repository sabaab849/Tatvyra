import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import QuantitySelector from './QuantitySelector'
import { MARKS } from '../data/brand'
import { benefitsFor, priceFor } from '../data/catalogue'
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
  const benefits = benefitsFor(product)
  const { addItem } = useCart()
  const descRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [clamped, setClamped] = useState(false)

  // The description shows three lines; the toggle appears only when there is
  // more than that to show.
  useEffect(() => {
    const el = descRef.current
    if (!el) return undefined
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [product.slug])

  // A new product starts closed.
  const [lastSlug, setLastSlug] = useState(product.slug)
  if (lastSlug !== product.slug) {
    setLastSlug(product.slug)
    setOpen(false)
  }

  return (
    <div className="pinfo">
      <p className="pinfo__category">
        <Link to={`/shop/${category.slug}`}>{category.name}</Link>
      </p>

      <h1 className="display display--m pinfo__name">{product.name}</h1>
      {/* A full product description, where one is supplied, takes the short
          descriptor's place; cards keep the short line. */}
      {product.description ? (
        <div className="pinfo__desc">
          <p
            id="pinfo-desc"
            ref={descRef}
            className={`pinfo__descriptor pinfo__descriptor--long${open ? '' : ' is-clamped'}`}
          >
            {product.description}
          </p>
          {(clamped || open) && (
            <button
              type="button"
              className="pinfo__more"
              aria-expanded={open}
              aria-controls="pinfo-desc"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>
      ) : (
        <p className="pinfo__descriptor">{product.description ?? product.descriptor}</p>
      )}

      <div className="pinfo__price">
        {price ? (
          <>
            <p className="pinfo__price-now">
              <span className="pinfo__price-value">{price}</span>
            </p>
            <span className="pinfo__price-note">MRP, inclusive of all taxes.</span>
            {/* A pack the supplied price sheet does not carry: the figure is
                ours, so the page says so rather than letting it read as MRP. */}
            {product.priceTbc && (
              <span className="pinfo__price-note">
                Indicative price: Tatvyra&rsquo;s MRP for this pack is still to be confirmed.
              </span>
            )}
          </>
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
          <h2 className="pinfo__block-title">Key Benefits</h2>
          <ul className="pinfo__benefits">
            {benefits.items.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>

        {/* What this SKU's label says and does not say, where that copy was
            supplied — the same pair layout as the on-pack marks below. */}
        {product.claims && (
          <section className="pinfo__block">
            <h2 className="pinfo__block-title">What Is Inside</h2>
            <dl className="pinfo__marks">
              {product.claims.map((claim) => (
                <div key={claim.label}>
                  <dt>{claim.label}</dt>
                  <dd>{claim.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* The range's own lines about its ingredient, where the range has
            them — the same block and list as the benefits above. */}
        {category.highlights && (
          <section className="pinfo__block">
            <h2 className="pinfo__block-title">{category.highlights.title}</h2>
            <ul className="pinfo__benefits">
              {category.highlights.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {product.marks.length > 0 && (
        <section className="pinfo__block">
          <h2 className="pinfo__block-title">On-Pack Marks</h2>
          <dl className="pinfo__marks">
            {product.marks.map((key) => (
              <div key={key}>
                <dt>{MARKS[key].label}</dt>
                <dd>{MARKS[key].pdp ?? MARKS[key].definition}</dd>
              </div>
            ))}
          </dl>
        </section>
        )}
      </div>
    </div>
  )
}
