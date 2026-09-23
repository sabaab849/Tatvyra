import {
  Color,
  DataTexture,
  DirectionalLight,
  EquirectangularReflectionMapping,
  FloatType,
  HemisphereLight,
  IcosahedronGeometry,
  Mesh,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  RGBAFormat,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

/* Simplex noise, Ashima Arts / Stefan Gustavson (MIT). Used in the vertex
   shader to push the surface in and out. */
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

/* How far the surface at a point on the unit sphere is pushed out — and it is
   never far. The form should read as one soft elastic mass, a gel or a worn
   pebble, so everything here is shallow and slow:

     body     the form's own noise, which each standard shapes differently;
     breath   one slow swell through the whole body, set in the loop, so it is
              alive with nothing touching it;
     wave     the scroll, running up the body, a little deeper when the page
              is moving fast;
     magnet   the cursor, drawing the nearest surface barely toward it.

   The breath also opens and closes the body a touch, which is what keeps a
   small displacement from reading as a still object. */
const DISPLACE = /* glsl */ `
float philosophyDisplace(vec3 sp){
  float slow = snoise(sp * uFreq + vec3(uSeed, uTime * 0.07, uSeed * 0.5));
  float fine = snoise(sp * (uFreq * 2.15) + vec3(uSeed * 1.7, uTime * 0.11, 0.0)) * 0.28;
  float body = (slow + fine) * uAmp * (1.0 + uBreath * 6.0);
  float wave = sin(sp.y * 2.2 - uScroll * 6.2831853) * (0.012 + abs(uVel) * 0.026);
  float magnet = pow(max(dot(sp, uPointer), 0.0), 3.0) * uMagnet * 0.042;
  return body + uBreath + wave + magnet;
}
`

/* A small gradient sky, PMREM-filtered, so the surface has something soft to
   reflect: Warm White above, Lilac at the horizon, a deeper Lilac below. */
function buildEnvironment(renderer) {
  const width = 16
  const height = 32
  const data = new Float32Array(width * height * 4)
  const top = new Color('#f8f5ec')
  const mid = new Color('#c9b8e8')
  const low = new Color('#8f6fd0')
  const c = new Color()
  for (let y = 0; y < height; y++) {
    const t = y / (height - 1)
    if (t < 0.55) c.copy(top).lerp(mid, t / 0.55)
    else c.copy(mid).lerp(low, (t - 0.55) / 0.45)
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      data[i] = c.r
      data[i + 1] = c.g
      data[i + 2] = c.b
      data[i + 3] = 1
    }
  }
  const texture = new DataTexture(data, width, height, RGBAFormat, FloatType)
  texture.mapping = EquirectangularReflectionMapping
  texture.needsUpdate = true
  const pmrem = new PMREMGenerator(renderer)
  const target = pmrem.fromEquirectangular(texture)
  pmrem.dispose()
  texture.dispose()
  return target.texture
}

const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt))

/**
 * The lavender form, as a lit object in WebGL.
 *
 * Framework-free on purpose: React mounts and disposes it (PhilosophyForm),
 * and everything else here is plain three.js. The caller drives it with
 *   setState(index)  the standard being spoken — its tint, finish and the
 *                    shape of the noise, all eased rather than cut;
 *   setScroll(p, v)  the section's passage through the viewport and how fast
 *                    the page is moving, which run the wave up the body;
 *   setPointer(x, y) the cursor over the section, which tilts the form and
 *                    draws the surface toward it.
 *
 * The loop only runs while the canvas is on screen and the tab is visible.
 */
export function createPhilosophyBlob(canvas, { states, onFrame } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setClearAlpha(0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(38, 1, 0.1, 20)
  camera.position.set(0, 0, 3.85)
  scene.environment = buildEnvironment(renderer)

  // Kept low on purpose: lit any harder, the lavender washes out to grey.
  scene.add(new HemisphereLight(0xfff6e8, 0xb59fe0, 0.6))
  const key = new DirectionalLight(0xfff4e6, 1.15)
  key.position.set(-1.6, 1.9, 2.4)
  scene.add(key)
  const rim = new DirectionalLight(0xc9b8e8, 0.6)
  rim.position.set(2.2, -1.2, -1.8)
  scene.add(rim)

  /* Dense enough that the silhouette stays smooth now the surface is
     shallow, light enough to morph every frame: 20 × 18² faces. */
  const geometry = new IcosahedronGeometry(1, 18)
  const material = new MeshPhysicalMaterial({
    color: new Color(states[0].tint),
    roughness: states[0].roughness,
    metalness: 0,
    clearcoat: 0.16,
    clearcoatRoughness: 0.5,
    sheen: 0.35,
    sheenRoughness: 0.8,
    sheenColor: new Color(states[0].sheen),
    transmission: 0,
    envMapIntensity: 0.55,
    flatShading: false,
  })

  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uVel: { value: 0 },
    uAmp: { value: states[0].amp },
    uFreq: { value: states[0].freq },
    uSeed: { value: states[0].seed },
    uPointer: { value: new Vector3(0, 0, 1) },
    uMagnet: { value: 0 },
    uBreath: { value: 0 },
  }

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uTime; uniform float uScroll; uniform float uVel;
         uniform float uAmp; uniform float uFreq; uniform float uSeed;
         uniform vec3 uPointer; uniform float uMagnet; uniform float uBreath;
         varying float vRise;
         ${SIMPLEX}
         ${DISPLACE}`,
      )
      // The surface and its normal are found together: the normal comes from
      // two neighbours displaced the same way, so the lighting follows the
      // shape instead of the sphere it started as.
      .replace(
        '#include <beginnormal_vertex>',
        `vec3 sp = normalize(position);
         float d0 = philosophyDisplace(sp);
         vec3 displacedPosition = sp * (1.0 + d0);
         vec3 tangent = normalize(cross(sp, abs(sp.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
         vec3 bitangent = cross(sp, tangent);
         float e = 0.045;
         vec3 na = normalize(sp + tangent * e);
         vec3 nb = normalize(sp + bitangent * e);
         vec3 pa = na * (1.0 + philosophyDisplace(na));
         vec3 pb = nb * (1.0 + philosophyDisplace(nb));
         vec3 objectNormal = normalize(cross(pa - displacedPosition, pb - displacedPosition));
         if (dot(objectNormal, sp) < 0.0) objectNormal = -objectNormal;
         vRise = d0;`,
      )
      .replace('#include <begin_vertex>', 'vec3 transformed = displacedPosition;')

    // A thin wash of light through the rim, for the softness of something
    // lit from within rather than only from outside.
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         varying float vRise;`,
      )
      .replace(
        '#include <opaque_fragment>',
        `#include <opaque_fragment>
         float rimFace = 1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0);
         gl_FragColor.rgb += diffuseColor.rgb * pow(rimFace, 2.4) * (0.28 + vRise * 0.5);`,
      )
  }

  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  // Everything the loop eases toward.
  const target = {
    tint: new Color(states[0].tint),
    sheen: new Color(states[0].sheen),
    roughness: states[0].roughness,
    amp: states[0].amp,
    freq: states[0].freq,
    seed: states[0].seed,
    scroll: 0,
    vel: 0,
    pointer: new Vector2(0, 0),
    magnet: 0,
  }
  const pointer = new Vector2(0, 0)
  const pointerWorld = new Vector3(0, 0, 1)

  /* How far the cursor may ever move the form. Small on purpose: about four
     degrees of tilt and five of yaw, and a twentieth of the radius of drift.
     Past that it stops being a form that notices you and starts being a toy. */
  const TILT = 0.072
  const YAW = 0.09
  const DRIFT = 0.05
  let spin = 0
  let yaw = 0

  let last = 0
  let frame = 0
  let running = false
  let visible = true
  let onScreen = false

  const size = { width: 1, height: 1, dpr: 1 }
  const resize = () => {
    const box = canvas.getBoundingClientRect()
    const width = Math.max(1, Math.round(box.width))
    const height = Math.max(1, Math.round(box.height))
    // Two device pixels per CSS pixel is plenty for a soft, matte object.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    if (width === size.width && height === size.height && dpr === size.dpr) return
    Object.assign(size, { width, height, dpr })
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }

  const render = () => {
    frame = 0
    const now = performance.now()
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    uniforms.uTime.value += dt
    const t = uniforms.uTime.value

    // The breath: two sines that never quite line up, so the form swells and
    // settles without ever repeating on a count you can hear.
    uniforms.uBreath.value = Math.sin(t * 0.42) * 0.011 + Math.sin(t * 0.27 + 1.7) * 0.006

    /* Everything below is eased, never set: choosing a standard, catching the
       scroll and following the cursor all arrive over about half a second, so
       nothing in the form ever jumps. */
    material.color.lerp(target.tint, 1 - Math.exp(-2.4 * dt))
    material.sheenColor.lerp(target.sheen, 1 - Math.exp(-2.4 * dt))
    material.roughness = damp(material.roughness, target.roughness, 2.4, dt)

    uniforms.uAmp.value = damp(uniforms.uAmp.value, target.amp, 1.7, dt)
    uniforms.uFreq.value = damp(uniforms.uFreq.value, target.freq, 1.7, dt)
    uniforms.uSeed.value = damp(uniforms.uSeed.value, target.seed, 1.3, dt)
    uniforms.uScroll.value = damp(uniforms.uScroll.value, target.scroll, 4, dt)
    uniforms.uVel.value = damp(uniforms.uVel.value, target.vel, 3.2, dt)
    uniforms.uMagnet.value = damp(uniforms.uMagnet.value, target.magnet, 3, dt)

    pointer.x = damp(pointer.x, target.pointer.x, 2.6, dt)
    pointer.y = damp(pointer.y, target.pointer.y, 2.6, dt)

    // Where the cursor is, in the object's own space, for the surface to
    // reach toward.
    pointerWorld.set(pointer.x, pointer.y, 1.15).normalize()
    uniforms.uPointer.value.copy(pointerWorld).applyQuaternion(mesh.quaternion.clone().invert())

    /* A slow turn of its own, and over it a parallax that leans toward the
       cursor and returns on its own when the cursor leaves. The lean is an
       offset, not a change of speed, so the turn never runs away. */
    spin += dt * 0.055
    yaw = damp(yaw, pointer.x * YAW, 2.2, dt)
    mesh.rotation.y = spin + yaw
    mesh.rotation.x = damp(mesh.rotation.x, pointer.y * -TILT, 2.2, dt)
    mesh.rotation.z = damp(mesh.rotation.z, pointer.x * 0.03 + uniforms.uScroll.value * 0.07, 2.2, dt)
    mesh.position.x = damp(mesh.position.x, pointer.x * DRIFT, 2.4, dt)
    mesh.position.y = damp(mesh.position.y, pointer.y * DRIFT * 0.7 - uniforms.uScroll.value * 0.04, 2.4, dt)

    renderer.render(scene, camera)
    onFrame?.(dt)
    if (running) frame = requestAnimationFrame(render)
  }

  const start = () => {
    if (running || !visible || !onScreen) return
    running = true
    last = performance.now()
    frame = requestAnimationFrame(render)
  }
  const stop = () => {
    running = false
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  const onVisibility = () => {
    visible = document.visibilityState === 'visible'
    if (visible) {
      renderer.render(scene, camera)
      start()
    } else stop()
  }
  document.addEventListener('visibilitychange', onVisibility)

  const observer =
    typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting
            if (onScreen) {
              renderer.render(scene, camera)
              start()
            } else stop()
          },
          { rootMargin: '10% 0px' },
        )
  if (observer) observer.observe(canvas)
  else {
    onScreen = true
  }

  const resizeObserver =
    typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => resize())
  if (resizeObserver) resizeObserver.observe(canvas)
  else window.addEventListener('resize', resize)

  resize()
  // One frame up front, so the form is there before it is scrolled to.
  renderer.render(scene, camera)
  start()

  return {
    setState(index) {
      const state = states[Math.max(0, Math.min(states.length - 1, index))]
      target.tint.set(state.tint)
      target.sheen.set(state.sheen)
      target.roughness = state.roughness
      target.amp = state.amp
      target.freq = state.freq
      target.seed = state.seed
    },
    setScroll(progress, velocity) {
      target.scroll = progress
      target.vel = velocity
    },
    setPointer(x, y, magnet = 1) {
      const clamp = (v) => Math.max(-1, Math.min(1, v))
      target.pointer.set(clamp(x), clamp(y))
      target.magnet = magnet
    },
    dispose() {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      observer?.disconnect()
      resizeObserver?.disconnect()
      if (!resizeObserver) window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      scene.environment?.dispose()
      renderer.dispose()
    },
  }
}
