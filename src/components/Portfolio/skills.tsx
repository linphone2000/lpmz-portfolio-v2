'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';


export const Skills: React.FC = () => {
  const skillCategories = [
    { title: 'Frontend', skills: DATA.skills.frontend, icon: '🎨' },
    { title: 'Backend', skills: DATA.skills.backend, icon: '⚙️' },
    { title: 'Databases', skills: DATA.skills.databases, icon: '🗄️' },
    { title: 'Languages', skills: DATA.skills.languages, icon: '💻' },
    { title: 'Tools', skills: DATA.skills.tools, icon: '🛠️' },
    { title: 'AI/ML', skills: DATA.skills.aiml, icon: '🤖' },
    { title: 'Soft Skills', skills: DATA.skills.soft, icon: '🤝' },
  ];

  return (
    <section className="py-16 relative">

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Skills & Technologies
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and tools I use to
            build modern applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="text-2xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-neutral-100 dark:bg-neutral-800 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
