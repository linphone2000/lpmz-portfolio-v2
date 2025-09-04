import React, { useMemo } from 'react';
import { Badge } from '@/components/Common/Badge';

interface ProjectTechStackProps {
  stack: string[];
}

export const ProjectTechStack: React.FC<ProjectTechStackProps> = React.memo(
  ({ stack }) => {
    // Memoize tech stack badges
    const techStackBadges = useMemo(
      () =>
        stack.map((tech: string) => (
          <Badge
            key={tech}
            className="bg-neutral-100 dark:bg-neutral-800 text-xs"
          >
            {tech}
          </Badge>
        )),
      [stack]
    );

    return (
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">{techStackBadges}</div>
      </div>
    );
  }
);

ProjectTechStack.displayName = 'ProjectTechStack';
