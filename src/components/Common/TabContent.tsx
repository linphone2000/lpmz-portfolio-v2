'use client';

import { useMemo } from 'react';
import { Hero } from '@/components/Overview/Hero/hero';
import { Experience } from '@/components/Overview/Experience/experience';
import { FeaturedProject } from '@/components/Overview/FeaturedProject/FeaturedProject';
import { Projects } from '../Portfolio/projects';
import { Skills } from '../Portfolio/skills';
import { Education } from '../Education/education';
import { Certifications } from '../Education/certifications';
import { ServicesContent } from '../Services/ServicesContent';

interface TabContentProps {
  activeTab: string;
}

export const TabContent = ({ activeTab }: TabContentProps) => {
  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <Hero />
            <FeaturedProject />
            <Experience />
          </div>
        );
      case 'services':
        return (
          <div>
            <ServicesContent />
          </div>
        );
      case 'portfolio':
        return (
          <div>
            <Projects />
            <Skills />
          </div>
        );
      case 'about':
        return (
          <div>
            <Education />
            <Certifications />
          </div>
        );
      default:
        return (
          <div>
            <ServicesContent />
          </div>
        );
    }
  }, [activeTab]);

  return tabContent;
};

TabContent.displayName = 'TabContent';
