"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { num: "01", name: "Experience", href: "#experience" },
  { num: "02", name: "Selected Work", href: "#projects" },
  { num: "03", name: "Writing", href: "#writing" },
  { num: "A", name: "Skills", href: "#skills" },
  { num: "✉", name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-background/95 backdrop-blur-[2px]">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="inline-block h-2.5 w-2.5 bg-accent translate-y-px group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-serif text-lg tracking-tight">
              K.&thinsp;Rathod
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground tracking-[0.18em] uppercase translate-y-[-1px]">
              · Collected Works, 2024–26
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group font-mono text-[11px] tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-accent/70 group-hover:text-accent">{item.num}</span>
                <span className="ml-1.5">{item.name}</span>
              </Link>
            ))}
            <a
              href="/CV_Kunj_Rathod_April26.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-wide px-3 py-1.5 border border-foreground/80 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              CV ↗
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Hairline + reading progress */}
      <div className="relative h-px bg-border">
        <motion.div
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className="absolute inset-0 bg-accent"
        />
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-5 py-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline gap-3 py-3 border-b border-border/50 last:border-0 font-mono text-sm"
              >
                <span className="text-accent text-xs w-5">{item.num}</span>
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 pt-4">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="ref-link font-mono text-sm">Resume ↗</a>
              <a href="/CV_Kunj_Rathod_April26.pdf" target="_blank" rel="noopener noreferrer" className="ref-link font-mono text-sm">CV ↗</a>
            </div>
          </div>
        </motion.nav>
      )}
    </header>
  )
}

export { Navigation as Navigations }
