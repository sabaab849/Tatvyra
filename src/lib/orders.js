/**
 * Placed orders, kept in the browser.
 *
 * There is no backend, so a completed order is written to localStorage purely
 * so the confirmation page survives a refresh and can be linked to. When a real
 * commerce backend arrives this is the module to replace: the confirmation page
 * only calls getOrder().
 *
 * No card or UPI details are stored — only the method label, the order lines
 * and the totals.
 */
const KEY = 'tatvyra.orders.v1'
const KEEP = 10

/** TAT-4F9K2Q — short, unambiguous, no look-alike characters. */
export function makeReference() {
  const alphabet = 'ACDEFGHJKLMNPQRSTUVWXYZ2345679'
  let out = ''
  for (let i = 0; i < 6; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `TAT-${out}`
}

function readAll() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  try {
    const next = [order, ...readAll().filter((o) => o.reference !== order.reference)].slice(0, KEEP)
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage can be unavailable (private mode); the confirmation still renders
       from the navigation state it was handed. */
  }
  return order
}

export function getOrder(reference) {
  return readAll().find((o) => o.reference === reference) ?? null
}
