import React from "react";
import { X, Printer, Download, Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Award, Code } from "lucide-react";
import {
  PORTFOLIO_CONFIG,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  PROJECTS_DATA
} from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-[#0c0e14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-slate-900/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h2 id="resume-title" className="text-sm font-mono font-semibold text-white">
              CURRICULUM VITAE — {PORTFOLIO_CONFIG.NAME.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 font-sans text-slate-200">
          {/* Resume Header */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-['Manrope'] font-extrabold text-white tracking-tight">
                {PORTFOLIO_CONFIG.NAME}
              </h1>
              <div className="text-sm font-mono text-cyan-400 mt-1">

                {PORTFOLIO_CONFIG.ROLE}
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_CONFIG.EMAIL}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_CONFIG.LOCATION}</span>
              </div>
              <div className="text-slate-500">
                GitHub: {PORTFOLIO_CONFIG.GITHUB.replace("https://", "")}
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              EXECUTIVE PROFILE
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {PORTFOLIO_CONFIG.SHORT_INTRO} Specializes in architecting sub-50ms inference engines, multi-agent reasoning DAGs, and production full-stack systems with strong emphasis on reliability, low compute overhead, and clean engineering discipline.
            </p>
          </div>

          {/* Experience */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROFESSIONAL WORK EXPERIENCE</span>
            </div>
            <div className="space-y-6">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-white/10 pl-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-semibold text-white text-sm">
                      {exp.role} · <span className="text-cyan-300">{exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period} | {exp.location}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>EDUCATION & ACADEMICS</span>
            </div>
            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-white/10 pl-4 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="font-semibold text-white text-sm">
                      {edu.degree} — <span className="text-cyan-300">{edu.institution}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {edu.period} {edu.grade ? `| ${edu.grade}` : ""}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
              <Code className="w-3.5 h-3.5" />
              <span>KEY PROJECTS & RESEARCH</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS_DATA.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="font-semibold text-white text-xs mb-1">
                    {proj.title}
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    {proj.description}
                  </p>
                  <div className="text-[10px] font-mono text-emerald-400">
                    Impact: {proj.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              <span>LICENSES & CERTIFICATIONS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATES_DATA.map((c) => (
                <div key={c.id} className="text-slate-300">
                  <span className="font-medium text-white">{c.title}</span> —{" "}
                  <span className="text-slate-500 font-mono">({c.issuer}, {c.date})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span>{PORTFOLIO_CONFIG.STATUS}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
          >
            Close Resume
          </button>
        </div>
      </div>
    </div>
  );
};
