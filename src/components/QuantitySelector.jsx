import { MinusIcon, PlusIcon } from './Icons'

export default function QuantitySelector({ value, onChange, min = 1, max = 99, label = 'Quantity' }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon width={16} height={16} />
      </button>
      <input
        type="number"
        className="qty__value"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(e) => {
          const next = Number.parseInt(e.target.value, 10)
          if (!Number.isNaN(next)) onChange(Math.min(max, Math.max(min, next)))
        }}
      />
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  )
}
