import type { Project, ProjectPreviewScreenshot } from '@/lib/types';
import { getProjectSlug } from '@/lib/project-utils';
import { originSortRank } from '@/lib/projectOrigin';

const featuredOrder = [
  'schoolflow',
  'perfume-tower-web',
  'yoyic',
  'technortal',
];

export function sortPortfolioProjects(projects: Project[]) {
  return [...projects].sort((first, second) => {
    const firstRank = featuredOrder.indexOf(getProjectSlug(first));
    const secondRank = featuredOrder.indexOf(getProjectSlug(second));

    if (firstRank >= 0 || secondRank >= 0) {
      return (
        (firstRank >= 0 ? firstRank : featuredOrder.length) -
        (secondRank >= 0 ? secondRank : featuredOrder.length)
      );
    }

    return (
      originSortRank(first.origin) - originSortRank(second.origin) ||
      second.year - first.year
    );
  });
}

export function isMobileProject(project: Project) {
  return (
    project.category === 'Mobile Development' ||
    project.stack.includes('React Native') ||
    project.stack.includes('Expo')
  );
}

export function isWebProject(project: Project) {
  return (
    !isMobileProject(project) ||
    (project.preview?.screenshots?.some(
      (shot) => shot.presentation === 'web'
    ) ??
      false)
  );
}

export function isMobileScreenshot(
  project: Project,
  shot: ProjectPreviewScreenshot
) {
  return shot.presentation
    ? shot.presentation === 'mobile'
    : isMobileProject(project);
}
