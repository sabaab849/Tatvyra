import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * One featured product in the mega-menu: a tall, round-cornered thumbnail of
 * the product's own photograph with its name centred underneath.
 *
 * While the card is hovered or focused its video plays over the photograph;
 * on leaving, it pauses and goes back to the start, and the photograph shows
 * again. The video is not fetched until the first hover. If the file is
 * missing or cannot be played the card just stays on its photograph — and
 * under prefers-reduced-motion it never plays at all.
 */
export default function FeaturedCard({ product }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [broken, setBroken] = useState(false)

  const start = () => {
    const video = videoRef.current
    if (!video || broken) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    // play() rejects when the file is missing or the pointer has already
    // left; either way the photograph is still showing, so there is nothing
    // to recover.
    video.play().catch(() => {})
  }

  const stop = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setPlaying(false)
  }

  return (
    <Link
      to={product.link}
      className={`fcard${playing ? ' is-playing' : ''}`}
      onPointerEnter={(event) => event.pointerType === 'mouse' && start()}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <span className="fcard__thumb">
        <img src={product.imagePath} alt="" width={400} height={500} loading="lazy" decoding="async" />
        {product.videoPath && !broken && (
          <video
            ref={videoRef}
            className="fcard__video"
            src={product.videoPath}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            onError={() => setBroken(true)}
          />
        )}
      </span>
      <span className="fcard__title">{product.title}</span>
    </Link>
  )
}
