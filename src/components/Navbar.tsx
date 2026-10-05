import React, { useState, useEffect } from "react";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 40px, activate glassmorphism
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Certificates", href: "#certificates" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
        isScrolled
          ? "bg-[#08090d]/80 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Symbol */}
        <a
          href="#about"
          className="group flex items-center gap-2 text-base font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
          aria-label="Home"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
            <span className="font-mono text-xs font-bold text-cyan-400">&lt;/&gt;</span>
          </div>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </a>


        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 rounded-md ${
                  isActive
                    ? "text-white font-semibold"
                    : isScrolled
                    ? "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                    : "text-slate-300/70 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>



        {/* Zone 3: Resume CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border ${
              isScrolled
                ? "bg-white/[0.06] hover:bg-white/[0.12] text-slate-100 border-white/[0.12] shadow-sm hover:border-cyan-400/40"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[61px] bg-[#08090d]/95 backdrop-blur-xl border-b border-white/[0.1] px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-cyan-400 font-semibold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
