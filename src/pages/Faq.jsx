import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { ArrowIcon } from '../components/Icons'
import { BRAND } from '../data/brand'
import { FAQ, faqStructuredData } from '../data/faq'
import usePageMeta from '../lib/usePageMeta'

/**
 * The FAQ page: the shared page head, then a contents column beside the
 * questions, grouped by topic. It borrows the policy pages' contents rail and
 * contact block, and the product FAQ's native <details> questions, so it adds
 * no new visual pattern. All copy lives in data/faq.js.
 */

function Answer({ blocks }) {
  return blocks.map((block, index) =>
    typeof block === 'string' ? (
      <p key={index}>{block}</p>
    ) : (
      <ul key={index} className="faqpage__list">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  )
}

function AnswerLink({ link }) {
  const content = (
    <>
      {link.label}
      <ArrowIcon width={16} height={16} />
    </>
  )
  return link.to ? (
    <Link to={link.to} className="pdoc__link">
      {content}
    </Link>
  ) : (
    <a href={link.href} className="pdoc__link">
      {content}
    </a>
  )
}

export default function Faq() {
  usePageMeta({
    title: 'Frequently asked questions — Tatvyra',
    description:
      'Answers about the Tatvyra range, ingredients and labels, ordering, and how to reach us.',
  })

  const [email] = BRAND.contact.emails
  const [phone] = BRAND.contact.phones

  return (
    <div className="faqpage">
      {/* The same questions as structured data, so search engines can read
          them as an FAQ. Built from the page's own copy. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData()).replace(/</g, '\\u003c'),
        }}
      />

      <header className="page-head">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Support</p>
            <h1 className="display display--l">Frequently asked questions</h1>
            <p className="lede page-head__lede">
              About the range, what is on the label, ordering, and how to reach us.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="shell legal__layout">
        <aside className="legal__aside">
          <nav className="legal__toc" aria-labelledby="faq-toc-title">
            <p id="faq-toc-title" className="legal__aside-title">
              Topics
            </p>
            <ol>
              {FAQ.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`}>{group.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__contact">
            <p className="legal__aside-title">Still have a question?</p>
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

        <div className="faqpage__body">
          {FAQ.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="faqpage__group"
              aria-labelledby={`${group.id}-title`}
            >
              <h2 id={`${group.id}-title`} className="faqpage__group-title">
                {group.title}
              </h2>
              <div className="faqpage__items">
                {group.items.map((item) => (
                  <details key={item.q} className="faq__item">
                    <summary>
                      <span className="faq__q">{item.q}</span>
                      <span className="faq__sign" aria-hidden="true" />
                    </summary>
                    <div className="faq__a faqpage__a">
                      <Answer blocks={item.a} />
                      {item.links && (
                        <p className="faqpage__links">
                          {item.links.map((link) => (
                            <AnswerLink key={link.label} link={link} />
                          ))}
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <Reveal className="faqpage__outro">
            <p className="faqpage__outro-title">Didn’t find your answer?</p>
            <p className="faqpage__outro-body">
              Write to us at <a href={`mailto:${email}`}>{email}</a> — you will get a direct
              answer.
            </p>
            <Button to="/contact" variant="outline">
              Contact us
            </Button>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
