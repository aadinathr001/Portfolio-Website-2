import React, { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, ArrowUp, Sparkles, Orbit, CheckCircle2 } from "lucide-react";
import {
  TECH_CATEGORIES,
  TechCategoryType,
  TECH_STACK_DATA,
  TechItem
} from "../data/portfolioData";

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TechCategoryType>("AI & ML");
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_STACK_DATA["AI & ML"][0]);

  // When category changes, automatically select its first technology
  const handleCategoryChange = (cat: TechCategoryType) => {
    setActiveCategory(cat);
    const firstItem = TECH_STACK_DATA[cat][0];
    if (firstItem) {
      setSelectedTech(firstItem);
    }
  };

  // Keep selected tech synced if active category changes
  useEffect(() => {
    const currentList = TECH_STACK_DATA[activeCategory];
    if (currentList && !currentList.some((item) => item.id === selectedTech?.id)) {
      setSelectedTech(currentList[0]);
    }
  }, [activeCategory, selectedTech]);

  const activeTechList = TECH_STACK_DATA[activeCategory] || [];
  const selectedIndex = activeTechList.findIndex((t) => t.id === selectedTech?.id);
  const formattedIndex = String((selectedIndex >= 0 ? selectedIndex : 0) + 1).padStart(2, "0");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="stack" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header: H2 Manrope 700 (40-52px range) */}
        <div className="mb-14 border-b border-white/[0.08] pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-medium">
            Engineering & Tooling
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-['Manrope'] font-bold tracking-tight text-white leading-[1.15]">
            My tech{" "}
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              stack.
            </span>
          </h2>
        </div>




        {/* Horizontal Category Navigation */}
        <div id="stack-explorer" className="mb-12">
          <div
            role="tablist"
            aria-label="Technology Stack Categories"
            className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-3 border-b border-white/[0.08] scrollbar-none"
          >
            {TECH_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = TECH_STACK_DATA[category]?.length || 0;

              return (
                <button
                  key={category}
                  role="tab"
                  id={`tab-${category}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${category}`}
                  onClick={() => handleCategoryChange(category)}
                  className={`relative pb-3 px-3 sm:px-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-t-md ${
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 font-bold"
                        : "bg-white/[0.04] text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Technology Explorer */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeCategory}`}
          aria-labelledby={`tab-${activeCategory}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* Left: Technology List arranged in Two Columns on Desktop (One on Mobile) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeTechList.map((item, idx) => {
                const isSelected = selectedTech?.id === item.id;
                const rowNum = String(idx + 1).padStart(2, "0");

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTech(item)}
                    type="button"
                    className={`group relative text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isSelected
                        ? "bg-slate-900/80 border-cyan-400/40 shadow-lg shadow-cyan-500/5"
                        : "bg-slate-900/30 border-white/[0.06] hover:bg-slate-900/60 hover:border-white/20"
                    }`}
                  >
                    {/* Left Edge Accent Indicator on Selected/Hovered Item */}
                    <div
                      className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-r transition-all duration-200 ${
                        isSelected
                          ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                          : "bg-transparent group-hover:bg-cyan-400/50"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Row Content */}
                    <div className="flex items-center gap-3 pl-1.5">
                      {/* Index Number */}
                      <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                        {rowNum}
                      </span>

                      {/* Compact Technology Mark/Initials */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                          isSelected
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                            : "bg-white/[0.05] text-slate-300 border border-white/[0.08] group-hover:border-cyan-400/30 group-hover:text-cyan-200"
                        }`}
                      >
                        {item.initials}
                      </div>

                      {/* Technology Name */}
                      <span
                        className={`text-xs sm:text-sm font-semibold transition-colors ${
                          isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    {/* Arrow on far right (revealed/highlighted on selected/hover) */}
                    <div
                      className={`transition-all duration-200 ${
                        isSelected
                          ? "text-cyan-400 translate-x-0 opacity-100"
                          : "text-slate-500 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Vertically Separated Details Panel */}
          <div className="lg:col-span-5">
            {selectedTech && (
              <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.09] shadow-2xl transition-all duration-300">
                {/* Header metadata: "IN FOCUS / 01" + "SELECTED" */}
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                  <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                    IN FOCUS / {formattedIndex}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>SELECTED</span>
                  </div>
                </div>

                {/* Circular Technology Icon / Orbit Graphic */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)] shrink-0">
                    <Orbit className="w-8 h-8 text-cyan-300 animate-[spin_12s_linear_infinite]" />
                    <span className="absolute inset-0 rounded-full border border-white/10 scale-125 pointer-events-none" />
                  </div>

                  <div>
                    <div className="text-xs font-mono text-cyan-400/90 mb-0.5">
                      {selectedTech.category} · {selectedTech.type}
                    </div>
                    {/* Large Technology Name: H3 Manrope 700 (24-32px range) */}
                    <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-['Manrope'] font-bold text-white tracking-tight leading-snug">
                      {selectedTech.name}
                    </h3>
                  </div>
                </div>

                {/* Description: Body Inter 400 (16-18px) */}
                <p className="font-['Inter'] font-normal text-base text-slate-300 leading-relaxed mb-6">
                  {selectedTech.description}
                </p>


                {/* "GOOD FOR" + Use Case */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GOOD FOR</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    {selectedTech.goodFor}
                  </p>
                </div>

                {/* "Explore the docs →" link */}
                <div className="pt-2">
                  <a
                    href={selectedTech.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Explore the docs</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Small Footer Underneath with "BACK TO TOP ^" */}
        <div className="mt-16 pt-6 border-t border-white/[0.08] flex items-center justify-end text-xs font-mono text-slate-500">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
