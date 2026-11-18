import { useEffect, useRef, useState } from 'react'

/**
 * Minimal scroll reveal — IntersectionObserver only, no animation library.
 * Motion is a short fade and 18px rise; it is disabled entirely under
 * prefers-reduced-motion via CSS.
 *
 * Every reveal on the page shares one observer: a page can carry dozens of
 * them, and one observer does the same work as dozens for a fraction of the
 * bookkeeping. Each element is dropped from it as soon as it has been shown.
 */
let shared = null
const callbacks = new WeakMap()

function observe(node, onShow) {
  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const show = callbacks.get(entry.target)
          shared.unobserve(entry.target)
          callbacks.delete(entry.target)
          show?.()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
  }
  callbacks.set(node, onShow)
  shared.observe(node)
  return () => {
    callbacks.delete(node)
    shared?.unobserve(node)
  }
}

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  // Browsers without IntersectionObserver simply start visible; nothing to observe.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    return observe(node, () => setVisible(true))
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      // Merged, so a caller's own style never drops the stagger delay.
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
