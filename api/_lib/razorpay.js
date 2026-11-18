import { getProduct, PRODUCTS } from '../../src/data/catalogue.js'
import { razorpayKeys } from './http.js'

/**
 * Server-side Razorpay helpers shared by the payment functions.
 */

/** Calls the Razorpay REST API with the server's keys. Throws on a non-2xx. */
export async function razorpay(path, { method = 'GET', body } = {}) {
  const keys = razorpayKeys()
  if (!keys) throw new Error('Razorpay keys are not configured')
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${keys.keyId}:${keys.keySecret}`).toString('base64')}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(`Razorpay ${method} ${path} failed: ${response.status} ${data?.error?.description ?? ''}`)
    error.status = response.status
    error.data = data
    throw error
  }
  return data
}

/*
 * The basket travels on the Razorpay order as compact notes, so the server can
 * rebuild exactly what was paid for without trusting the browser:
 *   "TAT-NB01/0/2,TAT-HN01/1/1"  ->  sku / index into product.sizes / quantity
 * A note holds 256 characters, so the list is split across `cart` and `cart2`
 * (about 35 lines in all, well above the 20-line basket cap).
 */
const NOTE_MAX = 256

export function encodeCart(items) {
  const parts = items.map((i) => {
    const sizeIndex = Math.max(0, (i.product.sizes ?? []).indexOf(i.size))
    return `${i.product.sku}/${sizeIndex}/${i.quantity}`
  })
  const notes = ['', '']
  for (const part of parts) {
    const slot = notes[0].length + part.length + 1 <= NOTE_MAX ? 0 : 1
    notes[slot] = notes[slot] ? `${notes[slot]},${part}` : part
  }
  if (notes[1].length > NOTE_MAX) throw new Error('basket too large to record')
  return { cart: notes[0], cart2: notes[1] }
}

/** The reverse of encodeCart: [{ product, size, quantity }]. Unknown SKUs are dropped. */
export function decodeCart(notes = {}) {
  return [notes.cart, notes.cart2]
    .filter(Boolean)
    .join(',')
    .split(',')
    .filter(Boolean)
    .map((part) => {
      const [sku, sizeIndex, quantity] = part.split('/')
      const product = PRODUCTS.find((p) => p.sku === sku)
      if (!product) return null
      const size = product.sizes?.[Number(sizeIndex)] ?? null
      return { slug: product.slug, product: getProduct(product.slug), size, quantity: Number(quantity) }
    })
    .filter((line) => line && line.quantity > 0)
}
