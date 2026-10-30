"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const sections = [
  { label: "Home", href: "/", note: "ask the corpus" },
  { label: "Portfolio", href: "/portfolio", note: "projects & research" },
  { label: "Blog", href: "/blog", note: "writing" },
  { label: "CV", href: "/CV_Kunj_Rathod.pdf", note: "full curriculum vitae" },
]

export default function NotFound() {
  const path = usePathname()

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-24">
        <div className="rule-double pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-muted-foreground pt-2">
            <span>No. KR-404</span>
            <span>Erratum</span>
            <span>Not in the record</span>
          </div>
        </div>

        <h1 className="font-serif font-medium text-[2.6rem] leading-[1.05] md:text-7xl tracking-tight mt-10 md:mt-14">
          Page not found<span className="text-accent">.</span>
          <br />
          <em className="text-accent">Citation needed.</em>
        </h1>

        <div className="mt-10 md:grid md:grid-cols-[120px_1fr] md:gap-8">
          <span className="smallcaps font-serif text-sm text-muted-foreground block mb-3 md:mb-0 md:text-right">
            Abstract
          </span>
          <div className="space-y-4">
            <p className="abstract-text font-sans text-[1.05rem] leading-[1.75] text-foreground/90">
              The reference below resolved to nothing. It may have been renamed, retired in a
              later revision, or mistyped. Retrieval returned 0 of 0 documents.
            </p>
            <p className="font-mono text-sm break-all border border-border bg-card/40 px-4 py-3">
              <span className="text-accent">[?]</span> {path || "/"}
              <span className="caret-blink text-accent ml-0.5">▍</span>
            </p>
          </div>
        </div>

        <div className="mt-10 md:grid md:grid-cols-[120px_1fr] md:gap-8">
          <span className="smallcaps font-serif text-sm text-muted-foreground block mb-3 md:mb-0 md:text-right">
            See instead
          </span>
          <ul className="border-y border-foreground/80 divide-y divide-border">
            {sections.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex items-baseline justify-between gap-4 py-3 group"
                >
                  <span className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors">
                    {s.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {s.note}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="folio mt-16">404</p>
      </div>
    </main>
  )
}
