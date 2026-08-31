export interface DevOpsProject {
  id: string;
  title: string;
  subtitle: string;
  category: 'Infrastructure & Cloud' | 'CI/CD & GitOps' | 'Container & MLOps' | 'Security & AIOps';
  liveUrl?: string;
  docUrl?: string;
  githubUrl?: string;
  domain?: string;
  description: string;
  fullArchitecture: string;
  highlights: string[];
  tags: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureFlow: {
    step: number;
    title: string;
    detail: string;
    iconName: string;
  }[];
  configSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  achievements: {
    title: string;
    description: string;
    metric?: string;
    tags: string[];
  }[];
  techStack: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  experience: string;
  badge?: string;
  category: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  description: string;
  skills: SkillItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
}

export interface SecurityVulnerability {
  id: string;
  cve: string;
  package: string;
  installedVersion: string;
  fixedVersion: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  impact: string;
  isPatched: boolean;
  patchAction: string;
}

export interface ClusterNode {
  id: string;
  name: string;
  type: 'master' | 'worker' | 'ingress' | 'ml-node';
  zone: string;
  status: 'Ready' | 'Busy' | 'Syncing';
  cpuPercent: number;
  memoryPercent: number;
  pods: {
    name: string;
    namespace: string;
    status: 'Running' | 'Pending' | 'Terminating';
    restarts: number;
    image: string;
  }[];
  coordinates: [number, number, number];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
}
