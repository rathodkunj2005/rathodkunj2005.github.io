"use client"

import { useEffect, useRef, useState } from "react"

export interface InkPalette {
  ink: string
  accent: string
  paper: string
  faded: string
}

function readVar(styles: CSSStyleDeclaration, name: string): string {
  const [h, s, l] = styles.getPropertyValue(name).trim().split(/\s+/)
  return `hsl(${h}, ${s}, ${l})`
}

/** Reads the site's paper-and-ink CSS variables so WebGL stays theme-aware. */
export function useInkPalette(): InkPalette {
  const [palette, setPalette] = useState<InkPalette>({
    ink: "hsl(30, 14%, 10%)",
    accent: "hsl(11, 72%, 33%)",
    paper: "hsl(41, 38%, 93%)",
    faded: "hsl(30, 7%, 36%)",
  })

  useEffect(() => {
    const read = () => {
      const styles = getComputedStyle(document.documentElement)
      setPalette({
        ink: readVar(styles, "--foreground"),
        accent: readVar(styles, "--accent"),
        paper: readVar(styles, "--background"),
        faded: readVar(styles, "--muted-foreground"),
      })
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return palette
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return reduced
}

/** True while the observed element is near the viewport — used to pause frameloops. */
export function useNearViewport<T extends HTMLElement>(margin = "160px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: margin,
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [margin])
  return { ref, inView }
}
