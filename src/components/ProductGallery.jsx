import { useState } from 'react'

/**
 * Gallery for a product detail page.
 *
 * There is no per-SKU packshot in the supplied assets yet, so when a product
 * has no images of its own the gallery falls back to the brand's authentic
 * range photography and says so in the caption rather than implying the image
 * is the pack.
 */
export default function ProductGallery({ product, category }) {
  const images = product.images?.length
    ? product.images
    : [
        { src: category.image, alt: category.imageAlt, focus: product.focus, zoom: product.zoom },
        {
          src: '/images/hero-scene.webp',
          alt: 'The Tatvyra range — nut butter, moringa, spirulina and raw honey — set out together.',
        },
      ]

  const [active, setActive] = useState(0)
  const usingRangeImagery = !product.images?.length

  return (
    <div className="gallery">
      <figure className="gallery__main">
        <div className="frame frame--4x3">
          <img
            src={images[active].src}
            alt={images[active].alt}
            width={900}
            height={675}
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: images[active].focus, scale: images[active].zoom }}
          />
        </div>
        {usingRangeImagery && (
          <figcaption className="gallery__caption">
            Pack photography for this SKU is in production. Shown: the Tatvyra {category.name} range.
          </figcaption>
        )}
      </figure>

      {images.length > 1 && (
        <ul className="gallery__thumbs">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                className={`gallery__thumb frame frame--1x1 ${index === active ? 'is-active' : ''}`}
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1} of ${images.length}`}
                aria-current={index === active}
              >
                <img src={image.src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
