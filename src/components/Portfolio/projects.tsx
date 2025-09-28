'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { Button } from '../Common/Button';
import { ProjectModal } from '../Common/ProjectModal';
import { SectionDivider } from '../Common/SectionDivider';
import { useInView } from '../../hooks/useInView';
import {
  CalendarIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  EyeIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';

type SortOption = 'year' | 'name' | 'category';
type FilterOption = 'all' | 'Mobile Development' | 'AI & Computer Vision' | 'Full-Stack Development' | 'Web Development';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('year');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Use custom in-view hook for animations
  const [containerRef, isContainerInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Memoized filtered and sorted projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = DATA.projects;
    
    // Filter by category
    if (filterBy !== 'all') {
      filtered = filtered.filter(project => project.category === filterBy);
    }
    
    // Sort projects
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return b.year - a.year; // Newest first
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [sortBy, filterBy]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(DATA.projects.map(p => p.category)));
    return uniqueCategories;
  }, []);

  // Memoized callbacks
  const handleProjectClick = useCallback((project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterOption) => {
    setFilterBy(newFilter);
  }, []);

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Projects
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A collection of my recent work, showcasing various technologies and
            problem-solving approaches.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <FunnelIcon className="w-4 h-4" />
                Filters
              </Button>
              
              {showFilters && (
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterBy}
                    onChange={(e) => handleFilterChange(e.target.value as FilterOption)}
                    className="px-3 py-1 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ArrowsUpDownIcon className="w-4 h-4 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-1 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                <option value="year">Sort by Year</option>
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-out ${
            isContainerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {filteredAndSortedProjects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out animation-delay-${index * 100}`}
            >
              <Card className="h-full flex flex-col group hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.category}</span>
                      </div>
                    </div>
                    {project.highlight && (
                      <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.blurb}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <CheckCircleIcon className="w-3 h-3" />
                    <span>{project.features.length} features</span>
                    <span>•</span>
                    <CodeBracketIcon className="w-3 h-3" />
                    <span>{project.stack.length} technologies</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        className="text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 4 && (
                      <Badge className="text-xs bg-neutral-100 dark:bg-neutral-800">
                        +{project.stack.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleProjectClick(project)}
                  className="w-full mt-auto group-hover:bg-primary-600 dark:group-hover:bg-primary-400 transition-colors"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Card>
            </div>
          ))}
        </div>

        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              No projects found matching the selected filters.
            </p>
          </div>
        )}
      </div>

      {/* Section Divider */}
      <SectionDivider className="pt-16" />

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </section>
  );
};
