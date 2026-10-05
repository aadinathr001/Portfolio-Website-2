import React from "react";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#08090d] pt-12 pb-24 sm:pb-20 lg:py-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Responsive layout with dedicated right buffer (lg:pr-36) for chatbot button */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:pr-36">
          {/* Rights & Host */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
            <span>© {new Date().getFullYear()} All Rights Reserved</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="text-slate-500 font-mono">Designed for Vercel</span>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-medium">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#stack" className="hover:text-white transition-colors">Stack</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_CONFIG.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_CONFIG.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            {/* <a
              href={PORTFOLIO_CONFIG.TWITTER}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
              aria-label="Twitter/X Profile"
            >
              <Twitter className="w-4 h-4" />
            </a> */}

            <button
              onClick={scrollToTop}
              className="ml-1 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

