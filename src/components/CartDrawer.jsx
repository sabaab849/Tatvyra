import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getCategory } from '../data/catalogue'
import { useOverlay } from '../lib/useOverlay'
import { CloseIcon } from './Icons'
import Button from './Button'
import QuantitySelector from './QuantitySelector'

export default function CartDrawer() {
  const { items, count, isOpen, closeCart, setQuantity, removeItem } = useCart()
  const panelRef = useRef(null)
  useOverlay(isOpen, closeCart, panelRef)

  return (
    <div className={`drawer drawer--right ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className="drawer__scrim"
        onClick={closeCart}
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close cart"
      />
      <div
        className="drawer__panel drawer__panel--cart"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        ref={panelRef}
      >
        <div className="drawer__head">
          <h2 className="cart__title">
            Your cart <span className="cart__count">({count})</span>
          </h2>
          <button type="button" className="drawer__close" data-autofocus onClick={closeCart} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p>Your cart is empty.</p>
            <Button to="/shop" variant="outline" onClick={closeCart}>
              Browse the range
            </Button>
          </div>
        ) : (
          <>
            <ul className="cart__list">
              {items.map((line) => {
                const category = getCategory(line.product.category)
                return (
                  <li key={line.id} className="cart__line">
                    <Link
                      to={`/product/${line.product.slug}`}
                      className="cart__thumb frame"
                      onClick={closeCart}
                      tabIndex={isOpen ? 0 : -1}
                    >
                      <img src={category.image} alt="" loading="lazy" />
                    </Link>
                    <div className="cart__line-body">
                      <Link
                        to={`/product/${line.product.slug}`}
                        className="cart__line-name"
                        onClick={closeCart}
                        tabIndex={isOpen ? 0 : -1}
                      >
                        {line.product.name}
                      </Link>
                      {line.size && <p className="cart__line-meta">{line.size}</p>}
                      <div className="cart__line-controls">
                        <QuantitySelector
                          value={line.quantity}
                          onChange={(q) => setQuantity(line.id, q)}
                          label={`Quantity for ${line.product.name}`}
                        />
                        <button
                          type="button"
                          className="cart__remove"
                          onClick={() => removeItem(line.id)}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="cart__foot">
              {/* No prices are published for these SKUs and no payment backend is
                  connected, so the drawer routes to a real enquiry rather than
                  showing a total or a checkout that does not exist. */}
              <p className="cart__note">
                Pricing is confirmed per order. Send your list through and the team will come
                back with sizes, availability and cost.
              </p>
              <Button to="/contact" variant="primary" full onClick={closeCart}>
                Request pricing
              </Button>
              <button type="button" className="cart__continue" onClick={closeCart}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
