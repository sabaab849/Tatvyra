import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import SearchPanel from './SearchPanel'
import { PRIMARY_NAV } from '../lib/nav'
import { useCart } from '../context/useCart'
import { SearchIcon, AccountIcon, BagIcon, MenuIcon } from './Icons'

export default function Header() {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count, openCart } = useCart()
  const location = useLocation()

  // Navigating away closes whatever overlay was open.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMenuOpen(false)
    setSearchOpen(false)
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
            <Logo width={148} className="header__logo" />
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
              className="header__icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              aria-expanded={searchOpen}
            >
              <SearchIcon />
            </button>
            <NavLink to="/account" className="header__icon header__icon--account" aria-label="Account">
              <AccountIcon />
            </NavLink>
            <button
              type="button"
              className="header__icon header__icon--bag"
              onClick={openCart}
              aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            >
              <BagIcon />
              {count > 0 && <span className="header__count" aria-hidden="true">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
