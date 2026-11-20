import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { PageShell } from '@/components/Common/PageShell';
import { Experience } from '@/components/Overview/Experience/experience';
import { Education } from '@/components/Education/education';
import { Certifications } from '@/components/Education/certifications';
import ProfileMotion from '@/components/Education/ProfileMotion';
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
      <ProfileMotion>
        <div className="site-container">
          <header className={styles.hero} data-profile-hero>
            <div className={styles.scene} data-profile-scene aria-hidden="true">
              <div className={styles.sceneDepth} data-profile-depth>
                <div className={styles.sceneLens} data-profile-lens>
                  <Image
                    src="/about-copper-assembly.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 700px) 92vw, (max-width: 1200px) 56vw, 740px"
                    className={styles.sceneImage}
                  />
                </div>
              </div>
            </div>
            <div className={styles.identity}>
              <p className={styles.eyebrow} data-profile-opening>
                Full-stack developer · Technical lead
              </p>
              <h1 aria-label={DATA.name}>
                <span aria-hidden="true" className={styles.nameLine}>
                  <span data-profile-name>Lin Phone</span>
                </span>
                <span aria-hidden="true" className={styles.nameLine}>
                  <span data-profile-name>
                    Myint Zaw<span className={styles.namePeriod}>.</span>
                  </span>
                </span>
              </h1>
              <p className={styles.intro} data-profile-opening>
                Based in {DATA.location}. I build mobile and web products and
                work on the APIs, data, and deployments behind them.
              </p>
              <div className={styles.actions} data-profile-opening>
                <a className="site-button" href="/lpmz-cv.pdf" download>
                  Download résumé <ArrowDownTrayIcon aria-hidden="true" />
                </a>
                <a className="site-text-link" href="#experience">
                  Experience <ArrowDownIcon aria-hidden="true" />
                </a>
              </div>
            </div>
          </header>

          <div className={styles.profile} data-profile-chapters>
            <aside className={styles.aside}>
              <nav aria-label="On this page" className={styles.chapterNav}>
                <a href="#experience" data-profile-link>
                  Experience
                </a>
                <a href="#education" data-profile-link>
                  Education
                </a>
                <a href="#certifications" data-profile-link>
                  Certifications
                </a>
              </nav>
            </aside>

            <div className={styles.chapters}>
              <Experience />
              <Education />
              <Certifications />
            </div>
          </div>

          <div className={styles.closing}>
            <Link href="/portfolio">
              <span>Explore selected work</span>
              <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ProfileMotion>
    </PageShell>
  );
}
