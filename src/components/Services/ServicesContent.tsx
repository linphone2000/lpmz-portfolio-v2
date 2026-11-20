'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  WindowIcon,
} from '@heroicons/react/24/outline';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import { ServiceInquiry } from './ServiceInquiry';
import styles from './ServicesContent.module.css';

export function ServicesContent() {
  const {
    data: { services, about },
  } = usePortfolioData();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const capabilities = [
    { ...services.mobile, icon: DevicePhoneMobileIcon },
    { ...services.web, icon: WindowIcon },
    { ...services.platform, icon: ServerStackIcon },
  ];

  return (
    <div className="site-container">
      <section className={styles.hero} aria-labelledby="services-title">
        <div>
          <p className={styles.eyebrow}>{services.hero.badge}</p>
          <h1 id="services-title" className={styles.title}>
            {services.hero.title}
          </h1>
          <p className={styles.lead}>{services.hero.description}</p>
          <div className={styles.actions}>
            <Link href="/services/estimate" className={styles.primary}>
              Build a project estimate <ArrowUpRightIcon aria-hidden />
            </Link>
            <button
              type="button"
              className={styles.textAction}
              onClick={() => setSelectedPlan('')}
            >
              Discuss a project <ArrowRightIcon aria-hidden />
            </button>
          </div>
        </div>

        <figure className={styles.figure}>
          <div className={styles.showcase}>
            <Image
              src="/perfume-tower/perfume-web-1.png"
              alt="Perfume Tower's fragrance storefront on desktop"
              width={2880}
              height={1658}
              sizes="(max-width: 800px) 72vw, 480px"
              priority
              className={styles.webShot}
            />
            <Image
              src="/perfume-tower/perfume-mobile-2.jpg"
              alt="Fragrance catalog in the Perfume Tower mobile app"
              width={1220}
              height={2629}
              sizes="(max-width: 800px) 23vw, 170px"
              className={styles.mobileShot}
            />
          </div>
          <figcaption>
            <Link
              href="/portfolio/perfume-tower-web"
              className={styles.textAction}
            >
              Perfume Tower <ArrowUpRightIcon aria-hidden />
            </Link>
          </figcaption>
        </figure>
      </section>

      <section
        className={styles.section}
        aria-labelledby="capabilities-heading"
        id="services"
      >
        <header className={styles.sectionHeader}>
          <h2 id="capabilities-heading">What I can build</h2>
        </header>
        <div className={styles.capabilities}>
          {capabilities.map(({ title, description, bullets, icon: Icon }) => (
            <article key={title} className={styles.capability}>
              <Icon className={styles.capabilityIcon} aria-hidden />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ul className={styles.bullets}>
                {bullets.filter(Boolean).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="outcomes-heading"
        id="outcomes"
      >
        <header className={styles.sectionHeader}>
          <h2 id="outcomes-heading">{services.outcomes.title}</h2>
          <p>{services.outcomes.description}</p>
        </header>
        <div className={styles.outcomes}>
          {services.outcomes.items.map((item) => (
            <article key={item.id} className={styles.outcome}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ul className={styles.bullets}>
                {item.bullets.filter(Boolean).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.textAction}
                onClick={() => setSelectedPlan(item.title)}
              >
                {item.ctaLabel} <ArrowUpRightIcon aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.section}
        aria-labelledby="process-heading"
        id="process"
      >
        <header className={styles.sectionHeader}>
          <h2 id="process-heading">{services.process.title}</h2>
          <p>{services.process.description}</p>
        </header>
        <ol className={styles.process}>
          {services.process.steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={styles.closing}
        aria-labelledby="services-contact-heading"
      >
        <ArrowDownRightIcon className={styles.closingIcon} aria-hidden />
        <h2 id="services-contact-heading">Have a project in mind?</h2>
        <div className={styles.actions}>
          <Link href="/services/estimate" className={styles.primary}>
            Build a project estimate <ArrowUpRightIcon aria-hidden />
          </Link>
          <button
            type="button"
            className={styles.textAction}
            onClick={() => setSelectedPlan('Custom solution')}
          >
            Contact me <ArrowRightIcon aria-hidden />
          </button>
        </div>
      </section>

      <ServiceInquiry
        plan={selectedPlan}
        email={about.email}
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
}
