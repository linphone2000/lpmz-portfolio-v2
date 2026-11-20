'use client';

import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import styles from './Profile.module.css';

export function Certifications() {
  const {
    data: { certs },
  } = usePortfolioData();

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className={styles.section}
      data-profile-chapter
      tabIndex={-1}
    >
      <h2 id="certifications-title" data-profile-heading>
        Certifications
      </h2>
      <ul className={styles.credentials}>
        {certs.map(({ name, issuer, year }) => (
          <li key={name}>
            <span className={styles.period}>{year}</span>
            <div>
              <h3>{name}</h3>
              <span className={styles.entryDetail}>{issuer}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
