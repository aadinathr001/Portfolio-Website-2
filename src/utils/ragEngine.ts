import {
  PORTFOLIO_CONFIG,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  TECH_STACK_DATA,
} from "../data/portfolioData";

export type KnowledgeCategory =
  | "profile"
  | "projects"
  | "experience"
  | "education"
  | "certificates"
  | "stack"
  | "contact";

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  keywords: string[];
}

export interface RetrievedResult {
  chunk: KnowledgeChunk;
  score: number;
}

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "of",
  "with", "by", "from", "is", "are", "was", "were", "what", "which",
  "who", "whom", "this", "that", "these", "those", "am", "have", "has",
  "had", "do", "does", "did", "can", "could", "would", "should", "tell",
  "me", "about", "your", "you", "my", "i", "it", "as", "be", "been",
  "how",
]);

const PLACEHOLDER_VALUE = /^(?:x+|placeholder|todo|n\/a|na)$/i;

function normalizeToken(token: string): string {
  if (token.length > 4 && token.endsWith("ies")) {
    return `${token.slice(0, -3)}y`;
  }

  if (
    token.length > 4 &&
    token.endsWith("s") &&
    !/(ss|us|is)$/.test(token)
  ) {
    return token.slice(0, -1);
  }

  return token;
}

export function tokenize(text: string): string[] {
  const tokens =
    text
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .match(/[a-z0-9]+(?:\+\+|#)?/g) ?? [];

  return tokens
    .map(normalizeToken)
    .filter(
      (token) =>
        (token.length > 1 || token === "c" || token === "r") &&
        !STOP_WORDS.has(token)
    );
}

function cleanText(value: unknown): string | undefined {
  if (
    typeof value !== "string" &&
    typeof value !== "number" &&
    typeof value !== "boolean"
  ) {
    return undefined;
  }

  const text = String(value).trim();

  if (!text || PLACEHOLDER_VALUE.test(text)) {
    return undefined;
  }

  return text;
}

function field(label: string, value: unknown): string | undefined {
  const text = cleanText(value);
  return text ? `${label}: ${text}` : undefined;
}

function listField(label: string, value: unknown): string | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .map(cleanText)
    .filter((item): item is string => Boolean(item));

  return items.length ? `${label}: ${items.join(", ")}` : undefined;
}

function bulletField(label: string, value: unknown): string | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = value
    .map(cleanText)
    .filter((item): item is string => Boolean(item));

  return items.length
    ? `${label}:\n${items.map((item) => `- ${item}`).join("\n")}`
    : undefined;
}

function metricsField(
  metrics: Array<{ label: string; value: string }> | undefined
): string | undefined {
  const items: string[] = [];

  for (const metric of metrics ?? []) {
    const label = cleanText(metric.label);
    const value = cleanText(metric.value);

    if (label && value) {
      items.push(`${label}: ${value}`);
    }
  }

  return items.length ? `Metrics: ${items.join("; ")}` : undefined;
}

function createChunk(
  id: string,
  title: string,
  category: KnowledgeCategory,
  lines: Array<string | undefined>
): KnowledgeChunk {
  const content = lines
    .filter(
      (line): line is string =>
        typeof line === "string" && line.trim().length > 0
    )
    .join("\n");

  return {
    id,
    title,
    category,
    content,
    // Keywords are generated from the portfolio data, not manually maintained.
    keywords: tokenize(`${title}\n${content}`),
  };
}

const profileChunk = createChunk(
  "profile",
  "Profile Summary",
  "profile",
  [
    field("Name", PORTFOLIO_CONFIG.NAME),
    field("Role", PORTFOLIO_CONFIG.ROLE),
    field("Summary", PORTFOLIO_CONFIG.SHORT_INTRO),
    field("Location", PORTFOLIO_CONFIG.LOCATION),
    field("Status", PORTFOLIO_CONFIG.STATUS),
    field("Resume", PORTFOLIO_CONFIG.RESUME_LINK),
  ]
);

const contactChunk = createChunk(
  "contact",
  "Contact & Social Links",
  "contact",
  [
    field("Email", PORTFOLIO_CONFIG.EMAIL),
    field("Location", PORTFOLIO_CONFIG.LOCATION),
    field("GitHub", PORTFOLIO_CONFIG.GITHUB),
    field("LinkedIn", PORTFOLIO_CONFIG.LINKEDIN),
    field("Twitter/X", PORTFOLIO_CONFIG.TWITTER),
    field("Hugging Face", PORTFOLIO_CONFIG.HUGGINGFACE),
  ]
);

const projectChunks: KnowledgeChunk[] = PROJECTS_DATA.map((project) =>
  createChunk(
    `project-${project.id}`,
    `Project: ${project.title}`,
    "projects",
    [
      field("Title", project.title),
      field("Subtitle", project.subtitle),
      field("Description", project.description),
      field("Impact", project.impact),
      field("Category", project.category),
      listField("Technologies", project.technologies),
      field("Live demo", project.liveUrl),
      field("Source code", project.githubUrl),
      project.isFeatured ? "Featured project: yes" : undefined,
      metricsField(project.metrics),
    ]
  )
);

const experienceChunks: KnowledgeChunk[] = EXPERIENCE_DATA.map(
  (experience, index) =>
    createChunk(
      `experience-${index + 1}`,
      `Experience: ${experience.role} at ${experience.company}`,
      "experience",
      [
        field("Role", experience.role),
        field("Company", experience.company),
        field("Location", experience.location),
        field("Period", experience.period),
        field("Description", experience.description),
        listField("Technologies", experience.technologies),
        bulletField("Highlights", experience.highlights),
      ]
    )
);

const educationChunks: KnowledgeChunk[] = EDUCATION_DATA.map(
  (education, index) =>
    createChunk(
      `education-${index + 1}`,
      `Education: ${education.degree}`,
      "education",
      [
        field("Degree", education.degree),
        field("Institution", education.institution),
        field("Location", education.location),
        field("Period", education.period),
        field("Field of study", education.field),
        field("Grade", education.grade),
        field("Description", education.description),
        listField("Skills", education.skills),
        bulletField("Highlights", education.highlights),
      ]
    )
);

const certificateChunks: KnowledgeChunk[] = CERTIFICATES_DATA.map(
  (certificate) =>
    createChunk(
      `certificate-${certificate.id}`,
      `Certificate / Certification: ${certificate.title}`,
      "certificates",
      [
        field("Title", certificate.title),
        field("Issuer", certificate.issuer),
        field("Date", certificate.date),
        field("Credential ID", certificate.credentialId),
        listField("Skills", certificate.skills),
        field("Verification URL", certificate.verificationUrl),
      ]
    )
);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const stackChunks: KnowledgeChunk[] = Object.entries(TECH_STACK_DATA).map(
  ([category, items]) => {
    const technologyDetails = items
      .map((item) =>
        [
          field("Technology", item.name),
          field("Type", item.type),
          field("Description", item.description),
          field("Good for", item.goodFor),
          field("Documentation", item.docsUrl),
        ]
          .filter((line): line is string => Boolean(line))
          .join("\n")
      )
      .join("\n\n");

    return createChunk(
      `stack-${slugify(category)}`,
      `${category} Tech Stack & Skills`,
      "stack",
      [
        field("Category", category),
        "Skills and technologies:",
        technologyDetails,
      ]
    );
  }
);

/**
 * Generated from portfolioData.ts whenever this module loads.
 * No portfolio facts are manually duplicated here.
 */
export const PORTFOLIO_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  profileChunk,
  ...projectChunks,
  ...experienceChunks,
  ...educationChunks,
  ...certificateChunks,
  ...stackChunks,
  contactChunk,
];

export function retrieveRelevantContext(
  query: string,
  topK = 6
): RetrievedResult[] {
  const limit = Number.isFinite(topK) ? Math.max(0, Math.floor(topK)) : 6;
  if (limit === 0) return [];

  const queryTokens = Array.from(new Set(tokenize(query)));
  const profile = PORTFOLIO_KNOWLEDGE_BASE.find(
    (chunk) => chunk.category === "profile"
  );

  // General questions such as "Who are you?" may contain only stop words.
  if (queryTokens.length === 0) {
    return profile ? [{ chunk: profile, score: 1 }] : [];
  }

  const documents = PORTFOLIO_KNOWLEDGE_BASE.map((chunk) => {
    const tokens = tokenize(`${chunk.title}\n${chunk.content}`);
    const frequencies = new Map<string, number>();

    for (const token of tokens) {
      frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
    }

    return {
      chunk,
      tokens,
      frequencies,
      titleTokens: new Set(tokenize(chunk.title)),
    };
  });

  const documentFrequencies = new Map<string, number>();

  for (const document of documents) {
    for (const token of new Set(document.tokens)) {
      documentFrequencies.set(
        token,
        (documentFrequencies.get(token) ?? 0) + 1
      );
    }
  }

  const averageLength =
    documents.reduce((sum, document) => sum + document.tokens.length, 0) /
      Math.max(documents.length, 1) || 1;

  const k1 = 1.5;
  const b = 0.75;

  const rankedResults = documents
    .map((document) => {
      let score = 0;

      for (const token of queryTokens) {
        const termFrequency = document.frequencies.get(token) ?? 0;
        if (termFrequency === 0) continue;

        const documentFrequency = documentFrequencies.get(token) ?? 0;
        const idf = Math.log(
          1 +
            (documents.length - documentFrequency + 0.5) /
              (documentFrequency + 0.5)
        );

        const lengthNormalization =
          termFrequency +
          k1 *
            (1 -
              b +
              (b * document.tokens.length) / averageLength);

        score +=
          idf * ((termFrequency * (k1 + 1)) / lengthNormalization);

        if (document.titleTokens.has(token)) {
          score += idf * 0.75;
        }
      }

      return { chunk: document.chunk, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  // Give the model profile data for an unmatched query so it can respond
  // that the requested information is not listed, rather than inventing it.
  if (rankedResults.length === 0) {
    return profile ? [{ chunk: profile, score: 0.01 }] : [];
  }

  return rankedResults.slice(0, limit);
}

export function buildRAGPrompt(
  query: string,
  retrievedChunks: KnowledgeChunk[]
): { systemPrompt: string; userPrompt: string } {
  const context = retrievedChunks.length
    ? retrievedChunks
        .map(
          (chunk, index) =>
            `[Source ${index + 1}: ${chunk.title} | ${chunk.category}]\n${chunk.content}`
        )
        .join("\n\n")
    : "[No matching portfolio records were retrieved.]";

  const systemPrompt = `You are an assistant answering questions about the owner of this portfolio.

The retrieved portfolio data below is your only source of portfolio facts.

--- RETRIEVED PORTFOLIO DATA ---
${context}
--- END PORTFOLIO DATA ---

Rules:
- Answer using only facts present in the retrieved portfolio data.
- Do not use prior knowledge to invent employers, degrees, projects, metrics, dates, or credentials.
- If the requested information is missing, say that it is not listed in the portfolio data. Do not guess.
- Preserve names, dates, numbers, and URLs as written.
- If portfolio fields appear inconsistent, do not invent an explanation.
- Chat history may help resolve references, but it is not a source of portfolio facts.
- Keep the answer clear, concise, and professional.`;

  return {
    systemPrompt,
    userPrompt: query,
  };
}

/**
 * Optional data-grounded fallback. The chat route below uses Groq directly,
 * rather than this function.
 */
export function generateLocalRAGAnswer(
  _query: string,
  retrievedChunks: KnowledgeChunk[]
): string {
  if (retrievedChunks.length === 0) {
    return "I couldn't find that information in the portfolio data.";
  }

  return retrievedChunks
    .map((chunk) => `**${chunk.title}**\n${chunk.content}`)
    .join("\n\n");
}