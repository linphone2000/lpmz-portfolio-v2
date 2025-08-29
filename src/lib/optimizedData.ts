import { DATA } from './data';

/**
 * Optimized data structure for better performance
 * Pre-computes frequently accessed data to reduce object references and re-renders
 */
export const OPTIMIZED_DATA = {
  // Pre-computed featured project to avoid find() on every render
  featuredProject: DATA.projects.find(p => p.highlight) || DATA.projects[0],
  
  // Hero component data - all frequently accessed data in one place
  heroData: {
    achievements: DATA.achievements.slice(0, 3), // Only first 3 achievements
    services: DATA.services,
    about: DATA.about,
    skills: DATA.skills,
    links: DATA.links,
    phone: DATA.phone,
    location: DATA.location,
    name: DATA.name,
    summary: DATA.summary,
  },
  
  // Pre-computed stats for better performance
  stats: {
    yearsExperience: DATA.about.yearsOfExperience,
    totalProjects: DATA.about.totalProjects,
    technologiesMastered: DATA.about.technologiesMastered,
    educationCount: DATA.education.length,
  },
  
  // Pre-computed skill categories for easier access
  skillCategories: {
    frontend: DATA.skills.frontend,
    backend: DATA.skills.backend,
    databases: DATA.skills.databases,
  },
} as const;

/**
 * Type definitions for optimized data
 */
export type OptimizedData = typeof OPTIMIZED_DATA;
export type HeroData = typeof OPTIMIZED_DATA.heroData;
export type Stats = typeof OPTIMIZED_DATA.stats;
export type SkillCategories = typeof OPTIMIZED_DATA.skillCategories;
