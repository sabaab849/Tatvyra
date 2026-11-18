/**
 * The four products featured in the header's mega-menu, in order.
 *
 *   id         the catalogue slug, so a card can be matched back to its product
 *   title      the name under the card
 *   imagePath  the product's own photograph in public/ — what the card shows
 *   videoPath  a short, silent, looping MP4 in public/ that plays over the
 *              photograph while the card is hovered or focused
 *   link       where the card goes
 *
 * A card whose video is missing or will not play simply stays on its
 * photograph, so a product can be listed here before its video exists. How the
 * videos are made — and the rules that keep the pack in them identical to the
 * real one — is in docs/featured-videos.md.
 */
export const FEATURED_PRODUCTS = [
  {
    id: 'moringa-leaf-powder',
    title: 'Moringa Leaf Powder',
    imagePath: '/images/products/packs/moringa-leaf-powder-1.webp',
    videoPath: '/videos/featured/moringa-leaf-powder.mp4',
    link: '/product/moringa-leaf-powder',
  },
  {
    id: 'spirulina-powder',
    title: 'Spirulina Powder',
    imagePath: '/images/products/packs/spirulina-powder-1.webp',
    videoPath: '/videos/featured/spirulina-powder.mp4',
    link: '/product/spirulina-powder',
  },
  {
    id: 'natural-peanut-butter-creamy',
    title: 'Natural Peanut Butter Creamy',
    imagePath: '/images/products/packs/natural-peanut-butter-creamy-1.webp',
    videoPath: '/videos/featured/natural-peanut-butter-creamy.mp4',
    link: '/product/natural-peanut-butter-creamy',
  },
  {
    id: 'wild-forest-honey',
    title: 'Wild Forest Honey',
    imagePath: '/images/products/packs/wild-forest-honey-1.webp',
    videoPath: '/videos/featured/wild-forest-honey.mp4',
    link: '/product/wild-forest-honey',
  },
]
