import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Trash2, CheckCircle2, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface InteractiveTerminalProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ onOpenResume, onOpenContact }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([
    {
      command: 'neofetch',
      output: (
        <div className="text-slate-300 font-mono text-xs leading-relaxed space-y-1">
          <div className="text-emerald-400 font-bold">vikash-sharma@devops-platform</div>
          <div className="text-slate-400">--------------------------------</div>
          <div><strong className="text-white">Role:</strong> DevOps & Cloud Infrastructure Engineer</div>
          <div><strong className="text-white">Experience:</strong> 2.5+ Years (Fusion Business Solutions Pvt. Ltd.)</div>
          <div><strong className="text-white">Orchestration:</strong> Kubernetes, Docker, Helm, ArgoCD GitOps</div>
          <div><strong className="text-white">Cloud & IaC:</strong> AWS VPC Multi-AZ, Terraform, Ansible</div>
          <div><strong className="text-white">Observability:</strong> Grafana, Prometheus, AIOps (MTTD &lt; 3m)</div>
          <div><strong className="text-white">Status:</strong> All Systems Operational (99.99% SLA)</div>
          <div className="text-cyan-400 text-[11px] pt-1">Type <span className="text-amber-300">help</span> to view available terminal commands.</div>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>(['neofetch']);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setCommandList(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;
    const lowerCmd = cmd.toLowerCase();

    switch (lowerCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-emerald-400 font-bold">Available DevOps CLI Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-slate-400">
              <div><span className="text-amber-300">kubectl get nodes</span> - View EKS cluster nodes</div>
              <div><span className="text-amber-300">kubectl get pods -A</span> - View multi-tenant pods</div>
              <div><span className="text-amber-300">argocd app list</span> - List GitOps applications</div>
              <div><span className="text-amber-300">terraform output</span> - Inspect AWS VPC state</div>
              <div><span className="text-amber-300">curl -I fbsplai.com</span> - Probe production web URL</div>
              <div><span className="text-amber-300">whoami</span> - Display DevOps profile</div>
              <div><span className="text-amber-300">resume</span> - Open printable PDF resume</div>
              <div><span className="text-amber-300">contact</span> - Display direct email & phone</div>
              <div><span className="text-amber-300">clear</span> - Clear terminal window</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.role}</div>
            <div>{PERSONAL_INFO.summary}</div>
            <div className="text-slate-400">Location: {PERSONAL_INFO.location} | Email: {PERSONAL_INFO.email}</div>
          </div>
        );
        break;

      case 'kubectl get nodes':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-0.5 overflow-x-auto">
            <div className="text-slate-400 font-bold">NAME                       STATUS   ROLES           AGE    VERSION</div>
            <div>k8s-control-plane-01        <span className="text-emerald-400">Ready</span>    control-plane   284d   v1.29.2</div>
            <div>k8s-worker-prod-01          <span className="text-emerald-400">Ready</span>    worker          284d   v1.29.2</div>
            <div>k8s-worker-prod-02          <span className="text-emerald-400">Ready</span>    worker          284d   v1.29.2</div>
            <div>k8s-ingress-gateway-01      <span className="text-emerald-400">Ready</span>    ingress         284d   v1.29.2</div>
            <div>k8s-mlops-worker-gpu-01     <span className="text-emerald-400">Ready</span>    ml-gpu          180d   v1.29.2</div>
          </div>
        );
        break;

      case 'kubectl get pods -a':
      case 'kubectl get pods':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-0.5 overflow-x-auto">
            <div className="text-slate-400 font-bold">NAMESPACE       NAME                                READY   STATUS    RESTARTS   AGE</div>
            <div>production      fbsplai-web-74b8-f1                 1/1     <span className="text-emerald-400">Running</span>   0          42d</div>
            <div>production      fbsplai-web-74b8-g9                 1/1     <span className="text-emerald-400">Running</span>   0          42d</div>
            <div>ims-prod        ims-backend-api-5c9-2j              1/1     <span className="text-emerald-400">Running</span>   0          19d</div>
            <div>epic-prod       epic-service-app-8a2-k4             1/1     <span className="text-emerald-400">Running</span>   0          12d</div>
            <div>argocd          argocd-server-79d84-w2              1/1     <span className="text-emerald-400">Running</span>   0          94d</div>
            <div>monitoring      prometheus-k8s-0                    2/2     <span className="text-emerald-400">Running</span>   0          94d</div>
            <div>monitoring      grafana-core-6d4-8x                 1/1     <span className="text-emerald-400">Running</span>   0          94d</div>
            <div>mlops-prod      llm-inference-model-01              1/1     <span className="text-emerald-400">Running</span>   0          14d</div>
          </div>
        );
        break;

      case 'argocd app list':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-0.5 overflow-x-auto">
            <div className="text-slate-400 font-bold">NAME                  CLUSTER                         STATUS   HEALTH   SYNC POLICY</div>
            <div>fbsplai-production   https://kubernetes.default.svc   <span className="text-emerald-400">Synced</span>   <span className="text-emerald-400">Healthy</span>  Automated (Prune/SelfHeal)</div>
            <div>ims-gateway          https://kubernetes.default.svc   <span className="text-emerald-400">Synced</span>   <span className="text-emerald-400">Healthy</span>  Automated</div>
            <div>mlops-llm-serving    https://kubernetes.default.svc   <span className="text-emerald-400">Synced</span>   <span className="text-emerald-400">Healthy</span>  Automated</div>
          </div>
        );
        break;

      case 'terraform output':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div className="text-cyan-400 font-bold"># Terraform State Outputs (AWS ap-south-1)</div>
            <div>alb_dns_name = <span className="text-emerald-400">"fbsplai-alb-842918.ap-south-1.elb.amazonaws.com"</span></div>
            <div>vpc_cidr_block = <span className="text-emerald-400">"10.0.0.0/16"</span></div>
            <div>public_subnets = [<span className="text-emerald-400">"subnet-0a81f3", "subnet-0b92e4"</span>]</div>
            <div>nat_gateway_ips = [<span className="text-emerald-400">"13.235.48.112", "13.235.48.113"</span>]</div>
          </div>
        );
        break;

      case 'curl -i fbsplai.com':
      case 'curl -i https://fbsplai.com':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-0.5">
            <div className="text-emerald-400 font-bold">HTTP/2 200 OK</div>
            <div>server: cloudflare</div>
            <div>date: {new Date().toUTCString()}</div>
            <div>content-type: text/html; charset=UTF-8</div>
            <div>x-frame-options: SAMEORIGIN</div>
            <div>strict-transport-security: max-age=31536000; includeSubDomains</div>
            <div>cf-cache-status: DYNAMIC</div>
            <div className="text-cyan-400 pt-1 font-bold">Endpoint alive and healthy (latency 38ms)</div>
          </div>
        );
        break;

      case 'resume':
        onOpenResume();
        output = (
          <div className="text-xs font-mono text-emerald-400">
            Opening printable DevOps resume modal...
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div><strong className="text-white">Email:</strong> {PERSONAL_INFO.email}</div>
            <div><strong className="text-white">Phone:</strong> {PERSONAL_INFO.phone}</div>
            <div><strong className="text-white">LinkedIn:</strong> {PERSONAL_INFO.linkedin}</div>
            <div><strong className="text-white">Portfolio:</strong> {PERSONAL_INFO.portfolioUrl}</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            command not found: {cmd}. Type <span className="text-amber-300 underline">help</span> to view available commands.
          </div>
        );
        break;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandList.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(commandList[nextIndex]);
        }
      }
    }
  };

  return (
    <section id="terminal-section" className="py-16 bg-[#0a0a0c] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container */}
        <div className="rounded-xl bg-black/80 border border-white/15 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>vikash@cloud-infra: ~ (bash 5.2)</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistory([])}
                className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear Terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">clear</span>
              </button>
            </div>
          </div>

          {/* Quick command suggestion pills */}
          <div className="px-5 py-2.5 bg-white/5 border-b border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">Quick Run:</span>
            {['help', 'kubectl get nodes', 'kubectl get pods -A', 'argocd app list', 'terraform output', 'whoami', 'curl -I fbsplai.com'].map(cmd => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd);
                }}
                className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors text-[11px] cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal History Canvas */}
          <div className="p-5 font-mono text-xs space-y-4 max-h-[380px] overflow-y-auto bg-black/90 text-slate-200">
            {history.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span className="text-slate-500">vikash@cloud-infra:~$</span>
                  <span>{item.command}</span>
                </div>
                <div className="pl-4 border-l border-white/10">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 text-slate-100 pt-1">
              <span className="text-cyan-400 font-bold shrink-0">vikash@cloud-infra:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. help, kubectl get nodes)..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-600 focus:ring-0 p-0"
                autoFocus
              />
              <button
                type="submit"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
                aria-label="Submit command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>

            <div ref={terminalEndRef} />
          </div>

        </div>

      </div>
    </section>
  );
};
