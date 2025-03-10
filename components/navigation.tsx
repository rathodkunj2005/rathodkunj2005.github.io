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
      href: "mailto:edu.rathodkunj@gmail.com",
      label: "Email",
      icon: <Mail className="h-5 w-5" />,
    },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-semibold">
              KR
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-primary transition-colors",
                  pathname === route.href && "border-primary",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Button key={link.href} variant="ghost" size="icon" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors",
                  pathname === route.href ? "bg-primary/10 text-primary" : "text-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex space-x-2 px-3 py-2">
              {socialLinks.map((link) => (
                <Button key={link.href} variant="ghost" size="icon" asChild>
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

