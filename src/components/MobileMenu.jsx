import { useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { CloseIcon, ArrowIcon } from './Icons'
import { HEADER_NAV, SUPPORT_NAV, POLICY_NAV } from '../lib/nav'
import { getCategory } from '../data/catalogue'
import { useOverlay } from '../lib/useOverlay'

/**
 * The overlay menu behind the burger: the same five destinations as the bar,
 * in the same order, with Home ahead of them off the homepage. The three that
 * are menus on desktop — Spreads, Greens and Honey —
 * are set here as a label with the ranges they cover beneath it.
 */
export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const { pathname } = useLocation()
  useOverlay(open, onClose, panelRef)

  const link = (label, to, sub = false) => (
    <NavLink
      to={to}
      end={to === '/shop' || to === '/'}
      className={({ isActive }) =>
        `drawer__link ${sub ? 'drawer__link--sub' : ''} ${isActive ? 'is-active' : ''}`
      }
      tabIndex={open ? 0 : -1}
    >
      <span>{label}</span>
      <ArrowIcon />
    </NavLink>
  )

  return (
    <div className={`drawer drawer--left ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="drawer__scrim"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
      />
      <div
        className="drawer__panel drawer__panel--menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        ref={panelRef}
      >
        <div className="drawer__head">
          <Logo width={126} />
          <button type="button" className="drawer__close" data-autofocus onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Mobile">
          <ul>
            {pathname !== '/' && <li>{link('Home', '/')}</li>}
            {HEADER_NAV.map((item) =>
              item.to ? (
                <li key={item.label}>{link(item.label, item.to)}</li>
              ) : (
                <li key={item.label} className="drawer__group">
                  <p className="drawer__label">{item.label}</p>
                  <ul>
                    {item.ranges.map((slug) => (
                      <li key={slug}>{link(getCategory(slug).name, `/shop/${slug}`, true)}</li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="drawer__foot">
          <ul className="drawer__support">
            {[...SUPPORT_NAV, ...POLICY_NAV].map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} tabIndex={open ? 0 : -1}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="drawer__line">Rise. Nourish. Thrive.</p>
        </div>
      </div>
    </div>
  )
}
