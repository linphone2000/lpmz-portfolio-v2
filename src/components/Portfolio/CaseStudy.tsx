import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';
import type { Project, ProjectPreviewScreenshot } from '@/lib/types';
import { PROJECT_ORIGIN_LABEL } from '@/lib/projectOrigin';
import {
  getCaseStudyMeta,
  getDisplayName,
  getHeroScreenshot,
  getProjectSlug,
} from '@/lib/project-utils';
import ProjectMedia from '@/components/Portfolio/ProjectMedia';
import PortfolioMotion from '@/components/Portfolio/PortfolioMotion';
import CaseChapters from '@/components/Portfolio/CaseChapters';
import CaseGallery from '@/components/Portfolio/CaseGallery';
import styles from '@/components/Portfolio/portfolio.module.css';

interface CaseStudyProps {
  project: Project;
  nextProject?: Project;
}

function ScreenshotFigure({
  project,
  shot,
  cover = false,
}: {
  project: Project;
  shot: ProjectPreviewScreenshot;
  cover?: boolean;
}) {
  return (
    <figure className={styles.figure}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View screenshot: ${shot.title}`}
        className={styles.imageLink}
        data-case-shot={shot.id}
      >
        <ProjectMedia
          project={project}
          shot={shot}
          variant={cover ? 'hero' : 'detail'}
        />
        <span className={styles.imageArrow} aria-hidden="true">
          <ArrowsPointingOutIcon strokeWidth={1.55} />
        </span>
      </a>
      <figcaption>{shot.title}</figcaption>
    </figure>
  );
}

export default function CaseStudy({ project, nextProject }: CaseStudyProps) {
  const meta = getCaseStudyMeta(project);
  const hero = getHeroScreenshot(project);
  const nextHero = nextProject && getHeroScreenshot(nextProject);
  const beats = meta.beats ?? [];
  const title = getDisplayName(project);
  const screenshots = project.preview?.screenshots ?? [];
  const galleryShots =
    hero && !screenshots.some((shot) => shot.id === hero.id)
      ? [hero, ...screenshots]
      : screenshots;
  const chapters = beats.map((beat, index) => ({
    id: `chapter-${index + 1}`,
    title: beat.title,
  }));
  const gallery = screenshots
    .filter((shot) => shot.id !== hero?.id)
    .slice(0, 3);

  return (
    <PortfolioMotion key={getProjectSlug(project)}>
      <CaseGallery screenshots={galleryShots} title={title}>
        <article className={`site-container ${styles.caseStudy}`}>
          <Link href="/portfolio" className={styles.backLink}>
            <ArrowLeftIcon aria-hidden="true" strokeWidth={1.55} />
            All work
          </Link>

          <header className={styles.caseHeader}>
            <div>
              <p className={styles.caseType}>
                {PROJECT_ORIGIN_LABEL[project.origin]} project
              </p>
              <h1 className={styles.display} data-work-intro>
                {title}
              </h1>
              <p className={styles.caseSummary}>{meta.outcome}</p>
            </div>
            <dl className={styles.caseFacts} data-work-intro-detail>
              {meta.role && (
                <div>
                  <dt>Role</dt>
                  <dd>{meta.role}</dd>
                </div>
              )}
              <div>
                <dt>Area</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              {project.liveUrl && (
                <div>
                  <dt>Link</dt>
                  <dd>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveLink}
                    >
                      {project.liveUrl.includes('apps.apple.com')
                        ? 'App Store'
                        : 'View project'}
                      <ArrowUpRightIcon aria-hidden="true" strokeWidth={1.55} />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </header>

          {hero && <ScreenshotFigure project={project} shot={hero} cover />}

          <section
            className={styles.caseContext}
            aria-labelledby="case-context"
          >
            <div className={styles.contextCopy} data-work-enter>
              <h2 id="case-context" className={styles.sectionHeading}>
                The challenge
              </h2>
              <p className={styles.challenge}>{meta.problem}</p>
              {project.blurb !== meta.problem &&
                project.blurb !== meta.outcome && <p>{project.blurb}</p>}
            </div>
            {project.stack.length > 0 && (
              <div className={styles.caseStack}>
                <h3>Technology</h3>
                <ul role="list">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {beats.length > 0 ? (
            <section
              className={styles.caseProcess}
              aria-labelledby="case-process"
            >
              <h2 id="case-process" className={styles.sectionHeading}>
                Inside the product
              </h2>
              <div className={styles.chapterLayout}>
                {chapters.length > 1 && <CaseChapters chapters={chapters} />}
                <div className={styles.chapterTrack}>
                  {beats.map((beat, index) => {
                    const shot = screenshots.find(
                      (screen) => screen.id === beat.imageId
                    );
                    const chapter = chapters[index];
                    return (
                      <section
                        className={styles.beat}
                        id={chapter.id}
                        key={chapter.id}
                        aria-labelledby={`${chapter.id}-title`}
                      >
                        <div className={styles.beatCopy} data-work-enter>
                          <h3 id={`${chapter.id}-title`}>{beat.title}</h3>
                          <p>{beat.body}</p>
                        </div>
                        {shot && (
                          <ScreenshotFigure project={project} shot={shot} />
                        )}
                      </section>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            <section
              className={styles.caseProcess}
              aria-labelledby="case-process"
            >
              <h2 id="case-process" className={styles.sectionHeading}>
                What I built
              </h2>
              {project.features.length > 0 && (
                <ul className={styles.featureList} role="list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
              {gallery.length > 0 && (
                <div className={styles.gallery}>
                  {gallery.map((shot) => (
                    <ScreenshotFigure
                      key={shot.id}
                      project={project}
                      shot={shot}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {galleryShots.length > 0 && (
            <a
              href={galleryShots[0].src}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.browseShots}
              data-case-shot={galleryShots[0].id}
            >
              <ArrowsPointingOutIcon strokeWidth={1.55} aria-hidden="true" />
              Browse{' '}
              {galleryShots.length === 1
                ? 'screenshot'
                : `all ${galleryShots.length} screenshots`}
              <ArrowUpRightIcon strokeWidth={1.55} aria-hidden="true" />
            </a>
          )}

          <footer className={styles.caseFooter}>
            {nextProject && (
              <Link
                href={`/portfolio/${getProjectSlug(nextProject)}`}
                className={styles.nextProject}
              >
                <span>Next project</span>
                <strong>{getDisplayName(nextProject)}</strong>
                <ArrowRightIcon aria-hidden="true" strokeWidth={1.35} />
                {nextHero && (
                  <ProjectMedia
                    project={nextProject}
                    shot={nextHero}
                    variant="thumbnail"
                  />
                )}
              </Link>
            )}
            <Link href="/portfolio" className={styles.backLink}>
              <ArrowLeftIcon aria-hidden="true" strokeWidth={1.55} />
              All work
            </Link>
          </footer>
        </article>
      </CaseGallery>
    </PortfolioMotion>
  );
}
