"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes: { href: string; label: string }[] = [
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ]

  const socialLinks: { href: string; label: string; icon: React.ReactNode }[] = [
    {
      href: "https://github.com/rathodkunj2005",
      label: "GitHub",
      icon: <Github className="h-5 w-5" />,
    },
    {
      href: "https://www.linkedin.com/in/rathodkunj/",
      label: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      href: "mailto:kunj.rathod@utah.edu",
      label: "Email",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold gradient-text hover:scale-105 transition-transform">
              Kunj Rathod
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105",
                  pathname === route.href 
                    ? "glass-nav text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {socialLinks.map((link) => (
              <Button 
                key={link.href} 
                variant="ghost" 
                size="icon" 
                asChild
                className="glass-nav hover:scale-110 transition-all duration-300"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-nav hover:scale-110 transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 glass-nav border-b border-white/10">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105",
                  pathname === route.href 
                    ? "glass-nav text-primary" 
                    : "text-foreground hover:text-primary hover:bg-white/5",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex space-x-3 px-3 py-2">
              {socialLinks.map((link) => (
                <Button 
                  key={link.href} 
                  variant="ghost" 
                  size="icon" 
                  asChild
                  className="glass-nav hover:scale-110 transition-all duration-300"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

