/**
 * Brand constants sourced from the official Tatvyra material supplied in
 * /Brand Assets (Catalogue V7.pdf and the Tatvyra business cards).
 * Nothing in this file may be invented — if a value is not in the source
 * material, leave it out.
 */

export const BRAND = {
  name: 'Tatvyra',
  line: 'Rise. Nourish. Thrive.',
  company: 'Feynman Foodcraft Pvt. Ltd.',
  positioning: 'Real wellness, kept honest.',
  // Verbatim from the catalogue cover / closing page.
  promise: 'Your Trusted Source for Everyday Health & Wellness',
  certification: 'FSSAI certified',
  website: 'www.tatvyra.com',
  contact: {
    emails: ['Connect@tatvyra.com', 'Sales@tatvyra.com'],
    // What each address is for, shown above it in the footer and on Contact.
    emailFor: {
      'Connect@tatvyra.com': 'Product info',
      'Sales@tatvyra.com': 'Business opportunities',
    },
    // The footer lists only these two addresses, as the client asked.
    footerEmails: ['connect@tatvyra.com', 'sales@tatvyra.com'],
    address: [
      '208/407, Shivam Chambers',
      'SV Road, Goregaon West, Mumbai 400104',
    ],
  },
}

/**
 * The four voice traits from the brand guidelines. Used for the
 * "Why Tatvyra" section — set as editorial numerals, not wellness icons.
 */
export const VOICE_TRAITS = [
  {
    id: 'clean-honest',
    title: 'Clean & Honest',
    body: 'We state what is in a product and what is not, plainly, on the pack and on this page.',
  },
  {
    id: 'rooted',
    title: 'Rooted',
    body: 'Moringa, spirulina and honey are real, traditional foods here, not trends we picked up this season.',
  },
  {
    id: 'everyday',
    title: 'Everyday',
    body: 'Powders, tablets, capsules, gummies and spreads, so the format fits the routine you already have.',
  },
  {
    id: 'energising',
    title: 'Energising',
    body: 'Short, active, forward-moving. Food that helps you get on with the day.',
  },
]

/**
 * On-pack marks, quoted from the "Features / Standards" page of the catalogue.
 * These definitions govern which product may carry which mark.
 */
export const MARKS = {
  'gluten-free': {
    label: 'Gluten-Free',
    definition:
      'Naturally free of gluten-containing grains, with no cross-formulation risk from wheat, barley or rye.',
  },
  'nutrition-forward': {
    label: 'High Protein',
    definition:
      'Nutrition-forward claim used where the product meaningfully over-indexes on protein density.',
  },
  'single-origin': {
    label: 'Single Origin / High-Altitude',
    definition:
      'Sourcing claims specific to Raw Honey, describing floral source diversity or harvest terrain.',
  },
}
