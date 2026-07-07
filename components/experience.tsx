"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const experiences = [
  {
    title: "Software Engineer Intern — Microsoft Fabric (Azure Data)",
    company: "Microsoft",
    period: "Jan 2026 —",
    location: "Redmond, WA",
    description: [
      "Building distributed data systems for Microsoft Fabric — Microsoft's unified, Spark-native lakehouse analytics platform (the Databricks class of system): OneLake storage, data engineering, warehousing, and real-time intelligence under one compute fabric.",
      "Full-stack work across the Fabric platform within the Azure Data organization.",
    ],
    technologies: ["Microsoft Fabric", "OneLake", "Spark", "Distributed Systems", "Azure"],
    active: true,
  },
  {
    title: "Software Development Intern, AI Services (SUDO Program)",
    company: "University of Utah Health",
    period: "Jan 2025 —",
    location: "Salt Lake City, UT",
    description: [
      "Built and deployed a HIPAA-compliant AI chat platform for 90+ hospital executives using React/TypeScript, Flask middleware, and AWS Bedrock microservices with event-driven Lambda orchestration.",
      "Shipped 6 full-stack features across 4 sprints; integrated AWS Bedrock Agents, Knowledge Bases, and Guardrails for production clinical workflows.",
      "Reduced inference latency by 40% and data query speed by 60% via Bedrock pipeline optimization, API caching, and a DynamoDB–RDS hybrid database strategy.",
      "Implemented token-streaming LLM responses (p95 <200ms TTFT) with resilient fallback handling and distributed session persistence for 1,000+ conversations.",
      "Integrated interactive data visualization tools into the LLM chat interface enabling real-time analytics on hospital data.",
    ],
    technologies: ["React", "TypeScript", "AWS Bedrock", "Lambda", "DynamoDB", "Flask", "HIPAA"],
    active: true,
  },
  {
    title: "Research Project — Long-term Active Embodied QA",
    company: "Advanced AI, University of Utah",
    period: "Jan – May 2026",
    location: "Salt Lake City, UT",
    description: [
      "Developed Video Mind Palace (VMP), an efficient agent for Long-term Active Embodied Question Answering (LA-EQA) that replaces scene-graphs with direct video-level VLM queries.",
      "Demonstrated a 31–57% reduction in online inference time per query with minimal accuracy trade-offs compared to state-of-the-art Robotic Mind Palace (RMP).",
      "Conducted a comprehensive analysis of the LA-EQA benchmark, identifying key limitations in interactivity and proposing future directions using SceneSmith-generated environments.",
    ],
    technologies: ["Qwen3-VL", "Vision-Language Models", "MuJoCo", "SceneSmith", "Robotics"],
  },
  {
    title: "Undergraduate Researcher — LLMs & Computational Simulations",
    company: "STARS Lab, University of Utah · with NASA, Microsoft, U.S. DoD",
    period: "Aug 2025 – Feb 2026",
    location: "Salt Lake City, UT",
    description: [
      "Built a multi-agent, graph-augmented pipeline to extract and normalize material-property data from 1,000+ materials-science papers into a physics-aware graph for automated Ashby plot generation.",
      "Developed a constraint-based 'design region' engine (temperature, creep, pressure limits) and benchmarking suite to identify feasible materials for extreme aerospace environments.",
      "Built Ref-RAG, a custom RAG chatbot using LangChain and Chainlit to extract structured information from large unorganized PDF datasets for materials researchers.",
    ],
    technologies: ["Python", "LLMs", "Multi-Agent", "LangChain", "Graph RAG"],
  },
  {
    title: "AI Engineering Intern",
    company: "CourtEasy.ai / Nugen",
    period: "Nov 2024 – Apr 2025",
    location: "Remote",
    description: [
      "Scaled hybrid legal-document retrieval to 10M+ indexed Indian legal documents (statutes, court orders), supporting 5,000+ daily queries.",
      "Improved retrieval accuracy by 28% and reduced hallucinations by 35% via hybrid RAG (dense vectors + BM25 + reranking) and context-grounding optimizations for Legal-NER tasks.",
      "Built production ETL ingesting 500k+ documents/week and benchmarked 8 LLM families on 4 legal benchmarks including LegalBench and NyayaAnumana; analysis guided model routing, reducing projected inference spend by $50k+/year.",
    ],
    technologies: ["RAG", "BM25", "Legal-NER", "LegalBench", "Python", "LLMs"],
  },
  {
    title: "AI Research Intern — BioGraphRAG",
    company: "Garje Marathi Global (GMG Summer of Code)",
    period: "May – Aug 2024",
    location: "Salt Lake City, UT",
    description: [
      "Led development of BioGraphRAG: a Graph Retrieval-Augmented Generation platform combining biomedical knowledge graphs with LLMs for explainable biomedical Q&A.",
      "Engineered distributed GraphRAG system managing 1M+ biomedical entities (proteins, genes, diseases) integrating UniProt, AlphaFold, and RXNav with NebulaGraph.",
      "Improved factual accuracy by 40%; optimized graph traversal 3× through strategic caching and high-degree node pruning, achieving sub-500ms query latency at p95.",
      "Presented at an international AI panel attended by experts from India and the US — received commendation for technical leadership.",
    ],
    technologies: ["Python", "NebulaGraph", "LlamaIndex", "GraphRAG", "Docker", "FastAPI"],
  },
  {
    title: "Campus Strategist",
    company: "Perplexity AI",
    period: "Jan – Apr 2025",
    location: "Salt Lake City, UT",
    description: [
      "Spearheaded campus-wide outreach driving adoption of Perplexity's AI search among students, faculty, and clubs; onboarded 150+ Perplexity Pro users.",
    ],
    technologies: ["AI Advocacy", "Community", "Growth"],
  },
  {
    title: "Community Advisor",
    company: "University of Utah Housing & Residential Education",
    period: "Aug – Dec 2024",
    location: "Salt Lake City, UT",
    description: [
      "Provided conflict mediation, crisis response, and student support services for a 200+ resident community.",
    ],
    technologies: ["Leadership", "Crisis Management"],
  },
]

function Entry({ exp, index }: { exp: (typeof experiences)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className="group md:grid md:grid-cols-[150px_1fr] md:gap-8 py-8 border-t border-border first:border-t-0"
    >
      {/* Margin column */}
      <div className="mb-3 md:mb-0 md:text-right">
        <p className="font-mono text-xs text-muted-foreground tabular">{exp.period}</p>
        <p className="font-mono text-[10px] text-muted-foreground/70 mt-1">{exp.location}</p>
        {exp.active && (
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent mt-2">
            ● active
          </p>
        )}
      </div>

      {/* Body */}
      <div>
        <h3 className="font-serif text-xl md:text-[1.35rem] leading-snug group-hover:text-accent transition-colors duration-300">
          {exp.title}
        </h3>
        <p className="font-sans italic text-muted-foreground mt-1">{exp.company}</p>
        <ul className="mt-4 space-y-2 max-w-2xl">
          {exp.description.map((item, i) => (
            <li key={i} className="font-sans text-[0.95rem] leading-relaxed text-foreground/80 pl-5 relative">
              <span className="absolute left-0 text-accent/70 font-mono text-xs top-1">—</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] text-muted-foreground mt-4 leading-relaxed">
          {exp.technologies.map((t, i) => (
            <span key={t}>
              <span className="text-accent/60">[</span>
              {t}
              <span className="text-accent/60">]</span>
              {i < exp.technologies.length - 1 && " "}
            </span>
          ))}
        </p>
      </div>
    </motion.article>
  )
}

export function Experience() {
  return (
    <div>
      {experiences.map((exp, index) => (
        <Entry key={index} exp={exp} index={index} />
      ))}

      {/* 1.1 Honors */}
      <div className="mt-4 border-t border-border pt-8">
        <p className="font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground mb-5">
          <span className="text-accent">1.1</span> Honors
        </p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="md:grid md:grid-cols-[150px_1fr] md:gap-8"
        >
          <p className="font-mono text-xs text-muted-foreground md:text-right mb-2 md:mb-0">Mar 2026</p>
          <div className="max-w-2xl">
            <h3 className="font-serif text-lg leading-snug">
              Kahlert Impact Prize <span className="font-mono text-xs text-accent align-middle ml-1">$1,000</span>
            </h3>
            <p className="font-sans italic text-muted-foreground text-sm mt-0.5">
              Kahlert School of Computing, University of Utah
            </p>
            <p className="font-sans text-[0.95rem] leading-relaxed text-foreground/80 mt-3">
              Awarded for societal impact through AI research and production systems in healthcare,
              legal-tech, and embodied AI. Funded by a $15M endowment from The Kahlert Foundation;
              recognizes students translating computing research into real-world benefit.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 1.2 Education */}
      <div className="mt-10 border-t border-border pt-8">
        <p className="font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground mb-5">
          <span className="text-accent">1.2</span> Education
        </p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="md:grid md:grid-cols-[150px_1fr] md:gap-8"
        >
          <p className="font-mono text-xs text-muted-foreground md:text-right mb-2 md:mb-0 tabular">
            Aug 2023 – Dec 2026
          </p>
          <div className="max-w-2xl">
            <h3 className="font-serif text-lg leading-snug">B.S. Computer Science</h3>
            <p className="font-sans italic text-muted-foreground text-sm mt-0.5">
              University of Utah · GPA 3.7/4.0, Dean&rsquo;s List
            </p>
            <p className="font-mono text-[11px] text-muted-foreground mt-3 leading-relaxed">
              Machine Learning · Computer Vision · NLP · Distributed Systems · Algorithms &amp; Data Structures
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
