import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import SearchPanel from './SearchPanel'
import FeaturedCard from './FeaturedCard'
import { HEADER_NAV } from '../lib/nav'
import { getCategory, productsByCategory } from '../data/catalogue'
import { FEATURED_PRODUCTS } from '../data/featured'
import { useCart } from '../context/useCart'
import { ShoppingBagIcon, MenuIcon, SearchIcon, ArrowIcon } from './Icons'

/* How long the pointer may be off a menu before it closes — long enough to
   cross from the label down into the panel without it shutting on the way. */
const CLOSE_DELAY = 140

/* Every range a menu opens onto, in bar order. */
const MENU_RANGES = HEADER_NAV.flatMap((item) => item.ranges ?? [])

/**
 * The two columns of text links on the left of a mega-menu. Each range the
 * menu covers is a column: its name, its products, and a way to the whole
 * range. A menu with only one range fills the second column with the other
 * ranges instead, so every menu has the same two-column shape.
 */
function menuColumns(ranges) {
  const columns = ranges.slice(0, 2).map((slug) => {
    const category = getCategory(slug)
    return {
      heading: category.name,
      links: productsByCategory(slug).map((product) => ({
        label: product.name,
        to: `/product/${product.slug}`,
      })),
      all: { label: `Shop all ${category.name}`, to: `/shop/${slug}` },
    }
  })

  if (columns.length < 2) {
    columns.push({
      heading: 'More to explore',
      links: MENU_RANGES.filter((slug) => !ranges.includes(slug)).map((slug) => ({
        label: getCategory(slug).name,
        to: `/shop/${slug}`,
      })),
      all: { label: 'Shop all products', to: '/shop' },
    })
  }

  return columns
}

/**
 * The site header: the lockup on the left, five primary links in the middle
 * (with Home ahead of them on every page but the homepage), and search, cart
 * and the Shop Now pill on the right.
 *
 * "Greens", "Spreads" and "Honey" are not pages but menus. Each opens a mega-menu
 * under the bar — on hover, on focus or on click. On its left, two columns of
 * text links: the ranges it covers and their products, read from the
 * catalogue. On its right, a "Featured" row of four product cards
 * (data/featured.js), each playing its own short video while hovered. Escape,
 * a click elsewhere, or moving on closes it.
 *
 * Below the desktop width the links give way to a burger that opens the
 * overlay menu (MobileMenu); the lockup centres and the cart stays in reach.
 */
export default function Header() {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mega, setMega] = useState(null)
  const closeTimer = useRef(0)
  const headerRef = useRef(null)
  const { count, openCart } = useCart()
  const location = useLocation()

  // Navigating away closes whatever was open.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMenuOpen(false)
    setSearchOpen(false)
    setMega(null)
  }

  // A single threshold, no scroll-linked animation — the bar just settles.
  // React is only asked to update when the threshold is actually crossed,
  // not on every one of the scroll's events.
  useEffect(() => {
    let current = null
    const onScroll = () => {
      const next = window.scrollY > 24
      if (next === current) return
      current = next
      setCompact(next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While a mega-menu is open: Escape or a press outside the header closes it.
  useEffect(() => {
    if (!mega) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMega(null)
    }
    const onPress = (event) => {
      if (!headerRef.current?.contains(event.target)) setMega(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPress)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPress)
    }
  }, [mega])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const openMega = (label) => {
    clearTimeout(closeTimer.current)
    setMega(label)
  }
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMega(null), CLOSE_DELAY)
  }

  return (
    <>
      <header ref={headerRef} className={`header ${compact ? 'header--compact' : ''}`}>
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
            <Logo width={160} className="header__logo" />
          </div>

          <nav className="header__nav" aria-label="Primary">
            <ul className="header__nav-list">
              {/* On the homepage the lockup is the way home; anywhere else
                  it is spelled out too, as the first link. */}
              {location.pathname !== '/' && (
                <li className="header__item">
                  <NavLink to="/" end className="header__link">
                    Home
                  </NavLink>
                </li>
              )}
              {HEADER_NAV.map((item) => {
                if (item.to) {
                  return (
                    <li key={item.label} className="header__item">
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
                  )
                }

                const open = mega === item.label
                const panelId = `mega-${item.label.toLowerCase()}`
                const here = item.ranges.some((slug) => location.pathname === `/shop/${slug}`)
                return (
                  <li
                    key={item.label}
                    className="header__item"
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') openMega(item.label)
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === 'mouse') closeMegaSoon()
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setMega(null)
                    }}
                  >
                    <button
                      type="button"
                      className={`header__link header__link--menu ${here ? 'is-active' : ''} ${open ? 'is-open' : ''}`}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => (open ? setMega(null) : openMega(item.label))}
                    >
                      {item.label}
                      <svg className="header__caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div
                      id={panelId}
                      className={`mega ${open ? 'is-open' : ''}`}
                      inert={!open}
                    >
                      <div className="mega__inner shell">
                        <div className="mega__links">
                          {menuColumns(item.ranges).map((column) => (
                            <section key={column.heading} className="mega__column" aria-label={column.heading}>
                              <p className="mega__name">{column.heading}</p>
                              <ul className="mega__list">
                                {column.links.map((link) => (
                                  <li key={link.to}>
                                    <Link to={link.to} className="mega__link">
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link to={column.all.to} className="mega__all">
                                {column.all.label} <ArrowIcon width={14} height={14} />
                              </Link>
                            </section>
                          ))}
                        </div>

                        <section className="mega__featured" aria-label="Featured products">
                          <p className="mega__name">Featured</p>
                          <ul className="mega__cards">
                            {FEATURED_PRODUCTS.map((product) => (
                              <li key={product.id}>
                                <FeaturedCard product={product} />
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__icon header__icon--search"
              onClick={() => {
                setMega(null)
                setSearchOpen(true)
              }}
              aria-label="Search products"
            >
              <SearchIcon />
            </button>
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
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
