import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreeClusterVisualizer } from './components/ThreeClusterVisualizer';
import { DevOpsDashboard } from './components/DevOpsDashboard';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { BlogSection } from './components/BlogSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { BlogPostModal } from './components/BlogPostModal';
import { ResumeModal } from './components/ResumeModal';
import { PERSONAL_INFO } from './data/portfolioData';
import { DevOpsProject, BlogPost } from './types';
import { Terminal, Shield, ArrowUp, Heart, ExternalLink, Globe, FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<DevOpsProject | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Section tracking
      const sections = ['hero', 'projects', 'topology', 'dashboard', 'skills', 'experience', 'blog', 'terminal-section', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-300 flex flex-col font-sans relative overflow-x-hidden">
      {/* Background Cyber Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-immersive-grid opacity-60" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_50%_20%,_rgba(6,182,212,0.12),_transparent_70%)] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.08),_transparent_70%)] pointer-events-none -z-10" />
      
      {/* Fixed Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => handleNavigate('contact')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => handleNavigate('contact')}
        />

        {/* 2. Interactive 3D Cloud Cluster Visualizer (Three.js) */}
        <ThreeClusterVisualizer />

        {/* 3. Live DevOps Operations Suite (Deployments, Security, Scaling) */}
        <DevOpsDashboard />

        {/* 4. Infrastructure & Architecture Projects */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Skills & Toolchain Matrix */}
        <SkillsMatrix />

        {/* 6. Professional Experience & Education */}
        <ExperienceTimeline />

        {/* 7. Technical Blog & Insights */}
        <BlogSection onSelectPost={(post) => setSelectedPost(post)} />

        {/* 8. Interactive DevOps CLI Terminal */}
        <InteractiveTerminal
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => handleNavigate('contact')}
        />

        {/* 9. Direct Contact & Webhook Dispatch */}
        <ContactSection />
      </main>

      {/* Footer with Immersive UI Telemetry */}
      <footer className="bg-black/80 border-t border-white/10 py-10 text-slate-400 font-mono text-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Identity & Status */}
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-white font-bold text-sm tracking-wide">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] text-black font-extrabold shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  VS
                </div>
                <span className="uppercase">{PERSONAL_INFO.name}</span>
                <span className="text-[10px] text-cyan-400 font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                  {PERSONAL_INFO.role}
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Cloud Architecture • Kubernetes • ArgoCD GitOps • IaC Terraform • AIOps Telemetry
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 pt-1 text-[11px] text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                <span className="font-mono tracking-wider">SYSTEM STATUS: ALL CLUSTERS HEALTHY (99.99% SLA)</span>
              </div>
            </div>

            {/* Quick Links & Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono tracking-wider uppercase">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume PDF</span>
              </button>

              <span className="text-white/20">|</span>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-slate-300"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>

              <span className="text-white/20">|</span>

              <a
                href={PERSONAL_INFO.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-slate-300"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>vikashportfolio.unaux.com</span>
              </a>

              <span className="text-white/20">|</span>

              <button
                onClick={() => handleNavigate('hero')}
                className="hover:text-white transition-colors cursor-pointer text-slate-300"
              >
                Top ↑
              </button>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] font-mono gap-2">
            <div>
              &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Production GitOps Infrastructure.
            </div>
            <div className="text-cyan-400/70 tracking-widest uppercase text-[10px]">
              // LAT: 24.5854° N &bull; LON: 73.7125° E &bull; ZONE: AP-SOUTH-1
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 font-bold" />
        </button>
      )}

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
