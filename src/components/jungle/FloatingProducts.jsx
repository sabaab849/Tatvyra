import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { pathPoint, seeded, smoothstep, stateTween, travel } from './path'
import ProductElements from './elements'

/**
 * The products hanging in the clearing along the jungle path, as 3D packs.
 *
 * Every pack is modelled, not pictured:
 *
 *   Jars are turned from a profile — base, straight side, shoulder, neck —
 *   in clear glass, filled with their contents (peanut butter, honey), with
 *   the lid screwed on and the label wrapped round them.
 *
 *   Pouches are stand-up pouches: a front and a back panel filled out by the
 *   powder, flat along the sealed sides and the zip at the top, opening into
 *   an oval at the base.
 *
 * Only the printing comes from photography (public/images/jungle/products/),
 * cut from the packshots in "product images": each jar's label unrolled flat
 * off its curved glass and its lid's top print opened out into a circle, and
 * each pouch's front straightened from its slight perspective. There is no
 * photograph of the new pouches' backs, so the front is printed on both sides.
 * So every word, mark and illustration on a pack is the real one; the glass,
 * contents, lids, film and shape are built here and lit by the jungle.
 *
 * Each pack keeps its face to the camera, floats on a slow beat of its own,
 * and answers to the scroll: it tips back as the camera accelerates towards
 * it and settles as the camera slows.
 *
 * `products` is the list from the section: for each, where along the path it
 * hangs (`t`), which side (`side`), and its catalogue slug. `active` is the
 * index in focus — the one under the pointer, or the one the camera is
 * approaching — which comes forward while the others fall back. The section
 * owns that state and sets the name and line beside it in HTML, so the type
 * stays real type.
 */

const DIR = '/images/jungle/products/'

/**
 * The packs, by catalogue slug. Jar measurements are proportions of the
 * glass's height, read off the catalogue photograph: the body and neck radius,
 * where the shoulder starts, how full it is, and where the label sits.
 */
const PACKS = {
  // A straight-sided tub, taller than it is wide, its white lid as wide as
  // the body. Measured off the packshot against the jar's width: the label
  // runs from a tenth of it above the base to 0.87 of it, a band of peanut
  // butter shows above the label, and the lid is a shallow 0.14. The body is
  // drawn a touch slimmer than the packshot's, because the pack floats at the
  // edge of a wide view, where the camera's perspective widens it; on screen
  // it reads at the packshot's proportions. `arc` wraps the label a little
  // further round the slimmer body so its lettering keeps its shape.
  'natural-peanut-butter-creamy': {
    kind: 'jar',
    height: 1.431,
    radius: 0.4,
    neck: 0.377,
    arc: 2.5,
    shoulder: 0.83,
    fill: 0.9,
    label: [0.087, 0.754],
    contents: 'peanut',
    lid: 'tub',
    lidTop: 0.85,
  },
  // A squat jar under a black lug cap with a printed top.
  'wild-forest-honey': {
    kind: 'jar',
    height: 1.35,
    radius: 0.417,
    neck: 0.377,
    shoulder: 0.84,
    fill: 0.9,
    label: [0.158, 0.761],
    contents: 'honey',
    lid: 'black',
    lidTop: 0.73,
  },
  // `film` is the colour of the base gusset: the bottom band of each pouch.
  'moringa-leaf-powder': { kind: 'pouch', height: 2.1, aspect: 880 / 1240, film: '#a9c98b' },
  'spirulina-powder': { kind: 'pouch', height: 2.1, aspect: 880 / 1240, film: '#2c6a64' },
}

/* How far round the jar the unrolled label reaches (the part of the glass the
   photograph saw); the rest of the band carries on in the label's own colours. */
const LABEL_ARC = 2.3

/* Peanut butter is dense and matt. Honey is glossy amber with a glow of its
   own, a touch see-through (see Jar) so the leaves behind show faintly. True
   refraction would mean drawing the whole jungle a second time every frame,
   which is what made the scroll lag, so it is not used. */
const CONTENTS = {
  peanut: { color: '#b07a3e', roughness: 0.72, clearcoat: 0.12, emissive: '#2b1406', emissiveIntensity: 0.55 },
  honey: { color: '#b9600c', roughness: 0.07, clearcoat: 1, clearcoatRoughness: 0.03, emissive: '#6e2c00', emissiveIntensity: 0.7, envMapIntensity: 1.6 },
}

/* The lids, as the packshots show them.

   Peanut butter (tub): a tall white plastic screw cap, satin, with a flat top
   and a rounded edge down to a plain skirt.

   Honey (black): a glossy black lug cap with a rolled bead round its skirt.

   Each lid's top carries its own print (`-lid.webp`), laid on as a disc
   (`lidTop` on the pack is that disc's share of the lid's radius).

   Each outline runs from the axis at the bottom, out, up the side and back in
   across the top, so the lathe turns it into a closed cap. Heights and radii
   are fractions of the cap's own. */
const LIDS = {
  tub: {
    height: 0.122,
    outline: [
      [0, 0], [0.985, 0], [1, 0.04], [1, 0.9], [0.99, 0.96], [0.965, 0.995], [0.93, 1], [0, 1],
    ],
    material: { color: '#f1eee8', roughness: 0.45, clearcoat: 0.3, clearcoatRoughness: 0.35, metalness: 0 },
  },
  black: {
    height: 0.15,
    outline: [
      [0, 0], [0.985, 0], [1, 0.06], [1, 0.6], [1.016, 0.67], [1.018, 0.75], [1.008, 0.82],
      [1, 0.88], [0.975, 0.96], [0.94, 1], [0, 1],
    ],
    material: { color: '#141216', roughness: 0.22, clearcoat: 0.8, clearcoatRoughness: 0.12, metalness: 0 },
  },
  plastic: {
    height: 0.115,
    outline: [
      [0, 0], [0.985, 0], [1, 0.06], [1, 0.88], [0.99, 0.95], [0.965, 0.995],
      [0.93, 1], [0.895, 1], [0.875, 0.965], [0, 0.965],
    ],
    material: { color: '#5b3172', roughness: 0.4, clearcoat: 0.55, clearcoatRoughness: 0.28, metalness: 0 },
  },
  gold: {
    height: 0.085,
    outline: [
      [0, 0], [0.985, 0], [1, 0.08], [1, 0.56], [1.018, 0.63], [1.022, 0.7], [1.012, 0.77],
      [1, 0.84], [0.975, 0.95], [0.94, 1], [0.87, 1], [0.845, 0.95], [0.82, 0.92], [0, 0.92],
    ],
    material: {
      color: '#c9a14e',
      roughness: 0.3,
      metalness: 0.9,
      emissive: '#4d3410',
      emissiveIntensity: 0.45,
    },
  },
}

/* --- Jar ------------------------------------------------------------------ */

/* The glass, as a profile turned round the axis: a rounded base, the straight
   side, the shoulder curving in to the neck. */
function jarProfile(spec, inset = 0) {
  const { height: h, radius, neck, shoulder } = spec
  const r = radius * h - inset
  const n = neck * h - inset
  const top = h * 0.93
  return [
    [0, inset],
    [r * 0.9, inset],
    [r * 0.985, h * 0.012 + inset],
    [r, h * 0.045],
    [r, h * shoulder],
    [r * 0.985, h * (shoulder + 0.03)],
    [(r + n) / 2, h * (shoulder + 0.058)],
    [n * 1.01, h * (shoulder + 0.08)],
    [n, h * (shoulder + 0.095)],
    [n, top],
  ].map(([x, y]) => new THREE.Vector2(x, y))
}

/* What is inside: the same shape a little in from the glass, cut off at the
   fill line with a flat top. */
function contentsProfile(spec) {
  const level = spec.height * spec.fill
  const points = jarProfile(spec, spec.height * 0.012).filter((p) => p.y < level)
  const last = points[points.length - 1]
  points.push(new THREE.Vector2(last.x, level), new THREE.Vector2(0, level))
  return points
}

/* The label band. The front arc carries the unrolled label. The back of the
   band, which only shows at the edges as the jar turns, is the label's ground:
   for each row, the colour most of that row is printed on (see labelGround),
   so it carries on plainly round the jar and nothing printed is repeated. */
function labelGeometry(radius, height, front, arc = LABEL_ARC) {
  const half = arc / 2
  if (front) return new THREE.CylinderGeometry(radius, radius, height, 64, 1, true, -half, arc)
  const geometry = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true, half, Math.PI * 2 - arc)
  const uv = geometry.attributes.uv
  for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) < 0.5 ? 0.999 : 0.001)
  return geometry
}

/* A label's ground colour, row by row: the median of each row, which is the
   paper or the printed band rather than the lettering or the artwork on it.
   Kept as a strip one pixel wide, laid round the back of the band. */
//
// Each row's median is taken over 96 samples across it, picked out of the
// label without blending (so paper stays paper and ink stays ink), rather
// than over every other pixel: on a full-size label that was millions of
// values to sort, and held the page for seconds as the walk was set up. The
// median of an even spread of 96 is the same colour to the eye.
const GROUND_SAMPLES = 96

function labelGround(texture) {
  const image = texture.image
  const w = Math.min(GROUND_SAMPLES, image.width)
  const h = image.height
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const g = canvas.getContext('2d', { willReadFrequently: true })
  g.imageSmoothingEnabled = false
  g.drawImage(image, 0, 0, w, h)
  const data = g.getImageData(0, 0, w, h).data
  const strip = document.createElement('canvas')
  strip.width = 1
  strip.height = h
  const s = strip.getContext('2d')
  const row = s.createImageData(1, h)
  const values = new Uint8Array(w)
  for (let y = 0; y < h; y++) {
    for (let k = 0; k < 3; k++) {
      for (let x = 0; x < w; x++) values[x] = data[(y * w + x) * 4 + k]
      values.sort()
      row.data[y * 4 + k] = values[w >> 1]
    }
    row.data[y * 4 + 3] = 255
  }
  s.putImageData(row, 0, 0)
  const ground = new THREE.CanvasTexture(strip)
  ground.colorSpace = THREE.SRGBColorSpace
  return ground
}

function Jar({ spec, label, lidPrint, register }) {
  const ground = useMemo(() => labelGround(label), [label])
  const h = spec.height
  const r = spec.radius * h
  const cap = LIDS[spec.lid]
  const lidRadius = spec.neck * h * 1.07
  const lidHeight = h * cap.height
  const [labelLow, labelHigh] = spec.label
  const geometry = useMemo(() => {
    const lid = new THREE.LatheGeometry(
      cap.outline.map(([x, y]) => new THREE.Vector2(x * lidRadius, y * lidHeight)),
      96,
    )
    return {
      glass: new THREE.LatheGeometry(jarProfile(spec), 72),
      contents: new THREE.LatheGeometry(contentsProfile(spec), 72),
      lid,
      lidTop: new THREE.CircleGeometry(lidRadius * (spec.lidTop ?? 0.85), 64).rotateX(-Math.PI / 2),
      labelFront: labelGeometry(r * 1.006, h * (labelHigh - labelLow), true, spec.arc),
      labelBack: labelGeometry(r * 1.006, h * (labelHigh - labelLow), false, spec.arc),
    }
  }, [spec, cap, r, h, lidRadius, lidHeight, labelHigh, labelLow])

  const labelY = h * ((labelLow + labelHigh) / 2)
  return (
    <group position={[0, -h / 2, 0]}>
      <mesh geometry={geometry.contents} renderOrder={1}>
        <meshPhysicalMaterial
          ref={register(spec.contents === 'honey' ? 0.9 : 1)}
          {...CONTENTS[spec.contents]}
          transparent
          fog={false}
        />
      </mesh>
      <mesh geometry={geometry.labelFront} position={[0, labelY, 0]} renderOrder={2}>
        <meshPhysicalMaterial
          ref={register(1)}
          map={label}
          emissive="#ffffff"
          emissiveMap={label}
          emissiveIntensity={0.32}
          roughness={0.5}
          clearcoat={0.25}
          transparent
          fog={false}
        />
      </mesh>
      <mesh geometry={geometry.labelBack} position={[0, labelY, 0]} renderOrder={2}>
        <meshPhysicalMaterial
          ref={register(1)}
          map={ground}
          emissive="#ffffff"
          emissiveMap={ground}
          emissiveIntensity={0.32}
          roughness={0.5}
          transparent
          fog={false}
        />
      </mesh>
      {/* Screwed down over the neck, its skirt covering the thread. */}
      <mesh geometry={geometry.lid} position={[0, h * 0.925 - lidHeight * 0.55, 0]} renderOrder={2}>
        <meshPhysicalMaterial ref={register(1)} {...cap.material} envMapIntensity={1.6} transparent fog={false} />
      </mesh>
      {lidPrint && (
        <mesh geometry={geometry.lidTop} position={[0, h * 0.925 + lidHeight * 0.452, 0]} renderOrder={2}>
          <meshPhysicalMaterial
            ref={register(1)}
            map={lidPrint}
            emissive="#ffffff"
            emissiveMap={lidPrint}
            emissiveIntensity={0.3}
            roughness={0.5}
            alphaTest={0.5}
            transparent
            fog={false}
          />
        </mesh>
      )}
      {/* Clear glass over all of it: barely there, but for the reflections
          and the highlight running down its side. */}
      <mesh geometry={geometry.glass} renderOrder={3}>
        <meshPhysicalMaterial
          ref={register(0.22)}
          color="#ffffff"
          roughness={0.03}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.02}
          ior={1.5}
          specularIntensity={1}
          envMapIntensity={2.4}
          transparent
          depthWrite={false}
          fog={false}
        />
      </mesh>
    </group>
  )
}

/* --- Pouch ---------------------------------------------------------------- */

/* How full the pouch is at height v (0 at the base, 1 at the top): fullest a
   third of the way up, flat through the zip and the seal at the top, and
   still open at the base, where the gusset holds it out. */
const fullness = (v) => (0.55 + 0.45 * Math.sin(Math.min(1, v / 0.62) * Math.PI * 0.5)) * (1 - smoothstep(0.72, 0.86, v))
/* And across: flat along the sealed sides. */
const across = (u) => Math.max(0, 1 - (u / 0.93) ** 2) ** 0.55

function panelGeometry(width, height, depth) {
  const geometry = new THREE.PlaneGeometry(width, height, 36, 54)
  const position = geometry.attributes.position
  for (let i = 0; i < position.count; i++) {
    const u = position.getX(i) / (width / 2)
    const v = position.getY(i) / height + 0.5
    position.setZ(i, 0.003 + depth * across(u) * fullness(v))
  }
  geometry.computeVertexNormals()
  return geometry
}

/* The base: the oval the two panels open into at the bottom. */
function baseGeometry(width, depth) {
  const steps = 36
  const positions = []
  for (let i = 0; i <= steps; i++) {
    const u = (i / steps) * 2 - 1
    const z = 0.003 + depth * across(u) * fullness(0)
    positions.push(u * (width / 2), 0, z, u * (width / 2), 0, -z)
  }
  const index = []
  for (let i = 0; i < steps; i++) {
    const a = i * 2
    index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3)
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setIndex(index)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeVertexNormals()
  return geometry
}

/* The film's crinkle: a height field of soft creases — tight and level
   through the zip and the seal at the top, looser and slanting lower down —
   turned into a normal map, so the light catches the film as it does a real
   pouch. Drawn once. */
let crinkleMap = null
function crinkle() {
  if (crinkleMap) return crinkleMap
  const w = 256
  const h = 360
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const g = canvas.getContext('2d')
  g.fillStyle = '#808080'
  g.fillRect(0, 0, w, h)
  const random = seeded(19)
  g.filter = 'blur(2.5px)'
  for (let i = 0; i < 70; i++) {
    const top = random() < 0.35
    const y = top ? random() * h * 0.2 : h * 0.2 + random() * h * 0.8
    const x = random() * w
    const length = top ? 40 + random() * 120 : 20 + random() * 70
    const slant = top ? (random() - 0.5) * 0.15 : (random() - 0.5) * 1.6
    g.strokeStyle = random() < 0.5 ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
    g.lineWidth = 2 + random() * 4
    g.beginPath()
    g.moveTo(x, y)
    g.quadraticCurveTo(x + length / 2, y + slant * length * 0.5 + (random() - 0.5) * 8, x + length, y + slant * length)
    g.stroke()
  }
  // The zip: two firm ridges across the top.
  g.filter = 'blur(1px)'
  g.fillStyle = 'rgba(255,255,255,0.5)'
  g.fillRect(0, h * 0.135, w, 3)
  g.fillStyle = 'rgba(0,0,0,0.45)'
  g.fillRect(0, h * 0.135 + 4, w, 3)
  const height = g.getImageData(0, 0, w, h).data
  const normal = g.createImageData(w, h)
  const at = (x, y) => height[(((y + h) % h) * w + ((x + w) % w)) * 4] / 255
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * 4
      const dy = (at(x, y + 1) - at(x, y - 1)) * 4
      const len = Math.hypot(dx, dy, 1)
      const t = (y * w + x) * 4
      normal.data[t] = ((-dx / len) * 0.5 + 0.5) * 255
      normal.data[t + 1] = ((dy / len) * 0.5 + 0.5) * 255
      normal.data[t + 2] = ((1 / len) * 0.5 + 0.5) * 255
      normal.data[t + 3] = 255
    }
  g.putImageData(normal, 0, 0)
  crinkleMap = new THREE.CanvasTexture(canvas)
  return crinkleMap
}

function Pouch({ spec, front, back, register }) {
  const height = spec.height
  const width = height * spec.aspect
  const depth = width * 0.14
  const geometry = useMemo(() => {
    const backPanel = panelGeometry(width, height, depth)
    backPanel.rotateY(Math.PI)
    return {
      front: panelGeometry(width, height, depth),
      back: backPanel,
      base: baseGeometry(width, depth),
    }
  }, [width, height, depth])

  // Printed film: a satin sheen, crinkled, over the print. Only a little of
  // the photograph's own light is kept, so the light of the scene is what
  // shapes the pouch.
  const film = {
    roughness: 0.42,
    clearcoat: 0.5,
    clearcoatRoughness: 0.32,
    sheen: 0.35,
    sheenRoughness: 0.55,
    normalMap: crinkle(),
    normalScale: new THREE.Vector2(0.45, 0.45),
  }
  return (
    <group>
      <mesh geometry={geometry.front}>
        <meshPhysicalMaterial
          ref={register(1)}
          map={front}
          emissive="#ffffff"
          emissiveMap={front}
          emissiveIntensity={0.17}
          alphaTest={0.01}
          {...film}
          transparent
          fog={false}
        />
      </mesh>
      <mesh geometry={geometry.back}>
        <meshPhysicalMaterial
          ref={register(1)}
          map={back}
          emissive="#ffffff"
          emissiveMap={back}
          emissiveIntensity={0.17}
          alphaTest={0.01}
          {...film}
          transparent
          fog={false}
        />
      </mesh>
      <mesh geometry={geometry.base} position={[0, -height / 2 + 0.01, 0]}>
        <meshPhysicalMaterial ref={register(1)} color={spec.film} side={THREE.DoubleSide} {...film} transparent fog={false} />
      </mesh>
    </group>
  )
}

/* --- One product, hanging on the path ------------------------------------- */

function Product({ item, index, spec, textures, speck, lite, focused, dimmed, onHover, onSelect }) {
  const group = useRef(null)
  const halo = useRef(null)
  const fade = useRef(0)
  const tip = useRef(0)
  // Focus and falling back, each on the shared 0.8s curve (see stateTween):
  // every product comes forward, scales up and dims back exactly as the
  // first one does, whatever was in focus before it.
  const focus = useMemo(() => stateTween(0), [])
  const back = useMemo(() => stateTween(0), [])
  // Every material in the pack, with the opacity it has when fully shown, so
  // the whole pack can fade in and out together.
  const materials = useRef(new Map())
  const register = (opacity) => (material) => {
    if (material) materials.current.set(material, opacity)
  }
  useLayoutEffect(() => {
    materials.current.forEach((_, material) => (material.opacity = 0))
  }, [])

  const home = useMemo(() => {
    const point = pathPoint(item.t, new THREE.Vector3())
    // Well out to the side of the camera's line, so it is passed, never run
    // into.
    point.x += item.side * 1.9
    point.y += 0.05
    return point
  }, [item])

  useFrame(({ clock, camera }, delta) => {
    const time = clock.elapsedTime
    const node = group.current
    if (!node) return
    // A slow float, each on its own beat — and as the camera comes level, a
    // smooth step out to its side, so it clears the view rather than being
    // run through.
    const ahead = camera.position.z - home.z
    const aside = item.side * 1.6 * (1 - smoothstep(2.4, 6, ahead))
    node.position.set(
      home.x + aside + Math.sin(time * 0.45 + index * 2.1) * 0.06,
      home.y + Math.sin(time * 0.8 + index * 1.7) * 0.11,
      home.z,
    )
    // Faces back up the path, turned a little in towards the middle and
    // swaying gently — it holds that angle as the camera passes rather than
    // swinging round to follow it.
    node.rotation.set(0, 0, 0)
    node.rotateY(item.side * -0.32 + Math.sin(time * 0.5 + index) * 0.08)
    node.rotateZ(Math.sin(time * 0.37 + index * 3) * 0.03)
    // Tipped a touch by the camera's speed, eased so it leans rather than
    // rocks — kept small, so a long jump with the stops does not set every
    // product swinging back and forth.
    const want = THREE.MathUtils.clamp(travel.speed * 0.6, -0.1, 0.1)
    tip.current += (want - tip.current) * Math.min(1, delta * 3.5)
    node.rotateX(tip.current)

    const focusing = focus.step(focused ? 1 : 0, time)
    const dimming = back.step(dimmed ? 1 : 0, time)
    node.scale.setScalar(1 + 0.12 * focusing)

    // It comes out of the haze only once the camera is on its way — none is
    // waiting in view before the scroll begins — and is gone as it passes.
    const distance = camera.position.z - home.z
    // It fades away while still a comfortable size, before it could fill the
    // screen as the camera passes — so even a fast flick never shows a pack
    // sweeping across the view.
    const near = smoothstep(2.8, 4.2, distance) * (1 - smoothstep(11, 16, distance))
    // Distance is already eased by the camera's spring, so it is followed
    // closely; the focus and dimming carry the 0.8s curve.
    fade.current += (near - fade.current) * Math.min(1, delta * 8)
    const shown = fade.current * (1 - 0.65 * dimming)
    materials.current.forEach((full, material) => (material.opacity = full * shown))
    halo.current.opacity = shown * (0.16 + 0.18 * focusing)
    node.visible = shown > 0.01
  })

  return (
    <group
      ref={group}
      onPointerOver={(event) => {
        event.stopPropagation()
        onHover?.(index)
      }}
      onPointerOut={() => onHover?.(null)}
      onClick={(event) => {
        event.stopPropagation()
        onSelect?.(index)
      }}
    >
      <mesh position={[0, 0, -0.5]} scale={[2.8, 3.6, 1]} raycast={() => null}>
        <planeGeometry />
        <meshBasicMaterial
          ref={halo}
          map={speck}
          color="#ffc978"
          transparent
          opacity={0}
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {spec.kind === 'jar' ? (
        <Jar spec={spec} label={textures.label} lidPrint={textures.lid} register={register} />
      ) : (
        <Pouch spec={spec} front={textures.front} back={textures.back} register={register} />
      )}
      <ProductElements slug={item.slug} lite={lite} register={register} />
    </group>
  )
}

export default function FloatingProducts({ products, speck, lite = false, active, onHover, onSelect }) {
  // Only the products there is a modelled pack for.
  const shown = products
    .map((item, index) => ({ item, index, spec: PACKS[item.slug] }))
    .filter(({ spec }) => spec)

  // The printing each pack needs: a label and a lid top for a jar, a front
  // for a pouch (printed on both its sides).
  const files = shown.flatMap(({ item, spec }) =>
    spec.kind === 'jar'
      ? [`${DIR}${item.slug}-label.webp`, `${DIR}${item.slug}-lid.webp`]
      : [`${DIR}${item.slug}-front.webp`],
  )
  const loaded = useLoader(THREE.TextureLoader, files)
  const textures = useMemo(() => {
    loaded.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = 8
    })
    let n = 0
    return shown.map(({ spec }) =>
      spec.kind === 'jar' ? { label: loaded[n++], lid: loaded[n++] } : { front: loaded[n], back: loaded[n++] },
    )
    // `shown` follows `products`, which the section builds once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

  return shown.map(({ item, index, spec }, n) => (
    <Product
      key={item.slug}
      item={item}
      index={index}
      spec={spec}
      textures={textures[n]}
      speck={speck}
      lite={lite}
      focused={active === index}
      dimmed={active !== null && active !== index}
      onHover={onHover}
      onSelect={onSelect}
    />
  ))
}
