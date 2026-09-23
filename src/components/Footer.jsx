import { Link } from 'react-router-dom'
import Logo from './Logo'
import Newsletter from './Newsletter'
import { BRAND } from '../data/brand'
import { CATEGORIES } from '../data/catalogue'
import { POLICY_NAV, SUPPORT_NAV } from '../lib/nav'
import { MailIcon, PhoneIcon, PinIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="footer__top shell">
        <div className="footer__brand">
          <Logo variant="full" width={180} className="footer__logo" />
          <p className="footer__positioning">{BRAND.positioning}</p>
        </div>
        <div className="footer__signup">
          <Newsletter />
        </div>
      </div>

      <div className="footer__mid shell">
        <nav className="footer__col" aria-labelledby="footer-shop">
          <h2 className="footer__heading" id="footer-shop">Shop</h2>
          <ul>
            <li><Link to="/shop">All products</Link></li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link to={`/shop/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-labelledby="footer-company">
          <h2 className="footer__heading" id="footer-company">Company</h2>
          <ul>
            <li><Link to="/about">About</Link></li>
            {SUPPORT_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__col--contact">
          <h2 className="footer__heading">Contact</h2>
          <ul className="footer__contact">
            <li>
              <MailIcon width={18} height={18} />
              <span>
                {BRAND.contact.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`}>{email}</a>
                ))}
              </span>
            </li>
            <li>
              <PhoneIcon width={18} height={18} />
              <span>
                {BRAND.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                ))}
              </span>
            </li>
            <li>
              <PinIcon width={18} height={18} />
              <address>
                {BRAND.contact.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--mark">
          <h2 className="footer__heading">Standards</h2>
          {/* The FSSAI mark is the brand's own supplied asset and is used with
              the same wording as the Tatvyra catalogue. */}
          <img
            className="footer__fssai"
            src="/images/fssai-mark.webp"
            alt="FSSAI"
            width={132}
            height={64}
            loading="lazy"
          />
          <p className="footer__fssai-note">FSSAI-certified process behind every batch.</p>
        </div>
      </div>

      <div className="footer__bottom shell">
        {/* The policies sit with the copyright line, below the main footer
            navigation, and take no heading of their own. */}
        <div className="footer__legal">
          <p>
            {/* The company name ends on "Ltd.", which closes the sentence. */}
            © {new Date().getFullYear()} {BRAND.company} All rights reserved.
          </p>
          <nav aria-label="Policies">
            <ul className="footer__policies">
              {POLICY_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="footer__line">{BRAND.line}</p>
        <p className="footer__site">{BRAND.website}</p>
      </div>
    </footer>
  )
}
