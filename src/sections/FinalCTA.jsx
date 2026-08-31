import Reveal from '../components/Reveal'
import Button from '../components/Button'

export default function FinalCTA() {
  return (
    <section className="cta section--purple on-dark" aria-labelledby="cta-title">
      <div className="shell cta__inner">
        <Reveal>
          <p className="eyebrow eyebrow--on-dark">Start here</p>
          <h2 id="cta-title" className="display display--l cta__title">
            Rise. Nourish. Thrive.
          </h2>
          <p className="cta__body">
            Sixteen products across four ranges, in the formats you will actually keep using.
          </p>
          <div className="cta__actions">
            <Button to="/shop" variant="accent" size="lg">
              Shop Wellness Essentials
            </Button>
            <Button to="/contact" variant="on-dark" size="lg">
              Talk to the team
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
