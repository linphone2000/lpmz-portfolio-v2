import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { getProjectSlug } from '@/lib/project-utils';
import type { ClientWorkEntry, Project } from '@/lib/types';

interface SelectedWorkProps {
  clientWork: ClientWorkEntry[];
  projects: Project[];
}

function workHref(entry: ClientWorkEntry, projects: Project[]): string {
  const match = projects.find(
    (project) => getProjectSlug(project) === entry.id
  );
  return match ? `/portfolio/${entry.id}` : '/portfolio';
}

function cardTone(entry: ClientWorkEntry, index: number): string {
  if (entry.featuredScreenshot?.presentation === 'web') return 'commerce web';
  return index % 2 === 0 ? 'school' : 'commerce';
}

export default function SelectedWork({
  clientWork,
  projects,
}: SelectedWorkProps) {
  const selected = clientWork.filter((entry) => entry.featuredScreenshot);
  const extra = clientWork.find((entry) => !entry.featuredScreenshot);

  return (
    <section
      className="work-section section-wrap"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow muted">01 / SELECTED WORK</p>
          <h2 id="work-title">
            From idea.
            <br />
            <span className="soft">To in your hands.</span>
          </h2>
        </div>
        <p className="section-note">
          Useful products.
          <br />
          Thoughtfully built.
        </p>
      </div>
      <div className="project-grid">
        {selected.map((entry, index) => {
          const href = workHref(entry, projects);
          const shot = entry.featuredScreenshot?.src ?? '';
          return (
            <article
              className={`project-card reveal ${cardTone(entry, index)}`}
              key={entry.id}
            >
              <Link
                className="project-visual"
                href={href}
                aria-label={`Read the ${entry.clientName} case study`}
              >
                <div className="project-topline">
                  <span>{entry.engagement.toUpperCase()}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="project-art-inner">
                  <Image
                    src={shot}
                    alt={`${entry.clientName} interface`}
                    width={944}
                    height={1600}
                    sizes="(max-width: 760px) 70vw, 32vw"
                  />
                </div>
                <span className="project-open">
                  <ArrowUpRightIcon />
                </span>
                <span className="project-display-name" aria-hidden="true">
                  {entry.clientName}
                </span>
              </Link>
              <div className="project-info">
                <h3>
                  <Link href={href}>
                    {entry.clientName} <ArrowUpRightIcon />
                  </Link>
                </h3>
                <p>{entry.summary}</p>
                <div className="tags">
                  {entry.technologies.slice(0, 3).map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <Link className="more-work reveal" href="/portfolio">
        <span>
          <small>ALSO IN THE MIX</small>
          {extra?.clientName ?? 'Portfolio'}{' '}
          <span className="muted-inline">
            / {extra?.engagement ?? 'All case studies'}
          </span>
        </span>
        <span>
          Explore more work <ArrowUpRightIcon />
        </span>
      </Link>
    </section>
  );
}
