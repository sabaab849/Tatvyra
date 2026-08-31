import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import Button from '../components/Button'
import { featuredProducts } from '../data/catalogue'

export default function FeaturedProducts() {
  return (
    <section className="section section--sunken" aria-labelledby="featured-title">
      <div className="shell">
        <SectionHeading
          id="featured-title"
          eyebrow="Featured"
          title="Where most people start."
          intro="One from each range — the everyday formats that do the most work."
          action={
            <Button to="/shop" variant="quiet">
              Shop everything
            </Button>
          }
        />
        <ProductGrid products={featuredProducts()} columns={4} />
      </div>
    </section>
  )
}
