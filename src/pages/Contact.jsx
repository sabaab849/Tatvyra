import { useState } from 'react'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { BRAND } from '../data/brand'
import { MailIcon, PinIcon } from '../components/Icons'
import usePageMeta from '../lib/usePageMeta'

/** Field name -> validator. Returns a message, or null when the value is fine.
 *  Contact number is optional and deliberately has no rule. */
const RULES = {
  name: (v) => (v.trim() ? null : 'Please enter your name.'),
  email: (v) => {
    if (!v.trim()) return 'Please enter your email.'
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'Please enter a valid email.'
  },
  message: (v) => (v.trim() ? null : 'Please enter your message.'),
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  // Clear a field's message as soon as it is corrected, not on the next submit.
  const recheck = (event) => {
    const { name, value } = event.target
    setErrors((prev) => (prev[name] && !RULES[name]?.(value) ? { ...prev, [name]: null } : prev))
  }

  const validated = (name) => ({
    onChange: recheck,
    'aria-required': 'true',
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  })

  const errorText = (name) =>
    errors[name] && (
      <p className="field__error" id={`contact-${name}-error`}>
        {errors[name]}
      </p>
    )

  const requiredMark = <span className="field__req" aria-hidden="true">*</span>

  usePageMeta({
    title: 'Contact | Tatvyra',
    description: `Contact ${BRAND.company} about Tatvyra products, stockists, pricing and wholesale.`,
  })

  return (
    <div className="contact">
      <header className="page-head">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display display--l">Talk to the Team.</h1>
            <p className="lede page-head__lede">
              Retail enquiries, wholesale, stockists and pricing: the fastest route is email.
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
                  <span key={email} className="contact__email">
                    <span className="contact__email-for">{BRAND.contact.emailFor[email]}</span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </span>
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
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              const form = event.currentTarget
              const found = {}
              for (const [name, rule] of Object.entries(RULES)) {
                const message = rule(form.elements[name].value)
                if (message) found[name] = message
              }
              setErrors(found)
              const first = Object.keys(RULES).find((name) => found[name])
              if (first) {
                form.elements[first].focus()
                return
              }
              setSent(true)
            }}
          >
            <h2 className="contact__subtitle">Send an Enquiry</h2>

            <div className="field">
              <label htmlFor="contact-name">Name{requiredMark}</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" {...validated('name')} />
              {errorText('name')}
            </div>

            <div className="field">
              <label htmlFor="contact-email">Email{requiredMark}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" {...validated('email')} />
              {errorText('email')}
            </div>

            <div className="field">
              <label htmlFor="contact-phone">Contact number (optional)</label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
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
              <textarea id="contact-message" name="message" rows={5} {...validated('message')} />
              {errorText('message')}
            </div>

            <Button type="submit" variant="primary">Send enquiry</Button>

            <p className="contact__status" role="status">
              {sent
                ? `Online submission is not connected yet. Please email ${BRAND.contact.emails[0]} with the details above and the team will reply.`
                : `Online submission is not connected yet, so this form will point you to email.`}
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
