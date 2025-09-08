"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, GraduationCap, Award, Calendar } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Experience() {
  const workExperienceRef = useScrollReveal()
  const educationRef = useScrollReveal()
  
  const experiences = [
    {
      title: "Software Development Intern – AI Services",
      company: "University of Utah SUDO Program",
      period: "Jan 2025 – Present",
      location: "Salt Lake City, UT",
      description: [
        "Developed a HIPAA-conscious chat platform with a React frontend and scalable AWS backend (Lambda, S3, Bedrock) to provide hospital staff with secure, streamlined access to medical insights from custom LLMs.",
        "Engineered major performance gains, reducing inference latency by 40% and data query speed by 60% through AWS Bedrock pipeline optimization, API caching, and a DynamoDB-RDS hybrid database strategy.",
        "Spearheaded the integration of interactive data visualization tools into the LLM chat interface, enabling real-time analytics on hospital data within conversational flows.",
      ],
      technologies: ["React", "AWS Lambda", "AWS S3", "AWS Bedrock", "DynamoDB", "RDS", "HIPAA"],
    },
    {
      title: "Undergraduate Researcher – AI & Aerospace Materials",
      company: "STARS Lab, University of Utah",
      period: "Aug 2025 – Present",
      location: "Salt Lake City, UT",
      description: [
        "Advancing AI-driven materials discovery by developing ML pipelines for high-throughput experimentation, computational modeling, and aerospace materials design.",
        "Integrating large language models (LLMs) and multi-agent AI systems to streamline knowledge sharing, automate literature mining, and enhance decision support across interdisciplinary research teams.",
        "Collaborating with cross-domain experts in computer science and materials engineering to design AI workflows that accelerate research in rocket engines, hypersonics, and in-space manufacturing.",
      ],
      technologies: ["Python", "ML Pipelines", "LLMs", "Multi-Agent Systems", "NASA", "MIT", "Microsoft", "DoD"],
    },
    {
      title: "AI Engineering Intern",
      company: "CourtEasy.ai",
      period: "Nov 2024 – Apr 2025",
      location: "Remote",
      description: [
        "Processed 10M+ Indian legal documents (statutes, court orders) for ingestion pipelines and built task-specific RAG systems for tasks like Legal-NER, boosting retrieval accuracy by 28% and reducing hallucinations by 35%.",
        "Evaluated 3 LLM families (InLegalBERT, InLegalLLaMA, GPT-4o-mini) on 4 legal benchmarks including Legal-Bench and NyayaAnumana, analyzing performance on F1 score, latency, and token-level cost metrics.",
        "Synthesized insights from 15+ research papers on legal AI and co-authored a comparative analysis that directly informed the refinement of the team's LegalBench-RAG workflows and evaluation protocols.",
      ],
      technologies: ["RAG", "Legal-NER", "InLegalBERT", "InLegalLLaMA", "GPT-4o-mini", "LegalBench", "NyayaAnumana"],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Utah",
      period: "Aug 2023 – May 2027",
      location: "Salt Lake City, UT",
      gpa: "3.7/4.0 (Dean's list)",
      coursework: ["ML", "CV", "NLP", "Data Structures & Algorithms", "Object-Oriented Programming", "Database Systems"],
    },
  ]

  return (
    <div className="space-y-16">
      {/* Work Experience */}
      <div ref={workExperienceRef} className="scroll-reveal">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-8 w-8 text-primary" />
          <h3 className="text-3xl font-bold">Work Experience</h3>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="glass-card interactive-card group">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-primary mb-1">
                      {exp.company}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="glass">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education */}
      <div ref={educationRef} className="scroll-reveal">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h3 className="text-3xl font-bold">Education</h3>
        </div>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <Card key={index} className="glass-card interactive-card group">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-primary mb-1">
                      {edu.institution}
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, i) => (
                      <Badge key={i} variant="outline" className="glass">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

