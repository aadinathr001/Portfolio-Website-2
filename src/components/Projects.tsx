import React, { useState, useMemo } from "react";
import { ExternalLink, Github, ArrowRight, Layers, Sparkles, Activity } from "lucide-react";
import { FEATURED_PROJECT, PROJECTS_DATA, ProjectItem } from "../data/portfolioData";

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";

const projectImages: Record<string, string> = {
  "/src/assets/1.jpg": image1,
  "/src/assets/2.jpg": image2,
  "/src/assets/3.jpg": image3,
};

export const Projects: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get active categories that have at least 1 project
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: PROJECTS_DATA.length
    };

    PROJECTS_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    // Only return categories that exist in data
    const list = ["All", ...Array.from(new Set(PROJECTS_DATA.map((p) => p.category)))];
    return list.map((cat) => ({
      name: cat,
      count: counts[cat] || 0
    })).filter((c) => c.count > 0);
  }, []);

  // Filtered projects for expanded catalog
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Non-featured projects for initial 4-card grid
  const initialCards = useMemo(() => {
    return PROJECTS_DATA.filter((p) => p.id !== FEATURED_PROJECT.id).slice(0, 4);
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header: H2 Manrope 700 (40-52px range) */}
        <div className="mb-14 border-b border-white/[0.08] pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-medium">
            Featured Case Studies & Systems
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-['Manrope'] font-bold text-white tracking-tight leading-[1.15]">
            Selected Projects.
          </h2>
        </div>



        {/* Featured Project Case Study (Two-Column on Desktop) */}
        <div id="featured-project" className="mb-16">
          <div className="group relative rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Large Image / Mockup / Visual */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] overflow-hidden bg-slate-950 flex items-center justify-center p-6 sm:p-8">
                {/* Glow behind image */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src={projectImages[FEATURED_PROJECT.imageUrl] ?? FEATURED_PROJECT.imageUrl}
                    alt={FEATURED_PROJECT.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Top-left editorial flag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>FEATURED CASE STUDY</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Project Information */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Category and Subtitle */}
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/90 mb-2">
                    <span>{FEATURED_PROJECT.category}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{FEATURED_PROJECT.subtitle}</span>
                  </div>

                  {/* Project Name: H3 Manrope 700 (24-32px range) */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-['Manrope'] font-bold text-white tracking-tight mb-4 group-hover:text-cyan-100 transition-colors leading-snug">
                    <span className="relative inline-block">
                      {FEATURED_PROJECT.title}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </h3>

                  {/* One-sentence description: Body Inter 400 (16-18px) */}
                  <p className="font-['Inter'] font-normal text-base sm:text-[17px] text-slate-300 leading-relaxed mb-6">
                    {FEATURED_PROJECT.description}
                  </p>


                  {/* Result or Impact */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Result & Measured Impact</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
                      {FEATURED_PROJECT.impact}
                    </p>
                  </div>

                  {/* 3-5 Relevant Technologies */}
                  <div className="mb-8">
                    <div className="text-[11px] font-mono text-slate-400 mb-2.5">
                      TECHNOLOGY STACK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {FEATURED_PROJECT.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.05] border border-white/[0.08] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions: Live Demo + GitHub */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                  {FEATURED_PROJECT.liveUrl && (
                    <a
                      href={FEATURED_PROJECT.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-all group/btn"
                    >
                      <span>Live Project</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  <a
                    href={FEATURED_PROJECT.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.1] text-xs font-medium transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Smaller Project Cards in a 4-Column Layout on Desktop */}
        {!showAllProjects ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {initialCards.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-xl bg-slate-900/40 backdrop-blur-sm border border-white/[0.07] hover:border-cyan-400/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-slate-950 border border-white/5">
                      <img
                        src={projectImages[project.imageUrl] ?? project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-cyan-300">
                        {project.category}
                      </div>
                    </div>

                    {/* Title: H3 Manrope 700 (24-32px range) */}
                    <h3 className="text-xl sm:text-[24px] font-['Manrope'] font-bold text-white group-hover:text-cyan-200 transition-colors mb-2 leading-snug">
                      <span className="relative inline-block">
                        {project.title}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </h3>

                    {/* Short Description: Body Inter 400 (16-18px) */}
                    <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-slate-300/90 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact snippet: Small Inter 500 (13-14px) */}
                    <div className="font-['Inter'] font-medium text-[13px] sm:text-[14px] text-slate-300 bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.05] mb-4">
                      <span className="font-semibold text-cyan-400">Impact: </span>
                      <span>{project.impact}</span>
                    </div>


                    {/* Technologies list */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono rounded text-slate-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Links */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium group/link transition-colors"
                      >
                        <span>Live</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* "View all projects →" Link */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowAllProjects(true)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 text-sm font-medium text-slate-200 hover:text-white transition-all duration-300"
              >
                <span>View all projects</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Catalog with Filter Bar */
          <div className="animate-fadeIn">
            {/* Filter Bar with category counts in superscript */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {categoriesWithCounts.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                        isActive
                          ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm"
                          : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <sup className="ml-1 text-[10px] font-mono text-cyan-400/80 font-bold">
                        {cat.count}
                      </sup>
                    </button>
                  );
                })}
              </div>

              {/* Collapse back to compact view */}
              <button
                onClick={() => setShowAllProjects(false)}
                className="text-xs font-mono text-slate-400 hover:text-white transition-colors self-end sm:self-center"
              >
                Show compact view ↑
              </button>
            </div>

            {/* Filtered Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-xl bg-slate-900/50 backdrop-blur-sm border border-white/[0.07] hover:border-cyan-400/40 p-5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-slate-950 border border-white/5">
                      <img
                        src={projectImages[project.imageUrl] ?? project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-cyan-300">
                        {project.category}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-[24px] font-['Manrope'] font-bold text-white group-hover:text-cyan-200 transition-colors mb-2 leading-snug">
                      <span className="relative inline-block">
                        {project.title}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </h3>

                    <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-slate-300/90 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="font-['Inter'] font-medium text-[13px] sm:text-[14px] text-slate-300 bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.05] mb-4">
                      <span className="font-semibold text-cyan-400">Impact: </span>
                      <span>{project.impact}</span>
                    </div>


                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium group/link transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
