import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, FileText, Send, Layers, Activity, Menu, X, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clusterPulse, setClusterPulse] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic heartbeat pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setClusterPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'topology', label: '3D Cluster', icon: Cpu },
    { id: 'dashboard', label: 'Operations Suite', icon: Activity },
    { id: 'skills', label: 'Skills & Stack', icon: Shield },
    { id: 'experience', label: 'Experience', icon: Terminal },
    { id: 'blog', label: 'Tech Insights', icon: FileText },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5'
          : 'bg-black/40 backdrop-blur-md border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Identity */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            id="nav-brand-btn"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] text-white font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
              <span>VS</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-xs sm:text-sm uppercase">
                  VIKASH SHARMA
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-bold tracking-widest hidden sm:inline-block">
                  DEVOPS
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${clusterPulse ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'bg-cyan-600'} transition-all`} />
                <span>Cloud Architect &bull; 99.99% SLA</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Immersive UI Uppercase Tracking) */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-medium tracking-widest uppercase font-mono">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`transition-all py-1 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white border-b border-cyan-500 shadow-[0_4px_12px_rgba(6,182,212,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              id="nav-resume-btn"
              className="px-4 py-1.5 bg-white/5 border border-white/20 rounded-full text-[10px] font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3 h-3 text-cyan-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={onOpenContact}
              id="nav-contact-btn"
              className="px-4 py-1.5 bg-cyan-500 text-black font-bold rounded-full text-[10px] hover:bg-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3 text-black" />
              <span>Deploy Contact</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-1.5 rounded-full bg-white/5 border border-white/20 text-cyan-400 text-xs"
              title="Resume"
              aria-label="Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-1.5 pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-[10px] font-mono uppercase tracking-widest text-left flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
            <div className="col-span-2 pt-2 flex gap-2">
              <button
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-full bg-white/5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest font-mono flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Resume
              </button>
              <button
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-3 rounded-full bg-cyan-500 text-black font-bold text-[10px] uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                <Send className="w-3.5 h-3.5" />
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
