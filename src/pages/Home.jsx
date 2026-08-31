import Hero from '../sections/Hero'
import BrandPhilosophy from '../sections/BrandPhilosophy'
import ShopByCategory from '../sections/ShopByCategory'
import FeaturedProducts from '../sections/FeaturedProducts'
import CleanLabel from '../sections/CleanLabel'
import IngredientStory from '../sections/IngredientStory'
import WhyTatvyra from '../sections/WhyTatvyra'
import CategoryFeature from '../sections/CategoryFeature'
import BrandStory from '../sections/BrandStory'
import FinalCTA from '../sections/FinalCTA'
import { getCategory } from '../data/catalogue'
import usePageMeta from '../lib/usePageMeta'

/**
 * Long-form editorial headlines per range. Each stays inside what the
 * catalogue actually says about the category.
 */
const FEATURES = [
  {
    slug: 'raw-honey',
    headline: 'Four honeys, kept apart.',
    body: 'Wild forest, multifloral, Himalayan and Kashmiri white acacia — bottled by origin rather than blended into one house style, because a dense forest floral and a high-altitude harvest taste nothing alike.',
  },
  {
    slug: 'moringa',
    headline: 'The leaf, in whichever form fits.',
    body: 'Powder for the morning glass, effervescent tablets for the bag, tablets and capsules for the desk, gummies for anyone who has quietly given up on capsules. Same leaf throughout.',
  },
  {
    slug: 'spirulina',
    headline: 'Protein-dense, plainly made.',
    body: 'Spirulina in powder, tablet and capsule form. Deep green, extremely protein-dense, and rich in B-vitamins, iron and magnesium.',
  },
  {
    slug: 'nut-butters',
    headline: 'Milled from the nut. Full stop.',
    body: 'Peanut, chocolate peanut, almond and cashew — spreads with no hydrogenated oils, no added sugar and no preservatives, in three jar sizes.',
  },
]

export default function Home() {
  usePageMeta({
    title: 'Tatvyra — Rise. Nourish. Thrive.',
    description:
      'Clean-label wellness essentials from Tatvyra by Feynman Foodcraft: nut butters, moringa, spirulina and single-origin raw honey.',
  })

  return (
    <>
      <Hero />
      <BrandPhilosophy />
      <ShopByCategory />
      <FeaturedProducts />
      <CleanLabel />
      <IngredientStory />
      <WhyTatvyra />

      <div className="feature-run">
        {FEATURES.map((feature, index) => (
          <CategoryFeature
            key={feature.slug}
            category={getCategory(feature.slug)}
            headline={feature.headline}
            body={feature.body}
            reversed={index % 2 === 1}
          />
        ))}
      </div>

      <BrandStory />
      <FinalCTA />
    </>
  )
}
