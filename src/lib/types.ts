// Tab types
export type TabId = 'overview' | 'portfolio' | 'education';

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

// Project types
export interface Project {
  name: string;
  stack: string[];
  blurb: string;
  href?: string;
  highlight?: boolean;
  category: string;
  year: number;
  status: string;
  features: string[];
  demoAccount?: {
    email: string;
    password: string;
  };
  liveUrl?: string;
  startupNote?: string;
  preview?: {
    portfolioValue?: string;
    dailyGain?: string;
    platform?: string;
    buysell?: string;
    featurePills?: string[];
    screenshot?: string;
    screenshots?: Array<{
      id: number;
      src: string;
      title: string;
      description: string;
    }>;
  };
}

// Experience types
export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

// Education types
export interface Education {
  school: string;
  credential: string;
  period: string;
}

// Skills types
export interface Skills {
  frontend: string[];
  backend: string[];
  databases: string[];
  languages: string[];
  tools: string[];
  aiml: string[];
  soft: string[];
}

// Data structure
export interface PortfolioData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  links: {
    portfolio: string;
    linkedin: string;
  };
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  education: Education[];
  certs: string[];
}
