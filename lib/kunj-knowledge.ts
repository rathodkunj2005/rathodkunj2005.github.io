/**
 * Prompt assembly for the in-browser "Ask" model.
 * The system prompt is rebuilt per question: a short core + chunks retrieved
 * from the resume/CV corpus (lib/kunj-corpus.ts). Small models answer far more
 * reliably from a few focused notes than from one giant prompt, and the rules
 * go last because small models weight recency.
 */

import { retrieveChunks } from "./kunj-corpus"

const KUNJ_CORE = `You are the assistant on Kunj Rathod's portfolio website, running entirely inside the visitor's browser.

CORE FACTS
Kunj Rathod is an AI engineer & researcher. B.S. Computer Science at the University of Utah (2023–2026, GPA 3.7, Dean's List). Currently a Software Engineer Intern at Microsoft on Fabric / Azure Data (distributed data systems) and an AI Services intern at University of Utah Health (HIPAA-compliant LLM platform for hospital executives). His research spans RAG, multi-agent systems, LLM interpretability, and embodied AI (Video Mind Palace). Contact: rathodkunj2005@gmail.com · github.com/rathodkunj2005 · linkedin.com/in/rathodkunj. Resume: /resume.pdf · Full CV: /CV_Kunj_Rathod_April26.pdf · Portfolio: /portfolio.`

const KUNJ_RULES = `RULES
- Answer directly from the notes above — they are excerpts from Kunj's actual resume and CV and cover most questions.
- Be concise (2-5 sentences), warm, and specific; use concrete numbers from the notes when relevant.
- For resume/CV requests, give the paths from the core facts.
- Stay on the topic of Kunj; gently steer unrelated questions back to him. Never invent facts; if the notes genuinely don't cover something, say so briefly and suggest emailing rathodkunj2005@gmail.com.`

export function buildKunjSystemPrompt(query: string): string {
  const notes = retrieveChunks(query, 5)
    .map((c) => `[${c.source}]\n${c.text}`)
    .join("\n\n")
  return `${KUNJ_CORE}\n\nNOTES FROM KUNJ'S RESUME & CV RELEVANT TO THE VISITOR'S QUESTION\n\n${notes}\n\n${KUNJ_RULES}`
}

export const ASK_SUGGESTIONS = [
  "What is Kunj building at Microsoft?",
  "Explain Video Mind Palace in plain terms",
  "What has he shipped in healthcare AI?",
  "How do I get in touch with him?",
]

/** Guaranteed-correct document links, rendered whenever a visitor asks for them —
 *  a small model can't be trusted to reproduce URLs verbatim. */
export const KUNJ_DOCS = [
  { label: "Resume", href: "/resume.pdf" },
  { label: "Full CV", href: "/CV_Kunj_Rathod_April26.pdf" },
] as const

export const DOC_INTENT = /\b(resume|résumé|cv|curriculum vitae)\b/i

/** WebLLM model id — ~1 GB download, cached in the browser after first load.
 *  Qwen2.5-1.5B follows the facts-grounded prompt far more reliably than Llama-3.2-1B. */
export const ASK_MODEL_ID = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC"
export const ASK_MODEL_LABEL = "Qwen2.5 · 1.5B · q4f16"
