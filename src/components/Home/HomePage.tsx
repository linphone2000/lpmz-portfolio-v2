import Link from 'next/link';
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { DATA } from '@/lib/data';
import SelectedWork from '@/components/Home/SelectedWork';
import HomeMotionRoot, { HomeArt } from '@/components/Motion/HomeMotionRoot';

const currentRoles = DATA.experience.slice(0, 2);

export default function HomePage() {
  return (
    <HomeMotionRoot>
      <div className="site-container home-page" id="home">
        <section
          className="home-hero"
          data-home-hero
          aria-labelledby="hero-title"
        >
          <div className="home-intro" data-home-intro>
            <p className="home-role" data-intro-reveal>
              Senior full-stack developer
            </p>
            <h1 id="hero-title">
              <span className="home-name-line">
                <span data-name-line>Lin Phone</span>
              </span>{' '}
              <span className="home-name-line">
                <span data-name-line>
                  Myint Zaw
                  <span className="home-period" aria-hidden="true">
                    .
                  </span>
                </span>
              </span>
            </h1>
            <p className="home-lede" data-intro-reveal>
              I build mobile and web products, from the interface to the APIs
              and infrastructure they run on.
            </p>
            <div className="home-actions" data-intro-reveal>
              <a href="#work" className="site-button">
                Selected work <ArrowDownRightIcon aria-hidden="true" />
              </a>
              <a
                className="site-text-link"
                href="/lpmz-cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View résumé <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </div>
          </div>
          <HomeArt />
        </section>
        <div className="home-context">
          <span>{DATA.location}</span>
          <span>
            React Native <i /> Next.js <i /> NestJS
          </span>
        </div>
        <SelectedWork />
        <section
          className="home-experience"
          id="about"
          aria-labelledby="experience-title"
        >
          <div className="home-experience-intro" data-home-reveal>
            <h2 id="experience-title">Experience</h2>
            <Link className="site-text-link" href="/education">
              Career &amp; education <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          </div>
          <div className="home-roles">
            {currentRoles.map(({ company, role, period, summary }) => (
              <article
                className="home-role-entry"
                data-home-reveal
                key={company}
              >
                <p>{period}</p>
                <h3>{company}</h3>
                <div>{role}</div>
                <p>{summary}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </HomeMotionRoot>
  );
}
