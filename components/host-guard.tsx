"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, ExternalLink } from "lucide-react"

export const CANONICAL_ORIGIN = "https://www.kunjrathod.com"

const ALLOWED_HOSTS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "rathodkunj2005.github.io",
  "kunjrathod.com",
]

// Vercel gives every deployment of this project its own hostname, and the
// generated names are not predictable (kunjrathod.vercel.app,
// portfolio-<hash>-rathodkunj2005s-projects.vercel.app,
// portfolio-updated-seven-beryl.vercel.app, per-branch previews, ...).
// Hardcoding them is how this guard ended up firing on our own deployments:
// the Vercel dashboard thumbnail executes JS before screenshotting, so the
// project card rendered the mirror banner, and real visitors on a preview URL
// were redirected away after the countdown.
//
// NEXT_PUBLIC_SITE_HOSTS lets a deployment declare extra hosts (comma
// separated) without a code change.
const ALLOWED_HOST_PATTERNS = [
  // Deployments under our own Vercel account scope.
  /(^|[.-])rathodkunj2005s-projects\.vercel\.app$/,
  // Our own Vercel project names, plus any generated suffix Vercel appends.
  /^(kunjrathod|portfolio|portfolio-updated)(-[a-z0-9-]+)?\.vercel\.app$/,
]

const ENV_ALLOWED_HOSTS = (process.env.NEXT_PUBLIC_SITE_HOSTS ?? "")
  .split(",")
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean)

/**
 * Normalize a hostname before matching: lowercase, drop any port, drop the
 * FQDN trailing dot, and drop a leading "www." so that www.<host> is treated
 * as the same host as <host>.
 */
function normalizeHost(hostname: string): string {
  return hostname
    .toLowerCase()
    .split(":")[0]
    .replace(/\.$/, "")
    .replace(/^www\./, "")
}

export function isAllowedHost(hostname: string): boolean {
  const host = normalizeHost(hostname)

  if (ENV_ALLOWED_HOSTS.some((allowed) => host === normalizeHost(allowed))) {
    return true
  }
  if (ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) {
    return true
  }
  return ALLOWED_HOST_PATTERNS.some((pattern) => pattern.test(host))
}

export function HostGuard() {
  const [isUnauthorized, setIsUnauthorized] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isAllowedHost(window.location.hostname)) {
        setIsUnauthorized(true)
        console.warn(
          "%c⚠️ UNAUTHORIZED MIRROR DETECTED ⚠️\nThis website is an unauthorized clone/mirror of Kunj Rathod's portfolio. All rights reserved by the original author.",
          "color: #b91c1c; font-size: 14px; font-weight: bold; font-family: monospace;"
        )
      }
    }
  }, [])

  // Lock scroll when unauthorized
  useEffect(() => {
    if (isUnauthorized) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [isUnauthorized])

  // Handle countdown and redirect
  useEffect(() => {
    if (!isUnauthorized) return

    if (countdown <= 0) {
      window.location.replace(`${CANONICAL_ORIGIN}/`)
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isUnauthorized, countdown])

  if (!isUnauthorized) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
      >
        <div className="relative max-w-lg w-full p-8 border border-border bg-card text-foreground shadow-2xl text-center">
          {/* Oxblood top bar matching the preprint theme */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent" />
          
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-full">
              <ShieldAlert className="h-8 w-8 text-accent animate-pulse" />
            </div>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-accent mb-3">
            Unauthorized Mirror Detected
          </h2>
          
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
            § Security Enforcement
          </p>

          <div className="font-sans text-sm space-y-4 mb-8 text-left leading-relaxed">
            <p>
              This website is an unauthorized clone or mirror of <strong>Kunj Rathod's</strong> portfolio. The code, custom typography layouts, interactive visual elements, and projects displayed here belong entirely to the original author.
            </p>
            <p>
              Copying or distributing this portfolio without authorization violates intellectual property laws.
            </p>
          </div>

          <div className="rule-double pt-6 mb-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-wider uppercase text-muted-foreground">
              <span className="flex items-center gap-1.5">
                Redirecting in <span className="text-accent font-bold tabular-nums text-sm normal-case">{countdown}s</span>
              </span>
              <a
                href={`${CANONICAL_ORIGIN}/`}
                className="ref-link inline-flex items-center gap-1.5 font-bold"
              >
                Go to original site <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
