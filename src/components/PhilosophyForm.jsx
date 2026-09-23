import { useEffect, useRef, useState } from 'react'

/* One state per standard: the tint and finish it gives the form, and the
   shape of the noise that moves its surface. Brand colours only — Lilac and
   Purple warmed with Soft Peach.

   The amplitudes are small and close together on purpose. Choosing a standard
   should change the form the way pressing a thumb into something soft changes
   it — the surface reads differently, the object is plainly the same one. */
const STATES = [
  { tint: '#cdbcf0', sheen: '#e4d3f2', roughness: 0.38, amp: 0.1, freq: 1.0, seed: 0 },
  { tint: '#dcc7ea', sheen: '#f6b39b', roughness: 0.46, amp: 0.115, freq: 0.88, seed: 1.6 },
  { tint: '#c0a9ee', sheen: '#c9b8e8', roughness: 0.3, amp: 0.085, freq: 1.22, seed: 3.2 },
  { tint: '#a98fe2', sheen: '#c9b8e8', roughness: 0.44, amp: 0.105, freq: 1.08, seed: 4.8 },
]

const canRender = () => {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const probe = document.createElement('canvas')
    return Boolean(probe.getContext('webgl2') || probe.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * The lavender form as a lit object in WebGL, over the drawn one.
 *
 * three.js is fetched only when it will be used: the section has to be near
 * the viewport, the browser has to have WebGL, and the visitor must not have
 * asked for less motion. Until then — and on any browser that cannot run it —
 * the drawn form underneath is what shows, so the section is never empty and
 * nothing waits on a download.
 *
 * `active` is the standard being spoken. Scroll and pointer are read here,
 * both rate-limited to one frame, and handed to the scene.
 */
export default function PhilosophyForm({ active = 0, sectionRef }) {
  const canvasRef = useRef(null)
  const blobRef = useRef(null)
  const [live, setLive] = useState(false)

  // Mount the scene once, when the section comes within reach.
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef?.current
    if (!canvas || !section || !canRender()) return undefined

    let disposed = false
    let observer

    const mount = async () => {
      try {
        const { createPhilosophyBlob } = await import('../lib/philosophyBlob')
        if (disposed) return
        blobRef.current = createPhilosophyBlob(canvas, { states: STATES })
        setLive(true)
      } catch {
        // No WebGL context, or the module failed to load: the drawn form stays.
      }
    }

    if (typeof IntersectionObserver === 'undefined') mount()
    else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer.disconnect()
          mount()
        },
        { rootMargin: '300px 0px' },
      )
      observer.observe(section)
    }

    return () => {
      disposed = true
      observer?.disconnect()
      blobRef.current?.dispose()
      blobRef.current = null
    }
  }, [sectionRef])

  useEffect(() => {
    blobRef.current?.setState(active)
  }, [active, live])

  // Scroll: the section's passage through the viewport, and how fast the page
  // is moving. Read on a frame, never in the listener itself.
  useEffect(() => {
    const section = sectionRef?.current
    if (!section || !live) return undefined

    let frame = 0
    let lastY = window.scrollY
    let lastTime = performance.now()
    let velocity = 0

    const measure = () => {
      frame = 0
      const now = performance.now()
      const dt = Math.max(16, now - lastTime)
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      lastTime = now
      // Pixels per second, normalised and clamped, so a flick reads as one.
      velocity = Math.max(-1, Math.min(1, ((dy / dt) * 1000) / 2200))

      const box = section.getBoundingClientRect()
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - box.top) / (window.innerHeight + box.height)),
      )
      blobRef.current?.setScroll(progress, velocity)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [live, sectionRef])

  // Pointer: only where there is a real one. The form tilts toward it and the
  // surface reaches for it; leaving the section settles it back.
  useEffect(() => {
    const section = sectionRef?.current
    if (!section || !live) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      blobRef.current?.setPointer(x, y, 1)
    }
    const onMove = (event) => {
      const box = section.getBoundingClientRect()
      x = ((event.clientX - box.left) / box.width) * 2 - 1
      y = -(((event.clientY - box.top) / box.height) * 2 - 1)
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      x = 0
      y = 0
      blobRef.current?.setPointer(0, 0, 0)
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [live, sectionRef])

  return (
    <canvas
      ref={canvasRef}
      className={`philosophy__canvas-gl${live ? ' is-live' : ''}`}
      aria-hidden="true"
    />
  )
}
