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
      <section className="py-12 relative">
        <div className="mx-auto px-6">
          <div className="text-center mb-10">
            <h2
              data-section-title
              className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100"
            >
              Client Work
            </h2>
            <p className="reveal text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Active freelance projects and client collaborations, delivering
              scalable solutions across mobile and web platforms.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 hidden w-px bg-linear-to-b from-primary-500/30 via-primary-500/15 to-primary-500/30 pointer-events-none lg:block"
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
