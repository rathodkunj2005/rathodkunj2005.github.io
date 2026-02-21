"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap, Briefcase, FlaskConical } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

const typeIcons: Record<string, any> = {
  industry: Briefcase,
  research: FlaskConical,
  campus: GraduationCap,
}

const typeBadgeStyles: Record<string, string> = {
  industry: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
  research: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  campus: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const experiences = [
    {
      title: "Software Engineer Intern — Azure Data",
      company: "Microsoft",
      period: "Jan 2026 – Present",
      location: "Redmond, WA",
      description: [
        "Building scalable cloud solutions for distributed data systems on the Azure Data team.",
        "Focusing on full-stack software development and distributed systems within the Azure ecosystem.",
      ],
      technologies: ["Azure", "Distributed Systems", "Full Stack", "Cloud"],
      type: "industry",
      active: true,
    },
    {
      title: "Software Development Intern, AI Services (SUDO Program)",
      company: "University of Utah Health",
      period: "Jan 2025 – Present",
      location: "Salt Lake City, UT",
      description: [
        "Built and deployed a HIPAA-compliant AI chat platform for 90+ hospital executives using React/TypeScript, Flask middleware, and AWS Bedrock microservices with event-driven Lambda orchestration.",
        "Shipped 6 full-stack features across 4 sprints; integrated AWS Bedrock Agents, Knowledge Bases, and Guardrails for production clinical workflows.",
        "Reduced inference latency by 40% and data query speed by 60% via Bedrock pipeline optimization, API caching, and a DynamoDB–RDS hybrid database strategy.",
        "Implemented token-streaming LLM responses (p95 <200ms TTFT) with resilient fallback handling and distributed session persistence for 1,000+ conversations.",
        "Integrated interactive data visualization tools into the LLM chat interface enabling real-time analytics on hospital data.",
      ],
      technologies: ["React", "TypeScript", "AWS Bedrock", "Lambda", "DynamoDB", "Flask", "HIPAA"],
      type: "industry",
      active: true,
    },
    {
      title: "Undergraduate Researcher — LLMs & Computational Simulations",
      company: "STARS Lab, University of Utah (Collaboration: NASA, Microsoft, U.S. DoD)",
      period: "Aug 2025 – Feb 2026",
      location: "Salt Lake City, UT",
      description: [
        "Built a multi-agent, graph-augmented pipeline to extract and normalize material-property data from 1,000+ materials-science papers into a physics-aware graph for automated Ashby plot generation.",
        "Developed a constraint-based 'design region' engine (temperature, creep, pressure limits) and benchmarking suite to identify feasible materials for extreme aerospace environments.",
        "Explored LLMs and multi-agent AI to streamline knowledge sharing across interdisciplinary stakeholders including engineers, scientists, and DoD partners.",
        "Built Ref-RAG, a custom RAG chatbot using LangChain and Chainlit to extract structured information from large unorganized PDF datasets for materials researchers.",
      ],
      technologies: ["Python", "LLMs", "Multi-Agent", "LangChain", "Graph RAG", "NASA", "DoD"],
      type: "research",
    },
    {
      title: "AI Engineering Intern",
      company: "CourtEasy.ai / Nugen",
      period: "Nov 2024 – Apr 2025",
      location: "Remote",
      description: [
        "Scaled hybrid legal-document retrieval to 10M+ indexed Indian legal documents (statutes, court orders), supporting 5,000+ daily queries.",
        "Improved retrieval accuracy by 28% and reduced hallucinations by 35% via hybrid RAG (dense vectors + BM25 + reranking) and context-grounding optimizations for Legal-NER tasks.",
        "Built production ETL ingesting 500k+ documents/week and benchmarked 8 LLM families on 4 legal benchmarks including LegalBench and NyayaAnumana.",
        "Analysis guided model routing decisions, reducing projected inference spend by $50k+/year.",
        "Co-authored a comparative analysis paper synthesizing insights from 15+ research papers on legal AI.",
      ],
      technologies: ["RAG", "BM25", "Legal-NER", "LegalBench", "Python", "LLMs"],
      type: "industry",
    },
    {
      title: "AI Research Intern — BioGraphRAG",
      company: "Garje Marathi Global (GMG Summer of Code)",
      period: "May 2024 – Aug 2024",
      location: "Salt Lake City, UT",
      description: [
        "Led development of BioGraphRAG: a Graph Retrieval-Augmented Generation platform combining biomedical knowledge graphs with LLMs for explainable biomedical Q&A.",
        "Engineered distributed GraphRAG system managing 1M+ biomedical entities (proteins, genes, diseases) integrating UniProt, AlphaFold, and RXNav with NebulaGraph.",
        "Improved factual accuracy by 40%; optimized graph traversal 3× through strategic caching and high-degree node pruning, achieving sub-500ms query latency at p95.",
        "Designed automated ETL pipelines processing 2M+ entity updates monthly with schema validation.",
        "Presented at an international AI panel attended by experts from India and the US — received commendation for technical leadership.",
      ],
      technologies: ["Python", "NebulaGraph", "LlamaIndex", "GraphRAG", "Docker", "FastAPI"],
      type: "research",
    },
    {
      title: "Campus Strategist",
      company: "Perplexity AI",
      period: "Jan 2025 – Apr 2025",
      location: "Salt Lake City, UT",
      description: [
        "Spearheaded campus-wide outreach programs to drive adoption of Perplexity's AI-powered search platform among students, faculty, and university clubs.",
        "Onboarded 150+ Perplexity Pro users, facilitating seamless onboarding and sustained long-term engagement.",
      ],
      technologies: ["AI Advocacy", "Community Building", "Growth"],
      type: "campus",
    },
    {
      title: "Community Advisor",
      company: "University of Utah Housing & Residential Education",
      period: "Aug 2024 – Dec 2024",
      location: "Salt Lake City, UT",
      description: [
        "Ensured the safety and well-being of residential housing communities, providing conflict mediation, crisis response, and student support services for a 200+ resident community.",
      ],
      technologies: ["Leadership", "Crisis Management", "Community"],
      type: "campus",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Utah",
      period: "Aug 2023 – Dec 2026",
      location: "Salt Lake City, UT",
      gpa: "3.7/4.0 (Dean's List)",
      coursework: ["Machine Learning", "Computer Vision", "NLP", "Distributed Systems", "Algorithms & Data Structures"],
    },
    {
      degree: "High School Diploma",
      institution: "Krishna Public School",
      period: "2017 – 2023",
      location: "Raipur, India",
      gpa: null,
      coursework: [],
    },
  ]

  return (
    <div className="space-y-20" ref={containerRef}>
      {/* Experience Section */}
      <div className="relative ml-3 md:ml-6 space-y-10 pl-8 md:pl-12">
        {/* Growing Timeline Line */}
        <div className="absolute left-0 top-2 bottom-0 w-px bg-border/30">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-primary via-primary/50 to-transparent"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute -left-[4px] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
        />
        <div className="flex items-center gap-3 mb-8 -ml-8 md:-ml-12">
          <span className="bg-background px-2 text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Experience_Log.json
          </span>
        </div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            {/* Pulsing Node */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -left-[37px] md:-left-[53px] top-6 h-2 w-2 rounded-full border border-border bg-background group-hover:bg-accent group-hover:border-accent transition-colors z-10"
            >
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-0 group-hover:opacity-100" />
            </motion.div>

            <Card className="glass-card border-none bg-background/40 hover:bg-background/60 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <CardTitle className="font-serif text-xl font-medium group-hover:text-primary transition-colors leading-snug">
                        {exp.title}
                      </CardTitle>
                      {exp.active && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                          Active
                        </span>
                      )}
                    </div>
                    <CardDescription className="text-sm font-sans text-foreground/70 mt-0.5">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end text-xs font-mono text-muted-foreground gap-1 shrink-0">
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </div>
                    <span className={`text-[10px] font-mono rounded-full px-2 py-0.5 capitalize ${typeBadgeStyles[exp.type]}`}>
                      {exp.type}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground/90 font-light leading-relaxed text-sm">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/40 hover:bg-secondary/60 text-secondary-foreground text-xs font-mono font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Education Section */}
      <div className="relative ml-3 md:ml-6 space-y-10 pl-8 md:pl-12 pt-8">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute -left-[4px] top-8 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background z-10"
        />
        <div className="flex items-center gap-3 mb-8 -ml-8 md:-ml-12">
          <span className="bg-background px-2 text-sm font-mono text-muted-foreground uppercase tracking-widest">
            Education_History
          </span>
        </div>

        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="absolute -left-[37px] md:-left-[53px] top-6 h-2 w-2 rounded-full border border-border bg-background group-hover:bg-accent group-hover:border-accent transition-colors z-10"
            />

            <Card className="glass-card border-none bg-background/40 hover:bg-background/60 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <CardTitle className="font-serif text-xl font-medium">
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="text-sm font-sans text-foreground/80 mt-0.5">
                      {edu.institution} · {edu.location}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                    <span className="text-xs font-mono text-muted-foreground bg-secondary/30 px-2 py-1 rounded">{edu.period}</span>
                    {edu.gpa && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              {edu.coursework.length > 0 && (
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, i) => (
                        <Badge key={i} variant="outline" className="border-border/50 text-muted-foreground text-xs font-mono font-normal">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
