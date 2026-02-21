"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function Skills() {
  const skillCategories = [
    {
      name: "Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "TypeScript / JavaScript", level: 88 },
        { name: "Java", level: 85 },
        { name: "C++", level: 82 },
        { name: "Swift", level: 78 },
        { name: "SQL", level: 80 },
      ],
    },
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "RAG / GraphRAG", level: 95 },
        { name: "LLMs / Transformers", level: 92 },
        { name: "Multi-Agent Systems", level: 88 },
        { name: "LangChain / LlamaIndex", level: 90 },
        { name: "CrewAI", level: 85 },
        { name: "PyTorch / TensorFlow", level: 80 },
      ],
    },
    {
      name: "Cloud & Infrastructure",
      skills: [
        { name: "AWS (Lambda, Bedrock, S3)", level: 88 },
        { name: "Docker / Kubernetes", level: 82 },
        { name: "Microservices / Event-Driven", level: 80 },
        { name: "Firebase", level: 78 },
      ],
    },
    {
      name: "Web & Mobile",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "SwiftUI (iOS)", level: 78 },
        { name: "Flask / FastAPI", level: 88 },
        { name: "Tailwind CSS", level: 92 },
      ],
    },
    {
      name: "Databases",
      skills: [
        { name: "PostgreSQL / MySQL", level: 82 },
        { name: "DynamoDB", level: 80 },
        { name: "NebulaGraph", level: 78 },
        { name: "ChromaDB / Pinecone", level: 85 },
      ],
    },
    {
      name: "Developer Tools",
      skills: [
        { name: "Git / GitHub", level: 95 },
        { name: "Docker", level: 85 },
        { name: "Vercel / CI/CD", level: 85 },
        { name: "VS Code / Postman", level: 90 },
      ],
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="h-full border border-border/60 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300">
            <CardHeader className="pb-4 border-b border-border/40">
              <CardTitle className="font-serif text-lg font-medium tracking-tight">
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-mono text-muted-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground/50">{skill.level}%</span>
                    </div>
                    <div className="relative h-[3px] w-full bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + (i * 0.06) }}
                        className="absolute h-full bg-primary/75 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
