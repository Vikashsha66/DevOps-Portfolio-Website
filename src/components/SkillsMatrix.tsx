import React, { useState } from 'react';
import { Shield, Cloud, GitBranch, Box, Code2, Activity, ShieldCheck, Terminal, Check, Layers, Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return Cloud;
      case 'GitBranch': return GitBranch;
      case 'Box': return Box;
      case 'Code2': return Code2;
      case 'Activity': return Activity;
      default: return ShieldCheck;
    }
  };

  const activeCategory = SKILL_CATEGORIES[selectedCategory];
  const IconComponent = getIcon(activeCategory.icon);

  return (
    <section id="skills" className="py-20 bg-[#0a0a0c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5" />
            <span>DevOps Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Core Skills & Engineering Competencies
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Hands-on technical expertise across cloud computing, declarative container orchestration, immutable infrastructure, and automated observability telemetry.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = getIcon(cat.icon);
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`p-3.5 rounded-xl border font-mono text-xs flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-black/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="font-bold text-[11px] uppercase tracking-wider leading-tight">{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Detail Panel */}
        <div className="bg-black/60 border border-white/15 rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-mono">{activeCategory.category}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeCategory.description}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 font-bold self-start sm:self-auto">
              {activeCategory.skills.length} Production Tools
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCategory.skills.map((skill, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 hover:border-cyan-500/40 rounded-xl p-4 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono text-sm">{skill.name}</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden mb-3 border border-white/5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Experience: <strong className="text-slate-200">{skill.experience}</strong></span>
                  {skill.badge && (
                    <span className="text-cyan-300 text-[10px] uppercase font-mono tracking-wider bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 truncate max-w-[200px]">
                      {skill.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
