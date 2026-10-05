import React from "react";
import { ArrowDown, Mail, FileText, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";
import image1 from "../assets/hero.jpeg";
interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const shouldReduceMotion = useReducedMotion();

  // Content placeholders
  const name = PORTFOLIO_CONFIG.NAME;
  const role = PORTFOLIO_CONFIG.ROLE;
  const shortIntro = PORTFOLIO_CONFIG.SHORT_INTRO;
  const profileImage = image1;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Motion variants with reduced motion support
  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.1,
            delayChildren: 0.05,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
          },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.2,
          },
    },
  };

  return (
    <section
      id="about"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Ambient Lighting Gradients */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.08] rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 translate-x-1/3 w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Hero Typography & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Display Headline: H1 Manrope 800 (64-80px range) */}
            <motion.h1
              variants={itemVariants}
              className="font-['Manrope'] font-extrabold tracking-tight text-white leading-[1.08] text-balance mb-3"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-400 block mb-1 font-['Manrope']">
                Hi, I'm
              </span>
              <span className="text-5xl sm:text-6xl lg:text-[72px] xl:text-[78px] font-extrabold relative inline-block">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                  {name}
                </span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/80 via-blue-500/50 to-transparent"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Role Subtitle directly below name */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-mono text-cyan-300 font-medium tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>AI/ML & Full-Stack Developer</span>
              </div>
            </motion.div>

            {/* Concise Introduction: Body Inter 400 (16-18px) */}
            <motion.p
              variants={itemVariants}
              className="font-['Inter'] font-normal text-base sm:text-[17px] lg:text-[18px] text-slate-300/90 leading-relaxed max-w-xl mb-7 text-balance"
            >
              I build production-grade{" "}
              <span className="text-white font-medium">machine learning architectures</span>,{" "}
              autonomous <span className="text-white font-medium">agent systems</span>, and
              high-throughput distributed applications that transform complex intelligence into simple, impactful products.
            </motion.p>




            {/* Metadata Bar */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs font-mono text-slate-400 mb-10 pb-6 border-b border-white/[0.07] w-full max-w-2xl"
            >
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_CONFIG.LOCATION}</span>
              </div>
              {PORTFOLIO_CONFIG.STATUS && (
                <>
                  <span className="text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{PORTFOLIO_CONFIG.STATUS}</span>
                  </div>
                </>
              )}
            </motion.div>

            {/* Three Primary CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              {/* CTA 1: Explore featured project */}
              <button
                onClick={() => scrollToSection("featured-project")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore featured project</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* CTA 2: Let's Connect */}
              <button
                onClick={() => scrollToSection("contact")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/[0.12] hover:border-cyan-400/40 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Let's Connect</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* CTA 3: View resume */}
              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>View resume</span>
              </button>
            </motion.div>
          </motion.div>


          {/* Right Column: Pristine, Modern Profile Image Presentation */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Outer Ambient Glow Aura */}
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700"
                aria-hidden="true"
              />

              {/* Architectural Backdrop Offset Ring */}
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/20 via-cyan-400/20 to-white/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Image Container with Elegant Framing (Specialization removed as requested) */}
              <div className="relative w-64 h-72 sm:w-80 sm:h-96 md:w-[340px] md:h-[420px] rounded-2xl p-2 bg-[#0c0e14]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover object-top filter grayscale-[15%] contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />

                  {/* Soft Vignette Scrim */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#08090d]/50 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Subtle High-Tech Corner Accent Notches */}
              <div
                className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg pointer-events-none transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg pointer-events-none transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
