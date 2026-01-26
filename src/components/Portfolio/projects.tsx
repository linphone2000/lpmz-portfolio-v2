'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { DATA } from '../../lib/data';
import { Project } from '../../lib/types';
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
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { PhoneFrame } from '../Common/PhoneFrame';

type SortOption = 'year' | 'name' | 'category';
type FilterOption =
  | 'all'
  | 'Mobile Development'
  | 'AI & Computer Vision'
  | 'Full-Stack Development'
  | 'Web Development';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('year');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
      filtered = filtered.filter((project) => project.category === filterBy);
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

  // Reset to page 1 when filters or sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, filterBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredAndSortedProjects.slice(
    startIndex,
    endIndex
  );

  // Pagination handlers
  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(DATA.projects.map((p) => p.category))
    );
    return uniqueCategories;
  }, []);

  // Memoized callbacks
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    // Trigger close animation first
    setIsModalOpen(false);
    // Delay unmounting the ProjectModal content to allow exit animation
    setTimeout(() => setSelectedProject(null), 320);
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterOption) => {
    setFilterBy(newFilter);
    setCurrentPage(1);
  }, []);

  return (
    <section className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4">
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
                className="flex items-center gap-2 cursor-pointer"
              >
                <FunnelIcon className="w-4 h-4" />
                Filters
              </Button>

              {showFilters && (
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterBy}
                    onChange={(e) =>
                      handleFilterChange(e.target.value as FilterOption)
                    }
                    className="px-3 py-1 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
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
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ease-out ${
            isContainerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {paginatedProjects.map((project, index) => {
            const isMobileProject = project.category === 'Mobile Development';

            // For mobile projects, get first 3 images; for web, get first image
            let mobileImages: string[] = [];
            let firstImage: string | undefined;

            if (isMobileProject) {
              // Always use screenshots array, get up to 4 images
              const allScreenshots = project.preview?.screenshots || [];
              mobileImages = allScreenshots.slice(0, 4).map((s) => s.src);
            } else {
              // Always use screenshots array, get first image
              firstImage = project.preview?.screenshot || undefined;
            }

            return (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isMobileProject={isMobileProject}
                mobileImages={mobileImages}
                firstImage={firstImage}
                handleProjectClick={handleProjectClick}
              />
            );
          })}
        </div>

        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500 dark:text-neutral-400">
              No projects found matching the selected filters.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredAndSortedProjects.length > itemsPerPage && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="ghost"
              className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!showPage) {
                    // Show ellipsis
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span
                          key={page}
                          className="px-2 text-neutral-500 dark:text-neutral-400"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                        currentPage === page
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}
            </div>

            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="ghost"
              className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Page Info */}
        {filteredAndSortedProjects.length > 0 && (
          <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedProjects.length)} of{' '}
            {filteredAndSortedProjects.length} projects
          </div>
        )}
      </div>

      {/* Section Divider */}
      <SectionDivider className="pt-16" />

      {/* Project Modal: keep mounted while animating out */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </section>
  );
};

// Separate component for project cards to handle loading state properly
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isMobileProject: boolean;
  mobileImages: string[];
  firstImage?: string;
  handleProjectClick: (project: Project) => void;
}> = ({
  project,
  index,
  isMobileProject,
  mobileImages,
  firstImage,
  handleProjectClick,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      className={`transition-all duration-500 ease-out animation-delay-${index * 100}`}
    >
      <Card className="h-full flex flex-col group hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
        {/* Project Image(s) */}
        {isMobileProject && mobileImages.length > 0 ? (
          <div className="relative w-full overflow-hidden flex gap-2 p-3 bg-neutral-100 dark:bg-neutral-800 items-center justify-center min-h-[192px]">
            {mobileImages.map((imgSrc, imgIndex) => (
              <div
                key={imgIndex}
                className="relative flex-1 max-w-[100px] h-full flex items-center justify-center"
              >
                <PhoneFrame
                  src={imgSrc}
                  alt={`${project.name} - Image ${imgIndex + 1}`}
                  className="h-full w-auto max-h-full"
                  showHoverEffect={false}
                  thinBorder={true}
                />
              </div>
            ))}
            {project.highlight && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="!bg-primary-500 !text-white !text-sm !font-bold !px-3 !py-1.5 !shadow-xl !border-0">
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
          </div>
        ) : firstImage ? (
          <div className="relative w-full h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={firstImage}
              alt={project.name}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center z-10">
                <div className="text-center">
                  <PhotoIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-2 animate-pulse" />
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    Loading...
                  </div>
                </div>
              </div>
            )}
            {project.highlight && (
              <div className="absolute top-3 right-3 z-20">
                <Badge className="!bg-primary-500 !text-white !text-sm !font-bold !px-3 !py-1.5 !shadow-xl !border-0">
                  Featured
                </Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
          </div>
        ) : (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
            <CodeBracketIcon className="w-12 h-12 text-neutral-400 dark:text-neutral-600" />
            {project.highlight && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary-500 text-white text-xs shadow-lg">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 p-5">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <CalendarIcon className="w-3 h-3" />
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.category}</span>
            </div>
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm leading-relaxed line-clamp-3">
            {project.blurb}
          </p>

          <div className="flex items-center gap-2 mb-4 text-xs text-neutral-500 dark:text-neutral-400">
            <CheckCircleIcon className="w-3 h-3" />
            <span>{project.features.length} features</span>
            <span>•</span>
            <CodeBracketIcon className="w-3 h-3" />
            <span>{project.stack.length} technologies</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                className="text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                {tech}
              </Badge>
            ))}
            {project.stack.length > 3 && (
              <Badge className="text-xs bg-neutral-100 dark:bg-neutral-800">
                +{project.stack.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <Button
            onClick={() => handleProjectClick(project)}
            className="w-full group-hover:bg-primary-600 dark:group-hover:bg-primary-400 transition-colors cursor-pointer"
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </Card>
    </div>
  );
};
