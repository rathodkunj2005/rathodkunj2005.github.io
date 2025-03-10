import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"

// In a real app, this would come from a database or CMS
const blogPosts = {
  "building-effective-rag-systems": {
    title: "Building Effective RAG Systems for Medical Data",
    date: "March 1, 2025",
    readTime: "8 min read",
    category: "AI & Data",
    content: `
      <p>Retrieval Augmented Generation (RAG) systems have revolutionized how we leverage large language models for domain-specific applications. In the medical field, where accuracy and context are paramount, RAG systems offer a powerful approach to enhance AI capabilities while maintaining precision.</p>
      
      <h2>The Challenge of Medical Data</h2>
      
      <p>Medical data presents unique challenges for AI systems. The terminology is complex, relationships between concepts are intricate, and the stakes for accuracy are incredibly high. Traditional vector-based retrieval systems often struggle with capturing the nuanced relationships in medical knowledge.</p>
    `,
  },
  "multi-agent-ai-systems": {
    title: "Multi-Agent AI Systems: Architecture and Implementation",
    date: "February 20, 2025",
    readTime: "10 min read",
    category: "AI & Data",
    content: `
      <p>Multi-agent AI systems represent a paradigm shift in how we approach complex problem-solving with artificial intelligence. By decomposing tasks among specialized agents, these systems can tackle problems that would be challenging for a single model to handle effectively.</p>
      
      <h2>The Power of Specialization</h2>
      
      <p>In our financial analysis system, we implemented four specialized agents, each with a distinct role.</p>
    `,
  },
  "reinforcement-learning-finance": {
    title: "Reinforcement Learning for Financial Applications",
    date: "February 5, 2025",
    readTime: "7 min read",
    category: "AI & Finance",
    content: `
      <p>Reinforcement learning offers powerful approaches for financial modeling and decision-making.</p>
    `,
  },
}

export default function BlogPost({ params }) {
  // Safely handle params
  if (!params || typeof params !== "object") {
    notFound()
  }

  const slug = params.slug

  // Safely handle slug
  if (!slug || typeof slug !== "string") {
    notFound()
  }

  const post = blogPosts[slug]

  // If post doesn't exist, show 404
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-20 pb-16">
        <article className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
          </Link>

          <header className="mb-8">
            <div className="text-sm font-medium text-primary mb-2">{post.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-muted-foreground">
              {post.date} · {post.readTime}
            </div>
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="max-w-5xl mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Kunj Rathod. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

