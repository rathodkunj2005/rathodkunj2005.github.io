"use client"

import { motion } from "framer-motion"
import { ExternalLink, BookOpen, FileText, Newspaper } from "lucide-react"

const typeIcon: Record<string, any> = {
    article: Newspaper,
    report: FileText,
    publication: BookOpen,
}

interface Publication {
    title: string
    venue: string
    date: string
    type: "article" | "report" | "publication"
    url?: string
    description: string
    note?: string
    coauthors?: string
}

export function Publications() {
    const publications: Publication[] = [
        {
            title: "BioGraphRAG — Biomedical Knowledge Graph Retrieval Augmented Generation",
            venue: "Kunj's Substack",
            date: "Oct 2024",
            type: "article",
            url: "https://kunjrathod.substack.com/p/biographrag",
            description:
                "Full technical article presenting BioGraphRAG: system architecture, GraphRAG algorithm, node-degree performance analysis (low/mid/high-degree nodes), multi-stage answer enrichment pipeline integrating UniProt, AlphaFold, and RXNav, and future directions.",
            note: "NebulaGraph's marketing team requested republication on their official website (Jun 2025).",
            coauthors: "Co-authored with Niraj Kumar Singh (ML Engineer) · GMG Summer of Code",
        },
        {
            title: "FlowVía: A Technical Deep Dive into Next-Gen Urban Mobility",
            venue: "Kunj's Substack",
            date: "Apr 2024",
            type: "article",
            url: "https://kunjrathod.substack.com/p/flowvia",
            description:
                "Solo-authored technical article covering FlowVía, a V2X urban traffic optimization system. Details V2V, V2I, V2N protocols, DSRC and C-V2X standards, real-time speed recommendation algorithms, LSTM-based traffic flow prediction, data privacy/security design, and scalability challenges.",
        },
        {
            title: "Comparative Analysis: LLM Families on Legal Benchmarks",
            venue: "Internal Technical Report · CourtEasy.ai / Nugen",
            date: "2025",
            type: "report",
            description:
                "Co-authored comparative analysis of InLegalBERT, InLegalLLaMA, and GPT-4o-mini on LegalBench and NyayaAnumana benchmarks, synthesizing insights from 15+ research papers to inform production RAG workflow design and evaluation protocols.",
            coauthors: "Co-authored with team at CourtEasy.ai / Nugen",
        },
    ]

    return (
        <div className="space-y-8">
            {publications.map((pub, index) => {
                const Icon = typeIcon[pub.type]
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="group"
                    >
                        <div className="relative pl-8 border-l border-border/40 hover:border-accent/40 transition-colors duration-300">
                            {/* Icon Node */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-background border border-border/60 group-hover:border-accent/50 flex items-center justify-center transition-colors duration-300"
                            >
                                <Icon className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
                            </motion.div>

                            <div className="space-y-2">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        {pub.url ? (
                                            <a
                                                href={pub.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/link inline-flex items-start gap-1 text-lg font-serif font-medium text-foreground hover:text-primary transition-colors leading-snug"
                                            >
                                                <span>{pub.title}</span>
                                                <ExternalLink className="h-3.5 w-3.5 mt-1 opacity-0 group-hover/link:opacity-70 transition-opacity shrink-0" />
                                            </a>
                                        ) : (
                                            <h3 className="text-lg font-serif font-medium leading-snug">{pub.title}</h3>
                                        )}
                                    </div>
                                    <span className="text-xs font-mono text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded shrink-0 mt-1">
                                        {pub.date}
                                    </span>
                                </div>

                                <p className="text-xs font-mono text-muted-foreground/70">{pub.venue}</p>
                                {pub.coauthors && (
                                    <p className="text-xs text-muted-foreground/60 italic">{pub.coauthors}</p>
                                )}

                                <p className="text-sm text-muted-foreground/80 leading-relaxed font-light">
                                    {pub.description}
                                </p>

                                {pub.note && (
                                    <div className="flex items-start gap-2 text-xs text-amber-600/80 dark:text-amber-400/80 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2">
                                        <span className="shrink-0">✦</span>
                                        <span>{pub.note}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
