/**
 * The founder's philosophy, on its own ground.
 *
 * The leaf mark is drawn large and faint, bleeding off the left edge, with a
 * thin Purple arc and a Purple wash in the opposite corner. All of it is
 * decoration, hidden from assistive technology.
 *
 * Whatever follows on the page is passed as children so it shares this
 * ground: the mark and the wash run on behind it instead of stopping at a seam.
 */

/* The leaf mark's own paths, lifted unchanged from the lockup in
   public/brand/tatvyra-logo.svg, so the proportions are the brand's. */
const LEAF_MARK = [
  {
    transform: 'matrix(1,0,0,-1,307.7662,89.688419)',
    d: 'M0 0C4.335-.648 8.138-2.253 11.33-5.354 15.98-9.874 10.747-11.957 12.806-17.139L13.008-17.499 12.773-17.611C3.978-15.982 .431-8.129 0 0',
  },
  {
    transform: 'matrix(1,0,0,-1,335.0089,89.86255)',
    d: 'M0 0 .584 .045 .787-.156C.916-.975 .633-1.632 .53-2.425-.47-10.129-4.219-16.014-12.203-17.523-9.328-13.073-14.24-10.575-11.533-6.588-8.864-2.656-4.413-.972 0 0',
  },
  {
    transform: 'matrix(1,0,0,-1,321.3817,82.84021)',
    d: 'M0 0C2.202 .265 4.21-1.284 4.513-3.481 4.816-5.678 3.303-7.713 1.11-8.054-.341-8.28-1.803-7.705-2.71-6.55-3.619-5.395-3.833-3.84-3.271-2.482-2.71-1.125-1.459-.176 0 0',
  },
]

export default function AboutPhilosophy({ children }) {
  return (
    <div className="about-philosophy">
      <div className="about-philosophy__art" aria-hidden="true">
        <svg className="about-philosophy__leaf" viewBox="307.7 82.7 28.2 24.8" focusable="false">
          {LEAF_MARK.map((path) => (
            <path key={path.transform} transform={path.transform} d={path.d} />
          ))}
        </svg>
      </div>

      <section className="about-philosophy__section" aria-label="The founder’s philosophy">
        <div className="shell">
          <div className="about-philosophy__inner">
            <div className="about-philosophy__row">
              <blockquote className="about-philosophy__quote">
                {/* The marks are typographic dressing — the blockquote already
                    tells a screen reader this is a quotation. */}
                <p>
                  <span className="about-philosophy__mark" aria-hidden="true">“</span>
                  Fit India. Hit India.
                  <span className="about-philosophy__mark" aria-hidden="true">”</span>
                </p>
              </blockquote>

              <p className="about-philosophy__tagline">
                <span>Natural nutrition for a brighter tomorrow</span>
                <span className="about-philosophy__brand">Tatvyra</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {children}
    </div>
  )
}
