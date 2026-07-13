import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { blogPosts, getBlogPost } from "@/lib/blog-posts"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

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
              {post.date} · {post.readTime} · Originally published on {post.source}
            </div>
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-10 pt-6 border-t">
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Read the full article on Substack <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </div>
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
