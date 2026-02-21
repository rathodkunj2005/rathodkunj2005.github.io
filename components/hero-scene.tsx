"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const rings = [
  { r: 80, duration: 30, reverse: false, dasharray: "4 6", opacity: 0.25 },
  { r: 140, duration: 45, reverse: true, dasharray: "2 10", opacity: 0.18 },
  { r: 210, duration: 60, reverse: false, dasharray: "1 14", opacity: 0.12 },
  { r: 300, duration: 90, reverse: true, dasharray: "3 20", opacity: 0.08 },
]

const floatingDots = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${(i * 38.7) % 100}%`,
  y: `${(i * 61.3) % 100}%`,
  delay: i * 0.4,
  size: i % 3 === 0 ? 2.5 : 1.5,
}))

export function HeroScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:28px_28px]" />

      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        {/* Concentric orbital rings */}
        {rings.map((ring, i) => (
          <motion.circle
            key={i}
            cx="50%"
            cy="50%"
            r={ring.r}
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray={ring.dasharray}
            fill="none"
            style={{ opacity: ring.opacity }}
            animate={{ rotate: ring.reverse ? -360 : 360 }}
            transition={{ duration: ring.duration, ease: "linear", repeat: Infinity }}
          />
        ))}

        {/* Axis cross lines - animated draw-in */}
        <motion.line
          x1="0%" y1="50%" x2="100%" y2="50%"
          stroke="currentColor" strokeWidth="0.5" opacity="0.08"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.08 }}
          transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.line
          x1="50%" y1="0%" x2="50%" y2="100%"
          stroke="currentColor" strokeWidth="0.5" opacity="0.08"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.08 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Corner bracket accents */}
        <motion.path
          d="M 0 40 L 0 0 L 40 0"
          stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
        <motion.path
          d="M calc(100% - 40px) 0 L 100% 0 L 100% 40px"
          stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
        />
        <motion.path
          d="M 0 calc(100% - 40px) L 0 100% L 40px 100%"
          stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
        />
        <motion.path
          d="M calc(100% - 40px) 100% L 100% 100% L 100% calc(100% - 40px)"
          stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.1 }}
        />

        {/* Floating ambient dots */}
        {floatingDots.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r={dot.size}
            fill="currentColor"
            style={{ opacity: 0.12 }}
            animate={{ y: [0, -8, 0], opacity: [0.08, 0.18, 0.08] }}
            transition={{
              duration: 4 + (dot.id % 3),
              delay: dot.delay,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </svg>

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_75%)]" />
    </div>
  )
}
