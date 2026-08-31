import React from 'react';
import { X, Calendar, Clock, User, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-black/95 border border-white/15 rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-fadeIn backdrop-blur-2xl">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-black/70 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {post.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Post Header */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1 border-b border-white/10 pb-4">
              <span className="flex items-center gap-1.5 text-slate-300">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                {post.author.name} ({post.author.role})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {post.date}
              </span>
            </div>
          </div>

          {/* Article Summary Box */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 leading-relaxed font-sans italic">
            "{post.summary}"
          </div>

          {/* Render Markdown-like content */}
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-sans">
            {post.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-white font-mono pt-4 border-t border-white/10">
                    {block.replace('## ', '')}
                  </h3>
                );
              }
              if (block.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-base font-bold text-cyan-300 font-mono pt-2">
                    {block.replace('### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('```')) {
                const codeLines = block.replace(/```[a-z]*\n/, '').replace(/\n```$/, '');
                return (
                  <div key={idx} className="bg-black/90 p-4 rounded-xl border border-white/10 overflow-x-auto font-mono text-xs text-cyan-300/90 leading-relaxed shadow-inner">
                    <pre>{codeLines}</pre>
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-1.5">
            {post.tags.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5"
              >
                <Tag className="w-3 h-3 text-cyan-400" />
                {t}
              </span>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/70 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>DevOps Engineering Insights by Vikash Sharma</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Articles
          </button>
        </div>

      </div>
    </div>
  );
};
