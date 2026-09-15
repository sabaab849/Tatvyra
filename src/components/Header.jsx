import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { PRIMARY_NAV } from '../lib/nav'
import { useCart } from '../context/useCart'
import { ShoppingBagIcon, MenuIcon } from './Icons'

/**
 * The navbar from the Figma refresh: lockup and its mauve dot, four links,
 * a cart trigger with a gold count badge, and the Shop Now pill.
 *
 * The design is a 1440 desktop frame only, so the narrow layout below it is
 * the drawer pattern the site already had — burger, lockup, cart.
 */
export default function Header() {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart } = useCart()
  const location = useLocation()

  // Navigating away closes whatever overlay was open.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMenuOpen(false)
  }

  // A single threshold, no scroll-linked animation — the bar just settles.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`header ${compact ? 'header--compact' : ''}`}>
        <div className="header__inner shell">
          <div className="header__lead">
            <button
              type="button"
              className="header__icon header__icon--menu"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon />
            </button>
            <Logo width={128} className="header__logo" />
            <span className="header__dot" aria-hidden="true" />
          </div>

          <nav className="header__nav" aria-label="Primary">
            <ul className="header__nav-list">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/shop'}
                    className={({ isActive }) =>
                      `header__link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__cart"
              onClick={openCart}
              aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBagIcon />
              <span className="header__count" aria-hidden="true">{count}</span>
            </button>
            <NavLink to="/shop" className="header__cta">
              Shop Now
            </NavLink>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
