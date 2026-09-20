'use client';

import { Card } from '@/components/Common/Card';
import { Badge } from '@/components/Common/Badge';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';

export const Experience = () => {
  const {
    data: { experience },
  } = usePortfolioData();

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <h2
            data-section-title
            className="mb-6 text-3xl font-bold text-neutral-900 dark:text-neutral-100"
          >
            Experience
          </h2>
          <p className="reveal mx-auto max-w-3xl text-neutral-600 dark:text-neutral-300">
            Senior mobile work backed by full-stack APIs, microservices, and
            hands-on deployment on production servers.
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} data-agenda-row>
              <Card
                className="relative overflow-hidden px-8 py-4"
                data-tilt
                animateIn={false}
              >
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary-500 to-secondary-500" />
                <div>
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
                        {exp.role}
                      </h3>
                      <p className="font-medium text-primary-600 dark:text-primary-400">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                      <Badge
                        data-chip
                        className="w-fit bg-primary-500/10 text-primary-700 dark:text-primary-300"
                      >
                        {exp.period}
                      </Badge>
                      {'type' in exp &&
                      exp.type &&
                      exp.type !== 'Full-time' ? (
                        <Badge
                          data-chip
                          className="w-fit border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                        >
                          {String(exp.type)}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.bullets
                      .filter((bullet) => bullet.length > 0)
                      .map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          data-table-row
                          className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="mt-1.5 text-primary-500">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
