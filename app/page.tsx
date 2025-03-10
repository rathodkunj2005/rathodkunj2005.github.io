import Link from "next/link"
import { HeroScene } from "@/components/hero-scene"
import { Navigation } from "@/components/navigation"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { FeaturedPosts } from "@/components/featured-posts"
import { Contact } from "@/components/contact"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <section className="relative h-[90vh] w-full">
          <HeroScene />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Kunj Rathod</h1>
            <p className="text-xl md:text-2xl max-w-md mx-auto text-muted-foreground mb-4">
              Computer Science Student & AI Enthusiast
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button asChild>
                <Link href="#experience">View Experience</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#projects">See Projects</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>
        </section>

        <section id="experience" className="py-20 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience & Education</h2>
            <Experience />
          </div>
        </section>

        <section id="projects" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <Projects />
          </div>
        </section>

        <section id="skills" className="py-20 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
            <Skills />
          </div>
        </section>

        <section id="blog" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Latest Blog Posts</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Thoughts and insights on AI, cloud technologies, and software development
            </p>
            <FeaturedPosts />
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
            <Contact />
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="max-w-5xl mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Kunj Rathod. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

