'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { DATA } from '@/lib/data';
import { Card } from '@/components/Common/Card';
import { Button } from '@/components/Common/Button';

import { SectionDivider } from '@/components/Common/SectionDivider';

export const Contact: React.FC = () => {
  const [leftCardRef, leftCardInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [rightCardRef, rightCardInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative pb-12">
      <SectionDivider className="pt-10 pb-16" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Get In Touch
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            ref={leftCardRef}
            className={`transition-all duration-500 ease-out ${
              leftCardInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
            }`}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-primary-500">📧</span>
                  <a
                    href={`mailto:${DATA.email}`}
                    className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                  >
                    {DATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary-500">📱</span>
                  <a
                    href={`tel:${DATA.phone.replace(/\s/g, '')}`}
                    className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                  >
                    {DATA.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary-500">📍</span>
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {DATA.location}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div
            ref={rightCardRef}
            className={`transition-all duration-500 ease-out ${
              rightCardInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
            }`}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                Social Links
              </h3>
              <div className="space-y-3">
                <Button href={`mailto:${DATA.email}`} className="w-full">
                  Send Email
                </Button>
                <Button
                  href={DATA.links.linkedin}
                  variant="ghost"
                  className="w-full"
                >
                  Connect on LinkedIn
                </Button>
                <Button
                  href={DATA.links.github}
                  variant="ghost"
                  className="w-full"
                >
                  View GitHub
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
