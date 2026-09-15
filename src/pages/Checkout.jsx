import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import CheckoutSteps from '../components/CheckoutSteps'
import OrderSummary from '../components/OrderSummary'
import { useCart } from '../context/useCart'
import { getDraft, saveDraft } from '../lib/checkoutDraft'
import { toOrderLines } from '../lib/cartLines'
import usePageMeta from '../lib/usePageMeta'

/** Field name -> validator. Returns a message, or null when the value is fine. */
const RULES = {
  name: (v) => (v.trim().length >= 2 ? null : 'Enter the name for the delivery.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'Enter a valid email address.'),
  phone: (v) => (v.replace(/\D/g, '').length === 10 ? null : 'Enter a 10-digit mobile number.'),
  address: (v) => (v.trim().length >= 6 ? null : 'Enter the street address.'),
  city: (v) => (v.trim().length >= 2 ? null : 'Enter the town or city.'),
  state: (v) => (v.trim().length >= 2 ? null : 'Enter the state.'),
  pin: (v) => (/^\d{6}$/.test(v.trim()) ? null : 'Enter a 6-digit PIN code.'),
}

const EMPTY = { name: '', email: '', phone: '', address: '', address2: '', city: '', state: '', pin: '' }

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, delivery, total } = useCart()
  const [values, setValues] = useState(() => ({ ...EMPTY, ...(getDraft() ?? {}) }))
  const [errors, setErrors] = useState({})

  usePageMeta({
    title: 'Checkout — Tatvyra',
    description: 'Delivery details for your Tatvyra order.',
  })

  const set = (field) => (event) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [field]: value }))
    // Clear the message as soon as the field is corrected, not on the next submit.
    setErrors((prev) => (prev[field] && !RULES[field]?.(value) ? { ...prev, [field]: null } : prev))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const found = {}
    for (const [field, rule] of Object.entries(RULES)) {
      const message = rule(values[field] ?? '')
      if (message) found[field] = message
    }
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.querySelector(`[aria-invalid="true"]`)?.focus()
      return
    }
    saveDraft(values)
    navigate('/checkout/payment')
  }

  if (items.length === 0) {
    return (
      <div className="checkout">
        <header className="page-head">
          <div className="shell">
            <p className="eyebrow">Checkout</p>
            <h1 className="display display--l">Your cart is empty.</h1>
            <p className="lede page-head__lede">
              There is nothing to check out yet. Have a look at the range and add something first.
            </p>
            <p className="checkout__empty-action">
              <Button to="/shop" variant="primary">Browse the range</Button>
            </p>
          </div>
        </header>
      </div>
    )
  }

  const field = (name, label, extra = {}) => (
    <div className={`field ${extra.half ? 'field--half' : ''}`}>
      <label htmlFor={`co-${name}`}>{label}</label>
      <input
        id={`co-${name}`}
        name={name}
        type={extra.type ?? 'text'}
        inputMode={extra.inputMode}
        autoComplete={extra.autoComplete}
        value={values[name]}
        onChange={set(name)}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `co-${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="field__error" id={`co-${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="checkout">
      <header className="page-head checkout__head">
        <div className="shell">
          <p className="eyebrow">Checkout</p>
          <h1 className="display display--l">Where is it going?</h1>
          <CheckoutSteps current="details" />
        </div>
      </header>

      <div className="shell checkout__body">
        <form className="checkout__form" onSubmit={onSubmit} noValidate>
          <h2 className="checkout__subtitle">Delivery details</h2>

          {field('name', 'Full name', { autoComplete: 'name' })}
          <div className="checkout__row">
            {field('email', 'Email', { type: 'email', autoComplete: 'email', half: true })}
            {field('phone', 'Mobile', { inputMode: 'numeric', autoComplete: 'tel', half: true })}
          </div>
          {field('address', 'Address', { autoComplete: 'address-line1' })}
          {field('address2', 'Apartment, floor (optional)', { autoComplete: 'address-line2' })}
          <div className="checkout__row">
            {field('city', 'Town or city', { autoComplete: 'address-level2', half: true })}
            {field('state', 'State', { autoComplete: 'address-level1', half: true })}
          </div>
          {field('pin', 'PIN code', { inputMode: 'numeric', autoComplete: 'postal-code', half: true })}

          <div className="checkout__actions">
            <Button type="submit" variant="primary">Continue to payment</Button>
            <Link to="/shop" className="checkout__back">Keep shopping</Link>
          </div>
        </form>

        <div className="checkout__aside">
          <OrderSummary
            lines={toOrderLines(items)}
            subtotal={subtotal}
            delivery={delivery}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}
