'use client';

import React, { useState, useCallback } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import { PhoneFrame } from './PhoneFrame';
import {
  CalendarIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  PlayIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { SectionDivider } from './SectionDivider';
import { Project } from '../../lib/types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectModal: React.FC<ProjectModalProps> = React.memo(
  ({ isOpen, onClose, project }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'gallery'>(
      'overview'
    );
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Memoized callbacks
    const handleTabChange = useCallback(
      (tab: 'overview' | 'demo' | 'gallery') => {
        setActiveTab(tab);
      },
      []
    );

    const handleVideoToggle = useCallback(() => {
      setIsVideoPlaying((prev) => !prev);
    }, []);

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={project.name} size="xl">
        <div className="space-y-6">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                  {project.category}
                </Badge>
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-300">
                  {project.status}
                </Badge>
                {project.highlight && (
                  <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CodeBracketIcon className="w-4 h-4" />
                  <span>{project.stack.length} technologies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>{project.features.length} features</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: UserGroupIcon },
                { id: 'demo', label: 'Video Demo', icon: PlayIcon },
                { id: 'gallery', label: 'Gallery', icon: PhotoIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    handleTabChange(tab.id as 'overview' | 'demo' | 'gallery')
                  }
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Project Description */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  Project Overview
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {project.blurb}
                </p>
              </div>

              {/* Preview Data - Only show for projects with preview data */}
              {project.preview && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Feature Pills */}
                  {project.preview.featurePills &&
                    project.preview.featurePills.length > 0 && (
                      <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          Key Highlights
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                          {project.preview.featurePills.map((pill, index) => (
                            <span
                              key={index}
                              className={`px-3 py-2 sm:py-1 text-sm rounded-full text-center sm:text-left ${
                                index === 0
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              }`}
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 transition-all duration-300 ease-out"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInSlide 0.3s ease-out forwards',
                      }}
                    >
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <div
                      key={tech}
                      className="transition-all duration-300 ease-out"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'fadeInScale 0.3s ease-out forwards',
                      }}
                    >
                      <Badge className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {tech}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <RocketLaunchIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Development Approach
                    </h4>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Built with modern development practices, focusing on
                    scalability, maintainability, and user experience.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <UserGroupIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Target Users
                    </h4>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Designed for {project.category.toLowerCase()} professionals
                    and end-users seeking efficient solutions.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Video Demo Tab */}
          {activeTab === 'demo' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Video Demo
              </h3>
              <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden aspect-video">
                {!isVideoPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div
                        className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-primary-600 transition-colors"
                        onClick={handleVideoToggle}
                      >
                        <PlayIcon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Click to play demo video
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <PlayIcon className="w-6 h-6 text-white" />
                      </div>
                      <p>PropertyApp Demo Video</p>
                      <p className="text-sm text-neutral-300 mt-2">
                        Real-time trading interface demonstration
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Watch a comprehensive demo of PropertyApp&apos;s key features
                including real-time trading, P&amp;L tracking, and portfolio
                analytics.
              </p>
            </div>
          )}

          {/* Screenshots Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              {/* Gallery Grid - 3 columns for web, 4 for mobile */}
              <div className={`grid gap-4 ${
                project.category === 'Mobile Development'
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {project.preview?.screenshots?.map((screenshot, index) => (
                  <React.Fragment key={screenshot.id}>
                    <div
                      className="transition-all duration-300 ease-out"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'fadeInUp 0.3s ease-out forwards',
                      }}
                    >
                      {/* Conditional rendering: PhoneFrame for mobile, regular image for web */}
                      {project.category === 'Mobile Development' ? (
                        <PhoneFrame
                          src={screenshot.src}
                          alt={`${project.name} - ${screenshot.title}`}
                          className="mb-4"
                          showHoverEffect={true}
                        />
                      ) : (
                        <div className="mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
                          <img
                            src={screenshot.src}
                            alt={`${project.name} - ${screenshot.title}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {screenshot.title}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                          {screenshot.description}
                        </p>
                      </div>
                    </div>

                    {/* Add divider after every row */}
                    {project.category === 'Mobile Development'
                      ? (index + 1) % 4 === 0 &&
                        index <
                          (project.preview?.screenshots?.length || 0) - 1 && (
                          <div className="col-span-full">
                            <SectionDivider className="pb-4" />
                          </div>
                        )
                      : (index + 1) % 3 === 0 &&
                        index <
                          (project.preview?.screenshots?.length || 0) - 1 && (
                          <div className="col-span-full">
                            <SectionDivider className="pb-4" />
                          </div>
                        )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex justify-center pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col sm:flex-row gap-4">
              {project.href && project.href !== '#' && (
                <Button
                  href={project.href}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  {project.category === 'Mobile Development'
                    ? 'Download App'
                    : 'View Live Project'}
                </Button>
              )}
              <Button
                onClick={onClose}
                variant="ghost"
                className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold py-3 px-8 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

ProjectModal.displayName = 'ProjectModal';
