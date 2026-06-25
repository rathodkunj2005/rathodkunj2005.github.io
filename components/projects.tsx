"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

interface Project {
  title: string
  subtitle: string
  award?: string
  bullets: string[]
  technologies: string[]
  github: string
  demo?: string | null
  type: string
}

const projects: Project[] = [
  {
    title: "Video Mind Palace",
    subtitle: "Efficient long-term active embodied QA",
    bullets: [
      "Agent for LA-EQA that replaces expensive scene-graph world models with direct video-level VLM queries.",
      "31–57% reduction in online inference time per query, within 13–17% of state-of-the-art RMP accuracy.",
      "Eliminates mandatory offline GPT-4o captioning preprocessing, cutting end-to-end latency and cost.",
    ],
    technologies: ["Qwen3-VL", "MuJoCo", "SceneSmith", "Python", "Robotics"],
    github: "https://github.com/rathodkunj2005",
    type: "Research",
  },
  {
    title: "FNDR",
    subtitle: "Privacy-first local AI memory for macOS",
    bullets: [
      "Zero-trust, local-only memory assistant in Rust/Tauri — no cloud, no telemetry, full data sovereignty.",
      "Metal-accelerated on-device inference (Llama 3.2, SmolVLM) for low-latency RAG on Apple Silicon.",
      "Real-time screen extraction via Apple Vision OCR + CLIP embeddings; Graphiti-style temporal search across activities, web sessions, and meeting transcripts.",
      "Local Whisper transcription and an MCP server for secure interop with external agents and IDEs.",
    ],
    technologies: ["Rust", "Tauri", "Metal", "Llama 3.2", "Whisper", "MCP"],
    github: "https://github.com/rathodkunj2005",
    type: "Local AI System",
  },
  {
    title: "HirePilot",
    subtitle: "Autonomous AI recruiting agency",
    bullets: [
      "Fully autonomous recruiting backend with specialized agents — Enrichment, Scheduling, Interview, Evaluation — managing the hiring lifecycle from GitHub sourcing to live screening.",
      "Twilio real-time voice AI interviews, Google Calendar slot scheduling, Slack/Resend approval and outreach flows.",
    ],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Anthropic API", "Twilio"],
    github: "https://github.com/rathodkunj2005",
    type: "AI Platform",
  },
  {
    title: "CloudCoder",
    subtitle: "Prompt → deployed AWS application",
    bullets: [
      "Model-agnostic orchestrator embedded in this site: generates and deploys serverless AWS apps directly to a live AWS account.",
      "Emits structured React SPAs, Node.js Lambdas, and SAM CloudFormation templates via the Vercel AI SDK.",
      "Packages Lambda binaries with JSZip, stages S3 artifacts, and executes CloudFormation with SSE log streaming to the UI.",
    ],
    technologies: ["Next.js", "Claude / GPT-4o", "AWS SDK v3", "CloudFormation"],
    github: "https://github.com/rathodkunj2005",
    demo: "/cloudCoder",
    type: "Application",
  },
  {
    title: "Minute0",
    subtitle: "AI-powered deployment monitor",
    award: "Hackathon Winner",
    bullets: [
      "Tracks Vercel deployments, classifies build/runtime failures, and triggers Slack alerts with approval workflows.",
      "AI root-cause analysis over logs with FastAPI + ChromaDB vector search, emitting structured fix suggestions for coding agents.",
    ],
    technologies: ["React", "FastAPI", "ChromaDB", "Cerebras", "Slack API"],
    github: "https://github.com/rathodkunj2005",
    demo: "https://minute0.vercel.app",
    type: "Application",
  },
  {
    title: "Omni",
    subtitle: "Everything, everywhere, all at once",
    bullets: [
      "Unified intelligence layer over Gmail, Google Calendar, Slack, and FNDR private memory — Smart Todos, natural-language scheduling, on-demand personal context.",
      "Real-time voice interaction and autonomous multi-step workflow orchestration across the digital stack.",
    ],
    technologies: ["React", "TypeScript", "MCP", "Gmail API", "Slack API"],
    github: "https://github.com/rathodkunj2005",
    type: "AI Orchestrator",
  },
  {
    title: "BioGraphRAG",
    subtitle: "Biomedical knowledge-graph retrieval",
    bullets: [
      "Distributed GraphRAG unifying UniProt, AlphaFold, RXNav, and BioKG in NebulaGraph; ETL processes 2M+ entity updates monthly.",
      "+40% factual accuracy; 3× faster graph traversal via caching and high-degree node pruning (sub-500ms p95).",
    ],
    technologies: ["Python", "NebulaGraph", "LlamaIndex", "FastAPI", "Docker"],
    github: "https://github.com/rathodkunj2005",
    type: "Research System",
  },
  {
    title: "Wingman.ai",
    subtitle: "Multi-modal personal assistant for iOS",
    bullets: [
      "Voice, chat, and image input over GPT-4o and Whisper with RAG-enhanced memory.",
      "Offline-first architecture with Firebase sync, real-time streaming, persistent history.",
    ],
    technologies: ["SwiftUI", "GPT-4o", "Whisper", "Firebase"],
    github: "https://github.com/rathodkunj2005",
    type: "Application",
  },
  {
    title: "FlowVía",
    subtitle: "V2X urban mobility optimization",
    bullets: [
      "V2V/V2I/V2N platform for real-time adaptive traffic management, from OBD-II hardware to cloud ML backend.",
      "LSTM traffic-flow prediction on live SPaT signal data; AES-256 comms with rotating vehicle identifiers.",
    ],
    technologies: ["Python", "TensorFlow", "LSTM", "DSRC", "C-V2X"],
    github: "https://github.com/rathodkunj2005",
    type: "System",
  },
  {
    title: "RL Investment Advisor",
    subtitle: "Reinforcement-learning portfolio optimizer",
    award: "HackUSU 2025",
    bullets: [
      "DistillBERT sentiment analysis on financial news combined with DQN and PPO for portfolio optimization; measurable outperformance on backtests.",
    ],
    technologies: ["Python", "DistillBERT", "DQN", "PPO"],
    github: "https://github.com/rathodkunj2005",
    type: "Algorithm",
  },
]

function Figure({ project, index }: { project: Project; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease, delay: (index % 2) * 0.08 }}
      className="group flex flex-col p-6 md:p-8 -mt-px -ml-px border-t border-l border-border"
    >
      <div className="flex items-baseline justify-between gap-4">
        <figcaption className="font-mono text-xs text-accent tracking-wide tabular">
          Fig. {String(index + 1).padStart(2, "0")}
        </figcaption>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {project.award ? <span className="text-accent">★ {project.award}</span> : project.type}
        </span>
      </div>

      <h3 className="font-serif text-2xl leading-tight mt-4 group-hover:text-accent transition-colors duration-300">
        {project.title}
      </h3>
      <p className="font-sans italic text-muted-foreground mt-1">{project.subtitle}</p>

      <ul className="mt-4 space-y-2 flex-grow">
        {project.bullets.map((b, i) => (
          <li key={i} className="font-sans text-sm leading-relaxed text-foreground/75 pl-4 relative">
            <span className="absolute left-0 text-accent/70 font-mono text-[10px] top-1">—</span>
            {b}
          </li>
        ))}
      </ul>

      <p className="font-mono text-[10px] text-muted-foreground mt-5 leading-relaxed">
        {project.technologies.join(" · ")}
      </p>

      <div className="flex gap-5 mt-4 pt-4 border-t border-border/60 font-mono text-xs">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="ref-link">
          source ↗
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target={project.demo.startsWith("http") ? "_blank" : undefined}
            rel={project.demo.startsWith("http") ? "noopener noreferrer" : undefined}
            className="ref-link"
          >
            demo ↗
          </a>
        )}
      </div>
    </motion.figure>
  )
}

export function Projects() {
  return (
    <div className="grid md:grid-cols-2 border-b border-r border-border">
      {projects.map((project, index) => (
        <Figure key={project.title} project={project} index={index} />
      ))}
    </div>
  )
}
