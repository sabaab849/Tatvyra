# Tatvyra

The official website for **Tatvyra** — clean-label nutrition from
Feynman Foodcraft Pvt. Ltd.

> Rise. Nourish. Thrive.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Stack

React 19 + React Router 7 on Vite 8, with hand-written CSS driven by design
tokens. No UI kit, no CSS framework, no animation library — the only runtime
dependencies are React, React DOM and React Router.

## Payments (Razorpay)

Checkout takes payment through Razorpay's hosted window. Two Vercel functions
hold the secret: `api/razorpay/order.js` prices the basket on the server (via
`src/lib/pricing.js`, the same code the cart uses) and opens the order, and
`api/razorpay/verify.js` checks Razorpay's signature before an order counts as
paid. The order reference, items and delivery address are saved as notes on the
Razorpay order, so every paid order shows up in the Razorpay dashboard.

Keys are server environment variables, never `VITE_` ones:

- **Local:** copy `.env.example` to `.env.local` (git-ignored) and fill in
  `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. `npm run dev` serves `api/`
  itself, so no Vercel CLI is needed.
- **Production:** set the same two variables in Vercel → Project → Settings →
  Environment Variables, then redeploy.

## Layout

```
public/
  brand/            Official Tatvyra logo, extracted as vector from the catalogue
  images/           Range photography and the FSSAI mark, exported to WebP
  favicon.svg
src/
  styles/
    fonts.css       Lumaire @font-face (see BRAND-NOTES.md), Helvetica notes
    tokens.css      Colour, type scale, space, motion — the design system
    base.css        Reset, type primitives, layout primitives, reveal, a11y
    components.css  Header, drawers, search, cards, footer, buttons
    sections.css    Homepage sections
    pages.css       Shop, product detail, about, contact, info, 404
  data/
    brand.js        Brand constants, voice traits, on-pack mark definitions
    catalogue.js    The 4 ranges and 16 SKUs, transcribed from the catalogue
  context/
    CartContext.jsx <CartProvider> — reducer + localStorage
    useCart.js      The context object and its hook
  lib/
    nav.js          Navigation config shared by header, drawer and footer
    useOverlay.js   Scroll lock, Escape, focus trap for drawers and overlays
    usePageMeta.js  Per-route <title> and meta description
  components/       Header, MobileMenu, SearchPanel, CartDrawer, Footer,
                    Logo, Button, Icons, Reveal, SectionHeading, ProductCard,
                    ProductGrid, CategoryCard, ProductGallery, ProductInfo,
                    QuantitySelector, Newsletter, Layout, AnnouncementBar
  sections/         Hero, BrandPhilosophy, ShopByCategory, FeaturedProducts,
                    CleanLabel, IngredientStory, WhyTatvyra, CategoryFeature,
                    BrandStory, FinalCTA
  pages/            Home, Shop, Product, About, Contact, InfoPage, NotFound
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | All 16 products, filterable by format |
| `/shop/:category` | `nut-butters`, `moringa`, `spirulina`, `raw-honey` |
| `/product/:slug` | Product detail |
| `/about`, `/contact` | Brand and contact |
| `/account`, `/faq`, `/shipping-returns`, `/privacy`, `/terms` | Placeholder pages (see BRAND-NOTES.md) |
| anything else | 404 |

Client-side routing: any host serving this build must rewrite unknown paths to
`index.html`.

## Adding or editing products

Everything lives in `src/data/catalogue.js`. A SKU looks like:

```js
{
  sku: 'TAT-NB01',
  slug: 'natural-peanut-butter-creamy',
  name: 'Natural Peanut Butter, Creamy',
  category: 'nut-butters',
  format: 'Spread',
  focus: '30% 50%',   // crop of the range photo, until a packshot exists
  zoom: 1,
  descriptor: 'Peanuts, milled creamy. Nothing hydrogenated, nothing added.',
  sizes: ['250g', '500g', '1000g'],
  benefits: [...],    // verbatim from the catalogue
  marks: ['clean-label', 'vegan', 'nutrition-forward'],
  price: null,        // no prices are published yet
  featured: true,
}
```

Add `image: '/images/...'` for a card packshot, or `images: [{ src, alt }]` for
a gallery. Mark keys must exist in `MARKS` in `src/data/brand.js`, and a mark
may only be applied where the catalogue's own definition allows it.

**Read `BRAND-NOTES.md` before changing colour, type, the logo or product copy.**
It records which brand rules are enforced in code and which facts are missing on
purpose.

## Accessibility

Semantic landmarks and one `<h1>` per route, a skip link, visible focus rings,
Escape-to-close and focus-trapped drawers, labelled controls, `aria-pressed` on
filters and size toggles, alt text on every image, and a full
`prefers-reduced-motion` opt-out. All text tints are mixed to clear WCAG AA on
their ground — see the colour section of `BRAND-NOTES.md`.

---

© Feynman Foodcraft Pvt. Ltd.
