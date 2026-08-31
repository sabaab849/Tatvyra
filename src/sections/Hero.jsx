import Button from '../components/Button'

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
          <ul className="hero__meta">
            <li>No hydrogenated oils</li>
            <li>No added sugar</li>
            <li>No preservatives</li>
          </ul>
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
    </section>
  )
}
