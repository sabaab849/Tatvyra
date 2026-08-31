/**
 * Product data transcribed verbatim from Tatvyra "Catalogue V7".
 * Sizes and key benefits are exactly as printed. No prices, ingredient lists,
 * nutrition tables or reviews exist in the supplied material, so those fields
 * are intentionally null/empty and the UI omits them rather than inventing them.
 */

export const CATEGORIES = [
  {
    slug: 'nut-butters',
    number: '01',
    name: 'Nut Butters',
    // Short line for the homepage category grid.
    teaser: 'Peanut, almond & cashew milled into clean-label spreads.',
    // Verbatim catalogue description.
    description:
      'Peanut, almond & cashew milled into clean-label spreads — no hydrogenated oils, no added sugar or preservatives.',
    image: '/images/cat-nut-butters.webp',
    imageAlt: 'A stoneware bowl of Tatvyra creamy peanut butter with a spoonful lifted from it, beside toast.',
    accent: 'peach',
  },
  {
    slug: 'moringa',
    number: '02',
    name: 'Moringa',
    teaser: 'Traditional superfood in convenient everyday formats.',
    description:
      'Moringa in powder, tablet & capsule formats, bringing a nutrient-rich traditional superfood into everyday routines.',
    image: '/images/cat-moringa.webp',
    imageAlt: 'Finely milled Tatvyra moringa leaf powder in an open tin with a wooden scoop.',
    accent: 'lilac',
  },
  {
    slug: 'spirulina',
    number: '03',
    name: 'Spirulina',
    teaser: 'Plant-based spirulina crafted for everyday nutrition.',
    description:
      'Plant-based spirulina in powder, tablet & capsule formats, crafted for convenient everyday nutrition.',
    image: '/images/cat-spirulina.webp',
    imageAlt: 'Deep green Tatvyra spirulina powder heaped in a speckled ceramic bowl.',
    accent: 'lilac',
  },
  {
    slug: 'raw-honey',
    number: '04',
    name: 'Raw Honey',
    teaser: 'Single-origin honeys from distinct natural harvests.',
    description:
      'Four single-origin honeys, from dense forest florals to high-altitude Himalayan harvests.',
    image: '/images/cat-raw-honey.webp',
    imageAlt: 'Raw honey running from a piece of honeycomb.',
    accent: 'peach',
  },
]

export const PRODUCTS = [
  // 01 — NUT BUTTERS
  {
    sku: 'TAT-NB01',
    slug: 'natural-peanut-butter-creamy',
    name: 'Natural Peanut Butter, Creamy',
    category: 'nut-butters',
    format: 'Spread',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '30% 50%',
    zoom: 1,
    descriptor: 'Peanuts, milled creamy. Nothing hydrogenated, nothing added.',
    sizes: ['250g', '500g', '1000g'],
    benefits: [
      'High-protein (~25g/100g)',
      'No hydrogenated oils or added sugar',
      'Rich in Vitamin E, Magnesium & Potassium',
    ],
    marks: ['clean-label', 'vegan', 'nutrition-forward'],
    price: null,
    featured: true,
  },
  {
    sku: 'TAT-NB02',
    slug: 'chocolate-peanut-butter',
    name: 'Chocolate Peanut Butter, Cream & Crunchy',
    category: 'nut-butters',
    format: 'Spread',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '50% 58%',
    zoom: 1.28,
    descriptor: 'Cocoa and peanuts, in creamy or crunchy.',
    sizes: ['250g', '500g', '1000g'],
    benefits: [
      'Protein-rich indulgence',
      'Cocoa Antioxidant flavonoids',
      'Lower added sugar than typical spreads',
      'Gluten free',
      'Vegan',
    ],
    marks: ['clean-label', 'vegan', 'gluten-free', 'nutrition-forward'],
    price: null,
  },
  {
    sku: 'TAT-NB03',
    slug: 'almond-butter-creamy',
    name: 'Almond Butter, Creamy',
    category: 'nut-butters',
    format: 'Spread',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '20% 44%',
    zoom: 1.12,
    descriptor: 'Almonds, milled smooth.',
    sizes: ['250g', '500g', '1000g'],
    benefits: ['High Vitamin E & Magnesium', 'Natural Calcium'],
    marks: ['clean-label', 'vegan'],
    price: null,
  },
  {
    sku: 'TAT-NB04',
    slug: 'cashew-butter-creamy',
    name: 'Cashew Butter, Creamy',
    category: 'nut-butters',
    format: 'Spread',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '64% 52%',
    zoom: 1.36,
    descriptor: 'Cashews, milled to a softer, sweeter spread.',
    sizes: ['250g', '500g', '1000g'],
    benefits: ['Naturally sweet & smoother texture', 'Rich in Copper & Magnesium'],
    marks: ['clean-label', 'vegan'],
    price: null,
  },

  // 02 — MORINGA
  {
    sku: 'TAT-MO01',
    slug: 'moringa-leaf-powder',
    name: 'Moringa Leaf Powder',
    category: 'moringa',
    format: 'Powder',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '45% 50%',
    zoom: 1,
    descriptor: 'Moringa leaf, milled fine. Stir it into whatever you already drink.',
    sizes: ['100g pouch'],
    benefits: [
      '100+ Bioactive plant compounds',
      'Iron + Vitamin C',
      'Antioxidant-rich',
      'Gluten free',
      'Vegan',
    ],
    marks: ['clean-label', 'vegan', 'gluten-free'],
    price: null,
    featured: true,
  },
  {
    sku: 'TAT-MO02',
    slug: 'moringa-acv-effervescent-tablets',
    name: 'Moringa ACV Effervescent Tablets',
    category: 'moringa',
    format: 'Effervescent',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '18% 38%',
    zoom: 1.3,
    descriptor: 'Apple cider vinegar and moringa in one fast-dissolving tablet.',
    sizes: ['15 tabs / bottle'],
    benefits: [
      'ACV + Moringa in one fast-dissolving tablet',
      'Digestion support',
      'Portable single-dose',
    ],
    marks: ['clean-label', 'vegan'],
    price: null,
  },
  {
    sku: 'TAT-MO03',
    slug: 'moringa-tablets',
    name: 'Moringa Tablets',
    category: 'moringa',
    format: 'Tablets',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '72% 56%',
    zoom: 1.14,
    descriptor: 'The leaf powder, compressed into a daily dose.',
    sizes: ['60 caps / bottle'],
    benefits: ['Compressed daily-dose format', 'Same benefits as leaf powder'],
    marks: ['clean-label', 'vegan'],
    price: null,
  },
  {
    sku: 'TAT-MO04',
    slug: 'moringa-capsules',
    name: 'Moringa Capsules',
    category: 'moringa',
    format: 'Capsules',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '34% 68%',
    zoom: 1.38,
    descriptor: 'The leaf powder, encapsulated. No taste, no measuring.',
    sizes: ['60 caps / bottle'],
    benefits: ['Encapsulated daily-dose format', 'Same benefits as leaf powder'],
    marks: ['clean-label', 'vegan'],
    price: null,
  },
  {
    sku: 'TAT-MO05',
    slug: 'moringa-gummies',
    name: 'Moringa Gummies',
    category: 'moringa',
    format: 'Gummies',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '60% 32%',
    zoom: 1.22,
    descriptor: 'A taste-led daily format for people who skip tablets.',
    sizes: ['30 gummies / pack'],
    benefits: [
      'New easy-to-take daily format',
      'Alternative to tablets & capsules for taste-led buyers',
    ],
    marks: ['clean-label', 'vegan'],
    price: null,
    isNew: true,
  },

  // 03 — SPIRULINA
  {
    sku: 'TAT-SP01',
    slug: 'spirulina-powder',
    name: 'Spirulina Powder',
    category: 'spirulina',
    format: 'Powder',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '50% 62%',
    zoom: 1,
    descriptor: 'Dense, deep-green spirulina for smoothies and everyday mixing.',
    sizes: ['100g pouch'],
    benefits: [
      'Extremely protein-dense',
      'Rich in B-vitamins (B1, B2, B3, B6, B9)',
      'Iron & magnesium',
    ],
    marks: ['clean-label', 'vegan', 'nutrition-forward'],
    price: null,
    featured: true,
  },
  {
    sku: 'TAT-SP02',
    slug: 'spirulina-tablets',
    name: 'Spirulina Tablets',
    category: 'spirulina',
    format: 'Tablets',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '34% 42%',
    zoom: 1.24,
    descriptor: 'The powder, compressed into a daily dose.',
    sizes: ['60 caps / bottle'],
    benefits: ['Compressed daily-dose format', 'Same benefits as powder'],
    marks: ['clean-label', 'vegan'],
    price: null,
  },
  {
    sku: 'TAT-SP03',
    slug: 'spirulina-capsules',
    name: 'Spirulina Capsules',
    category: 'spirulina',
    format: 'Capsules',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '66% 74%',
    zoom: 1.4,
    descriptor: 'The powder, encapsulated. Straightforward to take daily.',
    sizes: ['60 caps / bottle'],
    benefits: ['Encapsulated daily-dose format', 'Same benefits as powder'],
    marks: ['clean-label', 'vegan'],
    price: null,
  },

  // 04 — RAW HONEY
  {
    sku: 'TAT-HN01',
    slug: 'wild-forest-honey',
    name: 'Wild Forest Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '40% 44%',
    zoom: 1,
    descriptor: 'Dark, dense forest florals.',
    sizes: ['250g', '500g'],
    benefits: [
      'Dark & Mineral-rich',
      'Antibacterial properties',
      'Traditionally used for cough & cold',
    ],
    marks: ['clean-label', 'single-origin'],
    price: null,
    featured: true,
  },
  {
    sku: 'TAT-HN02',
    slug: 'multifloral-honey',
    name: 'Multifloral Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '56% 62%',
    zoom: 1.26,
    descriptor: 'A balanced blend across many flowers.',
    sizes: ['250g', '500g'],
    benefits: ['Balanced multi-flower blend', 'Soothes sore throat', 'Aids digestion'],
    marks: ['clean-label', 'single-origin'],
    price: null,
  },
  {
    sku: 'TAT-HN03',
    slug: 'himalayan-honey',
    name: 'Himalayan Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '24% 38%',
    zoom: 1.12,
    descriptor: 'High-altitude harvest, thicker in the jar.',
    sizes: ['250g', '500g'],
    benefits: [
      'High-altitude, Mineral-dense',
      'Thicker consistency',
      'Supports respiratory health',
    ],
    marks: ['clean-label', 'single-origin'],
    price: null,
  },
  {
    sku: 'TAT-HN04',
    slug: 'kashmiri-white-acacia-honey',
    name: 'Kashmiri White Acacia Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    // Crop of the range photograph used for this SKU until a packshot exists.
    focus: '72% 56%',
    zoom: 1.38,
    descriptor: 'Pale, delicate, slow to set.',
    sizes: ['250g', '500g'],
    benefits: ['Light & delicate flavour', 'Low Glycaemic impact', 'Slow to crystallise'],
    marks: ['clean-label', 'single-origin'],
    price: null,
  },
]

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug)

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug)

export const productsByCategory = (slug) => PRODUCTS.filter((p) => p.category === slug)

export const featuredProducts = () => PRODUCTS.filter((p) => p.featured)

export const searchProducts = (query) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return PRODUCTS.filter((p) =>
    [p.name, p.format, p.descriptor, p.sku, getCategory(p.category)?.name]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}
