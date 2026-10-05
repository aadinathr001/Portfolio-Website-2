import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  retrieveRelevantContext,
  buildRAGPrompt,
} from "./src/utils/ragEngine.ts";

dotenv.config();
// console.log("PORT:", process.env.PORT);
// console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
// console.log("GROQ_MODEL:", process.env.GROQ_MODEL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GroqApiResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;

  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  );
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const body =
        req.body && typeof req.body === "object"
          ? (req.body as Record<string, unknown>)
          : {};

      const message =
        typeof body.message === "string" ? body.message.trim() : "";

      if (!message) {
        return res
          .status(400)
          .json({ error: "Missing or invalid 'message' parameter." });
      }

      const groqApiKey = process.env.GROQ_API_KEY?.trim();

      if (!groqApiKey) {
        return res.status(503).json({
          error: "GROQ_API_KEY is not configured on the server.",
        });
      }

      const history: ChatMessage[] = Array.isArray(body.history)
        ? body.history
            .filter(isChatMessage)
            .slice(-6)
            .map((item) => ({
              role: item.role,
              content: item.content.slice(0, 4000),
            }))
        : [];

      // Include recent user turns so follow-up questions can retrieve the
      // correct portfolio records.
      const retrievalQuery = [
        ...history
          .filter((item) => item.role === "user")
          .slice(-2)
          .map((item) => item.content),
        message,
      ].join("\n");

      const retrievedChunks = retrieveRelevantContext(retrievalQuery, 6).map(
        (result) => result.chunk
      );

      const { systemPrompt, userPrompt } = buildRAGPrompt(
        message,
        retrievedChunks
      );

      const sources = retrievedChunks.map((chunk) => ({
        id: chunk.id,
        title: chunk.title,
        category: chunk.category,
      }));

      // Override this with a model ID enabled for your Groq account.
      // "gptoss:20b" is not the usual Groq API model ID format. || "openai/gpt-oss-20b"
      const model =
        process.env.GROQ_MODEL?.trim() ;

      const groqResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              ...history,
              { role: "user", content: userPrompt },
            ],
            temperature: 0.2,
            max_tokens: 700,
          }),
        }
      );

      const data = (await groqResponse.json().catch(() => null)) as
        | GroqApiResponse
        | null;

      if (!groqResponse.ok) {
        const details =
          data?.error?.message ?? `Groq returned HTTP ${groqResponse.status}.`;

        console.error("Groq API error:", details);

        return res.status(502).json({
          error: "Groq API request failed.",
          details,
        });
      }

      const answer = data?.choices?.[0]?.message?.content?.trim();

      if (!answer) {
        return res.status(502).json({
          error: "Groq returned an empty response.",
        });
      }

      return res.json({
        answer,
        sources,
        model,
      });
    } catch (err: unknown) {
      console.error("Chat API error:", err);

      return res.status(500).json({
        error: "Internal server error during chat synthesis.",
      });
    }
  });

  // Mount Vite middleware in development or serve dist in production.
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
  });
}

startServer();
