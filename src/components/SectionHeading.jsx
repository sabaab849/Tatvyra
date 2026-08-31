import Reveal from './Reveal'

/**
 * The one heading pattern used across the site: small eyebrow, display
 * headline, optional single-paragraph intro, optional trailing link.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  size = 'm',
  align = 'start',
  tone = 'light',
  action,
  id,
}) {
  return (
    <Reveal className={`sheading sheading--${align} sheading--${tone}`}>
      <div className="sheading__text">
        {eyebrow && (
          <p className={`eyebrow ${tone === 'dark' ? 'eyebrow--on-dark' : ''}`}>{eyebrow}</p>
        )}
        <h2 id={id} className={`display display--${size} sheading__title`}>
          {title}
        </h2>
        {intro && <p className="lede sheading__intro">{intro}</p>}
      </div>
      {action && <div className="sheading__action">{action}</div>}
    </Reveal>
  )
}
