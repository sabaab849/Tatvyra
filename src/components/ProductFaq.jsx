import Reveal from './Reveal'

/**
 * Product questions, built on native <details>/<summary>.
 *
 * That gets keyboard support, the disclosure role and find-in-page for free,
 * where a scripted accordion would have to reimplement all three.
 */
export default function ProductFaq({ product }) {
  const faq = product.faq
  if (!faq?.length) return null

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="shell faq__inner">
        <Reveal className="faq__head">
          <p className="faq__eyebrow">Questions</p>
          <h2 id="faq-title" className="faq__title">
            Before you open the jar.
          </h2>
        </Reveal>

        <Reveal className="faq__list" delay={110}>
          {faq.map((item) => (
            <details key={item.q} className="faq__item" name="product-faq">
              <summary>
                <span className="faq__q">{item.q}</span>
                <span className="faq__sign" aria-hidden="true" />
              </summary>
              <p className="faq__a">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
