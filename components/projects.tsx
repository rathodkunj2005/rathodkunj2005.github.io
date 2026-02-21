"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight, Trophy } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="h-full perspective-1000"
    >
      <div className="group h-full relative preserve-3d">
        {/* Figure Label */}
        <div className="mb-2 flex items-center gap-2 text-xs font-mono text-muted-foreground/70 overflow-hidden">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="font-bold text-accent flex"
          >
            {project.id.split('').map((char: string, i: number) => (
              <motion.span
                key={i}
                whileHover={{ y: [0, -2, 2, 0], x: [0, 1, -1, 0] }}
                transition={{ duration: 0.2 }}
                className="inline-block cursor-default"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <div className="relative flex-1 h-px bg-border/30">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "circOut", delay: 0.4 }}
              style={{ originX: 0 }}
              className="absolute inset-0 bg-accent/50"
            />
          </div>
          {project.award && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full px-2 py-0.5"
            >
              <Trophy className="h-2.5 w-2.5" />
              {project.award}
            </motion.span>
          )}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.type}</span>
        </div>

        <Card
          className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-border/60 transition-colors duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-accent/5 translate-z-0"
          style={{ transform: "translateZ(20px)" }}
        >
          <CardHeader className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-start justify-between">
                <CardTitle className="font-serif text-2xl font-medium leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
              </div>
              <CardDescription className="text-base font-medium text-foreground/70">
                {project.subtitle}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex-grow space-y-6">
            <ul className="space-y-1.5 text-muted-foreground text-sm leading-relaxed font-light">
              {project.bullets.map((b: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <div className="h-px w-full bg-gradient-to-r from-border/50 to-transparent" />
              <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                {project.technologies.map((tech: string, i: number) => (
                  <span key={i} className="px-1.5 py-0.5 bg-secondary/30 rounded text-[10px] tracking-tight">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2 pb-6 flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors border-b border-transparent hover:border-primary"
            >
              <Github className="h-3 w-3" />
              SOURCE_CODE
            </a>
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-muted-foreground hover:text-accent flex items-center gap-1.5 transition-colors border-b border-transparent hover:border-accent"
              >
                <ExternalLink className="h-3 w-3" />
                LIVE_DEMO
              </a>
            )}
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const projects = [
    {
      id: "FIG-01",
      title: "Minute0",
      subtitle: "AI-Powered Deployment Monitor",
      award: "Hackathon Winner",
      bullets: [
        "Full-stack deployment monitoring and incident response system tracking Vercel deployments, classifying build/runtime failures, and triggering Slack alerts with approval workflows.",
        "AI-assisted root-cause analysis with FastAPI and ChromaDB vector search over logs, generating structured fix suggestions for downstream coding agents.",
        "Real-time React/TypeScript dashboard for live metrics, incident status, and agent health; deployed on Vercel with CI/CD pipeline.",
      ],
      technologies: ["React", "TypeScript", "FastAPI", "ChromaDB", "Cerebras", "Slack API", "Vercel"],
      github: "https://github.com/rathodkunj2005",
      demo: "https://minute0.vercel.app",
      type: "Application",
    },
    {
      id: "FIG-02",
      title: "Wingman.ai",
      subtitle: "Multi-Modal AI Personal Assistant (iOS)",
      bullets: [
        "iOS personal assistant with voice, chat, and image input integrating GPT-4o and Whisper APIs for context-aware responses with RAG-enhanced memory.",
        "Offline-first architecture with Firebase sync supporting real-time message streaming and persistent conversation history.",
      ],
      technologies: ["SwiftUI", "GPT-4o", "Whisper", "Firebase", "RAG", "MVVM"],
      github: "https://github.com/rathodkunj2005",
      demo: null,
      type: "Application",
    },
    {
      id: "FIG-03",
      title: "BioGraphRAG",
      subtitle: "Biomedical Knowledge Graph Retrieval",
      bullets: [
        "Production-grade distributed GraphRAG system for healthcare professionals requiring trustworthy biomedical information retrieval.",
        "Integrated UniProt, AlphaFold, RXNav, and BioKG into a unified NebulaGraph store with automated ETL processing 2M+ entity updates monthly.",
        "Improved factual accuracy by 40%; optimized graph traversal 3× through caching and high-degree node pruning (sub-500ms at p95).",
      ],
      technologies: ["Python", "NebulaGraph", "LlamaIndex", "Docker", "FastAPI", "AWS", "GraphRAG"],
      github: "https://github.com/rathodkunj2005",
      demo: null,
      type: "Research System",
    },
    {
      id: "FIG-04",
      title: "FlowVía",
      subtitle: "V2X Urban Mobility Optimization System",
      bullets: [
        "Vehicle-to-Everything (V2X) traffic optimization platform combining V2V, V2I, and V2N communication for real-time adaptive traffic management.",
        "LSTM-based traffic flow prediction models with live SPaT signal data; full system stack from OBD-II hardware to cloud ML backend.",
        "AES-256 encrypted communication with rotating vehicle identifiers and edge-first architecture for privacy and ultra-low latency.",
      ],
      technologies: ["Python", "TensorFlow", "LSTM", "V2X", "DSRC", "C-V2X", "OBD-II"],
      github: "https://github.com/rathodkunj2005",
      demo: null,
      type: "System Architecture",
    },
    {
      id: "FIG-05",
      title: "RL Investment Advisor",
      subtitle: "Reinforcement Learning Portfolio Optimizer",
      award: "HackUSU 2025",
      bullets: [
        "Investment recommendation system combining DistillBERT-based sentiment analysis on financial news with DQN and PPO for portfolio optimization.",
        "Demonstrated measurable outperformance on backtested portfolio allocation tasks.",
      ],
      technologies: ["Python", "DistillBERT", "DQN", "PPO", "Flask", "Reinforcement Learning"],
      github: "https://github.com/rathodkunj2005",
      demo: null,
      type: "Algorithm",
    },
    {
      id: "FIG-06",
      title: "Financial Multi-Agent System",
      subtitle: "Collaborative AI Investment Analysis",
      bullets: [
        "Collaborative AI system with specialized agents (Analyst, Trader, Risk Advisor) using CrewAI and LangChain for real-time financial analysis.",
        "Designed inter-agent communication protocols enabling parallel analysis and consensus-driven output generation.",
      ],
      technologies: ["CrewAI", "LangChain", "Python", "Flask", "Multi-Agent"],
      github: "https://github.com/rathodkunj2005",
      demo: null,
      type: "System Architecture",
    },
    {
      id: "FIG-07",
      title: "Ref-RAG",
      subtitle: "Research Literature Chatbot",
      bullets: [
        "Custom RAG chatbot for the STARS Lab to extract structured information from large, unorganized PDF corpora of materials-science research papers.",
        "Enabled researchers to query domain-specific knowledge across 1,000+ documents through a conversational interface.",
      ],
      technologies: ["Python", "LangChain", "Chainlit", "FastAPI", "RAG"],
      github: "https://github.com/rathodkunj2005",
      demo: null,
      type: "Research Tool",
    },
  ]

  return (
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 perspective-container">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  )
}
