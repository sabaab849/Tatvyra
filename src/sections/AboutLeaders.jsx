/**
 * The people behind Tatvyra: the founder's story, then the co-founder's.
 *
 * Both are set the same way — the heading across the top, then the portrait in
 * one column and the story in the other, starting on the same line, so the eye
 * meets the person and their first sentence together. The name and the title
 * sit under the photograph, where a caption belongs, rather than at the foot of
 * the column. The portrait changes sides between the two, so the pair reads as
 * a spread rather than a list. The copy is the brand's own, unaltered; only the
 * order of the blocks is set here.
 */

/* The founder's statement, kept as one block so it stays whole: the closing
   line is the brand line, and the sign-off is his. */
const FOUNDER_STATEMENT = {
  body: 'Forty-two years of engineering for the pharmaceutical industry taught us one thing: purity is built into the process, not added at the end. At Tatvyra, we bring that same discipline to the food you eat every day. We believe good nutrition should come from real, whole ingredients, not long labels and hidden additives. That’s why our moringa brings the goodness of one of nature’s most nutrient-dense leaves, our nut butters deliver clean protein and healthy fats with nothing unnecessary added, and our honey offers natural sweetness the way nature intended. Every product is made to nourish your body, fit easily into your daily routine, and earn your trust with every spoonful. Honest ingredients, careful craft, nothing hidden.',
  line: 'Tatvyra — trusted ingredients for your healthy life.',
  sign: '— DV, Founder',
}

export default function AboutLeaders() {
  return (
    <section className="leaders" aria-labelledby="founder-title">
      <div className="shell">
        <article className="leader">
          <header className="leader__head">
            <p className="leader__eyebrow">Founder Story</p>
            <h2 id="founder-title" className="leader__title">
              Built on experience.
              <br />
              Driven by a vision.
            </h2>
          </header>

          <div className="leader__aside">
            <figure className="leader__portrait">
              <img
                src="/images/about/founder-dv-vishwakarma.webp"
                alt="Mr. D. V. Vishwakarma, founder of Tatvyra, seated at the Tatvyra stand."
                width={1600}
                height={1200}
                decoding="async"
              />
              <figcaption className="leader__caption">
                <span className="leader__name">Mr. D. V. Vishwakarma</span>
                <span className="leader__role">Founder &amp; Visionary Entrepreneur</span>
              </figcaption>
            </figure>
          </div>

          {/* His own words, opening under his photograph and running past the
              column, so the page closes on his voice rather than on a gap. */}
          <blockquote className="leader__statement">
            <p>{FOUNDER_STATEMENT.body}</p>
            <p className="leader__statement-line">{FOUNDER_STATEMENT.line}</p>
            <footer className="leader__statement-sign">{FOUNDER_STATEMENT.sign}</footer>
          </blockquote>

          <div className="leader__body">
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
          </div>
        </article>

        <article className="leader leader--flip" aria-labelledby="cofounder-title">
          <header className="leader__head">
            <p className="leader__eyebrow">Co-Founder</p>
            <h2 id="cofounder-title" className="leader__title">
              Vijeta Rathod
            </h2>
          </header>

          <div className="leader__aside">
            <figure className="leader__portrait">
              <img
                src="/images/about/cofounder-vijeta-rathod.webp"
                alt="Vijeta Rathod, co-founder and CEO of Tatvyra, seated at the Tatvyra stand."
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="leader__caption">
                <span className="leader__name">Vijeta Rathod</span>
                <span className="leader__role">Co-Founder &amp; CEO, Tatvyra by Feynman Foodcraft</span>
              </figcaption>
            </figure>
          </div>

          <div className="leader__body">
            <p>
              Vijeta Rathod is the Co-Founder and CEO of Tatvyra, a wellness brand built on a
              simple belief: good health starts with how you begin your day. Tatvyra was created
              around the philosophy of “Beginning every day the fit way” — a mission to educate
              and inspire healthier daily habits, not just among Gen Z, but across every
              generation.
            </p>
            <p>
              The idea for Tatvyra didn’t come from a market gap — it came from a personal one.
              Vijeta has always felt a deep connection to nature, and after two decades in the
              corporate world, she felt pulled to build something that reflected that connection:
              a business rooted in wellness, mindful nutrition, and everyday vitality. Tatvyra by
              Feynman Foodcraft is the result — a brand designed to make fitness-first mornings
              accessible and relevant to a much wider audience than the wellness industry
              typically targets.
            </p>
            <p>
              Vijeta brings over 20 years of professional experience to Tatvyra’s leadership,
              including a strong foundation in human resources and organizational building —
              talent management &amp; culture-building.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
