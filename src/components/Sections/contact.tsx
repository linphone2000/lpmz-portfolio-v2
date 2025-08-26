'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Button } from '../Common/Button';
import { AnimatedSection } from '../Common/AnimatedSection';

export const Contact: React.FC = () => {
  return (
    <AnimatedSection id="contact" title="Contact">
      <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">
            Let&apos;s build something great together.
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Email{' '}
            <a
              className="underline decoration-sky-500/60 underline-offset-4 hover:text-sky-600 transition-colors"
              href={`mailto:${DATA.email}`}
            >
              {DATA.email}
            </a>{' '}
            · Phone{' '}
            <a
              className="underline decoration-sky-500/60 underline-offset-4 hover:text-sky-600 transition-colors"
              href={`tel:${DATA.phone.replace(/\s/g, '')}`}
            >
              {DATA.phone}
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <Button href={DATA.links.portfolio}>Portfolio</Button>
          <Button href={DATA.links.linkedin} variant="ghost">
            LinkedIn
          </Button>
        </div>
      </Card>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
        © {new Date().getFullYear()} {DATA.name}. Built with React, Framer
        Motion, and Tailwind.
      </p>
    </AnimatedSection>
  );
};
