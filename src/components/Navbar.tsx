import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  // // Live real-time clock for Bangalore / local time zone
  // useEffect(() => {
  //   const updateTime = () => {
  //     const now = new Date();
  //     // IST / Bangalore time format: BLR HH:MM
  //     const formatted = now.toLocaleTimeString("en-GB", {
  //       timeZone: "Asia/Kolkata",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: false
  //     });
  //     setTimeStr(`BLR ${formatted}`);
  //   };

  //   updateTime();
  //   const interval = setInterval(updateTime, 1000 * 30);
  //   return () => clearInterval(interval);
  // }, []);

const navItems = [
  { num: "01", label: "ABOUT", href: "#about" },
  { num: "02", label: "PROJECTS", href: "#projects" },
  { num: "03", label: "EXPERIENCE", href: "#experience" },
  { num: "04", label: "EDUCATION", href: "#education" },
  { num: "05", label: "CERTIFICATES", href: "#certificates" },
  { num: "06", label: "STACK", href: "#stack" },
  { num: "07", label: "CONTACT", href: "#contact" }
];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbfbf9]/92 backdrop-blur-md border-b border-[#e6e6e1] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Swiss Monogram & Year Badge */}
        <a
          href="#about"
          className="group flex items-baseline gap-1 text-[#121212] hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <span className="font-['Manrope'] font-extrabold text-base tracking-tighter text-[#121212]">
            AR
          </span>
          <span className="text-[10px] font-mono text-[#8c8c85] tracking-tight">
            ©26
          </span>
        </a>

        {/* Center: Swiss Editorial Navigation with Terracotta Numeric Indicators */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative py-1 text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#121212] font-semibold"
                    : "text-[#72726c] hover:text-[#121212]"
                }`}
              >
                {/* Terracotta index number */}
                <span
                  className={`text-[10px] font-mono transition-colors ${
                    isActive ? "text-[#c26d52] font-bold" : "text-[#c26d52]/70 group-hover:text-[#c26d52]"
                  }`}
                >
                  {item.num}
                </span>

                {/* Section title */}
                <span>{item.label}</span>

                {/* Understated hairline indicator */}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-[#121212]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Architectural Boxed Resume Button & Monospace Clock */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={onOpenResume}
            className="px-3.5 py-1 text-[11px] font-mono tracking-wider uppercase text-[#121212] border border-[#d6d6ce] hover:border-[#121212] hover:bg-[#121212]/[0.03] transition-all cursor-pointer"
          >
            RESUME
          </button>

          {/* Timezone / Live Clock
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#8a8a82]">
            <span>{timeStr || "BLR 15:47"}</span>
          </div> */}

          {/* Mobile hamburger button with min 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#121212] hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#121212]" />}
          </button>
        </div>
      </div>

      {/* Full-Height Slide-Over Drawer with Backdrop Blur for Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-50 flex justify-end">
          {/* Backdrop blur overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-16 bg-[#121212]/35 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-over drawer container */}
          <div className="relative w-full max-w-[310px] bg-[#fbfbf9] border-l border-[#e6e6e1] h-[calc(100vh-4rem)] flex flex-col justify-between p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex flex-col space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8c8c85] pb-3 mb-2 border-b border-[#e6e6e1]">
                NAVIGATION DOSSIER
              </div>

              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between min-h-[48px] px-3 py-2 text-xs font-mono tracking-wider transition-colors border-b border-[#f0f0eb] ${
                      isActive
                        ? "text-[#121212] font-bold bg-[#121212]/[0.03]"
                        : "text-[#62625c] hover:text-[#121212] hover:bg-black/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#c26d52] font-mono text-[10px] font-semibold">{item.num}</span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-6 border-t border-[#e6e6e1] space-y-4">
              {/* <span>TIME: {timeStr}</span> */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#121212] text-white hover:bg-[#282826] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>OPEN TECHNICAL CV</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              
              <div className="text-[10px] font-mono text-[#8c8c85] text-center tracking-wider">
                Aadinath R · Neural Systems
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
