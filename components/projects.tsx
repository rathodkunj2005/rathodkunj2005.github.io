import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Calendar, Code, Zap } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "Wingman.ai - AI Personal Assistant Mobile App",
      period: "Apr 2025 – Present",
      description: [
        "Implemented a multi-modal AI core using OpenAI APIs (GPT-4o, Whisper) and a RAG system to deliver context-aware, personalized responses from chat, voice, and image inputs.",
        "Architected a scalable backend with Firebase, integrating Authentication for secure sign-in, Cloud Storage for media, and Realtime Database for seamless, low-latency data synchronization.",
        "Engineered a robust and responsive UI in SwiftUI using MVVM and Combine, separating concerns into distinct services (e.g., audio, API) to ensure a fluid user experience.",
      ],
      technologies: ["SwiftUI", "OpenAI API", "Firebase", "Combine", "MVVM", "RAG"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      status: "In Progress",
      category: "Mobile App",
    },
    {
      title: "BioGraphRAG: Biomedical Knowledge Graph Retrieval",
      period: "May 2024 – Jan 2025",
      description: [
        "Architected a distributed GraphRAG system leveraging NebulaGraph to manage and query 1M+ biomedical entities, enabling the extraction of accurate, explainable insights from complex data.",
        "Built a robust ETL pipeline ingesting data from 5+ sources (UniProt, AlphaFold) and integrated LlamaIndex with the knowledge graph to augment LLM responses, effectively reducing hallucinations.",
        "Optimized graph traversal by 3x through strategic caching and high-degree node analysis, and designed an interactive Chainlit frontend for users to visualize complex biomedical relationships.",
      ],
      technologies: ["Python", "NebulaGraph", "LlamaIndex", "Docker", "AWS", "Chainlit"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      status: "Completed",
      category: "AI/ML Research",
    },
    {
      title: "Multi-Agent Collaboration for Financial Analysis",
      period: "Nov 2024 – Nov 2024",
      description: [
        "Engineered a collaborative AI system with multiple specialized agents: Data Analyst, Trading Strategy Developer, Trade Advisor, and Risk Advisor, using crewai and langlechain.",
        "Designed a hierarchical process flow using a manager LLVM to oversee tasks, enabling efficient collaboration and decision-making in real-time financial analysis.",
      ],
      technologies: ["crewai", "langchain", "LLM", "Multi-Agent Systems", "Financial Analysis"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      status: "Completed",
      category: "AI/ML",
    },
    {
      title: "Investment Risk Assessment Using Reinforcement Learning",
      period: "March 2025 (HackUSU 2025)",
      description: [
        "Developed an AI-powered investment recommendation system using DistillBERT for sentiment analysis and Reinforcement Learning (DQN & PPO) for stock portfolio optimization.",
        "Built a RESTful API with Flask to deliver personalized stock suggestions based on user input (investment amount, duration, and risk tolerance).",
      ],
      technologies: ["Python", "DistillBERT", "Reinforcement Learning", "Flask", "REST API", "DQN", "PPO"],
      github: "https://github.com/rathodkunj2005",
      demo: "#",
      status: "Hackathon Winner",
      category: "AI/ML",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
      case "Completed":
        return "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
      case "Hackathon Winner":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <Card key={index} className="glass-card interactive-card group h-full flex flex-col">
          <CardHeader>
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <Badge 
                  variant="outline" 
                  className={`glass text-xs font-medium ${getStatusColor(project.status)}`}
                >
                  {project.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span>{project.category}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <ul className="list-disc pl-6 space-y-3 mb-6">
              {project.description.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="glass text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="flex-1 interactive-button glass"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> 
                GitHub
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="flex-1 interactive-button glass"
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> 
                Demo
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

