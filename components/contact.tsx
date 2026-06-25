"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const channels = [
  { label: "Email", value: "kunj.rathod@utah.edu", href: "mailto:kunj.rathod@utah.edu" },
  { label: "GitHub", value: "github.com/rathodkunj2005", href: "https://github.com/rathodkunj2005" },
  { label: "LinkedIn", value: "linkedin.com/in/rathodkunj", href: "https://www.linkedin.com/in/rathodkunj/" },
  { label: "Substack", value: "kunjrathod.substack.com", href: "https://kunjrathod.substack.com" },
  { label: "X", value: "@KunjRathod17", href: "https://x.com/KunjRathod17" },
]

export function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
    >
      <p className="font-serif text-2xl md:text-4xl leading-snug max-w-3xl">
        Open to research collaborations and{" "}
        <em className="text-accent">engineering problems worth losing sleep over</em>.
      </p>

      <div className="mt-10 max-w-2xl">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-baseline justify-between gap-4 py-3.5 border-b border-border hover:bg-secondary/40 transition-colors"
          >
            <span className="smallcaps font-serif text-sm text-muted-foreground w-24 shrink-0">
              {c.label}
            </span>
            <span className="font-mono text-sm text-foreground/85 group-hover:text-accent transition-colors text-right truncate">
              {c.value}
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity ml-2">↗</span>
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  )
}
