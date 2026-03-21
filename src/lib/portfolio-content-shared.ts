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
};

export type PortfolioCMSData = {
  about: typeof DATA;
  experience: typeof DATA.experience;
  projects: typeof DATA.projects;
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
  skills: DATA.skills,
  education: DATA.education,
  certs: DATA.certs,
  achievements: DATA.achievements,
  services: fallbackServicesContent,
  pricing: pricingData,
  estimateFeatures: featuresCatalog,
};
