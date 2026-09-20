'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import {
  getDisplayName,
  getHeroScreenshot,
  getCaseStudyMeta,
  getProjectSlug,
} from '@/lib/project-utils';
import {
  PROJECT_ORIGIN_BADGE_CLASS,
  PROJECT_ORIGIN_LABEL,
  originSortRank,
} from '@/lib/projectOrigin';
import { cx } from '@/lib/utils';

type FilterOption = 'all' | 'mobile' | 'web';

const isMobileProject = (project: Pick<Project, 'category' | 'stack'>) =>
  project.category === 'Mobile Development' ||
  project.stack.includes('React Native') ||
  project.stack.includes('Expo');

function ProjectRow({ project }: { project: Project }) {
  const meta = getCaseStudyMeta(project);
  const hero = getHeroScreenshot(project);
  const slug = getProjectSlug(project);
  const title = getDisplayName(project);

  return (
    <Link
      href={`/portfolio/${slug}`}
      data-magnetic
      data-table-row
      className="group reveal grid cursor-pointer grid-cols-[4rem_1fr] items-center gap-4 border-b border-neutral-200 py-7 dark:border-neutral-800 md:grid-cols-[5rem_1fr_minmax(12rem,32%)_7rem] md:gap-8"
    >
      <span className="font-mono text-sm text-neutral-400">{project.year}</span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-neutral-50 md:text-2xl">
            {title}
          </h3>
          <span
            className={cx(
              'rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]',
              PROJECT_ORIGIN_BADGE_CLASS[project.origin]
            )}
          >
            {PROJECT_ORIGIN_LABEL[project.origin]}
          </span>
        </div>
        {meta.role ? (
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-400">
            {meta.role}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-neutral-500 md:hidden dark:text-neutral-400">
          {meta.outcome}
        </p>
      </div>
      <p className="hidden text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 md:block">
        {meta.outcome}
      </p>
      <div className="relative hidden h-16 w-28 overflow-hidden rounded-lg bg-neutral-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-neutral-800 md:block">
        {hero ? (
          <Image
            src={hero.src}
            alt=""
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : null}
      </div>
    </Link>
  );
}

export default function Projects() {
  const {
    data: { projects },
  } = usePortfolioData();
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const filtered = useMemo(() => {
    let list = projects;
    if (filterBy === 'mobile') {
      list = list.filter((p) => isMobileProject(p));
    } else if (filterBy === 'web') {
      list = list.filter((p) => !isMobileProject(p));
    }
    return [...list].sort(
      (a, b) => originSortRank(a.origin) - originSortRank(b.origin)
    );
  }, [filterBy, projects]);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="reveal mb-10">
        <p className="text-[10px] uppercase tracking-[0.24em] text-primary-500">
          Selected work
        </p>
        <h2
          data-section-title
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-5xl"
        >
          Case studies.
        </h2>
        <p className="mt-4 max-w-xl text-neutral-500 dark:text-neutral-400">
          Problem, role, and outcome — with a few curated frames.
        </p>
      </div>

      <div className="reveal mb-6 flex flex-wrap gap-2">
        {(
          [
            ['all', 'All'],
            ['mobile', 'Mobile'],
            ['web', 'Web'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            data-magnetic
            onClick={() => setFilterBy(value)}
            className={cx(
              'cursor-pointer rounded-full px-4 py-2 text-sm transition-colors',
              filterBy === value
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((project) => (
          <ProjectRow key={getProjectSlug(project)} project={project} />
        ))}
      </div>
    </section>
  );
}
