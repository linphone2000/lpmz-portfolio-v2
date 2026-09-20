import { DATA } from '@/lib/data';
import { featuresCatalog } from '@/lib/features';
import { pricingData } from '@/lib/pricing';

export const fallbackServicesContent = {
  hero: {
    badge: 'Services & Solutions',
    title: 'Build your web or mobile product with confidence',
    description:
      'One partner for strategy, design, and development. I craft scalable web platforms and cross-platform mobile apps tailored to your business needs.',
  },
  web: {
    title: 'Web Development',
    description:
      'React and Next.js for fast, SEO-friendly experiences. From high-conversion marketing sites to complex data-rich dashboards.',
    bullets: [
      'Business websites & landing pages',
      'E-commerce platforms',
      'Admin dashboards & internal tools',
      'Custom web applications',
    ],
  },
  mobile: {
    title: 'Mobile App Development',
    description:
      'React Native apps for iOS and Android with one codebase. Production-ready performance, native gestures, and premium UX.',
    bullets: [
      'E-commerce and booking flows',
      'Business & productivity apps',
      'Push notifications, maps, payments',
      'MVPs to validate quickly',
    ],
  },
  process: {
    badge: 'How I work',
    title: 'A clear process you can trust',
    description:
      'Systematic delivery from first call to launch—clear scope, regular updates, and code structured for handoff.',
    steps: [
      {
        title: 'Discover',
        body: 'We clarify goals, users, and constraints so the build matches your business—not a generic template.',
      },
      {
        title: 'Plan',
        body: 'You get a scoped roadmap with milestones, priorities, and what “done” looks like before development starts.',
      },
      {
        title: 'Build',
        body: 'Iterative development with progress check-ins, quality checks, and room to adjust as we learn.',
      },
      {
        title: 'Launch & support',
        body: 'Ship with handover docs, deployment guidance, and a clean path for follow-up fixes or next features.',
      },
    ],
  },
  outcomes: {
    badge: 'Outcomes',
    title: 'What we can achieve together',
    description:
      'Pick the outcome that fits where you are. Every engagement focuses on results you can measure and ship.',
    items: [
      {
        id: 'launch',
        title: 'Launch',
        desc: 'Get a marketing site or MVP live quickly so you can start learning from real users.',
        bullets: [
          'Single-page or focused MVP experience',
          'Responsive layout and solid performance',
          'Lead capture or core user flow',
          'Fast path from idea to live URL',
        ],
        ctaLabel: 'Start a launch project',
        highlight: false,
      },
      {
        id: 'grow',
        title: 'Grow',
        desc: 'Build a multi-page presence with content tools and SEO so your brand can scale organically.',
        bullets: [
          'Custom multi-page website',
          'CMS for easy content updates',
          'SEO foundations and analytics',
          'Blog or news when you need it',
        ],
        ctaLabel: 'Start a growth project',
        highlight: true,
      },
      {
        id: 'scale',
        title: 'Scale',
        desc: 'Ship a product platform—auth, APIs, admin—ready for real users and ongoing iteration.',
        bullets: [
          'Secure authentication and roles',
          'Database design and API layer',
          'Admin dashboard and integrations',
          'Architecture built for the next phase',
        ],
        ctaLabel: 'Start a scale project',
        highlight: false,
      },
    ],
  },
};

export type PortfolioCMSData = {
  about: typeof DATA;
  experience: typeof DATA.experience;
  projects: typeof DATA.projects;
  clientWork: typeof DATA.clientWork;
  skills: typeof DATA.skills;
  education: typeof DATA.education;
  certs: typeof DATA.certs;
  achievements: typeof DATA.achievements;
  services: typeof fallbackServicesContent;
  pricing: typeof pricingData;
  estimateFeatures: typeof featuresCatalog;
};

export const fallbackPortfolioContent: PortfolioCMSData = {
  about: DATA,
  experience: DATA.experience,
  projects: DATA.projects,
  clientWork: DATA.clientWork,
  skills: DATA.skills,
  education: DATA.education,
  certs: DATA.certs,
  achievements: DATA.achievements,
  services: fallbackServicesContent,
  pricing: pricingData,
  estimateFeatures: featuresCatalog,
};
