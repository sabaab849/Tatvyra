import { Link } from 'react-router-dom'

/**
 * The official Tatvyra lockup, used as a supplied vector asset.
 * It is never redrawn, recoloured or set as live text.
 *
 * Clear space equal to the height of the leaf mark is applied as padding by
 * the `--logo-clear` custom property (the leaf mark is ~0.22 of the lockup
 * height in the full-lockup artwork).
 *
 * Minimum sizes from the guidelines: full lockup 120px wide.
 */
export default function Logo({
  variant = 'lockup',
  width = 148,
  to = '/',
  className = '',
}) {
  const src =
    variant === 'full' ? '/brand/tatvyra-logo-full.svg' : '/brand/tatvyra-logo.svg'

  // Intrinsic ratios of the extracted artwork — never distort these.
  const ratio = variant === 'full' ? 157.04 / 94.18 : 157.04 / 79.09
  const safeWidth = Math.max(width, 120)

  const img = (
    <img
      src={src}
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
