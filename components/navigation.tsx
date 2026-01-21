"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Mail, Menu, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none",
        )}
      >
        <motion.div
          className={cn(
            "pointer-events-auto relative flex items-center p-1.5 rounded-full border bg-background/60 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 transition-all duration-500 ease-out",
            isScrolled ? "scale-90 border-white/20 backdrop-blur-2xl" : "scale-100 border-transparent bg-background/30"
          )}
          style={{ width: isScrolled ? "auto" : "100%", maxWidth: "56rem" }}
          layout
        >

          {/* Logo / Name */}
          <div className="flex-shrink-0 pl-2">
            <Magnetic>
              <Link href="/" className="block px-4 py-2 font-serif font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
                K.R.
              </Link>
            </Magnetic>
          </div>

          <div className="flex-1" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-secondary/30 rounded-full px-1.5 py-1 mx-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 z-10",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-background rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex-1" />

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2 pr-1">
            <div className="h-6 w-px bg-border/50 mx-1" />
            <Magnetic>
              <a
                href="https://github.com/rathodkunj2005"
                target="_blank"
                rel="noreferrer"
                className="block p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://linkedin.com/in/rathodkunj"
                target="_blank"
                rel="noreferrer"
                className="block p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <Button asChild size="sm" variant="ghost" className="rounded-full px-5 font-medium text-xs h-9 shadow-none transition-transform active:scale-95">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  Resume
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="sm" variant="default" className="rounded-full px-5 font-medium text-xs h-9 ml-1 shadow-none transition-transform active:scale-95">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                Contact
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed inset-x-4 top-24 z-40 md:hidden bg-background/90 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl p-4 flex flex-col gap-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-3 rounded-xl hover:bg-secondary/50 font-medium text-sm transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl hover:bg-secondary/50 font-medium text-sm transition-colors flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </motion.div>
      )}
    </>
  )
}
