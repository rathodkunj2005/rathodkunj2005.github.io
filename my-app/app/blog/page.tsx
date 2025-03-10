import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

// In a real app, this would come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "Building Effective RAG Systems for Medical Data",
    excerpt:
      "Lessons learned from developing BioGraphRAG and optimizing retrieval for complex medical knowledge graphs.",
    date: "March 1, 2025",
    readTime: "8 min read",
    slug: "building-effective-rag-systems",
    category: "AI & Data",
  },
  {
    id: 2,
    title: "Multi-Agent AI Systems: Architecture and Implementation",
    excerpt:
      "How to design collaborative AI systems with specialized agents for complex tasks like financial analysis.",
    date: "February 20, 2025",
    readTime: "10 min read",
    slug: "multi-agent-ai-systems",
    category: "AI & Data",
  },
  {
    id: 3,
    title: "Reinforcement Learning for Financial Applications",
    excerpt: "Exploring DQN and PPO algorithms for portfolio optimization and investment risk assessment.",
    date: "February 5, 2025",
    readTime: "7 min read",
    slug: "reinforcement-learning-finance",
    category: "AI & Finance",
  },
]

export default function BlogPage() {
  // Ensure blogPosts is an array
  const posts = Array.isArray(blogPosts) ? blogPosts : []

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts and insights on AI, cloud technologies, and software development
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="text-sm font-medium text-primary mb-2">{post.category}</div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {post.date} · {post.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="max-w-5xl mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Kunj Rathod. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

