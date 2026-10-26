/**
 * Portfolio Data Configuration
 * Easily customize these variables to personalize your portfolio.
 */

export interface PortfolioConfig {
  NAME: string;
  ROLE: string;
  SHORT_INTRO: string;
  PROFILE_IMAGE: string;
  RESUME_LINK: string;
  LOCATION: string;
  STATUS?: string;
  EMAIL: string;
  GITHUB: string;
  LINKEDIN?: string;
  TWITTER?: string;
  HUGGINGFACE?: string;
}

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  NAME: "Aadinath R",
  ROLE: "AI/ML Engineer & Full-Stack Developer",
  SHORT_INTRO: "I engineer distributed neural architectures, autonomous agent workflows, and resilient full-stack systems. Passionate about turning complex multimodal research into simple, high-impact products.",
  PROFILE_IMAGE: "./assets/images/hero.webp",
  RESUME_LINK: "#resume",
  LOCATION: "Bengaluru, India",
  STATUS: "",
  EMAIL: "aadinath.r2004@gmail.com",
  GITHUB: "https://github.com/aadinath-r",
  LINKEDIN: "https://linkedin.com/in/aadinath-r",
  // TWITTER: "https://x.com/aadinath_dev",
  // HUGGINGFACE: "https://huggingface.co/aadinath-r"
};

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  impact?: string;
  category: "AI / ML" | "Computer Vision" | "Agentic Systems" | "Full-Stack";
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  isFeatured?: boolean;
  metrics?: { label: string; value: string }[];
}

export const FEATURED_PROJECT: ProjectItem = {
  id: "project-auditSum",
  title: "AuditSum",
  subtitle: "Real-time Edge Multimodal Perception & Spatial Reasoning",
  description: "A low-latency vision-language model serving system designed for real-time robotic telemetry and zero-shot visual question answering, operating at sub-35ms inference latency.",
  impact: "Achieved 4.2x throughput increase and 47% reduction in GPU VRAM consumption across 1.2M daily visual tokens.",
  category: "Computer Vision",
  technologies: ["PyTorch", "TensorRT", "CUDA", "FastAPI", "WebRTC", "React"],
  imageUrl: "./assets/images/auditsum_thumbnail.webp",
  liveUrl: "https://omni-percept-demo.vercel.app",
  githubUrl: "https://github.com/aadinathr001/auditsum",
  isFeatured: true,
  // metrics: [
  //   { label: "Inference Latency", value: "32ms" },
  //   { label: "Throughput Gain", value: "+320%" },
  //   { label: "Daily Queries", value: "1.2M" }
  // ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  FEATURED_PROJECT,
  {
    id: "project-frameMind",
    title: "FrameMind",
    subtitle: "YouTube Video Q&A & Study Notebook",
    description: "FrameMind is an AI-powered video research and study workspace that transforms YouTube videos into interactive learning resources. It extracts video transcripts, generates structured summaries, identifies key takeaways, and enables users to ask questions with timestamp-grounded answers.The platform supports multiple AI providers, including Ollama (Local), Groq, Gemini, and OpenAI, allowing users to choose between private local inference and cloud-based models.",
    // impact: "",
    category: "Agentic Systems",
    technologies: ["Python", "LangGraph", "FastAPI", "TypeScript", "Node.js", "React.js", "Tailwind CSS"],
    imageUrl: "./assets/images/project_agent_flow_1791209224739.jpg",
    // liveUrl: "https://nexus-agent-mesh.vercel.app",
    githubUrl: "https://github.com/aadinathr001/framemind",
    // metrics: [
    //   { label: "Autonomous Success", value: "94.6%" },
    //   { label: "DAG Depth", value: "12 nodes" }
    // ]
  },
  {
    id: "project-resumeIQ",
    title: "ResumeIQ",
    subtitle: "Evidence-Based Resume & Job Matching Engine",
    description: "ResumeIQ is a production-grade, local-first intelligence platform that evaluates candidate resumes against job descriptions through a multi-stage deterministic pipeline. Instead of relying on a black-box LLM match percentage, ResumeIQ uses language models strictly for structured parsing and grounded reasoning, while employing deterministic code for canonical skill normalization, evidence verification, and weighted compatibility scoring.",
    // impact: "Boosted retrieval context recall from 68% to 92.4% on complex multi-hop technical documentation queries.",
    category: "AI / ML",
    technologies: ["Python","RAG","LLM","React.js","TypeScript","Node.js"],
    imageUrl: "./assets/images/project_rag_engine_1791209236235.jpg",
    // liveUrl: "https://hypervector-rag.vercel.app",
    githubUrl: "https://github.com/aadinath-r/hypervector-rag-core",
    // metrics: [
    //   { label: "Context Recall", value: "92.4%" },
    //   { label: "P99 Query Time", value: "14ms" }
    // ]
  },
  {
    id: "project-paperLens",
    title: "PaperLens",
    subtitle: "Session-based RAG assistant",
    description: "Upload PDF/TXT documents, ask questions, and get grounded answers with source citations using a custom HTML/CSS/JS frontend powered by a FastAPI backend.",
    // impact: "Over 8,000 community research stars and deployed as a teaching sandbox in academic machine learning labs.",
    category: "AI / ML",
    technologies: ["Python", "PostgreSQL", "SQLAlchemy 2", "FastAPI", "Jinja@", "Docker","Argon2","RAG","LLM"],
    imageUrl: "./assets/images/project_featured_neural_1791209209904.jpg",
    // liveUrl: "https://latentflow-studio.vercel.app",
    githubUrl: "https://github.com/aadinathr001/paperlens",
    // metrics: [
    //   { label: "WebGPU FPS", value: "60 FPS" },
    //   { label: "GitHub Stars", value: "8.2k" }
    // ]
  },
  {
    id: "project-healthPing",
    title: "HealthPing",
    subtitle: "API Health Monitor",
    description: "A real-time API uptime, response latency, and availability monitoring dashboard",
    // impact: "Eliminated silent production model degradation, cutting mean-time-to-detection from 4 days to 8 minutes.",
    category: "Full-Stack",
    technologies: ["TypeScript", "React", "Node.js","Express","Tailwind CSS","Vite"],
    imageUrl: "./assets/images/project_agent_flow_1791209224739.jpg",
    // liveUrl: "https://synapse-mlops.vercel.app",
    githubUrl: "https://github.com/aadinathr001/healthping",
    // metrics: [
    //   { label: "MTTD Reduction", value: "99%" },
    //   { label: "Cluster Uptime", value: "99.99%" }
    // ]
  }
];

export interface ExperienceItemData {
  role: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  technologies?: string[];
  highlights?: string[];
}

export const EXPERIENCE_DATA: ExperienceItemData[] = [
  {
    role: "Front-End Intern",
    company: "DataPMI Technologies LLP",
    location: "Kochi, India (Onsite)",
    period: "June 2025",
    description: "Work on a project with 4 intern team",
    technologies: ["Python", "React.js", "HTML", "CSS","FastAPI"],
    highlights: [
      "Assisted in collaborative product development for Prolex AI.",
      "Gained hands-on experience with React.js ,HTML, CSS, and JavaScript",
    ]
  },
  {
    role: "Software Development Intern",
    company: "Zyncrypt Technologies",
    location: "Kochi, India",
    period: "July 2024",
    // description: "Built end-to-end predictive telemetry pipelines, autonomous agent decision graphs, and interactive client-facing dashboards.",
    technologies: ["Python", "Linux"],
    // highlights: [
    //   "Deployed streaming anomaly detection system handling 450,000 events/sec with sub-second alerting.",
    //   "Designed and delivered the core analytics web portal used daily by 140+ enterprise operations teams.",
    //   "Reduced cloud computing costs by 34% through proactive GPU instance scheduling and auto-scaling pods."
    // ]
  },
  {
    role: "Machine Learning Intern",
    company: "Intrainz Innovation Pvt Ltd",
    location: "Kochi, India",
    period: "Feb 2024",
    // description: "Researched graph neural networks (GNNs) for recommendation systems and developed microservices in Python and TypeScript.",
    technologies: ["Python", "Machine Learning"],
    // highlights: [
    //   "Implemented heterogeneous graph convolutions that improved cold-start recommendation accuracy by 18%.",
    //   "Co-authored internal technical documentation and open-source benchmark suites for vector search."
    // ]
  }
];

export interface EducationItemData {
  degree: string;
  institution: string;
  location: string;
  period: string;
  field?: string;
  grade?: string;
  description?: string;
  skills?: string[];
  highlights?: string[];
}

export const EDUCATION_DATA: EducationItemData[] = [
  {
    degree: "B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    institution: "St Thomas College of Engineering & Technology (STCET),Chengannur",
    location: "Kerala, India",
    period: "2022 — 2026",
    field: "Computer Science & Artificial Intelligence",
    grade: "7.86 / 10 CGPA",
    description: "Comprehensive curriculum spanning deep learning, distributed algorithms, data structures, and computer vision systems.",
    skills: ["Data Structures & Algorithms","Machine Learning","Deep Learning", "Operating Systems","Linear Algebra", "Database Management","Internet of Things (IoT)","NLP","Cloud Computing","Software Testing","Soft Computing","Computer Networks"],
    highlights: [
      "Flasgship Coordinator, KTU CARE NSS Unit 553 ",
      "College Union Member",
      "Class Representative for Students Union",
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC) in Science",
    institution: "St Marys's Residential Public School ,Tiruvalla",
    location: "Kerala, India",
    period: "2020 — 2022",
    field: "Physics, Chemistry, Mathematics",
    grade: "72%",
    // description: "Foundational studies in higher mathematics, analytical physics, and early algorithmic programming in C++ and Python.",
    skills: ["Calculus", "Probability & Statistics", "Physics", "Chemistry"],
    // highlights: [
    //   "NSS Unit 553 Ktu Care Coordinator",
    // ]
  }
];

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  verificationUrl: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-ibm-ai",
    title: "Make Agentic AI Work for You",
    issuer: "IBM SkillsBuild",
    date: "2026",
    credentialId: "PWID-B1039700",
    skills: ["AI Agents", "Generative AI", "RAG", "AI Prompting Techniques"],
    verificationUrl: "https://www.credly.com/badges/65279f45-8927-48e4-bcb2-a2328036937d/public_url"
  }
];

export interface TechItem {
  id: string;
  name: string;
  initials: string;
  category: "AI & ML" | "Frontend" | "Backend" | "Design" | "Workflow";
  type: string;
  description: string;
  goodFor: string;
  docsUrl: string;
}

export const TECH_CATEGORIES = [
  "AI & ML",
  "Frontend",
  "Backend",
  "Design",
  "Workflow"
] as const;

export type TechCategoryType = (typeof TECH_CATEGORIES)[number];

export const TECH_STACK_DATA: Record<TechCategoryType, TechItem[]> = {
  "AI & ML": [
    {
      id: "pytorch",
      name: "PyTorch",
      initials: "PT",
      category: "AI & ML",
      type: "Deep Learning Framework",
      description: "Primary foundation for developing custom neural architectures, loss formulations, and distributed model experimentation with native autograd support.",
      goodFor: "Custom neural network research, tensor computations, and fine-tuning foundation models.",
      docsUrl: "https://pytorch.org/docs"
    },
    {
      id: "tensorrt",
      name: "TensorRT & CUDA",
      initials: "TR",
      category: "AI & ML",
      type: "High-Performance Inference",
      description: "Low-level acceleration toolkit maximizing throughput on NVIDIA GPUs through kernel fusion, weight quantization, and memory buffer optimization.",
      goodFor: "Sub-50ms real-time vision, speech, and generative model deployment.",
      docsUrl: "https://developer.nvidia.com/tensorrt"
    },
    {
      id: "huggingface",
      name: "Transformers & Diffusers",
      initials: "HF",
      category: "AI & ML",
      type: "Model Ecosystem",
      description: "Industry standard repository and runtime for state-of-the-art vision-language, diffusion, and transformer checkpoints.",
      goodFor: "Rapid checkpoint loading, LoRA adapters, tokenization, and pipeline orchestration.",
      docsUrl: "https://huggingface.co/docs"
    },
    {
      id: "langgraph",
      name: "LangGraph & Agents",
      initials: "LG",
      category: "AI & ML",
      type: "Agent Orchestration",
      description: "Graph-based cyclical orchestration engine for stateful, multi-actor AI agent networks with checkpointing and human-in-the-loop validation.",
      goodFor: "Complex multi-step decision loops, tool-calling agents, and self-correcting pipelines.",
      docsUrl: "https://langchain-ai.github.io/langgraph"
    },
    {
      id: "vector-dbs",
      name: "Qdrant & Vector DBs",
      initials: "QD",
      category: "AI & ML",
      type: "High-Dimension Similarity Search",
      description: "High-throughput vector search engines utilizing HNSW graphs and payload filtering for production-scale retrieval augmented generation (RAG).",
      goodFor: "Sub-millisecond similarity search across millions of dense embedding vectors.",
      docsUrl: "https://qdrant.tech/documentation"
    },
    {
      id: "onnx",
      name: "ONNX Runtime",
      initials: "OX",
      category: "AI & ML",
      type: "Cross-Platform Execution",
      description: "Universal intermediate model representation enabling cross-platform model execution across CPU, edge devices, and WebAssembly in the browser.",
      goodFor: "Hardware-agnostic deployment and client-side browser inferencing.",
      docsUrl: "https://onnxruntime.ai/docs"
    }
  ],
  "Frontend": [
    {
      id: "react",
      name: "React 19 & Next.js",
      initials: "RC",
      category: "Frontend",
      type: "UI Architecture",
      description: "Component-driven paradigm powering reactive client interfaces, server components, and responsive state machines with smooth transitions.",
      goodFor: "High-performance reactive user experiences, data dashboards, and interactive canvases.",
      docsUrl: "https://react.dev"
    },
    {
      id: "typescript",
      name: "TypeScript",
      initials: "TS",
      category: "Frontend",
      type: "Type-Safe Systems",
      description: "Strict static typing layer delivering rock-solid compile-time guarantees, API contract validation, and ergonomic DX across full-stack applications.",
      goodFor: "Refactoring safety, predictable API integrations, and scalable codebases.",
      docsUrl: "https://www.typescriptlang.org/docs"
    },
    {
      id: "tailwind",
      name: "Tailwind CSS v4",
      initials: "TW",
      category: "Frontend",
      type: "Utility Styling Engine",
      description: "Modern CSS engine enabling precision typography scales, micro-interactions, dark mode elevation, and zero-runtime CSS footprint.",
      goodFor: "Rapid, consistent design token implementation and sophisticated glassmorphism.",
      docsUrl: "https://tailwindcss.com/docs"
    },
    {
      id: "framer-motion",
      name: "Motion (Framer)",
      initials: "FM",
      category: "Frontend",
      type: "Fluid Motion Physics",
      description: "Physics-driven animation library providing gesture control, layout transitions, exit animations, and hardware-accelerated transforms.",
      goodFor: "Buttery-smooth UI transitions, tab indicators, and timeline expansions.",
      docsUrl: "https://motion.dev"
    }
  ],
  "Backend": [
    {
      id: "python",
      name: "FastAPI & Python 3.12",
      initials: "FA",
      category: "Backend",
      type: "High-Speed Async API",
      description: "Asynchronous ASGI framework with Pydantic data schemas, automatic OpenAPI documentation, and native async concurrency.",
      goodFor: "AI microservices, model serving endpoints, and high-concurrency websocket streams.",
      docsUrl: "https://fastapi.tiangolo.com"
    },
    {
      id: "nodejs",
      name: "Node.js & Express",
      initials: "ND",
      category: "Backend",
      type: "Runtime Environment",
      description: "High-throughput non-blocking event-driven runtime ideal for real-time collaboration servers, authentication proxies, and cloud functions.",
      goodFor: "Full-stack server APIs, OAuth handshakes, and event stream proxies.",
      docsUrl: "https://nodejs.org/docs"
    },
    {
      id: "postgres",
      name: "PostgreSQL & Drizzle",
      initials: "PG",
      category: "Backend",
      type: "Relational Storage",
      description: "ACID-compliant relational database engine augmented with JSONB, pgvector extensions, and type-safe schema migrations.",
      goodFor: "Relational data modeling, vector-embedded search, and transactional integrity.",
      docsUrl: "https://www.postgresql.org/docs"
    },
    {
      id: "redis",
      name: "Redis & Upstash",
      initials: "RD",
      category: "Backend",
      type: "In-Memory Data Grid",
      description: "Ultra-low latency in-memory key-value store for distributed caching, session state management, Pub/Sub channels, and rate limiting.",
      goodFor: "Fast session tokens, inference result caching, and realtime message broker.",
      docsUrl: "https://redis.io/docs"
    }
  ],
  "Design": [
    {
      id: "figma",
      name: "Figma & Tokens",
      initials: "FG",
      category: "Design",
      type: "Interface Architecture",
      description: "Collaborative design environment used for component variant design, responsive layouts, design token mapping, and interactive prototypes.",
      goodFor: "Systematic UI layout planning, interactive wireframing, and SVG asset refinement.",
      docsUrl: "https://help.figma.com"
    },
    {
      id: "lucide",
      name: "Lucide Icons",
      initials: "LC",
      category: "Design",
      type: "Iconography System",
      description: "Clean, consistent 24px grid iconography crafted with geometric clarity and adaptable stroke weights for dark and light surfaces.",
      goodFor: "Clean functional affordances, navigation icons, and status badges.",
      docsUrl: "https://lucide.dev"
    },
    {
      id: "typography",
      name: "Editorial Typography",
      initials: "TY",
      category: "Design",
      type: "Font Pairings & Scale",
      description: "Disciplined pairing of authoritative display type (Manrope 800/700) with highly legible neutral body prose (Inter 400/500) and tabular monospaces.",

      goodFor: "Creating distinctive visual presence without relying on generic AI styling.",
      docsUrl: "https://fonts.google.com"
    }
  ],
  "Workflow": [
    {
      id: "docker",
      name: "Docker & Containers",
      initials: "DK",
      category: "Workflow",
      type: "Containerization",
      description: "Reproducible runtime environments isolating CUDA dependencies, Python virtualenvs, and production microservices across cloud targets.",
      goodFor: "Hermetic machine learning builds and frictionless local-to-cloud parity.",
      docsUrl: "https://docs.docker.com"
    },
    {
      id: "git",
      name: "Git & GitHub CI/CD",
      initials: "GH",
      category: "Workflow",
      type: "Version Control & Automation",
      description: "Automated test suites, model verification checks, linting pipelines, and trunk-based deployment workflows.",
      goodFor: "Continuous integration, automated preview deployments, and code quality gating.",
      docsUrl: "https://docs.github.com"
    },
    {
      id: "vercel",
      name: "Vercel & Edge CDN",
      initials: "VC",
      category: "Workflow",
      type: "Cloud Edge Hosting",
      description: "Zero-configuration continuous deployment platform with global edge caching, instant preview links, and serverless compute.",
      goodFor: "Deploying high-speed production portfolios, frontend web apps, and edge redirects.",
      docsUrl: "https://vercel.com/docs"
    },
    {
      id: "wandb",
      name: "Weights & Biases",
      initials: "WB",
      category: "Workflow",
      type: "ML Experiment Tracking",
      description: "Centralized experimentation dashboard recording loss curves, hyperparameter sweeps, model artifacts, and hardware GPU utilization.",
      goodFor: "Rigorous ML experiment tracking and reproducible research milestones.",
      docsUrl: "https://docs.wandb.ai"
    }
  ]
};
