import { Link, Navigate, useParams } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductGrid from '../components/ProductGrid'
import ProductSpotlight from '../components/ProductSpotlight'
import ProductCampaign from '../components/ProductCampaign'
import ProductFaq from '../components/ProductFaq'
import ProductInformation from '../components/ProductInformation'
import SectionHeading from '../components/SectionHeading'
import { getCategory, getProduct, productsByCategory } from '../data/catalogue'
import usePageMeta from '../lib/usePageMeta'

export default function Product() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const category = product ? getCategory(product.category) : null

  usePageMeta({
    title: product ? `${product.name} — Tatvyra` : 'Product — Tatvyra',
    description: product ? product.descriptor : undefined,
  })

  if (!product) return <Navigate to="/shop" replace />

  const related = productsByCategory(product.category).filter((p) => p.slug !== product.slug)

  return (
    <div className="pdp">
      <nav className="pdp__crumbs shell" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to={`/shop/${category.slug}`}>{category.name}</Link></li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="shell pdp__main">
        <ProductGallery product={product} category={category} />
        <ProductInfo product={product} category={category} />
      </div>

      {related.length > 0 && (
        <section className="section section--sunken" aria-labelledby="related-title">
          <div className="shell">
            <SectionHeading
              id="related-title"
              eyebrow={`More ${category.name}`}
              title="The rest of the range."
              size="s"
            />
            <ProductGrid products={related} columns={4} />
          </div>
        </section>
      )}

      <ProductSpotlight product={product} />
      <ProductCampaign product={product} />
      <ProductFaq product={product} />
      <ProductInformation />
    </div>
  )
}
