import React, { useState, useEffect } from "react";
import { Keyboard, X, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface KeyboardShortcutsProps {
  onOpenChatbot: () => void;
  onOpenResume?: () => void;
}

interface ShortcutItem {
  key: string;
  label: string;
  description: string;
  action: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onOpenChatbot,
  onOpenResume
}) => {
  const [hudMessage, setHudMessage] = useState<{ key: string; text: string } | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const scrollTo = (id: string, label: string, keyNumber: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      showHud(keyNumber, `Jumped to ${label}`);
    }
  };

  const showHud = (key: string, text: string) => {
    setHudMessage({ key, text });
  };

  useEffect(() => {
    if (!hudMessage) return;
    const timer = setTimeout(() => {
      setHudMessage(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [hudMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Never trigger if modifier keys are pressed (let browser shortcuts like Cmd+1, Ctrl+C pass through)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      // 2. Check if the active element or event target is an interactive form input
      const target = e.target as HTMLElement | null;
      const activeEl = document.activeElement as HTMLElement | null;

      const isInput = (el: HTMLElement | null) => {
        if (!el) return false;
        const tag = el.tagName.toLowerCase();
        return (
          tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          el.isContentEditable ||
          el.getAttribute("role") === "textbox"
        );
      };

      if (isInput(target) || isInput(activeEl)) {
        return;
      }

      // 3. Handle '1' through '7' section jump shortcuts
      switch (e.key) {
        case "1":
          e.preventDefault();
          scrollTo("about", "About", "1");
          break;
        case "2":
          e.preventDefault();
          scrollTo("projects", "Projects", "2");
          break;
        case "3":
          e.preventDefault();
          scrollTo("experience", "Experience", "3");
          break;
        case "4":
          e.preventDefault();
          scrollTo("education", "Education", "4");
          break;
        case "5":
          e.preventDefault();
          scrollTo("certificates", "Certificates", "5");
          break;
        case "6":
          e.preventDefault();
          scrollTo("stack", "Tech Stack", "6");
          break;
        case "7":
          e.preventDefault();
          scrollTo("contact", "Contact", "7");
          break;
        case "c":
        case "C":
          e.preventDefault();
          onOpenChatbot();
          showHud("C", "AI Chatbot Opened");
          break;
        case "?":
          e.preventDefault();
          setIsHelpOpen((prev) => !prev);
          break;
        case "Escape":
          if (isHelpOpen) {
            e.preventDefault();
            setIsHelpOpen(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHelpOpen, onOpenChatbot]);

  const shortcutsList: ShortcutItem[] = [
    { key: "1", label: "About", description: "Jump to Hero & Introduction", action: () => scrollTo("about", "About", "1") },
    { key: "2", label: "Projects", description: "Jump to Selected Projects", action: () => scrollTo("projects", "Projects", "2") },
    { key: "3", label: "Experience", description: "Jump to Career Timeline", action: () => scrollTo("experience", "Experience", "3") },
    { key: "4", label: "Education", description: "Jump to Academic History", action: () => scrollTo("education", "Education", "4") },
    { key: "5", label: "Certificates", description: "Jump to Verified Credentials", action: () => scrollTo("certificates", "Certificates", "5") },
    { key: "6", label: "Tech Stack", description: "Jump to Tooling & Skills", action: () => scrollTo("stack", "Tech Stack", "6") },
    { key: "7", label: "Contact", description: "Jump to Inquiries & Email", action: () => scrollTo("contact", "Contact", "7") },
    {
      key: "C",
      label: "AI Chatbot",
      description: "Open in-memory RAG assistant",
      action: () => {
        onOpenChatbot();
        showHud("C", "AI Chatbot Opened");
      }
    },
    { key: "?", label: "Help", description: "Toggle keyboard shortcuts guide", action: () => setIsHelpOpen((prev) => !prev) }
  ];

  return (
    <>
      {/* Subtle Bottom-Left Quick Indicator (Desktop only - blurred when not hovered) */}
      <div className="hidden lg:block fixed bottom-5 left-5 z-30">
        <button
          onClick={() => setIsHelpOpen(true)}
          title="View Keyboard Shortcuts (Press ?)"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] hover:border-cyan-400/40 text-[11px] font-mono text-slate-400 hover:text-slate-200 backdrop-blur-md shadow-lg transition-all duration-300 filter blur-[1.5px] opacity-40 hover:blur-none hover:opacity-100 hover:shadow-cyan-500/10 cursor-pointer"
        >
          <Keyboard className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="hidden xl:inline">Shortcuts</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-[10px] text-cyan-300">
            ?
          </kbd>
        </button>
      </div>


      {/* Floating HUD Toast Notification on key press */}
      <AnimatePresence>
        {hudMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/95 border border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl text-xs font-mono text-white">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold text-[11px]">
                {hudMessage.key}
              </span>
              <span className="text-slate-200">{hudMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0a0c12] border border-white/[0.12] p-6 shadow-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <Keyboard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-['Manrope'] font-bold text-white">
                      Keyboard Navigation
                    </h3>

                    <p className="text-[11px] font-mono text-slate-400">
                      Jump anywhere instantly without lifting hands from keyboard
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Close shortcuts guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {shortcutsList.map((shortcut) => (
                  <button
                    key={shortcut.key}
                    onClick={() => {
                      setIsHelpOpen(false);
                      shortcut.action();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-cyan-400/30 text-left transition-colors group cursor-pointer"
                  >
                    <div className="pr-2">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {shortcut.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                        {shortcut.description}
                      </div>
                    </div>

                    <kbd className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded bg-slate-800 border border-white/[0.15] text-xs font-mono font-bold text-cyan-300 shadow-inner shrink-0">
                      {shortcut.key}
                    </kbd>
                  </button>
                ))}
              </div>

              {/* Footer Note */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Safe inside form inputs & textareas</span>
                <span className="text-slate-400">
                  Press <kbd className="px-1 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-[10px] text-slate-300">Esc</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
