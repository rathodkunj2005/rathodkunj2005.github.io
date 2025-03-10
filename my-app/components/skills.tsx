import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: ["Java", "C#", "C++", "Python", "JavaScript", "HTML", "CSS"],
    },
    {
      name: "AI & Machine Learning",
      skills: ["RAGs", "Machine Learning", "Multi-Agentic LLM application", "Reinforcement Learning"],
    },
    {
      name: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "REST APIs", "Linux servers"],
    },
    {
      name: "Other Skills",
      skills: ["Algorithms", "Data Structures", "Debugging", "Web Development", "Leadership"],
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {skillCategories.map((category, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-sm py-1.5">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

