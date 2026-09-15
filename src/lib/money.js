/**
 * Money formatting for the storefront.
 *
 * Prices are held as whole rupees (integers) in src/data/catalogue.js — never
 * as pre-formatted strings — so arithmetic (quantity, subtotal, shipping) is
 * done on numbers and only the display is formatted here.
 *
 * en-IN gives the Indian grouping rather than the western one: 1,04,900 rather
 * than 104,900. Fraction digits are dropped because every price in the
 * catalogue is a whole rupee.
 */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** 1299 -> "₹1,299". Guards against a missing price rather than printing NaN. */
export function formatINR(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return null
  return inr.format(amount)
}
