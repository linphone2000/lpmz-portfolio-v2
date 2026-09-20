'use client';

import { Card } from '@/components/Common/Card';
import { Button } from '@/components/Common/Button';
import SurfaceRing from '@/components/Motion/SurfaceRing';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { SectionDivider } from '@/components/Common/SectionDivider';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';

export const Contact = () => {
  const {
    data: { about: portfolio },
  } = usePortfolioData();

  return (
    <section className="relative overflow-hidden pb-12">
      <SectionDivider className="py-8" />
      <SurfaceRing className="surface-ring-scene pointer-events-none absolute right-[-10%] bottom-0 hidden h-64 w-64 opacity-25 md:block" />

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h2
            data-section-title
            className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100"
          >
            Get In Touch
          </h2>
          <p className="reveal mx-auto max-w-2xl text-neutral-600 dark:text-neutral-300">
            Open to new opportunities, collaborations, or a focused chat about
            product builds.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="reveal px-8 py-4" data-tilt animateIn={false}>
            <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-500" />
                <a
                  href={`mailto:${portfolio.email}`}
                  className="cursor-pointer text-neutral-600 transition-colors hover:text-primary-500 dark:text-neutral-300"
                >
                  {portfolio.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-primary-500" />
                <a
                  href={`tel:${portfolio.phone.replace(/\s/g, '')}`}
                  className="cursor-pointer text-neutral-600 transition-colors hover:text-primary-500 dark:text-neutral-300"
                >
                  {portfolio.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-primary-500" />
                <span className="text-neutral-600 dark:text-neutral-300">
                  {portfolio.location}
                </span>
              </div>
            </div>
          </Card>

          <Card className="reveal px-8 py-4" data-tilt animateIn={false}>
            <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Social Links
            </h3>
            <div className="space-y-3">
              <span data-magnetic className="block w-full">
                <Button href={`mailto:${portfolio.email}`} className="w-full">
                  Send Email
                </Button>
              </span>
              <span data-magnetic className="block w-full">
                <Button
                  href={portfolio.links.linkedin}
                  variant="ghost"
                  className="w-full"
                >
                  Connect on LinkedIn
                </Button>
              </span>
              <span data-magnetic className="block w-full">
                <Button
                  href={portfolio.links.github}
                  variant="ghost"
                  className="w-full"
                >
                  View GitHub
                </Button>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
