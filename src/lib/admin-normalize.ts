import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';

/**
 * Keeps `about` (full DATA blob) aligned with top-level slices the site reads from.
 * Call before PUT /api/admin/portfolio.
 */
export function syncAboutEmbedded(data: PortfolioCMSData): PortfolioCMSData {
  return {
    ...data,
    about: {
      ...data.about,
      experience: data.experience,
      projects: data.projects,
      skills: data.skills,
      education: data.education,
      certs: data.certs,
      achievements: data.achievements,
    },
  };
}
