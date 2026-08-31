import Reveal from '../components/Reveal'

export default function BrandPhilosophy() {
  return (
    <section className="philosophy section--tight" aria-labelledby="philosophy-title">
      <div className="shell philosophy__inner">
        <Reveal className="philosophy__lead">
          <p className="eyebrow">Clean-label wellness, kept honest</p>
          <h2 id="philosophy-title" className="display display--m">
            We tell you what is in it, and what is not.
          </h2>
        </Reveal>
        <Reveal className="philosophy__body" delay={90}>
          <p>
            Tatvyra is built by Feynman Foodcraft around four real foods — nut butters, moringa,
            spirulina and raw honey. Each one is made to a clean-label standard and sold in the
            format that actually fits a routine: a spread for the morning, a powder for the
            smoothie, a tablet for the desk drawer.
          </p>
          <p>
            No hydrogenated oils. No added sugar. No preservatives. An FSSAI-certified process
            behind every batch.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
