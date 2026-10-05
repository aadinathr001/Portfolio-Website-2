import React from "react";
import { Award, ExternalLink, CheckCircle } from "lucide-react";
import { CERTIFICATES_DATA } from "../data/portfolioData";

export const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header: H2 Manrope 700 (40-52px range) */}
        <div className="mb-14 border-b border-white/[0.08] pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-medium">
            Industry Certifications & Specializations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-['Manrope'] font-bold text-white tracking-tight leading-[1.15]">
            Certificates.
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                {/* Header with Issuer & Year */}
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <span className="text-cyan-300/90 font-medium">{cert.issuer}</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {cert.date}
                  </span>
                </div>

                {/* Title: H3 Manrope 700 (24-32px range) */}
                <h3 className="text-lg sm:text-xl lg:text-[24px] font-['Manrope'] font-bold text-white group-hover:text-cyan-200 transition-colors mb-2 leading-snug">
                  {cert.title}
                </h3>


                {/* Credential ID */}
                <div className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ID: {cert.credentialId}</span>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Link */}
              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors group/link"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
