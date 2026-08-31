import Reveal from '../components/Reveal'
import Button from '../components/Button'

export default function IngredientStory() {
  return (
    <section className="section ingredient" aria-labelledby="ingredient-title">
      <div className="shell ingredient__inner">
        <Reveal className="ingredient__media">
          <div className="frame frame--4x5">
            <img
              src="/images/hero-scene.webp"
              alt="Nut butter, moringa powder, spirulina powder, raw honey and oats set out together on a wooden table."
              loading="lazy"
              decoding="async"
              width={1034}
              height={1125}
            />
          </div>
        </Reveal>

        <Reveal className="ingredient__copy" delay={110}>
          <p className="eyebrow">The ingredient list is the story</p>
          <h2 id="ingredient-title" className="display display--m">
            Short lists. Recognisable words.
          </h2>
          <p>
            A jar of peanut butter should read like peanuts. A pouch of moringa should read like
            moringa leaf. We do not thicken, sweeten or preserve our way to a longer shelf life,
            which is why the labels stay short enough to read in the aisle.
          </p>
          <ul className="ingredient__points">
            <li>
              <span className="ingredient__point-label">Milled, not compounded</span>
              Nut butters are milled from the nut itself — no hydrogenated oils, no added sugar.
            </li>
            <li>
              <span className="ingredient__point-label">Whole-leaf and whole-algae</span>
              Moringa leaf and spirulina go into powders, tablets, capsules and gummies unchanged.
            </li>
            <li>
              <span className="ingredient__point-label">Raw honey, by origin</span>
              Four honeys kept separate by source, from dense forest florals to high-altitude
              Himalayan harvests.
            </li>
          </ul>
          <Button to="/shop" variant="outline">
            See the full range
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
