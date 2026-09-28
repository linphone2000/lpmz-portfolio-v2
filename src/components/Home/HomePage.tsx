'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  EnvelopeIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import SelectedWork from '@/components/Home/SelectedWork';
import './home.css';

const Sculpture = dynamic(() => import('@/components/Home/Sculpture'), {
  ssr: false,
});

function openPage(href: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign(href);
  };
}

function skillLabel(list: string[], name: string, display = name): string {
  return list.includes(name) ? display : (list[0] ?? display);
}

function uniqueStack(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item || seen.has(item)) return false;
    seen.add(item);
    return true;
  });
}

export default function HomePage() {
  const {
    data: { about, clientWork, projects, skills },
  } = usePortfolioData();
  const [motion, setMotion] = useState(true);
  const [time, setTime] = useState('--:-- MMT');

  const stack = uniqueStack([
    ...skills.frontend.slice(0, 3),
    skills.languages.includes('TypeScript') ? 'TypeScript' : '',
    ...skills.backend.slice(0, 2),
    skills.databases[0] ?? '',
  ]).slice(0, 6);

  const craftRows = [
    {
      index: '01',
      title: 'Mobile experiences',
      detail: `${skillLabel(skills.frontend, 'React Native')} / ${skillLabel(skills.frontend, 'Expo')}`,
    },
    {
      index: '02',
      title: 'Web applications',
      detail: `${skillLabel(skills.frontend, 'React JS', 'React')} / ${skillLabel(skills.frontend, 'Next.js')}`,
    },
    {
      index: '03',
      title: 'Behind the scenes',
      detail: `${skills.backend[0] ?? 'Node.js'} / ${skills.databases[0] ?? 'PostgreSQL'}`,
    },
  ];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotion(!media.matches);
    sync();
    media.addEventListener('change', sync);

    const update = () => {
      const clock = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Yangon',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
      setTime(`${clock} MMT`);
    };
    update();
    const clockTimer = window.setInterval(update, 30000);

    return () => {
      window.clearInterval(clockTimer);
      media.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion]);

  return (
    <div className="portfolio">
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow intro">
              <span className="asterisk">✳</span> {about.title.toUpperCase()}
            </p>
            <h1 id="hero-title">
              <span>LIN</span>
              <span>
                PHONE<span className="name-period">.</span>
              </span>
            </h1>
            <div className="hero-description">
              <span className="small-rule" />
              <p>
                {about.summary.split('—')[0]?.trim()}.
                <br />
                <strong>{about.about.tagline}</strong>
              </p>
            </div>
            <a href="#work" className="primary-button">
              Explore my work <ArrowUpRightIcon />
            </a>
          </div>
          <div className="hero-art">
            <span className="art-cross cross-one">+</span>
            <span className="art-cross cross-two">+</span>
            <p className="art-coordinate">
              EXPLORING THE SPACE
              <br />
              BETWEEN IDEAS & IMPACT
            </p>
            <Sculpture motion={motion} />
            <span className="orbit-label orbit-one">
              <span /> CREATIVE THINKING
            </span>
            <span className="orbit-label orbit-two">
              <span /> ENGINEERED TO WORK
            </span>
            <div className="art-caption">
              <span className="tiny-cross">✳</span> A LITTLE CURIOSITY GOES A
              LONG WAY.
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#work" className="scroll-cue">
              <span className="scroll-circle">
                <ArrowDownIcon />
              </span>{' '}
              SCROLL TO DISCOVER
            </a>
            <span className="location">
              {about.location.toUpperCase()} <span>↗</span> {time}
            </span>
            <button
              type="button"
              className="motion-toggle"
              onClick={() => setMotion((value) => !value)}
              aria-pressed={motion}
              aria-label={motion ? 'Pause animations' : 'Enable animations'}
            >
              {motion ? <PauseIcon /> : <PlayIcon />} MOTION{' '}
              {motion ? 'ON' : 'OFF'}
            </button>
          </div>
        </section>

        <div className="stack-strip" aria-label="Technology stack">
          <div className="stack-track">
            {[0, 1].map((copy) => (
              <div className="stack-group" key={copy} aria-hidden={copy === 1}>
                {stack.map((item) => (
                  <span key={`${copy}-${item}`}>
                    {item}
                    <PlusIcon />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <SelectedWork clientWork={clientWork} projects={projects} />

        <section
          className="about-section section-wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-label reveal">
            <p className="eyebrow muted">02 / THE HUMAN BEHIND THE CODE</p>
            <div className="about-monogram" aria-hidden="true">
              LP<span>↗</span>
            </div>
            <p className="full-name">
              {about.name}
              <br />
              <span>Based in {about.location}. Building everywhere.</span>
            </p>
          </div>
          <div className="about-content reveal">
            <h2 id="about-title">
              Curiosity drives me.
              <br />
              <span className="soft">Craft defines my work.</span>
            </h2>
            <p>{about.summary}</p>
            <p>{about.about.valueProposition}</p>
            <div className="craft-list">
              {craftRows.map((row) => (
                <div key={row.index}>
                  <span>{row.index}</span>
                  <h3>{row.title}</h3>
                  <span>{row.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section section-wrap"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-top reveal">
            <p className="eyebrow">03 / MAKE SOMETHING MATTER</p>
            <span className="availability">
              <span /> {about.about.availability.toUpperCase()}
            </span>
          </div>
          <a className="contact-title reveal" href={`mailto:${about.email}`}>
            <h2 id="contact-title">
              Your next idea.
              <br />
              <span>Let’s build it.</span>
            </h2>
            <ArrowUpRightIcon aria-hidden="true" />
          </a>
          <div className="contact-bottom reveal">
            <a className="email-link" href={`mailto:${about.email}`}>
              <EnvelopeIcon />
              {about.email}
            </a>
            <div className="socials">
              <a href={about.links.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRightIcon />
              </a>
              <a href={about.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a href="#home" className="wordmark">
          linphone<span>.</span>
        </a>
        <p>THOUGHTFULLY BUILT. ALWAYS EVOLVING.</p>
        <nav className="footer-links" aria-label="More pages">
          <Link href="/services" onClick={openPage('/services')}>
            Services
          </Link>
          <Link href="/portfolio" onClick={openPage('/portfolio')}>
            Portfolio
          </Link>
          <Link href="/education" onClick={openPage('/education')}>
            Education
          </Link>
        </nav>
        <a href="#home">
          Back to top <ArrowUpRightIcon />
        </a>
      </footer>
    </div>
  );
}
