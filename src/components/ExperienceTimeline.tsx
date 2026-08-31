import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award, Terminal, ArrowUpRight, Check } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-[#0a0a0c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Experience & Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Track record of driving cloud migration, containerizing mission-critical workloads, and delivering zero-downtime automation at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Professional Experience (Fusion Business Solutions) */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-3">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Production DevOps Role</span>
            </h3>

            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className="bg-black/60 border border-white/15 rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
              >
                {/* Active Role Beacon */}
                <div className="absolute top-4 right-4 px-3.5 py-1 bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  CURRENT ROLE
                </div>

                {/* Role Header */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h4>
                  <div className="text-cyan-400 font-mono font-semibold text-base">
                    {exp.company}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {exp.summary}
                </p>

                {/* Achievements List */}
                <div className="space-y-4">
                  <h5 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                    Key DevOps Deliverables & Architecture Accomplishments
                  </h5>

                  <div className="space-y-3">
                    {exp.achievements.map((ach, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {ach.title}
                          </span>
                          {ach.metric && (
                            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold self-start sm:self-auto">
                              {ach.metric}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {ach.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {ach.tags.map((t, ti) => (
                            <span
                              key={ti}
                              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Stack Chips */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">Utilized Technology Stack:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Academic Degrees */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2 border-b border-white/10 pb-3">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Academic Education</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 border border-white/15 rounded-xl p-5 shadow-2xl backdrop-blur-xl space-y-2 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span className="font-bold">{edu.period}</span>
                    <span className="text-[11px] text-slate-400">{edu.location}</span>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">
                    {edu.degree}
                  </h4>

                  <div className="text-xs font-mono text-cyan-300 font-medium">
                    {edu.institution}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Certifications / Compliance Box */}
            <div className="bg-black/60 border border-white/15 rounded-xl p-5 space-y-3 backdrop-blur-xl shadow-2xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>DevOps Principles & Standards</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitOps Continuous Reconciliation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Immutable Infrastructure with IaC</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Zero-Trust Network Hardening</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Automated Telemetry & MTTD &lt; 3m</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
