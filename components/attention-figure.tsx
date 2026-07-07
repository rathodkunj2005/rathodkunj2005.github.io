"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

/**
 * Interactive attention-pattern plate, in the style of transformer
 * interpretability tooling. Weights are synthetic but structured: each "head"
 * implements a real, documented attention motif (previous-token, subject
 * binding, semantic recall) over the site's thesis sentence, causally masked
 * and row-normalized.
 */

const TOKENS = ["⟨s⟩", "systems", "that", "retrieve", ",", "reason", "&", "remember", "."]
const N = TOKENS.length

// deterministic per-cell jitter so patterns read as measured, not drawn
function jitter(i: number, j: number, h: number) {
  const x = Math.sin(i * 127.1 + j * 311.7 + h * 74.7) * 43758.5453
  return (x - Math.floor(x)) * 0.07
}

interface Head {
  id: string
  motif: string
  rule: (i: number, j: number) => number
}

const HEADS: Head[] = [
  {
    id: "L4.H7",
    motif: "previous-token",
    rule: (i, j) => (j === i - 1 ? 1.0 : j === 0 ? 0.22 : j === i ? 0.08 : 0.02),
  },
  {
    id: "L9.H2",
    motif: "subject binding",
    rule: (i, j) => {
      if (i >= 3 && j === 1) return 0.95 // verbs bind to "systems"
      if (j === i - 1) return 0.3
      if (j === 0) return 0.18
      return 0.03
    },
  },
  {
    id: "L11.H4",
    motif: "semantic recall",
    rule: (i, j) => {
      if (i === 7 && j === 3) return 1.0 // remember → retrieve
      if (i === 7 && j === 5) return 0.72 // remember → reason
      if (i === 5 && j === 3) return 0.65 // reason → retrieve
      if (i === 8 && (j === 3 || j === 5 || j === 7)) return 0.5 // "." summarizes
      if (j === i - 1) return 0.16
      if (j === 0) return 0.1
      return 0.02
    },
  },
]

function buildMatrix(headIdx: number): number[][] {
  const rule = HEADS[headIdx].rule
  return Array.from({ length: N }, (_, i) => {
    const row = Array.from({ length: N }, (_, j) =>
      j <= i ? rule(i, j) + jitter(i, j, headIdx) : 0,
    )
    const sum = row.reduce((a, b) => a + b, 0) || 1
    return row.map((w) => w / sum)
  })
}

// --- fixed SVG layout (mono glyphs ≈ 7.2px at fs 12) ------------------------
const CW = 7.2
const PAD = 6
const GAP = 8
const TOKEN_Y = 96
const TOKEN_H = 21
const HEAT_Y = TOKEN_Y + TOKEN_H + 8

const layout = (() => {
  let x = 10
  return TOKENS.map((t) => {
    const w = t.length * CW + PAD * 2
    const box = { x, w, cx: x + w / 2 }
    x += w + GAP
    return box
  })
})()
const WIDTH = layout[N - 1].x + layout[N - 1].w + 10
const HEIGHT = HEAT_Y + 8 + 22

export function AttentionFigure() {
  const [headIdx, setHeadIdx] = useState(2)
  const [query, setQuery] = useState(7)

  const matrix = useMemo(() => buildMatrix(headIdx), [headIdx])
  const row = matrix[query]
  const topKey = row.indexOf(Math.max(...row.slice(0, query + 1)))

  return (
    <figure>
      {/* head selector */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2 font-mono text-[10.5px]">
        <span className="text-muted-foreground uppercase tracking-[0.14em]">head</span>
        {HEADS.map((h, k) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setHeadIdx(k)}
            className={`transition-colors ${
              k === headIdx
                ? "text-accent underline underline-offset-4 decoration-accent/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {h.id}&thinsp;·&thinsp;{h.motif}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full select-none"
        role="img"
        aria-label={`Attention pattern for head ${HEADS[headIdx].id}: hover tokens to inspect weights`}
      >
        {/* attention arcs from query token to each earlier key */}
        {layout.map((key, j) => {
          if (j > query || j === query) return null
          const w = row[j]
          if (w < 0.02) return null
          const q = layout[query]
          const rise = Math.min(78, 14 + Math.abs(query - j) * 13)
          const midX = (q.cx + key.cx) / 2
          return (
            <motion.path
              key={`${headIdx}-${query}-${j}`}
              d={`M ${q.cx} ${TOKEN_Y - 3} Q ${midX} ${TOKEN_Y - 3 - rise} ${key.cx} ${TOKEN_Y - 3}`}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth={0.75 + 3.4 * w}
              strokeOpacity={0.16 + 0.84 * w}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )
        })}

        {/* tokens */}
        {TOKENS.map((t, i) => {
          const b = layout[i]
          const isQuery = i === query
          return (
            <g
              key={i}
              onMouseEnter={() => setQuery(i)}
              onClick={() => setQuery(i)}
              onFocus={() => setQuery(i)}
              tabIndex={0}
              role="button"
              aria-label={`Set query token to ${t}`}
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x={b.x}
                y={TOKEN_Y}
                width={b.w}
                height={TOKEN_H}
                fill={isQuery ? "hsl(var(--accent))" : "hsl(var(--foreground) / 0.05)"}
                stroke={isQuery ? "hsl(var(--accent))" : "hsl(var(--border))"}
                strokeWidth={0.75}
              />
              <text
                x={b.cx}
                y={TOKEN_Y + TOKEN_H / 2 + 4}
                textAnchor="middle"
                fontSize={12}
                fontFamily="var(--font-plex-mono), monospace"
                fill={isQuery ? "hsl(var(--accent-foreground))" : "hsl(var(--foreground))"}
              >
                {t}
              </text>
            </g>
          )
        })}

        {/* row heatmap: α(query → key) */}
        {layout.map((b, j) => (
          <rect
            key={`h-${j}`}
            x={b.x}
            y={HEAT_Y}
            width={b.w}
            height={7}
            fill={
              j <= query
                ? `hsl(var(--accent) / ${Math.min(1, row[j] * 1.6).toFixed(3)})`
                : "hsl(var(--foreground) / 0.04)"
            }
            stroke="hsl(var(--border) / 0.6)"
            strokeWidth={0.5}
          />
        ))}

        {/* readout */}
        <text
          x={10}
          y={HEAT_Y + 26}
          fontSize={10}
          fontFamily="var(--font-plex-mono), monospace"
          fill="hsl(var(--muted-foreground))"
        >
          α({TOKENS[query]} → {TOKENS[topKey]}) = {row[topKey].toFixed(2)} · causal mask · row-normalized
        </text>
      </svg>

      <figcaption className="font-mono text-[10.5px] text-muted-foreground mt-1 leading-relaxed">
        hover a token to set the query · arcs weight α(q→k)
      </figcaption>
    </figure>
  )
}
