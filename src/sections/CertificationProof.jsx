/**
 * "Certified. Trusted. Transparent." — the marks the range is made under, as a
 * trust band: one centred line of type, the four marks in a single centred row
 * beneath it, and a rule closing the section.
 *
 * No names, no numbers, no descriptions on the page — the marks carry
 * themselves, and each names itself to a screen reader through its alt text.
 *
 * The marks are the official artwork, untouched — no frame, tint or filter.
 * The four files share one canvas height with the artwork centred in it and
 * trimmed to the same optical area, so one height renders them at one scale:
 * the wide mark stays wide, the square ones stay square, and all four carry
 * the same weight. It is the height they have carried through every version of
 * this section.
 */
const MARKS = [
  { id: 'fssai', name: 'FSSAI', src: '/images/certifications/fssai.webp', width: 636 },
  { id: 'iso-22000', name: 'ISO 22000', src: '/images/certifications/iso-22000.webp', width: 460 },
  { id: 'gmp', name: 'GMP', src: '/images/certifications/gmp.webp', width: 457 },
  { id: 'india-organic', name: 'India Organic', src: '/images/certifications/india-organic.webp', width: 488 },
]

const WORDS = ['Certified', 'Trusted', 'Transparent']

export default function CertificationProof({ marks = MARKS }) {
  return (
    <section className="proof" aria-labelledby="proof-title">
      <div className="shell">
        <h2 id="proof-title" className="proof__title">
          {WORDS.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </h2>

        <ul className="proof__row">
          {marks.map((mark) => (
            <li key={mark.id}>
              <img
                src={mark.src}
                alt={mark.name}
                width={mark.width}
                height={520}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
