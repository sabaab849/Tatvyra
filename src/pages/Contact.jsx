import { useState } from 'react'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { BRAND } from '../data/brand'
import { MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import usePageMeta from '../lib/usePageMeta'

export default function Contact() {
  const [sent, setSent] = useState(false)

  usePageMeta({
    title: 'Contact — Tatvyra',
    description: `Contact ${BRAND.company} about the Tatvyra range, stockists, pricing and wholesale.`,
  })

  return (
    <div className="contact">
      <header className="page-head">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display display--l">Talk to the team.</h1>
            <p className="lede page-head__lede">
              Retail enquiries, wholesale, stockists and pricing — the fastest route is email.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="shell contact__body">
        <Reveal className="contact__details">
          <h2 className="contact__subtitle">{BRAND.company}</h2>
          <ul className="contact__list">
            <li>
              <MailIcon width={18} height={18} />
              <div>
                {BRAND.contact.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`}>{email}</a>
                ))}
              </div>
            </li>
            <li>
              <PhoneIcon width={18} height={18} />
              <div>
                {BRAND.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                ))}
              </div>
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
        </Reveal>

        <Reveal className="contact__form-wrap" delay={100}>
          {/* No form backend is connected yet, so the form does not claim to
              have sent anything — it hands the visitor a working mailto. */}
          <form
            className="contact__form"
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
          >
            <h2 className="contact__subtitle">Send an enquiry</h2>

            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className="field">
              <label htmlFor="contact-topic">Topic</label>
              <select id="contact-topic" name="topic" defaultValue="general">
                <option value="general">General enquiry</option>
                <option value="pricing">Pricing &amp; availability</option>
                <option value="wholesale">Wholesale &amp; distribution</option>
                <option value="product">Product information</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>

            <Button type="submit" variant="primary">Send enquiry</Button>

            <p className="contact__status" role="status">
              {sent
                ? `Online submission is not connected yet. Please email ${BRAND.contact.emails[0]} with the details above and the team will reply.`
                : `Online submission is not connected yet — this form will point you to email.`}
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
