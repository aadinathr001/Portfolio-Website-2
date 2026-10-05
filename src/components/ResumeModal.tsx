import React from "react";
import { X, Printer, Download } from "lucide-react";
import resumePdf from "../assets/Aadinath_R_Resume.pdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    // Open the actual PDF in a new tab.
    // The browser's PDF viewer will provide the Print / Save options.
    window.open(resumePdf, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn"
    >
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0c0e14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/80 backdrop-blur-md shrink-0">

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />

            <h2
              id="resume-title"
              className="text-sm font-mono font-semibold text-white"
            >
              RESUME
            </h2>
          </div>

          <div className="flex items-center gap-2">

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>

            {/* Direct Download */}
            <a
              href={resumePdf}
              download="Aadinath_R_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-mono text-slate-950 font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-slate-800">
          <iframe
            src={resumePdf}
            title="Resume PDF"
            className="w-full h-full border-0"
          />
        </div>

      </div>
    </div>
  );
};
