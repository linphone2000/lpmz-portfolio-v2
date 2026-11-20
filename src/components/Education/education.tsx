'use client';

import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import styles from './Profile.module.css';

export function Education() {
  const {
    data: { education },
  } = usePortfolioData();

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className={styles.section}
      data-profile-chapter
      tabIndex={-1}
    >
      <h2 id="education-title" data-profile-heading>
        Education
      </h2>
      <div className={styles.education}>
        {education.map(
          ({ school, credential, period, location, relevantCourses }) => (
            <article key={school} className={styles.degree} data-profile-panel>
              <p className={styles.period}>{period}</p>
              <div className={styles.degreeBody}>
                <p className={styles.organization}>{school}</p>
                <h3>{credential}</h3>
                {location && <p className={styles.entryDetail}>{location}</p>}
                {relevantCourses?.length > 0 && (
                  <details className={styles.courses}>
                    <summary>Coursework</summary>
                    <p>{relevantCourses.join(', ')}</p>
                  </details>
                )}
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
