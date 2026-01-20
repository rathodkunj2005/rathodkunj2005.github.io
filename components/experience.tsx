"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const experiences = [
    {
      title: "Incoming Software Engineering Intern, Full Stack",
      company: "Microsoft Azure Data",
      period: "Summer 2026",
      location: "Redmond, WA",
      description: [
        "Joining the Azure Data team to build scalable cloud solutions.",
        "Focusing on distributed systems and full-stack development within the Azure ecosystem."
      ],
      technologies: ["Azure", "Cloud Computing", "Full Stack", "Distributed Systems"],
      type: "industry"
    },
    {
      title: "Software Development Intern – AI Services",
      company: "University of Utah SUDO Program",
      period: "Jan 2025 – Present",
      location: "Salt Lake City, UT",
      description: [
        "Developed a HIPAA-conscious chat platform with a React frontend and scalable AWS backend (Lambda, S3, Bedrock) providing secure medical insights.",
        "Engineered performance gains reducing inference latency by 40% through AWS Bedrock optimization and API caching.",
        "Integrated interactive data visualization tools into the LLM chat interface for real-time analytics."
      ],
      technologies: ["React", "AWS Lambda", "AWS Bedrock", "DynamoDB", "HIPAA"],
      type: "industry"
    },
    {
      title: "Undergraduate Researcher – AI & Aerospace Materials",
      company: "STARS Lab, University of Utah",
      period: "Aug 2025 – Present",
      location: "Salt Lake City, UT",
      description: [
        "Developing ML pipelines for high-throughput materials discovery and computational modeling.",
        "Integrating LLMs and multi-agent systems to automate literature mining and streamline research knowledge sharing.",
        "Collaborating with materials engineers to accelerate research in rocket engines and hypersonics.",
        "Built a custom RAG chatbot (Ref-RAG) using LangChain and Chainlit to extract information from unorganized PDF datasets."
      ],
      technologies: ["Python", "ML Pipelines", "LLMs", "Multi-Agent Systems"],
      type: "research"
    },
    {
      title: "AI Engineering Intern",
      company: "CourtEasy.ai",
      period: "Nov 2024 – Apr 2025",
      location: "Remote",
      description: [
        "Built RAG systems for legal tasks (Legal-NER) on 10M+ documents, boosting retrieval accuracy by 28%.",
        "Evaluated InLegalBERT and GPT-4o-mini on legal benchmarks, analyzing F1 score and latency.",
        "Co-authored a comparative analysis paper informing workflows and evaluation protocols."
      ],
      technologies: ["RAG", "Legal-NER", "LLMs", "LegalBench", "Python"],
      type: "industry"
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Utah",
      period: "Aug 2023 – May 2027",
      location: "Salt Lake City, UT",
      gpa: "3.7/4.0 (Dean's list)",
      coursework: ["Machine Learning", "Computer Vision", "NLP", "Distributed Systems", "Algorithms"],
    },
  ]

  return (
    <div className="space-y-20" ref={containerRef}>
      {/* Experience Section */}
      <div className="relative ml-3 md:ml-6 space-y-12 pl-8 md:pl-12">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
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
                  <div>
                    <CardTitle className="font-serif text-2xl font-medium group-hover:text-primary transition-colors">
                      {exp.title}
                    </CardTitle>
                    <CardDescription className="text-base font-sans text-foreground/80 mt-1">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-start md:items-end text-xs font-mono text-muted-foreground gap-1">
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-muted-foreground/90 font-light leading-relaxed text-sm md:text-base">
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
      <div className="relative ml-3 md:ml-6 space-y-12 pl-8 md:pl-12 pt-8">
        {/* Cont. Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30"></div>

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
                    <CardTitle className="font-serif text-2xl font-medium">
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="text-base font-sans text-foreground/80 mt-1">
                      {edu.institution}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
              </CardHeader>
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
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
