import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { ArrowIcon } from './Icons'

/**
 * Reference copy that closes a product page: how to use a product, how to store
 * it, and where the authoritative information lives.
 *
 * Everything here is general guidance that applies to the whole range, so it is
 * static rather than driven by the catalogue — it states no ingredient, dosage,
 * certification or benefit, and makes no medical claim. Anything SKU-specific
 * stays in ProductInfo, which only prints fields the catalogue actually has.
 *
 * The privacy note is included because the page carries a cart: size, quantity
 * and Add to cart, plus a price-enquiry address.
 */
export default function ProductInformation() {
  return (
    <section className="pdoc" aria-labelledby="pdoc-title">
      <div className="shell pdoc__inner">
        <Reveal className="pdoc__head">
          <h2 id="pdoc-title" className="pdoc__title">
            Product Information
          </h2>
        </Reveal>

        <Reveal delay={110}>
          <dl className="pdoc__list">
            <div className="pdoc__item">
              <dt>Product use</dt>
              <dd>
                <p>
                  Tatvyra products are intended to complement a balanced diet and healthy
                  lifestyle. Use each product according to the recommended serving and usage
                  instructions provided on the product packaging.
                </p>
              </dd>
            </div>

            <div className="pdoc__item">
              <dt>Individual results</dt>
              <dd>
                <p>
                  Individual results may vary depending on factors such as diet, lifestyle,
                  consistency, and individual circumstances.
                </p>
              </dd>
            </div>

            <div className="pdoc__item">
              <dt>Health &amp; safety</dt>
              <dd>
                <p>
                  These products are not intended to diagnose, treat, cure, or prevent any disease
                  or medical condition.
                </p>
                <p>
                  If you are pregnant, nursing, taking medication, have an existing medical
                  condition, or have concerns about using a supplement, consult a qualified
                  healthcare professional before use.
                </p>
              </dd>
            </div>

            <div className="pdoc__item">
              <dt>Storage</dt>
              <dd>
                <p>
                  Store products according to the instructions provided on the packaging. Keep
                  products out of reach of children.
                </p>
              </dd>
            </div>

            <div className="pdoc__item">
              <dt>On-pack information</dt>
              <dd>
                <p>
                  Always refer to the product packaging for the most current information regarding
                  ingredients, recommended use, allergens, warnings, storage, and other
                  product-specific instructions.
                </p>
              </dd>
            </div>

            <div className="pdoc__item">
              <dt>Privacy</dt>
              <dd>
                <p>
                  Information submitted through our website is used to process your request,
                  provide our services, and improve your experience. We do not sell your personal
                  information to third parties.
                </p>
                <Link to="/privacy" className="pdoc__link">
                  View Privacy Policy
                  <ArrowIcon width={16} height={16} />
                </Link>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
