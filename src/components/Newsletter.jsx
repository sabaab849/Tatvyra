import { useState } from 'react'
import Button from './Button'

/**
 * The form is wired for a real subscribe endpoint but none is connected yet,
 * so it acknowledges the address locally and says exactly that rather than
 * pretending a list signup happened.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="newsletter"
      onSubmit={(event) => {
        event.preventDefault()
        if (!email.trim()) return
        setSubmitted(true)
      }}
    >
      <label className="newsletter__label" htmlFor="newsletter-email">
        Get the range, the recipes and new formats — occasionally, never daily.
      </label>
      <div className="newsletter__row">
        <input
          id="newsletter-email"
          className="newsletter__input"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setSubmitted(false)
          }}
        />
        <Button type="submit" variant="accent">
          Sign up
        </Button>
      </div>
      <p className="newsletter__status" role="status">
        {submitted
          ? 'Thanks — the mailing list is being set up. Write to connect@feynmanfoodcraft.com in the meantime and we will add you.'
          : ''}
      </p>
    </form>
  )
}
