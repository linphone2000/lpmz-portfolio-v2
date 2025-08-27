'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Button } from './Button';
import { cx } from '../../lib/utils';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  dark: boolean;
  toggle: () => void;
  mounted: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = React.memo(({
  activeTab,
  onTabChange,
  dark,
  toggle,
  mounted,
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '' },
    { id: 'portfolio', label: 'Portfolio', icon: '' },
    { id: 'education', label: 'Education', icon: '' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTabChange(tabId);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => onTabChange('overview')}
          className="font-extrabold tracking-tight text-lg text-neutral-900 dark:text-neutral-100"
          aria-label="Go to overview"
        >
          LPMZ<span className="text-primary-500">.</span>
        </motion.button>

        <nav className="hidden md:flex items-center gap-1" role="tablist" aria-label="Portfolio sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={cx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
            {mounted && dark ? '☀️' : '🌙'}
          </Button>
          <Button href={`mailto:${DATA.email}`}>Contact</Button>
        </div>
      </div>
    </header>
  );
});

TabNavigation.displayName = 'TabNavigation';
