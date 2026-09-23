/**
 * Product data transcribed verbatim from Tatvyra "Catalogue V7".
 * Sizes and key benefits are exactly as printed, except the raw honeys: each
 * has one benefit list, in its origin or benefit map, which its whole product
 * page shows (see benefitsFor). Ingredient lists, nutrition
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
    /* About the ingredient itself, as supplied for the spirulina range, so it
       is held once here and every spirulina product page shows the same four
       lines, beside that SKU's own catalogue benefits. */
    highlights: {
      title: 'Why spirulina',
      points: [
        'Among the most protein-dense whole foods available',
        'Rich in B-vitamins for everyday energy metabolism',
        'High in phycocyanin and chlorophyll antioxidant pigments',
        'A genuine, vegan-friendly plant protein source',
      ],
    },
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
    /* The ingredients-and-benefits block (ProductSpotlight). Every line, icon
       and the photograph are taken word for word from the supplied layout
       reference; it carries no eyebrow, so none is set. Its on-pack mark copy
       is the reference's own, so it is listed here rather than read from
       MARKS. The photograph is cut from that reference at about 710x560 real
       pixels and enlarged 1.5x; swap in a full-size original when one exists. */
    spotlight: {
      title: ['Pure Almonds.', 'Pure Goodness.'],
      intro:
        'Our Almond Butter is made from carefully selected premium almonds, slow-ground to a smooth, creamy texture — with no added sugars, oils or preservatives. Just pure, wholesome nutrition in every spoon.',
      image: '/images/products/almond-butter-spoon.webp',
      imageWidth: 1086,
      imageHeight: 861,
      imageAlt:
        'An open glass jar of smooth almond butter seen from above, ringed with whole and halved almonds, a bowl of almonds and a heaped spoonful of almond butter.',
      benefits: [
        {
          icon: 'protein',
          title: 'Good Source of Plant Protein',
          body: 'Supports muscle health and keeps you fuller for longer.',
        },
        {
          icon: 'healthy-fats',
          title: 'Rich in Healthy Fats',
          body: 'Contains heart-healthy unsaturated fats for sustained energy.',
        },
        {
          icon: 'essential-nutrients',
          title: 'Naturally Rich in Essential Nutrients',
          body: 'A good source of vitamin E, magnesium and fibre.',
        },
      ],
      marks: [
        {
          icon: 'clean-label',
          title: 'Clean Label',
          body: 'Made with 100% almonds and nothing else. Free from unnecessary additives.',
        },
        {
          icon: 'vegan',
          title: 'Vegan',
          body: 'Completely plant-based, with no animal-derived ingredients.',
        },
        {
          icon: 'nothing-added',
          title: 'No Added Sugar or Oils',
          body: 'Just pure almonds, slow-ground to creamy perfection.',
        },
        {
          icon: 'nutrition-forward',
          title: 'Naturally Nutrient-Rich',
          body: 'A natural source of protein, healthy fats, magnesium, vitamin E and fibre.',
        },
      ],
    },
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
    /* The ingredients-and-benefits block (ProductSpotlight). Every line, icon
       and the photograph are taken word for word from the supplied layout
       reference; it carries no eyebrow, so none is set. Its on-pack mark copy
       is the reference's own, so it is listed here rather than read from
       MARKS. The photograph is cut from that reference at about 726x581 real
       pixels and enlarged 1.5x; swap in a full-size original when one exists. */
    spotlight: {
      title: ['Pure Cashews.', 'Pure Goodness.'],
      intro:
        'Our Cashew Butter is made from carefully selected premium cashews, slow-ground to a smooth, creamy texture — with no added sugars, oils or preservatives. Just pure, wholesome nutrition in every spoon.',
      image: '/images/products/cashew-butter-spoon.webp',
      imageWidth: 1089,
      imageHeight: 893,
      imageAlt:
        'An open glass bowl of smooth, swirled cashew butter seen from above, ringed with whole cashews, a small bowl of cashews and a heaped spoonful of cashew butter.',
      benefits: [
        {
          icon: 'plant-protein',
          title: 'Good Source of Plant Protein',
          body: 'Supports muscle health and keeps you fuller for longer.',
        },
        {
          icon: 'healthy-fats',
          title: 'Rich in Healthy Fats',
          body: 'Contains heart-healthy unsaturated fats for sustained energy.',
        },
        {
          icon: 'essential-nutrients',
          title: 'Naturally Rich in Essential Nutrients',
          body: 'A good source of magnesium, zinc and iron.',
        },
      ],
      marks: [
        {
          icon: 'clean-label',
          title: 'Clean Label',
          body: 'Made with 100% cashews and nothing else. Free from unnecessary additives.',
        },
        {
          icon: 'vegan',
          title: 'Vegan',
          body: 'Completely plant-based, with no animal-derived ingredients.',
        },
        {
          icon: 'nothing-added',
          title: 'No Added Sugar or Oils',
          body: 'Just pure cashews, slow-ground to creamy perfection.',
        },
        {
          icon: 'nutrition-forward',
          title: 'Naturally Nutrient-Rich',
          body: 'A natural source of protein, healthy fats, magnesium, zinc and iron.',
        },
      ],
    },
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
    // The process story (ProductStory). Every line is lifted verbatim from the
    // supplied copy; nothing here names a drying or milling technique, a
    // source, or a benefit that copy does not state. Alt text describes only
    // what each photograph shows.
    story: {
      eyebrow: 'Moringa Powder',
      title: 'Carefully dried and finely milled.',
      intro: 'A simple way to add a nutrient-dense boost to your daily routine.',
      stages: [
        {
          label: 'Moringa leaves',
          body: 'Made from moringa leaves.',
          image: '/images/story/moringa-powder/leaves.webp',
          width: 262,
          height: 367,
          alt: 'Fresh moringa leaves on a wooden table.',
        },
        {
          label: 'Carefully dried',
          body: 'Carefully dried moringa leaves.',
          image: '/images/story/moringa-powder/dried.webp',
          width: 245,
          height: 356,
          alt: 'Dried leaves heaped in a wooden bowl.',
        },
        {
          label: 'Finely milled',
          body: 'Dried leaves, finely milled.',
          image: '/images/story/moringa-powder/milled.webp',
          width: 246,
          height: 356,
          alt: 'Fine green powder falling into a stoneware bowl.',
          specs: [
            ['Color', 'Natural'],
            ['Flavour', 'Earthy, slightly grassy'],
          ],
        },
        {
          label: 'One convenient jar',
          body: 'A versatile everyday superfood in one convenient jar.',
          image: '/images/products/moringa-leaf-powder.webp',
          width: 800,
          height: 1000,
          alt: 'A pouch of Tatvyra organic moringa leaf powder beside bowls of the green powder and fresh moringa leaves.',
        },
      ],
      routine: {
        label: 'Daily routine',
        body: 'Stir it into smoothies, juices, soups, or baked goods.',
        uses: [
          { label: 'Smoothies', image: '/images/story/moringa-powder/smoothie.webp', width: 140, height: 140, alt: 'A green smoothie in a glass.' },
          { label: 'Juices', image: '/images/story/moringa-powder/juice.webp', width: 124, height: 124, alt: 'A glass of green juice.' },
          { label: 'Soups & baked goods', image: '/images/story/moringa-powder/soup.webp', width: 132, height: 132, alt: 'A bowl of green soup.' },
        ],
      },
      feature: {
        image: '/images/story/moringa-powder/spoon.webp',
        width: 574,
        height: 272,
        alt: 'A spoonful of green powder, some of it falling from the spoon.',
        quote: 'Each batch is processed to preserve the natural color and nutrient profile of the leaf.',
      },
    },
  },
  {
    sku: 'TAT-MO02',
    slug: 'moringa-acv-effervescent-tablets',
    name: 'ACV Moringa Effervescent',
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
    // The full supplied description. The PDP shows this in the descriptor's slot;
    // cards keep the one-line descriptor above so the grid stays even.
    description:
      'A refreshing twist on two wellness staples—apple cider vinegar and moringa—combined into a fizzy, fast-dissolving tablet. Simply drop one into water for a tangy, energizing drink that fits easily into a busy day. A convenient alternative for those who find liquid ACV difficult to tolerate.',
    sizes: ['15 tabs / bottle'],
    benefits: [
      'ACV + Moringa in one fast-dissolving tablet',
      'Digestion support',
      'Portable single-dose',
    ],
    marks: ['clean-label', 'vegan'],
    price: 449,
    // The process story (ProductStory). Every line is drawn from the supplied
    // description: nothing here states a dose, a tablet count, an ingredient
    // beyond ACV and moringa, a benefit or a process. A slot with `pending` in
    // place of `image` has no photograph yet — it shows as a labelled
    // placeholder in development, and a production build hides the whole story
    // until every slot has one.
    story: {
      eyebrow: 'ACV Moringa Effervescent',
      title: ['Drop.', 'Dissolve.', 'Refresh.'],
      // The stages on the page's own ground, joined by a hairline timeline.
      theme: 'timeline',
      // Photographs are crops of the supplied storyboard, which arrived only as a
      // 660x360 screenshot — 144x172 real pixels per shot. Each was enlarged 4x
      // to 576x688 with a Swin2SR real-world super-resolution model, run
      // locally, which rebuilds edges and texture from the shot rather than
      // blurring it up; the content of each shot is unchanged. Swap in full-size
      // originals when they exist.
      stages: [
        {
          label: 'The tablet',
          callout: 'Fast-dissolving',
          image: '/images/story/acv-effervescent/tablet.webp',
          width: 576,
          height: 688,
          alt: 'Two round effervescent tablets on a pale stone surface.',
        },
        {
          label: 'Into water',
          callout: 'Drop into water',
          image: '/images/story/acv-effervescent/water.webp',
          width: 576,
          height: 688,
          alt: 'A hand dropping an effervescent tablet into a clear glass of water.',
        },
        {
          label: 'The fizz',
          callout: 'Fizzy',
          image: '/images/story/acv-effervescent/fizz.webp',
          width: 576,
          height: 688,
          alt: 'An effervescent tablet fizzing at the bottom of a glass of water.',
        },
        {
          label: 'The drink',
          callout: 'Tangy',
          image: '/images/story/acv-effervescent/drink.webp',
          width: 576,
          height: 688,
          alt: 'A glass of the finished pale golden drink.',
        },
      ],
      // A comparison of form only. Both sides are set identically so neither
      // reads as the lesser; the one line of copy is the description's own.
      compare: {
        label: 'Form',
        items: [
          { name: 'Liquid ACV', form: 'Liquid' },
          { name: 'ACV Moringa Effervescent', form: 'Effervescent tablet' },
        ],
        note: 'A convenient alternative for those who find liquid ACV difficult to tolerate.',
      },
      finale: {
        // From the description's opening clause, “A refreshing twist on two
        // wellness staples”. The brief's suggested “One refreshing ritual” was
        // not used: “ritual” is not in the description, and it implies
        // habitual use — the frequency the brief asks not to invent.
        lines: ['Two wellness staples.', 'One refreshing twist.'],
        callout: 'Easy to fit into a busy day',
        images: [
          {
            image: '/images/story/acv-effervescent/drink.webp',
            width: 576,
            height: 688,
            alt: 'A glass of the finished pale golden drink.',
          },
          {
            image: '/images/products/moringa-acv-effervescent-tablets.webp',
            width: 800,
            height: 1000,
            alt: 'A bottle of Tatvyra ACV and moringa effervescent tablets on a wooden board with moringa leaves and green powder.',
          },
        ],
      },
    },
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
    // The supplied product description, verbatim. The product page sets it in
    // place of the descriptor; cards and page metadata keep the short line.
    description:
      'Compressed from pure moringa leaf powder, these tablets offer a compact, precisely dosed way to enjoy moringa. Their solid form makes them easy to portion, store, and carry, making them a practical choice for anyone who prefers tablets over powders or capsules.',
    /* The "leaf powder to a compact daily form" band on the product page. Every
       line comes from the description above: no dosage, tablet count, process,
       nutritional or medical claim goes beyond it. The sequence shows product
       form only — powder, tablet, jar — so it pictures no machinery or method.
       All three photographs are this SKU's own product shoot: stages 01 and 02
       are crops that stay clear of the label, and stage 03 is the full
       photograph, so the packaging appears exactly as supplied. */
    journey: {
      eyebrow: 'Moringa Tablets',
      title: 'From moringa leaf powder to a compact daily form.',
      stages: [
        {
          title: 'Moringa leaf powder',
          body: 'Where it begins: pure moringa leaf powder.',
          image: '/images/products/moringa-tablets-journey/powder.webp',
          alt: 'Green moringa leaf powder in a stoneware bowl, with a wooden spoon resting in it.',
        },
        {
          title: 'Tablet form',
          body: 'Compressed into a compact, solid form.',
          image: '/images/products/moringa-tablets-journey/tablets.webp',
          alt: 'Round green moringa tablets, seen through the amber glass of the jar.',
          frame: 'wide',
        },
        {
          title: 'Moringa tablets',
          body: 'A compact, precisely dosed way to enjoy moringa.',
          image: '/images/products/moringa-tablets.webp',
          alt: 'A jar of Tatvyra Moringa Tablets on a wooden board, beside a bowl of moringa powder and fresh moringa leaves.',
          product: true,
        },
      ],
      qualities: ['Compact', 'Precisely dosed', 'Easy to portion', 'Easy to store', 'Easy to carry'],
      line: 'An alternative for those who prefer tablets over powders or capsules.',
    },
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
    /* The "from leaf to daily ritual" band on the product page. Every line is
       taken from the copy supplied for this SKU: no nutritional, medical,
       dosage, sourcing or process claim goes beyond it, and the drying stage
       names no technique because none was given. Stages 01, 02, 03 and 05 use
       photographs from the supplied layout reference; stage 04 is this SKU's
       own product photograph, so the packaging appears exactly as supplied. */
    journey: {
      eyebrow: 'Moringa Capsules',
      title: 'From leaf to daily ritual.',
      intro:
        'For those who want the benefits of moringa without the taste, these easy-to-swallow capsules deliver pure, finely ground moringa leaf powder in a convenient daily dose. No mixing, no mess—just a quick addition to your morning or evening routine. Ideal for on-the-go lifestyles and travel.',
      stages: [
        {
          title: 'Moringa leaves',
          body: 'Where it begins: the moringa leaf.',
          image: '/images/products/moringa-capsules-journey/leaves.webp',
          alt: 'Fresh green moringa leaves on the stem.',
        },
        {
          title: 'Carefully dried',
          body: 'The leaves, dried with care before milling.',
          image: '/images/products/moringa-capsules-journey/dried.webp',
          alt: 'Dried moringa leaves heaped in a wooden bowl.',
        },
        {
          title: 'Finely milled',
          body: 'Ground into a pure, fine leaf powder.',
          image: '/images/products/moringa-capsules-journey/powder.webp',
          alt: 'Finely ground green moringa leaf powder in a stoneware bowl.',
        },
        {
          title: 'Moringa capsules',
          body: 'Easy-to-swallow capsules, in a convenient daily dose.',
          image: '/images/products/moringa-capsules.webp',
          alt: 'A jar of Tatvyra Moringa Capsules, 60 capsules per bottle, on a wooden board with moringa leaves, a bowl of powder and loose capsules.',
          product: true,
        },
        {
          title: 'Daily routine',
          body: 'A quick addition to your morning or evening routine.',
          note: 'No mixing, no mess.',
          image: '/images/products/moringa-capsules-journey/routine.webp',
          alt: 'Moringa capsules in a small wooden bowl, with a few loose beside it.',
        },
      ],
      closing: {
        label: 'On the go',
        body: 'The benefits of moringa, without the taste — ideal for on-the-go lifestyles and travel.',
        statement: 'Easy to swallow. Convenient daily dose.',
        image: '/images/products/moringa-capsules-journey/lifestyle.webp',
        alt: 'Moringa capsules in a wooden dish and loose on a wooden table, beside a spray of fresh moringa leaves.',
      },
    },
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
    /* The format story, in the same row as the capsules and tablets. The
       descriptor above is the only product copy supplied for this SKU, so the
       sequence is about the format and nothing else: no flavour, texture,
       ingredient, dosage or benefit claim. The headline, the stage lines and
       the closing line are editorial, as briefed. Every stage takes the same
       small title and caption as the capsules and tablets, so no stage's
       heading outweighs another's; the one factual caption,
       "An alternative to tablets and capsules", is this SKU's own catalogue
       benefit, and the finale's callout is the descriptor's own opening.

       The four frames are cut from the supplied layout reference, a 1536px
       board with about 345x500 real pixels per shot, enlarged 2x with a
       Lanczos-3 resampler and a light unsharp mask; no detail was added. The
       jar in stage 04 carries the actual label, unaltered, and the finale is
       this SKU's own packshot. Swap in full-size originals when they exist.
       On small screens the order becomes gummy, taste-led, tablets, product. */
    journey: {
      eyebrow: 'The Tatvyra way',
      // A no-break space holds "a little" together, so no line ends on "a".
      title: 'Make daily wellness a little more enjoyable.',
      stages: [
        {
          title: 'The gummy',
          body: 'Moringa, in gummy form.',
          image: '/images/products/moringa-gummies-journey/gummy.webp',
          width: 692,
          height: 922,
          alt: 'Dark green moringa gummies stacked on a pale stone surface, leaves soft in the background.',
        },
        {
          title: 'For those who skip tablets',
          body: 'An alternative to tablets and capsules.',
          image: '/images/products/moringa-gummies-journey/hand.webp',
          width: 676,
          height: 902,
          alt: 'A hand holding a single green gummy between finger and thumb.',
          narrow: 3,
        },
        {
          title: 'Taste-led',
          body: 'A different daily format.',
          image: '/images/products/moringa-gummies-journey/bowl.webp',
          width: 672,
          height: 896,
          alt: 'Green gummies heaped in a speckled stoneware bowl.',
          narrow: 2,
        },
        {
          title: 'The daily format',
          body: 'Another format in the Tatvyra moringa range.',
          image: '/images/products/moringa-gummies-journey/jar.webp',
          width: 706,
          height: 882,
          alt: 'A jar of Tatvyra Organic Moringa Gummies on a wooden board, with two loose gummies and a sprig of moringa leaves in front of it.',
          product: true,
        },
      ],
      finale: {
        lines: ['Moringa,', 'in a format', 'you’ll want to reach for.'],
        callout: 'A taste-led daily format',
        image: '/images/products/moringa-gummies.webp',
        width: 800,
        height: 1000,
        alt: 'A jar of Tatvyra organic moringa gummies on a wooden board with moringa leaves and a bowl of green powder.',
      },
    },
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
    marks: ['clean-label', 'single-origin'],
    price: 449,
    prices: { '250g': 449, '500g': 799 },
    featured: true,
    /* The "Origin & process" band on the product page (ProductOrigin). Copy is
       taken verbatim from the supplied layout reference, benefit lines
       included. The illustrated map, the four photographs and the honey drip
       are cut from that same reference; the map's labels, "INDIA" and the
       tagline are set live by the page instead.

       Positions are in hundredths of the illustration's width (the reference's
       1044px right-hand panel), so everything scales together:
       `photo` is [centre x, centre y, diameter]; `label` is [left, top, and
       its measure in ems], each measure set so no label meets a photograph. */
    origin: {
      eyebrow: 'Origin & process',
      title: ['From', 'India’s'],
      accent: 'Wild Forests',
      intro:
        'Our Wild Forest Honey is sourced from diverse forest flora, where bees collect nectar from a variety of wild blossoms. The result is a dark-coloured, robust flavour honey, naturally rich in minerals and antioxidants.',
      benefitsTitle: 'Naturally good for you',
      benefits: [
        { icon: 'immunity', body: 'Boosts immunity due to strong antibacterial and antimicrobial properties' },
        { icon: 'topical', body: 'Supports faster wound healing when applied topically' },
        { icon: 'antioxidant', body: 'Helps fight free radical damage with high antioxidant content' },
        { icon: 'respiratory', body: 'Traditionally used to relieve cough and cold symptoms' },
        { icon: 'liver', body: 'May support liver detoxification' },
      ],
      tagline: ['Pure honey.', 'Wild origins.', 'Real goodness.'],
      signoff: 'Nature’s finest. From our forests to you.',
      // The painted map of India (IndiaMapArt), seen through `view` — x, y and
      // width in the outline's units; the height follows the stage. Painted
      // forest stands where India's forests are: central India, the hills of
      // Chhattisgarh and Odisha, the Western Ghats, Kerala and the north-east.
      map: {
        view: [-433, -67, 1667],
        alt: 'A painted map of India with forest drawn across its central hills, the Western Ghats and the north-east, dotted bee flight paths crossing it.',
        paintings: [
          { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [110, -60, 560, 349], opacity: 0.55 },
          { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [630, 285, 400, 249], opacity: 0.5 },
          { src: '/images/products/origin-map/forest-large.webp', place: [22.6, 80.6], size: [230, 267] },
          { src: '/images/products/origin-map/forest-east.webp', place: [20.6, 83.8], size: [240, 190] },
          { src: '/images/products/origin-map/forest-east.webp', place: [14.6, 75.2], size: [150, 119], flip: true },
          { src: '/images/products/origin-map/palms.webp', place: [10.2, 76.5], size: [80, 87] },
          { src: '/images/products/origin-map/forest-large.webp', place: [25.9, 92.8], size: [120, 139], flip: true, opacity: 0.9 },
        ],
      },
      country: { label: 'India', at: [45.1, 48] },
      points: [
        {
          title: 'Diverse forest flora',
          body: 'Bees gather nectar from a variety of wild blossoms in pristine forests.',
          image: '/images/products/wild-forest-honey-origin/flora.webp',
          alt: 'Forested hills under drifting morning mist.',
          photo: [10.63, 18.77, 16.86],
          label: [-1.5, 27.78, 10],
          // The central Indian forests.
          place: [22.2, 80.2],
        },
        {
          title: 'Natural nectar',
          body: 'Collected from wild, untouched flora.',
          image: '/images/products/wild-forest-honey-origin/nectar.webp',
          alt: 'Clusters of small white blossoms on a flowering branch.',
          photo: [62.7, 12.3, 12.93],
          label: [71.8, 6.4, 12],
          // The forests of the north-east.
          place: [25.8, 92.6],
          bend: -0.18,
        },
        {
          title: 'Raw & unprocessed',
          body: 'Carefully collected and minimally handled to preserve its natural goodness.',
          image: '/images/products/wild-forest-honey-origin/raw.webp',
          alt: 'Golden honey running over the edge of a wooden board.',
          photo: [21.5, 58, 14.56],
          label: [12.2, 66.5, 13],
          // The Western Ghats.
          place: [14.4, 75.1],
          bend: -0.12,
        },
        {
          title: 'Rich & robust',
          body: 'A dark-coloured honey with a distinct, full-bodied flavour, naturally rich in minerals and antioxidants.',
          image: '/images/products/wild-forest-honey-origin/robust.webp',
          alt: 'Dark honey falling in a thread into a pool of honey.',
          photo: [84, 47, 15.13],
          label: [81, 56.2, 8.8],
          // The forested hills of Odisha and Chhattisgarh.
          place: [20.4, 83.6],
        },
      ],
      drip: '/images/products/wild-forest-honey-origin/drip.webp',
    },
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
    marks: ['clean-label', 'single-origin'],
    price: 399,
    prices: { '250g': 399, '500g': 699 },
    /* The "Origin & process" map on the product page (ProductOriginMap). Copy
       is verbatim from the supplied layout reference, benefit lines included.
       The four photographs are cut from that reference; the map itself is
       drawn from India's official boundary (src/lib/indiaMap.js).

       REGIONS ARE ILLUSTRATIVE. The reference names no sourcing regions, so
       each bloom is pinned where that flower is typically found in India.
       Confirm or replace `region` and `place` with the actual sourcing
       regions before launch.

       `place` is [latitude, longitude]. `circle` is [x, y, radius] on the
       map's 1000-unit-wide drawing, and `view` is the window onto that drawing
       the section shows: [x, y, width, height]. `align` sets which side of its
       photograph a label hangs from. */
    originMap: {
      eyebrow: 'Origin & process',
      title: ['From', 'India’s'],
      accent: ['Diverse', 'Blooms'],
      intro:
        'Our Multifloral Honey is a blend of nectar from multiple flower sources across India, creating a naturally balanced honey with a rich flavour and nutrient profile.',
      country: 'India',
      hint: 'Hover over the map to explore',
      view: [-230, -40, 1260, 1210],
      // Painted over the map, in the outline's units: the Himalaya across the
      // north, a stand of forest in Chhattisgarh and palms in Kerala.
      paintings: [
        { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [120, -30, 470, 293], opacity: 0.9 },
        { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [640, 300, 380, 237], opacity: 0.75 },
        { src: '/images/products/origin-map/forest-large.webp', place: [22.2, 83.0], size: [120, 139], opacity: 0.75 },
        { src: '/images/products/origin-map/palms.webp', place: [9.9, 76.6], size: [62, 67], opacity: 0.8 },
      ],
      points: [
        {
          title: 'Varied flora',
          body: 'Nectar from multiple flower sources across different regions.',
          region: 'Himalayan foothills',
          place: [31.96, 77.11],
          image: '/images/products/multifloral-honey-origin/blossom.webp',
          alt: 'White blossom on a flowering branch.',
          circle: [-60, 170, 128],
          align: 'start',
        },
        {
          title: 'Natural process',
          body: 'Bees collect nectar from a variety of flowers in their natural habitat.',
          region: 'Western Ghats',
          place: [17.72, 73.82],
          image: '/images/products/multifloral-honey-origin/wildflowers.webp',
          alt: 'Purple wildflowers in a meadow.',
          circle: [-50, 880, 128],
          align: 'start',
        },
        {
          title: 'Natural blend',
          body: 'A natural blend of seasonal blossoms.',
          region: 'Deccan plateau',
          place: [16.2, 77.36],
          image: '/images/products/multifloral-honey-origin/sunflowers.webp',
          alt: 'Sunflowers in bloom in a field.',
          circle: [650, 960, 128],
          align: 'start',
        },
        {
          title: 'Rich & balanced',
          body: 'A naturally balanced honey with a smooth flavour and nutrient profile.',
          region: 'Across India',
          place: [22.5, 79.2],
          image: '/images/products/multifloral-honey-origin/honey.webp',
          alt: 'Golden honey running from a wooden dipper into a glass bowl.',
          circle: [880, 105, 128],
          align: 'end',
        },
      ],
      tagline: ['Pure honey.', 'Wild origins.', 'Real goodness.'],
      about: {
        title: 'Multifloral honey',
        body: 'Blend of nectar from multiple flower sources. Balanced flavour and nutrient profile.',
      },
      goodness: {
        title: 'Natural goodness',
        lead: 'Benefits:',
        items: [
          'Soothes sore throat and calms coughing',
          'Aids digestion and supports gut health',
          'Provides quick, natural energy boost',
          'Helps balance seasonal allergies (local pollen exposure theory)',
          'Supports skin health when used in face packs or masks',
        ],
      },
      drip: '/images/products/wild-forest-honey-origin/drip.webp',
    },
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
    marks: ['clean-label', 'single-origin'],
    price: 599,
    prices: { '250g': 599, '500g': 1049 },
    // The illustrated benefit map. The drawing is the brand's infographic with
    // its lettering lifted out; the words below are set live over it. `at` is
    // where a label's first capital sits: left edge and top, as percentages of
    // the drawing's width and height. `lines` keeps the drawing's line breaks.
    //
    // `hotspot` makes a benefit explorable on the drawing, measured in the
    // drawing's own pixels (1605 × 980). `drop` is its honey drop and `ring`
    // its icon, each [cx, cy, r]. `route` is traced over the drawn line in the
    // order the story runs: from where the line starts on the map (`source`,
    // where that is out on the paper), through the honey, to the icon. `card`
    // pins a corner of the benefit's card — 't'/'b' then 'l'/'r' — to a point
    // clear of its route, for wide screens. `title` and `detail` fill the card.
    // `drops` are the other drops along the range, which only breathe in.
    benefitMap: {
      title: 'Himalayan Honey',
      notes: [
        ['Harvested from high-altitude', 'regions'],
        ['Thicker consistency,', 'mineral-dense'],
      ],
      image: {
        src: '/images/products/himalayan-honey-map/map.webp',
        width: 1605,
        height: 980,
        alt: 'A hand-drawn map of the Himalaya on torn paper, drops of honey set along the range, a line running from each drop to one of the benefits.',
      },
      benefits: [
        {
          icon: '/images/products/himalayan-honey-map/respiratory.webp',
          lines: ['Supports respiratory', 'health and eases', 'breathing issues'],
          at: [66.48, 12.76],
          title: 'Respiratory support',
          detail: 'Long taken warm for the throat and chest.',
          hotspot: {
            drop: [899, 277.5, 37.5],
            ring: [994, 159.5, 52.5],
            source: [736, 411],
            route:
              'M736 411C739.1 408 749 399.5 754.9 393.2C760.7 386.8 765.9 379.8 771.1 372.9C776.3 366 781.2 358.8 786.1 351.7C791.1 344.6 795.9 337.4 800.9 330.3C806 323.3 811 316.2 816.4 309.4C821.7 302.6 825.9 296 833.1 289.5C840.3 283 851.6 278.2 859.5 270.4C867.4 262.5 875.7 251.1 880.5 242.4C885.3 233.7 884.2 225.2 888.5 217.9C892.7 210.7 899.2 204 906 198.9C912.7 193.8 922.4 189.7 929.1 187.2C935.7 184.7 943.2 184.5 946 184',
            card: [778, 352, 'br'],
          },
        },
        {
          icon: '/images/products/himalayan-honey-map/minerals.webp',
          lines: ['Rich in trace minerals', 'that support bone and', 'metabolic health'],
          at: [80.12, 29.49],
          title: 'Trace minerals',
          detail: 'From high-altitude flora, denser in minerals.',
          hotspot: {
            drop: [948, 429.5, 34],
            ring: [1211, 320.5, 53],
            source: [977, 492],
            route:
              'M977 492C978.3 487.9 981.6 475.2 984.8 467.2C988 459.2 991.9 451.4 996.2 443.9C1000.5 436.4 1005.4 429.1 1010.7 422.3C1016 415.5 1022 409.1 1028.2 403.2C1034.5 397.2 1041.3 391.7 1048.3 386.6C1055.3 381.6 1062.6 376.9 1070.2 372.6C1077.7 368.4 1085.5 364.5 1093.5 361.2C1101.4 357.8 1109.7 354.9 1118 352.4C1126.3 350 1135.9 348.1 1143.3 346.6C1150.7 345.1 1159.2 344.1 1162.4 343.6',
            card: [984, 510, 'tl'],
          },
        },
        {
          icon: '/images/products/himalayan-honey-map/heart.webp',
          lines: ['Traditionally used', 'to support', 'heart health'],
          at: [84.74, 64.69],
          title: 'Heart health',
          detail: 'A daily spoonful in the Ayurvedic tradition.',
          hotspot: {
            drop: [1266, 551, 37],
            ring: [1291, 668.5, 52],
            source: [1216, 473],
            route:
              'M1216 473C1217.7 476.2 1223.2 487.2 1226.2 492.3C1229.1 497.5 1231.3 499.7 1233.9 504C1236.4 508.3 1236.8 510 1241.5 518C1246.2 526 1255.4 540.8 1262 552C1268.6 563.2 1277.5 577.5 1281.2 584.9C1284.8 592.3 1283 592.7 1283.9 596.6C1284.8 600.5 1285.9 604.9 1286.7 608.3C1287.5 611.7 1288.6 615.5 1289 617',
            card: [1216, 532, 'tr'],
          },
        },
        {
          icon: '/images/products/himalayan-honey-map/stamina.webp',
          lines: ['Helps improve stamina', 'and reduce fatigue'],
          at: [48.1, 76.43],
          title: 'Stamina',
          detail: 'A spoonful before a long day or a mountain walk.',
          hotspot: {
            drop: [917, 544, 37.5],
            ring: [698.5, 768, 53],
            route:
              'M917 544C908.3 548.8 874.9 564.1 864.6 573C854.3 581.8 858.7 589.3 855.4 597.3C852.1 605.3 848.7 613.3 844.7 621C840.8 628.7 836.3 636.1 831.5 643.3C826.7 650.5 821.5 657.5 816 664.2C810.5 670.9 804.7 677.4 798.5 683.4C792.4 689.5 785.8 695.3 779 700.5C772.1 705.8 762.8 711.5 757.3 714.9C751.8 718.3 747.9 720 746 721',
            card: [970, 530, 'tl'],
          },
        },
        {
          icon: '/images/products/himalayan-honey-map/energy.webp',
          lines: ['Provides sustained,', 'slow-release energy'],
          at: [14.77, 73.37],
          title: 'Sustained energy',
          detail: 'Thick and raw, for energy that lasts.',
          hotspot: {
            drop: [393, 627.5, 49],
            ring: [164.5, 728.5, 52.5],
            route:
              'M535 457C530.7 457.3 517.7 457.2 509.4 459C501.1 460.9 492.9 464.5 485 468C477.1 471.5 469.4 475.6 462 480.1C454.6 484.5 447.5 489.6 440.7 495C434 500.4 427.6 506.4 421.7 512.7C415.8 519 410.2 525.7 405.3 532.8C400.4 539.9 395.8 547.7 392.3 555.3C388.8 562.9 387.6 567.7 384.3 578.5C380.9 589.2 376.8 606.5 372 620C367.2 633.5 361.4 650.1 355.4 659.6C349.4 669.1 343.1 671.9 336.1 676.9C329.1 681.9 321.4 686.2 313.5 689.7C305.7 693.3 297.3 696 288.9 698.1C280.6 700.2 272 701.6 263.3 702.4C254.7 703.2 241.4 702.9 237 703',
            card: [330, 604, 'br'],
          },
        },
      ],
      drops: [
        [562.5, 454, 27],
        [645.5, 474.5, 20],
        [677.5, 400, 35],
        [702, 509.5, 19.5],
        [764.5, 531.5, 21.5],
      ],
    },
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
    marks: ['clean-label', 'single-origin'],
    price: 699,
    prices: { '250g': 699, '500g': 1249 },
    // "Origin & process" (ProductOriginTrail). Copy is the brand's layout
    // reference, verbatim. The map is India's official outline, and every
    // position is in its units (see src/lib/indiaMap.js): the source pin from
    // its latitude and longitude, the photographs (`circle`: centre and
    // radius) and labels (`label`: left, top, width) around it within `view`.
    // Each route runs from its photograph to the pin on Kashmir.
    originTrail: {
      eyebrow: 'Origin & process',
      title: ['From', 'Kashmir’s'],
      accent: ['White Acacia', 'Blossoms'],
      intro:
        'Our Kashmiri White Acacia Honey is sourced from the pristine valleys of Kashmir, where White Acacia trees bloom in untouched landscapes, producing a light-coloured honey with a naturally delicate floral taste.',
      tagline: 'Pure honey. Wild origins. Real goodness.',
      hint: 'Hover over the map to explore',
      mapLabel: 'Map of India: every point leads back to Kashmir, where this honey comes from',
      drip: '/images/products/wild-forest-honey-origin/drip.webp',
      sprig: '/images/products/kashmiri-white-acacia-honey-origin/sprig.webp',
      // The Himalaya, painted, laid over the north in the outline's units:
      // across Jammu & Kashmir, Ladakh, Himachal and Uttarakhand, and again
      // along Sikkim and Arunachal. The map masks it to India's border.
      paintings: [
        { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [110, -60, 560, 349] },
        { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [320, 130, 330, 206], opacity: 0.85 },
        { src: '/images/products/kashmiri-white-acacia-honey-origin/himalaya.webp', at: [630, 285, 400, 249], opacity: 0.9 },
      ],
      view: [-250, -40, 1600, 1175],
      // Srinagar, in the Kashmir valley.
      // The label sits up and to the left of the pin, on the paper beside the
      // border, clear of the ranges and of the routes arriving.
      source: { label: 'Kashmir', place: [34.08, 74.8], labelAt: [-20, -30] },
      country: { label: 'India', place: [23.0, 78.8] },
      hintAt: [-230, 1105],
      points: [
        {
          title: 'Kashmir origin',
          body: ['Kashmir’s pristine valleys with thriving White Acacia blossoms.'],
          image: '/images/products/kashmiri-white-acacia-honey-origin/kashmir-origin.webp',
          alt: 'White acacia blossoms on a branch in sunlight.',
          circle: [-110, 175, 120],
          label: [-230, 318, 320],
          bend: 0.1,
        },
        {
          title: 'Natural process',
          body: ['Nectar is collected by bees from White Acacia blossoms in untouched forests.'],
          image: '/images/products/kashmiri-white-acacia-honey-origin/natural-process.webp',
          alt: 'A wooden hive frame of capped honeycomb with bees on it, lifted in a meadow.',
          circle: [-110, 710, 120],
          label: [-210, 858, 340],
          bend: 0.12,
        },
        {
          title: 'Distinct character',
          body: ['Light-coloured, mild and delicate flavour.', 'High fructose content, resists crystallisation.'],
          image: '/images/products/kashmiri-white-acacia-honey-origin/distinct-character.webp',
          alt: 'Pale golden honey running from a wooden dipper into a jar.',
          circle: [730, 150, 120],
          label: [878, 72, 345],
          bend: 0.12,
        },
        {
          title: 'Natural goodness',
          list: {
            title: 'Benefits:',
            items: [
              'Gentle on the stomach, ideal for sensitive digestion',
              'Helps regulate blood sugar due to low glycaemic impact',
              'Soothes acidity and supports gut lining health',
              'Natural sweetener alternative for tea, milk, and desserts',
              'May help improve sleep quality when taken before bed',
            ],
          },
          image: '/images/products/kashmiri-white-acacia-honey-origin/natural-goodness.webp',
          alt: 'A glass cup of honey-sweetened tea beside a sprig of white acacia blossom.',
          circle: [880, 735, 120],
          label: [1022, 590, 330],
          bend: -0.1,
        },
      ],
    },
  },
]

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug)

/**
 * The benefits a product page lists, read through here rather than from
 * `benefits` directly. Where one of the page's own sections sets out the
 * product's benefits — the honeys' origin and benefit maps — that list is the
 * only one: the buy box shows it too, so a page never states two different
 * sets. `fromCatalogue` says whether the list is the catalogue's own.
 */
export function benefitsFor(product) {
  const section =
    product.origin?.benefits?.map((benefit) => benefit.body) ??
    product.originMap?.goodness?.items ??
    product.benefitMap?.benefits?.map((benefit) => benefit.lines.join(' ')) ??
    product.originTrail?.points.find((point) => point.list)?.list.items
  return section
    ? { items: section, fromCatalogue: false }
    : { items: product.benefits ?? [], fromCatalogue: true }
}

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
