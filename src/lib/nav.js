/** Single source of truth for primary navigation so the header bar and the
 *  mobile menu agree. */

/**
 * The five primary destinations, in order. An item is either a plain link
 * (`to`) or a menu (`ranges`): the catalogue category slugs it opens onto,
 * which the header shows as a mega-menu and the mobile menu as a sub-list.
 * Category names, pictures and products are read from the catalogue by slug,
 * so nothing about a range is repeated here.
 */
export const HEADER_NAV = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Greens', ranges: ['moringa', 'spirulina'] },
  { label: 'Spreads', ranges: ['nut-butters'] },
  { label: 'Honey', ranges: ['raw-honey'] },
  { label: 'About', to: '/about' },
]

export const SUPPORT_NAV = [
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]

/** The only two policy links. Shipping, refunds, terms and the disclaimer are
 *  sections of Our Policies, not links of their own. */
export const POLICY_NAV = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Our Policies', to: '/policies' },
]
