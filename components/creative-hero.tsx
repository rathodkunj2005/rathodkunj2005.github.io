"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Grid, Line, Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

let pretextModule: any = null

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="flex flex-col items-start gap-0.5"
    >
      <span className="text-2xl md:text-3xl font-serif font-medium text-foreground">
        {value}
      </span>
      <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  )
}

function ActivationNode({ pos, color }: { pos: [number, number, number], color: string }) {
   return (
      <Sphere args={[0.15, 16, 16]} position={pos}>
         <meshBasicMaterial color={color} transparent opacity={0.8} />
      </Sphere>
   )
}

function TransformerBlock({ mouseX, mouseY, containerRef }: { mouseX: any; mouseY: any; containerRef: any }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    
    // Smooth conversion to 3D normalized device coordinates for parallax
    const targetX = (mouseX.get() / rect.width) * 2 - 1
    const targetY = -(mouseY.get() / rect.height) * 2 + 1
    
    // Lerp to position for smooth parallax
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX * 1 + 2, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY * 1, 0.05)
    
    // Subtle breathing rotation
    groupRef.current.rotation.y = -Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + targetX * 0.2
    groupRef.current.rotation.x = Math.PI / 8 + Math.cos(state.clock.elapsedTime * 0.3) * 0.05 - targetY * 0.2
  })

  // Data flow paths
  const p1: [number,number,number][] = [[-1, -1.5, 1], [0, 0, 0], [1.5, 1.5, 1]]
  const p2: [number,number,number][] = [[1, -1.5, -1], [-1.5, 0, -1.5], [-0.5, 1.5, -0.5]]
  const p3: [number,number,number][] = [[0, -1.5, 0], [1, 0, 1], [-1, 1.5, 0]]

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        
        {/* Layer 1: Residual Stream */}
        <group position={[0, -1.5, 0]}>
          <Grid args={[5, 5]} cellSize={0.5} cellThickness={1} cellColor="#3b82f6" sectionColor="#1d4ed8" fadeDistance={6} fadeStrength={1} />
          <ActivationNode pos={[-1, 0, 1]} color="#60a5fa" />
          <ActivationNode pos={[1, 0, -1]} color="#60a5fa" />
          <ActivationNode pos={[0, 0, 0]} color="#60a5fa" />
        </group>

        {/* Layer 2: Attention Heads */}
        <group position={[0, 0, 0]}>
          <Grid args={[5, 5]} cellSize={0.5} cellThickness={1} cellColor="#8b5cf6" sectionColor="#6d28d9" fadeDistance={6} fadeStrength={1} />
          <ActivationNode pos={[0, 0, 0]} color="#a78bfa" />
          <ActivationNode pos={[-1.5, 0, -1.5]} color="#a78bfa" />
          <ActivationNode pos={[1, 0, 1]} color="#a78bfa" />
        </group>

        {/* Layer 3: MLP Projections */}
        <group position={[0, 1.5, 0]}>
          <Grid args={[5, 5]} cellSize={0.5} cellThickness={1} cellColor="#ec4899" sectionColor="#be185d" fadeDistance={6} fadeStrength={1} />
          <ActivationNode pos={[1.5, 0, 1]} color="#f472b6" />
          <ActivationNode pos={[-0.5, 0, -0.5]} color="#f472b6" />
          <ActivationNode pos={[-1, 0, 0]} color="#f472b6" />
        </group>

        {/* Attention Beams (Inter-layer routing) */}
        <Line points={p1} color="#ffffff" lineWidth={2} transparent opacity={0.6} />
        <Line points={p2} color="#ffffff" lineWidth={1.5} transparent opacity={0.4} />
        <Line points={p3} color="#ffffff" lineWidth={2.5} transparent opacity={0.7} />
      </group>
    </Float>
  )
}

function KahlertPrizeBadge() {
   const [isHovered, setIsHovered] = useState(false)
   const [lines, setLines] = useState<any[]>([])
   const [calcHeight, setCalcHeight] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)

   const popupText = "Kahlert School of Computing, University of Utah; $1,000 undergraduate scholarship awarded for societal impact through AI research and production systems in healthcare, legal-tech, and embodied AI, Mar 2026. Funded by a $15M endowment; recognizes students with a compelling track record of translating computing research into real-world societal benefit."

   // Measure layout efficiently with pretext on hover
   useEffect(() => {
      if (!isHovered || !pretextModule || lines.length > 0) return
      
      const prepared = pretextModule.prepareWithSegments(popupText, "500 13px ui-sans-serif, system-ui, sans-serif")
      // Calculate exact lines for a broader bounding box
      const layoutData = pretextModule.layoutWithLines(prepared, 360, 22)
      
      setLines(layoutData.lines)
      setCalcHeight(layoutData.height)
   }, [isHovered, lines.length])

   return (
      <div 
         className="relative inline-flex items-center" 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}
      >
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-xs font-mono text-yellow-600 dark:text-yellow-400 backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:bg-yellow-500/20 hover:border-yellow-500/60 transition-all"
         >
           🏆 Kahlert Impact Prize Recipient
         </motion.div>

         <AnimatePresence>
            {isHovered && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute top-10 left-0 w-[400px] z-[100] rounded-xl border border-yellow-500/30 bg-background/90 backdrop-blur-2xl p-5 shadow-[0_10px_40px_-10px_rgba(234,179,8,0.2)] overflow-hidden"
                  style={{ height: calcHeight > 0 ? calcHeight + 40 : 'auto', cursor: 'default' }}
               >
                  <div className="relative w-full h-full text-[13px] font-sans text-muted-foreground/90 leading-relaxed font-medium">
                     {lines.length > 0 ? lines.map((l, i) => (
                        <div 
                           key={i} 
                           className="absolute left-0" 
                           style={{ top: i * 22 }}
                        >
                           {l.text}
                        </div>
                     )) : (
                        <div className="flex flex-col space-y-3 w-full">
                          <div className="h-3 bg-yellow-500/20 rounded w-full animate-pulse"></div>
                          <div className="h-3 bg-yellow-500/20 rounded w-5/6 animate-pulse"></div>
                          <div className="h-3 bg-yellow-500/20 rounded w-4/6 animate-pulse"></div>
                        </div>
                     )}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}


export function CreativeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<any[]>([])
  const [prepared, setPrepared] = useState<any>(null)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useSpring(0, { stiffness: 400, damping: 30 })
  const mouseY = useSpring(0, { stiffness: 400, damping: 30 })

  const textToWrap = "CS Researcher & AI Engineer at the University of Utah. Building AI systems from HIPAA-compliant hospital platforms to spatial memory for embodied agents and materials discovery pipelines."

  useEffect(() => {
    let active = true
    import("@chenglou/pretext").then((m) => {
      if (!active) return
      pretextModule = m
      const prep = m.prepareWithSegments(textToWrap, "400 20px ui-sans-serif, system-ui, sans-serif")
      setPrepared(prep)
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!prepared || !containerRef.current || !pretextModule) return

    let animationFrameId: number;

    const renderLayout = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerW = rect.width
      
      const rightBoundLimit = containerW * 0.5; // push text into the left half
      const isometricFactor = Math.sin(Date.now() / 2000) * 20; // undulating edge
      
      let cursor = { segmentIndex: 0, graphemeIndex: 0 }
      let currentLines = []
      let y = 0
      const lineHeight = 32

      while (true) {
        let w = rightBoundLimit + (y * 0.4) + isometricFactor
        w = Math.max(200, Math.min(containerW, w))

        const line = pretextModule.layoutNextLine(prepared, cursor, w)
        if (!line) break
        
        currentLines.push({ text: line.text, y, width: line.width })
        cursor = line.end
        y += lineHeight
      }
      
      setLines(currentLines)
      animationFrameId = requestAnimationFrame(renderLayout)
    }

    renderLayout()
    return () => cancelAnimationFrame(animationFrameId)
    
  }, [prepared])

  useEffect(() => {
    if (wrapperRef.current) {
       const rect = wrapperRef.current.getBoundingClientRect()
       mouseX.set(rect.width * 0.5)
       mouseY.set(rect.height * 0.5)
    }
  }, [mouseX, mouseY])

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
    setIsHovering(true)
  }

  const handlePointerLeave = () => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    mouseX.set(rect.width * 0.5)
    mouseY.set(rect.height * 0.5)
    setIsHovering(false)
  }

  return (
    <div 
      className="relative z-10 w-full min-h-[85vh] flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      {/* HUD Layer 1: Transformer Block (R3F) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} />
          <TransformerBlock mouseX={mouseX} mouseY={mouseY} containerRef={wrapperRef} />
        </Canvas>
      </div>

      <div 
        ref={wrapperRef}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start pt-12"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center rounded-full border border-primary/20 bg-secondary/30 px-3 py-1.5 text-xs font-mono text-primary backdrop-blur-sm shadow-sm"
            >
               <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
               Incoming Software Engineer @ Microsoft Azure Data · Jan 2026
            </motion.div>
            
            {/* Newly added pretext HUD component */}
            <KahlertPrizeBadge />
         </div>

        <motion.h1
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-foreground mb-12 text-left"
           style={{ textShadow: '0 2px 20px rgba(0,0,0,0.1)' }}
        >
           Kunj Rathod
        </motion.h1>

        {/* Liquid Typography Engine via @chenglou/pretext */}
        <div 
          ref={containerRef}
          className="relative w-full h-[180px] md:h-[150px] mb-12 pointer-events-none"
        >
          {lines.length === 0 ? (
            <p className="text-xl text-muted-foreground font-sans max-w-2xl opacity-50">
              {textToWrap}
            </p>
          ) : (
            <div className="w-full h-full relative" style={{ contain: 'layout paint', willChange: 'contents' }}>
              {lines.map((l, i) => (
                <div 
                  key={i} 
                  className="absolute left-0 text-xl font-sans text-foreground/80 font-medium tracking-wide whitespace-nowrap" 
                  style={{ 
                    top: l.y, 
                    transition: 'top 0.4s ease-out',
                    textShadow: '0 4px 24px var(--background)'
                  }}
                >
                  {l.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-8 md:gap-12 mb-12 z-20 pointer-events-auto backdrop-blur-md bg-background/20 p-4 rounded-xl border border-white/5 shadow-xl">
          <StatCounter value="10M+" label="Docs Indexed" />
          <div className="h-8 w-px bg-border/50" />
          <StatCounter value="40%" label="Latency Reduced" />
          <div className="h-8 w-px bg-border/50" />
          <StatCounter value="1M+" label="Entities Managed" />
        </div>

        <div className="flex flex-wrap items-center gap-4 z-20 pointer-events-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#experience">Explore Work</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-background/80">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8 h-12 text-sm font-medium hover:bg-background/60">
                <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
