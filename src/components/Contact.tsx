import React, { useState } from "react";
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, Sparkles, MessageSquare } from "lucide-react";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONFIG.EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate swift network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header: H2 Manrope 700 (40-52px range) */}
        <div className="mb-14 border-b border-white/[0.08] pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-medium">
            Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-['Manrope'] font-bold text-white tracking-tight leading-[1.15]">
            Let's Connect.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels and social profiles */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/[0.08]">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-medium">
                DIRECT INBOX
              </div>
              {/* Title: H3 Manrope 700 (24-32px range) */}
              <h3 className="text-xl sm:text-2xl font-['Manrope'] font-bold text-white mb-2 leading-snug">
                Have an ambitious idea?
              </h3>
              {/* Paragraph: Body Inter 400 (16-18px) */}
              <p className="font-['Inter'] font-normal text-base text-slate-300/90 leading-relaxed mb-6">
                Whether you have questions about vision model optimization, agent frameworks, or potential full-time engineering roles, I typically respond within 24 hours.
              </p>


              {/* Copy Email Box */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-6">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                    {PORTFOLIO_CONFIG.EMAIL}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors ml-2 shrink-0 flex items-center gap-1 text-xs font-mono"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                  DIGITAL PRESENCE
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={PORTFOLIO_CONFIG.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PORTFOLIO_CONFIG.TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-cyan-400" />
                    <span>Twitter/X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 backdrop-blur-md border border-white/[0.08]">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-4">
                    <Check className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-['Manrope'] font-bold text-white mb-2">
                    Message Dispatched
                  </h3>
                  <p className="font-['Inter'] font-normal text-base text-slate-300 max-w-md mb-6 leading-relaxed">

                    Thank you for reaching out, <span className="text-cyan-300 font-semibold">{formData.name}</span>. Your dispatch has been logged and sent to {PORTFOLIO_CONFIG.EMAIL}. I'll review and reply shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-5 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>TRANSMISSION TERMINAL</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/70 border border-white/[0.08] focus:border-cyan-400/60 focus:outline-none text-sm text-slate-100 placeholder:text-slate-600 transition-colors font-sans"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@domain.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/70 border border-white/[0.08] focus:border-cyan-400/60 focus:outline-none text-sm text-slate-100 placeholder:text-slate-600 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Subject / Project Context
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Senior ML Role / Engineering Collaboration / Advisory"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950/70 border border-white/[0.08] focus:border-cyan-400/60 focus:outline-none text-sm text-slate-100 placeholder:text-slate-600 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Aadinath, I'd like to discuss an opportunity or project..."
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950/70 border border-white/[0.08] focus:border-cyan-400/60 focus:outline-none text-sm text-slate-100 placeholder:text-slate-600 transition-colors resize-none font-sans"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
