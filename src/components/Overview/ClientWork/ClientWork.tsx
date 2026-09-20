'use client';

import { SectionDivider } from '@/components/Common/SectionDivider';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import ClientWorkShowcase from './ClientWorkShowcase';

export const ClientWork = () => {
  const {
    data: { clientWork },
  } = usePortfolioData();

  if (clientWork.length === 0) return null;

  return (
    <>
      <SectionDivider className="py-6" />
      <section className="relative py-12">
        <div className="mx-auto px-6">
          <div className="mb-10 text-center">
            <h2
              data-section-title
              data-split-title
              className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100"
            >
              Client Work
            </h2>
            <p className="reveal mx-auto max-w-3xl text-neutral-600 dark:text-neutral-300">
              Active freelance projects and client collaborations, delivering
              scalable solutions across mobile and web platforms.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-linear-to-b from-primary-500/30 via-primary-500/15 to-primary-500/30 lg:block"
              aria-hidden
            />

            <div className="space-y-0 lg:space-y-4">
              {clientWork.map((entry, index) => (
                <ClientWorkShowcase
                  key={entry.id}
                  entry={entry}
                  index={index}
                  isLast={index === clientWork.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
