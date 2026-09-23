import { useEffect, useId, useMemo, useRef } from 'react'
import { createSpring, onScrollVelocity, prefersReducedMotion } from '../lib/motion'

/**
 * A line of type that behaves like a material rather than a label.
 *
 * Three things are going on, all driven by springs from lib/motion so the type
 * arrives late and settles rather than snapping:
 *
 *   Liquid   an SVG turbulence + displacement filter over the line. Its scale
 *            is a spring fed by the pointer and by how fast the page is
 *            scrolling, so the letters ripple while something is happening and
 *            go perfectly still — filter and all — the moment it stops.
 *   Pull     each letter leans up towards the pointer on a bell curve, and the
 *            whole line loosens its letter-spacing, so the word stretches under
 *            the cursor the way soft type would.
 *   Wipe     when the line becomes active, a second copy of it in Purple is
 *            revealed behind an ink-shaped mask that sweeps across, edge first.
 *            The mask rides its own spring, so the ink runs in and settles.
 *
 * The visible letters are split into spans and hidden from assistive tech; a
 * plain copy of the text carries the meaning. Under prefers-reduced-motion
 * nothing moves: the wipe is instant and the filter never mounts.
 *
 * Usage:
 *   <KineticText text="No hydrogenated oils" active={isActive} wipe pointer />
 */
export default function KineticText({
  text,
  active = false,
  wipe = false,
  pointer = true,
  // Splitting is what lets letters lean towards the cursor, and it costs a
  // second, hidden copy of the line for assistive tech. A line that only
  // ripples and lags does not need it, and stays one piece of selectable text.
  split = true,
  intensity = 1,
  className = '',
  as: Tag = 'span',
}) {
  const rootRef = useRef(null)
  const turbulenceRef = useRef(null)
  const displacementRef = useRef(null)
  const springs = useRef(null)
  const filterId = `kt-${useId().replace(/[:]/g, '')}`

  // Spaces keep their own span so the line can still break, and so letter
  // indices line up between the two copies.
  const letters = useMemo(() => Array.from(text), [text])

  // --- The moving parts ----------------------------------------------------
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return undefined

    const state = {
      // Loosening of the tracking while the pointer is on the line.
      stretch: createSpring({ stiffness: 90, damping: 16 }),
      // Where the pointer is across the line, 0 to 1.
      at: createSpring({ value: 0.5, stiffness: 150, damping: 22 }),
      // How much is happening — pointer, or the page moving.
      energy: createSpring({ stiffness: 55, damping: 14 }),
      // The line's own weight: it lags the page a little, then catches up.
      lag: createSpring({ stiffness: 70, damping: 11 }),
    }
    springs.current = state

    const layers = Array.from(root.querySelectorAll('.kt__layer'))
    const letterSets = layers.map((layer) => Array.from(layer.querySelectorAll('.kt__l')))
    const count = letters.length
    let flow = 0

    const write = () => {
      const energy = state.energy.current
      const at = state.at.current

      root.style.setProperty('--kt-stretch', state.stretch.current.toFixed(3))
      root.style.setProperty('--kt-lag', `${state.lag.current.toFixed(2)}px`)
      root.classList.toggle('is-liquid', energy > 0.015)

      // Each letter's lean, on a bell curve around the pointer.
      for (let i = 0; i < count; i += 1) {
        const position = count === 1 ? 0.5 : i / (count - 1)
        const distance = position - at
        const pull = Math.exp(-(distance * distance) / 0.018) * energy
        const value = pull.toFixed(3)
        for (const set of letterSets) set[i]?.style.setProperty('--kt-pull', value)
      }

      // The filter: displacement follows the energy, and the noise itself
      // crawls, so the ripple never reads as a frozen texture.
      const displacement = displacementRef.current
      const turbulence = turbulenceRef.current
      if (displacement && turbulence) {
        displacement.setAttribute('scale', (energy * 7 * intensity).toFixed(2))
        if (energy > 0.015) {
          flow += 0.0009 * energy
          const base = 0.012 + Math.sin(flow) * 0.004
          turbulence.setAttribute('baseFrequency', `0.008 ${base.toFixed(4)}`)
        }
      }
    }

    // Four springs settle on the same frame; the line is written once for all
    // of them rather than four times over.
    let queued = false
    const request = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        write()
      })
    }

    const unsubscribe = [
      state.stretch.onChange(request),
      state.at.onChange(request),
      state.energy.onChange(request),
      state.lag.onChange(request),
    ]

    // --- Pointer ------------------------------------------------------------
    let lastX = null
    const onPointerMove = (event) => {
      const box = root.getBoundingClientRect()
      const x = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1)
      state.at.set(x)
      // A fast pass across the line throws more energy into it than a slow one.
      if (lastX !== null) state.energy.nudge(Math.min(Math.abs(x - lastX) * 6, 1.6))
      lastX = x
      state.energy.set(1)
      state.stretch.set(1)
    }

    const onPointerLeave = () => {
      lastX = null
      state.energy.set(0)
      state.stretch.set(0)
    }

    // Keyboard focus loosens the line too, so it is not a pointer-only effect.
    const onFocus = () => state.stretch.set(1)
    const onBlur = () => state.stretch.set(0)

    if (pointer) {
      root.addEventListener('pointermove', onPointerMove)
      root.addEventListener('pointerenter', onPointerMove)
      root.addEventListener('pointerleave', onPointerLeave)
      root.addEventListener('focus', onFocus, true)
      root.addEventListener('blur', onBlur, true)
    }

    // --- The page moving ----------------------------------------------------
    let onScreen = true
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting
            },
            { rootMargin: '10% 0px' },
          )
    observer?.observe(root)

    const stopScroll = onScrollVelocity((velocity) => {
      if (!onScreen) return
      // Scrolling ripples the line and drags it a little out of place; the
      // springs bring it back.
      if (state.energy.current < velocity * 0.6) state.energy.set(velocity * 0.6)
      else if (velocity < 0.02) state.energy.set(state.stretch.current)
      state.lag.set(velocity * 9 * intensity)
      if (velocity < 0.02) state.lag.set(0)
    })

    write()

    return () => {
      for (const off of unsubscribe) off()
      stopScroll()
      observer?.disconnect()
      if (pointer) {
        root.removeEventListener('pointermove', onPointerMove)
        root.removeEventListener('pointerenter', onPointerMove)
        root.removeEventListener('pointerleave', onPointerLeave)
        root.removeEventListener('focus', onFocus, true)
        root.removeEventListener('blur', onBlur, true)
      }
      for (const spring of Object.values(state)) spring.stop()
    }
  }, [letters, pointer, intensity])

  // --- The ink wipe ---------------------------------------------------------
  // The mask is placed off the line's own width, so it is measured here and
  // kept up to date as the type reflows.
  useEffect(() => {
    const root = rootRef.current
    if (!root || !wipe || typeof ResizeObserver === 'undefined') return undefined

    const observer = new ResizeObserver(([entry]) => {
      root.style.setProperty('--kt-w', `${entry.contentRect.width.toFixed(1)}px`)
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [wipe])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !wipe) return undefined

    const reduced = prefersReducedMotion()
    const sweep = createSpring({ stiffness: 42, damping: 13 })
    const off = sweep.onChange((value) => {
      root.style.setProperty('--kt-wipe', value.toFixed(3))
    })
    sweep.set(active ? 1 : 0, { immediate: reduced })

    return () => {
      off()
      sweep.stop()
    }
  }, [active, wipe])

  const body = split ? (
    <span className="kt__layer" aria-hidden="true">
      {letters.map((character, index) => (
        <span className="kt__l" key={`${character}-${index}`}>
          {character === ' ' ? ' ' : character}
        </span>
      ))}
    </span>
  ) : (
    <span className="kt__layer">{text}</span>
  )

  return (
    <Tag ref={rootRef} className={`kt ${className}`.trim()} data-active={active || undefined}>
      {/* The filter is referenced only while the line is moving, so a still
          line is plain text again. */}
      <svg className="kt__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-12%" y="-30%" width="124%" height="160%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves="2"
              seed="6"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <span className="kt__body" style={{ '--kt-filter': `url(#${filterId})` }}>
        {body}
        {wipe && <span className="kt__ink">{body}</span>}
      </span>

      {split && <span className="visually-hidden">{text}</span>}
    </Tag>
  )
}
