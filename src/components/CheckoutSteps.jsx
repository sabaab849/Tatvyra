const STEPS = [
  { id: 'details', label: 'Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
]

/**
 * The three-step rail across the top of the checkout. Purely an indicator —
 * the steps are not links, because stepping forward out of order would skip
 * details the next step needs.
 */
export default function CheckoutSteps({ current }) {
  const currentIndex = STEPS.findIndex((step) => step.id === current)

  return (
    <ol className="csteps" aria-label="Checkout progress">
      {STEPS.map((step, index) => {
        const done = index < currentIndex
        const active = index === currentIndex
        return (
          <li
            key={step.id}
            className={`csteps__step ${done ? 'is-done' : ''} ${active ? 'is-current' : ''}`}
            aria-current={active ? 'step' : undefined}
          >
            <span className="csteps__num" aria-hidden="true">
              {done ? '✓' : index + 1}
            </span>
            <span className="csteps__label">{step.label}</span>
            {done && <span className="visually-hidden"> (completed)</span>}
          </li>
        )
      })}
    </ol>
  )
}
