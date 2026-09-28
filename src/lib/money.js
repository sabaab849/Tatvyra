/**
 * Money formatting for the storefront.
 *
 * Prices are held as rupees (numbers) in src/data/catalogue.js — never as
 * pre-formatted strings — so arithmetic (quantity, subtotal, shipping) is done
 * on numbers and only the display is formatted here.
 *
 * en-IN gives the Indian grouping rather than the western one: 1,04,900 rather
 * than 104,900. Some MRPs carry paise (₹556.60) and most do not (₹330), so a
 * whole rupee prints without decimals and anything else prints with both —
 * never "₹556.6", which would read as a typo on a price tag.
 */
const whole = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const paise = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 1299 -> "₹1,299", 556.6 -> "₹556.60". Guards against a missing price
    rather than printing NaN. */
export function formatINR(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return null
  // Totals are floats, so a sum of whole rupees can land on 547.9999999996:
  // round to paise first, then decide which of the two formats it wants.
  const value = Math.round(amount * 100) / 100
  return (Number.isInteger(value) ? whole : paise).format(value)
}
