'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
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
  LinkIcon,
  UserIcon,
  KeyIcon,
  CheckIcon,
  InformationCircleIcon,
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
    const [copiedItem, setCopiedItem] = useState<'email' | 'password' | null>(
      null
    );

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

    const handleCopy = useCallback(
      async (text: string, type: 'email' | 'password') => {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedItem(type);
          setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      },
      []
    );

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
              <div
                className={`grid gap-4 ${
                  project.category === 'Mobile Development'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
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
                        <div className="mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 relative">
                          <Image
                            src={screenshot.src}
                            alt={`${project.name} - ${screenshot.title}`}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
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

          {/* Try It Out Section - Moved to bottom */}
          {(project.liveUrl || project.demoAccount) && (
            <div className="p-5 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 border border-primary-200 dark:border-primary-800/50">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Try It Out
              </h3>
              <div className="space-y-4">
                {project.liveUrl && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-500/10 dark:bg-primary-400/10">
                      <LinkIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Live Website
                      </p>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm break-all underline decoration-dotted underline-offset-2 transition-colors"
                      >
                        {project.liveUrl}
                      </a>
                    </div>
                    <Button
                      href={project.liveUrl}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <GlobeAltIcon className="w-4 h-4 mr-2" />
                      Visit Site
                    </Button>
                  </div>
                )}
                {project.startupNote && (
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <InformationCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{project.startupNote}</span>
                  </div>
                )}
                {project.demoAccount && (
                  <div className="pt-3 border-t border-primary-200 dark:border-primary-800/50">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10 dark:bg-green-400/10">
                        <UserIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Demo Account
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              Email:
                            </span>
                            <code className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-800 dark:text-neutral-200 font-mono">
                              {project.demoAccount.email}
                            </code>
                            <button
                              onClick={() =>
                                handleCopy(project.demoAccount!.email, 'email')
                              }
                              className="ml-2 p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors relative"
                              title="Copy email"
                            >
                              {copiedItem === 'email' ? (
                                <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              )}
                            </button>
                            {copiedItem === 'email' && (
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium ml-1">
                                Copied!
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <KeyIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              Password:
                            </span>
                            <code className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-800 dark:text-neutral-200 font-mono">
                              {project.demoAccount.password}
                            </code>
                            <button
                              onClick={() =>
                                handleCopy(
                                  project.demoAccount!.password,
                                  'password'
                                )
                              }
                              className="ml-2 p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors relative"
                              title="Copy password"
                            >
                              {copiedItem === 'password' ? (
                                <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              )}
                            </button>
                            {copiedItem === 'password' && (
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium ml-1">
                                Copied!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex justify-center pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              onClick={onClose}
              variant="ghost"
              className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold py-3 px-8 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

ProjectModal.displayName = 'ProjectModal';
