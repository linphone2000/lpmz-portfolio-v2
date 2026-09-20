// Tab types
export type TabId = 'home' | 'services' | 'portfolio' | 'about';

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
  /** Short highlights for the modal (keep to ~3–4; UI caps display at 4). */
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
    screenshot?:
      | string
      | Array<{
          id: number;
          src: string;
          title: string;
          description: string;
          presentation?: 'mobile' | 'web';
        }>;
    screenshots?: Array<{
      id: number;
      src: string;
      title: string;
      description: string;
      /** When set, gallery uses phone frame (mobile) or flat web layout (web). */
      presentation?: 'mobile' | 'web';
    }>;
    /** Modal gallery: max columns at large breakpoints (default: 4 if all mobile shots, else 3). */
    galleryLgColumns?: 3 | 4;
  };
}

export type ProjectPreviewScreenshot = NonNullable<
  NonNullable<Project['preview']>['screenshots']
>[number];

// Client work types
export interface ClientWorkDeliverable {
  title: string;
  description: string;
  platform: 'mobile' | 'web' | 'backend';
  screenshotSrc?: string;
  screenshotPresentation?: 'mobile' | 'web';
}

export interface ClientWorkEntry {
  id: string;
  clientName: string;
  engagement: string;
  summary: string;
  status: 'Completed' | 'In Development' | 'Ongoing';
  technologies: string[];
  liveUrl?: string;
  featuredScreenshot?: {
    src: string;
    presentation: 'mobile' | 'web';
    /** Mobile collage: [left, center, right] — center image displays slightly larger */
    screenshots?: [string, string, string];
  };
  deliverables?: ClientWorkDeliverable[];
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
