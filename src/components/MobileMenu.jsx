import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { CloseIcon, ArrowIcon } from './Icons'
import { PRIMARY_NAV, SUPPORT_NAV } from '../lib/nav'
import { useOverlay } from '../lib/useOverlay'

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  useOverlay(open, onClose, panelRef)

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
            {PRIMARY_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/shop'}
                  className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''}`}
                  tabIndex={open ? 0 : -1}
                >
                  <span>{item.label}</span>
                  <ArrowIcon />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot">
          <ul className="drawer__support">
            {SUPPORT_NAV.map((item) => (
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
