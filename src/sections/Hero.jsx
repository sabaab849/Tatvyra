import Button from '../components/Button'

const TRUST_CLAIMS = ['No hydrogenated oils', 'No added sugar', 'No preservatives']

/* Identical tracks run side by side and all shift left by one track width, so
   the run covers (tracks - 1) x track width at every point in the loop. Three
   tracks of four passes clear roughly 8000px of viewport before a gap could
   appear at the right edge. */
const REPEATS = 4

function TrustTrack() {
  return (
    <ul className="trust-marquee__track">
      {Array.from({ length: REPEATS }, (_, pass) =>
        TRUST_CLAIMS.map((claim) => <li key={`${pass}-${claim}`}>{claim}</li>),
      )}
    </ul>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner shell">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Wellness Essentials</p>
          <h1 id="hero-title" className="display display--xl hero__title">
            Rise.<br />Nourish.<br />Thrive.
          </h1>
          <p className="hero__lede">
            Clean-label wellness essentials, made with real ingredients and nothing hidden.
          </p>
          <div className="hero__actions">
            <Button to="/shop" variant="primary" size="lg">
              Shop Wellness Essentials
            </Button>
            <Button to="/about" variant="quiet" size="lg">
              Explore Tatvyra
            </Button>
          </div>
        </div>

        <div className="hero__media">
          <img
            className="hero__product"
            src="/images/hero-cutout.webp"
            alt="Tatvyra nut butter, moringa powder, spirulina powder and raw honey arranged together."
            width={1034}
            height={993}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      {/* The claims are announced once from the hidden list; the moving copies
          are repeated many times over and are decoration to a screen reader. */}
      <div className="trust-marquee">
        <ul className="visually-hidden">
          {TRUST_CLAIMS.map((claim) => (
            <li key={claim}>{claim}</li>
          ))}
        </ul>
        <div className="trust-marquee__viewport" aria-hidden="true">
          <TrustTrack />
          <TrustTrack />
          <TrustTrack />
        </div>
      </div>
    </section>
  )
}
