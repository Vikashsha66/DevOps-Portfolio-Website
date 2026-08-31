import React, { useState } from 'react';
import { X, ExternalLink, FileText, CheckCircle2, Shield, Activity, Copy, Check, Terminal, Layers, Globe, Network, ArrowRight } from 'lucide-react';
import { DevOpsProject } from '../types';

interface ProjectDetailModalProps {
  project: DevOpsProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'config' | 'metrics'>('architecture');

  if (!project) return null;

  const copyConfig = () => {
    navigator.clipboard.writeText(project.configSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-black/95 border border-white/15 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-fadeIn backdrop-blur-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 bg-black/70 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              {project.category}
            </span>
            {project.domain && (
              <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                {project.domain}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Title & Subtitle */}
          <div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">{project.title}</h3>
            <p className="text-sm text-slate-300 font-mono mt-1">{project.subtitle}</p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-black" />
                <span>Visit Live Domain ({project.domain || 'Live URL'})</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Architecture Spec & Repo</span>
              </a>
            )}
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-white/10 gap-6 text-xs font-mono">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`pb-2 transition-colors border-b-2 uppercase tracking-wider cursor-pointer ${
                activeTab === 'architecture'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Architecture & Execution
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`pb-2 transition-colors border-b-2 uppercase tracking-wider cursor-pointer ${
                activeTab === 'config'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              IaC & Pipeline Code ({project.configSnippet.filename})
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`pb-2 transition-colors border-b-2 uppercase tracking-wider cursor-pointer ${
                activeTab === 'metrics'
                  ? 'border-cyan-400 text-cyan-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Production Metrics & Highlights
            </button>
          </div>

          {/* TAB 1: ARCHITECTURE FLOW */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.fullArchitecture}
              </p>

              {/* Step-by-Step Flow Pipeline */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  End-to-End Infrastructure Flow
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architectureFlow.map((flow) => (
                    <div
                      key={flow.step}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        {flow.step}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white font-mono">{flow.title}</div>
                        <div className="text-xs text-slate-400 leading-normal">{flow.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONFIG / CODE SNIPPET */}
          {activeTab === 'config' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{project.configSnippet.filename}</span>
                </div>
                <button
                  onClick={copyConfig}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-cyan-400" />
                      <span className="text-cyan-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black/90 p-4 rounded-xl border border-white/10 overflow-x-auto max-h-[320px] font-mono text-xs text-cyan-300/90 leading-relaxed shadow-inner">
                <pre>{project.configSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: METRICS & HIGHLIGHTS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 font-mono">
                {project.metrics.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">{m.label}</div>
                    <div className="text-xl font-bold text-cyan-400 mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Highlights list */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Engineered Milestones
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/70 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Author: Vikash Sharma (DevOps Engineer)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
