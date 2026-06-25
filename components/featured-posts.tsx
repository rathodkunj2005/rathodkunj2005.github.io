import Link from "next/link"

const featuredPosts = [
  {
    id: 1,
    title: "Building Effective RAG Systems for Medical Data",
    excerpt:
      "Lessons learned from developing BioGraphRAG and optimizing retrieval for complex medical knowledge graphs.",
    date: "Mar 2025",
    readTime: "8 min",
    slug: "building-effective-rag-systems",
  },
  {
    id: 2,
    title: "Multi-Agent AI Systems: Architecture and Implementation",
    excerpt:
      "How to design collaborative AI systems with specialized agents for complex tasks like financial analysis.",
    date: "Feb 2025",
    readTime: "10 min",
    slug: "multi-agent-ai-systems",
  },
  {
    id: 3,
    title: "Reinforcement Learning for Financial Applications",
    excerpt: "Exploring DQN and PPO algorithms for portfolio optimization and investment risk assessment.",
    date: "Feb 2025",
    readTime: "7 min",
    slug: "reinforcement-learning-finance",
  },
]

export function FeaturedPosts() {
  return (
    <div className="border-t border-border">
      {featuredPosts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="group block py-5 border-b border-border md:grid md:grid-cols-[150px_1fr] md:gap-8 hover:bg-secondary/40 transition-colors"
        >
          <div className="md:text-right">
            <p className="font-mono text-xs text-muted-foreground tabular">{post.date}</p>
            <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5">{post.readTime}</p>
          </div>
          <div className="max-w-2xl mt-1.5 md:mt-0">
            <h3 className="font-serif text-lg leading-snug group-hover:text-accent transition-colors">
              {post.title}
              <span className="font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
            </h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-1">{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
