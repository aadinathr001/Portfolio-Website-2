export interface CaseStudy {
  role?: string;
  timeline?: string;
  team?: string;
  status?: string;
  overview: string;
  goals: string[];
  problem: { summary: string; points: string[] };
  approach: { title: string; detail: string }[];
  architecture: { layer: string; detail: string }[];
  challenges: { challenge: string; solution: string }[];
  results: string[];
  learnings: string[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "project-auditSum": {
    overview:
      "AuditSum is a governed LLM summarization service built to prove what was allowed, what happened, and where every output came from. Instead of stopping at 'upload a file, call an LLM, show the result,' the project treats the LLM call as the easy part and centers the engineering on the layer around it: role-based access control, a policy engine, a hash-chained audit log, and citation verification that catches the model when it fabricates quotes.",
    goals: [
      "Make every LLM interaction auditable and tamper-evident from upload to output",
      "Enforce policy decisions (access, file type, PII, budget) before any document is processed",
      "Verify that model-generated citations actually exist as substrings of the source text",
      "Provide full traceability so any run is reconstructable from input hash to final summary",
    ],
    problem: {
      summary:
        "Most AI summarizers are thin wrappers that call an LLM and display the result, with no way to prove what the system did, what it was allowed to do, or whether its outputs are grounded in the source — the exact problem real governance, compliance, and security teams face with LLM deployments.",
      points: [
        "No audit trail means you can't reconstruct what happened after the fact or detect tampering with historical records.",
        "LLMs hallucinate citations — models confidently produce quotes that don't exist anywhere in the source document.",
        "Without policy enforcement, any user can upload anything, bypassing size limits, file-type restrictions, or PII safeguards.",
      ],
    },
    approach: [
      {
        title: "Hash-chained, append-only audit log",
        detail:
          "Every meaningful action (login, upload, policy decision, LLM call, run completion) is written as an event whose SHA-256 hash includes the previous event's hash. A Postgres trigger rejects UPDATE/DELETE outright, and advisory locks prevent concurrent writes from forking the chain.",
      },
      {
        title: "Ordered policy engine with full decision recording",
        detail:
          "Every document upload passes through admin kill switch → file type allowlist → size limit → PII scan (regex-based email/phone detection with redaction). Every decision, allow or deny, is recorded in the audit log.",
      },
      {
        title: "Citation verification against source text",
        detail:
          "The model is prompted to support every key point with an exact quote. Each quote is checked as a real substring of the original text after Unicode and whitespace normalization — verified and unverified citations are surfaced with a per-run verification rate.",
      },
      {
        title: "Map-reduce pipeline with token circuit breaker",
        detail:
          "Long documents are chunked on paragraph boundaries with overlap, summarized independently, then combined in a reduce step. A daily token budget triggers automatic fallback to a deterministic mock provider, counting only real-provider usage so the breaker can't inflate itself.",
      },
    ],
    architecture: [
      {
        layer: "Client UI",
        detail:
          "Server-rendered Jinja2 templates with role-aware navigation, an auditor console for browsing every table, and an admin page for kill-switch controls.",
      },
      {
        layer: "API & Auth",
        detail:
          "FastAPI with RBAC (user/admin/auditor), Argon2 password hashing, signed session cookies, and per-IP rate limiting on LLM-quota endpoints.",
      },
      {
        layer: "Policy & Pipeline",
        detail:
          "Ordered policy checks, paragraph-aware chunking with overlap, map-reduce orchestration, citation verification, and daily token circuit breaker.",
      },
      {
        layer: "LLM Provider",
        detail:
          "Swappable provider interface — Groq (gpt-oss-120b) via OpenAI-compatible client for production, deterministic mock provider for dev and circuit-breaker fallback with retry and exponential backoff.",
      },
      {
        layer: "Data & Audit",
        detail:
          "PostgreSQL (Neon) with SQLAlchemy 2, Alembic migrations, hash-chained audit log, DB-enforced immutability triggers, and advisory locks for concurrency-safe chain writes.",
      },
    ],
    challenges: [
      {
        challenge: "Concurrent audit writes could fork the hash chain",
        solution:
          "Used Postgres advisory locks to serialize chain appends so simultaneous requests can't produce divergent histories.",
      },
      {
        challenge: "LLMs return malformed JSON or hallucinated quotes",
        solution:
          "Added structured output validation with one repair attempt on bad JSON before failing cleanly, and substring verification of every citation against the normalized source text.",
      },
      {
        challenge: "Unbounded LLM spend on a free-tier budget",
        solution:
          "Implemented a daily token circuit breaker that counts only real-provider usage and falls back to a deterministic mock provider without inflating its own counter.",
      },
    ],
    results: [
      "Every document upload, policy decision, LLM call, and run completion is recorded in a tamper-evident, hash-chained audit log verified end-to-end.",
      "Citation verification catches hallucinated quotes — verified and unverified citations are surfaced with a per-run verification rate.",
      "Full run traceability: input hash, provider, model, strategy, token counts, and step-by-step LLM interaction history for every summary.",
      "Zero-cost deployment end-to-end: free Neon database, free Groq LLM tier, free Render hosting.",
    ],
    learnings: [
      "The LLM call is the easy part — the governance, policy, and audit layer around it is where the actual engineering complexity lives.",
      "Tamper-evident is not tamper-proof; naming that gap honestly (someone with full DB access could recompute the chain) is more valuable than overselling the guarantee.",
      "Citation verification proves a quote exists in the source, not that the model's interpretation of it is fair — a narrower but still genuinely useful guarantee worth being explicit about.",
    ],
  },


  "project-frameMind": {
    // role: "Architect & Lead Engineer",
    // timeline: "2023 — 2024",
    // team: "Small engineering team",
    // status: "In production",
    overview:
      "FrameMind is an AI-powered video research and study workspace that transforms YouTube videos into interactive learning resources. It extracts video transcripts, generates structured summaries, identifies key takeaways, and enables users to ask questions with timestamp-grounded answers.The platform supports multiple AI providers, including Ollama (Local), Groq, Gemini, and OpenAI, allowing users to choose between private local inference and cloud-based models.",
    goals: [
      "Transform YouTube videos into structured, interactive study materials.",
      "Automate transcript extraction and AI-powered summarization.",
      "Enable context-aware Q&A using transcript-grounded retrieval.",
      "Provide clickable timestamp references for accurate source verification.",
      "Support multiple AI providers, including private local inference.",
    ],
    problem: {
      summary:
        "YouTube contains valuable educational content, but extracting specific information from lengthy videos can be inefficient.",
      points: [
        "Finding relevant information requires manually navigating lengthy videos.",
        "Revisiting important concepts involves repeatedly searching through playback.",
        "Videos lack structured, personalized study notes.",
        "Generic AI summaries often lack verifiable references to the original content.",
        "Many AI-powered learning tools restrict users to a single model provider.",
      ],
    },
    approach: [
      { title: "Video Ingestion", detail: "Accept a YouTube URL and retrieve available transcripts using a multi-tier extraction mechanism. Users can alternatively upload subtitle files." },
      { title: "Content Processing", detail: "Convert transcripts into structured, timestamped segments." },
      { title: "AI Summarization", detail: "Generate executive summaries, numbered key takeaways, and chronological chapter breakdowns." },
      { title: "Grounded Q&A", detail: "Retrieve relevant transcript passages to answer user questions with timestamp references." },
      {title: "Interactive Learning",detail:"Connect generated answers, chapters, and transcript segments to synchronized YouTube playback."}
    ],

    architecture: [
      { layer: "Frontend", detail: "React 19 provides the study workspace, interactive transcripts, AI chat, and embedded YouTube player." },
      { layer: "Backend", detail: "Node.js and Express manage REST APIs, transcript processing, and AI requests." },
      { layer: "Transcript Engine", detail: "Multi-tier extraction retrieves YouTube captions, with fallback support for uploaded subtitle files." },
      { layer: "AI Orchestration", detail: "A unified model dispatcher routes requests across Ollama, Groq, Gemini, and OpenAI." },
      { layer: "Retrieval & Q&A", detail: "Transcript-based semantic retrieval supplies relevant context for grounded answers with timestamp citations." },
      { layer: "Video Integration", detail: "YouTube IFrame Player API synchronizes playback with transcripts, chapters, and AI-generated answers." },
      { layer: "Configuration", detail: "Environment variables and in-app settings manage provider credentials, model selection, and connection testing." },
    ],

    challenges: [
      { challenge: "Unreliable YouTube Transcript Extraction", solution: "Designed a multi-tier transcript extraction strategy with fallback methods and support for manually uploaded SRT, VTT, TXT, and JSON transcripts." },
      { challenge: "AI Hallucinations and Unverifiable Answers", solution: "Implemented a transcript-grounded retrieval approach that supplies relevant passages to the AI model and associates answers with clickable timestamp references." },
      { challenge: "Supporting Multiple AI Providers", solution: "Introduced a unified model dispatcher that abstracts provider-specific communication and supports configurable models, connection testing, and retry handling." },
      { challenge: "Connecting AI Responses to Video Playback", solution: "Integrated the YouTube IFrame Player API to enable timestamp-based seeking directly from transcript segments, generated chapters, and chat responses." },
    ],
    results: [
      "Structured executive summaries, key takeaways, and chapter breakdowns.",
      "Conversational Q&A grounded in video transcripts.",
      "Clickable timestamps linked to synchronized video playback.",
      "Searchable transcripts and support for uploaded subtitle files.",
      "Flexible AI provider selection, including local Ollama inference.",
      "A responsive, editorial-style interface designed for focused learning.",
    ],
    learnings: [
      "Developing FrameMind reinforced the importance of designing AI applications around reliable source information rather than relying entirely on language-model-generated responses.",
      "One key takeaway was that effective AI integration extends beyond connecting to an API. Transcript quality, context retrieval, response grounding, error handling, and user interaction all contribute to the usefulness of the final application.",
      "Building a provider-independent architecture also highlighted the value of modular software design, allowing AI models to be changed without restructuring the entire application.",
      "The project strengthened my understanding of React, Express, REST APIs, multi-provider LLM integration, and retrieval-based AI workflows.",
      "Future improvements include persistent study notebooks, cross-video knowledge retrieval, automatic flashcard generation, and exportable study materials.",
    ],
  },

  "project-resumeIQ": {
    overview:
      "ResumeIQ is a local-first intelligence platform that evaluates candidate resumes against job descriptions through a multi-stage deterministic pipeline. Language models handle structured parsing and grounded reasoning, while all scoring, skill normalization, and evidence verification run through testable, reproducible code — so no LLM ever invents a number.",
    goals: [
      "Eliminate hallucinated match scores by decoupling LLM extraction from deterministic scoring",
      "Trace every matched or missing requirement to a verbatim citation in the candidate's resume",
      "Support pluggable AI providers (Ollama, Groq, OpenAI) with full execution telemetry for benchmarking",
      "Ship an end-to-end workflow from PDF ingestion through human-reviewed schema correction to actionable recommendations",
    ],
    problem: {
      summary:
        "Existing resume-screening tools either produce opaque LLM-generated match percentages that vary between runs, or rely on naive keyword matching that confuses related-but-distinct skills. Neither approach gives candidates or recruiters a verifiable, auditable explanation for why a score is what it is.",
      points: [
        "Black-box LLM match scores are non-reproducible and impossible to audit, undermining trust with technical hiring teams.",
        "Pure keyword or embedding-based matching conflates related skills (e.g., Docker vs. Kubernetes, PyTorch vs. TensorFlow), inflating false positives.",
        "Single-provider AI lock-in prevents comparing extraction quality across models, hiding accuracy regressions.",
        "Candidates receive generic feedback with no traceable link between a low score and the specific resume text that caused it.",
      ],
    },
    approach: [
      {
        title: "Separate understanding from judgment",
        detail:
          "LLMs are restricted to structured JSON extraction and grounded text generation. All numerical scores are computed by a deterministic weighted-sum formula (S = Σ wᵢ × cᵢ) operating on verified citations, guaranteeing identical outputs across runs.",
      },
      {
        title: "Normalize before matching",
        detail:
          "Built a version-controlled canonical skill taxonomy with explicit alias mappings and directional relationships (e.g., 'Retrieval-Augmented Generation' → 'RAG', PostgreSQL → SQL) so matching operates on resolved identities, not raw strings.",
      },
      {
        title: "Verify every claim against source text",
        detail:
          "The evidence verifier performs substring and section-level citation checks against the parsed resume, tagging each requirement as Matched, Partial, or Not Evidenced with the exact quoted text and source section.",
      },
      {
        title: "Abstract the AI provider behind a unified interface",
        detail:
          "Implemented an AIProviderManager with adapters for local Ollama, Groq Cloud, and OpenAI. Every call records latency in milliseconds, token counts, schema validation status, retry count, and error diagnostics for cross-model benchmarking.",
      },
      {
        title: "Insert a human-in-the-loop correction stage",
        detail:
          "After LLM extraction, candidates and reviewers interact with a schema editor to correct contact details, recategorize skills, and fix work history before the profile is committed — catching parsing errors before they propagate into scores.",
      },
    ],
    architecture: [
      {
        layer: "Ingestion & UI",
        detail:
          "React frontend with Technical Swiss design system. Drag-and-drop PDF/text parser, interactive schema editor, job requirement classifier, and a real-time match simulator with tabular-numeral score displays.",
      },
      {
        layer: "Deterministic Processing Engine",
        detail:
          "Core layer containing the Skill Normalizer (alias dictionary lookup), Evidence Verifier (substring citation validation), Scoring Engine (configurable 35/25/20/10/10 category weights), and Benchmark Suite for precision evaluation.",
      },
      {
        layer: "Multi-Provider AI Layer",
        detail:
          "Unified provider interface with Ollama (localhost:11434, qwen3:8b), Groq (openai/gpt-oss-20b), and OpenAI (gpt-4o-mini) adapters. Handles structured output prompting, schema validation, and automatic retry on malformed responses.",
      },
      {
        layer: "Storage & Telemetry",
        detail:
          "Relational store holding validated JSONB candidate profiles, classified job requirements, audited match runs with per-requirement citations, and AI execution logs capturing provider, model, latency, tokens, and validity flags.",
      },
    ],
    challenges: [
      {
        challenge: "LLM output schema drift across providers and model versions",
        solution:
          "Implemented strict JSON schema validation on every provider response with configurable retry logic. Malformed outputs trigger re-prompting with reinforced structural constraints before falling back to the human review stage.",
      },
      {
        challenge: "Semantic skill ambiguity that embeddings cannot resolve",
        solution:
          "Replaced cosine-similarity matching with an explicit alias taxonomy dictionary. Directional relationships (e.g., Kubernetes implies container orchestration but not Docker) prevent false equivalence between related-but-distinct technologies.",
      },
      {
        challenge: "Provider reliability and latency variance across local and cloud endpoints",
        solution:
          "Added real-time health probing per provider and a telemetry log that records every call's latency, token consumption, and error state. The provider switcher lets users route around degraded endpoints without restarting the pipeline.",
      },
      {
        challenge: "Ensuring score reproducibility when LLM extraction varies slightly between runs",
        solution:
          "Locked all scoring logic behind the deterministic engine that operates only on the committed, human-reviewed candidate schema — not on raw LLM output. Once a profile is finalized, identical job inputs always produce identical scores to the decimal.",
      },
    ],
    results: [
      "Deterministic scoring produces bit-identical results across repeated runs on the same finalized profile and job pair.",
      "Every requirement evaluation carries a verbatim resume citation with source section, eliminating ungrounded match claims.",
      "Three provider adapters (Ollama, Groq, OpenAI) with per-call telemetry enable direct extraction-quality benchmarking on identical inputs.",
      "Five-category weighted scoring (Technical 35%, Experience 25%, Projects 20%, Education 10%, Keywords 10%) with mandatory-requirement warning flags regardless of overall score.",
      "Interactive what-if simulator lets candidates toggle hypothetical achievements and observe deterministic score deltas in real time.",
    ],
    learnings: [
      "Decoupling language understanding from numerical judgment is the single most effective anti-hallucination pattern — let the model read, let the code count.",
      "Explicit taxonomies outperform embedding similarity for skill matching because the cost of a false positive is higher than the cost of maintaining a dictionary.",
      "Multi-provider telemetry turns AI integration from a black box into a benchmarkable engineering surface, revealing accuracy and latency trade-offs that single-provider setups hide.",
      "Human-in-the-loop correction after extraction is not a failure mode — it is a feature that catches the long tail of parsing errors before they corrupt downstream scores.",
    ],
  },

  "project-paperLens": {
    overview:
      "PaperLens is a session-based retrieval-augmented generation assistant that lets users upload PDF and TXT documents, ask natural-language questions, and receive grounded answers with page-level source citations. The entire stack is deliberately minimal — vanilla HTML/CSS/JS frontend, FastAPI backend, in-memory FAISS search, and a Groq-hosted LLM — with no heavy frameworks, no database, and no agent orchestration.",
    goals: [
      "Deliver grounded, citation-backed answers from user-uploaded documents without hallucination",
      "Keep the stack small enough to understand, debug, and deploy on a free hosting tier",
      "Provide page-level source traceability so users can verify every claim in the answer",
      "Resist prompt injection embedded in uploaded document content",
    ],
    problem: {
      summary:
        "Most RAG demos and tools pull in heavyweight orchestration frameworks, vector databases, and chat-history layers that obscure the actual retrieval pipeline. For a focused use case — 'upload a few papers, ask questions, get cited answers' — that complexity adds deployment friction, cold-start latency, and debugging surface without improving answer quality.",
      points: [
        "Framework-heavy RAG stacks (LangChain, agents, persistent vector DBs) are overkill for single-session document Q&A and make the retrieval path hard to inspect.",
        "Ungrounded LLM answers confidently fabricate details when the model has no explicit instruction to refuse.",
        "Users distrust answers that lack verifiable source references, especially for academic and technical documents.",
        "Free-tier deployment constraints (CPU-only, limited memory, cold starts) rule out GPU-dependent embedding models and always-on infrastructure.",
      ],
    },
    approach: [
      {
        title: "Strip to the essentials",
        detail:
          "Eliminated LangChain, agent loops, databases, authentication, and chat history. The pipeline is five explicit steps — extract, chunk, embed, retrieve, generate — each implemented in a single focused module with no abstraction layers hiding the data flow.",
      },
      {
        title: "Chunk with page-level metadata",
        detail:
          "Split documents into 600-word chunks with 100-word overlap using PyMuPDF, attaching source filename and page number to every chunk. This gives the LLM precise citation anchors and lets the UI show users exactly where an answer came from.",
      },
      {
        title: "Use inner-product search on normalized vectors",
        detail:
          "Embedded chunks with Sentence Transformers (all-MiniLM-L6-v2, L2-normalized) and indexed them in a FAISS IndexFlatIP. Because vectors are normalized, inner product equals cosine similarity — giving exact nearest-neighbor retrieval on CPU with no approximate-search accuracy trade-off.",
      },
      {
        title: "Enforce grounding at the prompt level",
        detail:
          "Instructed the Groq LLM to answer exclusively from the retrieved context, to respond with 'Information not found in uploaded documents' when the answer is absent, and to ignore any instructions embedded in the document text itself as a prompt-injection safeguard.",
      },
      {
        title: "Align index and metadata positionally",
        detail:
          "Kept the FAISS index and the metadata list in strict positional correspondence — index position N maps to metadata[N]. This avoids the overhead of a separate ID mapping layer while remaining reliable for the session-scoped, in-memory use case.",
      },
    ],
    architecture: [
      {
        layer: "Client",
        detail:
          "Vanilla HTML5, CSS3, and JavaScript. Async fetch calls to the REST API, DOM-rendered answers with expandable source chunks, and a session-reset control. No framework, no build step.",
      },
      {
        layer: "API Server",
        detail:
          "FastAPI with Jinja2 template rendering and Uvicorn. Two core endpoints: /api/process for document ingestion and /api/query for retrieval-augmented answering. Served behind Render's reverse proxy.",
      },
      {
        layer: "Document Processing",
        detail:
          "PyMuPDF extracts text with page-level granularity from PDFs; plain-text files are read directly. Output is cleaned and chunked at 600 words with 100-word overlap, each chunk carrying source and page metadata.",
      },
      {
        layer: "Retrieval",
        detail:
          "Sentence Transformers (all-MiniLM-L6-v2) produces 384-dimensional L2-normalized embeddings on CPU. FAISS IndexFlatIP performs exact top-4 cosine similarity search against the in-memory index.",
      },
      {
        layer: "Generation",
        detail:
          "Groq API (openai/gpt-oss-120b) receives the user question concatenated with the four retrieved chunks and a grounded system prompt. Returns a citation-backed answer or an explicit refusal.",
      },
    ],
    challenges: [
      {
        challenge: "Cold-start latency on Render free tier",
        solution:
          "Accepted the ~30-second spin-up as an inherent free-tier trade-off. Kept the model and index in-memory so that once warm, subsequent queries within the session are fast. Documented the constraint clearly for users.",
      },
      {
        challenge: "CPU-only embedding throughput",
        solution:
          "Chose the smallest viable embedding model (all-MiniLM-L6-v2, 22M parameters) that still produces high-quality sentence representations. Batched chunk embeddings during the processing step to amortize per-call overhead.",
      },
      {
        challenge: "Prompt injection through uploaded document content",
        solution:
          "Added explicit refusal instructions to the system prompt telling the LLM to treat all retrieved text as untrusted data, not as instructions. The model is directed to ignore any imperative language found in the chunks.",
      },
      {
        challenge: "In-memory state lifecycle without persistence",
        solution:
          "Scoped all state (FAISS index, metadata list, processed documents) to the server session. Provided a clear 'Clear Session & Reset' control that tears down the index and frees memory, preventing stale context from contaminating new queries.",
      },
    ],
    results: [
      "End-to-end RAG pipeline operational with zero framework dependencies — no LangChain, no vector database, no agent loop.",
      "Page-level source citations on every answer, letting users verify claims against the original document.",
      "Exact top-4 retrieval via FAISS IndexFlatIP on CPU with sub-second query latency for sessions up to 5 documents.",
      "Grounded system prompt with explicit refusal behavior eliminates hallucinated answers when context is insufficient.",
      "Single-command deployment to Render free tier with a render.yaml blueprint and one environment variable.",
    ],
    learnings: [
      "A five-step pipeline in three Python files is easier to debug, deploy, and explain than a framework-managed DAG with dozens of configurable nodes.",
      "L2-normalized embeddings with inner-product search give you exact cosine similarity for free — no need for a separate cosine index type or approximate search at small scale.",
      "Grounding is a prompt engineering problem before it is an architecture problem; a clear refusal instruction prevents most hallucinations without any additional guardrail infrastructure.",
      "Positional alignment between a vector index and a metadata list is fragile in production but perfectly adequate for session-scoped, in-memory use cases — match the mechanism to the scale.",
    ],
  },

  "project-healthPing": {
    overview:
      "HealthPing is a production-grade, real-time API uptime and latency monitoring dashboard that runs server-side network probes against any HTTP endpoint and surfaces availability percentages, response-time percentiles, and outage incidents on a live interactive dashboard. The core challenge was building a single-process full-stack tool that could bypass browser CORS restrictions, measure latency with sub-millisecond precision, and keep the UI in sync with a background probe engine without race conditions.",
    goals: [
      "Sub-millisecond probe timing accuracy using high-resolution server-side timers",
      "Continuous background monitoring with configurable intervals (10s–300s) and zero client dependency",
      "Real-time fleet visibility: availability %, p95 latency, 36-probe timeline bars, and a live event log",
    ],
    problem: {
      summary:
        "Modern applications depend on dozens of third-party and internal microservices that can degrade silently. Browser-based health checks are blocked by CORS, and client-side timers are unreliable due to tab throttling, making accurate uptime monitoring impossible from the frontend alone.",
      points: [
        "Browser Same-Origin Policy prevents direct pinging of arbitrary third-party and local microservice endpoints.",
        "Client-side JavaScript timers are throttled in background tabs, producing misleading latency and availability data.",
        "No single view existed to correlate status codes, latency percentiles, and outage timelines across an entire service fleet.",
      ],
    },
    approach: [
      {
        title: "Delegate all probes to the backend",
        detail:
          "Moved every HTTP probe into the Node.js process using native fetch with AbortController timeouts, eliminating CORS constraints and enabling monitoring of any reachable URL including localhost microservices.",
      },
      {
        title: "Build a non-blocking async cron scheduler",
        detail:
          "Implemented a 2-second polling loop that checks each monitor's due time, acquires an in-flight lock to prevent overlapping pings, and fires probes concurrently without blocking the Express event loop.",
      },
      {
        title: "Instrument with high-resolution timers",
        detail:
          "Wrapped every probe in performance.now() start/stop calls to capture true network round-trip latency independent of client CPU scheduling, then computed min, max, average, and p95 percentiles on the fly.",
      },
      {
        title: "Derive UI state immutably from probe history",
        detail:
          "Keyed all React modals and cards on stable monitor IDs and immutable ping arrays so that 2.5-second client polling cycles never caused stuck modals, stale renders, or race conditions.",
      },
    ],
    architecture: [
      {
        layer: "Client SPA",
        detail:
          "React 19 + TypeScript + Tailwind CSS v4 dashboard with status overview strip, endpoint cards, 36-probe timeline bars, SVG latency curves, add-endpoint modal with pre-flight test probes, and a live log stream viewer.",
      },
      {
        layer: "Unified server",
        detail:
          "Express 4 serves the Vite dev middleware in development and pre-built static assets in production, exposing REST routes for monitors, logs, debug telemetry, and cron control on a single port.",
      },
      {
        layer: "Probe engine",
        detail:
          "Async cron scheduler loop with in-flight check locks, native fetch + AbortController timeout management, and performance.now() high-resolution latency capture.",
      },
      {
        layer: "Mock layer",
        detail:
          "Built-in /api/mock/* endpoints returning nominal (200), failing (500), and degraded-latency (>800ms) responses so every UI state can be exercised without external dependencies.",
      },
      {
        layer: "Targets",
        detail:
          "External third-party APIs (GitHub, CoinGecko), local microservices (Django, Go, FastAPI, Flask), and the built-in mock sandbox.",
      },
    ],
    challenges: [
      {
        challenge: "CORS blocking browser-based health checks",
        solution:
          "Routed all probes through the Node.js backend where no Same-Origin Policy applies, enabling monitoring of any valid HTTP(S) URL including localhost services on arbitrary ports.",
      },
      {
        challenge: "Race conditions between background polling and UI interactions",
        solution:
          "Derived all component state from immutable monitor IDs and append-only ping arrays; modals reference stable IDs rather than object identity, so 2.5-second re-fetches never corrupt open dialogs.",
      },
      {
        challenge: "Overlapping probes inflating latency and skewing availability",
        solution:
          "Added an in-flight check lock per monitor ID that skips a scheduled probe if the previous one has not yet resolved, preventing duplicate counts and cascading timeouts under slow endpoints.",
      },
    ],
    results: [
      "Single-process full-stack dev server boots on one port with live reloading, eliminating multi-terminal orchestration.",
      "Server-side probes achieve sub-millisecond timing precision via performance.now(), unaffected by browser tab throttling.",
      "Three-tier status detection (Nominal / Degraded / Down) with configurable latency thresholds and expected status codes.",
      "Interactive 36-probe timeline bars and SVG latency curves give instant visual regression signals across the fleet.",
      "Built-in mock sandbox covers all failure modes locally, removing external service dependencies during development and demos.",
    ],
    learnings: [
      "Network monitoring must live on the server: any client-side approach will hit CORS walls and timer throttling that silently corrupt data.",
      "A background scheduler needs explicit concurrency guards; without in-flight locks, a single slow endpoint can cascade into duplicate probes and skewed metrics.",
      "Deriving UI state from stable identifiers rather than object references is the most reliable way to keep a polling-driven dashboard free of modal and render race conditions.",
    ],
  },



};