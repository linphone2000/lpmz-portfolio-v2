'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';

export const Education: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Education</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My academic background and continuous learning journey in software
            development and computing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {DATA.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="text-2xl mb-3">🎓</div>
                <h3 className="text-lg font-bold mb-2">{edu.school}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  {edu.credential}
                </p>
                <Badge className="bg-sky-500/10 text-sky-700 dark:text-sky-300">
                  {edu.period}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
