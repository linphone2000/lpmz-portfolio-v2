'use client';

import React from 'react';
import { DATA } from '@/lib/data';
import { Card } from '@/components/Common/Card';
import { TrophyIcon } from '@heroicons/react/24/outline';

export const Certifications: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Certifications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            Professional certifications and continuous learning achievements.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.certs.map((cert, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out animation-delay-${index * 100} opacity-0 translate-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]`}
            >
              <Card className="text-center">
                <div className="text-2xl mb-3 text-primary-500">
                  <TrophyIcon className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                  {cert.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  {cert.year}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
