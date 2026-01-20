"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function HeroScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Base Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Animated Blueprint Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M0 100 H 1000"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M100 0 V 1000"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="150"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 0.5 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
      </svg>

      {/* Radial Gradient overlay for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_70%)]" />
    </div>
  )
}
