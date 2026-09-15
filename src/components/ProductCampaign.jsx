import Reveal from './Reveal'

/**
 * The campaign board for a product page: a short lead-in, then the supplied
 * three-panel artwork. The panels carry their own lettering, so the headline
 * above deliberately says something the board does not.
 */
export default function ProductCampaign({ product }) {
  const campaign = product.campaign
  if (!campaign) return null

  const base = campaign.image.replace(/-\d+\.webp$/, '')

  return (
    <section className="campaign" aria-labelledby="campaign-title">
      <div className="shell">
        <Reveal className="campaign__head">
          <p className="campaign__eyebrow">{campaign.eyebrow}</p>
          <h2 id="campaign-title" className="campaign__title">
            {campaign.title}
          </h2>
          <p className="campaign__body">{campaign.body}</p>
        </Reveal>

        <Reveal className="campaign__media" delay={110}>
          <img
            src={campaign.image}
            srcSet={`${base}-1000.webp 1000w, ${base}-1400.webp 1400w, ${base}-1926.webp 1926w`}
            sizes="(max-width: 82.5rem) 100vw, 1320px"
            alt={campaign.imageAlt}
            width={1926}
            height={817}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  )
}
