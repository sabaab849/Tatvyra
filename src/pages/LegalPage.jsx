import Reveal from '../components/Reveal'
import { BRAND } from '../data/brand'
import usePageMeta from '../lib/usePageMeta'

/**
 * A long-form legal document: the page header, then a contents column beside a
 * single reading column. Driven by a document from data/legal.js, so each
 * policy is content, not a new page.
 */

function Block({ block }) {
  if (block.type === 'list') {
    return (
      <ol className="legal__list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    )
  }
  if (block.type === 'note') {
    return (
      <p className="legal__note">
        <span className="legal__note-label">Note:</span> {block.text}
      </p>
    )
  }
  // Copy still to come from Tatvyra, set apart so it can't read as policy.
  if (block.type === 'pending') return <p className="legal__pending">{block.text}</p>
  return <p>{block.text}</p>
}

export default function LegalPage({ doc }) {
  usePageMeta({ title: `${doc.title} — Tatvyra`, description: doc.description })

  const email = BRAND.contact.emails[0]
  const phone = BRAND.contact.phones[0]

  return (
    <div className="legal">
      <header className="page-head">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{doc.eyebrow}</p>
            <h1 className="display display--l">{doc.title}</h1>
          </Reveal>
        </div>
      </header>

      <div className="shell legal__layout">
        <aside className="legal__aside">
          <nav className="legal__toc" aria-labelledby="legal-toc-title">
            <p id="legal-toc-title" className="legal__aside-title">
              On this page
            </p>
            <ol>
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__contact">
            <p className="legal__aside-title">{doc.contactTitle}</p>
            <ul>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              </li>
            </ul>
          </div>
        </aside>

        <article className="legal__body">
          <div className="legal__intro">
            {doc.intro.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          {doc.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="legal__section"
              aria-labelledby={`${section.id}-title`}
            >
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}
