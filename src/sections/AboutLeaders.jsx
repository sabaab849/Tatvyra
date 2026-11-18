/**
 * The people behind Tatvyra: the founder, then the co-founder. It follows "The
 * brand" on the About page.
 *
 * Both are set the same way — the heading across the top, then the portrait in
 * one column and a brief story in the other. The name and the title sit under
 * the photograph, where a caption belongs. The portrait changes sides between
 * the two, so the pair reads as a spread rather than a list.
 *
 * The copy is cut down from the brand's own longer text to the facts that
 * matter: who each person is, where they came from, and why Tatvyra. Nothing
 * is added that the longer text did not say.
 */

/* The founder's statement: its opening and closing sentences, word for word,
   the brand line, and his sign-off. */
const FOUNDER_STATEMENT = {
  body: 'Forty-two years of engineering for the pharmaceutical industry taught us one thing: purity is built into the process, not added at the end. At Tatvyra, we bring that same discipline to the food you eat every day. Honest ingredients, careful craft, nothing hidden.',
  line: 'Tatvyra: trusted ingredients for your healthy life.',
  sign: 'DV Vishwakarma',
}

export default function AboutLeaders() {
  return (
    <section className="leaders" aria-labelledby="founder-title">
      <div className="shell">
        <article className="leader">
          <header className="leader__head">
            <p className="leader__eyebrow">Founder Story</p>
            <h2 id="founder-title" className="leader__title">
              Built on Experience.
              <br />
              Driven by a Vision.
            </h2>
          </header>

          <div className="leader__aside">
            <figure className="leader__portrait">
              <img
                src="/images/about/founder-dv-vishwakarma.webp"
                alt="Mr. DV Vishwakarma, Founder and MD of Tatvyra, seated at the Tatvyra stand."
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="leader__caption">
                <span className="leader__name">Mr. DV Vishwakarma</span>
                <span className="leader__role">Founder &amp; MD</span>
              </figcaption>
            </figure>
          </div>

          <div className="leader__body">
            <p>
              A second-generation entrepreneur and NMIMS Business School alumnus, Mr. Vishwakarma
              joined his father’s business at 21 and led it in the engineering
              industry for over two decades. He founded Tatvyra to make honest nutrition
              from pure, natural ingredients, free from unnecessary fillers, additives and
              artificial preservatives.
            </p>

            {/* His own words, under his story. */}
            <blockquote className="leader__statement">
              <p>{FOUNDER_STATEMENT.body}</p>
              <p className="leader__statement-line">{FOUNDER_STATEMENT.line}</p>
              <footer className="leader__statement-sign">{FOUNDER_STATEMENT.sign}</footer>
            </blockquote>
          </div>
        </article>

        <article className="leader leader--flip" aria-labelledby="cofounder-title">
          <header className="leader__head">
            <p className="leader__eyebrow">CEO</p>
            <h2 id="cofounder-title" className="leader__title">
              Vijeta Rathod
            </h2>
          </header>

          <div className="leader__aside">
            <figure className="leader__portrait">
              <img
                src="/images/about/cofounder-vijeta-rathod.webp"
                alt="Vijeta Rathod, CEO of Tatvyra, seated at the Tatvyra stand."
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="leader__caption">
                <span className="leader__name">Vijeta Rathod</span>
                <span className="leader__role">CEO</span>
              </figcaption>
            </figure>
          </div>

          <div className="leader__body">
            <p>
              Vijeta Rathod is the CEO of Tatvyra, a wellness brand built on the
              belief that good health begins with how we start our day. Guided by her deep
              connection with nature and a passion for mindful living, she helped build Tatvyra by
              Feynman Foodcraft to make healthier daily habits and mindful nutrition accessible to
              every generation. Rooted in the philosophy of “Beginning every day the fit way,”
              Tatvyra aims to inspire a more conscious approach to everyday wellness that goes
              beyond fitness trends.
            </p>
            <p>
              With over 20 years of experience in human resources, talent management and
              organisational development, Vijeta leads the team that turns Tatvyra’s vision into
              meaningful everyday experiences, bringing together people, purpose and a shared
              commitment to making wellness a natural part of daily life.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
