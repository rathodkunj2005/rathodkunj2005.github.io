"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function Skills() {
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 90 },
        { name: "C++", level: 85 },
        { name: "TypeScript", level: 85 },
        { name: "SQL", level: 80 },
      ],
    },
    {
      name: "AI & Machine Learning",
      skills: [
        { name: "RAG Systems", level: 95 },
        { name: "LLMs / Transformers", level: 90 },
        { name: "Multi-Agent Systems", level: 85 },
        { name: "PyTorch / TensorFlow", level: 80 },
      ],
    },
    {
      name: "Cloud & Infrastructure",
      skills: [
        { name: "AWS (Lambda, Bedrock)", level: 90 },
        { name: "Docker / Kubernetes", level: 85 },
        { name: "Distributed Systems", level: 80 },
      ],
    },
    {
      name: "Web & Mobile",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "SwiftUI (iOS)", level: 85 },
      ],
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full border border-border/60 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4 border-b border-border/40">
              <CardTitle className="font-serif text-xl font-medium tracking-tight">
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-mono text-muted-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground/60">{skill.level}%</span>
                    </div>
                    <div className="relative h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (i * 0.05) }}
                        className="absolute h-full bg-primary/80"
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
