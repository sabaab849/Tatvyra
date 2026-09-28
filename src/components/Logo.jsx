import { Link } from 'react-router-dom'

/**
 * The Tatvyra lockup, used as a supplied asset. It is never redrawn,
 * recoloured or set as live text.
 *
 * The artwork is the 2026 lockup: the Tatvyra wordmark with the leaf mark
 * above it and the gold rule beneath. It is vector, so it stays sharp at any
 * size and carries the artwork's own colours.
 *
 * Two colourways ship, both supplied: the wordmark in purple for light
 * grounds, and in white for dark ones. `reversed` picks the white one — the
 * mark is never recoloured in CSS to make a dark ground work.
 */
export default function Logo({ width = 144, to = '/', className = '', reversed = false }) {
  // Intrinsic ratio of the trimmed artwork — never distort this.
  const ratio = 153.1 / 65.1
  const safeWidth = Math.max(width, 120)

  const img = (
    <img
      src={reversed ? '/brand/tatvyra-logo-reversed.svg' : '/brand/tatvyra-logo.svg'}
      alt="Tatvyra"
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
