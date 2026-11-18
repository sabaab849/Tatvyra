/**
 * The way through the jungle: one winding line that the camera travels, the
 * foliage grows round and the products hang beside. Everything in the scene is
 * placed from it, so the corridor stays clear wherever it bends.
 *
 * `t` runs from 0 at the mouth of the tunnel to 1 at its far end. The camera
 * stops short of the end (CAMERA_END), in the light.
 */
// Short enough that the next product is already coming out of the mist as
// the camera passes the one before.
export const LENGTH = 88
export const CAMERA_END = 0.93

/* The path runs straight ahead: the camera moves only forward and back, at
   one height, never sideways — scrolling down walks in, scrolling up walks
   out, and nothing else moves the view. */
export function pathPoint(t, target) {
  return target.set(0, 0, -t * LENGTH)
}

/* What the camera is doing this frame, for anything that should answer to it:
   `speed` is how fast it is travelling along the path, signed, eased. */
export const travel = { speed: 0 }

/* A repeatable stream of numbers from 0 to 1, so the jungle grows the same way
   on every visit. */
export function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

/* The one transition every product state change uses — coming into focus,
   falling back, the caption changing: 0.8s on cubic-bezier(0.25, 1, 0.5, 1).
   The section's captions use the same pair through Framer Motion. */
export const STATE_DURATION = 0.8
export const STATE_EASE = [0.25, 1, 0.5, 1]

/* That curve as a function of time, 0 to 1. */
export function stateEase(x) {
  const [x1, y1, x2, y2] = STATE_EASE
  const bez = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3
  const slope = (t, a, b) => 3 * a * (1 - t) ** 2 + 6 * (b - a) * t * (1 - t) + 3 * (1 - b) * t * t
  let t = x
  for (let i = 0; i < 6; i++) {
    const d = slope(t, x1, x2)
    if (Math.abs(d) < 1e-6) break
    t -= (bez(t, x1, x2) - x) / d
    t = Math.min(1, Math.max(0, t))
  }
  return bez(t, y1, y2)
}

/* A value that moves to each new target over STATE_DURATION on that curve,
   starting from wherever it is — so a change mid-way never jumps. */
export function stateTween(initial) {
  const tween = { value: initial, from: initial, to: initial, start: 0 }
  tween.step = (target, time) => {
    if (target !== tween.to) {
      tween.from = tween.value
      tween.to = target
      tween.start = time
    }
    const k = stateEase(Math.min(1, (time - tween.start) / STATE_DURATION))
    tween.value = tween.from + (tween.to - tween.from) * k
    return tween.value
  }
  return tween
}

export const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
