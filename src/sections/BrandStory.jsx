import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { BRAND } from '../data/brand'

export default function BrandStory() {
  return (
    <section className="section story section--sunken" aria-labelledby="story-title">
      <div className="shell story__inner">
        <Reveal className="story__copy">
          <p className="eyebrow">The brand</p>
          <h2 id="story-title" className="display display--l story__title">
            Tatvyra, by Feynman Foodcraft.
          </h2>
          <p className="story__lede">{BRAND.promise}</p>
          <p>
            Tatvyra started with a simple frustration: the foods that have been part of Indian
            kitchens for generations — moringa, honey, ground nuts — kept turning up on shelves
            padded with things nobody asked for.
          </p>
          <p>
            So we make them the plain way. Nut butters milled from the nut. Moringa and spirulina
            kept whole and put into whichever format suits the day. Raw honey kept separate by
            origin, because a forest harvest and a Himalayan one are not the same jar.
          </p>
          <Button to="/about" variant="outline">
            Read the full story
          </Button>
        </Reveal>

        <Reveal className="story__aside" delay={110}>
          <blockquote className="story__quote">
            <p className="display display--s">{BRAND.line}</p>
            <footer>The Tatvyra brand line</footer>
          </blockquote>
          <dl className="story__facts">
            <div>
              <dt>Company</dt>
              <dd>{BRAND.company}</dd>
            </div>
            <div>
              <dt>Ranges</dt>
              <dd>Nut Butters · Moringa · Spirulina · Raw Honey</dd>
            </div>
            <div>
              <dt>Standards</dt>
              <dd>{BRAND.certification}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
