import { DATA } from '@/lib/data';
import { featuresCatalog } from '@/lib/features';
import { pricingData } from '@/lib/pricing';

export const fallbackServicesContent = {
  hero: {
    badge: 'Services',
    title: 'Build for web and mobile.',
    description:
      'I build React Native apps and Next.js web products, along with the APIs, databases, and deployments that keep them running.',
  },
  web: {
    title: 'Web products',
    description:
      'Next.js storefronts, websites, and internal tools for customers and the teams who support them.',
    bullets: [
      'Commerce and account flows',
      'Admin dashboards and reporting',
      'Business websites and content tools',
    ],
  },
  mobile: {
    title: 'Mobile apps',
    description:
      'Cross-platform apps built with React Native and Expo, from the first working build through store release.',
    bullets: [
      'iOS and Android from one codebase',
      'Payments, notifications, and role-based access',
      'Release setup and store submission',
    ],
  },
  platform: {
    title: 'Backends and deployment',
    description:
      'The systems behind the interface, from Nest.js or Express APIs to database design and production releases.',
    bullets: [
      'APIs, integrations, and data modeling',
      'Event-driven workflows where needed',
      'CI/CD and Linux deployment',
    ],
  },
  process: {
    badge: 'How I work',
    title: 'How I work',
    description:
      'You get a scoped plan before development and working builds to review along the way.',
    steps: [
      {
        title: 'Discover',
        body: 'We talk through the people using the product, the problem it solves, and any constraints.',
      },
      {
        title: 'Plan',
        body: 'We agree on features, milestones, and what each release needs to do.',
      },
      {
        title: 'Build',
        body: 'I share working builds for feedback and test the flows your users will depend on.',
      },
      {
        title: 'Launch & support',
        body: 'I deploy the release and document how to run, maintain, and update it.',
      },
    ],
  },
  outcomes: {
    badge: 'Outcomes',
    title: 'Choose a starting point',
    description:
      'Pick the scope closest to your project, or use the estimate builder to put together your own brief.',
    items: [
      {
        id: 'launch',
        title: 'Launch',
        desc: 'Put a focused site or first version of your product in front of users.',
        bullets: [
          'Single-page or focused MVP experience',
          'Responsive layout',
          'Lead capture or core user flow',
        ],
        ctaLabel: 'Start a launch project',
        highlight: false,
      },
      {
        id: 'grow',
        title: 'Grow',
        desc: 'Build a website your team can update and measure as your business grows.',
        bullets: [
          'Custom multi-page website',
          'CMS for easy content updates',
          'SEO foundations and analytics',
        ],
        ctaLabel: 'Start a growth project',
        highlight: true,
      },
      {
        id: 'scale',
        title: 'Scale',
        desc: 'Build a product with user accounts and tools for day-to-day operations.',
        bullets: [
          'Authentication and permissions',
          'Database design and APIs',
          'Admin dashboard and integrations',
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
