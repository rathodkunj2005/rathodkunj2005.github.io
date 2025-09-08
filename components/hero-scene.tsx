"use client"

import { useEffect, useState } from "react"

export function HeroScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent dark:via-white/5 animate-pulse-slow"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glassy geometric shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" style={{ animationDuration: "4s" }}></div>
          
          {/* Middle rings */}
          <div className="absolute inset-8 rounded-full border border-blue-400/30 animate-ping" style={{ animationDuration: "3s" }}></div>
          <div className="absolute inset-16 rounded-full border border-blue-300/40 animate-ping" style={{ animationDuration: "2s" }}></div>
          
          {/* Inner glassy core */}
          <div className="absolute inset-24 glass rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse-slow"></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-8 left-8 w-4 h-4 glass rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-16 right-12 w-3 h-3 glass rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-12 left-16 w-5 h-5 glass rounded-full animate-float" style={{ animationDelay: "3s" }}></div>
          <div className="absolute bottom-8 right-8 w-3 h-3 glass rounded-full animate-float" style={{ animationDelay: "4s" }}></div>
        </div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  )
}

