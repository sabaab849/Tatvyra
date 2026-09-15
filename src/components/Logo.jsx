import { Link } from 'react-router-dom'

/**
 * The Tatvyra lockup, used as a supplied asset. It is never redrawn,
 * recoloured or set as live text.
 *
 * The brand lockup from the guidelines: Tatvyra Purple wordmark under the
 * Feynman Foodcraft roundel with the Burnt Orange leaf mark. Vector, so it
 * stays sharp at any size and carries the exact brand hexes.
 *
 * Minimum size from the guidelines: full lockup 120px wide.
 */
export default function Logo({ width = 144, to = '/', className = '' }) {
  // Intrinsic ratio of the trimmed artwork — never distort this.
  const ratio = 157.04 / 79.09
  const safeWidth = Math.max(width, 120)

  const img = (
    <img
      src="/brand/tatvyra-logo.svg"
      alt="Tatvyra — Feynman Foodcraft Pvt. Ltd."
      width={safeWidth}
      height={Math.round(safeWidth / ratio)}
      style={{ width: `${safeWidth}px`, height: 'auto' }}
      className="logo__img"
    />
  )

  if (!to) return <span className={`logo ${className}`}>{img}</span>

  return (
    <Link to={to} className={`logo ${className}`} aria-label="Tatvyra — home">
      {img}
    </Link>
  )
}
