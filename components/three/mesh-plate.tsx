"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useInkPalette, useNearViewport, usePrefersReducedMotion } from "./hooks"

interface DragState {
  rotY: number
  rotX: number
  velY: number
  velX: number
  dragging: boolean
}

function KnotScene({
  control,
  reduced,
}: {
  control: React.RefObject<DragState>
  reduced: boolean
}) {
  const palette = useInkPalette()
  const group = useRef<THREE.Group>(null)
  const wire = useRef<THREE.LineBasicMaterial>(null)
  const dots = useRef<THREE.PointsMaterial>(null)

  const { wireframe, points } = useMemo(() => {
    const geometry = new THREE.TorusKnotGeometry(1, 0.32, 110, 14, 2, 3)
    const wireframe = new THREE.WireframeGeometry(geometry)
    // sparse accent vertices sampled from the surface
    const src = geometry.getAttribute("position")
    const sampled: number[] = []
    for (let i = 0; i < src.count; i += 23) {
      sampled.push(src.getX(i), src.getY(i), src.getZ(i))
    }
    const points = new THREE.BufferGeometry()
    points.setAttribute("position", new THREE.Float32BufferAttribute(sampled, 3))
    geometry.dispose()
    return { wireframe, points }
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const c = control.current
    if (group.current && c) {
      if (!c.dragging) {
        if (!reduced) {
          c.rotY += 0.14 * dt
          c.rotX = Math.sin(state.clock.elapsedTime * 0.2) * 0.18
        }
        c.rotY += c.velY
        c.velY *= 0.94
      }
      group.current.rotation.y = c.rotY
      group.current.rotation.x = c.rotX
    }
    if (wire.current) wire.current.color.set(palette.ink)
    if (dots.current) dots.current.color.set(palette.accent)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={wireframe}>
        <lineBasicMaterial ref={wire} transparent opacity={0.34} />
      </lineSegments>
      <points geometry={points}>
        <pointsMaterial ref={dots} size={0.045} transparent opacity={0.95} />
      </points>
    </group>
  )
}

/** Plate A — drag-to-rotate wireframe manifold, typeset like a printed figure. */
export function MeshPlate({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useNearViewport<HTMLDivElement>()
  const control = useRef<DragState>({ rotY: 0.5, rotX: 0.1, velY: 0, velX: 0, dragging: false })
  const last = useRef({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      className={`group relative h-[240px] md:h-[280px] w-full border border-border bg-card/40 cursor-grab active:cursor-grabbing select-none [touch-action:pan-y] ${className}`}
      onPointerDown={(e) => {
        control.current.dragging = true
        control.current.velY = 0
        last.current = { x: e.clientX, y: e.clientY }
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!control.current.dragging) return
        const dx = e.clientX - last.current.x
        const dy = e.clientY - last.current.y
        last.current = { x: e.clientX, y: e.clientY }
        control.current.rotY += dx * 0.007
        control.current.rotX = THREE.MathUtils.clamp(control.current.rotX + dy * 0.005, -1.1, 1.1)
        control.current.velY = dx * 0.003
      }}
      onPointerUp={(e) => {
        control.current.dragging = false
        e.currentTarget.releasePointerCapture(e.pointerId)
      }}
      onPointerCancel={() => {
        control.current.dragging = false
      }}
    >
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-foreground/70" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-foreground/70" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-foreground/70" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-foreground/70" />

      <span className="pointer-events-none absolute top-2 right-3 font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
        T(2,3) · torus knot
      </span>
      <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
        ↻ drag to rotate
      </span>

      <Canvas
        frameloop={inView ? "always" : "demand"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <KnotScene control={control} reduced={reduced} />
      </Canvas>
    </div>
  )
}
