import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import InfoPage from './pages/InfoPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:categorySlug" element={<Shop />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="account"
              element={
                <InfoPage
                  eyebrow="Account"
                  title="Your account"
                  summary="Order history and saved details will live here once online ordering opens."
                />
              }
            />
            <Route
              path="faq"
              element={
                <InfoPage
                  eyebrow="Support"
                  title="Frequently asked questions"
                  summary="Answers about the range, formats and availability."
                />
              }
            />
            <Route
              path="shipping-returns"
              element={
                <InfoPage
                  eyebrow="Support"
                  title="Shipping & returns"
                  summary="How orders are dispatched and what happens if something is wrong."
                />
              }
            />
            <Route
              path="privacy"
              element={
                <InfoPage
                  eyebrow="Legal"
                  title="Privacy policy"
                  summary="What we collect, why, and what we do with it."
                />
              }
            />
            <Route
              path="terms"
              element={
                <InfoPage
                  eyebrow="Legal"
                  title="Terms"
                  summary="The terms that apply to using this site and buying from it."
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
