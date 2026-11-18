import { useEffect, useMemo, useReducer, useState } from 'react'
import { getProduct } from '../data/catalogue'
import { quoteLines } from '../lib/pricing'
import { CartContext } from './useCart'

/**
 * Frontend-only cart.
 *
 * A line stores only slug, size and quantity. Prices are looked up from the
 * catalogue on every render rather than copied into the stored line, so a price
 * change can never leave a stale number sitting in someone's saved cart.
 *
 * Totals are computed here, once, and read by every surface — the arithmetic
 * lives in one place so the drawer and any later checkout cannot drift apart.
 * The total is the MRP of each line times its quantity, summed: MRPs include
 * GST, so nothing — tax, markup or delivery — is added on top. The arithmetic
 * itself lives in src/lib/pricing.js, which the payment server shares — so
 * what Razorpay charges is always what this cart shows.
 */

const STORAGE_KEY = 'tatvyra.cart.v1'

const lineId = (slug, size) => `${slug}::${size ?? 'default'}`

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { slug, size, quantity = 1 } = action
      const id = lineId(slug, size)
      const existing = state.find((line) => line.id === id)
      if (existing) {
        return state.map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + quantity } : line,
        )
      }
      return [...state, { id, slug, size: size ?? null, quantity }]
    }
    case 'setQuantity': {
      if (action.quantity <= 0) return state.filter((line) => line.id !== action.id)
      return state.map((line) =>
        line.id === action.id ? { ...line, quantity: action.quantity } : line,
      )
    }
    case 'remove':
      return state.filter((line) => line.id !== action.id)
    case 'clear':
      return []
    case 'hydrate':
      return action.lines
    default:
      return state
  }
}

function readStoredLines() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Drop anything that no longer maps to a real product.
    return parsed.filter((line) => line && typeof line.slug === 'string' && getProduct(line.slug))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, [], readStoredLines)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage can be unavailable (private mode) — the cart just won't persist */
    }
  }, [lines])

  const value = useMemo(() => {
    const { items, subtotal, total } = quoteLines(lines)

    return {
      items,
      count: items.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      total,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (slug, size, quantity = 1) => {
        dispatch({ type: 'add', slug, size, quantity })
        setIsOpen(true)
      },
      setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' }),
    }
  }, [lines, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
