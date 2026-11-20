'use client';

import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import styles from '@/components/Education/Profile.module.css';

export function Experience() {
  const {
    data: { experience },
  } = usePortfolioData();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={styles.section}
      data-profile-chapter
      tabIndex={-1}
    >
      <h2 id="experience-title" data-profile-heading>
        Experience
      </h2>
      <div className={styles.timeline} data-profile-timeline>
        <span
          aria-hidden="true"
          className={styles.timelineProgress}
          data-profile-progress
        />
        {experience.map(({ company, role, period, bullets, technologies }) => (
          <article key={company} className={styles.role} data-profile-role>
            <p className={styles.period}>{period}</p>
            <div className={styles.roleBody} data-profile-panel>
              <p className={styles.organization}>{company}</p>
              <h3>{role}</h3>
              <ul className={styles.bullets}>
                {bullets.filter(Boolean).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {technologies.length > 0 && (
                <p className={styles.technologies}>
                  {technologies.slice(0, 4).join(' · ')}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
