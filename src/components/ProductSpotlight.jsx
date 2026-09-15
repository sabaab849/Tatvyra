import Reveal from './Reveal'
import { DumbbellIcon, NoDropIcon, SproutIcon, LeafMarkIcon } from './Icons'
import { MARKS } from '../data/brand'

/**
 * The ingredients-and-benefits block for a product page.
 *
 * Benefit copy comes from the SKU's own `spotlight`; the on-pack marks are
 * read from MARKS via `product.marks`, so the definitions stay in one place
 * and cannot drift from the rest of the site.
 */
const BENEFIT_ICONS = {
  protein: DumbbellIcon,
  'nothing-added': NoDropIcon,
  micronutrients: SproutIcon,
}

/* The catalogue's mark keys, given the glyphs used in the design. */
const MARK_ICONS = {
  'clean-label': LeafMarkIcon,
  vegan: SproutIcon,
  'nutrition-forward': DumbbellIcon,
  'gluten-free': LeafMarkIcon,
  'single-origin': LeafMarkIcon,
}

export default function ProductSpotlight({ product }) {
  const spotlight = product.spotlight
  if (!spotlight) return null

  const marks = (product.marks ?? []).filter((key) => MARKS[key])

  return (
    <section className="spotlight" aria-labelledby="spotlight-title">
      <div className="shell">
        <div className="spotlight__top">
          <Reveal className="spotlight__copy">
            <p className="spotlight__eyebrow">{spotlight.eyebrow}</p>
            <h2 id="spotlight-title" className="spotlight__title">
              {spotlight.title}
            </h2>
            <p className="spotlight__intro">{spotlight.intro}</p>

            <p className="spotlight__label">Key benefits</p>
            <ul className="spotlight__benefits">
              {spotlight.benefits.map((benefit) => {
                const Icon = BENEFIT_ICONS[benefit.icon] ?? SproutIcon
                return (
                  <li key={benefit.title}>
                    <span className="spotlight__disc" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="spotlight__benefit-title">{benefit.title}</h3>
                      <p className="spotlight__benefit-body">{benefit.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal className="spotlight__media" delay={110}>
            <img
              src={spotlight.image}
              alt={spotlight.imageAlt}
              width={900}
              height={758}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>

        {marks.length > 0 && (
          <div className="spotlight__marks">
            <p className="spotlight__label">On-pack marks</p>
            <ul>
              {marks.map((key) => {
                const Icon = MARK_ICONS[key] ?? LeafMarkIcon
                return (
                  <li key={key}>
                    <span className="spotlight__disc" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="spotlight__benefit-title">{MARKS[key].label}</h3>
                      <p className="spotlight__benefit-body">{MARKS[key].definition}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
