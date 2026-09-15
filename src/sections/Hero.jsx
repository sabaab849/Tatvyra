import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'

/* Each glyph ships as an alpha mask rather than a picture, so the icon is
   painted in currentColor and stays in step with the label beside it. The
   sources are 160px square, which still has headroom at the size the strip
   runs them now, including on a 2x display. */
const TRUST_CLAIMS = [
  { label: 'Science-Backed', icon: '/images/trust/science-backed.webp' },
  { label: 'Clean Formulas', icon: '/images/trust/clean-formulas.webp' },
  { label: 'Quality Tested', icon: '/images/trust/quality-tested.webp' },
  { label: 'Transparent Ingredients', icon: '/images/trust/transparent-ingredients.webp' },
]

/* Identical tracks run side by side and all shift left by one track width, so
   the run covers (tracks - 1) x track width at every point in the loop. Three
   tracks of four passes clear roughly 8000px of viewport before a gap could
   appear at the right edge. */
const REPEATS = 4

function TrustTrack() {
  return (
    <ul className="trust-marquee__track">
      {Array.from({ length: REPEATS }, (_, pass) =>
        TRUST_CLAIMS.map((claim) => (
          <li key={`${pass}-${claim.label}`}>
            <span
              className="trust-marquee__icon"
              style={{ '--icon': `url(${claim.icon})` }}
            />
            {claim.label}
          </li>
        )),
      )}
    </ul>
  )
}

/**
 * The hero is a single supplied banner — the packshot, its ground and its
 * styling are all baked into the one photograph, which already leaves the
 * left third open for type.
 *
 * The copy is therefore laid over the picture rather than sitting beside it.
 * The <picture> comes after the copy in the DOM so that the narrow layout,
 * where it becomes a normal block image, stacks headline first; on the wide
 * layout it is positioned behind and DOM order stops mattering.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
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
              <Button to="/shop" variant="primary" icon={<ArrowIcon width={18} height={18} />}>
                Shop Wellness Essentials
              </Button>
              <Button to="/about" variant="quiet">
                Explore Tatvyra
              </Button>
            </div>
          </div>
        </div>

        <picture className="hero__banner">
          {/* Below the wide layout the open left third is cropped away and only
              the products are kept, so they stay large enough to read. */}
          <source
            media="(max-width: 75rem)"
            srcSet="/images/hero-banner-narrow.webp"
            width={1000}
            height={700}
          />
          <img
            src="/images/hero-banner-1400.webp"
            srcSet="/images/hero-banner-1000.webp 1000w, /images/hero-banner-1400.webp 1400w, /images/hero-banner-1983.webp 1983w"
            sizes="100vw"
            alt="Tatvyra premium peanut butter, organic moringa gummies and multifloral honey, arranged with peanuts, moringa leaves and wildflowers."
            width={1983}
            height={793}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      {/* The claims are announced once from the hidden list; the moving copies
          are repeated many times over and are decoration to a screen reader. */}
      <div className="trust-marquee">
        <ul className="visually-hidden">
          {TRUST_CLAIMS.map((claim) => (
            <li key={claim.label}>{claim.label}</li>
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
