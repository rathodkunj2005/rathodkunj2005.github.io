import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "BioGraphRAG",
      period: "May 2024 - Nov 2024",
      description: [
        "Assisted in Developing a Graph RAG system integrating UniProt, AlphaFold, RXNav, and Nebula Graph for enriched medical data retrieval and decision support using Python, Docker, and Llama Index.",
        "Conducted node degree analysis to optimize performance, reducing retrieval and generation latency in complex knowledge graphs.",
        "Managed development using VS Code, GitHub, and containerized deployment with Docker for scalable real-time applications in critical medical environments.",
      ],
      technologies: ["Python", "Docker", "Llama Index", "Nebula Graph", "RAG"],
      github: "#",
      demo: "#",
    },
    {
      title: "Multi-Agent Collaboration for Financial Analysis",
      period: "Nov 2024 - Nov 2024",
      description: [
        "Engineered a collaborative AI system with multiple specialized agents: Data Analyst, Trading Strategy Developer, Trade Advisor, and Risk Advisor, using crewai and langlechain.",
        "Designed a hierarchical process flow using a manager LLVM to oversee tasks, enabling efficient collaboration and decision-making in real-time financial analysis.",
      ],
      technologies: ["crewai", "langchain", "LLM", "Multi-Agent Systems"],
      github: "#",
      demo: "#",
    },
    {
      title: "Investment Risk Assessment Using Reinforcement Learning",
      period: "March 2025 (HackUSU 2025)",
      description: [
        "Developed an AI-powered investment recommendation system using DistillBERT for sentiment analysis and Reinforcement Learning (DQN & PPO) for stock portfolio optimization.",
        "Built a RESTful API with Flask to deliver personalized stock suggestions based on user input (investment amount, duration, and risk tolerance).",
      ],
      technologies: ["Python", "DistillBERT", "Reinforcement Learning", "Flask", "REST API"],
      github: "#",
      demo: "#",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Card key={index} className="flex flex-col h-full">
          <CardHeader>
            <div className="flex flex-col gap-2">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.period}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="list-disc pl-5 space-y-2 mb-4">
              {project.description.map((item, i) => (
                <li key={i} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Demo
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

