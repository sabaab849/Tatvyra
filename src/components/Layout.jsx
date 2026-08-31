import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'

export default function Layout() {
  const { pathname } = useLocation()

  // Route changes should land at the top of the new page, not mid-scroll.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
