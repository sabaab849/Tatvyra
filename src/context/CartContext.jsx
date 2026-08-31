import { useEffect, useMemo, useReducer, useState } from 'react'
import { getProduct } from '../data/catalogue'
import { CartContext } from './useCart'

/**
 * Frontend-only cart.
 *
 * No prices exist in the supplied Tatvyra product data and no payment backend
 * is connected, so this deliberately does NOT compute totals or simulate a
 * checkout. It stores a line-item list ready to be handed to a real commerce
 * backend later; the drawer surfaces an enquiry route instead of a fake
 * "Pay now".
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
    const items = lines
      .map((line) => ({ ...line, product: getProduct(line.slug) }))
      .filter((line) => line.product)

    return {
      items,
      count: items.reduce((total, line) => total + line.quantity, 0),
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
