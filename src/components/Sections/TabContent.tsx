'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Hero } from './hero';
import { Experience } from './experience';
import { Projects } from './projects';
import { Skills } from './skills';
import { Education } from './education';
import { FeaturedProject } from './FeaturedProject';
import { Card } from '../Common/Card';

interface TabContentProps {
  activeTab: string;
}

export const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <Hero />
            <FeaturedProject />
            <Experience />
          </div>
        );
      case 'portfolio':
        return (
          <div>
            <Projects />
            <Skills />
          </div>
        );
      case 'education':
        return (
          <div>
            <Education />
            <section className="py-16">
              <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Certifications</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Professional certifications and continuous learning achievements.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DATA.certs.map((cert, index) => (
                    <Card key={index} className="text-center">
                      <div className="text-2xl mb-3">🏆</div>
                      <h3 className="font-semibold mb-2">{cert}</h3>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return (
          <div>
            <Hero />
            <FeaturedProject />
            <Experience />
          </div>
        );
    }
  };

  return renderTabContent();
};
