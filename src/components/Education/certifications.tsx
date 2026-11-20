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
    >
      <h2 id="certifications-title">Certifications</h2>
      <ul className={styles.credentials}>
        {certs.map(({ name, issuer, year }) => (
          <li key={name}>
            <span className={styles.period}>{year}</span>
            <h3>{name}</h3>
            <span className={styles.entryDetail}>{issuer}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
