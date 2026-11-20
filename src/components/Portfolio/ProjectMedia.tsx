import Image from 'next/image';
import type { Project, ProjectPreviewScreenshot } from '@/lib/types';
import { isMobileScreenshot } from '@/components/Portfolio/project-presentation';
import styles from '@/components/Portfolio/portfolio.module.css';

interface ProjectMediaProps {
  project: Project;
  shot: ProjectPreviewScreenshot;
  variant: 'cover' | 'thumbnail' | 'detail' | 'hero';
}

export default function ProjectMedia({
  project,
  shot,
  variant,
}: ProjectMediaProps) {
  const mobile = isMobileScreenshot(project, shot);
  const isCaseStudy = variant === 'hero' || variant === 'detail';
  const companion =
    mobile && (variant === 'cover' || variant === 'hero')
      ? project.preview?.screenshots?.find(
          (screen) =>
            screen.id !== shot.id && isMobileScreenshot(project, screen)
        )
      : undefined;
  const sizes = mobile
    ? variant === 'thumbnail'
      ? '96px'
      : '(max-width: 680px) 38vw, 280px'
    : variant === 'thumbnail'
      ? '168px'
      : variant === 'hero'
        ? '(max-width: 680px) 84vw, 1060px'
        : '(max-width: 680px) 88vw, 540px';

  return (
    <div
      className={styles.stage}
      data-work-frame
      data-presentation={mobile ? 'mobile' : 'web'}
      data-variant={variant}
      data-pair={companion ? 'true' : undefined}
    >
      <div className={styles.scene} data-work-scene>
        <div className={styles.screen} data-work-plane>
          <Image
            src={shot.src}
            alt={isCaseStudy ? shot.description || shot.title : ''}
            width={mobile ? 400 : 1440}
            height={mobile ? 864 : 900}
            sizes={sizes}
            priority={variant === 'hero'}
          />
        </div>
        {companion && (
          <div className={styles.screen} data-work-plane>
            <Image
              src={companion.src}
              alt={isCaseStudy ? companion.description || companion.title : ''}
              width={400}
              height={864}
              sizes={sizes}
            />
          </div>
        )}
      </div>
      {variant !== 'thumbnail' && (
        <div className={styles.sweep} data-work-sweep aria-hidden="true" />
      )}
    </div>
  );
}
