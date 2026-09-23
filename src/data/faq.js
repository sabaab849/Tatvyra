/**
 * Frequently asked questions for the /faq page.
 *
 * Every answer restates something the site already publishes — the catalogue,
 * the brand facts and on-pack mark definitions in brand.js, the product-page
 * notes, and Our Policies — so the FAQ makes no claim, commitment or promise of
 * its own: no delivery times, charges, returns windows, dosages or health
 * outcomes. Where a policy is still being finalised, the answer says so and
 * points to the page that will carry it.
 *
 * Range facts (counts, formats, names, descriptors) are read from the
 * catalogue rather than typed out, so they cannot drift from the shop.
 *
 * An answer is a list of blocks: a string is a paragraph, { list } a bulleted
 * list. `links` are set after the answer, each either a route (`to`) or an
 * address (`href`).
 */

import { BRAND, MARKS } from './brand'
import { getCategory, productsByCategory } from './catalogue'

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const inWords = (n) => NUMBER_WORDS[n] ?? String(n)

const [email] = BRAND.contact.emails
const [phone] = BRAND.contact.phones

const moringa = productsByCategory('moringa')
const moringaFormats = moringa.map((p) => `${p.name} — ${p.descriptor}`)
// "Tablets" → "tablet", so the sentence reads "tablet and capsule formats".
const spirulinaFormats = productsByCategory('spirulina')
  .map((p) => p.format.toLowerCase().replace(/s$/, ''))
  .join(', ')
  .replace(/, ([^,]*)$/, ' and $1')

const honeys = productsByCategory('raw-honey').map((p) => `${p.name} — ${p.descriptor}`)

export const FAQ = [
  {
    id: 'products-and-ingredients',
    title: 'Products & ingredients',
    items: [
      {
        q: 'Which products are vegan?',
        a: [
          MARKS.vegan.definition,
          'Each product page lists the on-pack marks that product carries.',
        ],
      },
      {
        q: 'Do the nut butters contain added sugar or hydrogenated oils?',
        a: [`No. ${getCategory('nut-butters').description}`],
        links: [{ to: '/shop/nut-butters', label: 'Shop nut butters' }],
      },
      {
        q: 'Why has the oil risen to the top of my nut butter?',
        a: [
          'Because there is nothing in it to stop that happening. With no hydrogenated oils or stabilisers, a natural nut butter separates as it stands. Stir it back through and it returns to a creamy spread.',
        ],
      },
      {
        q: 'Which moringa format should I choose?',
        a: [
          `It comes down to how you like to take it. Moringa comes in ${inWords(moringa.length)} formats:`,
          { list: moringaFormats },
          `Spirulina comes in ${spirulinaFormats} formats.`,
        ],
        links: [{ to: '/shop/moringa', label: 'Shop moringa' }],
      },
      {
        q: 'How are the four raw honeys different?',
        a: [getCategory('raw-honey').description, { list: honeys }],
        links: [{ to: '/shop/raw-honey', label: 'Shop raw honey' }],
      },
      {
        q: 'Where can I find the ingredients and nutrition information?',
        a: [
          'The full ingredient declaration and nutrition panel for each product are not yet published on this site. Until they are, the on-pack label is the authority — always refer to the packaging for ingredients, recommended use, allergens, warnings and storage.',
          `For a specific product, write to us at ${email}.`,
        ],
        links: [{ href: `mailto:${email}`, label: 'Email us' }],
      },
      {
        q: 'How much should I take, and how?',
        a: [
          'Use each product according to the recommended serving and usage instructions provided on the product packaging. Tatvyra products are intended to complement a balanced diet and healthy lifestyle.',
        ],
      },
      {
        q: 'Can I take Tatvyra products if I am pregnant, nursing or on medication?',
        a: [
          'If you are pregnant, nursing, taking medication, have an existing medical condition, or have concerns about using a supplement, consult a qualified healthcare professional before use.',
          'These products are not intended to diagnose, treat, cure, or prevent any disease or medical condition.',
        ],
      },
      {
        q: 'How should I store my products?',
        a: [
          'Store products according to the instructions provided on the packaging. Keep products out of reach of children.',
        ],
      },
    ],
  },
  {
    id: 'orders-and-delivery',
    title: 'Orders & delivery',
    items: [
      {
        q: 'How do I place an order?',
        a: [
          'Choose a product and its size, add it to your cart, then check out: your delivery details, then payment, then an order confirmation with your order reference.',
        ],
        links: [{ to: '/shop', label: 'Start shopping' }],
      },
      {
        q: 'What are the delivery charges and timelines?',
        a: [
          'Our shipping policy — covering order processing, delivery locations, delivery timelines, shipping charges and order tracking — is being finalised and will be published on Our Policies.',
          `Until then, write to us at ${email} and we will answer directly.`,
        ],
        links: [{ to: '/policies#shipping-policy', label: 'Shipping policy' }],
      },
      {
        q: 'Can I cancel or return an order?',
        a: [
          'Our refund and cancellation policy — covering eligibility, timelines, damaged or incorrect orders, and refund processing — is being finalised and will be published on Our Policies.',
          `If you need help with an order now, write to us at ${email}.`,
        ],
        links: [{ to: '/policies#refund-and-cancellation-policy', label: 'Refund & cancellation policy' }],
      },
      {
        q: 'How is my personal information used?',
        a: [
          'Information submitted through our website is used to process your request, provide our services, and improve your experience. We do not sell your personal information to third parties.',
        ],
        links: [{ to: '/privacy', label: 'Privacy Policy' }],
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    items: [
      {
        q: 'How do I get in touch?',
        a: [
          `Email ${BRAND.contact.emails.join(' or ')}, or call ${BRAND.contact.phones.join(' or ')}.`,
          `${BRAND.company}, ${BRAND.contact.address.join(', ')}.`,
        ],
        links: [
          { to: '/contact', label: 'Contact page' },
          { href: `tel:${phone.replace(/\s/g, '')}`, label: `Call ${phone}` },
        ],
      },
    ],
  },
]

/** The same questions as plain text, for the page's FAQPage structured data. */
export const faqStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
          .map((block) => (typeof block === 'string' ? block : block.list.join(' ')))
          .join(' '),
      },
    })),
  ),
})
