import { DevOpsProject, ExperienceItem, SkillCategory, BlogPost, SecurityVulnerability, ClusterNode, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Vikash Sharma',
  role: 'DevOps Engineer',
  experienceYears: '2.5+',
  location: 'Udaipur, Rajasthan, India',
  phone: '+91 9102022206',
  email: 'vikashsha669@gmail.com',
  linkedin: 'https://linkedin.com/in/vikash-sharma-devops',
  linkedinHandle: 'in/vikash-sharma-devops',
  portfolioUrl: 'https://vikashportfolio.unaux.com',
  github: 'https://github.com/vikashsha669',
  summary: 'DevOps Engineer with over 2.5 years of experience working across cloud architecture, CI/CD automation, containerized environments, Kubernetes, GitOps, Infrastructure as Code, observability, networking, and cloud-native application deployment. Hands-on experience with AWS, Azure, Docker, Kubernetes, Helm, ArgoCD, Terraform, Ansible, Jenkins, GitHub Actions, Git, Grafana, Prometheus, AWS CloudWatch, Linux/Ubuntu, Nginx, Sophos Firewall, Python, and Bash, with additional exposure to AIOps, MLOps, and LLMOps workflows.',
  status: 'Open to High-Impact DevOps & Cloud Roles',
  metrics: [
    { label: 'System SLA Uptime', value: '99.99%', sub: 'Kubernetes Multi-Node Clusters' },
    { label: 'Staging Acceleration', value: '65%', sub: 'Reusable Terraform & Ansible' },
    { label: 'Mean Time to Detect', value: '< 3 mins', sub: 'AIOps Prometheus & Grafana' },
    { label: 'Release Frequency', value: '+50%', sub: 'GitHub Actions & Jenkins CI/CD' }
  ]
};

export const PROJECTS: DevOpsProject[] = [
  {
    id: 'fbsplai-cloud',
    title: 'AWS VPC Infrastructure & Production Cloud Deployment',
    subtitle: 'High Availability Multi-Tier Cloud Architecture with Custom VPC & Routing',
    category: 'Infrastructure & Cloud',
    liveUrl: 'https://fbsplai.com',
    domain: 'fbsplai.com',
    docUrl: '#fbsplai-docs',
    githubUrl: 'https://github.com/vikashsha669/aws-vpc-production-terraform',
    description: 'Designed and deployed a resilient, highly available production cloud architecture on AWS. Configured isolated Virtual Private Cloud (VPC) network architecture with custom public and private subnets, NAT gateways, internet gateways, route tables, security groups, and an Application Load Balancer (ALB) serving fbsplai.com.',
    fullArchitecture: 'The architecture features a multi-AZ AWS VPC setup with 2 Public Subnets housing Internet Gateways & ALB, and 2 Isolated Private Subnets housing EC2/EKS application instances routed through managed NAT Gateways. Sophos security policies and AWS WAF inspect incoming traffic before SSL termination at ACM.',
    highlights: [
      'Engineered an isolated VPC with public/private subnet segmentation across multi-AZ for high availability',
      'Configured custom route tables, Internet Gateways (IGW), and Elastic IP NAT Gateways',
      'Deployed production fbsplai.com as a publicly accessible, secure, and auto-scaling cloud application',
      'Implemented AWS CloudWatch alarms, automated health-checks, and Route 53 latency-based routing'
    ],
    tags: ['AWS', 'VPC', 'EC2', 'Route53', 'ALB', 'Terraform', 'CloudWatch', 'SSL/TLS'],
    metrics: [
      { label: 'Availability', value: '99.99%' },
      { label: 'Deployment Latency', value: '38ms' },
      { label: 'VPC Subnets', value: '4 (2 Pub / 2 Priv)' }
    ],
    architectureFlow: [
      { step: 1, title: 'Route 53 & DNS Resolution', detail: 'User query resolves fbsplai.com to AWS Application Load Balancer with ACM SSL', iconName: 'Globe' },
      { step: 2, title: 'VPC Ingress & WAF Filter', detail: 'Traffic passes through Internet Gateway and Security Group inspection rules', iconName: 'Shield' },
      { step: 3, title: 'ALB Multi-AZ Target Groups', detail: 'Round-robin traffic distribution across private subnet instances', iconName: 'Network' },
      { step: 4, title: 'CloudWatch Telemetry & Auto-Scaling', detail: 'Continuous metric ingestion for automated pod/instance scaling', iconName: 'Activity' }
    ],
    configSnippet: {
      language: 'hcl',
      filename: 'vpc-main.tf',
      code: `resource "aws_vpc" "fbsplai_prod" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "fbsplai-production-vpc"
    Environment = "Production"
    ManagedBy   = "Terraform"
  }
}

resource "aws_subnet" "public_1a" {
  vpc_id            = aws_vpc.fbsplai_prod.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-south-1a"
  map_public_ip_on_launch = true
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public_1a.id
}`
    }
  },
  {
    id: 'ims-cicd-nginx',
    title: 'CI/CD Pipeline, GitHub Branching, DNS & Nginx',
    subtitle: 'Automated Continuous Delivery Pipeline & Reverse Proxy Port Mapping',
    category: 'CI/CD & GitOps',
    liveUrl: 'https://ims.fbspl.com',
    domain: 'ims.fbspl.com',
    docUrl: '#ims-docs',
    githubUrl: 'https://github.com/vikashsha669/ims-github-actions-nginx',
    description: 'Constructed an end-to-end CI/CD workflow utilizing GitHub Actions paired with a structured Git branching strategy (main, staging, feature). Implemented local DNS server mappings and optimized Nginx reverse proxy configurations for high-performance upstream port mapping and SSL offloading.',
    fullArchitecture: 'Code push to GitHub triggers GitHub Actions workflow running linting, automated unit tests, and Docker container build. Upon merge to main, the runner establishes secure SSH deploy key communication to the host, reloads zero-downtime Nginx upstream pools, and updates local DNS resolver records.',
    highlights: [
      'Created automated multi-stage CI/CD pipeline using GitHub Actions with branch protection policies',
      'Configured local DNS resolution mapping and internal domain record routing',
      'Authored hardened Nginx reverse proxy configuration files with upstream load balancing and gzip compression',
      'Eliminated manual deployment downtime with rolling container replacement'
    ],
    tags: ['GitHub Actions', 'CI/CD', 'Nginx', 'DNS Mapping', 'Docker', 'Linux', 'Branching Strategy'],
    metrics: [
      { label: 'Deploy Time', value: '< 2.5 min' },
      { label: 'Failed Builds Catch', value: '100%' },
      { label: 'Reverse Proxy Latency', value: '1.2ms' }
    ],
    architectureFlow: [
      { step: 1, title: 'Developer Pull Request', detail: 'Branch policies enforce review, linting, and automated unit test suite', iconName: 'GitPullRequest' },
      { step: 2, title: 'GitHub Actions CI Runner', detail: 'Packages verified binaries into lightweight Docker images', iconName: 'Cpu' },
      { step: 3, title: 'DNS & Nginx Port Mapping', detail: 'Local DNS resolves ims.fbspl.com and Nginx proxies port 8080/3000', iconName: 'Server' },
      { step: 4, title: 'Zero-Downtime Reload', detail: 'Nginx reloads upstream targets gracefully with 0 dropped sockets', iconName: 'CheckCircle' }
    ],
    configSnippet: {
      language: 'nginx',
      filename: 'ims.fbspl.com.conf',
      code: `upstream ims_backend {
    server 127.0.0.1:8080 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 80;
    server_name ims.fbspl.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ims.fbspl.com;

    ssl_certificate /etc/letsencrypt/live/ims.fbspl.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ims.fbspl.com/privkey.pem;

    location / {
        proxy_pass http://ims_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
    }
  },
  {
    id: 'epic-ubuntu-hosting',
    title: 'Ubuntu Server Hosting & Automated CI/CD',
    subtitle: 'Bare-Metal / Virtualized Linux Server Hardening & Continuous Delivery',
    category: 'CI/CD & GitOps',
    liveUrl: 'https://epic.fbspl.com',
    domain: 'epic.fbspl.com',
    docUrl: '#epic-docs',
    githubUrl: 'https://github.com/vikashsha669/epic-ubuntu-server-cicd',
    description: 'Provisioned, configured, and hardened a production-ready Ubuntu Linux server to host epic.fbspl.com. Integrated automated CI/CD deployment pipelines using GitHub Actions, systemd service daemon supervision, automated log rotation, and UFW firewall security policies.',
    fullArchitecture: 'Ubuntu LTS instance configured with non-root sudo users, SSH key-only auth, Fail2ban intrusion prevention, and systemd daemons managed via automated GitHub Actions runner scripts. SSL certificates auto-renew via certbot timer.',
    highlights: [
      'Provisioned dedicated Ubuntu server environment with systemd service process lifecycle management',
      'Configured GitHub Actions CI/CD workflows for seamless pull-and-deploy release automation',
      'Implemented Linux server hardening: UFW firewall rules, SSH security, and fail2ban protection',
      'Set up logrotate and automated backup cronjobs to ensure data integrity'
    ],
    tags: ['Ubuntu', 'Linux', 'GitHub Actions', 'CI/CD', 'Bash Scripting', 'UFW', 'systemd'],
    metrics: [
      { label: 'Server Uptime', value: '99.98%' },
      { label: 'Security Rating', value: 'A+' },
      { label: 'Automated Deploy', value: '1-Click' }
    ],
    architectureFlow: [
      { step: 1, title: 'Ubuntu Server Provisioning', detail: 'Base OS installation, user permission segregation, and SSH hardening', iconName: 'Terminal' },
      { step: 2, title: 'Systemd & Daemon Config', detail: 'Process manager with automatic restart on failure and log rotation', iconName: 'Sliders' },
      { step: 3, title: 'GitHub Actions Deployment', detail: 'Continuous synchronization on git tag push with release verification', iconName: 'Zap' },
      { step: 4, title: 'Live Health Probes', detail: 'Periodic endpoint curl probes and alerting on latency spikes', iconName: 'Activity' }
    ],
    configSnippet: {
      language: 'yaml',
      filename: '.github/workflows/deploy.yml',
      code: `name: Deploy to Production Ubuntu Server
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4

    - name: Execute Remote Deploy via SSH
      uses: appleboy/ssh-action@v1.0.3
      with:
        host: \${{ secrets.HOST_IP }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /var/www/epic.fbspl.com
          git pull origin main
          npm ci --production
          npm run build
          sudo systemctl restart epic-service.service
          sudo systemctl status epic-service.service --no-pager`
    }
  },
  {
    id: 'k8s-mlops-platform',
    title: 'Microservices & MLOps Platform: Multi-Tenant Kubernetes & GitOps',
    subtitle: 'ArgoCD Synchronized Multi-Node Cluster with Namespace Isolation & LLM Inference Serving',
    category: 'Container & MLOps',
    docUrl: '#k8s-docs',
    githubUrl: 'https://github.com/vikashsha669/k8s-gitops-mlops-platform',
    description: 'Headed the delivery of an isolated testing and production platform for engineering teams. Implemented a multi-node Kubernetes cluster orchestrated with ArgoCD GitOps, namespace resource quotas, and automated CI/CD pipelines capable of packaging and serving containerized ML/LLM model endpoints alongside standard microservices.',
    fullArchitecture: 'Multi-node Kubernetes cluster utilizing Helm Charts for templated deployments. ArgoCD continuously reconciles cluster state against Git manifests to achieve 0 drift. MLOps inference pods are scheduled on dedicated node pools with Horizontal Pod Autoscaler (HPA) responding to inference queue depths.',
    highlights: [
      'Built multi-node Kubernetes cluster with ArgoCD GitOps continuous deployment & automated drift correction',
      'Configured namespace isolation, NetworkPolicies, and ResourceQuotas for multi-tenant developer isolation',
      'Containerized ML/LLM model inference endpoints with optimized GPU/CPU resource requests and limits',
      'Integrated Prometheus ServiceMonitors for inference latency, token throughput, and pod memory tracking'
    ],
    tags: ['Kubernetes', 'ArgoCD', 'GitOps', 'Helm', 'Docker', 'MLOps', 'LLMOps', 'Prometheus', 'HPA'],
    metrics: [
      { label: 'Cluster Nodes', value: '6 Nodes' },
      { label: 'Drift Sync', value: 'Real-Time' },
      { label: 'Inference SLA', value: '99.99%' }
    ],
    architectureFlow: [
      { step: 1, title: 'GitOps Manifest Commit', detail: 'Application Helm values updated in Git configuration repository', iconName: 'GitCommit' },
      { step: 2, title: 'ArgoCD Automated Sync', detail: 'Reconciles desired state in Git with live Kubernetes cluster API', iconName: 'RefreshCw' },
      { step: 3, title: 'Multi-Tenant Scheduling', detail: 'Pods scheduled across worker nodes with resource limits & quotas', iconName: 'Layers' },
      { step: 4, title: 'HPA & Telemetry Tracking', detail: 'Dynamic scaling based on CPU, memory, and custom MLOps queue metrics', iconName: 'TrendingUp' }
    ],
    configSnippet: {
      language: 'yaml',
      filename: 'argocd-application.yaml',
      code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mlops-inference-service
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/vikashsha669/k8s-manifests.git'
    targetRevision: HEAD
    path: helm/mlops-service
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: mlops-prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`
    }
  },
  {
    id: 'monolith-aiops-audit',
    title: 'Monolith Modernization & AIOps Security Audit',
    subtitle: 'Cloud-Native Migration Blueprint with SAST Security Gates & Anomaly Triage',
    category: 'Security & AIOps',
    docUrl: '#aiops-docs',
    githubUrl: 'https://github.com/vikashsha669/monolith-to-cloud-native-aiops',
    description: 'Designed the migration blueprint of a legacy monolithic enterprise system to a decoupled, cloud-native microservices architecture. Integrated SAST (Static Application Security Testing) and container vulnerability scanning gates into Jenkins/GitHub Actions and enabled AIOps anomaly alert models to catch build regressions and runtime performance spikes.',
    fullArchitecture: 'Legacy database and application services split into containerized microservices managed with Helm. Jenkins and GitHub Actions enforce Trivy/SonarQube security gates prior to artifact registries. Grafana machine learning anomaly detection triggers PagerDuty / Slack alerts when error rates deviate from historical baseline.',
    highlights: [
      'Architected end-to-end migration strategy from monolith to containerized Docker & Helm microservices',
      'Integrated SAST security gates into Jenkins and GitHub Actions CI pipelines to block critical CVEs',
      'Implemented AIOps anomaly detection rules in Grafana and Prometheus reducing false-positive alerts by 40%',
      'Configured Sophos firewall inspection and TLS 1.3 encryption across all internal microservice communication'
    ],
    tags: ['AIOps', 'SAST', 'Trivy', 'Jenkins', 'Grafana', 'Prometheus', 'Sophos Firewall', 'Microservices'],
    metrics: [
      { label: 'MTTD Reduction', value: '< 3 Mins' },
      { label: 'Security Gates', value: '100% Automated' },
      { label: 'System Decoupling', value: '4 Microservices' }
    ],
    architectureFlow: [
      { step: 1, title: 'Code SAST & CVE Inspection', detail: 'Trivy & SonarQube scan dependencies and Dockerfile base images', iconName: 'ShieldAlert' },
      { step: 2, title: 'Microservice Build & Test', detail: 'Parallel CI pipelines build and test decoupled microservice artifacts', iconName: 'Box' },
      { step: 3, title: 'Sophos Gateway Firewall', detail: 'Zero-Trust network policies restrict inter-service communication', iconName: 'Lock' },
      { step: 4, title: 'AIOps Anomaly Triage', detail: 'Prometheus & Grafana ML algorithms detect latency spikes proactively', iconName: 'Cpu' }
    ],
    configSnippet: {
      language: 'yaml',
      filename: 'prometheus-aiops-rules.yaml',
      code: `groups:
- name: aiops_anomaly_alerts
  rules:
  - alert: HighRequestLatencyAnomaly
    expr: rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m]) > 0.5
    for: 2m
    labels:
      severity: critical
      tier: aiops-remediation
    annotations:
      summary: "Dynamic anomaly detected on service {{ $labels.service }}"
      description: "Service latency {{ $value }}s deviates significantly from 24h baseline."`
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Cloud & Infrastructure',
    icon: 'Cloud',
    color: 'emerald',
    description: 'Architecting resilient, fault-tolerant public cloud networks and server infrastructure.',
    skills: [
      { name: 'AWS (Amazon Web Services)', level: 92, experience: '2.5+ yrs', badge: 'Production VPC / EC2 / ALB / Route53', category: 'Cloud' },
      { name: 'Azure Cloud Services', level: 84, experience: '2+ yrs', badge: 'VMs & Cloud Storage', category: 'Cloud' },
      { name: 'AWS VPC Architecture', level: 95, experience: '2.5+ yrs', badge: 'Multi-AZ Subnets & NAT', category: 'Cloud' },
      { name: 'AWS CloudWatch', level: 90, experience: '2.5+ yrs', badge: 'Metrics & Metric Alarms', category: 'Cloud' }
    ]
  },
  {
    category: 'CI/CD & GitOps Automation',
    icon: 'GitBranch',
    color: 'cyan',
    description: 'Eliminating manual toil with automated pipeline verification, build routines, and drift reconciliation.',
    skills: [
      { name: 'GitHub Actions', level: 96, experience: '2.5+ yrs', badge: 'Workflows & Custom Runners', category: 'CI/CD' },
      { name: 'Jenkins CI', level: 88, experience: '2+ yrs', badge: 'Declarative Pipelines & SAST', category: 'CI/CD' },
      { name: 'ArgoCD GitOps', level: 92, experience: '2+ yrs', badge: 'Automated Sync & Drift Correction', category: 'GitOps' },
      { name: 'Git & Branching Strategies', level: 98, experience: '3+ yrs', badge: 'Gitflow & Trunk-based', category: 'Version Control' }
    ]
  },
  {
    category: 'Containers & Orchestration',
    icon: 'Box',
    color: 'blue',
    description: 'Packaging microservices and managing multi-tenant Kubernetes workloads at scale.',
    skills: [
      { name: 'Docker', level: 95, experience: '2.5+ yrs', badge: 'Multi-Stage Builds & Hardening', category: 'Containers' },
      { name: 'Kubernetes (K8s)', level: 92, experience: '2+ yrs', badge: 'Cluster Management & Ingress', category: 'Orchestration' },
      { name: 'Helm Charts', level: 90, experience: '2+ yrs', badge: 'Package Management & Templating', category: 'Orchestration' },
      { name: 'Containerized Deployments', level: 94, experience: '2.5+ yrs', badge: 'Resource Quotas & HPA', category: 'Containers' }
    ]
  },
  {
    category: 'Infrastructure as Code (IaC)',
    icon: 'Code2',
    color: 'amber',
    description: 'Managing immutable, declarative cloud topology with reusable modules and playbooks.',
    skills: [
      { name: 'Terraform', level: 92, experience: '2+ yrs', badge: 'Reusable Modules & State Locking', category: 'IaC' },
      { name: 'Ansible Playbooks', level: 88, experience: '2+ yrs', badge: 'Config Management & Hardening', category: 'IaC' },
      { name: 'Infrastructure Automation', level: 92, experience: '2.5+ yrs', badge: '65% Staging Acceleration', category: 'IaC' }
    ]
  },
  {
    category: 'Observability & AIOps / MLOps',
    icon: 'Activity',
    color: 'purple',
    description: 'Real-time telemetry, automated triage, and machine learning model serving pipelines.',
    skills: [
      { name: 'Grafana & Dashboards', level: 94, experience: '2.5+ yrs', badge: 'Real-time Telemetry & Panels', category: 'Observability' },
      { name: 'Prometheus Monitoring', level: 92, experience: '2.5+ yrs', badge: 'PromQL & Alertmanager', category: 'Observability' },
      { name: 'AIOps Anomaly Detection', level: 86, experience: '1.5+ yrs', badge: 'MTTD < 3 min Alerting', category: 'AIOps' },
      { name: 'MLOps & LLMOps Pipelines', level: 85, experience: '1.5+ yrs', badge: 'Inference Serving & Versioning', category: 'MLOps' }
    ]
  },
  {
    category: 'Networking, Linux & Security',
    icon: 'ShieldCheck',
    color: 'emerald',
    description: 'Hardened OS administration, secure routing gateways, and reverse proxy traffic control.',
    skills: [
      { name: 'Ubuntu & Enterprise Linux', level: 96, experience: '3+ yrs', badge: 'OS Tuning & Systemd', category: 'Linux' },
      { name: 'Nginx Reverse Proxy', level: 94, experience: '2.5+ yrs', badge: 'Port Mapping & SSL Offload', category: 'Networking' },
      { name: 'DNS & TCP/IP Routing', level: 92, experience: '2.5+ yrs', badge: 'Local DNS & Port Forwarding', category: 'Networking' },
      { name: 'Sophos Firewall & VPN Tunnels', level: 88, experience: '2+ yrs', badge: 'Gateway Security & Policies', category: 'Security' },
      { name: 'Windows Server 2022 & VMware', level: 84, experience: '2+ yrs', badge: 'Virtualization & Domain Policies', category: 'Systems' },
      { name: 'Python & Bash Scripting', level: 90, experience: '3+ yrs', badge: 'Automation Scripts & CLI Tools', category: 'Scripting' }
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'DevOps Engineer',
    company: 'Fusion Business Solutions Pvt. Ltd.',
    location: 'Udaipur, Rajasthan, India',
    period: 'July 2023 – Present',
    isCurrent: true,
    summary: 'Driving cloud infrastructure automation, Kubernetes orchestration, GitOps delivery, security hardening, and AIOps observability suites across production enterprise workloads.',
    achievements: [
      {
        title: 'AIOps & Incident Remediation',
        description: 'Assisted in configuring AIOps-driven alerting rules and anomaly detection patterns within Grafana and Prometheus to proactively identify performance bottlenecks and automate initial triage steps.',
        metric: 'MTTD < 3 mins',
        tags: ['Grafana', 'Prometheus', 'AIOps', 'Alertmanager']
      },
      {
        title: 'MLOps and LLMOps CI/CD Workflows',
        description: 'Supported automated CI/CD workflows for machine learning models and LLM services, including versioning, containerized deployments, and continuous monitoring of inference endpoints.',
        metric: 'Zero-downtime ML Deployments',
        tags: ['MLOps', 'LLMOps', 'Docker', 'Inference Monitoring']
      },
      {
        title: 'Microservices Migration & 99.99% Availability',
        description: 'Migrated legacy monolithic applications into decoupled microservices, containerized environments with Docker, and structured deployment patterns using Helm charts within Kubernetes clusters, achieving 99.99% system availability.',
        metric: '99.99% SLA Uptime',
        tags: ['Kubernetes', 'Helm', 'Docker', 'Microservices']
      },
      {
        title: 'GitOps Continuous Delivery with ArgoCD',
        description: 'Designed and deployed a continuous delivery model integrating ArgoCD with GitHub repositories for automated environment synchronization, rapid rollbacks, and drift correction across multiple cluster deployments.',
        metric: 'Automated Drift Correction',
        tags: ['ArgoCD', 'GitOps', 'GitHub', 'Rollbacks']
      },
      {
        title: 'Infrastructure as Code Automation',
        description: 'Built reusable Terraform modules and configuration-focused Ansible playbooks across AWS and Azure environments, accelerating staging timelines by 65%.',
        metric: '65% Faster Staging',
        tags: ['Terraform', 'Ansible', 'AWS', 'Azure']
      },
      {
        title: 'CI/CD Pipeline Optimization',
        description: 'Engineered CI pipelines using GitHub Actions and Jenkins for automated build, test, and package verification routines, boosting release frequency by 50%.',
        metric: '+50% Release Frequency',
        tags: ['GitHub Actions', 'Jenkins', 'Automated Testing']
      },
      {
        title: 'Network Security & Cluster Telemetry',
        description: 'Architected gateway security using Sophos Firewalls and Windows Server 2022 policies and built real-time cluster telemetry suites that reduced Mean Time to Detection (MTTD) to under 3 minutes.',
        metric: 'MTTD Under 3 Mins',
        tags: ['Sophos Firewall', 'Windows Server 2022', 'VPN Tunnels', 'Security']
      }
    ],
    techStack: [
      'AWS', 'Azure', 'Kubernetes', 'Docker', 'Helm', 'ArgoCD', 'Terraform', 'Ansible',
      'GitHub Actions', 'Jenkins', 'Grafana', 'Prometheus', 'Nginx', 'Sophos Firewall', 'Python', 'Bash'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Janardan Rai Nagar Rajasthan Vidyapeeth University (JRNRVU)',
    location: 'Udaipur, Rajasthan, India',
    period: '2024 – 2026',
    details: 'Advanced computing systems, distributed cloud computing, enterprise network architecture, and software engineering methodologies.'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Janardan Rai Nagar Rajasthan Vidyapeeth University (JRNRVU)',
    location: 'Udaipur, Rajasthan, India',
    period: '2021 – 2024',
    details: 'Core computer science fundamentals, data structures, operating systems, Linux administration, and network programming.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'gitops-argocd-guide',
    slug: 'gitops-argocd-zero-downtime',
    title: 'Zero-Downtime Multi-Cluster Delivery with ArgoCD & GitOps',
    summary: 'How to structure Git repositories as single sources of truth, enable automated drift detection, and execute instant self-healing rollbacks in production Kubernetes.',
    date: 'Aug 2026',
    readTime: '6 min read',
    category: 'GitOps & Kubernetes',
    tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'Helm'],
    author: {
      name: 'Vikash Sharma',
      role: 'DevOps Engineer',
      avatar: 'VS'
    },
    content: `## Why GitOps Revolutionizes Kubernetes Deployments

In traditional deployment pipelines, CI systems hold direct cluster credentials (like \`kubeconfig\`) and push updates imperatively using \`kubectl apply\`. This approach causes configuration drift when developers make manual changes directly in clusters.

\`\`\`
[Git Repository] ---> (ArgoCD Agent Reconciler) ---> [Kubernetes Cluster]
        ^                                                    |
        |---------------- Auto Drift Correction -------------|
\`\`\`

### 1. The Declarative Advantage
With ArgoCD:
1. **Git is the Single Source of Truth**: All manifests (Helm charts, Kustomize overlays) live in version control.
2. **Pull-based vs. Push-based**: The ArgoCD controller resides inside the cluster, polling Git periodically or receiving webhooks.
3. **Automated Self-Healing**: If someone modifies a pod or service imperatively, ArgoCD detects the discrepancy within seconds and automatically re-applies the Git state.

### 2. Implementing Application CRD
Here is our standard production Application manifest:

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-microservice
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/vikashsha669/k8s-manifests.git'
    targetRevision: HEAD
    path: environments/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

### 3. Key Takeaway
By shifting from imperative scripts to declarative GitOps synchronization, our engineering teams achieved instant zero-downtime rollouts and rapid rollbacks across multi-node clusters.`
  },
  {
    id: 'aws-vpc-production-architecture',
    slug: 'aws-vpc-production-best-practices',
    title: 'Architecting an Isolated Multi-AZ AWS VPC from Scratch',
    summary: 'A comprehensive engineering guide on designing multi-tier Virtual Private Clouds with public/private subnets, NAT gateways, and secure route tables.',
    date: 'July 2026',
    readTime: '8 min read',
    category: 'Cloud Infrastructure',
    tags: ['AWS', 'VPC', 'Terraform', 'Networking', 'Security'],
    author: {
      name: 'Vikash Sharma',
      role: 'DevOps Engineer',
      avatar: 'VS'
    },
    content: `## Designing Resilient AWS VPC Architecture

When setting up production infrastructure (such as for **fbsplai.com**), network isolation is the first and most critical defense layer.

### 1. Subnet Segmentation Strategy
A secure multi-AZ VPC divides workloads into two distinct tiers:
- **Public Subnets (e.g. 10.0.1.0/24 & 10.0.2.0/24)**: Directly attached to an Internet Gateway (IGW). Houses only the Application Load Balancer and NAT Gateways.
- **Private Subnets (e.g. 10.0.10.0/24 & 10.0.20.0/24)**: Outbound internet traffic is routed exclusively through the NAT Gateway. No direct public IP addresses are assigned.

\`\`\`
[Internet]
    | (HTTPS)
[Internet Gateway]
    |
[Public Subnet: ALB + NAT Gateway]
    | (Internal Private Routing)
[Private Subnet: EC2 / EKS Workloads]
    | (Encrypted Database Protocol)
[Database Subnet: RDS Multi-AZ]
\`\`\`

### 2. Terraform Code Structure
We enforce infrastructure consistency with reusable Terraform modules:

\`\`\`hcl
module "production_vpc" {
  source = "./modules/vpc"

  vpc_cidr             = "10.0.0.0/16"
  availability_zones   = ["ap-south-1a", "ap-south-1b"]
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
  enable_nat_gateway   = true
  single_nat_gateway   = false # HA across both AZs
}
\`\`\`

### 3. Production Hardening
- Deny all unneeded ingress ports at the Security Group level.
- Enable AWS VPC Flow Logs delivered to CloudWatch for network security audit.
- Enforce TLS 1.3 on all ALB listeners.`
  },
  {
    id: 'aiops-prometheus-grafana-mttd',
    slug: 'aiops-anomaly-detection-prometheus-grafana',
    title: 'Reducing MTTD to Under 3 Minutes with AIOps Telemetry',
    summary: 'Configuring dynamic Prometheus alerting rules, Prometheus PromQL rate anomaly calculations, and Grafana ML triage to catch regressions before end-users notice.',
    date: 'June 2026',
    readTime: '7 min read',
    category: 'Observability & AIOps',
    tags: ['AIOps', 'Prometheus', 'Grafana', 'Observability', 'MTTD'],
    author: {
      name: 'Vikash Sharma',
      role: 'DevOps Engineer',
      avatar: 'VS'
    },
    content: `## Overcoming Static Alert Thresholds with AIOps

Traditional monitoring fails because static thresholds (e.g., "Alert if CPU > 80%") create alert fatigue during peak business hours and miss subtle microservice regressions at 3 AM.

### 1. What is MTTD and Why Does It Matter?
**Mean Time to Detection (MTTD)** measures how quickly an engineering team identifies that a service degradation is underway. By automating baseline profiling, we dropped MTTD to under 3 minutes.

### 2. PromQL Anomaly Queries
Using statistical standard deviation (\`stddev_over_time\`) and rate baselines:

\`\`\`promql
# Alert when current 5m request error rate exceeds 3x the standard deviation of the last 4 hours
(
  rate(http_requests_total{status=~"5.."}[5m])
  -
  avg_over_time(rate(http_requests_total{status=~"5.."}[5m])[4h:5m])
)
>
3 * stddev_over_time(rate(http_requests_total{status=~"5.."}[5m])[4h:5m])
\`\`\`

### 3. Automated Triage Integration
When an anomaly fires:
1. Alertmanager routes the telemetry payload to a triage webhook.
2. The AIOps agent pulls the recent container log stack trace, recent git commit SHAs, and active deployment status.
3. Slack and PagerDuty notifications include the exact offending pod, root error code, and recommended rollback action.`
  },
  {
    id: 'mlops-containerizing-llm-endpoints',
    slug: 'mlops-containerizing-llms-production',
    title: 'Serving Containerized LLM Inference Endpoints on Kubernetes',
    summary: 'Best practices for Docker multi-stage builds, model artifact caching, GPU/CPU resource management, and autoscaling inference pods under variable query loads.',
    date: 'May 2026',
    readTime: '5 min read',
    category: 'MLOps & LLMOps',
    tags: ['MLOps', 'LLMOps', 'Docker', 'Kubernetes', 'Python'],
    author: {
      name: 'Vikash Sharma',
      role: 'DevOps Engineer',
      avatar: 'VS'
    },
    content: `## Containerizing and Scaling LLMs in Production

Serving machine learning and Large Language Model inference endpoints introduces unique challenges compared to standard CRUD microservices: large model weights (5GB-40GB), high GPU/CPU memory consumption, and non-linear request latency.

### 1. Optimized Dockerfile Construction
We use multi-stage builds and pre-bake runtime dependencies to keep images lean:

\`\`\`dockerfile
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY src/ /app/src/
ENV MODEL_CACHE_DIR=/models
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
\`\`\`

### 2. Kubernetes Resource Isolation & HPA
Inference pods must specify strict memory limits to prevent out-of-memory (\`OOMKilled\`) node panics:

\`\`\`yaml
resources:
  requests:
    cpu: "2000m"
    memory: "4Gi"
  limits:
    cpu: "4000m"
    memory: "8Gi"
\`\`\`

### 3. Horizontal Pod Autoscaling (HPA)
We autoscale on custom metrics (concurrent active inference requests) rather than raw CPU, preventing queue pileups.`
  }
];

export const SECURITY_VULNERABILITIES: SecurityVulnerability[] = [
  {
    id: 'vuln-1',
    cve: 'CVE-2026-2841',
    package: 'libssl3 / openssl',
    installedVersion: '3.0.8-1ubuntu1',
    fixedVersion: '3.0.8-1ubuntu2.4',
    severity: 'HIGH',
    title: 'Buffer Overrun in ASN.1 Certificate Validation',
    description: 'A flaw in OpenSSL certificate parsing allows remote attackers to trigger denial of service or arbitrary code execution during TLS handshake.',
    impact: 'Ingress Nginx Controller & API Gateways',
    isPatched: false,
    patchAction: 'apt-get update && apt-get install --only-upgrade libssl3 -y'
  },
  {
    id: 'vuln-2',
    cve: 'CVE-2025-4190',
    package: 'golang.org/x/crypto',
    installedVersion: 'v0.18.0',
    fixedVersion: 'v0.24.0',
    severity: 'CRITICAL',
    title: 'ECDSA Signature Verification Bypass',
    description: 'Improper validation of malleated curve points permits verification bypass in microservice auth token middleware.',
    impact: 'ArgoCD Reconciler & Auth Proxy',
    isPatched: false,
    patchAction: 'go get golang.org/x/crypto@v0.24.0 && go mod tidy'
  },
  {
    id: 'vuln-3',
    cve: 'CVE-2025-1082',
    package: 'nginx-ingress-controller',
    installedVersion: 'v1.8.1',
    fixedVersion: 'v1.9.5',
    severity: 'MEDIUM',
    title: 'HTTP/2 Rapid Reset Stream Flood Mitigation',
    description: 'Resource exhaustion vulnerability when high volumes of RST_STREAM frames are received on TLS keep-alive connections.',
    impact: 'Edge Routing & Reverse Proxy Tier',
    isPatched: true,
    patchAction: 'helm upgrade ingress-nginx ingress-nginx/ingress-nginx --version 4.9.1'
  },
  {
    id: 'vuln-4',
    cve: 'CVE-2025-7829',
    package: 'containerd.io',
    installedVersion: '1.6.18',
    fixedVersion: '1.6.28',
    severity: 'HIGH',
    title: 'Container Escape via Shared Namespace Socket',
    description: 'Improper permission checking in host mount socket permits unprivileged container user to escalate host permissions.',
    impact: 'Worker Node Daemon & Container Runtime',
    isPatched: false,
    patchAction: 'apt-get install --only-upgrade containerd.io -y && systemctl restart containerd'
  }
];

export const INITIAL_CLUSTER_NODES: ClusterNode[] = [
  {
    id: 'node-control-plane',
    name: 'k8s-control-plane-01',
    type: 'master',
    zone: 'ap-south-1a',
    status: 'Ready',
    cpuPercent: 34,
    memoryPercent: 52,
    coordinates: [0, 1.2, 0],
    pods: [
      { name: 'kube-apiserver-01', namespace: 'kube-system', status: 'Running', restarts: 0, image: 'registry.k8s.io/kube-apiserver:v1.29' },
      { name: 'etcd-cluster-01', namespace: 'kube-system', status: 'Running', restarts: 0, image: 'registry.k8s.io/etcd:3.5.10' },
      { name: 'argocd-server', namespace: 'argocd', status: 'Running', restarts: 0, image: 'quay.io/argoproj/argocd:v2.10' }
    ]
  },
  {
    id: 'node-worker-01',
    name: 'k8s-worker-prod-01',
    type: 'worker',
    zone: 'ap-south-1a',
    status: 'Ready',
    cpuPercent: 58,
    memoryPercent: 68,
    coordinates: [-2.5, -0.4, 1.2],
    pods: [
      { name: 'fbsplai-web-deploy-74b8-f1', namespace: 'production', status: 'Running', restarts: 0, image: 'fbsplai/web:v2.4.1' },
      { name: 'fbsplai-web-deploy-74b8-g9', namespace: 'production', status: 'Running', restarts: 0, image: 'fbsplai/web:v2.4.1' },
      { name: 'ims-backend-api-5c9-2j', namespace: 'ims-prod', status: 'Running', restarts: 0, image: 'fbspl/ims:v1.9.0' }
    ]
  },
  {
    id: 'node-worker-02',
    name: 'k8s-worker-prod-02',
    type: 'worker',
    zone: 'ap-south-1b',
    status: 'Ready',
    cpuPercent: 62,
    memoryPercent: 74,
    coordinates: [2.5, -0.4, 1.2],
    pods: [
      { name: 'epic-service-app-8a2-k4', namespace: 'epic-prod', status: 'Running', restarts: 0, image: 'fbspl/epic:v1.3.2' },
      { name: 'prometheus-k8s-0', namespace: 'monitoring', status: 'Running', restarts: 0, image: 'prom/prometheus:v2.50' },
      { name: 'grafana-core-6d4-8x', namespace: 'monitoring', status: 'Running', restarts: 0, image: 'grafana/grafana:10.3' }
    ]
  },
  {
    id: 'node-ingress-01',
    name: 'k8s-ingress-gateway-01',
    type: 'ingress',
    zone: 'ap-south-1a',
    status: 'Ready',
    cpuPercent: 41,
    memoryPercent: 46,
    coordinates: [0, -1.8, 2.2],
    pods: [
      { name: 'nginx-ingress-controller-4f7', namespace: 'ingress-nginx', status: 'Running', restarts: 0, image: 'k8s.gcr.io/ingress-nginx:v1.9' },
      { name: 'cert-manager-webhook-59d', namespace: 'cert-manager', status: 'Running', restarts: 0, image: 'quay.io/jetstack/cert-manager:v1.14' }
    ]
  },
  {
    id: 'node-ml-01',
    name: 'k8s-mlops-worker-gpu-01',
    type: 'ml-node',
    zone: 'ap-south-1b',
    status: 'Ready',
    cpuPercent: 72,
    memoryPercent: 82,
    coordinates: [0, 0, -2.5],
    pods: [
      { name: 'llm-inference-serving-model-01', namespace: 'mlops-prod', status: 'Running', restarts: 0, image: 'fbspl/llm-serving:v1.0' },
      { name: 'aiops-anomaly-agent-3a', namespace: 'monitoring', status: 'Running', restarts: 0, image: 'aiops/agent:v2.1' }
    ]
  }
];
