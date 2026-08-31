import Button from '../components/Button'
import usePageMeta from '../lib/usePageMeta'

export default function NotFound() {
  usePageMeta({ title: 'Page not found — Tatvyra' })

  return (
    <div className="notfound">
      <div className="shell notfound__inner">
        <p className="eyebrow">404</p>
        <h1 className="display display--l">That page has moved on.</h1>
        <p className="lede">
          The link is broken or the page no longer exists. The range is all still here.
        </p>
        <div className="notfound__actions">
          <Button to="/shop" variant="primary">Shop Wellness Essentials</Button>
          <Button to="/" variant="quiet">Back to home</Button>
        </div>
      </div>
    </div>
  )
}
