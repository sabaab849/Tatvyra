import { useEffect, useRef } from 'react'

/**
 * The sky the jungle walk comes out into, drawn on the graphics card so it is
 * sharp at any screen size: a clear blue sky, deeper at the top, with soft
 * but well-defined white cloud drifting slowly across it, and the sun high on
 * the left — a warm glow with gentle rays fanning out from it, which the cloud
 * dims where it passes in front.
 *
 * It only draws while `running`, which the section sets once the sky is
 * coming into view, and draws at most at 1.5 device pixels per CSS pixel.
 * Under reduced motion it draws once and holds still.
 */
const VERTEX = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`

const FRAGMENT = `
precision highp float;
varying vec2 uv;
uniform vec2 size;
uniform float time;
uniform vec2 sun;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = turn * p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}

/* Cloud cover at a point: billowing fractal cloud, warped so it reads as
   heaped cumulus rather than smoke, thinner low in the sky. */
float cloud(vec2 p) {
  vec2 q = vec2(fbm(p + vec2(0.0, time * 0.01)), fbm(p + vec2(5.2, 1.3)));
  float d = fbm(p + 1.6 * q + vec2(time * 0.012, 0.0));
  return smoothstep(0.5, 0.74, d);
}

void main() {
  vec2 frag = uv * size;
  float aspect = size.x / size.y;
  vec2 st = vec2(uv.x * aspect, uv.y);

  // The sky: a clear mid blue, deeper overhead, paler towards the horizon.
  vec3 top = vec3(0.20, 0.43, 0.72);
  vec3 low = vec3(0.62, 0.78, 0.92);
  vec3 sky = mix(low, top, smoothstep(0.0, 1.0, uv.y));

  // The sun's warm light across the sky around it.
  vec2 s = vec2(sun.x * aspect, sun.y);
  vec2 toSun = st - s;
  float dist = length(toSun);
  sky += vec3(1.0, 0.95, 0.85) * 0.22 * exp(-dist * 3.4);

  // Cloud, drifting slowly; lit white on top, a soft grey-blue underneath.
  vec2 cp = st * vec2(2.4, 3.2) + vec2(time * 0.006, 0.0);
  float c = cloud(cp);
  float lit = cloud(cp + vec2(0.0, 0.035));
  vec3 cloudColour = mix(vec3(0.74, 0.80, 0.88), vec3(1.0), clamp(1.0 - (c - lit) * 2.5 + 0.35, 0.0, 1.0));
  cloudColour += vec3(1.0, 0.96, 0.88) * 0.12 * exp(-dist * 2.5);
  float cover = c * (0.55 + 0.45 * smoothstep(0.05, 0.6, uv.y));
  vec3 colour = mix(sky, cloudColour, cover);

  // Rays: broad, gentle shafts fanning down from the sun, slowly shifting,
  // fading with distance and dimmed where cloud stands in front.
  float angle = atan(toSun.y, toSun.x);
  float rays = 0.5 + 0.5 * sin(angle * 9.0 + sin(angle * 3.0 + time * 0.05) * 1.5 + time * 0.03);
  rays = pow(rays, 3.0) * 0.6 + 0.5 * pow(0.5 + 0.5 * sin(angle * 23.0 - time * 0.02), 6.0) * 0.4;
  float fall = exp(-dist * 1.6) * smoothstep(0.02, 0.12, dist);
  colour += vec3(1.0, 0.97, 0.9) * rays * fall * 0.24 * (1.0 - cover * 0.75);

  // The sun itself: a bright core in a soft halo.
  colour += vec3(1.0, 0.99, 0.95) * (exp(-dist * 60.0) * 1.1 + exp(-dist * 14.0) * 0.35);

  // A whisper of grain, so the gradient never bands.
  colour += (hash(frag + time) - 0.5) / 255.0;
  gl_FragColor = vec4(colour, 1.0);
}
`

/* Where the sun sits, as a fraction of the width and of the height from the
   bottom: high on the left. */
const SUN = [0.24, 0.8]

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export default function SkyCanvas({ running }) {
  const canvasRef = useRef(null)
  const state = useRef(null)

  // Set up once: the program and a quad covering the canvas.
  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false })
    if (!gl) return undefined
    const program = gl.createProgram()
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined
    gl.useProgram(program)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const at = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(at)
    gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0)
    state.current = {
      gl,
      size: gl.getUniformLocation(program, 'size'),
      time: gl.getUniformLocation(program, 'time'),
      sun: gl.getUniformLocation(program, 'sun'),
    }
    return () => {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      state.current = null
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const s = state.current
    if (!canvas || !s) return undefined
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let frame = 0
    // The canvas's size, kept by an observer rather than read every frame:
    // reading it in the loop could make the browser lay the page out again in
    // the middle of a frame.
    const box = { w: canvas.clientWidth, h: canvas.clientHeight }
    const watcher =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(([entry]) => {
            box.w = entry.contentRect.width
            box.h = entry.contentRect.height
            if (!running || still) {
              cancelAnimationFrame(frame)
              frame = requestAnimationFrame(draw)
            }
          })
    watcher?.observe(canvas)

    const draw = (now) => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.round(box.w * scale)
      const h = Math.round(box.h * scale)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      s.gl.viewport(0, 0, w, h)
      s.gl.uniform2f(s.size, w, h)
      // Phones are tall: the sun sits a little lower so it clears the header.
      s.gl.uniform2f(s.sun, SUN[0], h > w ? SUN[1] - 0.03 : SUN[1])
      s.gl.uniform1f(s.time, still ? 0 : (now - start) / 1000 + 40)
      s.gl.drawArrays(s.gl.TRIANGLE_STRIP, 0, 4)
      if (running && !still) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      watcher?.disconnect()
    }
  }, [running])

  return <canvas ref={canvasRef} className="jungle__sky-canvas" />
}
