import React, { useState, useEffect } from 'react';
import { Activity, Shield, RefreshCw, Cpu, CheckCircle2, AlertTriangle, Play, RotateCcw, Zap, Terminal, Sliders, Check, Lock, ArrowUpRight, Radio, Layers, Server } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SECURITY_VULNERABILITIES } from '../data/portfolioData';
import { SecurityVulnerability } from '../types';

export const DevOpsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deployments' | 'security' | 'scaling'>('deployments');

  // ================= DEPLOYMENTS STATE =================
  const [deployStrategy, setDeployStrategy] = useState<'canary' | 'rolling' | 'blue-green'>('canary');
  const [deployService, setDeployService] = useState<'fbsplai-web' | 'ims-api' | 'epic-service'>('fbsplai-web');
  const [deployStep, setDeployStep] = useState<number>(0); // 0 = idle, 1..5 = steps
  const [deployInProgress, setDeployInProgress] = useState<boolean>(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([
    '[INIT] ArgoCD application controller connected to https://kubernetes.default.svc',
    '[STATUS] Desired state matches Git repo vikashsha669/k8s-manifests (HEAD: 8f4e19b)',
    '[READY] Cluster health: Synced | Zero drift detected.'
  ]);
  const [canaryWeight, setCanaryWeight] = useState<number>(100);

  // ================= SECURITY STATE =================
  const [vulnerabilities, setVulnerabilities] = useState<SecurityVulnerability[]>(SECURITY_VULNERABILITIES);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [patchingId, setPatchingId] = useState<string | null>(null);
  const [securityLogs, setSecurityLogs] = useState<string[]>([
    '[TRIVY] Automated SAST scanner executed across 4 container registries',
    '[SOPHOS] Gateway firewall policies active on all ingress routes'
  ]);

  // ================= SCALING / HPA STATE =================
  const [trafficRps, setTrafficRps] = useState<number>(1200);
  const [targetCpuThreshold, setTargetCpuThreshold] = useState<number>(70);
  const [minReplicas, setMinReplicas] = useState<number>(3);
  const [maxReplicas, setMaxReplicas] = useState<number>(16);

  // Calculated scaling values
  const calculatedReplicas = Math.min(
    maxReplicas,
    Math.max(minReplicas, Math.ceil(trafficRps / 800))
  );
  const calculatedCpuPercent = Math.min(
    95,
    Math.max(25, Math.floor((trafficRps / (calculatedReplicas * 900)) * 100))
  );
  const calculatedLatency = Math.max(1.1, Math.min(45, (calculatedCpuPercent * 0.28).toFixed(1) as any));

  // Trigger Deployment Simulation
  const handleStartDeployment = () => {
    if (deployInProgress) return;
    setDeployInProgress(true);
    setDeployStep(1);
    setCanaryWeight(deployStrategy === 'canary' ? 10 : 0);

    const logMessages = [
      `[STAGE 1/5] Git webhook received: Merge commit #492 to production branch`,
      `[STAGE 2/5] Running SAST vulnerability gate & Docker multi-stage build for ${deployService}:v2.5.0`,
      `[STAGE 3/5] ArgoCD initiating GitOps synchronization for namespace: production`,
      `[STAGE 4/5] Shifting traffic via Nginx Ingress (${deployStrategy === 'canary' ? 'Canary 25% -> 50% -> 100%' : 'Rolling Pod Replacement'})`,
      `[STAGE 5/5] HTTP 200 health-checks passed on all endpoints. Deployment SUCCESSFUL! Zero downtime.`
    ];

    setDeployLogs([`[START] Triggered ${deployStrategy.toUpperCase()} deployment for ${deployService}...`]);

    let currentStep = 1;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= 5) {
        setDeployStep(currentStep);
        setDeployLogs(prev => [...prev, logMessages[currentStep - 1]]);
        if (deployStrategy === 'canary') {
          setCanaryWeight(currentStep === 2 ? 25 : currentStep === 3 ? 50 : currentStep === 4 ? 80 : 100);
        }
      } else {
        clearInterval(interval);
        setDeployInProgress(false);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        } catch (e) {
          // ignore if canvas unavailable
        }
      }
    }, 1200);
  };

  // Rollback simulation
  const handleRollback = () => {
    setDeployLogs(prev => [
      ...prev,
      `[ROLLBACK] Emergency rollback initiated to previous release SHA`,
      `[ARGOCD] Self-healing drift reconciliation triggered. Pointing ingress back to v2.4.1`,
      `[COMPLETE] Reverted 100% traffic to stable deployment in 420ms.`
    ]);
    setCanaryWeight(100);
    setDeployStep(0);
  };

  // Patch Single Vulnerability
  const handleApplyPatch = (vuln: SecurityVulnerability) => {
    setPatchingId(vuln.id);
    setSecurityLogs(prev => [
      ...prev,
      `[PATCH EXEC] Running: ${vuln.patchAction}`,
      `[UPGRADE] Updating ${vuln.package} from ${vuln.installedVersion} -> ${vuln.fixedVersion}`,
      `[VERIFY] Re-scanning artifact with Trivy scanner... Passed.`
    ]);

    setTimeout(() => {
      setVulnerabilities(prev =>
        prev.map(v => v.id === vuln.id ? { ...v, isPatched: true } : v)
      );
      setPatchingId(null);
    }, 1400);
  };

  // Run Full Security Scan
  const handleRunFullScan = () => {
    setIsScanning(true);
    setSecurityLogs(prev => [
      ...prev,
      `[SCANNER] Triggering full Trivy & SAST pipeline scan...`,
      `[AUDIT] Inspecting Kubernetes RBAC policies, Docker base images, and TLS certs...`
    ]);

    setTimeout(() => {
      setIsScanning(false);
      setSecurityLogs(prev => [
        ...prev,
        `[AUDIT COMPLETED] Verified 0 critical CVEs remaining in production cluster. Sophos Firewall healthy.`
      ]);
    }, 2000);
  };

  const patchedCount = vulnerabilities.filter(v => v.isPatched).length;
  const securityScore = Math.round((patchedCount / vulnerabilities.length) * 100);

  return (
    <section id="dashboard" className="py-20 bg-[#0a0a0c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5" />
              <span>DevOps Solutions & Operations Center</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Live Infrastructure Operations
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Interact with real-world DevOps workflows: zero-downtime GitOps rollouts, automated security patch remediation, and dynamic HPA auto-scaling.
            </p>
          </div>

          {/* Navigation Pill Tabs (Immersive UI Rounded-Full) */}
          <div className="flex items-center p-1 bg-black/60 border border-white/15 rounded-full backdrop-blur-md">
            <button
              onClick={() => setActiveTab('deployments')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'deployments'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Deployments</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'security'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>Security</span>
            </button>

            <button
              onClick={() => setActiveTab('scaling')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scaling'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Scaling</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: DEPLOYMENTS & GITOPS ================= */}
        {activeTab === 'deployments' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Deployment Controls & Pipeline Stages */}
            <div className="lg:col-span-7 bg-black/60 border border-white/15 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 text-cyan-400 ${deployInProgress ? 'animate-spin' : ''}`} />
                    ArgoCD GitOps Rollout Controller
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Automated release synchronization & traffic shift</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-bold tracking-wider uppercase">
                    {deployInProgress ? 'SYNC IN PROGRESS' : 'SYNCED (HEALTHY)'}
                  </span>
                </div>
              </div>

              {/* Service & Strategy Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">Target Application</label>
                  <select
                    value={deployService}
                    onChange={(e) => setDeployService(e.target.value as any)}
                    disabled={deployInProgress}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="fbsplai-web" className="bg-[#0a0a0c] text-white">fbsplai.com (Production Web)</option>
                    <option value="ims-api" className="bg-[#0a0a0c] text-white">ims.fbspl.com (API Gateway)</option>
                    <option value="epic-service" className="bg-[#0a0a0c] text-white">epic.fbspl.com (Ubuntu Service)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">Release Strategy</label>
                  <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => setDeployStrategy('canary')}
                      disabled={deployInProgress}
                      className={`py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-colors cursor-pointer ${
                        deployStrategy === 'canary' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Canary
                    </button>
                    <button
                      onClick={() => setDeployStrategy('rolling')}
                      disabled={deployInProgress}
                      className={`py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-colors cursor-pointer ${
                        deployStrategy === 'rolling' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Rolling
                    </button>
                    <button
                      onClick={() => setDeployStrategy('blue-green')}
                      disabled={deployInProgress}
                      className={`py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-colors cursor-pointer ${
                        deployStrategy === 'blue-green' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Blue/Green
                    </button>
                  </div>
                </div>
              </div>

              {/* Visual Pipeline Stages */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Pipeline Execution Status</span>
                  <span className="text-cyan-400">{deployStep > 0 ? `Stage ${deployStep} of 5` : 'Standing By'}</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[
                    { name: 'Git Webhook', label: 'Commit' },
                    { name: 'SAST Scan', label: 'Trivy Gate' },
                    { name: 'ArgoCD', label: 'Sync State' },
                    { name: 'Traffic Shift', label: 'Ingress' },
                    { name: 'Health Check', label: 'Prometheus' },
                  ].map((st, i) => {
                    const stepNum = i + 1;
                    const isDone = deployStep > stepNum || (!deployInProgress && deployStep === 5);
                    const isCurrent = deployStep === stepNum && deployInProgress;

                    return (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border text-center font-mono transition-all ${
                          isDone
                            ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                            : isCurrent
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 animate-pulse'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        <div className="text-[9px] uppercase tracking-wider text-slate-400">{st.label}</div>
                        <div className="text-xs font-bold truncate mt-0.5">{st.name}</div>
                        <div className="mt-1 flex justify-center">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          ) : isCurrent ? (
                            <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canary Traffic Weight Visualizer */}
              {deployStrategy === 'canary' && (
                <div className="bg-white/5 p-3.5 rounded-lg border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Nginx Ingress Traffic Split</span>
                    <span className="text-cyan-400 font-bold">
                      Canary v2.5 ({canaryWeight}%) | Baseline v2.4 ({100 - canaryWeight}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden flex">
                    <div
                      className="bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] h-full transition-all duration-500"
                      style={{ width: `${canaryWeight}%` }}
                    />
                    <div
                      className="bg-blue-600 h-full transition-all duration-500"
                      style={{ width: `${100 - canaryWeight}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleStartDeployment}
                  disabled={deployInProgress}
                  className="flex-1 py-2.5 px-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-black fill-black" />
                  <span>{deployInProgress ? 'Executing Deployment...' : 'Trigger GitOps Rollout'}</span>
                </button>

                <button
                  onClick={handleRollback}
                  disabled={deployInProgress}
                  className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rollback</span>
                </button>
              </div>

            </div>

            {/* Right Column: Real-time Terminal Log Stream */}
            <div className="lg:col-span-5 bg-black/70 border border-white/15 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
              <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>deploy-controller.log</span>
                </div>
                <span className="text-[9px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30 font-bold uppercase tracking-wider">
                  STREAM ACTIVE
                </span>
              </div>

              <div className="p-4 flex-1 font-mono text-xs space-y-2 overflow-y-auto max-h-[380px] text-slate-300">
                {deployLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      log.includes('SUCCESSFUL')
                        ? 'text-cyan-400 font-bold'
                        : log.includes('ROLLBACK')
                        ? 'text-rose-400 font-bold'
                        : log.includes('STAGE')
                        ? 'text-cyan-300'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="text-slate-600 mr-2">{`>`}</span>
                    {log}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <span>Cluster: AWS EKS prod-01</span>
                <span>Drift: 0.00% (Strict Sync)</span>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: SECURITY & PATCHES ================= */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: CVE Vulnerability Matrix */}
            <div className="lg:col-span-8 bg-black/60 border border-white/15 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    Automated Vulnerability & Patch Remediation
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    SAST gates, container package scanning, and 1-click CVE mitigation
                  </p>
                </div>

                <button
                  onClick={handleRunFullScan}
                  disabled={isScanning}
                  className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-white/20 flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 text-cyan-400 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Scanning Cluster...' : 'Run Trivy SAST Scan'}</span>
                </button>
              </div>

              {/* Vulnerabilities List */}
              <div className="space-y-3">
                {vulnerabilities.map((vuln) => (
                  <div
                    key={vuln.id}
                    className={`p-4 rounded-xl border transition-all ${
                      vuln.isPatched
                        ? 'bg-white/5 border-cyan-500/30'
                        : vuln.severity === 'CRITICAL'
                        ? 'bg-rose-950/20 border-rose-500/40'
                        : 'bg-amber-950/20 border-amber-500/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              vuln.isPatched
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : vuln.severity === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {vuln.isPatched ? 'RESOLVED & PATCHED' : `${vuln.severity} - ${vuln.cve}`}
                          </span>
                          <span className="text-xs font-mono text-slate-300 font-semibold">{vuln.package}</span>
                          <span className="text-[11px] font-mono text-slate-400">
                            ({vuln.installedVersion} → <strong className="text-cyan-400">{vuln.fixedVersion}</strong>)
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-white">{vuln.title}</h4>
                        <p className="text-xs text-slate-400">{vuln.description}</p>
                        <div className="text-[10px] font-mono text-slate-400 pt-1">
                          Affected Tier: <span className="text-slate-300">{vuln.impact}</span>
                        </div>
                      </div>

                      <div className="shrink-0 pt-2 sm:pt-0">
                        {vuln.isPatched ? (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 font-bold uppercase tracking-wider text-[10px]">
                            <Check className="w-3.5 h-3.5" />
                            <span>Secured</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleApplyPatch(vuln)}
                            disabled={patchingId === vuln.id}
                            className="px-3.5 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer disabled:opacity-50"
                          >
                            <Lock className="w-3 h-3 text-black" />
                            <span>{patchingId === vuln.id ? 'Applying...' : 'Apply Patch'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Security Score & Live Audit Log */}
            <div className="lg:col-span-4 space-y-4 flex flex-col">
              
              {/* Security Posture Card */}
              <div className="bg-black/60 border border-white/15 rounded-xl p-5 shadow-2xl backdrop-blur-xl">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Cluster Security Posture</span>
                  <span className="text-cyan-400 font-bold">{securityScore}% Compliant</span>
                </div>
                
                <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden mb-3 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-700 rounded-full"
                    style={{ width: `${securityScore}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono pt-1">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Patched</div>
                    <div className="text-cyan-400 font-bold text-sm">{patchedCount}/{vulnerabilities.length}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px] uppercase tracking-wider">Sophos Firewall</div>
                    <div className="text-cyan-300 font-bold text-sm">Active</div>
                  </div>
                </div>
              </div>

              {/* Security Event Log */}
              <div className="bg-black/70 border border-white/15 rounded-xl p-4 shadow-2xl backdrop-blur-xl flex-1 flex flex-col">
                <div className="text-xs font-mono text-slate-300 font-bold mb-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="uppercase tracking-wider">Security Audit Log</span>
                </div>
                <div className="space-y-2 flex-1 font-mono text-xs text-slate-400 overflow-y-auto max-h-[220px]">
                  {securityLogs.map((log, i) => (
                    <div key={i} className="leading-tight">
                      <span className="text-cyan-400 mr-1.5">●</span>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 3: SCALING & HPA ================= */}
        {activeTab === 'scaling' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Dynamic HPA Controls */}
            <div className="lg:col-span-6 bg-black/60 border border-white/15 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-6">
              
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Horizontal Pod Autoscaler (HPA) Simulator
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Simulate live user traffic spikes and observe pod scheduling & CPU balancing
                </p>
              </div>

              {/* Traffic RPS Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">Simulated User Ingress Traffic</span>
                  <span className="text-cyan-400 font-bold text-sm">{trafficRps.toLocaleString()} Req / Sec</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="12000"
                  step="200"
                  value={trafficRps}
                  onChange={(e) => setTrafficRps(Number(e.target.value))}
                  className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  <span>200 RPS (Idle)</span>
                  <span>4,000 RPS (Normal)</span>
                  <span>12,000 RPS (Flash Surge)</span>
                </div>
              </div>

              {/* HPA Parameters Config */}
              <div className="grid grid-cols-3 gap-3 bg-white/5 p-3.5 rounded-lg border border-white/10">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Target CPU %</label>
                  <input
                    type="number"
                    value={targetCpuThreshold}
                    onChange={(e) => setTargetCpuThreshold(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-xs font-mono text-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Min Replicas</label>
                  <input
                    type="number"
                    value={minReplicas}
                    onChange={(e) => setMinReplicas(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-xs font-mono text-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Max Replicas</label>
                  <input
                    type="number"
                    value={maxReplicas}
                    onChange={(e) => setMaxReplicas(Number(e.target.value))}
                    className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-xs font-mono text-blue-400"
                  />
                </div>
              </div>

              {/* HPA Live Math Output */}
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono space-y-1.5">
                <div className="text-cyan-300 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  HPA Calculation Rule:
                </div>
                <div className="text-slate-300">
                  Target Pods = ceil[ CurrentRPS ({trafficRps}) / CapacityPerPod (800) ] = <strong className="text-cyan-400 text-sm">{calculatedReplicas} Replicas</strong>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Cluster nodes automatically provisioned across ap-south-1a & ap-south-1b
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Pod Visualizer Grid & Prometheus Metrics */}
            <div className="lg:col-span-6 bg-black/60 border border-white/15 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-6">
              
              {/* Telemetry Numbers */}
              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Active Pods</div>
                  <div className="text-xl font-bold text-cyan-400 mt-0.5">{calculatedReplicas} / {maxReplicas}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Average CPU</div>
                  <div className={`text-xl font-bold mt-0.5 ${calculatedCpuPercent > 80 ? 'text-amber-400' : 'text-cyan-300'}`}>
                    {calculatedCpuPercent}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Latency</div>
                  <div className="text-xl font-bold text-white mt-0.5">{calculatedLatency} ms</div>
                </div>
              </div>

              {/* Dynamic Pod Grid Visualizer */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Scheduled Pods in Namespace <code className="text-cyan-400">production</code></span>
                  <span className="text-[10px] text-cyan-400 font-bold">ALL RUNNING</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[220px] overflow-y-auto p-2.5 bg-black/60 rounded-xl border border-white/10">
                  {Array.from({ length: calculatedReplicas }).map((_, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-white/5 border border-cyan-500/20 text-center font-mono text-[10px] space-y-0.5"
                    >
                      <div className="flex items-center justify-center gap-1 text-cyan-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)] animate-pulse" />
                        pod-{idx + 1}
                      </div>
                      <div className="text-slate-400 text-[9px]">1/1 Ready</div>
                      <div className="text-cyan-300/80 text-[9px] truncate">~{Math.round(trafficRps / calculatedReplicas)} RPS</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
