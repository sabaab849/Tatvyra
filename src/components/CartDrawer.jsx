import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getCategory } from '../data/catalogue'
import { formatINR } from '../lib/money'
import { useOverlay } from '../lib/useOverlay'
import { CloseIcon } from './Icons'
import Button from './Button'
import QuantitySelector from './QuantitySelector'

export default function CartDrawer() {
  const {
    items,
    count,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
    subtotal,
    delivery,
    total,
    freeDeliveryFrom,
  } = useCart()
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
                      <img src={line.product.image ?? category.image} alt="" loading="lazy" />
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
                      <p className="cart__line-price">
                        <span>
                          {formatINR(line.unitPrice)}
                          <span aria-hidden="true"> × {line.quantity}</span>
                          <span className="visually-hidden"> each, quantity {line.quantity}</span>
                        </span>
                        <span className="cart__line-total">{formatINR(line.lineTotal)}</span>
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="cart__foot">
              <dl className="cart__summary">
                <div className="cart__summary-row">
                  <dt>Subtotal</dt>
                  <dd>{formatINR(subtotal)}</dd>
                </div>
                <div className="cart__summary-row">
                  <dt>Delivery</dt>
                  <dd>{delivery === 0 ? 'Free' : formatINR(delivery)}</dd>
                </div>
                <div className="cart__summary-row cart__summary-row--total">
                  <dt>Total</dt>
                  <dd>{formatINR(total)}</dd>
                </div>
              </dl>
              {/* Prices are placeholders and the payment step runs against a
                  stand-in provider until the client confirms a real one. */}
              <p className="cart__note">
                {delivery > 0 && `Free delivery over ${formatINR(freeDeliveryFrom)}. `}
                Placeholder pricing — no live payment provider is connected yet.
              </p>
              <Button to="/checkout" variant="primary" full onClick={closeCart}>
                Checkout
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
