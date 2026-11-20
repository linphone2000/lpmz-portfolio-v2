'use client';

import { useEffect, useState } from 'react';
import { ArrowDownRightIcon } from '@heroicons/react/24/outline';
import styles from '@/components/Portfolio/portfolio.module.css';

interface Chapter {
  id: string;
  title: string;
}

export default function CaseChapters({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    let observer: IntersectionObserver | undefined;
    const targets = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((chapter) => chapter !== null);

    function observeChapters() {
      observer?.disconnect();
      const height = window.innerHeight;
      observer = new IntersectionObserver(
        (entries) => {
          const enteringChapter = entries.find((entry) => entry.isIntersecting);
          if (enteringChapter) setActive(enteringChapter.target.id);
        },
        {
          rootMargin: `-${Math.round(height * 0.24)}px 0px -${Math.round(height * 0.49)}px 0px`,
        }
      );
      for (const target of targets) observer.observe(target);
    }

    observeChapters();
    window.addEventListener('resize', observeChapters);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observeChapters);
    };
  }, [chapters]);

  return (
    <nav aria-label="Product chapters" className={styles.chapters}>
      <ol>
        {chapters.map(({ id, title }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              onClick={() => setActive(id)}
            >
              <span aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {title}
              <ArrowDownRightIcon strokeWidth={1.4} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
