import React from "react";
import { Plus, Minus } from "lucide-react";
import { EducationItemData } from "../../data/portfolioData";

interface EducationItemProps {
  education: EducationItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

export const EducationItem: React.FC<EducationItemProps> = ({
  education,
  index,
  isOpen,
  onToggle,
  isLast,
}) => {
  const isFirst = index === 0;
  const periodParts = education.period.split("—");
  const startYear = periodParts[0]?.trim() || education.period;
  const endYear = periodParts[1]?.trim() || "";

  return (
    <div className="relative pb-4 md:pb-12 last:pb-2 group">
      {/* Mobile View (< md): Integrated Card with Expand Button in Header */}
      <div className="md:hidden border border-[#e6e6e1] bg-white p-4 sm:p-5 shadow-sm transition-all mb-4">
        {/* Header row with Degree, Institution, and Expand Button */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#f0f0eb]">
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-mono tracking-wider text-[#7a7a72] uppercase mb-1">
              <span className="font-semibold text-[#121212]">{startYear}</span>
              {endYear && <span> — {endYear}</span>}
            </div>
            <h3
              onClick={onToggle}
              className="font-['Manrope'] font-bold text-lg sm:text-xl text-[#121212] tracking-tight leading-snug cursor-pointer hover:text-[#c26d52] transition-colors"
            >
              {education.degree}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#555550] mt-1">
              <span className="font-semibold text-[#121212]">{education.institution}</span>
              <span className="text-[#b5b5ac]">·</span>
              <span className="font-mono uppercase text-[10px] tracking-wider text-[#7a7a72]">
                {education.location}
              </span>
              {education.grade && (
                <>
                  <span className="text-[#b5b5ac]">·</span>
                  <span className="font-mono text-[10px] text-[#c26d52] font-semibold tracking-wider">
                    {education.grade}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Expand Button in Header */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse details" : "Expand details"}
            className={`min-h-[40px] min-w-[40px] border shrink-0 transition-all flex items-center justify-center cursor-pointer ${
              isOpen
                ? "border-[#121212] bg-[#121212] text-white"
                : "border-[#d6d6ce] hover:border-[#121212] bg-[#fbfbf9] text-[#121212]"
            }`}
          >
            {isOpen ? (
              <Minus className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            )}
          </button>
        </div>

        {/* Collapsible Content for Mobile */}
        {isOpen && (
          <div className="pt-3.5 animate-fadeIn">
            <p className="font-['Inter'] font-normal text-[14px] text-[#3e3e3b] leading-relaxed mb-4">
              {education.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {education.skills?.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#d6d6ce] bg-[#fbfbf9] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#484844]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {education.highlights && education.highlights.length > 0 && (
              <div className="pt-3 border-t border-[#f0f0eb]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#72726c] mb-2 font-medium">
                  ACHIEVEMENTS
                </div>
                <ul className="space-y-2">
                  {education.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-[#444440] leading-relaxed"
                    >
                      <span className="text-[#c26d52] font-mono text-xs select-none font-bold">
                        —
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop View (>= md): Spine & Multi-column Grid */}
      <div className="hidden md:grid md:grid-cols-12 gap-8">
        {/* Column 1 & 2: Timeline Guide + Years */}
        <div className="md:col-span-3 flex items-start gap-4 sm:gap-5 relative">
          {/* Node & High-Contrast Continuous Vertical Spine */}
          <div className="relative flex flex-col items-center shrink-0 w-5 self-stretch">
            {!isLast && (
              <div
                className="w-[2px] bg-[#121212] absolute top-4 bottom-0 md:bottom-[-3.75rem] left-[9px] z-0"
                aria-hidden="true"
              />
            )}

            <div
              className={`relative z-10 w-4 h-4 rounded-full mt-1 flex items-center justify-center transition-all ${
                isFirst
                  ? "bg-[#c26d52] ring-4 ring-[#fbfbf9] shadow-sm"
                  : "bg-white border-2 border-[#121212] ring-4 ring-[#fbfbf9] shadow-sm"
              }`}
            >
              {isFirst ? (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />
              )}
            </div>
          </div>

          <div className="text-[12px] font-mono tracking-wider text-[#4a4a44] uppercase leading-tight pt-1">
            <div className="font-semibold text-[#121212]">{startYear}</div>
            {endYear && (
              <div className="text-[#787870] font-normal">— {endYear}</div>
            )}
          </div>
        </div>

        {/* Column 3: Degree Title, Institution, Expandable Details */}
        <div className="md:col-span-8 flex flex-col">
          {/* Clickable Header Area */}
          <button
            type="button"
            onClick={onToggle}
            className="text-left cursor-pointer group/title focus:outline-none select-text"
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Collapse" : "Expand"} ${education.degree} details`}
          >
            <h3 className="font-['Manrope'] font-bold text-2xl sm:text-[28px] text-[#121212] group-hover/title:text-[#c26d52] tracking-tight leading-snug mb-2 transition-colors">
              {education.degree}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#555550] mb-2">
              <span className="font-semibold text-[#121212]">
                {education.institution}
              </span>
              <span className="text-[#b5b5ac]">·</span>
              <span className="font-mono uppercase text-[11px] tracking-wider text-[#7a7a72]">
                {education.location}
              </span>
              {education.grade && (
                <>
                  <span className="text-[#b5b5ac]">·</span>
                  <span className="font-mono text-[11px] text-[#c26d52] font-semibold tracking-wider">
                    {education.grade}
                  </span>
                </>
              )}
            </div>
          </button>

          {/* Collapsible Content */}
          {isOpen && (
            <div className="pt-3 animate-fadeIn">
              <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-[#3e3e3b] leading-[1.68] mb-5 max-w-2xl">
                {education.description}
              </p>

              {/* Coursework Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {education.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="border border-[#d6d6ce] bg-white/70 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#484844] hover:border-[#121212] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Academic Highlights */}
              {education.highlights && education.highlights.length > 0 && (
                <div className="pt-5 border-t border-[#e6e6e1]">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#72726c] mb-3 font-medium">
                    ACHIEVEMENTS
                  </div>
                  <ul className="space-y-2.5">
                    {education.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-sm text-[#444440] leading-relaxed"
                      >
                        <span className="text-[#c26d52] font-mono text-xs mt-0.5 select-none font-bold">
                          —
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Column 4: Toggle Button */}
        <div className="md:col-span-1 flex justify-end items-start pt-1">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse details" : "Expand details"}
            className={`w-8 h-8 border transition-all flex items-center justify-center cursor-pointer ${
              isOpen
                ? "border-[#121212] bg-[#121212] text-white"
                : "border-[#d6d6ce] hover:border-[#121212] bg-white text-[#121212] hover:bg-neutral-100/60"
            }`}
          >
            {isOpen ? (
              <Minus className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
