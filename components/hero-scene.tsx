"use client"

import { useEffect, useState } from "react"

export function HeroScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Simple animated circles instead of 3D */}
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-500/50 animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute inset-4 rounded-full border-2 border-blue-400/50 animate-ping"
            style={{ animationDuration: "2.5s" }}
          ></div>
          <div
            className="absolute inset-8 rounded-full border-2 border-blue-300/50 animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
          <div
            className="absolute inset-12 rounded-full border-2 border-blue-200/50 animate-ping"
            style={{ animationDuration: "1.5s" }}
          ></div>
          <div className="absolute inset-16 rounded-full bg-blue-500/20"></div>
        </div>
      </div>
    </div>
  )
}

