"use client"

import { motion } from "framer-motion"

const rows = [
  { domain: "Languages", stack: "Python · TypeScript / JavaScript · Java · C++ · Swift · Rust · SQL" },
  { domain: "AI / ML", stack: "RAG & GraphRAG · LLMs & transformers · multi-agent systems · LangChain / LlamaIndex · PyTorch · vLLM" },
  { domain: "Cloud & Infra", stack: "AWS (Bedrock, Lambda, S3) · Azure · Docker / Kubernetes · event-driven microservices · SLURM / HPC" },
  { domain: "Web & Mobile", stack: "React / Next.js · SwiftUI · Tauri · Flask / FastAPI · Tailwind CSS" },
  { domain: "Data", stack: "PostgreSQL / MySQL · DynamoDB · NebulaGraph · ChromaDB / Pinecone · PySpark" },
  { domain: "Tooling", stack: "Git · CI/CD / Vercel · LaTeX · MCP servers" },
]

export function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl"
    >
      <p className="font-sans text-sm text-muted-foreground mb-4">
        <span className="font-medium text-foreground">Table 1.</span>{" "}
        <em>Technical proficiencies, grouped by domain.</em>
      </p>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-y-2 border-foreground/80">
            <th className="text-left font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium py-2.5 pr-6 w-[30%]">
              Domain
            </th>
            <th className="text-left font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-medium py-2.5">
              Stack
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.domain} className="border-b border-border align-top hover:bg-secondary/40 transition-colors">
              <td className="font-serif text-[0.98rem] py-3.5 pr-6">{row.domain}</td>
              <td className="font-mono text-[12px] leading-relaxed text-foreground/75 py-3.5">{row.stack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
