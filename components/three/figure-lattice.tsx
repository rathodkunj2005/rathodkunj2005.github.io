"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useInkPalette, useNearViewport, usePrefersReducedMotion } from "./hooks"

const NODE_COUNT = 96
const NEIGHBORS = 2
const PULSE_COUNT = 9

const dotVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aAccent;
  attribute float aSeed;
  varying float vAccent;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float breathe = 1.0 + 0.18 * sin(uTime * 1.4 + aSeed * 6.2831);
    gl_PointSize = aSize * breathe * uPixelRatio * (18.0 / -mvPosition.z);
    vAccent = aAccent;
  }
`

const dotFragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vAccent;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float alpha = smoothstep(0.5, 0.3, r);
    vec3 color = mix(uInk, uAccent, vAccent);
    gl_FragColor = vec4(color, alpha * mix(0.85, 1.0, vAccent));
  }
`

interface LatticeData {
  nodes: Float32Array
  nodeSizes: Float32Array
  nodeAccents: Float32Array
  nodeSeeds: Float32Array
  edgePositions: Float32Array
  edges: Array<[number, number]>
}

function buildLattice(): LatticeData {
  const points: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = golden * i
    const r = 1.28 + (Math.random() - 0.5) * 0.34
    points.push(
      new THREE.Vector3(Math.cos(theta) * radiusAtY * r, y * r, Math.sin(theta) * radiusAtY * r),
    )
  }

  const edgeSet = new Set<string>()
  const edges: Array<[number, number]> = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const byDistance = points
      .map((p, j) => ({ j, d: i === j ? Infinity : p.distanceToSquared(points[i]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBORS)
    for (const { j } of byDistance) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        edges.push(i < j ? [i, j] : [j, i])
      }
    }
  }

  const nodes = new Float32Array(NODE_COUNT * 3)
  const nodeSizes = new Float32Array(NODE_COUNT)
  const nodeAccents = new Float32Array(NODE_COUNT)
  const nodeSeeds = new Float32Array(NODE_COUNT)
  points.forEach((p, i) => {
    nodes.set([p.x, p.y, p.z], i * 3)
    nodeSizes[i] = 0.9 + Math.random() * 1.3
    nodeAccents[i] = Math.random() > 0.9 ? 1 : 0
    nodeSeeds[i] = Math.random()
  })

  const edgePositions = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], i) => {
    edgePositions.set([...points[a].toArray(), ...points[b].toArray()], i * 6)
  })

  return { nodes, nodeSizes, nodeAccents, nodeSeeds, edgePositions, edges }
}

interface DragState {
  rotY: number
  rotX: number
  velY: number
  velX: number
  dragging: boolean
}

function LatticeScene({
  control,
  reduced,
}: {
  control: React.RefObject<DragState>
  reduced: boolean
}) {
  const palette = useInkPalette()
  const group = useRef<THREE.Group>(null)
  const nodeMaterial = useRef<THREE.ShaderMaterial>(null)
  const pulseGeometry = useRef<THREE.BufferGeometry>(null)
  const lineMaterial = useRef<THREE.LineBasicMaterial>(null)

  const data = useMemo(buildLattice, [])

  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * data.edges.length),
        t: Math.random(),
        speed: 0.35 + Math.random() * 0.5,
      })),
    [data],
  )
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), [])
  const pulseSizes = useMemo(() => new Float32Array(PULSE_COUNT).fill(2.4), [])
  const pulseAccents = useMemo(() => new Float32Array(PULSE_COUNT).fill(1), [])
  const pulseSeeds = useMemo(() => new Float32Array(PULSE_COUNT).map(() => Math.random()), [])

  const nodeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uInk: { value: new THREE.Color(palette.ink) },
      uAccent: { value: new THREE.Color(palette.accent) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const c = control.current
    if (group.current && c) {
      if (!c.dragging) {
        if (!reduced) c.rotY += 0.11 * dt
        c.rotY += c.velY
        c.rotX += c.velX
        c.velY *= 0.94
        c.velX *= 0.94
        c.rotX += (THREE.MathUtils.clamp(c.rotX, -0.7, 0.7) - c.rotX) * 0.12
      }
      group.current.rotation.y = c.rotY
      group.current.rotation.x = c.rotX
      if (!reduced) group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04
    }

    if (nodeMaterial.current) {
      const u = nodeMaterial.current.uniforms
      if (!reduced) u.uTime.value = state.clock.elapsedTime
      u.uPixelRatio.value = state.gl.getPixelRatio()
      u.uInk.value.set(palette.ink)
      u.uAccent.value.set(palette.accent)
    }
    if (lineMaterial.current) lineMaterial.current.color.set(palette.ink)

    if (pulseGeometry.current && !reduced) {
      for (const pulse of pulses) {
        pulse.t += pulse.speed * dt
        if (pulse.t >= 1) {
          pulse.t = 0
          pulse.edge = Math.floor(Math.random() * data.edges.length)
        }
        const [a, b] = data.edges[pulse.edge]
        const i = pulses.indexOf(pulse) * 3
        for (let axis = 0; axis < 3; axis++) {
          pulsePositions[i + axis] =
            data.nodes[a * 3 + axis] +
            (data.nodes[b * 3 + axis] - data.nodes[a * 3 + axis]) * pulse.t
        }
      }
      const attr = pulseGeometry.current.getAttribute("position") as THREE.BufferAttribute
      attr.needsUpdate = true
    }
  })

  return (
    <group ref={group} rotation={[-0.15, 0.6, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMaterial} transparent opacity={0.22} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.nodes, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[data.nodeSizes, 1]} />
          <bufferAttribute attach="attributes-aAccent" args={[data.nodeAccents, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[data.nodeSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMaterial}
          vertexShader={dotVertex}
          fragmentShader={dotFragment}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
        />
      </points>

      <points>
        <bufferGeometry ref={pulseGeometry}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[pulseSizes, 1]} />
          <bufferAttribute attach="attributes-aAccent" args={[pulseAccents, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[pulseSeeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={dotVertex}
          fragmentShader={dotFragment}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  )
}

/** Fig. 0 — drag-to-rotate memory lattice, framed like a plate in a paper. */
export function FigureLattice() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useNearViewport<HTMLDivElement>()
  const control = useRef<DragState>({ rotY: 0.6, rotX: -0.15, velY: 0, velX: 0, dragging: false })
  const last = useRef({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      className="group relative h-[300px] md:h-[360px] w-full border border-border bg-card/40 cursor-grab active:cursor-grabbing select-none [touch-action:pan-y]"
      onPointerDown={(e) => {
        control.current.dragging = true
        control.current.velY = 0
        control.current.velX = 0
        last.current = { x: e.clientX, y: e.clientY }
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!control.current.dragging) return
        const dx = e.clientX - last.current.x
        const dy = e.clientY - last.current.y
        last.current = { x: e.clientX, y: e.clientY }
        control.current.rotY += dx * 0.006
        control.current.rotX = THREE.MathUtils.clamp(control.current.rotX + dy * 0.005, -0.9, 0.9)
        control.current.velY = dx * 0.0035
        control.current.velX = dy * 0.002
      }}
      onPointerUp={(e) => {
        control.current.dragging = false
        e.currentTarget.releasePointerCapture(e.pointerId)
      }}
      onPointerCancel={() => {
        control.current.dragging = false
      }}
    >
      {/* plate crop marks */}
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-foreground/70" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-foreground/70" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-foreground/70" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-foreground/70" />

      <span className="pointer-events-none absolute top-2 right-3 font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
        n = {NODE_COUNT} · k = {NEIGHBORS}
      </span>
      <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
        ↻ drag to rotate
      </span>

      <Canvas
        frameloop={inView ? "always" : "demand"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.1], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <LatticeScene control={control} reduced={reduced} />
      </Canvas>
    </div>
  )
}
