'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { Button } from '../Common/Button';
import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  StarIcon, 
  RocketLaunchIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
export const Hero: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-16"
        >
          {/* Option 1: Main Hero Content */}
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Badge>Available for freelance</Badge>
                <Badge>{DATA.location}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                {DATA.name}
              </h1>
              <div className="mt-2 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
                <Typewriter
                  options={{
                    strings: [
                      `${DATA.title}`,
                      'React Native · MERN · Backend Developer',
                      'Building real products with clean code',
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-2xl">
                {DATA.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={DATA.links.portfolio}>Live Portfolio</Button>
                <Button href={DATA.links.linkedin} variant="ghost">
                  LinkedIn
                </Button>
                <Button
                  href={`tel:${DATA.phone.replace(/\s/g, '')}`}
                  variant="ghost"
                >
                  Call
                </Button>
              </div>
            </div>
            
            {/* Option 4: Enhanced Tech Snapshot */}
            <Card className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-secondary-400/10 blur-2xl" />
              <div className="relative">
                <h3 className="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Tech Expertise</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {DATA.skills.frontend.map((skill) => (
                        <Badge key={skill} className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {DATA.skills.backend.map((skill) => (
                        <Badge key={skill} className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Databases</h4>
                    <div className="flex flex-wrap gap-2">
                      {DATA.skills.databases.map((skill) => (
                        <Badge key={skill} className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  Building mobile‑first experiences with strong API and data modeling foundations.
                </p>
              </div>
            </Card>
          </div>

          {/* Option 1: Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.experience.length}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Years Experience
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.projects.length}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Projects Built
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.skills.frontend.length + DATA.skills.backend.length + DATA.skills.databases.length}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Technologies
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.education.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Qualifications
              </div>
            </motion.div>
          </div>

          {/* Option 2: Recent Achievements */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Recent Achievements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <StarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Distinction Graduate</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Achieved distinction in BSc Computing from Edinburgh Napier University
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <RocketLaunchIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Remote Developer</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Successfully working as a remote React Native developer at HighGround
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <BriefcaseIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">FinTech Experience</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Contributed to FinTech system renewal project at NTT Data Myanmar
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Option 3: Enhanced Contact & Social Links */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Get In Touch</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.a
                href={`mailto:${DATA.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <EnvelopeIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">Email</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{DATA.email}</div>
                </div>
              </motion.a>
              
              <motion.a
                href={`tel:${DATA.phone.replace(/\s/g, '')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <PhoneIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">Phone</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{DATA.phone}</div>
                </div>
              </motion.a>
              
              <motion.a
                href={DATA.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <GlobeAltIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">LinkedIn</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Connect with me</div>
                </div>
              </motion.a>
              
              <motion.a
                href="/lpmz-cv.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">Download CV</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">PDF format</div>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Option 5: Call-to-Action Cards */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">What I Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BriefcaseIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Mobile Development</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Cross-platform React Native apps with clean architecture and excellent UX
                </p>
                <Badge className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  React Native • Expo
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Full-Stack Solutions</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Complete MERN stack applications with robust backend APIs and databases
                </p>
                <Badge className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  MERN • Node.js
                </Badge>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <StarIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Clean Architecture</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Well-documented, maintainable code with strong development practices
                </p>
                <Badge className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  TypeScript • Clean Code
                </Badge>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
