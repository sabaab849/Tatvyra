import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import OrderConfirmation from './pages/OrderConfirmation'
import InfoPage from './pages/InfoPage'
import LegalPage from './pages/LegalPage'
import Faq from './pages/Faq'
import { PRIVACY_POLICY, OUR_POLICIES } from './data/legal'
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

            {/* Cart -> details -> payment -> confirmation. Each step is its own
                route so the back button behaves and a payment can be linked to
                its order afterwards. */}
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/payment" element={<Payment />} />
            <Route path="order/:reference" element={<OrderConfirmation />} />
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
            <Route path="faq" element={<Faq />} />
            <Route path="privacy" element={<LegalPage doc={PRIVACY_POLICY} />} />
            <Route path="policies" element={<LegalPage doc={OUR_POLICIES} />} />

            {/* Shipping and terms now live as sections of Our Policies; the old
                addresses land on the matching section. */}
            <Route
              path="shipping-returns"
              element={<Navigate to="/policies#shipping-policy" replace />}
            />
            <Route
              path="terms"
              element={<Navigate to="/policies#terms-and-conditions" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
