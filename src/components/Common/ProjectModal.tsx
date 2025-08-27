'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import {
  CalendarIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  PlayIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface Project {
  name: string;
  stack: string[];
  blurb: string;
  href?: string;
  highlight?: boolean;
  category: string;
  year: number;
  status: string;
  features: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'gallery'>(
    'overview'
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Mock screenshots for PropertyApp
  const mockScreenshots = [
    {
      id: 1,
      title: 'Dashboard Overview',
      description: 'Main trading dashboard with portfolio summary',
    },
    {
      id: 2,
      title: 'Real-time Trading',
      description: 'Live trading interface with buy/sell functionality',
    },
    {
      id: 3,
      title: 'P&L Tracking',
      description: 'Profit and loss tracking with detailed analytics',
    },
    {
      id: 4,
      title: 'Portfolio Analytics',
      description: 'Advanced portfolio performance metrics',
    },
    {
      id: 5,
      title: 'Market Simulation',
      description: 'Trading simulation with market data',
    },
    {
      id: 6,
      title: 'Transaction History',
      description: 'Complete transaction log and history',
    },
  ];

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
              { id: 'gallery', label: 'Screenshots', icon: PhotoIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
                  >
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {feature}
                    </span>
                  </motion.div>
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
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Badge className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {tech}
                    </Badge>
                  </motion.div>
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
                      onClick={() => setIsVideoPlaying(true)}
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
              Watch a comprehensive demo of PropertyApp's key features including
              real-time trading, P&L tracking, and portfolio analytics.
            </p>
          </div>
        )}

        {/* Screenshots Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Screenshots Gallery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockScreenshots.map((screenshot, index) => (
                <motion.div
                  key={screenshot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[9/16] bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg flex items-center justify-center mb-2 hover:shadow-lg transition-shadow">
                    <div className="text-center p-4">
                      <PhotoIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        Screenshot {screenshot.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {screenshot.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {screenshot.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {project.href && project.href !== '#' && (
            <Button href={project.href} className="flex-1">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              {project.category === 'Mobile Development'
                ? 'Download App'
                : 'View Live Project'}
            </Button>
          )}
          <Button onClick={onClose} variant="ghost" className="flex-1">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
