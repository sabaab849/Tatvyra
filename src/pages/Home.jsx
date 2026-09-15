import Hero from '../sections/Hero'
import BrandPhilosophy from '../sections/BrandPhilosophy'
import FourPillars from '../sections/FourPillars'
import ShopByCategory from '../sections/ShopByCategory'
import ShelfTrust from '../sections/ShelfTrust'
import BrandStory from '../sections/BrandStory'
import FinalCTA from '../sections/FinalCTA'
import usePageMeta from '../lib/usePageMeta'

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
      <FourPillars />
      <ShopByCategory />
      <ShelfTrust />
      <BrandStory />
      <FinalCTA />
    </>
  )
}
