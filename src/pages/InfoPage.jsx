import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { BRAND } from '../data/brand'
import usePageMeta from '../lib/usePageMeta'

/**
 * Placeholder for the policy pages the footer links to.
 *
 * Shipping terms, returns windows, privacy practices and legal terms are not
 * in the supplied brand material. Writing them would mean inventing commitments
 * the company has not made, so each page says what it is for and routes to a
 * real contact instead.
 */
export default function InfoPage({ title, eyebrow, summary }) {
  usePageMeta({ title: `${title} — Tatvyra`, description: summary })

  return (
    <div className="info">
      <header className="page-head">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display display--l">{title}</h1>
            <p className="lede page-head__lede">{summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="shell">
        <Reveal className="info__body">
          <p>
            This page is being prepared. Rather than publish terms {BRAND.company} has not yet
            finalised, we have left it blank on purpose.
          </p>
          <p>
            For anything you need in the meantime, write to{' '}
            <a href={`mailto:${BRAND.contact.emails[0]}`}>{BRAND.contact.emails[0]}</a> or call{' '}
            <a href={`tel:${BRAND.contact.phones[0].replace(/\s/g, '')}`}>
              {BRAND.contact.phones[0]}
            </a>
            . You will get a direct answer.
          </p>
          <Button to="/contact" variant="outline">
            Contact us
          </Button>
        </Reveal>
      </div>
    </div>
  )
}
