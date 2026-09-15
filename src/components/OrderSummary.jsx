import { formatINR } from '../lib/money'

/**
 * The money panel, shared by the details step, the payment step and the
 * confirmation page.
 *
 * It takes plain lines rather than cart items, so the confirmation page can
 * render it from the stored order after the cart has been emptied. Totals are
 * passed in already computed — this component never does arithmetic of its
 * own, which is what keeps every step showing the same numbers.
 */
export default function OrderSummary({ lines, subtotal, delivery, total, title = 'Order summary' }) {
  return (
    <section className="osum" aria-label={title}>
      <h2 className="osum__title">{title}</h2>

      <ul className="osum__lines">
        {lines.map((line) => (
          <li key={line.id} className="osum__line">
            <div className="osum__item">
              <span className="osum__name">{line.name}</span>
              <span className="osum__meta">
                {line.size ? `${line.size} · ` : ''}
                {formatINR(line.unitPrice)} × {line.quantity}
              </span>
            </div>
            <span className="osum__amount">{formatINR(line.lineTotal)}</span>
          </li>
        ))}
      </ul>

      <dl className="osum__totals">
        <div className="osum__row">
          <dt>Subtotal</dt>
          <dd>{formatINR(subtotal)}</dd>
        </div>
        <div className="osum__row">
          <dt>Delivery</dt>
          <dd>{delivery === 0 ? 'Free' : formatINR(delivery)}</dd>
        </div>
        <div className="osum__row osum__row--total">
          <dt>Total</dt>
          <dd>{formatINR(total)}</dd>
        </div>
      </dl>
    </section>
  )
}
