'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from './Card';
import { Button } from './Button';

export const Contact: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sky-500">📧</span>
                  <a
                    href={`mailto:${DATA.email}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors"
                  >
                    {DATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sky-500">📱</span>
                  <a
                    href={`tel:${DATA.phone.replace(/\s/g, '')}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors"
                  >
                    {DATA.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sky-500">📍</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {DATA.location}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button href={`mailto:${DATA.email}`} className="w-full">
                  Send Email
                </Button>
                <Button
                  href={DATA.links.linkedin}
                  variant="ghost"
                  className="w-full"
                >
                  Connect on LinkedIn
                </Button>
                <Button
                  href={DATA.links.portfolio}
                  variant="ghost"
                  className="w-full"
                >
                  View Portfolio
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
