/** Single source of truth for primary navigation so header, drawer and footer agree. */

const SHOP = { label: 'Shop', to: '/shop' }
const ABOUT = { label: 'About', to: '/about' }

/** The four ranges. Each has its own page at /shop/:categorySlug. */
export const CATEGORY_NAV = [
  { label: 'Nut Butters', to: '/shop/nut-butters' },
  { label: 'Moringa', to: '/shop/moringa' },
  { label: 'Spirulina', to: '/shop/spirulina' },
  { label: 'Raw Honey', to: '/shop/raw-honey' },
]

/** Top-level destinations that are not a range. The drawer lists these on their
 *  own, with the ranges in their own labelled block beneath. */
export const SECTION_NAV = [SHOP, ABOUT]

/** The header bar runs the ranges inline between Shop and About, so any range is
 *  one click away rather than sitting behind /shop. Home is not a link here —
 *  the lockup carries it, which is where visitors look for it. */
export const PRIMARY_NAV = [SHOP, ...CATEGORY_NAV, ABOUT]

export const SUPPORT_NAV = [
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Returns', to: '/shipping-returns' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]
