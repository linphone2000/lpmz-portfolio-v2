'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import type { Project } from '@/lib/types';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import {
  getDisplayName,
  getHeroScreenshot,
  getCaseStudyMeta,
  getProjectSlug,
} from '@/lib/project-utils';
import { PROJECT_ORIGIN_LABEL } from '@/lib/projectOrigin';
import {
  isMobileProject,
  isWebProject,
  sortPortfolioProjects,
} from '@/components/Portfolio/project-presentation';
import ProjectMedia from '@/components/Portfolio/ProjectMedia';
import PortfolioMotion from '@/components/Portfolio/PortfolioMotion';
import styles from '@/components/Portfolio/portfolio.module.css';

const filters = [
  { id: 'all', label: 'All projects' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
] as const;

type FilterOption = (typeof filters)[number]['id'];

function ProjectEntry({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  const meta = getCaseStudyMeta(project);
  const shot = getHeroScreenshot(project);
  const slug = getProjectSlug(project);
  const title = getDisplayName(project);
  const titleId = `project-${slug}`;

  return (
    <li>
      <Link
        href={`/portfolio/${slug}`}
        className={styles.entry}
        aria-labelledby={titleId}
      >
        {shot && (
          <div className={styles.entryMedia}>
            <ProjectMedia
              project={project}
              shot={shot}
              variant={featured ? 'cover' : 'thumbnail'}
            />
          </div>
        )}
        <div className={styles.entryCopy}>
          <p className={styles.entryMeta}>
            <span>{PROJECT_ORIGIN_LABEL[project.origin]} project</span>
            <span>{project.year}</span>
          </p>
          <h2 id={titleId}>{title}</h2>
          <p className={styles.entryOutcome}>{meta.outcome}</p>
        </div>
        <span className={styles.entryArrow} aria-hidden="true">
          <ArrowUpRightIcon strokeWidth={1.55} />
        </span>
      </Link>
    </li>
  );
}

export default function Projects() {
  const {
    data: { projects },
  } = usePortfolioData();
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const sortedProjects = sortPortfolioProjects(projects);
  const filtered =
    filterBy === 'mobile'
      ? sortedProjects.filter(isMobileProject)
      : filterBy === 'web'
        ? sortedProjects.filter(isWebProject)
        : sortedProjects;
  const featured = filtered.slice(0, 2);
  const archive = filtered.slice(2);

  return (
    <PortfolioMotion revision={filterBy}>
      <section className={styles.archive} aria-labelledby="work-heading">
        <header className={styles.archiveHeader}>
          <h1 id="work-heading" className={styles.display} data-work-intro>
            Selected work<span>.</span>
          </h1>
          <p className={styles.archiveLead}>
            Mobile apps, web platforms, and the systems behind them. Browse the
            projects to see what I built and the role I played.
          </p>
        </header>

        <div className={styles.filters}>
          <div
            className={styles.filterOptions}
            role="group"
            aria-label="Filter projects by platform"
          >
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={filterBy === id}
                onClick={() => setFilterBy(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className={styles.resultCount} role="status">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {featured.length ? (
          <ul className={styles.featuredEntries} role="list">
            {featured.map((project) => (
              <ProjectEntry
                key={getProjectSlug(project)}
                project={project}
                featured
              />
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No projects match this platform.</p>
        )}

        {archive.length > 0 && (
          <ul className={styles.archiveEntries} role="list">
            {archive.map((project) => (
              <ProjectEntry
                key={getProjectSlug(project)}
                project={project}
                featured={false}
              />
            ))}
          </ul>
        )}
      </section>
    </PortfolioMotion>
  );
}
