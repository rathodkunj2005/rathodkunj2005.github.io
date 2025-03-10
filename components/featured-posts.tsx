import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredPosts = [
  {
    id: 1,
    title: "Building Effective RAG Systems for Medical Data",
    excerpt:
      "Lessons learned from developing BioGraphRAG and optimizing retrieval for complex medical knowledge graphs.",
    date: "March 1, 2025",
    readTime: "8 min read",
    slug: "building-effective-rag-systems",
  },
  {
    id: 2,
    title: "Multi-Agent AI Systems: Architecture and Implementation",
    excerpt:
      "How to design collaborative AI systems with specialized agents for complex tasks like financial analysis.",
    date: "February 20, 2025",
    readTime: "10 min read",
    slug: "multi-agent-ai-systems",
  },
  {
    id: 3,
    title: "Reinforcement Learning for Financial Applications",
    excerpt: "Exploring DQN and PPO algorithms for portfolio optimization and investment risk assessment.",
    date: "February 5, 2025",
    readTime: "7 min read",
    slug: "reinforcement-learning-finance",
  },
]

export function FeaturedPosts() {
  // Ensure featuredPosts is an array
  const posts = Array.isArray(featuredPosts) ? featuredPosts : []

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            <CardDescription>
              {post.date} · {post.readTime}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-primary">
              Read more <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

