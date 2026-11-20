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
    >
      <h2 id="experience-title">Experience</h2>
      <div className={styles.entries}>
        {experience.map(({ company, role, period, bullets }) => (
          <article key={company} className={styles.entry}>
            <p className={styles.period}>{period}</p>
            <div>
              <h3>{role}</h3>
              <p className={styles.organization}>{company}</p>
              <ul className={styles.bullets}>
                {bullets.filter(Boolean).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
