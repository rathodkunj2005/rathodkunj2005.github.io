"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * Shared kernel state — execution counts are global and monotonic across every
 * cell on the page, exactly like a real Jupyter kernel. Cells announce runs via
 * a `nb:kernel` window event so the navigation chrome can flash "busy".
 */
let kernelExecCount = 0

export function announceKernel(state: "busy" | "idle") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nb:kernel", { detail: state }))
  }
}

type CellStatus = "queued" | "busy" | "done"

interface NotebookCellProps {
  /** Rendered source line(s) — mono styling applied by the cell. */
  source: React.ReactNode
  /** Cell output, revealed after execution. */
  children: React.ReactNode
  /** Auto-execute once the cell scrolls near the viewport. */
  autoRun?: boolean
  /** Simulated kernel latency in ms. */
  latency?: number
  className?: string
}

export function NotebookCell({
  source,
  children,
  autoRun = true,
  latency = 650,
  className = "",
}: NotebookCellProps) {
  const [status, setStatus] = useState<CellStatus>("queued")
  const [execN, setExecN] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const run = useCallback(() => {
    clearTimeout(timer.current)
    setStatus("busy")
    announceKernel("busy")
    timer.current = setTimeout(() => {
      kernelExecCount += 1
      setExecN(kernelExecCount)
      setStatus("done")
      announceKernel("idle")
    }, latency)
  }, [latency])

  useEffect(() => {
    if (!autoRun || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { rootMargin: "-15% 0px" },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [autoRun, run])

  useEffect(() => () => clearTimeout(timer.current), [])

  const gutterLabel =
    status === "busy" ? "In [✱]" : execN !== null ? `In [${execN}]` : "In [ ]"

  return (
    <div ref={ref} className={`border border-border bg-card/40 ${className}`}>
      {/* Input row */}
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={run}
          title={execN !== null ? "Re-run cell" : "Run cell"}
          aria-label={execN !== null ? "Re-run cell" : "Run cell"}
          className="group/run w-[72px] md:w-[84px] shrink-0 flex flex-col items-end gap-1 pt-3 pr-3 pb-3 font-mono text-[11px] text-muted-foreground hover:text-accent transition-colors border-r border-border/60"
        >
          <span className={status === "busy" ? "caret-blink text-accent" : ""}>{gutterLabel}</span>
          <span className="text-[13px] leading-none opacity-40 group-hover/run:opacity-100 group-hover/run:text-accent transition-opacity">
            {status === "busy" ? "◼" : "▶"}
          </span>
        </button>
        <pre className="nb-source flex-1 min-w-0 overflow-x-auto px-4 py-3 font-mono text-[12px] md:text-[12.5px] leading-relaxed whitespace-pre-wrap">
          {source}
        </pre>
      </div>

      {/* Output row */}
      <AnimatePresence initial={false}>
        {status === "done" && (
          <motion.div
            key={execN}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-stretch border-t border-border/60"
          >
            <div className="w-[72px] md:w-[84px] shrink-0 pt-3 pr-3 text-right font-mono text-[11px] text-accent">
              Out[{execN}]
            </div>
            <div className="flex-1 min-w-0 px-4 py-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
