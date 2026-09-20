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
      'Fragrance retail needed a native customer app tied to live inventory.',
    outcome:
      'Shipped a completed Expo app for catalog, wishlist, and orders on a shared backend.',
    role: 'Mobile engineer',
    heroImageId: 1,
    beats: [
      {
        title: 'Commerce home',
        body: 'Featured collections and product rails for discovery.',
        imageId: 1,
      },
      {
        title: 'Catalog & stock',
        body: 'Inventory-aware browsing with search and stock badges.',
        imageId: 2,
      },
      {
        title: 'Product detail',
        body: 'Detail and purchase actions connected to the shared API.',
        imageId: 3,
      },
    ],
  },
  'perfume-tower-web': {
    problem:
      'The brand needed a web storefront sharing the same commerce backend.',
    outcome:
      'Delivered perfume-tower.shop with catalog, cart, and production deploys.',
    role: 'Web + API + deploy',
    heroImageId: 1,
    beats: [
      {
        title: 'Storefront',
        body: 'Customer-facing catalog and account flows on Next.js.',
        imageId: 1,
      },
      {
        title: 'Commerce depth',
        body: 'Cart and product paths wired to the shared Express API.',
        imageId: 2,
      },
    ],
  },
  schoolflow: {
    problem:
      'Schools relied on paper and chat apps for attendance, grades, and fees.',
    outcome:
      'Completed iOS/Android school ops for parents and students, live in stores.',
    role: 'Lead mobile delivery',
    heroImageId: 1,
    beats: [
      {
        title: 'Role-based dashboards',
        body: 'Parent and student flows share one product with clear permissions.',
        imageId: 2,
      },
      {
        title: 'Daily school rhythm',
        body: 'Attendance, grades, and schedules where families expect them.',
        imageId: 7,
      },
      {
        title: 'Payments & chat',
        body: 'Fee tracking and messaging replace scattered follow-ups.',
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
      'Sellers and shoppers needed a connected mobile + admin marketplace.',
    outcome:
      'Sole full-stack delivery: customer app, RBAC admin, and shared Express API.',
    role: 'Sole full-stack engineer',
    heroImageId: 1,
    beats: [
      {
        title: 'Customer commerce',
        body: 'Cart, checkout, and order timelines in the mobile app.',
        imageId: 6,
      },
      {
        title: 'Admin portal',
        body: 'Seller/admin dashboards on the same API.',
        imageId: 15,
      },
    ],
  },
  technortal: {
    problem: 'The EdTech product needed a reliable multi-role learning API.',
    outcome: 'Production backend powering technortal.com.',
    role: 'Core backend engineer',
    heroImageId: 1,
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
    problem: 'Home monitoring needed intelligent alerts without dedicated hardware.',
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
    problem: 'Hosts and renters needed searchable listings with reliable media.',
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
  return project.name.split('–')[0]?.split('-')[0]?.trim() || project.name;
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

export function getStoryFrames(
  project: Project
): ProjectPreviewScreenshot[] {
  const shots = project.preview?.screenshots ?? [];
  const meta = getCaseStudyMeta(project);
  const ids = (meta.beats ?? [])
    .map((beat) => beat.imageId)
    .filter((id): id is number => typeof id === 'number');

  if (ids.length === 0) return shots.slice(0, 3);

  return ids
    .map((id) => shots.find((shot) => shot.id === id))
    .filter((shot): shot is ProjectPreviewScreenshot => Boolean(shot));
}
