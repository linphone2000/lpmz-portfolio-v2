import React from 'react';
import { Badge } from '../../Common/Badge';
import { CalendarIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ProjectHeaderProps {
  project: {
    name: string;
    category: string;
    status: string;
    year: number;
    stack: string[];
  };
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = React.memo(({ project }) => {
  return (
    <div className="flex items-start justify-between mb-4 sm:mb-6">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs">
            {project.category}
          </Badge>
          <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 text-xs">
            {project.status}
          </Badge>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {project.name}
        </h3>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{project.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <CodeBracketIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>
              {project.stack.length} technologies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectHeader.displayName = 'ProjectHeader';
