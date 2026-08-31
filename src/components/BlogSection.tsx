import React, { useState } from 'react';
import { FileText, Clock, Calendar, ArrowRight, Tag, BookOpen, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  return (
    <section id="blog" className="py-20 bg-[#0a0a0c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Insights & Engineering Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              DevOps Architecture Blog
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Deep dives into GitOps continuous delivery, AWS VPC network segmentation, AIOps telemetry anomaly detection, and containerizing ML/LLM workloads.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-black/60 border border-white/15 hover:border-cyan-500/50 rounded-xl p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all group cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="space-y-4">
                
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

              </div>

              {/* Read Article CTA */}
              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider group-hover:text-cyan-300">
                <span>Read Full Engineering Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
