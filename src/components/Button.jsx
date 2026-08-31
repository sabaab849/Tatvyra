import { Link } from 'react-router-dom'

/**
 * One button component for the whole site so weight, height and tracking stay
 * consistent. Variants: primary (purple), accent (burnt orange — accent use
 * only), outline, quiet, and on-dark counterparts.
 */
export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  full = false,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    full ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        <span className="btn__label">{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        <span className="btn__label">{children}</span>
      </a>
    )
  }

  const Tag = as || 'button'
  return (
    <Tag className={cls} {...rest}>
      <span className="btn__label">{children}</span>
    </Tag>
  )
}
