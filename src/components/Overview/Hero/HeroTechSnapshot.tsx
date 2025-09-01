import React from 'react';
import { Card } from '@/components/Common/Card';
import { Badge } from '@/components/Common/Badge';

interface HeroTechSnapshotProps {
  heroData: {
    skills: {
      frontend: string[];
      backend: string[];
      databases: string[];
    };
    about: {
      tagline: string;
    };
  };
}

export const HeroTechSnapshot: React.FC<HeroTechSnapshotProps> = React.memo(({ heroData }) => {
  return (
    <Card className="relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-secondary-400/10 blur-2xl" />
      <div className="relative">
        <h3 className="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
          Tech Expertise
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Frontend
            </h4>
            <div className="flex flex-wrap gap-2">
              {heroData.skills.frontend.map((skill) => (
                <Badge key={skill} className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Backend
            </h4>
            <div className="flex flex-wrap gap-2">
              {heroData.skills.backend.map((skill) => (
                <Badge key={skill} className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Databases
            </h4>
            <div className="flex flex-wrap gap-2">
              {heroData.skills.databases.map((skill) => (
                <Badge key={skill} className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          {heroData.about.tagline}
        </p>
      </div>
    </Card>
  );
});

HeroTechSnapshot.displayName = 'HeroTechSnapshot';
