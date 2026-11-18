import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { seeded } from './path'

/**
 * What floats round each pack: the thing it is made from, or made by.
 *
 *   Wild Forest Honey — honeybees, flying loose loops round the jar.
 *   Moringa Leaf Powder — moringa sprigs (the compound leaf, with its small
 *     oval leaflets) and the plant's white blossoms.
 *   Spirulina Powder — clear beads of water, tinted emerald.
 *   Natural Peanut Butter — peanuts in the shell, and halved kernels.
 *
 * Every piece is modelled and lit like the packs, with physically based
 * materials; the textures (a bee's bands, a shell's netting, a leaflet's
 * veins) are drawn here, not photographed. All of it lives in the pack's own
 * space, so it floats and turns with the pack, and fades with it: each
 * material is handed to `register` with its full opacity.
 *
 * Nothing ever crosses the front of a pack, where its label is: every piece
 * swings to and fro round the sides and the back, never round the front.
 * Angles are measured round the pack with the front (towards the camera) at
 * π/2; FRONT_CLEAR is how far either side of it nothing goes.
 *
 * Nothing here takes the pointer — hovering and clicking stay on the pack.
 */

const FRONT = Math.PI / 2
const FRONT_CLEAR = 1.15

const tau = Math.PI * 2

/* A canvas drawn once and kept, as a texture. */
const cache = new Map()
function drawn(key, w, h, draw, { colour = true } = {}) {
  if (cache.has(key)) return cache.get(key)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  draw(canvas.getContext('2d'), w, h)
  const texture = new THREE.CanvasTexture(canvas)
  if (colour) texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  cache.set(key, texture)
  return texture
}

/* Every mesh under a group stops taking the pointer. */
function useNoPointer(ref) {
  useLayoutEffect(() => {
    ref.current?.traverse((object) => {
      if (object.isMesh) object.raycast = () => {}
    })
  })
}

/* A piece drifting round the pack: swinging slowly to and fro about its own
   angle (never far enough to reach the front), with its own tumble and bob. */
function useOrbit(pieces, speed = 1) {
  const refs = useRef([])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed
    pieces.forEach((p, i) => {
      const node = refs.current[i]
      if (!node) return
      const a = p.angle + Math.sin(t * p.spin * 6 + p.phase) * p.swing
      node.position.set(
        Math.cos(a) * p.radius,
        p.y + Math.sin(t * p.bob + p.phase) * 0.06,
        Math.sin(a) * p.radius * p.depth,
      )
      node.rotation.set(p.rx + t * p.tumble[0], p.ry + t * p.tumble[1], p.rz + t * p.tumble[2])
    })
  })
  return (i) => (node) => (refs.current[i] = node)
}

/* Pieces placed round a pack, spread over the sides and the back only, each
   with its own pace and its own swing — the swing is held so it never carries
   a piece into the front. */
function scatter(count, seed, { radius = [0.85, 1.25], height = [-0.8, 0.9], depth = 0.75 } = {}) {
  const random = seeded(seed)
  const between = ([a, b]) => a + (b - a) * random()
  return Array.from({ length: count }, (_, i) => {
    const arc = tau - 2 * FRONT_CLEAR
    const angle = FRONT + FRONT_CLEAR + 0.35 + ((i + random() * 0.6) / count) * (arc - 0.7)
    // Room to swing before the front, either way round.
    const room = Math.min(angle - (FRONT + FRONT_CLEAR), FRONT + tau - FRONT_CLEAR - angle)
    return {
      angle,
      swing: Math.max(0.1, Math.min(0.55, room)),
      radius: between(radius),
      y: between(height),
      depth,
      spin: (random() < 0.5 ? -1 : 1) * (0.05 + random() * 0.06),
      bob: 0.5 + random() * 0.6,
      phase: random() * tau,
      rx: random() * tau,
      ry: random() * tau,
      rz: random() * tau,
      tumble: [(random() - 0.5) * 0.5, (random() - 0.5) * 0.5, (random() - 0.5) * 0.4],
      scale: 0.85 + random() * 0.35,
    }
  })
}

/* --- Honeybees ----------------------------------------------------------- */

const beeBands = () =>
  drawn('bee-bands', 64, 256, (g, w, h) => {
    // Amber at the waist, banded dark towards the tip.
    g.fillStyle = '#c98b2c'
    g.fillRect(0, 0, w, h)
    g.fillStyle = '#2a1a0d'
    for (const [a, b] of [[0.34, 0.44], [0.54, 0.64], [0.73, 0.83], [0.9, 1]]) g.fillRect(0, a * h, w, (b - a) * h)
    // Fine hairs, so the bands are soft rather than painted.
    const random = seeded(11)
    for (let i = 0; i < 1600; i++) {
      const x = random() * w
      const y = random() * h
      g.strokeStyle = random() < 0.5 ? 'rgba(240,200,120,0.35)' : 'rgba(30,18,8,0.35)'
      g.lineWidth = 0.6
      g.beginPath()
      g.moveTo(x, y)
      g.lineTo(x + (random() - 0.5) * 3, y + 2 + random() * 3)
      g.stroke()
    }
  })

const beeWing = () =>
  drawn('bee-wing', 128, 64, (g, w, h) => {
    g.clearRect(0, 0, w, h)
    g.fillStyle = 'rgba(235,240,245,0.42)'
    g.beginPath()
    g.ellipse(w * 0.52, h * 0.5, w * 0.47, h * 0.4, 0.05, 0, tau)
    g.fill()
    // The veins, dark and fine, running out from the root.
    g.strokeStyle = 'rgba(40,30,20,0.55)'
    g.lineWidth = 1.1
    g.beginPath()
    g.ellipse(w * 0.52, h * 0.5, w * 0.47, h * 0.4, 0.05, 0, tau)
    g.stroke()
    g.lineWidth = 0.8
    for (const [y, bend] of [[0.36, -6], [0.5, 0], [0.62, 5]]) {
      g.beginPath()
      g.moveTo(w * 0.06, h * 0.5)
      g.quadraticCurveTo(w * 0.4, h * y + bend, w * 0.78, h * y)
      g.stroke()
    }
    g.beginPath()
    g.moveTo(w * 0.45, h * 0.3)
    g.lineTo(w * 0.55, h * 0.68)
    g.moveTo(w * 0.66, h * 0.32)
    g.lineTo(w * 0.7, h * 0.64)
    g.stroke()
  })

function Bee({ beat, register }) {
  const parts = useMemo(() => {
    const abdomen = new THREE.SphereGeometry(1, 24, 18)
    abdomen.rotateZ(-Math.PI / 2)
    const wing = new THREE.PlaneGeometry(0.11, 0.048)
    wing.translate(0.055, 0, 0)
    wing.rotateX(-Math.PI / 2)
    const leg = new THREE.CylinderGeometry(0.0022, 0.0016, 0.06, 5)
    leg.translate(0, -0.03, 0)
    const feeler = new THREE.CylinderGeometry(0.0014, 0.0012, 0.045, 4)
    feeler.translate(0, 0.0225, 0)
    return { abdomen, wing, leg, feeler }
  }, [])
  const left = useRef(null)
  const right = useRef(null)
  const leftHind = useRef(null)
  const rightHind = useRef(null)

  useFrame(({ clock }) => {
    // A fast beat — at this rate it reads as the blur a bee's wings make.
    const a = Math.sin(clock.elapsedTime * 62 + beat) * 0.95 + 0.25
    if (left.current) left.current.rotation.x = a
    if (right.current) right.current.rotation.x = -a
    if (leftHind.current) leftHind.current.rotation.x = a * 0.9
    if (rightHind.current) rightHind.current.rotation.x = -a * 0.9
  })

  const fuzz = { roughness: 0.92, sheen: 1, sheenRoughness: 0.75, sheenColor: '#f0c46e' }
  const dark = { color: '#1a110a', roughness: 0.35, clearcoat: 0.6 }
  const wingMaterial = (
    <meshPhysicalMaterial
      ref={register(1)}
      map={beeWing()}
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
      roughness={0.15}
      iridescence={1}
      iridescenceIOR={1.3}
      clearcoat={1}
      fog={false}
    />
  )
  return (
    // Head at +x; turned so it faces the way it flies (+z).
    <group rotation={[0, -Math.PI / 2, 0]}>
      <mesh geometry={parts.abdomen} position={[-0.055, -0.004, 0]} scale={[0.066, 0.041, 0.043]}>
        <meshPhysicalMaterial ref={register(1)} map={beeBands()} {...fuzz} transparent fog={false} />
      </mesh>
      <mesh position={[0.018, 0.004, 0]} scale={[0.036, 0.034, 0.034]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshPhysicalMaterial ref={register(1)} color="#6e4719" {...fuzz} transparent fog={false} />
      </mesh>
      <mesh position={[0.063, 0.002, 0]} scale={[0.024, 0.027, 0.03]}>
        <sphereGeometry args={[1, 18, 12]} />
        <meshPhysicalMaterial ref={register(1)} {...dark} transparent fog={false} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          {/* Compound eyes, glossy. */}
          <mesh position={[0.067, 0.008, side * 0.019]} scale={[0.012, 0.018, 0.009]}>
            <sphereGeometry args={[1, 12, 10]} />
            <meshPhysicalMaterial ref={register(1)} color="#0c0806" roughness={0.12} clearcoat={1} transparent fog={false} />
          </mesh>
          <mesh geometry={parts.feeler} position={[0.08, 0.016, side * 0.008]} rotation={[side * 0.35, 0, -0.9]}>
            <meshPhysicalMaterial ref={register(1)} {...dark} transparent fog={false} />
          </mesh>
          {[-0.008, 0.012, 0.03].map((x, k) => (
            <mesh
              key={x}
              geometry={parts.leg}
              position={[x, -0.022, side * 0.016]}
              rotation={[side * (0.5 + k * 0.1), 0, 0.25 - k * 0.3]}
            >
              <meshPhysicalMaterial ref={register(1)} {...dark} transparent fog={false} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Wings: a larger fore pair and a smaller hind pair, hinged at the thorax. */}
      <group ref={left} position={[0.024, 0.03, -0.012]}>
        <mesh geometry={parts.wing} rotation={[0, Math.PI / 2 + 0.45, 0]}>{wingMaterial}</mesh>
      </group>
      <group ref={right} position={[0.024, 0.03, 0.012]}>
        <mesh geometry={parts.wing} rotation={[0, -Math.PI / 2 - 0.45, 0]}>{wingMaterial}</mesh>
      </group>
      <group ref={leftHind} position={[0.008, 0.028, -0.01]} scale={0.68}>
        <mesh geometry={parts.wing} rotation={[0, Math.PI / 2 + 0.85, 0]}>{wingMaterial}</mesh>
      </group>
      <group ref={rightHind} position={[0.008, 0.028, 0.01]} scale={0.68}>
        <mesh geometry={parts.wing} rotation={[0, -Math.PI / 2 - 0.85, 0]}>{wingMaterial}</mesh>
      </group>
    </group>
  )
}

/* Each bee flies its own loose loop round the jar — wider and narrower, rising
   and dipping — and always faces the way it is going. */
function Bees({ count, register }) {
  const group = useRef(null)
  useNoPointer(group)
  const flights = useMemo(() => {
    const random = seeded(23)
    return Array.from({ length: count }, (_, i) => ({
      radius: 0.95 + random() * 0.4,
      height: -0.2 + random() * 1.1,
      speed: (0.45 + random() * 0.35) * (i % 2 ? -1 : 1),
      phase: (i / count) * tau + random() * 0.5,
      reach: 0.75 + random() * (Math.PI - FRONT_CLEAR - 0.85),
      wobble: 0.6 + random() * 0.8,
    }))
  }, [count])
  const bees = useRef([])
  // Each bee works to and fro round the back of the jar, out to one side and
  // round to the other, never across the front.
  const at = (f, t, target) => {
    const a = FRONT + Math.PI + Math.sin(f.phase + t * f.speed) * f.reach
    return target.set(
      Math.cos(a) * f.radius * (1 + 0.16 * Math.sin(t * f.wobble * 1.3)),
      f.height + 0.18 * Math.sin(t * f.wobble * 2.1 + f.phase) + 0.04 * Math.sin(t * 9 + f.phase),
      Math.sin(a) * f.radius * 0.8,
    )
  }
  const ahead = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    flights.forEach((f, i) => {
      const bee = bees.current[i]
      if (!bee) return
      at(f, t, bee.position)
      at(f, t + 0.08, ahead)
      bee.lookAt(ahead.applyMatrix4(bee.parent.matrixWorld))
    })
  })
  return (
    <group ref={group}>
      {flights.map((f, i) => (
        <group key={i} ref={(node) => (bees.current[i] = node)} scale={1.25}>
          <Bee beat={f.phase * 7} register={register} />
        </group>
      ))}
    </group>
  )
}

/* --- Moringa ------------------------------------------------------------- */

const leafletTexture = () =>
  drawn('moringa-leaflet', 64, 96, (g, w, h) => {
    const grad = g.createRadialGradient(w * 0.45, h * 0.45, 4, w * 0.5, h * 0.5, w * 0.62)
    grad.addColorStop(0, '#6aa646')
    grad.addColorStop(1, '#3d7a2a')
    g.fillStyle = grad
    g.fillRect(0, 0, w, h)
    g.strokeStyle = 'rgba(190,225,150,0.75)'
    g.lineWidth = 1.6
    g.beginPath()
    g.moveTo(w / 2, h * 0.04)
    g.lineTo(w / 2, h * 0.96)
    g.stroke()
    g.strokeStyle = 'rgba(170,215,130,0.4)'
    g.lineWidth = 0.8
    for (let k = 1; k < 7; k++) {
      const y = (k / 7) * h
      g.beginPath()
      g.moveTo(w / 2, y)
      g.quadraticCurveTo(w * 0.3, y - 6, w * 0.08, y - 12)
      g.moveTo(w / 2, y)
      g.quadraticCurveTo(w * 0.7, y - 6, w * 0.92, y - 12)
      g.stroke()
    }
  })

/* One small oval leaflet, cupped a little along its midrib, with its own
   texture coordinates; `base` is where it joins its stalk. */
function leafletGeometry() {
  const a = 0.026
  const b = 0.038
  const shape = new THREE.Shape()
  shape.absellipse(0, b, a, b, 0, tau, false, 0)
  const geometry = new THREE.ShapeGeometry(shape, 14)
  const position = geometry.attributes.position
  const uv = geometry.attributes.uv
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    position.setZ(i, (x / a) ** 2 * 0.006)
    uv.setXY(i, (x / a + 1) / 2, y / (2 * b))
  }
  geometry.computeVertexNormals()
  return geometry
}

/* A sprig: the main stem, three pairs of side stalks (pinnae), each carrying
   pairs of leaflets and one at its tip. Merged into one leaf mesh and one
   stem mesh. */
function sprigGeometry(seed) {
  const random = seeded(seed)
  const leaflet = leafletGeometry()
  const leaves = []
  const stems = []
  const stem = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.28, 0),
    new THREE.Vector3(0.02, -0.05, 0.01),
    new THREE.Vector3(0, 0.18, -0.01),
    new THREE.Vector3(-0.03, 0.34, 0),
  ])
  stems.push(new THREE.TubeGeometry(stem, 24, 0.0045, 5))
  const matrix = new THREE.Matrix4()
  const place = (position, direction, roll, size) => {
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
    q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), roll))
    matrix.compose(position, q, new THREE.Vector3(size, size, size))
    leaves.push(leaflet.clone().applyMatrix4(matrix))
  }
  for (const along of [0.3, 0.55, 0.78]) {
    const origin = stem.getPointAt(along)
    for (const side of [-1, 1]) {
      const reach = 0.16 + random() * 0.04
      const dir = new THREE.Vector3(side, 0.55, (random() - 0.5) * 0.3).normalize()
      const end = origin.clone().addScaledVector(dir, reach)
      const pinna = new THREE.LineCurve3(origin, end)
      stems.push(new THREE.TubeGeometry(pinna, 6, 0.0025, 4))
      for (let k = 1; k <= 4; k++) {
        const p = origin.clone().addScaledVector(dir, reach * (k / 4.6))
        const across = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize()
        for (const s of [-1, 1]) {
          place(p, across.clone().multiplyScalar(s).addScaledVector(dir, 0.35), random() * 0.4, 0.85 + random() * 0.25)
        }
      }
      place(end, dir, 0, 1)
    }
  }
  place(stem.getPointAt(1), new THREE.Vector3(-0.15, 1, 0), 0, 1.05)
  return { leaves: mergeGeometries(leaves), stems: mergeGeometries(stems) }
}

/* A moringa flower: five creamy-white petals round a yellow eye. */
function blossomGeometry() {
  const petal = new THREE.Shape()
  petal.absellipse(0, 0.022, 0.011, 0.022, 0, tau, false, 0)
  const parts = []
  for (let i = 0; i < 5; i++) {
    const g = new THREE.ShapeGeometry(petal, 10)
    const position = g.attributes.position
    for (let k = 0; k < position.count; k++) position.setZ(k, position.getY(k) ** 2 * 3)
    g.rotateZ((i / 5) * tau)
    parts.push(g)
  }
  const petals = mergeGeometries(parts)
  petals.computeVertexNormals()
  return petals
}

function Moringa({ count, register }) {
  const group = useRef(null)
  useNoPointer(group)
  const geometry = useMemo(() => ({ a: sprigGeometry(5), b: sprigGeometry(9), blossom: blossomGeometry() }), [])
  const sprigs = useMemo(() => scatter(count, 41, { radius: [0.95, 1.35], height: [-0.9, 0.95] }), [count])
  const flowers = useMemo(() => scatter(3, 77, { radius: [0.8, 1.1], height: [-0.6, 0.8] }), [])
  const sprigRef = useOrbit(sprigs, 0.8)
  const flowerRef = useOrbit(flowers, 0.8)
  const leaf = {
    map: leafletTexture(),
    roughness: 0.55,
    clearcoat: 0.35,
    clearcoatRoughness: 0.4,
    sheen: 0.4,
    sheenColor: '#cfe8a8',
    side: THREE.DoubleSide,
  }
  return (
    <group ref={group}>
      {sprigs.map((p, i) => {
        const g = i % 2 ? geometry.b : geometry.a
        return (
          <group key={i} ref={sprigRef(i)} scale={p.scale * 1.15}>
            <mesh geometry={g.leaves}>
              <meshPhysicalMaterial ref={register(1)} {...leaf} transparent fog={false} />
            </mesh>
            <mesh geometry={g.stems}>
              <meshPhysicalMaterial ref={register(1)} color="#5d7f33" roughness={0.6} transparent fog={false} />
            </mesh>
          </group>
        )
      })}
      {flowers.map((p, i) => (
        <group key={i} ref={flowerRef(i)} scale={1.6}>
          <mesh geometry={geometry.blossom}>
            <meshPhysicalMaterial
              ref={register(1)}
              color="#f6f1e4"
              roughness={0.5}
              sheen={0.6}
              sheenColor="#fff6dc"
              side={THREE.DoubleSide}
              transparent
              fog={false}
            />
          </mesh>
          <mesh position={[0, 0, 0.004]}>
            <sphereGeometry args={[0.0075, 12, 8]} />
            <meshPhysicalMaterial ref={register(1)} color="#e2b93e" roughness={0.6} transparent fog={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* --- Spirulina ------------------------------------------------------------ */

function Spirulina({ lite, register }) {
  const group = useRef(null)
  useNoPointer(group)
  const drops = useMemo(() => scatter(lite ? 7 : 12, 67, { radius: [0.75, 1.2], height: [-0.9, 0.9] }), [lite])
  const dropRef = useOrbit(drops, 0.7)
  // Glossy, part see-through beads tinted emerald. (No true refraction: it
  // would mean drawing the whole jungle a second time every frame.)
  const droplet = {
    color: '#6fcf9f',
    roughness: 0.04,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    emissive: '#0d4a30',
    emissiveIntensity: 0.35,
    envMapIntensity: 2,
  }
  return (
    <group ref={group}>
      {drops.map((p, i) => (
        <mesh key={i} ref={dropRef(i)} scale={0.028 + (i % 4) * 0.012}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshPhysicalMaterial ref={register(0.72)} {...droplet} transparent fog={false} />
        </mesh>
      ))}
    </group>
  )
}

/* --- Peanuts ------------------------------------------------------------- */

const shellTexture = () =>
  drawn('peanut-shell', 256, 256, (g, w, h) => {
    g.fillStyle = '#c9a26a'
    g.fillRect(0, 0, w, h)
    const random = seeded(3)
    // The shell's netting: shallow ridges running mostly lengthways, linked
    // across.
    for (let i = 0; i < 70; i++) {
      let x = random() * w
      let y = random() * h
      g.strokeStyle = random() < 0.5 ? 'rgba(140,100,55,0.55)' : 'rgba(232,206,160,0.55)'
      g.lineWidth = 1 + random() * 1.8
      g.beginPath()
      g.moveTo(x, y)
      for (let k = 0; k < 6; k++) {
        x += (random() - 0.5) * 22
        y += 10 + random() * 18
        g.lineTo(x, y)
      }
      g.stroke()
    }
    for (let i = 0; i < 400; i++) {
      g.fillStyle = `rgba(${random() < 0.5 ? '120,85,45' : '235,210,170'},0.25)`
      g.fillRect(random() * w, random() * h, 2, 2)
    }
  })

const skinTexture = () =>
  drawn('peanut-skin', 128, 128, (g, w, h) => {
    g.fillStyle = '#9a4f2c'
    g.fillRect(0, 0, w, h)
    const random = seeded(8)
    for (let i = 0; i < 60; i++) {
      g.strokeStyle = random() < 0.5 ? 'rgba(70,30,15,0.4)' : 'rgba(190,110,70,0.35)'
      g.lineWidth = 0.8 + random()
      const x = random() * w
      g.beginPath()
      g.moveTo(x, 0)
      g.bezierCurveTo(x + 8, h * 0.3, x - 8, h * 0.6, x + 4, h)
      g.stroke()
    }
  })

/* The shell, turned from its outline: two lobes with a waist between. */
function shellGeometry() {
  const points = []
  for (let i = 0; i <= 40; i++) {
    const y = -1 + (i / 40) * 2
    const r = 0.5 * Math.sqrt(Math.max(0, 1 - y * y)) * (1 - 0.24 * Math.exp(-((y / 0.24) ** 2)))
    points.push(new THREE.Vector2(Math.max(r, 0.0001), y))
  }
  return new THREE.LatheGeometry(points, 28)
}

function Peanuts({ count, register }) {
  const group = useRef(null)
  useNoPointer(group)
  const geometry = useMemo(() => {
    const half = new THREE.SphereGeometry(1, 24, 16, 0, Math.PI)
    const face = new THREE.CircleGeometry(1, 24)
    face.rotateY(Math.PI)
    return { shell: shellGeometry(), half, face, whole: new THREE.SphereGeometry(1, 24, 16) }
  }, [])
  const shells = useMemo(() => scatter(count, 31, { radius: [0.9, 1.3], height: [-0.85, 0.9] }), [count])
  const kernels = useMemo(() => scatter(Math.max(3, count - 1), 37, { radius: [0.8, 1.15], height: [-0.9, 0.85] }), [count])
  const shellRef = useOrbit(shells, 0.8)
  const kernelRef = useOrbit(kernels, 0.8)
  const shellTex = shellTexture()
  return (
    <group ref={group}>
      {shells.map((p, i) => (
        <mesh key={i} ref={shellRef(i)} geometry={geometry.shell} scale={0.085 * p.scale}>
          <meshPhysicalMaterial
            ref={register(1)}
            map={shellTex}
            bumpMap={shellTex}
            bumpScale={3}
            roughness={0.85}
            transparent
            fog={false}
          />
        </mesh>
      ))}
      {kernels.map((p, i) =>
        i % 3 === 2 ? (
          <mesh key={i} ref={kernelRef(i)} geometry={geometry.whole} scale={[0.036, 0.055, 0.034]}>
            <meshPhysicalMaterial ref={register(1)} map={skinTexture()} roughness={0.5} clearcoat={0.25} transparent fog={false} />
          </mesh>
        ) : (
          // A kernel split in two: the red-brown skin, and the cream inside.
          <group key={i} ref={kernelRef(i)} scale={[0.036, 0.055, 0.03]}>
            <mesh geometry={geometry.half}>
              <meshPhysicalMaterial ref={register(1)} map={skinTexture()} roughness={0.5} clearcoat={0.25} transparent fog={false} />
            </mesh>
            <mesh geometry={geometry.face}>
              <meshPhysicalMaterial ref={register(1)} color="#e9cf9c" roughness={0.75} transparent fog={false} />
            </mesh>
          </group>
        ),
      )}
    </group>
  )
}

/* --- By product ------------------------------------------------------------ */

export default function ProductElements({ slug, lite, register }) {
  if (slug === 'wild-forest-honey') return <Bees count={lite ? 3 : 5} register={register} />
  if (slug === 'moringa-leaf-powder') return <Moringa count={lite ? 3 : 5} register={register} />
  if (slug === 'spirulina-powder') return <Spirulina lite={lite} register={register} />
  if (slug === 'natural-peanut-butter-creamy') return <Peanuts count={lite ? 4 : 6} register={register} />
  return null
}
