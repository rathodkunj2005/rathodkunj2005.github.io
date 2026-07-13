import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"

export function FeaturedPosts() {
  return (
    <div className="border-t border-border">
      {blogPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block py-5 border-b border-border md:grid md:grid-cols-[150px_1fr] md:gap-8 hover:bg-secondary/40 transition-colors"
        >
          <div className="md:text-right">
            <p className="font-mono text-xs text-muted-foreground tabular">{post.shortDate}</p>
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
