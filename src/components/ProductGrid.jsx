import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function ProductGrid({ products, columns = 4, priorityCount = 0 }) {
  if (!products.length) {
    return <p className="grid-empty">No products match that filter yet.</p>
  }

  return (
    <ul className={`pgrid pgrid--${columns}`}>
      {products.map((product, index) => (
        <Reveal
          as="li"
          key={product.slug}
          delay={Math.min(index, 3) * 70}
          className="pgrid__item"
        >
          <ProductCard product={product} priority={index < priorityCount} />
        </Reveal>
      ))}
    </ul>
  )
}
