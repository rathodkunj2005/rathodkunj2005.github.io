import Link from "next/link"
import { HeroScene } from "@/components/hero-scene"
import { HeroContent, ScrollIndicator } from "@/components/hero-content"
import { Navigation } from "@/components/navigation"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Publications } from "@/components/publications"
import { FeaturedPosts } from "@/components/featured-posts"
import { Contact } from "@/components/contact"
import { Marquee } from "@/components/marquee"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[95vh] w-full flex flex-col items-center justify-center overflow-hidden">
          <HeroScene />
          <HeroContent />
          <ScrollIndicator />
        </section>

        {/* Marquee Strip */}
        <Marquee />

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4 gradient-bg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Experience &amp; Education</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From hospital AI platforms and legal research tools to aerospace materials discovery and embodied agents
              </p>
            </div>
            <Experience />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-driven systems, hackathon winners, and research tools at scale
              </p>
            </div>
            <Projects />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 gradient-bg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Technical Skills</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Languages, frameworks, databases, and tools I work with daily
              </p>
            </div>
            <Skills />
          </div>
        </section>

        {/* Writing & Publications Section */}
        <section id="writing" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Writing &amp; Publications</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Technical articles, research reports, and open knowledge sharing
              </p>
            </div>
            <Publications />
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 px-4 gradient-bg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Latest Blog Posts</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Thoughts and insights on AI, cloud technologies, and software development
              </p>
            </div>
            <FeaturedPosts />
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="interactive-button glass-nav">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Open to new opportunities and collaborations in AI and software engineering
              </p>
            </div>
            <Contact />

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              <Button asChild variant="outline" size="lg" className="interactive-button glass-nav">
                <a href="https://github.com/rathodkunj2005" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="interactive-button glass-nav">
                <a href="https://linkedin.com/in/rathodkunj" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-4">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p className="text-lg">© {new Date().getFullYear()} Kunj Rathod. All rights reserved.</p>
          <p className="text-sm mt-2">Built with Next.js, Tailwind CSS, and lots of ☕</p>
        </div>
      </footer>
    </div>
  )
}
