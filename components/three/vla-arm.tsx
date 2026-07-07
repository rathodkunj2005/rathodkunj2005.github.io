"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import { useInkPalette, useNearViewport, usePrefersReducedMotion } from "./hooks"

const L = [0.85, 0.7, 0.52] // link lengths, shoulder → wrist
const BASE_H = 0.24
const REACH = (L[0] + L[1] + L[2]) * 0.96
const TRAIL = 90
const IDLE_AFTER_MS = 3500

interface TargetState {
  pos: THREE.Vector3
  dragging: boolean
  lastTouch: number
}

/** One CCD pass over the planar 3-link chain. Angles are relative, measured
 *  from the previous link (a[0] from vertical). Returns nothing; mutates a. */
function ccdStep(a: number[], target: { x: number; y: number }) {
  const limits: Array<[number, number]> = [
    [-0.4, 1.5],
    [0.0, 2.6],
    [-0.5, 2.6],
  ]
  for (let iter = 0; iter < 4; iter++) {
    for (let j = 2; j >= 0; j--) {
      // forward kinematics
      const pts = [{ x: 0, y: 0 }]
      let th = 0
      for (let k = 0; k < 3; k++) {
        th += a[k]
        pts.push({ x: pts[k].x + L[k] * Math.sin(th), y: pts[k].y + L[k] * Math.cos(th) })
      }
      const ee = pts[3]
      const p = pts[j]
      const v1x = ee.x - p.x
      const v1y = ee.y - p.y
      const v2x = target.x - p.x
      const v2y = target.y - p.y
      const delta = Math.atan2(v1x * v2y - v1y * v2x, v1x * v2x + v1y * v2y)
      a[j] = THREE.MathUtils.clamp(a[j] - delta * 0.55, limits[j][0], limits[j][1])
    }
  }
}

function ArmScene({
  target,
  reduced,
}: {
  target: React.RefObject<TargetState>
  reduced: boolean
}) {
  const palette = useInkPalette()
  const yawGroup = useRef<THREE.Group>(null)
  const j1 = useRef<THREE.Group>(null)
  const j2 = useRef<THREE.Group>(null)
  const j3 = useRef<THREE.Group>(null)
  const tip = useRef<THREE.Object3D>(null)
  const targetMesh = useRef<THREE.Mesh>(null)
  const ringMesh = useRef<THREE.Mesh>(null)

  const angles = useRef([0.35, 0.9, 0.7])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const trailLine = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3))
    geometry.setDrawRange(0, 0)
    const material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.45 })
    return new THREE.Line(geometry, material)
  }, [])

  const guideLine = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3))
    const material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.3 })
    return new THREE.Line(geometry, material)
  }, [])

  const trailCount = useRef(0)

  useFrame((state) => {
    const t = target.current
    if (!t) return
    const τ = state.clock.elapsedTime

    // autonomous rollout when the pointer has been away for a while
    if (!t.dragging && !reduced && performance.now() - t.lastTouch > IDLE_AFTER_MS) {
      tmp.set(
        1.15 * Math.sin(τ * 0.33),
        0.85 + 0.4 * Math.sin(τ * 0.47),
        0.95 * Math.cos(τ * 0.21 + 1.3),
      )
      t.pos.lerp(tmp, 0.03)
    }

    // clamp target inside the reachable shell
    const p = t.pos
    p.y = THREE.MathUtils.clamp(p.y, 0.15, 1.7)
    const rh = Math.max(0.35, Math.hypot(p.x, p.z))
    const yaw = Math.atan2(p.z, p.x)
    let planarR = rh
    let planarH = p.y - BASE_H
    const dist = Math.hypot(planarR, planarH)
    if (dist > REACH) {
      planarR *= REACH / dist
      planarH *= REACH / dist
    }
    p.x = Math.cos(yaw) * planarR
    p.z = Math.sin(yaw) * planarR
    p.y = planarH + BASE_H

    // solve & pose
    ccdStep(angles.current, { x: planarR, y: planarH })
    if (yawGroup.current) {
      const targetYaw = -yaw
      let d = targetYaw - yawGroup.current.rotation.y
      d = Math.atan2(Math.sin(d), Math.cos(d))
      yawGroup.current.rotation.y += d * 0.18
    }
    if (j1.current) j1.current.rotation.z = -angles.current[0]
    if (j2.current) j2.current.rotation.z = -angles.current[1]
    if (j3.current) j3.current.rotation.z = -angles.current[2]

    // markers
    if (targetMesh.current) targetMesh.current.position.copy(p)
    if (ringMesh.current) ringMesh.current.position.set(p.x, 0.005, p.z)
    const guide = guideLine.geometry.getAttribute("position") as THREE.BufferAttribute
    guide.setXYZ(0, p.x, 0, p.z)
    guide.setXYZ(1, p.x, p.y, p.z)
    guide.needsUpdate = true

    // end-effector trail
    if (tip.current) {
      tip.current.getWorldPosition(tmp)
      const attr = trailLine.geometry.getAttribute("position") as THREE.BufferAttribute
      const arr = attr.array as Float32Array
      arr.copyWithin(3, 0, (TRAIL - 1) * 3)
      arr[0] = tmp.x
      arr[1] = tmp.y
      arr[2] = tmp.z
      trailCount.current = Math.min(TRAIL, trailCount.current + 1)
      trailLine.geometry.setDrawRange(0, trailCount.current)
      attr.needsUpdate = true
    }

    ;(trailLine.material as THREE.LineBasicMaterial).color.set(palette.accent)
    ;(guideLine.material as THREE.LineBasicMaterial).color.set(palette.faded)
  })

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    const t = target.current
    if (!t) return
    t.dragging = true
    t.lastTouch = performance.now()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    t.pos.x = e.point.x
    t.pos.z = e.point.z
  }
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    const t = target.current
    if (!t?.dragging) return
    t.lastTouch = performance.now()
    t.pos.x = e.point.x
    t.pos.z = e.point.z
  }
  const onUp = (e: ThreeEvent<PointerEvent>) => {
    const t = target.current
    if (!t) return
    t.dragging = false
    t.lastTouch = performance.now()
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  const ink = palette.ink
  const accent = palette.accent

  return (
    <>
      <hemisphereLight args={[palette.paper, palette.ink, 1.1]} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} />

      <gridHelper key={palette.ink} args={[5, 20]}>
        <lineBasicMaterial attach="material" color={palette.faded} transparent opacity={0.3} />
      </gridHelper>

      {/* drag surface at target height (invisible) */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={0}
        visible={false}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <planeGeometry args={[16, 16]} />
      </mesh>

      {/* arm */}
      <group ref={yawGroup}>
        <mesh position-y={BASE_H / 2}>
          <cylinderGeometry args={[0.16, 0.2, BASE_H, 24]} />
          <meshStandardMaterial color={ink} roughness={0.55} metalness={0.15} />
        </mesh>

        <group ref={j1} position-y={BASE_H}>
          <mesh>
            <sphereGeometry args={[0.085, 20, 20]} />
            <meshStandardMaterial color={accent} roughness={0.5} />
          </mesh>
          <mesh position-y={L[0] / 2}>
            <cylinderGeometry args={[0.048, 0.056, L[0], 16]} />
            <meshStandardMaterial color={ink} roughness={0.55} metalness={0.15} />
          </mesh>

          <group ref={j2} position-y={L[0]}>
            <mesh>
              <sphereGeometry args={[0.075, 20, 20]} />
              <meshStandardMaterial color={accent} roughness={0.5} />
            </mesh>
            <mesh position-y={L[1] / 2}>
              <cylinderGeometry args={[0.042, 0.048, L[1], 16]} />
              <meshStandardMaterial color={ink} roughness={0.55} metalness={0.15} />
            </mesh>

            <group ref={j3} position-y={L[1]}>
              <mesh>
                <sphereGeometry args={[0.065, 20, 20]} />
                <meshStandardMaterial color={accent} roughness={0.5} />
              </mesh>
              <mesh position-y={L[2] / 2}>
                <cylinderGeometry args={[0.034, 0.042, L[2], 16]} />
                <meshStandardMaterial color={ink} roughness={0.55} metalness={0.15} />
              </mesh>
              {/* end effector */}
              <group ref={tip} position-y={L[2]}>
                <mesh rotation-z={Math.PI}>
                  <coneGeometry args={[0.05, 0.13, 14]} />
                  <meshStandardMaterial color={accent} roughness={0.4} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* target + guides */}
      <mesh ref={targetMesh}>
        <sphereGeometry args={[0.06, 18, 18]} />
        <meshStandardMaterial color={accent} roughness={0.35} />
      </mesh>
      <mesh ref={ringMesh} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.09, 0.125, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <primitive object={guideLine} />
      <primitive object={trailLine} />
    </>
  )
}

/** Interactive VLA rollout plate — 3-DoF arm + yaw, CCD IK toward a draggable
 *  target. Wanders autonomously, hands control to the pointer on contact. */
export function VlaArm({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useNearViewport<HTMLDivElement>()
  const target = useRef<TargetState>({
    pos: new THREE.Vector3(1.0, 0.85, 0.5),
    dragging: false,
    lastTouch: 0,
  })

  return (
    <div
      ref={ref}
      className={`group relative h-[280px] md:h-full min-h-[280px] w-full border border-border bg-card/40 select-none cursor-crosshair [touch-action:pan-y] ${className}`}
    >
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-foreground/70 z-10" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-foreground/70 z-10" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-foreground/70 z-10" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-foreground/70 z-10" />

      <span className="pointer-events-none absolute top-2 right-3 z-10 font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
        π(a|s) · ccd-ik · 3-dof + yaw
      </span>
      <span className="pointer-events-none absolute bottom-2 right-3 z-10 font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
        ⊕ drag the target
      </span>

      <Canvas
        frameloop={inView ? "always" : "demand"}
        dpr={[1, 2]}
        camera={{ position: [2.7, 1.9, 3.1], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ camera }) => camera.lookAt(0, 0.6, 0)}
      >
        <ArmScene target={target} reduced={reduced} />
      </Canvas>
    </div>
  )
}
