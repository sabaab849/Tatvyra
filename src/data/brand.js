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
  positioning: 'Clean-label wellness, kept honest.',
  catalogueTitle: 'Wellness Essentials',
  // Verbatim from the catalogue cover / closing page.
  promise: 'Your Trusted Source for Everyday Health & Wellness',
  certification: 'FSSAI certified',
  website: 'www.tatvyra.com',
  contact: {
    emails: ['connect@feynmanfoodcraft.com', 'vijeta.r@feynmanfoodcraft.com'],
    phones: ['+91 90040 95046', '+91 90040 98295'],
    address: [
      'Unit no. 407, Shivam Chambers',
      'Swami Vivekanda Road, Jawahar Nagar',
      'Goregaon West, Mumbai 400104',
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
    body: 'Moringa, spirulina and honey are real, traditional foods here — not trends we picked up this season.',
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
  'clean-label': {
    label: 'Clean Label',
    definition:
      'Made with thoughtfully selected ingredients and free from unnecessary additives, with clean-label standards maintained across every SKU in this catalogue.',
  },
  vegan: {
    label: 'Vegan',
    definition:
      'Contains no animal-derived ingredients. Applied to nut butters, moringa and spirulina formats; raw honey is excluded by category definition.',
  },
  'gluten-free': {
    label: 'Gluten-Free',
    definition:
      'Naturally free of gluten-containing grains — no cross-formulation risk from wheat, barley or rye.',
  },
  'nutrition-forward': {
    label: 'High Protein / No Added Sugar',
    definition:
      'Nutrition-forward claims used where the product meaningfully over-indexes on protein density or carries no added sugar in its clean-label formulation.',
  },
  'single-origin': {
    label: 'Single Origin / High-Altitude',
    definition:
      'Sourcing claims specific to the Raw Honey range, describing floral source diversity or harvest terrain.',
  },
}
