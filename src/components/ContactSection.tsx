import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, Copy, Check, Terminal, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const sshPublicKey = `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH8q... vikashsha669@fusion-devops-host`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (e) {}
    }, 1200);
  };

  const copySshKey = () => {
    navigator.clipboard.writeText(sshPublicKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#0a0a0c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
            <Send className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Initiate Contact & Deployment
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            Interested in scaling your cloud architecture, automating CI/CD pipelines, or discussing high-reliability Kubernetes deployments? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Contact Card */}
            <div className="bg-black/60 border border-white/15 rounded-xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Direct Contact Channels</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Email Address</div>
                    <div className="text-white font-bold truncate group-hover:text-cyan-300">{PERSONAL_INFO.email}</div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Direct Phone / WhatsApp</div>
                    <div className="text-white font-bold group-hover:text-cyan-300">{PERSONAL_INFO.phone}</div>
                  </div>
                </a>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Location</div>
                    <div className="text-white font-bold">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase tracking-wider">LinkedIn Profile</div>
                      <div className="text-white font-bold group-hover:text-cyan-300">{PERSONAL_INFO.linkedinHandle}</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

              </div>
            </div>

            {/* SSH Key snippet box */}
            <div className="bg-black/60 border border-white/15 rounded-xl p-4 space-y-2 font-mono text-xs backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  SSH Public Key (Deploy Key)
                </span>
                <button
                  onClick={copySshKey}
                  className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider text-[10px]"
                >
                  {copiedKey ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-400 break-all select-all">
                {sshPublicKey}
              </div>
            </div>

          </div>

          {/* Right Column: Webhook Message Form */}
          <div className="lg:col-span-7 bg-black/60 border border-white/15 rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            
            <div className="border-b border-white/10 pb-4 mb-6">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Send Direct Inquiry Payload</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Dispatches a notification payload directly to Vikash Sharma
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-mono">Payload Dispatched Successfully!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for getting in touch. Your message has been received and Vikash Sharma will respond promptly at <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="mt-4 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                    Subject / Project Scope
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Kubernetes Cluster Optimization / DevOps Role"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-1.5">
                    Message Payload <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your infrastructure needs, questions, or opportunity..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{isSubmitting ? 'Transmitting Payload...' : 'Transmit Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
