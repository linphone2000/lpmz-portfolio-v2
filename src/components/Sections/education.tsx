'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { AnimatedSection } from '../Common/AnimatedSection';

export const Education: React.FC = () => {
  return (
    <AnimatedSection id="education" title="Education">
      <div className="grid sm:grid-cols-2 gap-5">
        {DATA.education.map((e, index) => (
          <Card
            key={e.school}
            className="hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <h3 className="font-semibold">{e.school}</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {e.credential}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {e.period}
            </p>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
};
