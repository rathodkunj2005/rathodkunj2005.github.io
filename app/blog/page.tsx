import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"

export default function BlogPage() {
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
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col h-full">
                <CardHeader>
                  <div className="text-sm font-medium text-primary mb-2">{post.category}</div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {post.date} · {post.readTime} · {post.source}
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
