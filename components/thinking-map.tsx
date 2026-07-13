"use client"

import { useState } from "react"
import Link from "next/link"

/**
 * End paper — "Still thinking."
 * A constellation of the open questions behind the work above. Hovering a
 * question inks its cluster; everything is a link back into the artifact.
 */

type TileKind = "word" | "dots" | "grid" | "wave"

type Tile = {
  cluster: string
  x: number // % of map width
  y: number // % of map height
  size: number // px
  kind: TileKind
  word?: string
  tone: 1 | 2 | 3 | 4 | 5
}

type Cluster = {
  id: string
  x: number
  y: number
  q: string
  blurb: string
  href: string
}

const CLUSTERS: Cluster[] = [
  {
    id: "memory",
    x: 26,
    y: 28,
    q: "What should a model remember?",
    blurb: "Long-horizon agents, episodic memory, and what's worth keeping.",
    href: "/portfolio#projects",
  },
  {
    id: "weights",
    x: 69,
    y: 22,
    q: "What's going on in there?",
    blurb: "Tracing attention heads and circuits inside open models.",
    href: "/portfolio#writing",
  },
  {
    id: "cite",
    x: 24,
    y: 72,
    q: "Can you cite that?",
    blurb: "Grounded retrieval for medicine and law, where wrong answers cost.",
    href: "/blog/biographrag",
  },
  {
    id: "prod",
    x: 71,
    y: 68,
    q: "Does it survive production?",
    blurb: "Deploys, monitors, rollbacks — agents that actually ship.",
    href: "/portfolio#experience",
  },
]

const TILES: Tile[] = [
  // memory
  { cluster: "memory", x: 13, y: 15, size: 46, kind: "word", word: "MEM", tone: 4 },
  { cluster: "memory", x: 39, y: 12, size: 34, kind: "dots", tone: 2 },
  { cluster: "memory", x: 10, y: 41, size: 36, kind: "grid", tone: 3 },
  { cluster: "memory", x: 36, y: 43, size: 42, kind: "word", word: "KV", tone: 1 },
  // weights
  { cluster: "weights", x: 56, y: 9, size: 40, kind: "word", word: "ATTN", tone: 1 },
  { cluster: "weights", x: 84, y: 12, size: 34, kind: "wave", tone: 4 },
  { cluster: "weights", x: 58, y: 34, size: 34, kind: "dots", tone: 5 },
  { cluster: "weights", x: 85, y: 33, size: 44, kind: "word", word: "HEAD", tone: 3 },
  // cite
  { cluster: "cite", x: 9, y: 60, size: 44, kind: "word", word: "CITE", tone: 2 },
  { cluster: "cite", x: 36, y: 58, size: 34, kind: "grid", tone: 4 },
  { cluster: "cite", x: 13, y: 88, size: 40, kind: "word", word: "RAG", tone: 1 },
  { cluster: "cite", x: 38, y: 86, size: 32, kind: "dots", tone: 3 },
  // prod
  { cluster: "prod", x: 57, y: 55, size: 34, kind: "wave", tone: 2 },
  { cluster: "prod", x: 86, y: 53, size: 44, kind: "word", word: "SHIP", tone: 5 },
  { cluster: "prod", x: 59, y: 87, size: 42, kind: "word", word: "EVAL", tone: 3 },
  { cluster: "prod", x: 86, y: 84, size: 34, kind: "grid", tone: 1 },
]

const TONE_BG = [
  "hsl(var(--chart-1) / 0.10)",
  "hsl(var(--chart-2) / 0.16)",
  "hsl(var(--chart-3) / 0.16)",
  "hsl(var(--chart-4) / 0.14)",
  "hsl(var(--chart-5) / 0.16)",
]

function TileArt({ tile }: { tile: Tile }) {
  const fg = "hsl(var(--foreground) / 0.55)"
  if (tile.kind === "word" && tile.word) {
    const reps = Array.from({ length: 8 }, () => tile.word!.concat(" ").repeat(6))
    return (
      <div
        className="w-full h-full overflow-hidden font-mono leading-[1.35] select-none"
        style={{
          fontSize: "6px",
          letterSpacing: "0.06em",
          color: fg,
          WebkitMaskImage: "linear-gradient(135deg, #000 30%, transparent 85%)",
          maskImage: "linear-gradient(135deg, #000 30%, transparent 85%)",
        }}
      >
        {reps.map((line, i) => (
          <div key={i} style={{ marginLeft: i % 3 === 1 ? "-4px" : 0 }}>
            {line}
          </div>
        ))}
      </div>
    )
  }
  if (tile.kind === "dots") {
    return (
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `radial-gradient(${fg} 0.8px, transparent 0.9px)`,
          backgroundSize: "5px 5px",
          WebkitMaskImage: "linear-gradient(160deg, #000 40%, transparent 95%)",
          maskImage: "linear-gradient(160deg, #000 40%, transparent 95%)",
        }}
      />
    )
  }
  if (tile.kind === "grid") {
    return (
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `linear-gradient(${fg} 0.6px, transparent 0.7px), linear-gradient(90deg, ${fg} 0.6px, transparent 0.7px)`,
          backgroundSize: "7px 7px",
          opacity: 0.7,
        }}
      />
    )
  }
  // wave
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden>
      <path
        d="M0 26 Q 5 18, 10 26 T 20 26 T 30 26 T 40 26"
        fill="none"
        stroke={fg}
        strokeWidth="1"
      />
      <path
        d="M0 14 Q 5 6, 10 14 T 20 14 T 30 14 T 40 14"
        fill="none"
        stroke={fg}
        strokeWidth="0.7"
        opacity="0.6"
      />
    </svg>
  )
}

export function ThinkingMap() {
  const [active, setActive] = useState<string | null>(null)

  const dimmed = (cluster: string) => active !== null && active !== cluster

  return (
    <div>
      {/* ——— Full map, md and up ——— */}
      <div
        className="relative hidden md:block h-[560px] select-none"
        onMouseLeave={() => setActive(null)}
      >
        {/* connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {TILES.map((t, i) => {
            const c = CLUSTERS.find((cl) => cl.id === t.cluster)!
            const on = active === t.cluster
            return (
              <line
                key={i}
                x1={c.x}
                y1={c.y}
                x2={t.x}
                y2={t.y}
                stroke={on ? "hsl(var(--accent) / 0.55)" : "hsl(var(--border) / 0.7)"}
                strokeWidth={on ? 1.1 : 0.7}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
                opacity={dimmed(t.cluster) ? 0.25 : 1}
              />
            )
          })}
          {/* dotted spokes from the chat node */}
          {CLUSTERS.map((c) => (
            <line
              key={c.id}
              x1={49}
              y1={47}
              x2={c.x}
              y2={c.y}
              stroke="hsl(var(--border) / 0.6)"
              strokeWidth={0.7}
              strokeDasharray="1.5 3.5"
              vectorEffect="non-scaling-stroke"
              opacity={active && active !== c.id ? 0.2 : 0.7}
              className="transition-opacity duration-300"
            />
          ))}
        </svg>

        {/* big words */}
        <span className="absolute -top-3 left-0 font-serif text-6xl lg:text-7xl tracking-tight pointer-events-none">
          Still
        </span>
        <span className="absolute bottom-0 right-0 font-serif italic text-6xl lg:text-7xl tracking-tight pointer-events-none">
          thinking.
        </span>

        {/* tiles */}
        {TILES.map((t, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{ left: `${t.x}%`, top: `${t.y}%`, opacity: dimmed(t.cluster) ? 0.3 : 1 }}
            onMouseEnter={() => setActive(t.cluster)}
          >
            <div
              className="tile-drift border border-border/60"
              style={{
                width: t.size,
                height: t.size,
                background: TONE_BG[t.tone - 1],
                animationDelay: `${(i % 7) * -1.3}s`,
                boxShadow:
                  active === t.cluster ? "0 0 0 1px hsl(var(--accent) / 0.5)" : undefined,
              }}
            >
              <TileArt tile={t} />
            </div>
          </div>
        ))}

        {/* question clusters */}
        {CLUSTERS.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="absolute -translate-x-1/2 -translate-y-1/2 block w-56 text-center group transition-opacity duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            style={{ left: `${c.x}%`, top: `${c.y}%`, opacity: dimmed(c.id) ? 0.35 : 1 }}
            onMouseEnter={() => setActive(c.id)}
            onFocus={() => setActive(c.id)}
            onBlur={() => setActive(null)}
          >
            <span className="font-serif text-xl leading-snug bg-background/80 px-1 box-decoration-clone group-hover:text-accent transition-colors">
              {c.q}
            </span>
            <span
              className="block mt-1.5 font-sans text-[13px] leading-snug text-muted-foreground transition-opacity duration-300"
              style={{ opacity: active === c.id ? 1 : 0.75 }}
            >
              {c.blurb}
            </span>
            <span
              className="block mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-accent transition-opacity duration-200"
              style={{ opacity: active === c.id ? 1 : 0 }}
            >
              go to section →
            </span>
          </Link>
        ))}

        {/* center node — the chat */}
        <Link
          href="/"
          className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground hover:text-accent bg-background/85 px-2 py-1 border border-border/70 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          style={{ left: "49%", top: "47%" }}
          onMouseEnter={() => setActive(null)}
        >
          — or just ask the model →
        </Link>
      </div>

      {/* ——— Compact version, below md ——— */}
      <div className="md:hidden">
        <p className="font-serif text-5xl tracking-tight">
          Still <em>thinking.</em>
        </p>
        <ul className="mt-8 space-y-6">
          {CLUSTERS.map((c) => (
            <li key={c.id}>
              <Link href={c.href} className="group block">
                <span className="font-serif text-lg group-hover:text-accent transition-colors">
                  {c.q}
                </span>
                <span className="block mt-0.5 font-sans text-sm text-muted-foreground">
                  {c.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[11px] tracking-[0.14em] uppercase">
          <Link href="/" className="ref-link">
            — or just ask the model →
          </Link>
        </p>
      </div>
    </div>
  )
}
