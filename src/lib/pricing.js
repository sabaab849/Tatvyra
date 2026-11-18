import { getProduct, priceFor } from '../data/catalogue.js'

/**
 * What a basket costs — the one place the arithmetic lives.
 *
 * The cart drawer, the checkout and the payment server (api/razorpay/order.js)
 * all price through quoteLines(), so the amount Razorpay is asked to charge can
 * never drift from the amount the customer was shown. The server deliberately
 * ignores any price the browser sends and re-quotes from slug, size and
 * quantity alone.
 *
 * The total is the MRP of each line times its quantity, summed: MRPs include
 * GST, so nothing — tax, markup or delivery — is added on top.
 *
 * This file must stay free of React and browser APIs: it runs on the server.
 */

/** Rupees to the paise, so float sums never reach the gateway as 547.9999. */
const toPaise = (rupees) => Math.round(rupees * 100)

/**
 * lines: [{ slug, size, quantity }]
 * Returns the priced items (unknown products dropped) and the totals in rupees.
 */
export function quoteLines(lines) {
  const items = (Array.isArray(lines) ? lines : [])
    .map((line) => {
      const product = getProduct(line?.slug)
      if (!product) return null
      /* Fall back to nought rather than null, so one unpriced SKU cannot turn
         the whole basket into NaN. */
      const unitPrice = priceFor(product, line.size) ?? 0
      return { ...line, product, unitPrice, lineTotal: unitPrice * line.quantity }
    })
    .filter(Boolean)

  const subtotal = toPaise(items.reduce((sum, line) => sum + line.lineTotal, 0)) / 100

  return { items, subtotal, total: subtotal }
}
