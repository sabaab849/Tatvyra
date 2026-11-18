import { memo, Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import FloatingProducts from './FloatingProducts'
import { blade, loadLeaves } from './foliage'
import { CAMERA_END, LENGTH, pathPoint, seeded, smoothstep, travel } from './path'

/**
 * The jungle the homepage closes on: a tunnel of foliage the camera travels
 * down as the page scrolls, out of deep shade into morning haze, with the
 * products hanging in the clearing along the way.
 *
 * THE CANOPY is photographs. Every leaf is a real one — fern, anthurium,
 * calathea, pachira and ivy, cut from photo-scanned plants (foliage.js) — with
 * its own outline, its own veins and its own sheen, laid on a bent blade and
 * planted as instances along the path. They are lit, not flat: a low sun at
 * the far end of the tunnel backlights them and shows through the thin ones,
 * a cool fill comes from behind the camera, and a soft lamp travels with the
 * camera so the wet sheen on the nearest leaves moves as it passes. They move
 * a little in the wind.
 *
 * THE AIR carries the depth. Mist swallows what is far; shafts of light stand
 * in the corridor and the camera passes through them; pollen drifts in two
 * slow layers.
 *
 * `progress` is a Framer Motion value, 0 to 1, from the page's scroll. The
 * section paces it (one steady speed, eased in and out, never past where the
 * scroll stopped), and the camera moves with it — forward when the scroll
 * goes forward, back when it goes back — looking straight down the path,
 * level and steady. `running` stops the frames while the section is
 * off screen. `lite` is set on phones: a little lighter canopy and cheaper
 * rendering.
 *
 * Only the stretch of tunnel the mist lets the camera see is drawn.
 */
const SHADE = new THREE.Color('#1d3320')
// The open air at the far end: a pale sky blue, so the tunnel's mist clears
// into the blue sky the section closes on.
const HAZE = new THREE.Color('#a9cbea')

/* Shared by every leaf's shader: the wind's clock, and where the low sun is
   as the camera sees it. */
const WIND = { value: 0 }
const SUN = { value: new THREE.Vector3(0, 1, 0) }
const SUN_FROM = new THREE.Vector3(-3, 6, -8).normalize()

/* --- The leaves' material ---------------------------------------------------
   A physical surface built from the photograph's own maps: its colour, its
   cut-out for the outline, its normals for the veins and its roughness for
   where it is waxy and where it is dull, under a thin clear coat — the film
   of wet on a jungle leaf. Two things are written into its shader: the wind,
   and the light that comes through a leaf when the sun is behind it. */
function leafMaterial({ map, alphaMap, normalMap, roughnessMap }, soft) {
  const material = new THREE.MeshPhysicalMaterial({
    map,
    alphaMap,
    normalMap,
    roughnessMap,
    normalScale: new THREE.Vector2(1, 1),
    roughness: 0.82,
    metalness: 0,
    clearcoat: 0.15,
    clearcoatRoughness: 0.5,
    envMapIntensity: 0.5,
    alphaTest: 0.5,
    // With antialiasing on, the cut-out's edge is blended rather than
    // stepped, so the leaf's margin stays soft up close.
    alphaToCoverage: soft,
    side: THREE.DoubleSide,
  })
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uWind = WIND
    shader.uniforms.uSun = SUN
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uWind;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          float leafPhase = instanceMatrix[3].x * 1.7 + instanceMatrix[3].z * 0.9 + instanceMatrix[3].y;
        #else
          float leafPhase = 0.0;
        #endif
        float leafReach = position.y * position.y;
        transformed.x += sin(uWind * 1.1 + leafPhase + position.y * 2.5) * 0.035 * leafReach;
        transformed.z += cos(uWind * 0.8 + leafPhase * 1.3) * 0.055 * leafReach;`,
      )
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uSun;')
      .replace(
        '#include <opaque_fragment>',
        `// The sun behind the leaf: its light comes through, yellowed.
        float leafThrough = max(0.0, -dot(normalize(normal), uSun));
        outgoingLight += diffuseColor.rgb * vec3(1.0, 0.92, 0.42) * leafThrough * 1.5;
        #include <opaque_fragment>`,
      )
  }
  return material
}

/* --- Planting ---------------------------------------------------------------
   The path is planted in stretches, and only the stretches the mist lets the
   camera see are drawn. Each plant is rooted on a ring round the path and
   grows in towards it — or, for the vines, hangs from above — never far
   enough to cross the corridor the camera and the products use. */
const STRETCHES = 9
const PLANTED = 0.9 // none past here: the camera comes out into open haze
const SEEN_AHEAD = 30
/* How close any leaf tip may come to the centre line the camera travels. */
const CLEARANCE = 2.5
const SEEN_BEHIND = 7

function Foliage({ plant, geometry, count, seed, ring, size, hang = false, soft = true, narrow = 1 }) {
  const meshes = useRef([])
  const each = Math.ceil(count / STRETCHES)
  const material = useMemo(() => leafMaterial(plant, soft), [plant, soft])
  const slim = plant.aspect
  useEffect(() => () => material.dispose(), [material])

  useEffect(() => {
    const random = seeded(seed)
    const stand = new THREE.Object3D()
    const centre = new THREE.Vector3()
    const colour = new THREE.Color()
    meshes.current.forEach((mesh, stretch) => {
      if (!mesh) return
      for (let i = 0; i < each; i++) {
        const t = ((stretch + random()) / STRETCHES) * PLANTED - 0.02
        pathPoint(t, centre)
        // Vines hang from the upper half of the tunnel only.
        const angle = hang ? Math.PI * (random() > 0.5 ? 0.1 + random() * 0.22 : 0.68 + random() * 0.22) : random() * Math.PI * 2
        let radius = ring[0] + random() * (ring[1] - ring[0])
        // A vine hangs straight down, so it is kept out to the sides: clear of
        // the corridor, the products and the type.
        if (hang) radius = Math.max(radius, 3 / Math.max(0.2, Math.abs(Math.cos(angle))))
        stand.position.set(
          // `narrow` draws the walls in from the sides on a phone, where the
          // tall screen crops them.
          centre.x + Math.cos(angle) * radius * narrow,
          centre.y + Math.sin(angle) * radius * 0.82,
          centre.z,
        )
        stand.rotation.set(0, 0, 0)
        // Face back up the tunnel, towards where the camera comes from.
        stand.lookAt(centre.x, centre.y, centre.z + 8)
        // Then the tip: in to the middle, or straight down for a vine.
        stand.rotateZ(hang ? Math.PI + (random() - 0.5) * 0.3 : angle + Math.PI / 2 + (random() - 0.5) * 0.5)
        // A little out of true, and a little drooping, but every leaf lies
        // roughly along the wall: neighbours layer over one another instead of
        // cutting through each other.
        stand.rotateX((random() - 0.5) * (hang ? 0.25 : 0.4) + (hang ? 0 : random() * 0.2))
        stand.rotateY((random() - 0.5) * 0.6)
        const scale = hang
          ? size[0] + random() * (size[1] - size[0])
          : Math.max(0.8, Math.min(radius - CLEARANCE, size[0] + random() * (size[1] - size[0])))
        // Its own proportion, and as often as not its mirror image.
        stand.scale.set(scale * slim * (random() > 0.5 ? 1 : -1), scale, scale)
        stand.updateMatrix()
        mesh.setMatrixAt(i, stand.matrix)
        // The photograph's own colour, a touch deeper or paler leaf to leaf.
        // (The ivy was photographed paler than the rest, so it is brought down.)
        const tone = (0.62 + random() * 0.38) * (hang ? 0.5 : 1)
        colour.setRGB(tone * (0.9 + random() * 0.1), tone, tone * (0.82 + random() * 0.18))
        mesh.setColorAt(i, colour)
      }
      mesh.instanceMatrix.needsUpdate = true
      mesh.instanceColor.needsUpdate = true
    })
  }, [each, seed, ring, size, hang, slim, narrow])

  useFrame(({ camera }) => {
    const at = -camera.position.z
    meshes.current.forEach((mesh, stretch) => {
      if (!mesh) return
      const from = (stretch / STRETCHES) * PLANTED * LENGTH
      const to = ((stretch + 1) / STRETCHES) * PLANTED * LENGTH
      mesh.visible = to > at - SEEN_BEHIND && from < at + SEEN_AHEAD
    })
  })

  return Array.from({ length: STRETCHES }, (_, stretch) => (
    <instancedMesh
      key={stretch}
      ref={(mesh) => {
        meshes.current[stretch] = mesh
      }}
      args={[geometry, material, each]}
      frustumCulled={false}
    />
  ))
}

/* --- The air ---------------------------------------------------------------- */

/* A soft round speck, for the pollen and for the sun's bloom. */
function speckTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const g = canvas.getContext('2d')
  const fill = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  fill.addColorStop(0, 'rgba(255,255,255,0.9)')
  fill.addColorStop(0.3, 'rgba(255,255,255,0.28)')
  fill.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = fill
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

/* A shaft of light: bright down its middle, streaked, fading at both ends. */
function shaftTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 512
  const g = canvas.getContext('2d')
  const random = seeded(77)
  for (let x = 0; x < 128; x++) {
    const across = Math.exp(-(((x - 64) / 34) ** 2))
    const streak = 0.55 + random() * 0.45
    const fill = g.createLinearGradient(0, 0, 0, 512)
    const a = across * streak
    fill.addColorStop(0, 'rgba(255,255,255,0)')
    fill.addColorStop(0.18, `rgba(255,255,255,${a * 0.9})`)
    fill.addColorStop(0.6, `rgba(255,255,255,${a * 0.5})`)
    fill.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = fill
    g.fillRect(x, 0, 1, 512)
  }
  return new THREE.CanvasTexture(canvas)
}

/* Shafts of morning light, standing in the corridor all the way down it and
   falling from the upper left. They belong to the place, not to the camera:
   it travels through them, and the leaves in front of them cut into them. */
function LightShafts({ texture, count }) {
  const shafts = useMemo(() => {
    const random = seeded(5)
    const centre = new THREE.Vector3()
    return Array.from({ length: count }, (_, i) => {
      const t = ((i + random() * 0.8) / count) * (PLANTED + 0.06)
      pathPoint(t, centre)
      return {
        position: [centre.x + (random() - 0.5) * 3.2, centre.y + 1.2 + random() * 1.5, centre.z],
        rotation: [0, (random() - 0.5) * 0.5, -0.42 - random() * 0.3],
        scale: [1.6 + random() * 2.6, 9 + random() * 5, 1],
        opacity: 0.13 + random() * 0.12,
        beat: random() * 6,
      }
    })
  }, [count])
  const group = useRef(null)

  useFrame(({ clock, camera }) => {
    group.current?.children.forEach((mesh, i) => {
      const shaft = shafts[i]
      const away = camera.position.z - mesh.position.z
      mesh.visible = away > -4 && away < 30
      // A slow breathing, as mist drifts across the light.
      // Faint at a distance, where the mist would have taken them.
      const reach = 1 - Math.min(1, Math.max(0, (away - 12) / 18))
      mesh.material.opacity = shaft.opacity * reach * (0.75 + 0.25 * Math.sin(clock.elapsedTime * 0.3 + shaft.beat))
    })
  })

  return (
    <group ref={group}>
      {shafts.map((shaft, i) => (
        <mesh key={i} position={shaft.position} rotation={shaft.rotation} scale={shaft.scale}>
          <planeGeometry />
          <meshBasicMaterial
            map={texture}
            color="#ffd9a0"
            transparent
            opacity={shaft.opacity}
            depthWrite={false}
            fog={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* Pollen and dust: small, dim and slow, drifting on its own course. Two of
   these at different speeds read as air moving, not as sparkle. */
function Pollen({ texture, count, seed, size, opacity, drift }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const random = seeded(seed)
    const centre = new THREE.Vector3()
    const list = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pathPoint(random() * 0.98, centre)
      const angle = random() * Math.PI * 2
      const radius = Math.sqrt(random()) * 3.1
      list[i * 3] = centre.x + Math.cos(angle) * radius
      list[i * 3 + 1] = centre.y + Math.sin(angle) * radius
      list[i * 3 + 2] = centre.z + (random() - 0.5) * 2
    }
    return list
  }, [count, seed])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const time = clock.elapsedTime * drift
    ref.current.position.set(Math.sin(time * 0.7) * 0.22, Math.sin(time) * 0.16 + time * 0.012 % 0.4, 0)
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#ffdf9e"
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* --- The light --------------------------------------------------------------
   What the wet leaves reflect: a dim green room with a warm opening ahead and
   above, built once and blurred into an environment. */
function Reflections() {
  const { gl, scene, camera } = useThree()
  const made = useRef(null)
  const generator = useRef(null)

  const build = () => {
    if (made.current) return
    const room = new THREE.Scene()
    const parts = []
    const wall = (geometry, colour, power, position) => {
      const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
      material.color.set(colour).multiplyScalar(power)
      const mesh = new THREE.Mesh(geometry, material)
      if (position) {
        mesh.position.set(...position)
        mesh.lookAt(0, 0, 0)
      }
      room.add(mesh)
      parts.push(geometry, material)
    }
    wall(new THREE.BoxGeometry(40, 40, 40), '#0c1a0d', 1)
    wall(new THREE.PlaneGeometry(16, 12), '#ffd39a', 7, [-4, 12, -10]) // the opening
    wall(new THREE.PlaneGeometry(10, 16), '#bfe3a0', 1.6, [14, 2, 4]) // green bounce
    wall(new THREE.PlaneGeometry(8, 8), '#9db8d6', 1.2, [-6, 3, 14]) // cool sky behind
    const pmrem = generator.current ?? new THREE.PMREMGenerator(gl)
    generator.current = pmrem
    const environment = pmrem.fromScene(room, 0.05).texture
    scene.environment = environment
    parts.forEach((item) => item.dispose())
    made.current = { pmrem, environment }
  }

  // Blurring the room into an environment runs two of the heaviest shaders in
  // the scene, and compiling them in the ordinary way holds the page for most
  // of a second. So they are compiled first, in parallel, the same way as the
  // leaves' (WarmUp), and only then is the room blurred, which is quick once
  // they are ready. They are drawn into an off-screen target, without tone
  // mapping, so that is how they are compiled: compiled for the screen they
  // would be a different shader and compiled again on use.
  //
  // This reaches into the generator's own parts, which three.js does not
  // document; if a later version moves them, it simply builds the ordinary way.
  useEffect(() => {
    let cancelled = false
    const prepare = async () => {
      const pmrem = new THREE.PMREMGenerator(gl)
      generator.current = pmrem
      try {
        pmrem._setSize(256)
        pmrem._allocateTargets().dispose()
        const filters = [pmrem._ggxMaterial, pmrem._blurMaterial].filter(Boolean)
        const target = pmrem._pingPongRenderTarget
        if (gl.compileAsync && filters.length && target) {
          const stage = new THREE.Scene()
          const geometry = new THREE.BufferGeometry()
          filters.forEach((material) => stage.add(new THREE.Mesh(geometry, material)))
          const previous = gl.getRenderTarget()
          gl.setRenderTarget(target)
          const compiling = gl.compileAsync(stage, camera)
          gl.setRenderTarget(previous)
          await compiling
          geometry.dispose()
        }
      } catch {
        // Fall through and build the ordinary way.
      }
      if (!cancelled) build()
    }
    prepare()
    return () => {
      cancelled = true
      if (made.current) scene.environment = null
      made.current?.environment.dispose()
      generator.current?.dispose()
      made.current = null
      generator.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera])

  // A frame is about to be drawn before that has finished: it needs the
  // reflections now.
  useFrame(() => {
    if (!made.current) build()
  })
  return null
}

/* The mist is the scene's background too, so the far end of the tunnel is
   never a hard edge. */
function Mist() {
  const { scene } = useThree()
  useEffect(() => {
    const fog = new THREE.FogExp2(SHADE.clone(), 0.074)
    scene.fog = fog
    scene.background = fog.color
    return () => {
      scene.fog = null
      scene.background = null
    }
  }, [scene])
  return null
}

/* --- The camera -------------------------------------------------------------
   Drawn after the scroll on a critically damped spring — it gathers speed and
   sheds it without a jolt and never overshoots — looking a little way down
   the path, leaning into the bends, with the faintest drift of a held camera.
   The mist warms and thins over the last stretch. The lamp and the sun's
   bloom travel with it. */
function Journey({ progress, speck }) {
  const { camera, scene } = useThree()
  const at = useRef(progress.get())
  const ahead = useMemo(() => new THREE.Vector3(), [])
  const gaze = useMemo(() => new THREE.Vector3(), [])
  const started = useRef(false)
  const turned = useMemo(() => new THREE.Quaternion(), [])
  const lamp = useRef(null)
  const sun = useRef(null)

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    // The walk arrives already paced (see JungleJourney): one steady speed
    // forward or back, eased in and out, never rushed by a fast scroll.
    const next = progress.get()
    travel.speed = delta > 0 ? (next - at.current) / delta : 0
    at.current = next

    const p = at.current
    const t = p * CAMERA_END
    const time = clock.elapsedTime
    pathPoint(t, camera.position)
    pathPoint(t + 0.034, ahead)
    if (!started.current) {
      gaze.copy(ahead)
      started.current = true
    }
    gaze.lerp(ahead, Math.min(1, delta * 5))
    camera.lookAt(gaze)

    WIND.value = time
    SUN.value.copy(SUN_FROM).applyQuaternion(turned.copy(camera.quaternion).invert())

    const warm = smoothstep(0.66, 1, p)
    scene.fog.color.lerpColors(SHADE, HAZE, warm)
    scene.fog.density = 0.074 - warm * 0.04

    if (lamp.current) lamp.current.position.copy(camera.position)
    if (sun.current) {
      pathPoint(Math.min(1.12, t + 0.2), sun.current.position)
      sun.current.material.opacity = 0.3 + warm * 0.2
      sun.current.scale.setScalar(20 + warm * 30)
    }
  })

  return (
    <>
      {/* The low sun, from the far end and above: backlight and rim. */}
      <directionalLight color="#ffd9a3" intensity={2.5} position={[-3, 6, -8]} />
      {/* Sky from behind the camera: a cool fill on the faces turned to it. */}
      <directionalLight color="#b9d3c4" intensity={0.75} position={[2, 3, 9]} />
      <hemisphereLight args={['#dfe9c2', '#0a140a', 0.85]} />
      {/* A soft lamp with the camera, so the nearest leaves have form and
          their sheen moves as it passes. */}
      <pointLight ref={lamp} color="#ffe6bd" intensity={7} distance={11} decay={1.6} />
      <sprite ref={sun}>
        <spriteMaterial
          map={speck}
          color="#fff4dc"
          transparent
          depthWrite={false}
          depthTest={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  )
}

/* Everything is made ready on the graphics card before the walk starts,
   products and the far stretches of the tunnel included: every material
   compiled and every texture uploaded. Otherwise each was prepared the moment
   it first came into view — which is what made a jump along the walk with the
   stops catch for a frame or two.

   None of it holds the page up. The shaders are compiled in parallel by the
   graphics driver (compileAsync) instead of one after another with the page
   waiting on each, and the textures go up one a frame instead of all in the
   same one. It waits for the reflections (above) first, because the shaders
   are compiled for the lighting they will be drawn with.

   (It used to finish by drawing the whole scene once into a one-pixel target.
   A target is drawn without tone mapping, so that draw compiled a second,
   unused set of every shader, and it was most of the freeze the section
   caused as it approached. Leaf placements, the one thing it still prepared,
   cost nothing to send on the first real frame.) */
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

function WarmUp() {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!scene.environment) {
        await nextFrame()
        if (cancelled) return
      }
      // Gathered with everything made visible, then put back at once, so no
      // frame is ever drawn with the far stretches showing.
      const hidden = []
      const culled = []
      scene.traverse((object) => {
        if (!object.visible) {
          hidden.push(object)
          object.visible = true
        }
        if (object.frustumCulled) {
          culled.push(object)
          object.frustumCulled = false
        }
      })
      const compiling = gl.compileAsync ? gl.compileAsync(scene, camera) : Promise.resolve(gl.compile(scene, camera))
      const textures = new Set()
      scene.traverse((object) => {
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          if (!material) return
          Object.values(material).forEach((value) => value?.isTexture && textures.add(value))
        })
      })
      hidden.forEach((object) => (object.visible = false))
      culled.forEach((object) => (object.frustumCulled = true))
      await compiling
      for (const texture of textures) {
        if (cancelled) return
        gl.initTexture(texture)
        await nextFrame()
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [gl, scene, camera])
  return null
}

/* How each kind is planted: the blade it lies on, how many of each leaf, how
   far from the path it is rooted, and how long it grows. The broad leaves
   stand furthest out and make the wall; ferns and anthuriums crowd the inside
   of it; the vines hang at the sides. */
const PLANTING = {
  fern: { blade: 'frond', count: 160, ring: [3.5, 6.8], size: [2.2, 4.4] },
  anthurium: { blade: 'broad', count: 125, ring: [3.7, 7.6], size: [2.2, 4.2] },
  calathea: { blade: 'round', count: 115, ring: [4.3, 8.6], size: [2, 3.6] },
  pachira: { blade: 'round', count: 100, ring: [4, 8], size: [2, 3.4] },
  vine: { blade: 'strand', count: 100, ring: [3.4, 5.4], size: [4.2, 7], hang: true },
}

function JungleScene({ progress, running = true, lite = false, products, active, onHover, onSelect }) {
  const leaves = useMemo(() => loadLeaves(), [])
  const blades = useMemo(
    () => ({
      broad: blade(0.45, 0.14),
      round: blade(0.3, 0.2),
      frond: blade(0.62, 0.06, 3, 18),
      strand: blade(0.1, 0.04, 3, 20),
    }),
    [],
  )
  const air = useMemo(() => ({ speck: speckTexture(), shaft: shaftTexture() }), [])
  useEffect(
    () => () => {
      leaves.forEach(({ map, alphaMap, normalMap, roughnessMap }) => {
        map.dispose()
        alphaMap.dispose()
        normalMap.dispose()
        roughnessMap.dispose()
      })
      Object.values(blades).forEach((geometry) => geometry.dispose())
      Object.values(air).forEach((texture) => texture.dispose())
    },
    [leaves, blades, air],
  )

  // The plantings were set for a 120-unit path; on a shorter one the same
  // density of leaves takes proportionally fewer. Phones (`lite`) take three
  // quarters of the desktop canopy: a narrow screen shows less of the tunnel
  // at once, so it needs nearly as many leaves to read as dense.
  const density = (lite ? 0.75 : 1) * (LENGTH / 120)
  const n = (count) => Math.round(count * density)

  return (
    <Canvas
      className="jungle__canvas"
      // One device pixel per CSS pixel: the leaves' cut-out edges and the mist
      // read the same, and on a high-density screen the scene is drawn at a
      // half or a third of the work, which is what keeps the scroll smooth.
      dpr={1}
      frameloop={running ? 'always' : 'never'}
      camera={{ fov: 62, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        // Asking the driver for each shader's compile log stalls until that
        // shader has compiled. Worth it while developing; in production the
        // shaders are known good, so the site does not wait on them.
        gl.debug.checkShaderErrors = !import.meta.env.PROD
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <Mist />
      <Reflections />
      <Journey progress={progress} speck={air.speck} />
      {leaves.map((leaf, index) => {
        const planting = PLANTING[leaf.kind]
        return (
          <Foliage
            key={leaf.name}
            plant={leaf}
            geometry={blades[planting.blade]}
            count={n(planting.count)}
            seed={17 + index * 23}
            ring={planting.ring}
            size={planting.size}
            hang={planting.hang}
            soft={!lite}
            narrow={lite ? 0.8 : 1}
          />
        )
      })}
      <LightShafts texture={air.shaft} count={lite ? 16 : 26} />
      <Pollen texture={air.speck} count={n(420)} seed={91} size={0.07} opacity={0.34} drift={0.2} />
      <Pollen texture={air.speck} count={n(110)} seed={37} size={0.12} opacity={0.14} drift={0.11} />
      <Suspense fallback={null}>
        <FloatingProducts
          products={products}
          speck={air.speck}
          lite={lite}
          active={active}
          onHover={onHover}
          onSelect={onSelect}
        />
        <WarmUp />
      </Suspense>
    </Canvas>
  )
}

// Drawn again only when one of its own props changes, not whenever the
// section around it updates its own state (the sky, the captions).
export default memo(JungleScene)
