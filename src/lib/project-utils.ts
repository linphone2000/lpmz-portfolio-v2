import type { Project, ProjectPreviewScreenshot } from '@/lib/types';
import { DATA } from '@/lib/data';

export interface CaseStudyBeat {
  title: string;
  body: string;
  imageId?: number;
}

export interface CaseStudyMeta {
  problem: string;
  outcome: string;
  role?: string;
  heroImageId?: number;
  beats?: CaseStudyBeat[];
}

/** Stable URL slugs — keep in sync with project names in data.ts */
export const PROJECT_SLUGS: Record<string, string> = {
  'Perfume Tower – Customer Mobile App': 'perfume-tower-mobile',
  'Perfume Tower – Web Storefront': 'perfume-tower-web',
  'SchoolFlow - Mobile School Management System': 'schoolflow',
  'Chat Chin POS – Mobile Inventory & Checkout System': 'chat-chin-pos',
  'Yoyic – Mobile E-Commerce (Customer + Seller/Admin + API)': 'yoyic',
  'Technortal – EdTech Learning Platform Backend': 'technortal',
  'PropertyApp – Advanced Trading & Investment Dashboard': 'propertyapp',
  'Minty – Personal Finance Management App': 'minty',
  'Intelligent Home Surveillance System': 'home-surveillance',
  'Pharmacy Management System': 'pharmacy',
  'Hotel Booking Web Application': 'hotel-booking',
  'Peer‑to‑peer Rental Platform': 'p2p-rental',
};

/** Outcome-focused copy for case studies (keeps data.ts blurbs intact). */
export const CASE_STUDY_META: Record<string, CaseStudyMeta> = {
  'perfume-tower-mobile': {
    problem:
      'Shoppers needed to browse fragrances and see product availability from their phones.',
    outcome:
      'Built an Expo shopping app with a catalog, wishlist, and orders on the same commerce API as the storefront.',
    role: 'Mobile engineer',
    heroImageId: 1,
    beats: [
      {
        title: 'Fragrance discovery',
        body: 'The home screen introduces featured collections and gives customers a starting point for browsing.',
        imageId: 1,
      },
      {
        title: 'Catalog and stock',
        body: 'Customers can search the catalog and see current product availability before opening a detail page.',
        imageId: 2,
      },
      {
        title: 'Product detail',
        body: 'Product details and purchase actions use the same commerce data as the web storefront.',
        imageId: 3,
      },
    ],
  },
  'perfume-tower-web': {
    problem:
      'The web storefront and customer app needed a shared catalog, inventory, and order system.',
    outcome:
      'Delivered the Next.js storefront and connected product browsing, accounts, and carts to the shared commerce API.',
    role: 'Full-stack engineering and deployment',
    heroImageId: 1,
    beats: [
      {
        title: 'Storefront',
        body: 'The storefront gives customers a place to browse the range and manage their accounts on the web.',
        imageId: 1,
      },
      {
        title: 'Browse by scent family',
        body: 'Scent families give shoppers a way into the catalog based on the fragrances they already like.',
        imageId: 2,
      },
    ],
  },
  schoolflow: {
    problem:
      'Schools relied on paper and chat apps for attendance, grades, fees, and parent updates.',
    outcome:
      'Led mobile delivery for the parent and student app, bringing attendance, grades, payments, and chat together.',
    role: 'Mobile delivery lead',
    heroImageId: 1,
    beats: [
      {
        title: 'Role-based dashboards',
        body: 'Parents and students see different dashboards so each person can reach the records and actions available to their role.',
        imageId: 2,
      },
      {
        title: 'Student schedules',
        body: 'Students can check their upcoming classes alongside assignments, attendance, and grades in the app.',
        imageId: 7,
      },
      {
        title: 'Fee tracking and chat',
        body: 'Parents can check school fees and message the school from the same app they use to follow their child’s progress.',
        imageId: 13,
      },
    ],
  },
  'chat-chin-pos': {
    problem: 'Retailers needed phone-first inventory and checkout.',
    outcome: 'QR-first mobile POS with stock alerts and receipt printing.',
    role: 'Sole mobile engineer',
    heroImageId: 1,
  },
  yoyic: {
    problem:
      'Sellers and shoppers needed one marketplace spanning mobile and admin.',
    outcome:
      'Built the shopper app, seller and admin portal, and shared Express API as the sole engineer on the client delivery.',
    role: 'Sole full-stack engineer',
    heroImageId: 1,
    beats: [
      {
        title: 'Customer commerce',
        body: 'Shoppers can manage the cart, choose how to pay, and follow the status of an order in the app.',
        imageId: 6,
      },
      {
        title: 'Seller and admin portal',
        body: 'Role-based access controls who can manage catalog entries, update orders, or verify manual payments.',
        imageId: 15,
      },
    ],
  },
  technortal: {
    problem:
      'The EdTech product needed a multi-role learning API before the public site could grow.',
    outcome:
      'Built the Express and PostgreSQL backend for enrollment, community, and payments, and led sprint delivery for the frontend team.',
    role: 'Core backend engineer · delivery lead',
    heroImageId: 1,
    beats: [
      {
        title: 'Course enrollment',
        body: 'The API handles course discovery, enrollment, and lesson progress for learners.',
        imageId: 2,
      },
      {
        title: 'Community and experience points',
        body: 'Learners can post and comment in the forum, earn experience points, and see their rank on the leaderboard.',
        imageId: 4,
      },
      {
        title: 'Live classes and payments',
        body: 'Class schedules connect to payment records so staff can verify transfers from local wallets.',
        imageId: 5,
      },
    ],
  },
  propertyapp: {
    problem: 'Investors needed clear mobile portfolio performance views.',
    outcome: 'Trading dashboard with P&L, charts, and buy/sell simulation.',
    role: 'Sole mobile engineer',
    heroImageId: 1,
  },
  minty: {
    problem: 'Personal finance tools were split across notes and bank apps.',
    outcome: 'Cross-platform finance app with multi-account tracking and sync.',
    role: 'Sole full-stack engineer',
    heroImageId: 1,
  },
  'home-surveillance': {
    problem:
      'Home monitoring needed intelligent alerts without dedicated hardware.',
    outcome: 'Live browser demo with detection modes and stranger alerts.',
    role: 'Sole engineer',
    heroImageId: 14,
  },
  pharmacy: {
    problem: 'Pharmacy stock and sales needed a shared web system.',
    outcome: 'Led a MERN inventory delivery with a live demo environment.',
    role: 'Team lead',
    heroImageId: 2,
  },
  'hotel-booking': {
    problem: 'Small hotels needed simple web booking without a heavy PMS.',
    outcome: 'Responsive booking site with room management and admin controls.',
    role: 'Full-stack engineer',
    heroImageId: 2,
  },
  'p2p-rental': {
    problem:
      'Hosts and renters needed searchable listings with reliable media.',
    outcome: 'Next.js listings platform with filters and Cloudinary media.',
    role: 'Sole engineer',
    heroImageId: 1,
  },
};

export function getProjectSlug(project: Project): string {
  return (
    PROJECT_SLUGS[project.name] ??
    project.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

export function getProjects(): Project[] {
  return DATA.projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return DATA.projects.find((project) => getProjectSlug(project) === slug);
}

export function getCaseStudyMeta(project: Project): CaseStudyMeta {
  const slug = getProjectSlug(project);
  return (
    CASE_STUDY_META[slug] ?? {
      problem: project.blurb,
      outcome: project.blurb,
    }
  );
}

export function getDisplayName(project: Project): string {
  const slug = getProjectSlug(project);
  if (slug === 'perfume-tower-mobile') return 'Perfume Tower mobile app';
  if (slug === 'perfume-tower-web') return 'Perfume Tower storefront';
  return project.name.split(/\s+[–-]\s+/)[0]?.trim() || project.name;
}

export function getHeroScreenshot(
  project: Project
): ProjectPreviewScreenshot | undefined {
  const shots = project.preview?.screenshots ?? [];
  const meta = getCaseStudyMeta(project);
  if (shots.length === 0) {
    const cover = project.preview?.screenshot;
    if (typeof cover === 'string') {
      return {
        id: 0,
        src: cover,
        title: project.name,
        description: meta.outcome,
      };
    }
    return undefined;
  }
  const heroId = meta.heroImageId ?? shots[0]?.id;
  return shots.find((shot) => shot.id === heroId) ?? shots[0];
}
