"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

interface Publication {
  authors: string
  title: string
  venue: string
  date: string
  url?: string
  description: string
  note?: string
}

const publications: Publication[] = [
  {
    authors: "K. Rathod, N. Subedi",
    title: "Exploring Long-term Active Embodied Question Answering in Simulated Indoor Environments",
    venue: "Advanced AI, University of Utah",
    date: "Spring 2026",
    description:
      "Investigates the LA-EQA benchmark and proposes Video Mind Palace (VMP), an efficient agent replacing structured scene-graphs with direct VLM queries — 31–57% reduction in inference time with minimal accuracy drop, plus a structural critique of benchmark interactivity and episode length.",
  },
  {
    authors: "K. Rathod, N. K. Singh",
    title: "BioGraphRAG — Biomedical Knowledge Graph Retrieval Augmented Generation",
    venue: "Kunj's Substack · GMG Summer of Code",
    date: "Oct 2024",
    url: "https://kunjrathod.substack.com/p/biographrag",
    description:
      "System architecture, the GraphRAG algorithm, node-degree performance analysis, and a multi-stage answer-enrichment pipeline integrating UniProt, AlphaFold, and RXNav.",
    note: "NebulaGraph's marketing team requested republication on their official website (Jun 2025).",
  },
  {
    authors: "K. Rathod",
    title: "FlowVía: A Technical Deep Dive into Next-Gen Urban Mobility",
    venue: "Kunj's Substack",
    date: "Apr 2024",
    url: "https://kunjrathod.substack.com/p/flowvia",
    description:
      "V2V/V2I/V2N protocols, DSRC and C-V2X standards, real-time speed recommendation algorithms, LSTM traffic-flow prediction, and privacy/security design for V2X systems.",
  },
  {
    authors: "K. Rathod et al.",
    title: "Comparative Analysis: LLM Families on Legal Benchmarks",
    venue: "Internal Technical Report, CourtEasy.ai / Nugen",
    date: "2025",
    description:
      "InLegalBERT, InLegalLLaMA, and GPT-4o-mini evaluated on LegalBench and NyayaAnumana, synthesizing 15+ papers to inform production RAG workflow design and model routing.",
  },
]

export function Publications() {
  return (
    <ol className="space-y-7">
      {publications.map((pub, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease, delay: index * 0.06 }}
          className="md:grid md:grid-cols-[150px_1fr] md:gap-8"
        >
          <span className="font-mono text-sm text-accent md:text-right block mb-1 md:mb-0 tabular">
            [{index + 1}]
          </span>
          <div className="max-w-2xl">
            <p className="font-sans text-[1.02rem] leading-relaxed">
              <span className="text-foreground/80">{pub.authors}.</span>{" "}
              {pub.url ? (
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="ref-link font-medium">
                  &ldquo;{pub.title}.&rdquo;
                </a>
              ) : (
                <span className="font-medium">&ldquo;{pub.title}.&rdquo;</span>
              )}{" "}
              <em className="text-muted-foreground">{pub.venue}</em>,{" "}
              <span className="font-mono text-sm text-muted-foreground">{pub.date}</span>.
            </p>
            <p className="font-sans text-sm leading-relaxed text-foreground/70 mt-2">
              {pub.description}
            </p>
            {pub.note && (
              <p className="font-mono text-[11px] text-accent/90 mt-2 pl-4 border-l-2 border-accent/30">
                ✦ {pub.note}
              </p>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
