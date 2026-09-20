import type { Project, ProjectOrigin } from '@/lib/types';

export const PROJECT_ORIGIN_LABEL: Record<ProjectOrigin, string> = {
  client: 'Client',
  academic: 'Academic',
  personal: 'Practice',
};

/** Flat, minimalist badges with distinct solid colors. */
export const PROJECT_ORIGIN_BADGE_CLASS: Record<ProjectOrigin, string> = {
  client:
    'border-transparent bg-emerald-600 bg-none text-white hover:scale-100 dark:bg-emerald-600 dark:text-white',
  academic:
    'border-transparent bg-amber-500 bg-none text-white hover:scale-100 dark:bg-amber-500 dark:text-white',
  personal:
    'border-transparent bg-slate-500 bg-none text-white hover:scale-100 dark:bg-slate-500 dark:text-white',
};

export function originSortRank(origin: ProjectOrigin): number {
  switch (origin) {
    case 'client':
      return 0;
    case 'academic':
      return 1;
    case 'personal':
      return 2;
  }
}

export function isFeaturedProject(project: Pick<Project, 'origin'>): boolean {
  return project.origin === 'client' || project.origin === 'academic';
}
