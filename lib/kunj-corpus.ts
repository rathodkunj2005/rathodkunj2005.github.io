/**
 * Retrieval corpus for the in-browser "Ask" model, extracted from the public
 * documents in /public (resume.pdf, CV_Kunj_Rathod_April26.pdf) plus site content.
 * Chunked by section so per-question retrieval can hand a small model only
 * what it needs. Regenerate by re-extracting the PDFs when they change.
 */

export type CorpusChunk = { source: string; text: string }

export const KUNJ_CORPUS: CorpusChunk[] = [
  {
    source: "CV — Summary",
    text: "Kunj Rathod is an AI/Software Engineer specializing in LLM systems, Retrieval-Augmented Generation (RAG), scalable cloud infrastructure, and embodied AI research. He designs and ships AI applications across healthcare, legal-tech, aerospace, and robotics — from HIPAA-compliant hospital platforms to spatial memory systems for embodied agents, distributed biomedical knowledge graphs, and multi-agent materials discovery pipelines.",
  },
  {
    source: "CV — Education",
    text: "B.S. Computer Science, University of Utah, Salt Lake City (Aug 2023 – Dec 2026). GPA 3.7/4.0, Dean's List. Relevant coursework: Machine Learning, Computer Vision, Natural Language Processing, Distributed Systems, Algorithms & Data Structures, Interpretability of LLMs, Multimodal LLM Agents. High school: Krishna Public School, Raipur, India (2017–2023).",
  },
  {
    source: "CV — Microsoft",
    text: "Software Engineer Intern, Microsoft — Azure Data / Microsoft Fabric team, Redmond, WA (2026). Builds scalable cloud solutions for distributed data systems on the Fabric lakehouse platform (OneLake, Spark, warehousing, real-time intelligence); full-stack software development and distributed systems within the Azure ecosystem.",
  },
  {
    source: "CV — University of Utah Health",
    text: "Software Development Intern, AI Services (SUDO Program), University of Utah Health (Jan 2025 – present). Built and deployed a HIPAA-compliant AI chat platform for 90+ hospital executives using React/TypeScript, Flask middleware, and AWS Bedrock microservices with event-driven Lambda orchestration. Shipped 6 full-stack features across 4 sprints; integrated Bedrock Agents, Knowledge Bases, and Guardrails for clinical workflows. Reduced inference latency 40% and data query speed 60% via pipeline optimization, API caching, and a DynamoDB–RDS hybrid database. Token-streaming LLM responses with p95 <200ms time-to-first-token, resilient fallbacks, and distributed session persistence for 1,000+ conversations. Integrated interactive data visualization into the chat interface for real-time hospital analytics.",
  },
  {
    source: "CV — STARS Lab",
    text: "Undergraduate Researcher, LLMs & Computational Simulations, STARS Lab, University of Utah, collaborating with NASA, Microsoft, and the U.S. DoD (Aug 2025 – Feb 2026). Built a multi-agent, graph-augmented pipeline extracting material-property data from 1,000+ materials-science papers into a physics-aware graph for automated Ashby plot generation. Developed a constraint-based 'design region' engine (temperature, creep, pressure limits) and benchmarking suite to find feasible materials for extreme aerospace environments, rocket engines, and hypersonics. Built Ref-RAG, a LangChain/Chainlit RAG chatbot over unorganized PDF corpora for materials researchers.",
  },
  {
    source: "CV — CourtEasy.ai",
    text: "AI Engineering Intern, CourtEasy.ai / Nugen, remote (Nov 2024 – Apr 2025). Scaled hybrid legal-document retrieval to 10M+ indexed Indian legal documents (statutes, court orders) supporting 5,000+ daily queries. Improved retrieval accuracy 28% and reduced hallucinations 35% with hybrid RAG (dense vectors + BM25 + reranking) and context grounding for Legal-NER. Built production ETL ingesting 500k+ documents/week. Benchmarked 8 LLM families (InLegalBERT, InLegalLLaMA, GPT-4o-mini) on LegalBench and NyayaAnumana; model-routing analysis cut projected inference spend by $50k+/year. Co-authored a comparative legal-AI analysis synthesizing 15+ papers.",
  },
  {
    source: "CV — BioGraphRAG internship",
    text: "AI Research Intern, BioGraphRAG, Garje Marathi Global / GMG Summer of Code (May – Aug 2024). Led development of BioGraphRAG, a Graph Retrieval-Augmented Generation platform combining biomedical knowledge graphs with LLMs for explainable biomedical Q&A. Distributed GraphRAG over 1M+ entities (proteins, genes, diseases) integrating UniProt, AlphaFold, RXNav, and BioKG in NebulaGraph. +40% factual accuracy; 3× faster graph traversal via caching and high-degree node pruning (sub-500ms p95). Automated ETL processing 2M+ entity updates monthly (Python, Docker, LlamaIndex, FastAPI). Presented at an international AI panel; commended for technical leadership. Team Lead of the Code-Crafters team, mentoring junior contributors.",
  },
  {
    source: "Site — Video Mind Palace",
    text: "Video Mind Palace (VMP, 2026): Kunj's research project on efficient long-term active embodied question answering (LA-EQA), Advanced AI course, University of Utah. Replaces expensive scene-graph world models with direct video-level VLM queries using Qwen3-VL and MuJoCo. Achieved a 31–57% reduction in online inference time per query, within 13–17% of state-of-the-art Robotic Mind Palace (RMP) accuracy, and eliminates mandatory offline GPT-4o captioning preprocessing. Also analyzed LA-EQA benchmark limitations and proposed SceneSmith-generated environments as future work.",
  },
  {
    source: "CV — Research: agents & memory",
    text: "Current research (2026–): spatial memory for embodied agents and long-horizon web agents at the University of Utah. Studies Web Explorer and WebSailor V2 for extended agentic reasoning; evaluates agent benchmarks including OS Marathon, BrowseComp, and Mind2Web. Researches retrieval-augmented spatial memory architectures (inspired by ReMEmbR / NaVQA) unifying spatial, temporal, episodic, and semantic memory for long-horizon robot navigation. Studies agentic scene generation (SceneSmith, MIT CSAIL / Toyota Research) for simulation-ready environments.",
  },
  {
    source: "CV — Research: interpretability",
    text: "Current research (2026–): predicting generalization from circuits — LLM interpretability, University of Utah. Investigates circuit-level generalization in LLMs using sparse feature circuits (building on Wu et al.). Builds automated LLM pipelines to extract circuits from default tasks and predict generalization to non-default tasks, using attribution graphs and Pathways Discovery for circuit-level analysis.",
  },
  {
    source: "CV — Project: FNDR",
    text: "FNDR (Jan 2024 – present): privacy-first local AI assistant for macOS in Rust and Tauri — zero-trust, local-only memory assistant, no cloud, no telemetry. Metal-accelerated on-device inference for Llama 3.2 and SmolVLM on Apple Silicon; real-time screen extraction with Apple Vision OCR and CLIP embeddings; Graphiti-style temporal search across activities, web sessions, and meetings; local Whisper (Parakeet) transcription; an MCP server for secure interop with external agents and IDEs.",
  },
  {
    source: "CV — Project: HirePilot",
    text: "HirePilot (2026): fully autonomous AI recruiting agency backend (TypeScript, Node.js, Express, PostgreSQL, Anthropic API). Specialized agents — Enrichment, Scheduling, Interview, Evaluation — manage the hiring lifecycle from GitHub sourcing to live screening, with Twilio real-time voice AI interviews, Google Calendar scheduling, and Slack/Resend approvals and outreach.",
  },
  {
    source: "CV — Project: Minute0",
    text: "Minute0 (Feb 2026, hackathon winner): AI-powered deployment monitor (React, TypeScript, Cerebras, FastAPI, ChromaDB, Slack API; minute0.vercel.app). Tracks Vercel deployments, classifies build/runtime failures, triggers Slack alerts with approval workflows, and does AI root-cause analysis over logs with vector search, emitting structured fix suggestions for coding agents.",
  },
  {
    source: "CV — Projects: Wingman & Ref-RAG",
    text: "Wingman.ai (2025–): multi-modal iOS personal assistant in SwiftUI with voice, chat, and image input over GPT-4o and Whisper, RAG-enhanced memory, offline-first Firebase sync. Ref-RAG (2025–26): research-literature RAG chatbot (Python, LangChain, Chainlit, FastAPI) letting STARS Lab researchers query 1,000+ materials-science papers conversationally.",
  },
  {
    source: "CV — Project: FlowVía",
    text: "FlowVía (Apr 2024): V2X urban mobility optimization system — V2V/V2I/V2N platform for real-time adaptive traffic management, from OBD-II in-vehicle hardware to a cloud ML backend. LSTM traffic-flow prediction on live SPaT signal data; AES-256 encrypted comms with rotating vehicle identifiers; edge-first processing for privacy and low latency.",
  },
  {
    source: "CV — Skills",
    text: "Languages: Python, Java, C++, TypeScript, JavaScript, Swift, SQL, Rust. Frameworks: React, Next.js, Flask, Node.js, SwiftUI, FastAPI, Chainlit, Docker, Kubernetes, Vite, Tailwind. Databases: PostgreSQL, DynamoDB, MySQL, RDS, Pinecone, ChromaDB, NebulaGraph. Cloud: AWS (Lambda, S3, Bedrock, API Gateway, RDS), Azure, Firebase, microservices, event-driven architecture. AI/ML: RAG, GraphRAG, LangChain, LlamaIndex, CrewAI, PyTorch, TensorFlow, vLLM, DQN, PPO, Transformers, multi-agent systems, embodied AI, web agents. Also: an RL investment advisor combining DistillBERT sentiment on financial news with DQN/PPO portfolio optimization.",
  },
  {
    source: "CV — Writing",
    text: "Publications and writing: 'BioGraphRAG — Biomedical Knowledge Graph Retrieval Augmented Generation' (Oct 2024, kunjrathod.substack.com/p/biographrag, co-authored with Niraj Kumar Singh; NebulaGraph's team requested republication in Jun 2025). 'FlowVía: A Technical Deep Dive into Next-Gen Urban Mobility' (Apr 2024, kunjrathod.substack.com/p/flowvia, solo-authored). 'Comparative Analysis: LLM Families on Legal Benchmarks' (2025, internal technical report at CourtEasy.ai/Nugen).",
  },
  {
    source: "CV — Awards & leadership",
    text: "Awards: Kahlert Impact Prize ($1,000, Mar 2026, Kahlert School of Computing) for societal impact through AI research and production systems in healthcare, legal-tech, and embodied AI — funded by a $15M Kahlert Foundation endowment. Minute0 hackathon winner (Feb 2026). Dean's List 2024–25. Leadership: Community Advisor for 200+ residents at University of Utah Housing (Aug–Dec 2024); Team Lead, Code-Crafters, GMG Summer of Code; Campus Strategist at Perplexity AI, onboarding 150+ Pro users (Jan–Apr 2025). Languages: English and Hindi (native/bilingual).",
  },
  {
    source: "Contact & documents",
    text: "Contact Kunj: email rathodkunj2005@gmail.com (also kunj.rathod@utah.edu) · GitHub github.com/rathodkunj2005 · LinkedIn linkedin.com/in/rathodkunj · X @KunjRathod17 · Substack kunjrathod.substack.com. His resume is at /resume.pdf and his full CV at /CV_Kunj_Rathod_April26.pdf on this site; the full portfolio is at /portfolio. He is open to research collaborations and engineering roles.",
  },
]

const STOPWORDS = new Set(
  "a an the and or but of in on at to for with about as by from is are was were be been am do does did what when where who whom which why how can could should would will shall may might must have has had he him his she her it its they them their you your i me my we us our this that these those there here not no yes if then than so very just also more most some any all tell say says said know like get got".split(
    " ",
  ),
)

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.\-+#]+|[.\-+#]+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

const chunkTokens = KUNJ_CORPUS.map((c) => new Set(tokenize(c.source + " " + c.text)))

/** Term-overlap retrieval with IDF weighting — no embeddings needed at this corpus size. */
export function retrieveChunks(query: string, k = 5): CorpusChunk[] {
  const terms = [...new Set(tokenize(query))]
  if (terms.length === 0) return KUNJ_CORPUS.slice(0, k)

  const n = KUNJ_CORPUS.length
  const scored = KUNJ_CORPUS.map((chunk, i) => {
    let score = 0
    for (const t of terms) {
      if (!chunkTokens[i].has(t)) continue
      const df = chunkTokens.reduce((acc, set) => acc + (set.has(t) ? 1 : 0), 0)
      score += Math.log(1 + n / df)
    }
    return { chunk, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.chunk)
}
