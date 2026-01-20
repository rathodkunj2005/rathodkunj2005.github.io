"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  // 3D Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    const xPct = clientX / width - 0.5
    const yPct = clientY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="h-full perspective-1000"
    >
      <div className="group h-full relative preserve-3d">
        {/* Figure Label & Axis Animation */}
        <div className="mb-2 flex items-center gap-2 text-xs font-mono text-muted-foreground/70 overflow-hidden">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="font-bold text-accent flex"
          >
            {/* Jitter Text Effect */}
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
            <p className="text-muted-foreground text-sm leading-relaxed font-light">
              {project.description}
            </p>

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
            {project.demo !== "#" && (
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
      title: "Wingman.ai",
      subtitle: "AI Personal Assistant Mobile App",
      description: "Multi-modal AI core using OpenAI APIs (GPT-4o, Whisper) and RAG. Scalable Firebase backend with MVVM SwiftUI architecture.",
      technologies: ["SwiftUI", "OpenAI API", "Firebase", "RAG"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      type: "Application",
      status: "In Progress"
    },
    {
      id: "FIG-02",
      title: "BioGraphRAG",
      subtitle: "Biomedical Knowledge Graph Retrieval",
      description: "Distributed GraphRAG system with NebulaGraph querying 1M+ entities. ETL pipeline with LlamaIndex to reduce hallucinations in biomedical queries.",
      technologies: ["Python", "NebulaGraph", "LlamaIndex", "AWS"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      type: "Research System",
      status: "Completed"
    },
    {
      id: "FIG-03",
      title: "Financial Multi-Agent System",
      subtitle: "Collaborative Investment Analysis",
      description: "Collaborative AI system with specialized agents (Analyst, Trader, Risk Advisor) using CrewAI and LangChain for real-time financial analysis.",
      technologies: ["CrewAI", "LangChain", "Multi-Agent", "Python"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      type: "System Architecture",
      status: "Completed"
    },
    {
      id: "FIG-04",
      title: "RL Investment Advisor",
      subtitle: "Reinforcement Learning Portfolio Opt.",
      description: "Investment recommendation system using DistillBERT for sentiment and DQN/PPO for portfolio optimization. HackUSU 2025 Winner.",
      technologies: ["Python", "Reinforcement Learning", "Flask", "PPO"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      type: "Algorithm",
      status: "Winner"
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
