import { Masthead } from "@/components/masthead"
import { Navigations } from "@/components/navigation"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Publications } from "@/components/publications"
import { FeaturedPosts } from "@/components/featured-posts"
import { Contact } from "@/components/contact"
import Link from "next/link"

function SectionHeading({
  mark,
  title,
  note,
}: {
  mark: string
  title: string
  note?: string
}) {
  return (
    <div className="mb-10 md:mb-12">
      <div className="rule-double pt-4" />
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="section-mark">{mark}</span>
        <h2 className="font-serif text-3xl md:text-4xl tracking-tight">{title}</h2>
        {note && (
          <span className="font-sans italic text-sm text-muted-foreground ml-auto">{note}</span>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigations />
      <main className="pt-14 pb-8">
        <p className="sr-only">
          Hi, I&rsquo;m Kunj Rathod, an AI engineer and researcher working on LLM/RAG systems in
          healthcare and legal tech.
        </p>

        <Masthead />

        {/* §1 Experience */}
        <section id="experience" className="max-w-5xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-20">
          <SectionHeading mark="§1" title="Experience" note="industry, research, campus — 2024 to present" />
          <Experience />
        </section>

        {/* §2 Selected Work */}
        <section id="projects" className="max-w-5xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-20">
          <SectionHeading mark="§2" title="Selected Work" note="figures 01–10, in order of recency" />
          <Projects />
        </section>

        {/* §3 Writing */}
        <section id="writing" className="max-w-5xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-20">
          <SectionHeading mark="§3" title="Writing & References" />
          <Publications />

          <div id="blog" className="mt-16 scroll-mt-20">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground mb-5">
              <span className="text-accent">3.1</span> Selected notes
            </p>
            <FeaturedPosts />
            <p className="mt-5 font-mono text-xs">
              <Link href="/blog" className="ref-link">
                view all posts →
              </Link>
            </p>
          </div>
        </section>

        {/* Appendix A — Skills */}
        <section id="skills" className="max-w-5xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-20">
          <SectionHeading mark="A" title="Appendix: Proficiencies" />
          <Skills />
        </section>

        {/* Correspondence */}
        <section id="contact" className="max-w-5xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-20">
          <SectionHeading mark="✉" title="Correspondence" />
          <Contact />
        </section>
      </main>

      {/* Colophon */}
      <footer className="max-w-5xl mx-auto px-5 md:px-8 mt-20 pb-12">
        <div className="rule-double pt-4" />
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Kunj Rathod</span>
          <span>Received 2023 · Revised continuously · Never accepted as final</span>
          <span>Typeset in Fraunces, Newsreader &amp; IBM Plex Mono</span>
        </div>
      </footer>
    </div>
  )
}
