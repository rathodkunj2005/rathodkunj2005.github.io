"use client"

import { motion } from "framer-motion"

const techStack = [
    "Python", "TypeScript", "React", "Next.js", "Swift", "Java", "C++",
    "AWS Bedrock", "Lambda", "LangChain", "LlamaIndex", "CrewAI",
    "NebulaGraph", "ChromaDB", "Pinecone", "DynamoDB", "PostgreSQL",
    "Docker", "FastAPI", "Flask", "GraphRAG", "RAG", "Multi-Agent AI",
    "PyTorch", "TensorFlow", "SwiftUI", "Firebase", "Vercel", "Kubernetes",
]

const marqueeItems = [...techStack, ...techStack]

export function Marquee() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative w-full overflow-hidden border-y border-border/30 py-3 select-none"
        >
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

            <div className="flex animate-marquee whitespace-nowrap gap-0">
                {marqueeItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3 px-3 text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
                        {item}
                        <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/30" />
                    </span>
                ))}
            </div>
        </motion.div>
    )
}
