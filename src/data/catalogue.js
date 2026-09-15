/**
 * Product data transcribed verbatim from Tatvyra "Catalogue V7".
 * Sizes and key benefits are exactly as printed. Ingredient lists, nutrition
 * tables and reviews do not exist in the supplied material, so those fields are
 * intentionally empty and the UI omits them rather than inventing them.
 *
 * PRICES ARE PLACEHOLDERS. The catalogue publishes none, so the figures below
 * are indicative retail prices for the prototype, held as whole rupees, purely
 * so the cart can total an order. Replace them with the client's real pricing.
 *
 * `price` is the canonical unit price, and is the price of the first size.
 * A product sold in several sizes also carries `prices`, with one entry per
 * entry in `sizes`. Read both through priceFor() rather than reaching for
 * either directly, so one product and size can never be priced two ways.
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
    image: '/images/products/peanut-butter-creamy-1.webp',
    images: [
      {
        src: '/images/products/peanut-butter-creamy-1.webp',
        alt: 'An open jar of Tatvyra Organic Premium peanut butter on a green mat, with a spoonful drizzling into a glass bowl beside peanut-buttered toast and whole peanuts.',
      },
      {
        src: '/images/products/peanut-butter-creamy-2.webp',
        alt: 'A hand dipping an apple slice loaded with Tatvyra premium peanut butter into the open jar, against a lilac ground.',
      },
      {
        src: '/images/products/range-nut-butters.webp',
        alt: 'The four Tatvyra nut butters together — peanut, chocolate crunchy, almond and cashew — with peanuts and buttered toast.',
      },
    ],
    descriptor: 'Peanuts, milled creamy. Nothing hydrogenated, nothing added.',
    sizes: ['250g', '500g', '1000g'],
    benefits: [
      'High-protein (~25g/100g)',
      'No hydrogenated oils or added sugar',
      'Rich in Vitamin E, Magnesium & Potassium',
    ],
    marks: ['clean-label', 'vegan', 'nutrition-forward'],
    /* Long-form ingredients-and-benefits block for the product page. Only
       this SKU has one so far; the section renders when it is present. */
    spotlight: {
      eyebrow: 'Ingredients and benefits',
      title: 'Goodness in every spoon.',
      intro:
        'Made with simple, real ingredients, our Natural Peanut Butter is packed with plant-based protein, healthy fats and essential nutrients — nothing more, nothing less.',
      image: '/images/products/peanut-butter-spoon.webp',
      imageAlt:
        'An open jar of Tatvyra natural peanut butter photographed from above on a stone slab, ringed with whole and shelled peanuts.',
      benefits: [
        { icon: 'protein', title: 'High Protein', body: '~25g per 100g' },
        {
          icon: 'nothing-added',
          title: 'No Hydrogenated Oils or Added Sugar',
          body: 'Just pure, honest nutrition.',
        },
        {
          icon: 'micronutrients',
          title: 'Rich in Vitamin E, Magnesium & Potassium',
          body: 'Supports energy, heart health and overall well-being.',
        },
      ],
    },
    campaign: {
      eyebrow: 'In use',
      title: 'One jar, three ways.',
      body:
        'Spooned over apple, spread across toast, or taken straight from the jar. The same creamy mill either way — nothing hydrogenated, nothing added.',
      image: '/images/products/peanut-butter-campaign-1400.webp',
      imageAlt:
        'Three campaign panels for Tatvyra Organic Premium peanut butter: poured over a bowl of apple slices, jarred beside apple-topped toast, and mid-pour with peanuts and apple peel.',
    },
    /* Answers are held to what this catalogue states about the SKU — no
       storage, shelf-life or sourcing claims it does not make. */
    faq: [
      {
        q: 'What is actually in it?',
        a: 'Peanuts, milled creamy. No hydrogenated oils, no added sugar and no preservatives — the clean-label standard held across every SKU in this catalogue.',
      },
      {
        q: 'Why has the oil risen to the top?',
        a: 'Because there is nothing in it to stop that happening. With no hydrogenated oils or stabilisers, a natural nut butter separates as it stands. Stir it back through and it returns to a creamy spread.',
      },
      {
        q: 'How much protein does it have?',
        a: 'Roughly 25g per 100g, alongside Vitamin E, Magnesium and Potassium.',
      },
      {
        q: 'Is it vegan?',
        a: 'Yes. It carries the Vegan mark, meaning it contains no animal-derived ingredients.',
      },
      {
        q: 'What sizes does it come in?',
        a: 'Three jar sizes — 250g, 500g and 1000g.',
      },
      {
        q: 'Is every jar size the same price?',
        a: 'No — each size is priced on its own, and the price updates when you change size. The 500g and 1000g jars work out cheaper per gram than the 250g.',
      },
    ],
    price: 299,
    prices: { '250g': 299, '500g': 499, '1000g': 899 },
    featured: true,
  },
  {
    sku: 'TAT-NB02',
    slug: 'chocolate-peanut-butter',
    name: 'Chocolate Peanut Butter, Cream & Crunchy',
    category: 'nut-butters',
    format: 'Spread',
    image: '/images/products/chocolate-peanut-butter-1.webp',
    images: [
      {
        src: '/images/products/chocolate-peanut-butter-1.webp',
        alt: 'A jar of Tatvyra chocolate peanut butter, cream and crunchy, on a green mat beside a bowl of the spread topped with cocoa, peanuts and chocolate chips.',
      },
      {
        src: '/images/products/chocolate-peanut-butter-2.webp',
        alt: 'A hand dipping an apple slice loaded with Tatvyra chocolate crunchy peanut butter into the open jar, against a lilac ground.',
      },
      {
        src: '/images/products/range-nut-butters.webp',
        alt: 'The four Tatvyra nut butters together — peanut, chocolate crunchy, almond and cashew — with peanuts and buttered toast.',
      },
    ],
    spotlight: {
      eyebrow: 'Ingredients and benefits',
      title: 'The best of both worlds.',
      intro:
        'Creamy, chocolatey, and packed with goodness. Our Chocolate Peanut Butter Crunchy is made with roasted peanuts, rich cocoa and natural crunch — for a deliciously satisfying, nutrient-packed spread.',
      image: '/images/products/chocolate-peanut-butter-spoon.webp',
      imageAlt:
        'A glass bowl of Tatvyra chocolate crunchy peanut butter photographed from above, with chocolate chunks, loose peanuts, a bowl of crunch and a loaded spoon around it.',
      benefits: [
        { icon: 'protein', title: 'High Protein', body: '~25g per 100g' },
        {
          icon: 'nothing-added',
          title: 'No Hydrogenated Oils or Added Sugar',
          body: 'Just pure, honest nutrition.',
        },
        {
          icon: 'micronutrients',
          title: 'Rich in Vitamin E, Magnesium & Potassium',
          body: 'Supports energy, heart health and overall well-being.',
        },
      ],
    },
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
    price: 349,
    prices: { '250g': 349, '500g': 599, '1000g': 1099 },
  },
  {
    sku: 'TAT-NB03',
    slug: 'almond-butter-creamy',
    name: 'Almond Butter, Creamy',
    category: 'nut-butters',
    format: 'Spread',
    image: '/images/products/almond-butter-creamy.webp',
    images: [
      {
        src: '/images/products/almond-butter-creamy.webp',
        alt: 'A jar of Tatvyra almond butter, creamy, on a green mat beside a bowl of the spread with whole and flaked almonds.',
      },
      {
        src: '/images/products/almond-butter-creamy-2.webp',
        alt: 'A hand dipping an apple slice loaded with Tatvyra almond butter into the open jar, against a lilac ground.',
      },
      {
        src: '/images/products/range-nut-butters.webp',
        alt: 'The four Tatvyra nut butters together — peanut, chocolate crunchy, almond and cashew — with peanuts and buttered toast.',
      },
    ],    descriptor: 'Almonds, milled smooth.',
    sizes: ['250g', '500g', '1000g'],
    benefits: ['High Vitamin E & Magnesium', 'Natural Calcium'],
    marks: ['clean-label', 'vegan'],
    price: 799,
    prices: { '250g': 799, '500g': 1449, '1000g': 2699 },
  },
  {
    sku: 'TAT-NB04',
    slug: 'cashew-butter-creamy',
    name: 'Cashew Butter, Creamy',
    category: 'nut-butters',
    format: 'Spread',
    image: '/images/products/cashew-butter-creamy.webp',
    images: [
      {
        src: '/images/products/cashew-butter-creamy.webp',
        alt: 'A jar of Tatvyra cashew butter, creamy, on a green mat beside a bowl of the spread with whole and chopped cashews.',
      },
      {
        src: '/images/products/cashew-butter-creamy-2.webp',
        alt: 'A hand dipping an apple slice loaded with Tatvyra cashew butter into the open jar, against a lilac ground.',
      },
      {
        src: '/images/products/range-nut-butters.webp',
        alt: 'The four Tatvyra nut butters together — peanut, chocolate crunchy, almond and cashew — with peanuts and buttered toast.',
      },
    ],    descriptor: 'Cashews, milled to a softer, sweeter spread.',
    sizes: ['250g', '500g', '1000g'],
    benefits: ['Naturally sweet & smoother texture', 'Rich in Copper & Magnesium'],
    marks: ['clean-label', 'vegan'],
    price: 749,
    prices: { '250g': 749, '500g': 1349, '1000g': 2499 },
  },

  // 02 — MORINGA
  {
    sku: 'TAT-MO01',
    slug: 'moringa-leaf-powder',
    name: 'Moringa Leaf Powder',
    category: 'moringa',
    format: 'Powder',
    image: '/images/products/moringa-leaf-powder.webp',
    images: [
      {
        src: '/images/products/moringa-leaf-powder.webp',
        alt: 'A pouch of Tatvyra organic moringa leaf powder beside bowls of the green powder and fresh moringa leaves.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
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
    price: 399,
    featured: true,
  },
  {
    sku: 'TAT-MO02',
    slug: 'moringa-acv-effervescent-tablets',
    name: 'Moringa ACV Effervescent Tablets',
    category: 'moringa',
    format: 'Effervescent',
    image: '/images/products/moringa-acv-effervescent-tablets.webp',
    images: [
      {
        src: '/images/products/moringa-acv-effervescent-tablets.webp',
        alt: 'A bottle of Tatvyra ACV and moringa effervescent tablets on a wooden board with moringa leaves and green powder.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'Apple cider vinegar and moringa in one fast-dissolving tablet.',
    sizes: ['15 tabs / bottle'],
    benefits: [
      'ACV + Moringa in one fast-dissolving tablet',
      'Digestion support',
      'Portable single-dose',
    ],
    marks: ['clean-label', 'vegan'],
    price: 449,
  },
  {
    sku: 'TAT-MO03',
    slug: 'moringa-tablets',
    name: 'Moringa Tablets',
    category: 'moringa',
    format: 'Tablets',
    image: '/images/products/moringa-tablets.webp',
    images: [
      {
        src: '/images/products/moringa-tablets.webp',
        alt: 'A bottle of Tatvyra moringa tablets on a wooden board beside a bowl of moringa powder and fresh leaves.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'The leaf powder, compressed into a daily dose.',
    sizes: ['60 caps / bottle'],
    benefits: ['Compressed daily-dose format', 'Same benefits as leaf powder'],
    marks: ['clean-label', 'vegan'],
    price: 549,
  },
  {
    sku: 'TAT-MO04',
    slug: 'moringa-capsules',
    name: 'Moringa Capsules',
    category: 'moringa',
    format: 'Capsules',
    image: '/images/products/moringa-capsules.webp',
    images: [
      {
        src: '/images/products/moringa-capsules.webp',
        alt: 'A bottle of Tatvyra moringa capsules on a wooden board beside bowls of moringa powder and fresh leaves, with loose capsules in a wooden dish.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'The leaf powder, encapsulated. No taste, no measuring.',
    sizes: ['60 caps / bottle'],
    benefits: ['Encapsulated daily-dose format', 'Same benefits as leaf powder'],
    marks: ['clean-label', 'vegan'],
    price: 599,
  },
  {
    sku: 'TAT-MO05',
    slug: 'moringa-gummies',
    name: 'Moringa Gummies',
    category: 'moringa',
    format: 'Gummies',
    image: '/images/products/moringa-gummies.webp',
    images: [
      {
        src: '/images/products/moringa-gummies.webp',
        alt: 'A jar of Tatvyra organic moringa gummies on a wooden board with moringa leaves and a bowl of green powder.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'A taste-led daily format for people who skip tablets.',
    sizes: ['30 gummies / pack'],
    benefits: [
      'New easy-to-take daily format',
      'Alternative to tablets & capsules for taste-led buyers',
    ],
    marks: ['clean-label', 'vegan'],
    price: 699,
    isNew: true,
  },

  // 03 — SPIRULINA
  {
    sku: 'TAT-SP01',
    slug: 'spirulina-powder',
    name: 'Spirulina Powder',
    category: 'spirulina',
    format: 'Powder',
    image: '/images/products/spirulina-powder.webp',
    images: [
      {
        src: '/images/products/spirulina-powder.webp',
        alt: 'A pouch of Tatvyra organic spirulina powder beside a bowl of deep green powder and fresh leaves.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'Dense, deep-green spirulina for smoothies and everyday mixing.',
    sizes: ['100g pouch'],
    benefits: [
      'Extremely protein-dense',
      'Rich in B-vitamins (B1, B2, B3, B6, B9)',
      'Iron & magnesium',
    ],
    marks: ['clean-label', 'vegan', 'nutrition-forward'],
    price: 549,
    featured: true,
  },
  {
    sku: 'TAT-SP02',
    slug: 'spirulina-tablets',
    name: 'Spirulina Tablets',
    category: 'spirulina',
    format: 'Tablets',
    image: '/images/products/spirulina-tablets.webp',
    images: [
      {
        src: '/images/products/spirulina-tablets.webp',
        alt: 'A bottle of Tatvyra spirulina tablets on a wooden board with loose tablets and a bowl of green powder.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'The powder, compressed into a daily dose.',
    sizes: ['60 caps / bottle'],
    benefits: ['Compressed daily-dose format', 'Same benefits as powder'],
    marks: ['clean-label', 'vegan'],
    price: 649,
  },
  {
    sku: 'TAT-SP03',
    slug: 'spirulina-capsules',
    name: 'Spirulina Capsules',
    category: 'spirulina',
    format: 'Capsules',
    image: '/images/products/spirulina-capsules.webp',
    images: [
      {
        src: '/images/products/spirulina-capsules.webp',
        alt: 'A bottle of Tatvyra spirulina capsules on a wooden board beside a bowl of deep green powder.',
      },
      {
        src: '/images/products/range-green.webp',
        alt: 'The Tatvyra green range together — moringa leaf powder, tablets, capsules, gummies and spirulina — around bowls of green powder.',
      },
    ],
    descriptor: 'The powder, encapsulated. Straightforward to take daily.',
    sizes: ['60 caps / bottle'],
    benefits: ['Encapsulated daily-dose format', 'Same benefits as powder'],
    marks: ['clean-label', 'vegan'],
    price: 699,
  },

  // 04 — RAW HONEY
  {
    sku: 'TAT-HN01',
    slug: 'wild-forest-honey',
    name: 'Wild Forest Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    image: '/images/products/wild-forest-honey.webp',
    images: [
      {
        src: '/images/products/wild-forest-honey.webp',
        alt: 'A jar of Tatvyra wild forest honey with a honeycomb dipper lifted above it, moss and heather alongside.',
      },
    ],
    descriptor: 'Dark, dense forest florals.',
    sizes: ['250g', '500g'],
    benefits: [
      'Dark & Mineral-rich',
      'Antibacterial properties',
      'Traditionally used for cough & cold',
    ],
    marks: ['clean-label', 'single-origin'],
    price: 449,
    prices: { '250g': 449, '500g': 799 },
    featured: true,
  },
  {
    sku: 'TAT-HN02',
    slug: 'multifloral-honey',
    name: 'Multifloral Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    image: '/images/products/multifloral-honey.webp',
    images: [
      {
        src: '/images/products/multifloral-honey.webp',
        alt: 'A jar of Tatvyra multifloral honey with a honeycomb dipper above it, chamomile flowers and honeycomb alongside.',
      },
    ],
    descriptor: 'A balanced blend across many flowers.',
    sizes: ['250g', '500g'],
    benefits: ['Balanced multi-flower blend', 'Soothes sore throat', 'Aids digestion'],
    marks: ['clean-label', 'single-origin'],
    price: 399,
    prices: { '250g': 399, '500g': 699 },
  },
  {
    sku: 'TAT-HN03',
    slug: 'himalayan-honey',
    name: 'Himalayan Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    image: '/images/products/himalayan-honey.webp',
    images: [
      {
        src: '/images/products/himalayan-honey.webp',
        alt: 'A jar of Tatvyra Himalayan honey with its gold lid off, honey drizzling in, pink rhododendron flowers and river stones alongside.',
      },
    ],
    descriptor: 'High-altitude harvest, thicker in the jar.',
    sizes: ['250g', '500g'],
    benefits: [
      'High-altitude, Mineral-dense',
      'Thicker consistency',
      'Supports respiratory health',
    ],
    marks: ['clean-label', 'single-origin'],
    price: 599,
    prices: { '250g': 599, '500g': 1049 },
  },
  {
    sku: 'TAT-HN04',
    slug: 'kashmiri-white-acacia-honey',
    name: 'Kashmiri White Acacia Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    image: '/images/products/kashmiri-white-acacia-honey.webp',
    images: [
      {
        src: '/images/products/kashmiri-white-acacia-honey.webp',
        alt: 'A jar of Tatvyra Kashmiri white acacia honey with a honeycomb dipper above it and white blossom alongside.',
      },
    ],
    descriptor: 'Pale, delicate, slow to set.',
    sizes: ['250g', '500g'],
    benefits: ['Light & delicate flavour', 'Low Glycaemic impact', 'Slow to crystallise'],
    marks: ['clean-label', 'single-origin'],
    price: 699,
    prices: { '250g': 699, '500g': 1249 },
  },
]

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug)

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug)

/**
 * The unit price of a product in a given size, in whole rupees.
 *
 * Single-size products carry only `price`; multi-size products carry a
 * `prices` entry per size. Every surface — cards, product page, cart — prices
 * through this, which is what keeps one product and size from showing two
 * different numbers. Returns null rather than NaN when a price is missing.
 */
export const priceFor = (product, size) => product?.prices?.[size] ?? product?.price ?? null

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
