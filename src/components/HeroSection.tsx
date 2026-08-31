import React, { useState } from 'react';
import { Terminal, Shield, GitBranch, Cpu, Activity, ArrowRight, Download, Check, Copy, ExternalLink, Sparkles, Server } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenResume,
  onOpenContact,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'manifest' | 'pipeline' | 'iac'>('manifest');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Bio, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
              </span>
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">DevOps & Cloud Architect</span>
              <span className="text-white/20">/</span>
              <span className="text-slate-400 hidden sm:inline">2.5+ Years Experience</span>
              <span className="text-white/20 hidden sm:inline">/</span>
              <span className="text-slate-400 truncate max-w-[140px] sm:max-w-none">{PERSONAL_INFO.location}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Architecting Resilient <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                  Cloud & GitOps
                </span> Systems
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                Specialized in <strong className="text-white font-medium">Kubernetes container orchestration</strong>, zero-drift <strong className="text-white font-medium">ArgoCD continuous delivery</strong>, Infrastructure as Code with <strong className="text-white font-medium">Terraform & AWS VPC</strong>, and automated <strong className="text-white font-medium">AIOps telemetry</strong> reducing MTTD to under 3 minutes.
              </p>
            </div>

            {/* Quick Metrics Grid (Immersive UI Glass Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {PERSONAL_INFO.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all group"
                >
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">{m.label}</div>
                  <div className="text-[10px] font-mono text-cyan-400/80 leading-tight mt-0.5 truncate uppercase tracking-wider">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons (Immersive UI Cyber Pill & Glow Buttons) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                id="hero-operations-btn"
                className="px-5 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest font-mono text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex items-center gap-2 group cursor-pointer"
              >
                <Activity className="w-4 h-4 text-black" />
                <span>Launch Operations Suite</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('topology')}
                id="hero-topology-btn"
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest font-mono text-xs border border-white/20 hover:border-cyan-500/50 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Explore 3D Topology</span>
              </button>

              <button
                onClick={onOpenResume}
                id="hero-resume-btn"
                className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold uppercase tracking-widest font-mono text-xs border border-white/15 hover:border-white/30 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                title="Download / View Printable PDF Resume"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Resume</span>
              </button>
            </div>

            {/* Contact / Copy links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                id="hero-copy-email-btn"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-400">Copied {PERSONAL_INFO.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>

              <span className="text-white/20">|</span>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <span>{PERSONAL_INFO.linkedinHandle}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>

              <span className="text-white/20">|</span>

              <button
                onClick={onOpenContact}
                className="hover:text-cyan-300 underline underline-offset-4 decoration-white/20 cursor-pointer"
              >
                Direct Message
              </button>
            </div>

          </div>

          {/* Right Column: Interactive DevOps Terminal / YAML Manifest Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-black/60 border border-white/15 shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Terminal Window Chrome */}
              <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  <span className="ml-2 text-xs font-mono text-slate-400 font-medium truncate">
                    vikash-sharma@prod-infra:~
                  </span>
                </div>
                
                {/* Code switcher tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('manifest')}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'manifest' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    k8s.yaml
                  </button>
                  <button
                    onClick={() => setActiveTab('pipeline')}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'pipeline' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ci-cd.yml
                  </button>
                  <button
                    onClick={() => setActiveTab('iac')}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'iac' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    vpc.tf
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[380px]">
                {activeTab === 'manifest' && (
                  <div>
                    <div className="text-slate-400 mb-2 flex items-center justify-between">
                      <span className="text-slate-500">// kubectl describe engineer/vikash-sharma</span>
                      <span className="text-cyan-400 text-[10px] font-bold tracking-widest">● SYNCED</span>
                    </div>
                    <pre className="text-emerald-300/90 font-mono">
                      <span className="text-cyan-400">apiVersion</span>: <span className="text-amber-300">cloud.native.io/v1alpha1</span>{'\n'}
                      <span className="text-cyan-400">kind</span>: <span className="text-amber-300">DevOpsEngineer</span>{'\n'}
                      <span className="text-cyan-400">metadata</span>:{'\n'}
                      {'  '}<span className="text-cyan-400">name</span>: <span className="text-slate-100">vikash-sharma</span>{'\n'}
                      {'  '}<span className="text-cyan-400">experience</span>: <span className="text-amber-300">"2.5+ years"</span>{'\n'}
                      {'  '}<span className="text-cyan-400">company</span>: <span className="text-slate-100">Fusion Business Solutions Pvt. Ltd.</span>{'\n'}
                      <span className="text-cyan-400">spec</span>:{'\n'}
                      {'  '}<span className="text-cyan-400">coreOrchestration</span>:{'\n'}
                      {'    '}- <span className="text-slate-200">Kubernetes (Helm, Multi-Tenant, HPA)</span>{'\n'}
                      {'    '}- <span className="text-slate-200">ArgoCD GitOps (Zero-Drift Rollouts)</span>{'\n'}
                      {'    '}- <span className="text-slate-200">Docker Multi-Stage & MLOps/LLMOps</span>{'\n'}
                      {'  '}<span className="text-cyan-400">cloudAndIaC</span>:{'\n'}
                      {'    '}- <span className="text-slate-200">AWS VPC (Multi-AZ, ALB, Route53, IGW)</span>{'\n'}
                      {'    '}- <span className="text-slate-200">Terraform Reusable Modules & Ansible</span>{'\n'}
                      {'  '}<span className="text-cyan-400">telemetryAndSecurity</span>:{'\n'}
                      {'    '}- <span className="text-cyan-300">Prometheus & Grafana (MTTD &lt; 3 mins)</span>{'\n'}
                      {'    '}- <span className="text-cyan-300">Sophos Firewalls, Nginx Port Mapping</span>{'\n'}
                      <span className="text-cyan-400">status</span>:{'\n'}
                      {'  '}<span className="text-cyan-400">clusterHealth</span>: <span className="text-cyan-400">READY (99.99% SLA)</span>{'\n'}
                      {'  '}<span className="text-cyan-400">currentProjects</span>: <span className="text-slate-100">[fbsplai.com, ims.fbspl.com]</span>
                    </pre>
                  </div>
                )}

                {activeTab === 'pipeline' && (
                  <div>
                    <div className="text-slate-400 mb-2 flex items-center justify-between">
                      <span className="text-slate-500">// .github/workflows/deploy-production.yml</span>
                      <span className="text-cyan-400 text-[10px] font-bold tracking-widest">● RUNNING</span>
                    </div>
                    <pre className="text-slate-300 font-mono">
                      <span className="text-purple-400">name</span>: Production GitOps CD Pipeline{'\n'}
                      <span className="text-purple-400">on</span>: [push: &#123; branches: [main] &#125;]{'\n'}
                      <span className="text-purple-400">jobs</span>:{'\n'}
                      {'  '}<span className="text-cyan-400">security_sast</span>:{'\n'}
                      {'    '}<span className="text-slate-400">runs-on</span>: ubuntu-latest{'\n'}
                      {'    '}<span className="text-slate-400">steps</span>:{'\n'}
                      {'      '}- <span className="text-amber-300">uses</span>: aquasecurity/trivy-action@master{'\n'}
                      {'  '}<span className="text-cyan-400">argocd_sync</span>:{'\n'}
                      {'    '}<span className="text-slate-400">needs</span>: security_sast{'\n'}
                      {'    '}<span className="text-slate-400">steps</span>:{'\n'}
                      {'      '}- <span className="text-amber-300">run</span>: |{'\n'}
                      {'          '}argocd app sync production-app{'\n'}
                      {'          '}argocd app wait production-app --health
                    </pre>
                  </div>
                )}

                {activeTab === 'iac' && (
                  <div>
                    <div className="text-slate-400 mb-2 flex items-center justify-between">
                      <span className="text-slate-500">// terraform/aws_vpc_production.tf</span>
                      <span className="text-cyan-400 text-[10px] font-bold tracking-widest">● PLAN VERIFIED</span>
                    </div>
                    <pre className="text-cyan-300 font-mono">
                      <span className="text-purple-400">module</span> <span className="text-amber-300">"fbsplai_vpc"</span> &#123;{'\n'}
                      {'  '}<span className="text-slate-400">source</span> = <span className="text-amber-300">"terraform-aws-modules/vpc/aws"</span>{'\n'}
                      {'  '}<span className="text-slate-400">cidr</span>   = <span className="text-amber-300">"10.0.0.0/16"</span>{'\n'}
                      {'  '}<span className="text-slate-400">azs</span>    = [<span className="text-amber-300">"ap-south-1a"</span>, <span className="text-amber-300">"ap-south-1b"</span>]{'\n'}
                      {'  '}<span className="text-slate-400">public_subnets</span>  = [<span className="text-amber-300">"10.0.1.0/24"</span>, <span className="text-amber-300">"10.0.2.0/24"</span>]{'\n'}
                      {'  '}<span className="text-slate-400">private_subnets</span> = [<span className="text-amber-300">"10.0.10.0/24"</span>, <span className="text-amber-300">"10.0.20.0/24"</span>]{'\n'}
                      {'  '}<span className="text-slate-400">enable_nat_gateway</span> = <span className="text-cyan-400">true</span>{'\n'}
                      {'  '}<span className="text-slate-400">single_nat_gateway</span> = <span className="text-cyan-400">false</span> # HA Multi-AZ{'\n'}
                      &#125;
                    </pre>
                  </div>
                )}
              </div>

              {/* Status footer bar */}
              <div className="px-4 py-2.5 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                  <span className="text-slate-300 uppercase tracking-wider text-[10px]">ArgoCD: Synced & Healthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Pods: <strong className="text-cyan-400">18/18</strong></span>
                  <span className="text-slate-400">Latency: <strong className="text-cyan-300">1.2ms</strong></span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
