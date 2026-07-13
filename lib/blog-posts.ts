export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  shortDate: string
  readTime: string
  category: string
  externalUrl: string
  source: string
  /**
   * Faithful summary of the article rendered on the detail page.
   * Full text lives on Substack; this is not the original body.
   */
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "biographrag",
    title: "BioGraphRAG — Biomedical Knowledge Graph Retrieval Augmented Generation",
    excerpt:
      "Interact with biomedical knowledge graphs using graph-based retrieval augmented generation — Chainlit, FastAPI, and LlamaIndex over BioKG's 11M+ entities in NebulaGraph.",
    date: "October 25, 2024",
    shortDate: "Oct 2024",
    readTime: "28 min read",
    category: "AI & Data",
    externalUrl: "https://kunjrathod.substack.com/p/biographrag",
    source: "Kunj's Substack",
    content: `
      <p><em>This is a summary. Read the full article on <a href="https://kunjrathod.substack.com/p/biographrag" target="_blank" rel="noopener noreferrer">Substack</a>.</em></p>

      <p>BioGraphRAG combines retrieval-augmented generation with an expert-curated biomedical knowledge graph to answer biomedical questions with explainable, source-cited responses. LLMs alone suffer from outdated training data, no access to proprietary datasets, and hallucination; vanilla vector RAG helps but struggles with the intricate entity relationships that dominate biomedical knowledge. Graph-based RAG addresses both by retrieving structured subgraphs instead of flat text chunks.</p>

      <h2>System architecture</h2>
      <p>The system is a five-stage pipeline: users submit queries through a Chainlit frontend; a FastAPI backend extracts the relevant subgraph context from the knowledge graph; an LLM generates an initial response grounded in that subgraph; the response is enriched with external metadata from UniProt, AlphaFold, and RXNav; and the final enriched answer is rendered back in Chainlit with a visualization of the supporting subgraph.</p>

      <h2>Dataset and graph database</h2>
      <p>The knowledge graph is built on BioKG — constructed from 34M+ PubMed abstracts, with 11,479,285 unique entities across 12 types and 42,504,077 relations across 52 types, drawn from 13 reputable data sources. BioKG was chosen over the graphs used by prior systems (KG-RAG's SPOKE, KRAGEN) for its data variety and quality. NebulaGraph hosts the graph for its open-source license, distributed architecture, performance at billions of nodes and edges, and the nGQL query language. Ingestion was a practical bottleneck: serial entity upserts took roughly 33 hours, which multiprocessing cut to about 3 hours.</p>

      <h2>Retrieval and enrichment</h2>
      <p>LlamaIndex handles indexing and retrieval of knowledge-graph triplets: a natural-language query is translated into a NebulaGraph lookup, the relevant entity–relationship–entity sets are retrieved, and the LLM composes an answer from them. A multi-stage enrichment pipeline then augments the raw graph answer — which is often just one or two lines — with gene information, protein structures, drug data, and links to external resources, with an LLM fallback when the graph query returns insufficient context.</p>

      <h2>Performance analysis</h2>
      <p>Performance was profiled across low-degree (~2 connections), mid-degree (31–51), and high-degree (8,151–13,939) nodes. Retrieval time dominates for high-degree nodes — up to ~58 seconds — a direct consequence of the graph's scale-free topology, while generation time stays negligible throughout. Proposed mitigations include caching, parallel processing, better indexing, and precomputation for hot high-degree entities.</p>

      <h2>Future work</h2>
      <p>Planned directions include high-degree node optimization, integrating clinical-trial and genomic data, domain-specific model fine-tuning, multimodal responses incorporating biomedical imaging, and HIPAA/GDPR compliance work.</p>
    `,
  },
  {
    slug: "flowvia",
    title: "FlowVía: A Technical Deep Dive into Next-Gen Urban Mobility",
    excerpt:
      "Innovating urban mobility using V2X technology — DSRC and C-V2X communication, LSTM traffic-flow prediction, and privacy-first vehicle-to-infrastructure design.",
    date: "April 2, 2024",
    shortDate: "Apr 2024",
    readTime: "3 min read",
    category: "Urban Mobility",
    externalUrl: "https://kunjrathod.substack.com/p/flowvia",
    source: "Kunj's Substack",
    content: `
      <p><em>This is a summary. Read the full article on <a href="https://kunjrathod.substack.com/p/flowvia" target="_blank" rel="noopener noreferrer">Substack</a>.</em></p>

      <p>FlowVía is a concept for smarter urban mobility built on V2X (vehicle-to-everything) communication: V2V for inter-vehicle data sharing, V2I for interaction with traffic signals and roadside infrastructure, and V2N for cloud connectivity. It targets the two dominant protocol standards — DSRC in the 5.9 GHz band and C-V2X over cellular networks.</p>

      <h2>System architecture</h2>
      <p>The system has four primary components: an in-vehicle device with GPS and V2X modules, a mobile application for the user interface and sensor data collection, a cloud backend for machine learning and data aggregation, and integration with city infrastructure through roadside units.</p>

      <h2>Algorithms and data processing</h2>
      <p>Two core algorithms drive the experience: a speed-recommendation algorithm that computes optimal velocity from the distance to the next traffic signal and its time-to-green, and a traffic-flow prediction model using LSTM neural networks implemented in TensorFlow.</p>

      <h2>Privacy and security</h2>
      <p>The design emphasizes AES-256 encryption, rotating vehicle identifiers to prevent tracking, prioritizing local on-device processing, and secure boot implementations.</p>

      <h2>Open challenges</h2>
      <p>Latency management, scaling to millions of vehicles, interoperability across vendor systems, edge-case handling, and regulatory compliance remain the critical problems for real deployment.</p>
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
