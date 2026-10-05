import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import {
  retrieveRelevantContext,
  generateLocalRAGAnswer
} from "../../utils/ragEngine";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ id: string; title: string; category?: string }>;
  timestamp: string;
  model?: string;
}

const SUGGESTED_QUERIES = [
  "What are his core AI/ML skills?",
  "Tell me about the OmniPercept engine",
  "What is his experience at NeuralPulse Labs?",
  "How can I contact or hire Aadinath?"
];

export interface ChatbotProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const nextValue = typeof value === "function" ? value(isOpen) : value;
    setInternalIsOpen(nextValue);
    onOpenChange?.(nextValue);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Session-based persistence
    try {
      const saved = sessionStorage.getItem("portfolio_chat_session");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: "welcome-1",
        role: "assistant",
        content:
          "Hello! I'm Aadinath's AI Portfolio Assistant. Ask me anything about his academic background, work experience etc",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem("portfolio_chat_session", JSON.stringify(messages));
    } catch {
      // ignore
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Prepare history for RAG session context
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      // Call server proxy route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer || "I apologize, I could not synthesize a response.",
        sources: data.sources || [],
        model: data.model || "gptoss:20b",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Client-side in-memory RAG fallback (no database required)
      const fallbackResults = retrieveRelevantContext(textToSend, 3);
      const fallbackChunks = fallbackResults.map((r) => r.chunk);
      const answer = generateLocalRAGAnswer(textToSend, fallbackChunks);

      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: answer,
        sources: fallbackChunks.map((c) => ({ id: c.id, title: c.title })),
        model: "in-memory-rag",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSession = () => {
    const fresh: ChatMessage[] = [
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Session refreshed. What would you like to explore regarding Aadinath's projects, technical stack, or background?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];
    setMessages(fresh);
    sessionStorage.removeItem("portfolio_chat_session");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right, Compact & Non-Obstructive) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Portfolio Chatbot"
            className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 border border-cyan-400/40 hover:border-cyan-400 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            {/* Ambient pulse dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>

            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-medium tracking-tight text-slate-200 group-hover:text-white">
              Ask AI
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Chatbot"
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? "inset-4 sm:inset-10"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh]"
          } flex flex-col rounded-2xl bg-[#090a0f]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08] bg-slate-900/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-['Manrope'] font-bold text-white tracking-tight">
                    Portfolio Assistant
                  </h3>

                  <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Live
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  In-Memory RAG Engine
                </div>
              </div>
            </div>


            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClearSession}
                title="Reset session history"
                className="p-1.5 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                aria-label="Clear chat session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse" : "Expand"}
                className="hidden sm:inline-flex p-1.5 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                aria-label="Toggle size"
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-cyan-600/30 text-white border border-cyan-400/30"
                      : "bg-slate-900/80 text-slate-200 border border-white/[0.07]"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed text-[12px] sm:text-[13px]">
                    {msg.content}
                  </p>

                  {/* RAG Sources Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400/80 mb-1">
                        <BookOpen className="w-3 h-3" />
                        <span>RETRIEVED PORTFOLIO CONTEXT:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[9.5px] font-mono text-slate-400 border border-white/[0.06]"
                          >
                            {s.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-1 text-[9px] font-mono text-slate-500 text-right">
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.07] flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    Retrieving knowledge & reasoning...
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Suggestions (when few messages) */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 shrink-0">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Suggested Questions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-left px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-slate-300 hover:text-white border border-white/[0.07] hover:border-cyan-400/30 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{q}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-cyan-400 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t border-white/[0.08] bg-slate-950/70 shrink-0">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AI models, projects, experience..."
                disabled={isLoading}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] focus:border-cyan-400/60 focus:outline-none text-xs text-white placeholder:text-slate-500 transition-colors font-sans"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500 text-slate-950 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-slate-500 px-1">
              <span>Database-free in-memory RAG</span>
              <span>Session stored</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
