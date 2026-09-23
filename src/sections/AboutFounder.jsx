/**
 * The founder's story.
 *
 * Typography only, by design: no photograph of the founder was supplied, and
 * none is drawn in its place. The copy is the brand's own, unaltered.
 */
export default function AboutFounder() {
  return (
    <section className="about-founder" aria-labelledby="founder-title">
      <div className="shell">
        <div className="about-founder__grid">
          <div className="about-founder__lead">
            <p className="about-founder__eyebrow">Founder Story</p>
            <h2 id="founder-title" className="about-founder__title">
              Built on experience.
              <br />
              Driven by a vision.
            </h2>
          </div>

          <div className="about-founder__body">
            <p>
              Mr. D. V. Vishwakarma is a second-generation entrepreneur and alumnus of NMIMS
              Business School. He joined his father’s business legacy at the age of 21 and went
              on to successfully lead and grow the engineering industry for over two decades,
              gaining extensive experience in entrepreneurship, business management, operations,
              and strategic growth.
            </p>
            <p>
              After 20 years in the engineering sector, Mr. Vishwakarma ventured into the Health
              &amp; Wellness industry, driven by a growing awareness of the need for
              high-quality, clean-label nutrition. He recognized the increasing demand for
              products made from pure, natural ingredients—free from unnecessary fillers,
              additives, and artificial preservatives.
            </p>

            <p className="about-founder__sign">
              <span className="about-founder__name">Mr. D. V. Vishwakarma</span>
              <span className="about-founder__role">Founder &amp; Visionary Entrepreneur</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
