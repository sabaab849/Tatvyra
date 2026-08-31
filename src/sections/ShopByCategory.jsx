import SectionHeading from '../components/SectionHeading'
import CategoryCard from '../components/CategoryCard'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { CATEGORIES } from '../data/catalogue'

export default function ShopByCategory() {
  return (
    <section className="section categories" aria-labelledby="categories-title">
      <div className="shell">
        <SectionHeading
          id="categories-title"
          eyebrow="Shop by category"
          title="Four foods, done properly."
          intro="Everything Tatvyra makes sits in one of four ranges. Start where your routine already is."
          action={
            <Button to="/shop" variant="quiet">
              All products
            </Button>
          }
        />

        <ul className="categories__grid">
          {CATEGORIES.map((category, index) => (
            <Reveal as="li" key={category.slug} delay={index * 80}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
