import React from "react";
import { ChevronDown, MapPin, Calendar, Building, Sparkles } from "lucide-react";
import { ExperienceItemData } from "../../data/portfolioData";

interface ExperienceItemProps {
  experience: ExperienceItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  isOpen,
  onToggle,
  isLast,
}) => {
  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Vertical Timeline Guide Line */}
      {!isLast && (
        <div
          className="absolute left-[13px] sm:left-[17px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Timeline Node Dot */}
      <div
        className={`absolute left-0 top-1.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            : "bg-slate-900 border-white/20 group-hover:border-cyan-400/50"
        }`}
        aria-hidden="true"
      >
        <span
          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
            isOpen ? "bg-cyan-400" : "bg-slate-500"
          }`}
        />
      </div>

      {/* Experience Card */}
      <div
        className={`mb-8 rounded-xl border transition-all duration-300 ${
          isOpen
            ? "bg-slate-900/70 border-cyan-400/30 shadow-xl"
            : "bg-slate-900/30 border-white/[0.07] hover:border-white/15"
        }`}
      >
        {/* Clickable Header Button */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full text-left p-5 sm:p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
            <div>
              <h3 className="text-xl sm:text-[24px] font-['Manrope'] font-bold text-white tracking-tight flex items-center gap-2 leading-snug">
                <span>{experience.role}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-cyan-300/90 mt-1">
                <span className="inline-flex items-center gap-1 text-white font-medium">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  {experience.company}
                </span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {experience.period}
              </span>

              <div
                className={`w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-cyan-400 bg-cyan-500/10 border-cyan-400/30" : ""
                }`}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Short description: Body Inter 400 (16-18px) */}
          <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-slate-300/90 mt-3 leading-relaxed">
            {experience.description}
          </p>


          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-white/[0.04] border border-white/[0.08] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </button>

        {/* Expandable Highlights */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/[0.06]">
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400/90 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Key Deliverables & Architectural Highlights</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {experience.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
