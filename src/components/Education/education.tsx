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
    >
      <h2 id="education-title">Education</h2>
      <div className={styles.entries}>
        {education.map(
          ({ school, credential, period, location, relevantCourses }) => (
            <article key={school} className={styles.entry}>
              <p className={styles.period}>{period}</p>
              <div>
                <h3>{credential}</h3>
                <p className={styles.organization}>{school}</p>
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
