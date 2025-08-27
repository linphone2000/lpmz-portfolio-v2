'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { Button } from '../Common/Button';
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
          className="grid md:grid-cols-[1.2fr_.8fr] gap-12 items-center"
        >
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
          <Card className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-secondary-400/10 blur-2xl" />
            <div className="relative">
              <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Tech Snapshot</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  ...DATA.skills.frontend,
                  ...DATA.skills.backend,
                  ...DATA.skills.databases,
                ]
                  .slice(0, 12)
                  .map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
              </div>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                Building mobile‑first experiences with strong API and data
                modeling foundations.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
