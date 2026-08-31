import { createContext, useContext } from 'react'

/**
 * The cart context and its hook live apart from <CartProvider> so that the
 * provider file only exports a component — which keeps React Fast Refresh
 * working during development.
 */
export const CartContext = createContext(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
