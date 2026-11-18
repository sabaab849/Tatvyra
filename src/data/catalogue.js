/**
 * Product data transcribed verbatim from Tatvyra "Catalogue V7".
 * Sizes and key benefits are exactly as printed, except the raw honeys: each
 * has one benefit list, in its origin or benefit map, which its whole product
 * page shows (see benefitsFor). Ingredient lists, nutrition
 * tables and reviews do not exist in the supplied material, so those fields are
 * intentionally empty and the UI omits them rather than inventing them.
 *
 * PRICES are the "MRP (₹)" column of Tatvyra's price structure ("FFC /
 * TATVYRA – PRICE STRUCTURE: OUR COST → DISTRIBUTOR → RETAILER → MRP"), one
 * per pack size, transcribed exactly. That column is the only source for the
 * customer price. The MRP includes GST, and the site charges it as listed —
 * on cards, the product page, the cart and checkout — with no markup, tax or
 * delivery added. The sheet's other columns ("Final MRP", landed cost,
 * distributor and retailer margins, profit) are internal costing and are
 * deliberately not used here. That sheet lists eighteen
 * packs; the products it does not list (the multifloral and Kashmiri
 * honeys) are PLACEHOLDERS derived from it: the same size step
 * between packs, anchored to the price of the nearest product the sheet does
 * carry, keeping each one's position against that sibling, taken back off
 * GST and rounded to the rupee. They are marked
 * with priceTbc and the product page calls them indicative, because Tatvyra
 * has not priced them.
 *
 * `price` is the canonical unit price, and is the price of the first size.
 * A product sold in several sizes also carries `prices`, with one entry per
 * entry in `sizes`. Read both through priceFor() rather than reaching for
 * either directly, so one product and size can never be priced two ways.
 */

export const CATEGORIES = [
  {
    slug: 'moringa',
    number: '01',
    name: 'Moringa',
    teaser: 'Traditional superfood in convenient everyday formats.',
    description:
      'Moringa in powder, tablet & capsule formats, bringing a nutrient-rich traditional superfood into everyday routines.',
    image: '/images/cat-moringa.webp',
    imageAlt: 'Finely milled Tatvyra moringa leaf powder in an open tin with a wooden scoop.',
    accent: 'lilac',
    /* About the ingredient itself, as supplied for the moringa range, so it is
       held once here and every moringa product page shows the same four lines,
       beside that SKU's own catalogue benefits. */
    highlights: {
      title: 'Why Moringa',
      points: [
        'Moringa has 100+ bioactive plant compounds in a single leaf',
        'Rich in iron, calcium, and vitamin C for daily vitality',
        'High in antioxidants (flavonoids, polyphenols)',
        'Traditional Ayurvedic use for immunity and vitality',
      ],
    },
  },
  {
    slug: 'spirulina',
    number: '02',
    name: 'Spirulina',
    teaser: 'Plant-based spirulina crafted for everyday nutrition.',
    description:
      'Plant-based spirulina in powder & capsule formats, crafted for convenient everyday nutrition.',
    image: '/images/cat-spirulina.webp',
    imageAlt: 'Deep green Tatvyra spirulina powder heaped in a speckled ceramic bowl.',
    accent: 'lilac',
    /* About the ingredient itself, as supplied for the spirulina range, so it
       is held once here and every spirulina product page shows the same four
       lines, beside that SKU's own catalogue benefits. */
    highlights: {
      title: 'Why Spirulina',
      points: [
        'Spirulina is among the most protein-dense whole foods available',
        'Rich in B vitamins for everyday energy metabolism',
        'High in phycocyanin and chlorophyll antioxidant pigments',
        'A genuine plant protein source',
      ],
    },
  },
  {
    slug: 'nut-butters',
    number: '03',
    name: 'Nut Butters',
    // Short line for the homepage category grid.
    teaser: 'Peanut butters milled into honest spreads.',
    // Verbatim catalogue description.
    description:
      'Peanut butters milled with no hydrogenated oils or preservatives.',
    image: '/images/cat-nut-butters.webp',
    imageAlt: 'A stoneware bowl of Tatvyra creamy peanut butter with a spoonful lifted from it, beside toast.',
    accent: 'peach',
  },
  {
    slug: 'raw-honey',
    number: '04',
    name: 'Raw Honey',
    teaser: 'Single-origin honeys from distinct natural harvests.',
    description:
      'Three single-origin honeys, from dense forest florals to pale Kashmiri acacia.',
    image: '/images/cat-raw-honey.webp',
    imageAlt: 'Raw honey running from a piece of honeycomb.',
    accent: 'peach',
  },
]

export const PRODUCTS = [
  // 01 — MORINGA
  {
    sku: 'TAT-MO01',
    slug: 'moringa-leaf-powder',
    name: 'Moringa Leaf Powder',
    category: 'moringa',
    format: 'Powder',
    image: '/images/products/packs/moringa-leaf-powder-1.webp',
    images: [
      {
        src: '/images/products/packs/moringa-leaf-powder-1.webp',
        alt: 'A pouch of Tatvyra Natural Moringa Powder on a table with nuts, a glass of water and fresh leaves.',
      },
      {
        src: '/images/products/packs/moringa-leaf-powder-2.webp',
        alt: 'A scoop of green moringa powder lifted from an open pouch of Tatvyra Natural Moringa Powder, nuts and water beside it.',
      },
      {
        src: '/images/products/packs/moringa-leaf-powder-3.webp',
        alt: 'A scoop of green moringa powder lifted from an open pouch of Tatvyra Natural Moringa Powder.',
      },
      {
        src: '/images/products/packs/moringa-leaf-powder-4.webp',
        alt: 'A scoop tipping moringa powder into a glass of water beside a pouch of Tatvyra Natural Moringa Powder.',
      },
      {
        src: '/images/products/packs/moringa-leaf-powder-5.webp',
        alt: 'A heaped scoop of green moringa powder held over an open pouch of Tatvyra Natural Moringa Powder.',
      },
    ],
    descriptor: 'Moringa leaf, milled fine. Stir it into whatever you already drink.',
    // The supplied product description, verbatim. The story below breaks the
    // same copy into its stages; this is the paragraph as written.
    description:
      'Finely milled moringa leaf powder with naturally preserved nutrients and an earthy flavour, perfect for smoothies, juices, soups, and everyday recipes.',
    sizes: ['100g pouch'],
    benefits: [
      '100+ Bioactive plant compounds',
      'Iron + Vitamin C',
      'Antioxidant-rich',
      'Gluten free',
    ],
    marks: ['gluten-free'],
    price: 285,
    featured: true,
    // The process story (ProductStory). Every line is lifted verbatim from the
    // supplied copy; nothing here names a drying or milling technique, a
    // source, or a benefit that copy does not state. Alt text describes only
    // what each photograph shows.
    story: {
      eyebrow: 'Moringa Powder',
      title: 'Carefully Dried and Finely Milled.',
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
          image: '/images/products/packs/moringa-leaf-powder-1.webp',
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
    image: '/images/products/packs/moringa-acv-effervescent-tablets-1.webp',
    images: [
      {
        src: '/images/products/packs/moringa-acv-effervescent-tablets-1.webp',
        alt: 'A tube of Tatvyra Moringa ACV Tablets on a kitchen counter with green apples and a glass of the drink.',
      },
      {
        src: '/images/products/packs/moringa-acv-effervescent-tablets-2.webp',
        alt: 'A hand tipping a tablet from a tube of Tatvyra Moringa ACV Tablets into a glass of water.',
      },
      {
        src: '/images/products/packs/moringa-acv-effervescent-tablets-3.webp',
        alt: 'A tablet in an open palm beside a tube of Tatvyra Moringa ACV Tablets and a glass of the drink.',
      },
      {
        src: '/images/products/packs/moringa-acv-effervescent-tablets-4.webp',
        alt: 'A tube of Tatvyra Moringa ACV Tablets beside a bowl of yoghurt and fruit, green apples behind.',
      },
    ],
    descriptor: 'Apple cider vinegar and moringa in one fast-dissolving tablet.',
    // The full supplied description. The PDP shows this in the descriptor's slot;
    // cards keep the one-line descriptor above so the grid stays even.
    description:
      'A refreshing twist on two wellness staples, apple cider vinegar and moringa, combined into a fizzy, fast-dissolving tablet. Simply drop one into water for a tangy, energizing drink that fits easily into a busy day. A convenient alternative for those who find liquid ACV difficult to tolerate.',
    sizes: ['15 tabs / pack'],
    benefits: [
      'ACV + Moringa in one fast-dissolving tablet',
      'Digestion support',
      'Portable single-dose',
    ],
    marks: [],
    price: 250,
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
            image: '/images/products/packs/moringa-acv-effervescent-tablets-1.webp',
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
        alt: 'The Tatvyra green products together (moringa leaf powder, tablets, capsules, gummies and spirulina) around bowls of green powder.',
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
      title: 'From Moringa Leaf Powder to a Compact Daily Form.',
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
    sizes: ['60 tabs x 500mg'],
    benefits: ['Compressed daily-dose format', 'Same benefits as leaf powder'],
    marks: [],
    price: 250,
  },
  {
    sku: 'TAT-MO04',
    slug: 'moringa-capsules',
    name: 'Moringa Capsules',
    category: 'moringa',
    format: 'Capsules',
    image: '/images/products/packs/moringa-capsules-1.webp',
    images: [
      {
        src: '/images/products/packs/moringa-capsules-1.webp',
        alt: 'A bottle of Tatvyra Moringa Capsules on a desk beside a laptop, a plant and a bowl of dried fruit.',
      },
      {
        src: '/images/products/packs/moringa-capsules-2.webp',
        alt: 'A bottle of Tatvyra Moringa Capsules beside a breakfast plate and a glass of orange juice.',
      },
      {
        src: '/images/products/packs/moringa-capsules-3.webp',
        alt: 'A hand lifting a capsule from an open bottle of Tatvyra Moringa Capsules on a desk.',
      },
      {
        src: '/images/products/packs/moringa-capsules-4.webp',
        alt: 'A hand holding a bottle of Tatvyra Moringa Capsules over a desk with a laptop.',
      },
      {
        src: '/images/products/packs/moringa-capsules-5.webp',
        alt: 'Hands opening a bottle of Tatvyra Moringa Capsules at a desk.',
      },
    ],
    descriptor: 'The leaf powder, encapsulated. No taste, no measuring.',
    // The supplied product description, verbatim, as the tablets and the
    // effervescent carry theirs. The journey band below draws its stages from
    // this copy rather than repeating the paragraph.
    description:
      'For those who want the benefits of moringa without the taste, these easy-to-swallow capsules deliver pure, finely ground moringa leaf powder in a convenient daily dose. No mixing, no mess: just a quick addition to your morning or evening routine. Ideal for on-the-go lifestyles and travel.',
    /* The "from leaf to daily ritual" band on the product page. Every line is
       taken from the copy supplied for this SKU: no nutritional, medical,
       dosage, sourcing or process claim goes beyond it, and the drying stage
       names no technique because none was given. Stages 01, 02, 03 and 05 use
       photographs from the supplied layout reference; stage 04 is this SKU's
       own product photograph, so the packaging appears exactly as supplied. */
    journey: {
      eyebrow: 'Moringa Capsules',
      title: 'From Leaf to Daily Ritual.',
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
          image: '/images/products/packs/moringa-capsules-1.webp',
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
        body: 'The benefits of moringa, without the taste. Ideal for on-the-go lifestyles and travel.',
        statement: 'Easy to swallow. Convenient daily dose.',
        image: '/images/products/moringa-capsules-journey/lifestyle.webp',
        alt: 'Moringa capsules in a wooden dish and loose on a wooden table, beside a spray of fresh moringa leaves.',
      },
    },
    sizes: ['60 caps x 400mg'],
    benefits: ['Encapsulated daily-dose format', 'Same benefits as leaf powder'],
    marks: [],
    price: 300,
  },
  {
    sku: 'TAT-MO05',
    slug: 'moringa-gummies',
    name: 'Moringa Gummies',
    category: 'moringa',
    format: 'Gummies',
    image: '/images/products/packs/moringa-gummies-1.webp',
    images: [
      {
        src: '/images/products/packs/moringa-gummies-1.webp',
        alt: 'A tub of Tatvyra Sugar Free Moringa Gummies on a yoga mat with dumbbells and loose gummies.',
      },
      {
        src: '/images/products/packs/moringa-gummies-2.webp',
        alt: 'A tub of Tatvyra Moringa Gummies on a yoga mat beside dumbbells, a tennis ball and gummies.',
      },
      {
        src: '/images/products/packs/moringa-gummies-3.webp',
        alt: 'A hand taking a gummy from an open tub of Tatvyra Moringa Gummies.',
      },
      {
        src: '/images/products/packs/moringa-gummies-4.webp',
        alt: 'A hand taking a gummy from an open tub of Tatvyra Moringa Gummies, the lid set aside.',
      },
      {
        src: '/images/products/packs/moringa-gummies-5.webp',
        alt: 'A hand lifting a tub of Tatvyra Moringa Gummies out of a gym bag.',
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
      title: 'Make Daily Wellness a Little More Enjoyable.',
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
          body: 'Another format of Tatvyra moringa.',
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
        image: '/images/products/packs/moringa-gummies-1.webp',
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
    marks: [],
    price: 450,
    isNew: true,
  },

  // 02 — SPIRULINA
  {
    sku: 'TAT-SP01',
    slug: 'spirulina-powder',
    name: 'Spirulina Powder',
    category: 'spirulina',
    format: 'Powder',
    image: '/images/products/packs/spirulina-powder-1.webp',
    images: [
      {
        src: '/images/products/packs/spirulina-powder-1.webp',
        alt: 'A pouch of Tatvyra Natural Spirulina Powder on a table with nuts, a glass of water and fresh leaves.',
      },
      {
        src: '/images/products/packs/spirulina-powder-2.webp',
        alt: 'A scoop of blue-green spirulina powder lifted from an open pouch of Tatvyra Natural Spirulina Powder, nuts and water beside it.',
      },
      {
        src: '/images/products/packs/spirulina-powder-3.webp',
        alt: 'A scoop of blue-green spirulina powder lifted from an open pouch of Tatvyra Natural Spirulina Powder.',
      },
      {
        src: '/images/products/packs/spirulina-powder-4.webp',
        alt: 'A scoop tipping spirulina powder into a glass of water beside a pouch of Tatvyra Natural Spirulina Powder.',
      },
      {
        src: '/images/products/packs/spirulina-powder-5.webp',
        alt: 'A heaped scoop of blue-green spirulina powder held over an open pouch of Tatvyra Natural Spirulina Powder.',
      },
    ],
    descriptor: 'Dense, deep-green spirulina for smoothies and everyday mixing.',
    sizes: ['100g pouch'],
    benefits: [
      'Extremely protein-dense',
      'Rich in B-vitamins (B1, B2, B3, B6, B9)',
      'Iron & magnesium',
    ],
    marks: ['nutrition-forward'],
    price: 350,
    featured: true,
  },
  {
    sku: 'TAT-SP03',
    slug: 'spirulina-capsules',
    name: 'Spirulina Capsules',
    category: 'spirulina',
    format: 'Capsules',
    image: '/images/products/packs/spirulina-capsules-1.webp',
    images: [
      {
        src: '/images/products/packs/spirulina-capsules-1.webp',
        alt: 'A bottle of Tatvyra Spirulina Capsules beside a breakfast plate and a glass of orange juice.',
      },
      {
        src: '/images/products/packs/spirulina-capsules-2.webp',
        alt: 'A hand lifting a capsule from an open bottle of Tatvyra Spirulina Capsules on a desk.',
      },
      {
        src: '/images/products/packs/spirulina-capsules-3.webp',
        alt: 'A bottle of Tatvyra Spirulina Capsules on a desk beside a laptop, a plant and a bowl of dried fruit.',
      },
      {
        src: '/images/products/packs/spirulina-capsules-4.webp',
        alt: 'A hand holding a bottle of Tatvyra Spirulina Capsules over a desk with a laptop.',
      },
    ],
    descriptor: 'The powder, encapsulated. Straightforward to take daily.',
    sizes: ['60 caps x 500mg'],
    benefits: ['Encapsulated daily-dose format', 'Same benefits as powder'],
    marks: [],
    price: 380,
  },

  // 03 — NUT BUTTERS
  {
    sku: 'TAT-NB01',
    slug: 'natural-peanut-butter-creamy',
    name: 'Natural Peanut Butter Creamy',
    category: 'nut-butters',
    format: 'Spread',
    image: '/images/products/packs/natural-peanut-butter-creamy-1.webp',
    images: [
      {
        src: '/images/products/packs/natural-peanut-butter-creamy-1.webp',
        alt: 'A jar of Tatvyra Natural Peanut Butter Creamy on a green checked cloth, with creamy toast and a bowl of oats.',
      },
      {
        src: '/images/products/packs/natural-peanut-butter-creamy-2.webp',
        alt: 'A spoon lifting creamy peanut butter from an open jar of Tatvyra Natural Peanut Butter Creamy, its lid beside it.',
      },
      {
        src: '/images/products/packs/natural-peanut-butter-creamy-3.webp',
        alt: 'Hands spreading Tatvyra Natural Peanut Butter Creamy on toast topped with banana slices, the jar beside the plate.',
      },
      {
        src: '/images/products/packs/natural-peanut-butter-creamy-4.webp',
        alt: 'A spoonful of Tatvyra Natural Peanut Butter Creamy ribboning back into the open jar.',
      },
      {
        src: '/images/products/packs/natural-peanut-butter-creamy-nutrition.webp',
        alt: 'The label of Tatvyra Natural Peanut Butter Creamy showing nutrition information per 100g and per serve, ingredients (roasted peanuts 100%) and allergens (peanuts, soy).',
      },
    ],
    descriptor: 'Peanuts, milled creamy. Nothing hydrogenated, nothing added.',
    /* What the label says and does not say, as supplied for this SKU, set
       verbatim. The product page lists them under the catalogue benefits. */
    claims: [
      {
        label: 'Single Ingredient',
        body: 'Often made with 100% roasted peanuts and no other additives.',
      },
      {
        label: 'No Added Oils',
        body: 'Contains zero palm oil or hydrogenated vegetable oils.',
      },
      {
        label: 'No Preservatives',
        body: 'Contains no chemical preservatives, stabilizers, or emulsifiers',
      },
    ],
    sizes: ['250g', '500g', '1000g'],
    benefits: [
      'High-protein (~25g/100g)',
      'No hydrogenated oils',
      'Rich in Vitamin E, Magnesium & Potassium',
    ],
    marks: ['nutrition-forward'],
    /* Long-form ingredients-and-benefits block for the product page. Only
       this SKU has one so far; the section renders when it is present. */
    spotlight: {
      eyebrow: 'Ingredients and benefits',
      title: 'Goodness in Every Spoon.',
      intro:
        'Made with simple, real ingredients, our Natural Peanut Butter is packed with plant-based protein, healthy fats and essential nutrients. Nothing more, nothing less.',
      image: '/images/products/peanut-butter-spoon.webp',
      imageAlt:
        'An open jar of Tatvyra natural peanut butter photographed from above on a stone slab, ringed with whole and shelled peanuts.',
      benefits: [
        { icon: 'protein', title: 'High Protein', body: '~25g per 100g' },
        {
          icon: 'nothing-added',
          title: 'No Hydrogenated Oils',
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
      title: 'Make It Your Way',
      body:
        'Spooned over apple, spread across toast, or taken straight from the jar. The same creamy mill either way: nothing hydrogenated, nothing added.',
      image: '/images/products/peanut-butter-triptych-1400.webp',
      imageAlt:
        'Three panels for Tatvyra Natural Peanut Butter Creamy: poured from a spoon over a bowl of apple slices on the jar, the open jar beside its lid and apple-topped toast, and the jar mid-air among peanuts, apple peel and a swirl of peanut butter.',
    },
    /* Answers are held to what this catalogue states about the SKU — no
       storage, shelf-life or sourcing claims it does not make. */
    faq: [
      {
        q: 'What is actually in it?',
        a: 'Peanuts, milled creamy. No hydrogenated oils and no preservatives, the same standard held across every product.',
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
        q: 'What sizes does it come in?',
        a: 'Three jar sizes: 250g, 500g and 1000g.',
      },
      {
        q: 'Is every jar size the same price?',
        a: 'No. Each size is priced on its own, and the price updates when you change size. The 1000g jar works out cheapest per gram.',
      },
    ],
    price: 140,
    prices: { '250g': 140, '500g': 300, '1000g': 506 },
    featured: true,
  },
  {
    sku: 'TAT-NB02',
    slug: 'chocolate-peanut-butter',
    name: 'Chocolate Peanut Butter Crunchy',
    category: 'nut-butters',
    format: 'Spread',
    image: '/images/products/packs/chocolate-peanut-butter-1.webp',
    images: [
      {
        src: '/images/products/packs/chocolate-peanut-butter-1.webp',
        alt: 'A jar of Tatvyra Chocolate Peanut Butter Crunchy on a green checked cloth, with chocolate toast and a bowl of oats.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-2.webp',
        alt: 'A spoon lifting chocolate peanut butter from an open jar of Tatvyra Chocolate Peanut Butter Crunchy, its lid beside it.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-3.webp',
        alt: 'Hands spreading Tatvyra Chocolate Peanut Butter Crunchy on toast topped with banana slices, the jar beside the plate.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-4.webp',
        alt: 'A spoonful of Tatvyra Chocolate Peanut Butter Crunchy ribboning back into the open jar.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-nutrition.webp',
        alt: 'The label of Tatvyra Chocolate Peanut Butter Crunchy showing nutrition information per 100g and per serve, ingredients (roasted peanuts 100%) and allergens (peanuts, soy).',
      },
    ],
    spotlight: {
      eyebrow: 'Ingredients and benefits',
      title: 'The Best of Both Worlds.',
      intro:
        'Creamy, chocolatey, and packed with goodness. Our Chocolate Peanut Butter Crunchy is made with roasted peanuts, rich cocoa and natural crunch, for a deliciously satisfying, nutrient-packed spread.',
      image: '/images/products/chocolate-peanut-butter-spoon.webp',
      imageAlt:
        'A glass bowl of Tatvyra chocolate crunchy peanut butter photographed from above, with chocolate chunks, loose peanuts, a bowl of crunch and a loaded spoon around it.',
      benefits: [
        { icon: 'protein', title: 'High Protein', body: '~25g per 100g' },
        {
          icon: 'nothing-added',
          title: 'No Hydrogenated Oils',
          body: 'Just pure, honest nutrition.',
        },
        {
          icon: 'micronutrients',
          title: 'Rich in Vitamin E, Magnesium & Potassium',
          body: 'Supports energy, heart health and overall well-being.',
        },
      ],
    },
    descriptor: 'Cocoa and peanuts, with a satisfying crunch.',
    // The supplied product description, verbatim. The product page sets it in
    // place of the descriptor; cards and page metadata keep the short line.
    description:
      'An indulgent blend of roasted peanuts and rich chocolate, finished with a satisfying crunch. This spread brings together nutty depth and cocoa sweetness in one jar, perfect for spreading on toast, pairing with fruit, or enjoying as a treat on its own.',
    sizes: ['250g', '500g', '1000g'],
    benefits: [
      'Protein-rich indulgence',
      'Cocoa Antioxidant flavonoids',
      'Gluten free',
    ],
    marks: ['gluten-free', 'nutrition-forward'],
    price: 166,
    prices: { '250g': 166, '500g': 334, '1000g': 610 },
  },
  {
    /* The creamy jar on its own. Its label prints TAT-NB01, which is already
       the natural creamy SKU, so this carries the next free code until
       Tatvyra confirms one. Benefits and prices follow TAT-NB02, the same
       spread; no crunchy photography is shown here. */
    sku: 'TAT-NB03',
    slug: 'chocolate-peanut-butter-creamy',
    name: 'Chocolate Peanut Butter Creamy',
    category: 'nut-butters',
    format: 'Spread',
    image: '/images/products/packs/chocolate-peanut-butter-creamy-1.webp',
    images: [
      {
        src: '/images/products/packs/chocolate-peanut-butter-creamy-1.webp',
        alt: 'A jar of Tatvyra Chocolate Peanut Butter Creamy on a green checked cloth, with chocolate toast and a bowl of oats.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-creamy-2.webp',
        alt: 'A spoon lifting chocolate peanut butter from an open jar of Tatvyra Chocolate Peanut Butter Creamy, its lid beside it.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-creamy-3.webp',
        alt: 'Hands spreading Tatvyra Chocolate Peanut Butter Creamy on toast topped with banana slices, the jar beside the plate.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-creamy-4.webp',
        alt: 'A spoonful of Tatvyra Chocolate Peanut Butter Creamy ribboning back into the open jar.',
      },
      {
        src: '/images/products/packs/chocolate-peanut-butter-creamy-nutrition.webp',
        alt: 'The label of Tatvyra Chocolate Peanut Butter Creamy showing nutrition information per 100g and per serve, ingredients (roasted peanuts 100%) and allergens (peanuts, soy).',
      },
    ],
    spotlight: {
      eyebrow: 'Ingredients and benefits',
      title: 'The Best of Both Worlds.',
      intro:
        'Creamy, chocolatey, and packed with goodness. Our Chocolate Peanut Butter Creamy is made with roasted peanuts, rich cocoa and natural ingredients, for a deliciously satisfying, nutrient-packed spread.',
      image: '/images/products/chocolate-peanut-butter-creamy-spoon.webp',
      imageWidth: 900,
      imageHeight: 714,
      imageAlt:
        'A glass jar of Tatvyra creamy chocolate peanut butter photographed from above on a stone board, swirled smooth, with dark chocolate pieces, a bowl of cocoa powder and a loaded spoon around it.',
      benefits: [
        { icon: 'protein', title: 'High Protein', body: '~25g per 100g' },
        {
          icon: 'nothing-added',
          title: 'No Hydrogenated Oils',
          body: 'Just pure, honest nutrition.',
        },
        {
          icon: 'micronutrients',
          title: 'Rich in Vitamin E, Magnesium & Potassium',
          body: 'Supports energy, heart health and overall well-being.',
        },
      ],
    },
    descriptor: 'Cocoa and peanuts, milled smooth.',
    description:
      'An indulgent blend of roasted peanuts and rich chocolate, milled smooth and creamy. This spread brings together nutty depth and cocoa sweetness in one jar, perfect for spreading on toast, pairing with fruit, or enjoying as a treat on its own.',
    sizes: ['250g', '500g', '1000g'],
    benefits: [
      'Protein-rich indulgence',
      'Cocoa Antioxidant flavonoids',
      'Gluten free',
    ],
    marks: ['gluten-free', 'nutrition-forward'],
    price: 166,
    prices: { '250g': 166, '500g': 334, '1000g': 610 },
  },

  // 04 — RAW HONEY
  {
    sku: 'TAT-HN01',
    slug: 'wild-forest-honey',
    name: 'Wild Forest Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    image: '/images/products/packs/wild-forest-honey-1.webp',
    images: [
      {
        src: '/images/products/packs/wild-forest-honey-1.webp',
        alt: 'A jar of Tatvyra Wild Forest Honey beside a cup of tea and a bowl of fruit, on honeycomb tiles.',
      },
      {
        src: '/images/products/packs/wild-forest-honey-2.webp',
        alt: 'A wooden dipper drizzling honey into an open jar of Tatvyra Wild Forest Honey, its lid beside it.',
      },
      {
        src: '/images/products/packs/wild-forest-honey-3.webp',
        alt: 'A honey dipper held over an open jar of Tatvyra Wild Forest Honey, with tea and fruit behind.',
      },
      {
        src: '/images/products/packs/wild-forest-honey-4.webp',
        alt: 'Honey drizzled over a fruit and yoghurt bowl, a jar of Tatvyra Wild Forest Honey beside it.',
      },
      {
        src: '/images/products/packs/wild-forest-honey-5.webp',
        alt: 'Honey running from a dipper into an open jar of Tatvyra Wild Forest Honey.',
      },
    ],
    descriptor: 'Dark, dense forest florals.',
    sizes: ['250g', '500g'],
    marks: ['single-origin'],
    price: 350,
    prices: { '250g': 350, '500g': 590 },
    featured: true,
    /* The "Origin & process" band on the product page (ProductOrigin). Copy is
       taken verbatim from the supplied layout reference, benefit lines
       included. The illustrated map, the four photographs and the honey drip
       are cut from that same reference; the map’s labels and "INDIA" are set
       live by the page instead.

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
    image: '/images/products/packs/multifloral-honey-1.webp',
    images: [
      {
        src: '/images/products/packs/multifloral-honey-1.webp',
        alt: 'A jar of Tatvyra Multifloral Honey beside a cup of tea and a bowl of fruit, on honeycomb tiles.',
      },
      {
        src: '/images/products/packs/multifloral-honey-2.webp',
        alt: 'A wooden dipper drizzling honey into an open jar of Tatvyra Multifloral Honey.',
      },
      {
        src: '/images/products/packs/multifloral-honey-3.webp',
        alt: 'A honey dipper held over an open jar of Tatvyra Multifloral Honey, its lid beside it.',
      },
      {
        src: '/images/products/packs/multifloral-honey-4.webp',
        alt: 'Honey drizzled over a bowl of yoghurt, granola and berries, a jar of Tatvyra Multifloral Honey beside it.',
      },
      {
        src: '/images/products/packs/multifloral-honey-5.webp',
        alt: 'Honey running from a dipper into an open jar of Tatvyra Multifloral Honey.',
      },
    ],
    descriptor: 'A balanced blend across many flowers.',
    sizes: ['250g', '500g'],
    marks: ['single-origin'],
    // Not on the supplied price sheet. The figure below is derived from it —
    // the client's own size step and price level, keeping this product's
    // position against its priced sibling — and priceTbc still says so.
    priceTbc: true,
    price: 311,
    prices: { '250g': 311, '500g': 525 },
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
    sku: 'TAT-HN04',
    slug: 'kashmiri-white-acacia-honey',
    name: 'Kashmiri White Acacia Honey',
    category: 'raw-honey',
    format: 'Raw honey',
    image: '/images/products/packs/kashmiri-white-acacia-honey-1.webp',
    images: [
      {
        src: '/images/products/packs/kashmiri-white-acacia-honey-1.webp',
        alt: 'A jar of Tatvyra Kashmiri White Acacia Honey beside a cup of tea and a bowl of fruit, on honeycomb tiles.',
      },
      {
        src: '/images/products/packs/kashmiri-white-acacia-honey-2.webp',
        alt: 'A wooden dipper drizzling honey into an open jar of Tatvyra Kashmiri White Acacia Honey, its lid beside it.',
      },
      {
        src: '/images/products/packs/kashmiri-white-acacia-honey-3.webp',
        alt: 'A honey dipper held over an open jar of Tatvyra Kashmiri White Acacia Honey, with tea and fruit behind.',
      },
      {
        src: '/images/products/packs/kashmiri-white-acacia-honey-4.webp',
        alt: 'Honey drizzled over a smoothie bowl of berries and banana, a jar of Tatvyra Kashmiri White Acacia Honey beside it.',
      },
      {
        src: '/images/products/packs/kashmiri-white-acacia-honey-5.webp',
        alt: 'Honey running from a dipper into an open jar of Tatvyra Kashmiri White Acacia Honey.',
      },
      {
        src: '/images/products/packs/kashmiri-white-acacia-honey-nutrition.webp',
        alt: 'The label of Tatvyra Kashmiri White Acacia Honey showing nutrition facts per 1 tbsp (21g) serving, ingredients (raw honey) and allergen (pollen).',
      },
    ],
    descriptor: 'Pale, delicate, slow to set.',
    sizes: ['250g', '500g'],
    marks: ['single-origin'],
    // Not on the supplied price sheet. The figure below is derived from it —
    // the client's own size step and price level, keeping this product's
    // position against its priced sibling — and priceTbc still says so.
    priceTbc: true,
    price: 545,
    prices: { '250g': 545, '500g': 918 },
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
 * The unit price of a product in a given size, in rupees: the pack's MRP from
 * the price sheet, GST included.
 *
 * Single-size products carry only `price`; multi-size products carry a
 * `prices` entry per size. Every surface — cards, product page, cart,
 * checkout — prices through this, which is what keeps one product and size
 * from being charged two ways. Returns null rather than NaN when a price is
 * missing.
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
