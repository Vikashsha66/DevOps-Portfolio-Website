import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText, ExternalLink, Globe, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const resumeData = {
      basics: {
        name: PERSONAL_INFO.name,
        label: PERSONAL_INFO.role,
        email: PERSONAL_INFO.email,
        phone: PERSONAL_INFO.phone,
        location: PERSONAL_INFO.location,
        linkedin: PERSONAL_INFO.linkedin,
        portfolio: PERSONAL_INFO.portfolioUrl,
        summary: PERSONAL_INFO.summary
      },
      work: EXPERIENCE,
      projects: PROJECTS,
      education: EDUCATION
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Vikash_Sharma_DevOps_Resume.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyMarkdown = () => {
    const md = `# ${PERSONAL_INFO.name} - ${PERSONAL_INFO.role}
Location: ${PERSONAL_INFO.location} | Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin} | Portfolio: ${PERSONAL_INFO.portfolioUrl}

## PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

## CORE SKILLS
- Cloud: AWS, Azure, AWS VPC, AWS CloudWatch
- CI/CD: GitHub Actions, Jenkins, automated build, test and package verification
- Containers & Orchestration: Docker, Kubernetes, Helm Charts, containerized deployments
- GitOps: ArgoCD, automated environment synchronization, rollbacks, drift correction
- IaC & Automation: Terraform, reusable Terraform modules, Ansible playbooks
- Linux & Servers: Ubuntu, Linux, Windows Server 2022, VMware
- Networking & Security: DNS, Nginx, port mapping, Sophos Firewall, VPN Tunnels, TCP/IP
- Observability: Grafana, Prometheus, AWS CloudWatch, anomaly detection, MTTD
- AIOps / MLOps / LLMOps: AIOps anomaly detection, MLOps/LLMOps pipelines, model containerization
- Scripting: Python, Bash

## PROFESSIONAL EXPERIENCE
DevOps Engineer | Fusion Business Solutions Pvt. Ltd. | July 2023 - Present (Udaipur, India)
- AIOps and Incident Remediation: Configured alerting rules and anomaly detection patterns in Grafana & Prometheus (MTTD < 3m).
- MLOps and LLMOps: Automated CI/CD workflows for ML models and LLM services.
- Microservices Migration: Migrated monoliths to Docker/Helm on Kubernetes (99.99% availability).
- GitOps Continuous Delivery: ArgoCD continuous delivery model with automated drift correction.
- Infrastructure Automation: Reusable Terraform modules and Ansible playbooks (65% faster staging).
- CI/CD Pipeline Optimization: GitHub Actions & Jenkins pipelines boosting release frequency by 50%.
- Network Security: Sophos Firewalls, Windows Server 2022 policies.

## DEVOPS PROJECTS
- ims.fbspl.com: CI/CD Pipeline, GitHub Branching, DNS and Nginx
- epic.fbspl.com: Ubuntu Server Hosting and CI/CD
- fbsplai.com: AWS VPC Infrastructure & Production Cloud Deployment

## TECHNICAL ARCHITECTURE PROJECTS
- Microservices & MLOps Platform: Multi-Tenant Kubernetes & GitOps
- Monolith Modernization & AIOps Security Audit

## EDUCATION
- Master of Computer Applications (MCA) | JRNRVU Udaipur (2024 - 2026)
- Bachelor of Computer Applications (BCA) | JRNRVU Udaipur (2021 - 2024)
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-black/95 border border-white/15 rounded-xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col print:max-h-none print:border-none print:shadow-none print:my-0 print:rounded-none print:bg-white animate-fadeIn">
        
        {/* Top Control Action Bar (Hidden in Print) */}
        <div className="px-6 py-3.5 bg-black/70 border-b border-white/10 flex items-center justify-between print:hidden backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Vikash_Sharma_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-black" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              id="resume-json-btn"
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              onClick={copyMarkdown}
              id="resume-copy-btn"
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy MD</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2 cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Printable Resume Canvas (Clean Paper-Grade Styling) */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-[#0a0a0c] text-slate-100 font-sans print:p-8 print:bg-white print:text-black print:overflow-visible">
          
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Header / Identity */}
            <div className="border-b-2 border-cyan-500/80 pb-4 text-center space-y-1.5 print:border-black">
              <h1 className="text-3xl font-extrabold tracking-tight text-white print:text-black uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-sm font-mono font-bold text-cyan-400 print:text-gray-800 tracking-wider">
                DEVOPS ENGINEER
              </div>
              <div className="text-xs text-slate-300 print:text-gray-700 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono pt-1">
                <span>{PERSONAL_INFO.location}</span>
                <span>|</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>|</span>
                <span>{PERSONAL_INFO.email}</span>
                <span>|</span>
                <span>{PERSONAL_INFO.linkedinHandle}</span>
                <span>|</span>
                <span>{PERSONAL_INFO.portfolioUrl.replace('https://', '')}</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider border-b border-white/10 print:border-gray-300 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed text-justify">
                {PERSONAL_INFO.summary}
              </p>
            </div>

            {/* Core Skills Matrix */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider border-b border-white/10 print:border-gray-300 pb-1">
                CORE SKILLS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300 print:text-gray-800">
                <div><strong className="text-white print:text-black">Cloud:</strong> AWS, Azure, AWS VPC, AWS CloudWatch</div>
                <div><strong className="text-white print:text-black">CI/CD:</strong> GitHub Actions, Jenkins, automated build, test & verification</div>
                <div><strong className="text-white print:text-black">Version Control:</strong> Git, GitHub, branching strategy, GitOps</div>
                <div><strong className="text-white print:text-black">Containers:</strong> Docker, Kubernetes, Helm Charts</div>
                <div><strong className="text-white print:text-black">GitOps:</strong> ArgoCD, automated environment sync, rollbacks, drift correction</div>
                <div><strong className="text-white print:text-black">IaC:</strong> Terraform, reusable Terraform modules, Ansible playbooks</div>
                <div><strong className="text-white print:text-black">Linux & Servers:</strong> Ubuntu, Linux, Windows Server 2022, VMware</div>
                <div><strong className="text-white print:text-black">Networking & Security:</strong> DNS, Nginx, port mapping, Sophos Firewall, VPN Tunnels</div>
                <div><strong className="text-white print:text-black">Observability:</strong> Grafana, Prometheus, AWS CloudWatch, anomaly detection, MTTD</div>
                <div><strong className="text-white print:text-black">AIOps / MLOps:</strong> AIOps anomaly detection, MLOps/LLMOps pipelines</div>
                <div><strong className="text-white print:text-black">Scripting:</strong> Python, Bash</div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider border-b border-white/10 print:border-gray-300 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white print:text-black text-sm">DevOps Engineer</span>
                    <span className="text-slate-400 print:text-gray-700 block sm:inline sm:ml-2">
                      — Fusion Business Solutions Pvt. Ltd.
                    </span>
                  </div>
                  <div className="text-slate-400 print:text-gray-700 font-mono text-[11px]">
                    July 2023 – Present | Udaipur, India
                  </div>
                </div>

                <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800 list-disc list-outside ml-4 leading-relaxed">
                  <li><strong>AIOps and Incident Remediation:</strong> Assisted in configuring AIOps-driven alerting rules and anomaly detection patterns within Grafana and Prometheus to proactively identify performance bottlenecks and automate initial triage steps.</li>
                  <li><strong>MLOps and LLMOps:</strong> Supported automated CI/CD workflows for machine learning models and LLM services, including versioning, containerized deployments, and continuous monitoring of inference endpoints.</li>
                  <li><strong>Microservices Migration:</strong> Migrated legacy monolithic applications into decoupled microservices, containerized environments with Docker, and structured deployment patterns using Helm charts within Kubernetes clusters, achieving 99.99% system availability.</li>
                  <li><strong>GitOps Continuous Delivery:</strong> Designed and deployed a continuous delivery model integrating ArgoCD with GitHub repositories for automated environment synchronization, rapid rollbacks, and drift correction across multiple cluster deployments.</li>
                  <li><strong>Infrastructure Automation:</strong> Built reusable Terraform modules and configuration-focused Ansible playbooks across AWS and Azure environments, accelerating staging timelines by 65%.</li>
                  <li><strong>CI/CD Pipeline Optimization:</strong> Engineered CI pipelines using GitHub Actions and Jenkins for automated build, test, and package verification routines, boosting release frequency by 50%.</li>
                  <li><strong>Network Security and Observability:</strong> Architected gateway security using Sophos Firewalls and Windows Server 2022 policies and built real-time cluster telemetry suites that reduced Mean Time to Detection (MTTD) to under 3 minutes.</li>
                </ul>
              </div>
            </div>

            {/* DevOps Projects */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider border-b border-white/10 print:border-gray-300 pb-1">
                DEVOPS PROJECTS
              </h2>

              <div className="space-y-2 text-xs text-slate-300 print:text-gray-800">
                <div>
                  <div className="font-bold text-white print:text-black font-mono">
                    CI/CD Pipeline, GitHub Branching, DNS and Nginx | ims.fbspl.com
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-0.5 text-[11px]">
                    <li>Created a CI/CD pipeline using GitHub Actions.</li>
                    <li>Used a GitHub branching strategy for source-code management.</li>
                    <li>Mapped DNS using a local DNS server.</li>
                    <li>Created an Nginx configuration file for port mapping.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-white print:text-black font-mono">
                    Ubuntu Server Hosting and CI/CD | epic.fbspl.com
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-0.5 text-[11px]">
                    <li>Created an Ubuntu server and hosted the project on a local server.</li>
                    <li>Created a CI/CD pipeline using GitHub Actions.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-white print:text-black font-mono">
                    AWS VPC Infrastructure & Production Cloud Deployment | fbsplai.com
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 mt-0.5 text-[11px]">
                    <li>Designed production application architecture on AWS Cloud infrastructure.</li>
                    <li>Configured isolated Virtual Private Cloud (VPC) network architecture with custom subnets and routing.</li>
                    <li>Deployed fbsplai.com as a publicly accessible, highly available web application.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Architecture Projects */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider border-b border-white/10 print:border-gray-300 pb-1">
                TECHNICAL ARCHITECTURE PROJECTS
              </h2>

              <div className="space-y-2 text-xs text-slate-300 print:text-gray-800">
                <div>
                  <strong className="text-white print:text-black font-mono block">
                    Microservices & MLOps Platform: Multi-Tenant Kubernetes & GitOps
                  </strong>
                  <p className="text-[11px] leading-relaxed mt-0.5">
                    Headed the delivery of an isolated testing platform for engineering teams. Implemented a multi-node Kubernetes cluster with ArgoCD, namespace isolation, and automated CI/CD pipelines capable of packaging and serving containerized ML/LLM model endpoints alongside standard microservices.
                  </p>
                </div>

                <div>
                  <strong className="text-white print:text-black font-mono block">
                    Monolith Modernization & AIOps Security Audit
                  </strong>
                  <p className="text-[11px] leading-relaxed mt-0.5">
                    Designed the migration blueprint of a legacy monolithic system to a cloud-native model. Integrated SAST security gates into Jenkins/GitHub Actions and enabled basic AIOps anomaly alerts to catch early build failures and runtime performance anomalies.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 print:text-black uppercase tracking-wider border-b border-white/10 print:border-gray-300 pb-1">
                EDUCATION
              </h2>

              <div className="space-y-1.5 text-xs text-slate-300 print:text-gray-800">
                <div className="flex justify-between font-mono text-[11px]">
                  <span><strong>Master of Computer Applications (MCA)</strong> — JRNRVU, Udaipur, India</span>
                  <span className="text-slate-400 print:text-gray-700">2024 – 2026</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span><strong>Bachelor of Computer Applications (BCA)</strong> — JRNRVU, Udaipur, India</span>
                  <span className="text-slate-400 print:text-gray-700">2021 – 2024</span>
                </div>
              </div>
            </div>

            {/* Footer Declaration */}
            <div className="pt-3 border-t border-white/10 print:border-gray-300 text-center text-[10px] text-slate-400 print:text-gray-600 italic">
              I hereby declare that the information provided above is true and correct to the best of my knowledge. — Vikash Sharma
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
