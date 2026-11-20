import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { PageShell } from '@/components/Common/PageShell';
import { Experience } from '@/components/Overview/Experience/experience';
import { Education } from '@/components/Education/education';
import { Certifications } from '@/components/Education/certifications';
import { DATA } from '@/lib/data';
import styles from '@/components/Education/Profile.module.css';

export const metadata: Metadata = {
  title: 'About Lin Phone Myint Zaw',
  description:
    'Work history, education, and résumé for Lin Phone Myint Zaw, a full-stack developer and technical lead based in Yangon, Myanmar.',
};

export default function EducationPage() {
  return (
    <PageShell>
      <div className="site-container">
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>About</p>
            <h1>{DATA.name}</h1>
          </div>
          <div className={styles.intro}>
            <p>
              I’m a full-stack developer and technical lead based in{' '}
              {DATA.location}. I build mobile and web products and work on the
              APIs, data, and deployments behind them.
            </p>
            <a className={styles.download} href="/lpmz-cv.pdf" download>
              Download résumé <ArrowDownTrayIcon aria-hidden />
            </a>
          </div>
        </header>

        <div className={styles.profile}>
          <aside className={styles.aside}>
            <nav aria-label="On this page">
              <span className={styles.navLabel} aria-hidden>
                On this page
              </span>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#certifications">Certifications</a>
            </nav>
          </aside>

          <div>
            <Experience />
            <Education />
            <Certifications />
          </div>
        </div>

        <div className={styles.closing}>
          <Link href="/portfolio">
            Explore selected work <ArrowUpRightIcon aria-hidden />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
