import { quoteLines } from '../../src/lib/pricing.js'
import { razorpayKeys, readJson, send } from '../_lib/http.js'
import { encodeCart, razorpay } from '../_lib/razorpay.js'

/**
 * POST /api/razorpay/order
 *
 * Creates a Razorpay order for the basket. The amount is worked out HERE from
 * slug, size and quantity — any price the browser might send is ignored — so a
 * customer cannot change what they are charged.
 *
 * Body: { reference, lines: [{ slug, size, quantity }], customer: { name,
 *         email, phone, address, address2, city, state, pin } }
 * Reply: { keyId, orderId, amount, currency }   (amount in paise)
 *
 * There is no order database, so the order reference, delivery address and the
 * basket are written into the Razorpay order's notes. The dashboard shows them
 * for every paid order, and api/_lib/fulfil.js reads them back to create the
 * Shiprocket order — Razorpay's record, not the browser, is the source of truth.
 */

const MAX_QTY = 50
const MAX_LINES = 20

/** Razorpay allows 15 notes of up to 256 characters each; 13 are used here
    and fulfil.js adds a 14th (`shiprocket`) once the order is sent. */
const note = (value) => String(value ?? '').trim().slice(0, 256)

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })

  const keys = razorpayKeys()
  if (!keys) return send(res, 500, { error: 'Payments are not configured on the server.' })

  let body
  try {
    body = await readJson(req)
  } catch {
    return send(res, 400, { error: 'Invalid request.' })
  }

  const reference = typeof body.reference === 'string' ? body.reference.slice(0, 40) : ''
  const rawLines = Array.isArray(body.lines) ? body.lines.slice(0, MAX_LINES) : []
  const lines = rawLines
    .map((l) => ({
      slug: typeof l?.slug === 'string' ? l.slug : '',
      size: typeof l?.size === 'string' ? l.size : null,
      quantity: Math.floor(Number(l?.quantity)),
    }))
    .filter((l) => l.slug && l.quantity >= 1 && l.quantity <= MAX_QTY)

  const quote = quoteLines(lines)
  if (!reference || quote.items.length === 0 || quote.items.some((i) => i.unitPrice <= 0)) {
    return send(res, 400, { error: 'That basket could not be priced. Please refresh and try again.' })
  }

  const amount = Math.round(quote.total * 100)
  const c = body.customer ?? {}
  const items = quote.items
    .map((i) => `${i.quantity} x ${i.product.name}${i.size ? ` (${i.size})` : ''}`)
    .join('; ')

  let cart
  try {
    cart = encodeCart(quote.items)
  } catch {
    return send(res, 400, { error: 'That basket is too large for one order. Please split it.' })
  }

  const allNotes = {
    reference: note(reference),
    name: note(c.name),
    phone: note(c.phone),
    email: note(c.email),
    address: note(c.address),
    address2: note(c.address2),
    city: note(c.city),
    state: note(c.state),
    pin: note(c.pin),
    items: note(items),
    total: note(quote.total.toFixed(2)),
    cart: cart.cart,
    cart2: cart.cart2,
  }
  const notes = Object.fromEntries(Object.entries(allNotes).filter(([, v]) => v))

  try {
    const data = await razorpay('/orders', {
      method: 'POST',
      body: { amount, currency: 'INR', receipt: reference, notes },
    })
    return send(res, 200, {
      keyId: keys.keyId,
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
    })
  } catch (error) {
    console.error('Razorpay order error', error.message)
    return send(res, 502, { error: 'The payment service could not start this payment.' })
  }
}
