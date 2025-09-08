import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Code, Brain, Cloud, Database, Globe, Smartphone } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      name: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 90 },
        { name: "C++", level: 85 },
        { name: "C#", level: 80 },
        { name: "Swift", level: 75 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "SQL", level: 80 },
      ],
    },
    {
      name: "AI/ML Technologies",
      icon: Brain,
      skills: [
        { name: "RAG/GraphRAG", level: 95 },
        { name: "LLMs", level: 90 },
        { name: "Multi-Agent Systems", level: 85 },
        { name: "LangChain", level: 90 },
        { name: "LlamaIndex", level: 85 },
        { name: "TensorFlow", level: 80 },
        { name: "OpenAI API", level: 95 },
        { name: "Ollama", level: 75 },
      ],
    },
    {
      name: "Cloud & Infrastructure",
      icon: Cloud,
      skills: [
        { name: "AWS Bedrock", level: 90 },
        { name: "AWS Lambda", level: 85 },
        { name: "AWS S3", level: 90 },
        { name: "AWS RDS", level: 80 },
        { name: "DynamoDB", level: 75 },
        { name: "Docker", level: 85 },
        { name: "Firebase", level: 90 },
        { name: "REST APIs", level: 95 },
      ],
    },
    {
      name: "Frameworks & Databases",
      icon: Database,
      skills: [
        { name: "React", level: 90 },
        { name: "Flask", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "PostgreSQL", level: 85 },
        { name: "Vector Databases", level: 80 },
        { name: "NebulaGraph", level: 75 },
      ],
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      skills: [
        { name: "SwiftUI", level: 85 },
        { name: "Combine", level: 80 },
        { name: "MVVM", level: 90 },
        { name: "iOS Development", level: 85 },
      ],
    },
    {
      name: "Web Technologies",
      icon: Globe,
      skills: [
        { name: "Next.js", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML/CSS", level: 90 },
        { name: "Responsive Design", level: 95 },
      ],
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((category, index) => {
        const IconComponent = category.icon
        return (
          <Card key={index} className="glass-card interactive-card group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={skill.level} 
                        className="h-2 bg-muted/50"
                      />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

