'use client';

import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import styles from '@/components/Portfolio/portfolio.module.css';

const skillCategories = [
  ['frontend', 'Frontend'],
  ['backend', 'Backend'],
  ['databases', 'Databases'],
  ['languages', 'Languages'],
  ['tools', 'Tools and delivery'],
  ['aiml', 'AI and computer vision'],
  ['soft', 'Collaboration'],
] as const;

export function Skills() {
  const {
    data: { skills },
  } = usePortfolioData();

  return (
    <section className={styles.skills} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.sectionHeading}>
        Technical toolkit
      </h2>
      <dl className={styles.skillRows}>
        {skillCategories.map(([key, label]) => (
          <div key={key} className={styles.skillRow}>
            <dt>{label}</dt>
            <dd>{skills[key].join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
