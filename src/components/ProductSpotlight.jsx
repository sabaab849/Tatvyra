import Reveal from './Reveal'
import { ArmIcon, DumbbellIcon, HeartIcon, NoDropIcon, SproutIcon, LeafMarkIcon } from './Icons'
import { MARKS } from '../data/brand'

/**
 * The ingredients-and-benefits block for a product page.
 *
 * Benefit copy comes from the SKU's own `spotlight`. The on-pack marks are
 * read from MARKS via `product.marks`, so the definitions stay in one place
 * and cannot drift from the rest of the site — unless the SKU's supplied
 * design gives its own mark copy, which it then lists in `spotlight.marks`.
 *
 * The eyebrow is optional, and `title` may be an array of lines, each set on
 * a line of its own.
 */
const BENEFIT_ICONS = {
  protein: DumbbellIcon,
  // The same point drawn as a flexed arm, where a SKU's design shows one.
  'plant-protein': ArmIcon,
  'nothing-added': NoDropIcon,
  micronutrients: SproutIcon,
  'healthy-fats': HeartIcon,
  'essential-nutrients': LeafMarkIcon,
}

/* The catalogue's mark keys, given the glyphs used in the design. */
const MARK_ICONS = {
  'clean-label': LeafMarkIcon,
  vegan: SproutIcon,
  'nutrition-forward': DumbbellIcon,
  'gluten-free': LeafMarkIcon,
  'single-origin': LeafMarkIcon,
  'nothing-added': NoDropIcon,
}

export default function ProductSpotlight({ product }) {
  const spotlight = product.spotlight
  if (!spotlight) return null

  const marks =
    spotlight.marks ??
    (product.marks ?? [])
      .filter((key) => MARKS[key])
      .map((key) => ({ icon: key, title: MARKS[key].label, body: MARKS[key].definition }))
  const lines = Array.isArray(spotlight.title)

  return (
    <section className="spotlight" aria-labelledby="spotlight-title">
      <div className="shell">
        <div className="spotlight__top">
          <Reveal className="spotlight__copy">
            {spotlight.eyebrow && <p className="spotlight__eyebrow">{spotlight.eyebrow}</p>}
            <h2
              id="spotlight-title"
              className={`spotlight__title${lines ? ' spotlight__title--lines' : ''}`}
            >
              {lines ? spotlight.title.map((line) => <span key={line}>{line}</span>) : spotlight.title}
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
              width={spotlight.imageWidth ?? 900}
              height={spotlight.imageHeight ?? 758}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>

        {marks.length > 0 && (
          <div className="spotlight__marks">
            <p className="spotlight__label">On-pack marks</p>
            <ul>
              {marks.map((mark) => {
                const Icon = MARK_ICONS[mark.icon] ?? LeafMarkIcon
                return (
                  <li key={mark.title}>
                    <span className="spotlight__disc" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="spotlight__benefit-title">{mark.title}</h3>
                      <p className="spotlight__benefit-body">{mark.body}</p>
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
