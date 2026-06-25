"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const stats = [
  { value: "10M+", label: "legal docs indexed" },
  { value: "<200ms", label: "p95 TTFT, prod LLM chat" },
  { value: "31–57%", label: "embodied-QA inference cut" },
  { value: "1M+", label: "biomedical graph entities" },
]

const links = [
  { label: "Resume", href: "/resume.pdf" },
  { label: "CV", href: "/CV_Kunj_Rathod_April26.pdf" },
  { label: "GitHub", href: "https://github.com/rathodkunj2005" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rathodkunj" },
  { label: "Substack", href: "https://kunjrathod.substack.com" },
]

export function Masthead() {
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Dateline */}
        <motion.div variants={fadeUp} className="rule-double pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-muted-foreground pt-2">
            <span>No. KR-2026.06</span>
            <span className="hidden sm:inline">Salt Lake City — Redmond</span>
            <span>Portfolio · Preprint · June 2026</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="font-serif font-medium text-[2.6rem] leading-[1.05] md:text-7xl tracking-tight mt-10 md:mt-14 max-w-4xl"
        >
          Systems that retrieve, reason,
          <br className="hidden md:block" />{" "}
          <em className="text-accent">&amp; remember</em>.
        </motion.h1>

        {/* Author line */}
        <motion.div variants={fadeUp} className="mt-8 md:mt-10">
          <p className="font-sans text-xl md:text-2xl">
            Kunj Rathod<sup className="font-mono text-xs text-accent ml-0.5">1,2</sup>
          </p>
          <p className="font-mono text-[11px] text-muted-foreground mt-2 leading-relaxed">
            <sup className="text-accent">1</sup> Kahlert School of Computing, University of Utah&ensp;·&ensp;
            <sup className="text-accent">2</sup> Microsoft, Azure Data (SWE Intern, Jan 2026–)
          </p>
        </motion.div>

        {/* Abstract */}
        <motion.div variants={fadeUp} className="mt-10 md:mt-12 md:grid md:grid-cols-[120px_1fr] md:gap-8">
          <span className="smallcaps font-serif text-sm text-muted-foreground block mb-3 md:mb-0 md:text-right">
            Abstract
          </span>
          <div className="max-w-2xl space-y-4">
            <p className="abstract-text font-sans text-[1.05rem] leading-[1.75] text-foreground/90">
              AI engineer and researcher working where production systems meet open research
              problems. Shipped a HIPAA-compliant LLM platform serving 90+ hospital executives
              on AWS Bedrock; scaled hybrid legal retrieval to 10M+ documents and 5,000+ daily
              queries; built graph-augmented pipelines for aerospace materials discovery with
              NASA and DoD collaborators. Current research targets memory for embodied
              agents — Video Mind Palace cuts long-horizon QA inference time 31–57% by replacing
              scene-graph world models with direct video-level VLM queries. Now building
              distributed data systems at Microsoft Azure.
            </p>
            <p className="font-mono text-[11px] tracking-wide text-muted-foreground leading-relaxed">
              <span className="text-accent">Keywords:</span> retrieval-augmented generation ·
              embodied agents · long-horizon memory · distributed systems · interpretability
            </p>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div variants={fadeUp} className="mt-10 md:grid md:grid-cols-[120px_1fr] md:gap-8">
          <span className="smallcaps font-serif text-sm text-muted-foreground block mb-3 md:mb-0 md:text-right">
            Available at
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ref-link"
              >
                [{l.label}]
              </a>
            ))}
          </div>
        </motion.div>

        {/* Highlights strip */}
        <motion.div
          variants={fadeUp}
          className="mt-12 md:mt-16 border-y border-foreground/80 grid grid-cols-2 md:grid-cols-4 divide-x divide-border"
        >
          {stats.map((s, i) => (
            <div key={s.label} className={`py-5 px-4 ${i >= 2 ? "border-t border-border md:border-t-0" : ""}`}>
              <p className="font-serif text-2xl md:text-3xl tabular">{s.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1.5">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
