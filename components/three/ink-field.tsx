"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useInkPalette, useNearViewport, usePrefersReducedMotion } from "./hooks"

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uPixelRatio;

  attribute float aSeed;
  attribute float aShade;
  attribute float aSize;

  varying float vShade;
  varying float vSeed;

  void main() {
    vec3 pos = position;

    // slow sediment drift, layered by depth
    float t = uTime;
    pos.x += sin(t * 0.22 + aSeed * 6.2831 + position.y * 0.55) * 0.34;
    pos.y += sin(t * 0.18 + aSeed * 12.566 + position.x * 0.38) * 0.26;
    pos.z += sin(t * 0.15 + aSeed * 3.1415) * 0.22;

    // cursor displaces nearby ink like a fingertip in water
    vec3 away = pos - uMouse;
    float d = length(away.xy);
    float push = smoothstep(2.2, 0.0, d);
    pos.xy += normalize(away.xy + vec2(0.0001)) * push * 0.85;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (26.0 / -mvPosition.z) * (1.0 + push * 0.8);

    vShade = aShade;
    vSeed = aSeed;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;

  varying float vShade;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.32, r);
    vec3 color = vShade > 0.93 ? uAccent : uInk;
    float depth = 0.10 + fract(vSeed * 7.31) * 0.26;
    gl_FragColor = vec4(color, alpha * depth * (vShade > 0.93 ? 1.7 : 1.0));
  }
`

function Field({ reduced }: { reduced: boolean }) {
  const palette = useInkPalette()
  const material = useRef<THREE.ShaderMaterial>(null)
  const { camera, gl } = useThree()

  const count = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 768 ? 700 : 1400),
    [],
  )

  const { positions, seeds, shades, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const shades = new Float32Array(count)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // a loose sheet of ink, denser toward a gentle diagonal wave
      const x = (Math.random() - 0.5) * 19
      const wave = Math.sin(x * 0.42) * 1.1
      const y = wave + (Math.random() - 0.5) * 6.4
      const z = (Math.random() - 0.5) * 4.5 - 0.5
      positions.set([x, y, z], i * 3)
      seeds[i] = Math.random()
      shades[i] = Math.random()
      sizes[i] = 0.6 + Math.pow(Math.random(), 2.2) * 1.9
    }
    return { positions, seeds, shades, sizes }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 8.0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uPixelRatio: { value: 1 },
      uInk: { value: new THREE.Color(palette.ink) },
      uAccent: { value: new THREE.Color(palette.accent) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const target = useRef(new THREE.Vector3(999, 999, 0))

  useFrame((state, delta) => {
    if (!material.current) return
    const u = material.current.uniforms
    u.uPixelRatio.value = state.gl.getPixelRatio()
    u.uInk.value.set(palette.ink)
    u.uAccent.value.set(palette.accent)
    if (!reduced) {
      u.uTime.value += Math.min(delta, 0.05)
      u.uMouse.value.lerp(target.current, 0.08)
    }
  })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      if (e.clientY < rect.top - 80 || e.clientY > rect.bottom + 80) return
      const ndc = new THREE.Vector3(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
        0.5,
      ).unproject(camera)
      const dir = ndc.sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      target.current.copy(camera.position).addScaledVector(dir, dist)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [camera, gl])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aShade" args={[shades, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

/** Full-bleed ink-particle field behind the masthead. Pointer-transparent. */
export function InkField({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useNearViewport<HTMLDivElement>()

  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        frameloop={inView && !reduced ? "always" : "demand"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Field reduced={reduced} />
      </Canvas>
    </div>
  )
}
