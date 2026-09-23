/**
 * The small motion kit the kinetic type runs on: a spring integrator, a shared
 * scroll-velocity source, and the reduced-motion check both respect.
 *
 * No animation library. A spring here is a real one — position, velocity, a
 * stiffness and a damping — stepped on one shared frame loop, so any number of
 * them cost a single requestAnimationFrame. Springs are what give the type its
 * weight: it arrives late, settles rather than stops, and carries whatever
 * speed the pointer or the page had.
 */

const ticking = new Set()
let frame = 0
let last = 0

function step(now) {
  frame = 0
  // Clamped, so a tab returning from the background does not jump a spring
  // across the screen in one frame.
  const dt = Math.min(Math.max((now - last) / 1000, 1 / 240), 1 / 30)
  last = now
  for (const spring of ticking) spring.advance(dt)
  if (ticking.size) frame = requestAnimationFrame(step)
}

function schedule() {
  if (frame) return
  last = performance.now()
  frame = requestAnimationFrame(step)
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

/**
 * A damped spring towards a target.
 *
 * `stiffness` is the pull, `damping` the drag; together they set how heavy the
 * type feels. Sub-stepped at 120Hz inside a frame so a stiff spring stays
 * stable on a slow one, and removed from the loop once it has settled, so an
 * idle section costs nothing.
 */
export function createSpring({
  value = 0,
  stiffness = 120,
  damping = 18,
  mass = 1,
  precision = 0.0015,
} = {}) {
  let current = value
  let target = value
  let velocity = 0
  const listeners = new Set()

  const emit = () => {
    for (const listener of listeners) listener(current)
  }

  const spring = {
    get current() {
      return current
    },

    /** Move the target. `immediate` jumps, for reduced motion and for resets. */
    set(next, { immediate = false } = {}) {
      target = next
      if (immediate) {
        current = next
        velocity = 0
        ticking.delete(spring)
        emit()
        return
      }
      ticking.add(spring)
      schedule()
    },

    /** Hand the spring some speed — how a flick or a fast scroll gets in. */
    nudge(amount) {
      velocity += amount
      ticking.add(spring)
      schedule()
    },

    advance(dt) {
      const steps = Math.max(1, Math.ceil(dt * 120))
      const h = dt / steps
      for (let i = 0; i < steps; i += 1) {
        const force = -stiffness * (current - target) - damping * velocity
        velocity += (force / mass) * h
        current += velocity * h
      }
      if (Math.abs(target - current) < precision && Math.abs(velocity) < precision) {
        current = target
        velocity = 0
        ticking.delete(spring)
      }
      emit()
    },

    onChange(listener) {
      listeners.add(listener)
      listener(current)
      return () => listeners.delete(listener)
    },

    stop() {
      ticking.delete(spring)
      velocity = 0
    },
  }

  return spring
}

/**
 * How fast the page is moving, in pixels a frame, as a 0-1 amount that falls
 * away on its own. One listener and one frame loop for the whole document,
 * however many pieces of type are watching.
 */
const scrollListeners = new Set()
let scrollFrame = 0
let lastY = 0
let energy = 0

function readScroll() {
  scrollFrame = 0
  const y = window.scrollY
  // 60px in a frame is a hard flick; past that it is all the same.
  const speed = Math.min(Math.abs(y - lastY) / 60, 1)
  lastY = y
  energy = Math.max(energy * 0.86, speed)
  for (const listener of scrollListeners) listener(energy)
  if (energy > 0.002) scrollFrame = requestAnimationFrame(readScroll)
  else energy = 0
}

export function onScrollVelocity(listener) {
  if (typeof window === 'undefined') return () => {}
  if (!scrollListeners.size) {
    lastY = window.scrollY
    window.addEventListener('scroll', onScrollEvent, { passive: true })
  }
  scrollListeners.add(listener)
  return () => {
    scrollListeners.delete(listener)
    if (!scrollListeners.size) {
      window.removeEventListener('scroll', onScrollEvent)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
      scrollFrame = 0
    }
  }
}

function onScrollEvent() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(readScroll)
}
