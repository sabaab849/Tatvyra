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
   public/brand/tatvyra-mark.svg, so the proportions are the brand's. The
   three leaves and the dot above them; the section colours the whole mark. */
const LEAF_MARK = [
  {
    transform: 'matrix(1,0,0,-1,131.5,63.803895)',
    d: 'M0 0C0 0-6.095 15.54 9.489 18.239 9.489 18.239 4.266 13.451 2.785 10.142 1.306 6.834 .87 6.312 0 0',
  },
  {
    transform: 'matrix(1,0,0,-1,142.0332,45.565095)',
    d: 'M0 0C0 0 2.351-8.097-.521-11.84-3.395-15.583-6.268-17.02-8.4-17.629-8.4-17.629-3.786-12.188-3.481-6.617-3.481-6.617-3.809-5.463-4.331-6.66-4.331-6.66-4.236-11.332-9.46-17.513-9.46-17.513-10.099-9.098 0 0',
  },
  {
    transform: 'matrix(1,0,0,-1,130.4844,51.26779)',
    d: 'M0 0C0 0-2.67 2.38-9.461 1.944-9.461 1.944-10.215-2.524-8.735-6.384-7.255-10.244-3.509-11.666-.158-12.188-.158-12.188-2.67-4.324 0 0',
  },
  {
    transform: 'matrix(1,0,0,-1,133.2695,44.530488)',
    d: 'M0 0C0-2.102-1.704-3.806-3.806-3.806-5.908-3.806-7.612-2.102-7.612 0-7.612 2.102-5.908 3.806-3.806 3.806-1.704 3.806 0 2.102 0 0',
  },
]

export default function AboutPhilosophy({ children }) {
  return (
    <div className="about-philosophy">
      <div className="about-philosophy__art" aria-hidden="true">
        <svg className="about-philosophy__leaf" viewBox="120.8 40.7 22.2 23.1" focusable="false">
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
