import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Experience() {
  const experiences = [
    {
      title: "SUDO Hardware Platform Services Student Intern",
      company: "University of Utah",
      period: "Jan 2025 – Present",
      description: [
        "Worked with the Hardware Platform Services team, supporting the deployment and optimization of Gen-AI AWS Bedrock and AWS Lambda applications for the university and UHealth.",
        "Assisted in configuring and maintaining cloud infrastructure to ensure smooth operation of Gen-AI driven applications.",
        "Collaborated with cross-functional teams to integrate and troubleshoot AWS services for research, healthcare, and educational needs.",
      ],
    },
    {
      title: "AI Residency/Intern",
      company: "CourtEasy.ai",
      period: "Nov 2024 - Present",
      description: [
        "Collaborated with domain experts to build and deploy AI-driven solutions using domain-aligned LLMs with a focus on scalability and performance optimization using RAGs.",
        "Utilized CourtEasy's advanced API platform to integrate various AI models through REST APIs, ensuring optimized deployment for high-performance applications.",
      ],
    },
    {
      title: "Campus Strategist",
      company: "Perplexity",
      period: "Jan 2025 – Present",
      description: [
        "Conduct outreach at the University of Utah to promote Perplexity's services.",
        "Facilitate access to Perplexity's Pro-tier search for students, clubs, and professors.",
        "Establish partnerships to enhance campus engagement with Perplexity's resources.",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "University of Utah",
      period: "Aug 2023 - Jul 2026",
    },
  ]

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-semibold mb-6">Work Experience</h3>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <CardTitle>{exp.title}</CardTitle>
                    <CardDescription className="text-base">{exp.company}</CardDescription>
                  </div>
                  <Badge variant="outline" className="md:ml-auto shrink-0">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6">Education</h3>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <CardTitle>{edu.degree}</CardTitle>
                    <CardDescription className="text-base">{edu.institution}</CardDescription>
                  </div>
                  <Badge variant="outline" className="md:ml-auto shrink-0">
                    {edu.period}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

