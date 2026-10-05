import React from "react";
import { EducationTimeline } from "./EducationTimeline";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header: H2 Manrope 700 (40-52px range) */}
        <div className="mb-14 border-b border-white/[0.08] pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-medium">
            Foundational Knowledge & Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-['Manrope'] font-bold text-white tracking-tight leading-[1.15]">
            Education & Academics.
          </h2>
        </div>


        {/* Interactive Vertical Timeline */}
        <EducationTimeline />
      </div>
    </section>
  );
};

