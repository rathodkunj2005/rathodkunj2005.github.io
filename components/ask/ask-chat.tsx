"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Square, FileText, RotateCcw } from "lucide-react"
import type { MLCEngineInterface } from "@mlc-ai/web-llm"
import {
  buildKunjSystemPrompt,
  ASK_SUGGESTIONS,
  ASK_MODEL_ID,
  ASK_MODEL_LABEL,
  KUNJ_DOCS,
  DOC_INTENT,
} from "@/lib/kunj-knowledge"

const ease = [0.22, 1, 0.36, 1] as const

type Role = "user" | "assistant"
type Message = { role: Role; content: string }
type EngineState = "idle" | "booting" | "ready" | "generating" | "unsupported" | "error"

/** After a crash, check whether this tab can still get a WebGPU adapter — if not,
 * only a page reload will bring the model back (iOS Safari revokes it under memory pressure). */
async function gpuAdapterMissing(): Promise<boolean> {
  try {
    const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown | null> } })
      .gpu
    if (!gpu) return true
    return (await gpu.requestAdapter()) === null
  } catch {
    return true
  }
}

function greeting() {
  const h = new Date().getHours()
  if (h < 5) return "Working late"
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

/** Guaranteed-correct document links, rendered whenever a visitor asks for the resume/CV. */
function DocChips() {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {KUNJ_DOCS.map((d) => (
        <a
          key={d.href}
          href={d.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/5 px-3.5 py-1.5 font-sans text-[13px] text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <FileText className="h-3.5 w-3.5" />
          {d.label} ↗
        </a>
      ))}
    </div>
  )
}

/** Weight-download progress, typeset like a kernel boot trace. */
function BootLog({ text, progress }: { text: string; progress: number }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 px-4 py-3.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
      <p className="tracking-[0.14em] uppercase text-accent mb-2">
        <span className="caret-blink">●</span> waking the model — {ASK_MODEL_LABEL}
      </p>
      <p className="truncate">{text || "requesting weights…"}</p>
      <div className="mt-3 h-1 rounded-full bg-border relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground/70">
        ~1 GB on first visit, cached in your browser after that. Nothing you type leaves this page.
      </p>
    </div>
  )
}

export function AskChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [engineState, setEngineState] = useState<EngineState>("idle")
  const [boot, setBoot] = useState({ text: "", progress: 0 })
  const [errorMsg, setErrorMsg] = useState("")
  const [failedText, setFailedText] = useState("")
  const [gpuGone, setGpuGone] = useState(false)

  const engineRef = useRef<MLCEngineInterface | null>(null)
  const enginePromiseRef = useRef<Promise<MLCEngineInterface> | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const started = messages.length > 0

  useEffect(() => {
    if (typeof navigator !== "undefined" && !("gpu" in navigator)) {
      setEngineState("unsupported")
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`
  }, [input])

  const ensureEngine = useCallback(async (): Promise<MLCEngineInterface> => {
    if (engineRef.current) return engineRef.current
    // Memoize the in-flight boot so concurrent sends can't spawn two workers.
    if (enginePromiseRef.current) return enginePromiseRef.current
    setEngineState("booting")
    enginePromiseRef.current = (async () => {
      const { CreateWebWorkerMLCEngine } = await import("@mlc-ai/web-llm")
      const engine = await CreateWebWorkerMLCEngine(
        new Worker(new URL("../../lib/webllm-worker.ts", import.meta.url), { type: "module" }),
        ASK_MODEL_ID,
        {
          initProgressCallback: (r) => setBoot({ text: r.text, progress: r.progress }),
        },
      )
      engineRef.current = engine
      return engine
    })()
    try {
      return await enginePromiseRef.current
    } catch (err) {
      enginePromiseRef.current = null
      throw err
    }
  }, [])

  const streamReply = useCallback(
    async (engine: MLCEngineInterface, history: Message[], text: string) => {
      const chunks = await engine.chat.completions.create({
        // System prompt is rebuilt per question with retrieved resume/CV chunks;
        // history is capped so the 4k context never overflows.
        messages: [{ role: "system", content: buildKunjSystemPrompt(text) }, ...history.slice(-8)],
        stream: true,
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: 512,
      })

      let reply = ""
      for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta?.content ?? ""
        setMessages([...history, { role: "assistant", content: reply }])
      }
    },
    [],
  )

  const run = useCallback(
    async (text: string, history: Message[]) => {
      try {
        let engine = await ensureEngine()
        setEngineState("generating")
        setMessages([...history, { role: "assistant", content: "" }])

        try {
          await streamReply(engine, history, text)
        } catch (err) {
          const modelUnloaded =
            err instanceof Error && /model not loaded|ModelNotLoadedError/i.test(err.message)
          if (!modelUnloaded) throw err
          // The worker lost the model (GPU device loss, tab backgrounding, memory
          // pressure). Weights are still in the browser cache, so reload is fast.
          setEngineState("booting")
          try {
            await engine.reload(ASK_MODEL_ID)
          } catch {
            engineRef.current = null
            enginePromiseRef.current = null
            engine = await ensureEngine()
          }
          setEngineState("generating")
          await streamReply(engine, history, text)
        }
        setEngineState("ready")
      } catch (err) {
        console.error(err)
        // Keep the unanswered question in the transcript, drop the dead reply bubble.
        setMessages(history)
        setFailedText(text)
        setErrorMsg(err instanceof Error ? err.message : String(err))
        setGpuGone(await gpuAdapterMissing())
        setEngineState("error")
      }
    },
    [ensureEngine, streamReply],
  )

  const send = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim()
      if (!text || engineState === "generating" || engineState === "booting") return
      if (engineState === "unsupported") return

      setInput("")
      setErrorMsg("")
      const history: Message[] = [...messages, { role: "user", content: text }]
      setMessages(history)
      await run(text, history)
    },
    [input, messages, engineState, run],
  )

  const retry = useCallback(() => {
    if (!failedText || engineState !== "error") return
    setErrorMsg("")
    // The transcript already ends with the unanswered question — re-run it in place.
    void run(failedText, messages)
  }, [failedText, engineState, messages, run])

  const stop = useCallback(() => {
    engineRef.current?.interruptGenerate()
    setEngineState("ready")
  }, [])

  const busy = engineState === "generating" || engineState === "booting"

  const composer = (
    <div className="rounded-[1.4rem] border border-border/70 bg-card shadow-[0_10px_36px_-14px_hsl(30_14%_10%/0.28)] focus-within:border-accent/60 transition-colors">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            send()
          }
        }}
        rows={started ? 1 : 2}
        placeholder="Ask anything about Kunj…"
        disabled={engineState === "unsupported"}
        className="w-full resize-none bg-transparent px-5 pt-4 pb-1 font-sans text-[1.05rem] leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50"
      />
      <div className="flex items-center justify-between pl-4 pr-3 pb-3 pt-1">
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-foreground select-none">
          <span className={busy ? "text-accent caret-blink" : "text-accent/60"}>
            {busy ? "●" : "○"}
          </span>{" "}
          {ASK_MODEL_LABEL} · runs in your browser
        </span>
        {engineState === "generating" ? (
          <button
            onClick={stop}
            aria-label="Stop generating"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Square className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() => send()}
            disabled={!input.trim() || busy || engineState === "unsupported"}
            aria-label="Send"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground hover:opacity-85 transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )

  const portfolioButton = (
    <Link
      href="/portfolio"
      className="inline-flex items-center gap-1.5 rounded-full border border-foreground/50 px-4 py-1.5 font-sans text-[13px] text-foreground hover:bg-foreground hover:text-background transition-colors whitespace-nowrap"
    >
      Browse the full site →
    </Link>
  )

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      {/* Minimal header */}
      <header className="shrink-0 z-40 bg-background/95 backdrop-blur-[2px]">
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex h-16 items-center justify-between gap-3">
            <span className="flex items-baseline gap-2">
              <span className="font-serif text-accent text-lg select-none" aria-hidden>
                ❋
              </span>
              <span className="font-serif text-lg tracking-tight">Kunj&thinsp;Rathod</span>
            </span>
            {portfolioButton}
          </div>
        </div>
      </header>

      {/* Unsupported browser — the site must still be reachable */}
      {engineState === "unsupported" ? (
        <main className="flex flex-1 items-center justify-center px-5">
          <div className="max-w-md text-center">
            <p className="font-serif text-4xl text-accent select-none" aria-hidden>
              ❋
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-snug tracking-tight">
              Kunj Rathod — AI engineer &amp; researcher.
            </h1>
            <p className="font-sans text-[0.95rem] leading-relaxed text-foreground/80 mt-4">
              This page normally hosts a small language model that answers questions about Kunj,
              running on your GPU via WebGPU — which this browser doesn&rsquo;t support. The
              old-fashioned version of the site works everywhere:
            </p>
            <div className="mt-6 flex justify-center">{portfolioButton}</div>
            <p className="mt-6 font-mono text-[11px] text-muted-foreground">
              or write to{" "}
              <a href="mailto:rathodkunj2005@gmail.com" className="ref-link">
                rathodkunj2005@gmail.com
              </a>
            </p>
          </div>
        </main>
      ) : !started ? (
        /* ——— New chat: identity-first greeting, big composer, suggestions ——— */
        <main className="flex flex-1 flex-col items-center justify-center px-5 pb-10 overflow-y-auto">
          <div className="w-full max-w-2xl">
            <motion.p
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease }}
              className="text-center font-serif text-4xl text-accent select-none"
              aria-hidden
            >
              ❋
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="mt-4 text-center font-serif text-3xl md:text-[2.5rem] leading-tight tracking-tight text-balance"
            >
              Kunj Rathod — AI engineer &amp; researcher.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mt-3 text-center font-sans italic text-muted-foreground text-balance"
            >
              {greeting()}. Microsoft Fabric by day; RAG, agents &amp; embodied AI by research. A
              small model living in this page has read his collected works — ask it anything.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
              className="mt-8"
            >
              {composer}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-5 flex flex-wrap justify-center gap-2"
            >
              {ASK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card/50 px-4 py-1.5 font-sans text-[13px] text-muted-foreground hover:border-accent/60 hover:text-foreground hover:bg-card transition-colors"
                >
                  {s}
                </button>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 text-center font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted-foreground/70"
            >
              † {ASK_MODEL_ID.replace(/-MLC$/, "")} via WebLLM &amp; WebGPU — weights download once
              (~1&nbsp;GB), then run locally. No server, no logging, occasionally no idea.
            </motion.p>
          </div>
        </main>
      ) : (
        /* ——— Conversation ——— */
        <main className="flex flex-1 flex-col min-h-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-5 py-8 space-y-7">
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1
                if (m.role === "user") {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="flex justify-end"
                    >
                      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 font-sans text-[1.02rem] leading-relaxed">
                        {m.content}
                      </p>
                    </motion.div>
                  )
                }
                const asked = messages[i - 1]?.content ?? ""
                return (
                  <div key={i} className="md:grid md:grid-cols-[28px_1fr] md:gap-4">
                    <span
                      className="hidden md:block font-serif text-accent text-lg select-none"
                      aria-hidden
                    >
                      ❋
                    </span>
                    <div>
                      <div className="font-serif text-[1.08rem] leading-[1.75] whitespace-pre-wrap">
                        {m.content}
                        {isLast && engineState === "generating" && (
                          <span className="caret-blink text-accent">▎</span>
                        )}
                      </div>
                      {DOC_INTENT.test(asked) && m.content && <DocChips />}
                    </div>
                  </div>
                )
              })}

              <AnimatePresence>
                {engineState === "booting" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="md:ml-11"
                  >
                    <BootLog text={boot.text} progress={boot.progress} />
                  </motion.div>
                )}
              </AnimatePresence>

              {engineState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="md:ml-11"
                >
                  <div className="rounded-xl border border-destructive/40 bg-card/60 px-4 py-3.5">
                    <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-destructive mb-2">
                      ○ the model went quiet
                    </p>
                    <p className="font-sans text-[13.5px] leading-relaxed text-foreground/85 text-pretty">
                      {gpuGone
                        ? "This tab lost its GPU — browsers take it back under memory pressure, especially on phones. Reloading the page hands it back; the weights stay cached, so it wakes fast."
                        : "It lost its footing mid-answer. Your question is safe, and the weights are still cached — waking it again takes seconds."}
                    </p>
                    <div className="mt-3.5 flex flex-wrap items-center gap-2">
                      {gpuGone ? (
                        <button
                          onClick={() => window.location.reload()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 font-sans text-[13px] text-accent-foreground hover:opacity-85 transition-opacity"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Reload the page
                        </button>
                      ) : (
                        <button
                          onClick={retry}
                          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 font-sans text-[13px] text-accent-foreground hover:opacity-85 transition-opacity"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Wake it &amp; retry
                        </button>
                      )}
                      {portfolioButton}
                    </div>
                    <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground/60">
                      {(errorMsg || "unknown error").slice(0, 140)}
                      {errorMsg.length > 140 && "…"} — or email{" "}
                      <a href="mailto:rathodkunj2005@gmail.com" className="ref-link">
                        rathodkunj2005@gmail.com
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Docked composer */}
          <div className="shrink-0 bg-background/95 backdrop-blur-[2px]">
            <div className="max-w-2xl mx-auto px-5 pb-4 pt-2">
              {composer}
              <p className="mt-2 text-center font-mono text-[10px] tracking-[0.08em] text-muted-foreground/60">
                A small model in your browser tab — verify anything important against{" "}
                <Link href="/portfolio" className="ref-link">
                  the site itself
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
