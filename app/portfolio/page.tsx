import { Masthead } from "@/components/masthead"
import { Navigations } from "@/components/navigation"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Publications } from "@/components/publications"
import { FeaturedPosts } from "@/components/featured-posts"
import { Contact } from "@/components/contact"
import { MeshPlate } from "@/components/three/mesh-plate"
import { NotebookCell } from "@/components/notebook-cell"
import { AttentionFigure } from "@/components/attention-figure"
import { ThinkingMap } from "@/components/thinking-map"
import Link from "next/link"

/** Folio — page number typeset between sections, as in a bound preprint. */
function Folio({ n }: { n: number }) {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24" aria-hidden>
      <p className="folio">· {n} ·</p>
    </div>
  )
}

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

        <Folio n={1} />

        {/* §1 Experience */}
        <section id="experience" className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 scroll-mt-20">
          <SectionHeading mark="§1" title="Experience" note="industry, research, campus — 2024 to present" />
          <Experience />
        </section>

        <Folio n={2} />

        {/* §2 Selected Work */}
        <section id="projects" className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 scroll-mt-20">
          <SectionHeading mark="§2" title="Selected Work" note="figures 01–10, in order of recency" />
          <Projects />
        </section>

        <Folio n={3} />

        {/* §3 Writing */}
        <section id="writing" className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 scroll-mt-20">
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

          {/* 3.2 Interactive marginalia — attention motifs */}
          <div className="mt-16">
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground mb-5">
              <span className="text-accent">3.2</span> Interactive marginalia
            </p>
            <div className="max-w-2xl">
              <NotebookCell
                source={
                  <>
                    <span className="text-muted-foreground">acts</span> = model.
                    <span className="text-accent">trace</span>(
                    <span className="opacity-80">&quot;systems that retrieve, reason &amp; remember.&quot;</span>)
                    {"\n"}plot_attention(acts, layer=<span className="text-accent">11</span>, head=
                    <span className="text-accent">4</span>)
                  </>
                }
              >
                <AttentionFigure />
              </NotebookCell>
              <p className="font-mono text-[11px] text-muted-foreground mt-3 leading-relaxed">
                <span className="text-accent">Fig. 3.2</span> — The attention motifs this section
                writes about, run over the site&rsquo;s own thesis. Synthetic weights, real
                mechanisms — previous-token, subject-binding &amp; semantic-recall heads.{" "}
                <em>Executable — press ▶ to re-run.</em>
              </p>
            </div>
          </div>
        </section>

        <Folio n={4} />

        {/* Appendix A — Skills */}
        <section id="skills" className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 scroll-mt-20">
          <SectionHeading mark="A" title="Appendix: Proficiencies" />
          <Skills />

          <figure className="mt-14 md:grid md:grid-cols-[150px_1fr] md:gap-8">
            <span className="smallcaps font-serif text-sm text-muted-foreground block mb-3 md:mb-0 md:text-right">
              Plate A
            </span>
            <div className="max-w-2xl">
              <MeshPlate />
              <figcaption className="font-mono text-[11px] text-muted-foreground mt-3 leading-relaxed">
                <span className="text-accent">Plate A</span> — Proficiency manifold, rendered as a
                T(2,3) torus knot. Vertices mark sampled skills; topology is, of course, a joke.{" "}
                <em>Interactive — drag to rotate.</em>
              </figcaption>
            </div>
          </figure>
        </section>

        <Folio n={5} />

        {/* Correspondence */}
        <section id="contact" className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 scroll-mt-20">
          <SectionHeading mark="✉" title="Correspondence" />
          <Contact />
        </section>

        <Folio n={6} />

        {/* End paper — open questions */}
        <section id="questions" className="max-w-5xl mx-auto px-5 md:px-8 mt-20 md:mt-24 scroll-mt-20">
          <div className="mb-10 md:mb-12">
            <div className="rule-double pt-4" />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="section-mark">Ω</span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight sr-only">Open questions</h2>
              <span className="font-sans italic text-sm text-muted-foreground">
                end paper — the questions behind the preceding pages
              </span>
            </div>
          </div>
          <ThinkingMap />
        </section>
      </main>

      {/* Colophon */}
      <footer className="max-w-5xl mx-auto px-5 md:px-8 mt-20 pb-12">
        <div className="rule-double pt-4" />
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Kunj Rathod · 7 pp. · interactive edition</span>
          <span>Received 2023 · Revised continuously · Never accepted as final</span>
          <span>Typeset in Fraunces, Newsreader &amp; IBM Plex Mono</span>
        </div>
      </footer>
    </div>
  )
}
