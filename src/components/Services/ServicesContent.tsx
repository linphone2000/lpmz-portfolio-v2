'use client';

import { useRef, useState } from 'react';
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
import { useServicesMotion } from './useServicesMotion';
import styles from './ServicesContent.module.css';

export function ServicesContent() {
  const {
    data: { services, about },
  } = usePortfolioData();
  const page = useRef<HTMLDivElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const currentStep = useServicesMotion(page);
  const capabilities = [
    { ...services.mobile, icon: DevicePhoneMobileIcon },
    { ...services.web, icon: WindowIcon },
    { ...services.platform, icon: ServerStackIcon },
  ];

  return (
    <div ref={page} className={styles.page}>
      <div className="site-container">
        <section
          className={styles.hero}
          aria-labelledby="services-title"
          data-service-hero
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-service-intro>
              {services.hero.badge}
            </p>
            <div className={styles.titleMask}>
              <h1
                id="services-title"
                className={styles.title}
                data-service-title
              >
                {services.hero.title}
              </h1>
            </div>
            <p className={styles.lead} data-service-intro>
              {services.hero.description}
            </p>
            <div className={styles.actions} data-service-intro>
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
            <div className={styles.showcase} data-service-stage>
              <div className={styles.floor} aria-hidden />
              <div className={styles.lens} data-service-parallax>
                <div className={styles.projection} data-service-perspective>
                  <div className={styles.webPlane} data-service-media="web">
                    <Image
                      src="/perfume-tower/perfume-web-1.png"
                      alt="Perfume Tower's fragrance storefront on desktop"
                      width={2880}
                      height={1658}
                      sizes="(max-width: 800px) 76vw, (max-width: 1250px) 40vw, 530px"
                      priority
                      className={styles.webShot}
                    />
                  </div>
                  <div
                    className={styles.mobilePlane}
                    data-service-media="mobile"
                  >
                    <Image
                      src="/perfume-tower/perfume-mobile-2.jpg"
                      alt="Fragrance catalog in the Perfume Tower mobile app"
                      width={1220}
                      height={2631}
                      sizes="(max-width: 800px) 26vw, 170px"
                      className={styles.mobileShot}
                    />
                  </div>
                </div>
              </div>
              <div
                className={styles.surfaceLight}
                data-service-light
                aria-hidden
              />
            </div>
            <figcaption>
              <span>Desktop storefront · Mobile catalog</span>
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
            <h2 id="capabilities-heading" data-service-reveal>
              What I can build
            </h2>
          </header>
          <div>
            {capabilities.map(({ title, description, bullets, icon: Icon }) => (
              <article
                key={title}
                className={styles.capability}
                data-service-reveal
              >
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
      </div>

      <section
        className={styles.processScene}
        aria-labelledby="process-heading"
        id="process"
        data-service-process
      >
        <div className={`site-container ${styles.processLayout}`}>
          <div className={styles.processGuide}>
            <header className={styles.sectionHeader}>
              <h2 id="process-heading" data-service-reveal>
                {services.process.title}
              </h2>
              <p>{services.process.description}</p>
            </header>
            <nav className={styles.processNav} aria-label="Delivery stages">
              <span className={styles.processTrack} aria-hidden>
                <span data-service-progress />
              </span>
              <ol>
                {services.process.steps.map(({ title }, index) => (
                  <li key={title}>
                    <a
                      href={`#delivery-step-${index + 1}`}
                      aria-current={
                        currentStep === index ? 'location' : undefined
                      }
                    >
                      <small aria-hidden>
                        {String(index + 1).padStart(2, '0')}
                      </small>
                      {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <ol className={styles.process}>
            {services.process.steps.map((step, index) => (
              <li
                key={step.title}
                id={`delivery-step-${index + 1}`}
                className={styles.processStep}
                data-service-step={index}
                data-active={currentStep === index || undefined}
              >
                <span className={styles.stepNumber} aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.stepCopy} data-service-reveal>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="site-container">
        <section
          className={`${styles.section} ${styles.outcomesSection}`}
          aria-labelledby="outcomes-heading"
          id="outcomes"
        >
          <header className={styles.sectionHeader} data-service-reveal>
            <h2 id="outcomes-heading">{services.outcomes.title}</h2>
            <p>{services.outcomes.description}</p>
          </header>
          <div className={styles.outcomes}>
            {services.outcomes.items.map((item) => (
              <article
                key={item.id}
                className={styles.outcome}
                data-service-reveal
              >
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
      </div>

      <ServiceInquiry
        plan={selectedPlan}
        email={about.email}
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
}
