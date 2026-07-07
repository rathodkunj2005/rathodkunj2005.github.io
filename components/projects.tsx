"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import dynamic from "next/dynamic"
import { NotebookCell } from "@/components/notebook-cell"

const VlaArm = dynamic(() => import("@/components/three/vla-arm").then((m) => m.VlaArm), {
  ssr: false,
  loading: () => <div className="h-[280px] w-full border border-border bg-card/40" />,
})

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

/** Flagship research figure — full-width, with a live VLA rollout plate. */
function FlagshipFigure({ project }: { project: Project }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease }}
      className="md:col-span-2 p-6 md:p-8 -mt-px -ml-px border-t border-l border-border bg-card/30"
    >
      <div className="flex items-baseline justify-between gap-4">
        <figcaption className="font-mono text-xs text-accent tracking-wide tabular">
          Fig. 01 — interactive
        </figcaption>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {project.type}
        </span>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8 mt-4">
        <div className="flex flex-col">
          <h3 className="font-serif text-2xl md:text-3xl leading-tight">{project.title}</h3>
          <p className="font-sans italic text-muted-foreground mt-1">{project.subtitle}</p>

          <ul className="mt-4 space-y-2 flex-grow">
            {project.bullets.map((b, i) => (
              <li
                key={i}
                className="font-sans text-[0.95rem] leading-relaxed text-foreground/85 pl-4 relative"
              >
                <span className="absolute left-0 text-accent/70 font-mono text-[10px] top-1">—</span>
                {b}
              </li>
            ))}
          </ul>

          <p className="font-mono text-[11px] text-muted-foreground mt-5 leading-relaxed">
            {project.technologies.join(" · ")}
          </p>
          <div className="flex gap-5 mt-4 pt-4 border-t border-border/60 font-mono text-xs">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="ref-link">
              source ↗
            </a>
          </div>
        </div>

        <div className="mt-6 md:mt-0 flex flex-col">
          <NotebookCell
            className="flex-1 flex flex-col [&>div:last-child]:flex-1"
            source={
              <>
                env = SceneSmith(<span className="opacity-80">&quot;apartment-0042&quot;</span>)
                {"\n"}<span className="text-muted-foreground">rollout</span> = palace.
                <span className="text-accent">act</span>(env, policy=π)
              </>
            }
          >
            <VlaArm />
          </NotebookCell>
          <p className="font-mono text-[10.5px] text-muted-foreground mt-2 leading-relaxed">
            Live plate — CCD inverse kinematics at 60 Hz. The arm tracks its target
            autonomously; drag on the floor plane to take over the policy.
          </p>
        </div>
      </div>
    </motion.figure>
  )
}

function Figure({ project, index }: { project: Project; index: number }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 220, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22 })

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease, delay: (index % 2) * 0.08 }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const rect = e.currentTarget.getBoundingClientRect()
        rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 4)
        rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 4)
      }}
      onPointerLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
      }}
      className="group flex flex-col p-6 md:p-8 -mt-px -ml-px border-t border-l border-border hover:bg-card/60 hover:shadow-[0_18px_40px_-24px_hsl(var(--foreground)/0.35)] transition-[background-color,box-shadow] duration-300 will-change-transform"
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
          <li key={i} className="font-sans text-[0.95rem] leading-relaxed text-foreground/85 pl-4 relative">
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
      <FlagshipFigure project={projects[0]} />
      {projects.slice(1).map((project, index) => (
        <Figure key={project.title} project={project} index={index + 1} />
      ))}
    </div>
  )
}
