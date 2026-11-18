import { Link } from 'react-router-dom'
import Logo from './Logo'
import Newsletter from './Newsletter'
import { BRAND } from '../data/brand'
import { CATEGORIES } from '../data/catalogue'

/* The company column. FAQs and Our Policies are the same pages the header's
   mobile menu lists; the labels here are the footer's own. */
const COMPANY_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Our Policies', to: '/policies' },
]

/* The bottom bar. Terms and shipping are sections of Our Policies, so they
   link straight to them. */
const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/policies#terms-and-conditions' },
  { label: 'Shipping & Returns', to: '/policies#shipping-policy' },
]

/**
 * The site footer, in three bands on the aubergine ground:
 *
 *   the brand — the lockup and its line — beside the newsletter;
 *   four columns: Shop, Company, Contact and Standards, each a quiet coral
 *   label over its content, all starting on one line;
 *   and a bottom bar with the copyright and the legal links.
 *
 * The bands are set apart by space alone: no rules, no panels.
 */
export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="footer__top shell">
        <div className="footer__brand">
          <Logo reversed width={168} className="footer__logo" />
          <p className="footer__positioning">{BRAND.positioning}</p>
        </div>
        <div className="footer__signup">
          <Newsletter />
        </div>
      </div>

      <div className="footer__mid shell">
        <nav className="footer__col footer__col--shop" aria-labelledby="footer-shop">
          <h2 className="footer__heading" id="footer-shop">Shop</h2>
          <ul className="footer__list">
            <li><Link to="/shop">All Products</Link></li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link to={`/shop/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col footer__col--company" aria-labelledby="footer-company">
          <h2 className="footer__heading" id="footer-company">Company</h2>
          <ul className="footer__list">
            {COMPANY_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__col--contact">
          <h2 className="footer__heading">Contact</h2>
          <ul className="footer__list footer__contact">
            {BRAND.contact.footerEmails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            ))}
            <li>
              {/* One address, allowed to wrap where the column needs it rather
                  than at fixed lines, under a label that says what it is. */}
              <span className="footer__contact-label">Office address</span>
              <address>{BRAND.contact.address.join(', ')}</address>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--standards">
          <h2 className="footer__heading">Standards</h2>
          {/* The FSSAI mark is the brand's own supplied asset and is used with
              the same wording as the Tatvyra catalogue. */}
          <img
            className="footer__fssai"
            src="/images/fssai-mark.webp"
            alt="FSSAI"
            width={120}
            height={58}
            loading="lazy"
          />
        </div>
      </div>

      <div className="footer__bottom shell">
        <div className="footer__credits">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          {/* The studio that built the site, with its mark. */}
          <a
            className="footer__maker"
            href="https://www.digiveritaz.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by
            <img
              className="footer__maker-mark"
              src="/brand/digiveritaz-mark.webp"
              alt=""
              width={20}
              height={19}
              loading="lazy"
            />
            DigiVeritaz
          </a>
        </div>
        <nav aria-label="Legal">
          <ul className="footer__legal">
            {LEGAL_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
