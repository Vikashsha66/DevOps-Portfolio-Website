import React, { useState } from 'react';
import { Layers, ExternalLink, FileText, CheckCircle2, ArrowRight, Globe, Terminal, Shield, Cpu, RefreshCw } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { DevOpsProject } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: DevOpsProject) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Infrastructure & Cloud',
    'CI/CD & GitOps',
    'Container & MLOps',
    'Security & AIOps',
  ];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-[#0a0a0c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Systems & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured DevOps Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Production cloud deployments, GitOps pipelines, DNS port mapping, and multi-node Kubernetes clusters engineered for high uptime and automation.
            </p>
          </div>

          {/* Filter Pills (Immersive UI Rounded Full) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/60 border border-white/15 rounded-full backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-black/60 border border-white/15 hover:border-cyan-500/50 rounded-xl p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all group hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="space-y-4">
                
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {project.category}
                  </span>
                  
                  {project.domain && (
                    <span className="text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      {project.domain}
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 py-2 font-mono">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 truncate">{m.label}</div>
                      <div className="text-sm font-bold text-cyan-400 mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-1">
                  {project.highlights.slice(0, 2).map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                
                {/* Live Demo Button */}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    id={`live-demo-btn-${project.id}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-black" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Interactive Topology</span>
                  </button>
                )}

                {/* Architecture & Docs Modal Trigger */}
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  id={`docs-btn-${project.id}`}
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture & Docs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
