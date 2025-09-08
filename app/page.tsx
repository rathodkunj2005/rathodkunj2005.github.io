import Link from "next/link"
import { HeroScene } from "@/components/hero-scene"
import { Navigation } from "@/components/navigation"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { FeaturedPosts } from "@/components/featured-posts"
import { Contact } from "@/components/contact"
import { Button } from "@/components/ui/button"
import { ArrowDown, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative h-[100vh] w-full flex items-center justify-center">
          <HeroScene />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 gradient-text text-shadow-lg">
                Kunj Rathod
              </h1>
              <p className="text-xl md:text-3xl max-w-2xl mx-auto text-muted-foreground mb-8 font-light">
                Computer Science Student & AI Engineer
              </p>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-12 leading-relaxed">
                Specializing in AI/ML, Cloud Technologies, and Full-Stack Development
              </p>
            </div>
            
            <div className="animate-slide-up flex flex-wrap justify-center gap-6 mt-8">
              <Button asChild size="lg" className="interactive-button glass-nav">
                <Link href="#experience">View Experience</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="interactive-button glass-nav">
                <Link href="#projects">See Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="interactive-button glass-nav">
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="animate-fade-in mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 glass-nav px-4 py-2 rounded-full">
                <Mail className="h-4 w-4" />
                <span>kunj.rathod@utah.edu</span>
              </div>
              <div className="flex items-center gap-2 glass-nav px-4 py-2 rounded-full">
                <Phone className="h-4 w-4" />
                <span>+1 (385) 202-8879</span>
              </div>
              <div className="flex items-center gap-2 glass-nav px-4 py-2 rounded-full">
                <MapPin className="h-4 w-4" />
                <span>Salt Lake City, UT</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4 gradient-bg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Experience & Education</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Building AI solutions and advancing research in computer science
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
                AI-driven applications and innovative solutions
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
                Technologies and tools I work with
              </p>
            </div>
            <Skills />
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-24 px-4">
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
        <section id="contact" className="py-24 px-4 gradient-bg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Get In Touch</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's collaborate on innovative AI solutions
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

