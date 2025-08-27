'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Contact } from '../components/Common/contact';
import { ScrollProgress, Blobs } from '../components/Common/Effects';
import { TabNavigation } from '../components/Common/TabNavigation';
import { TabContent } from '../components/Common/TabContent';
import { ScrollToTop } from '../components/Common/ScrollToTop';
import { LoadingSkeleton } from '../components/Common/LoadingSpinner';
import { ErrorBoundary } from '../components/Common/ErrorBoundary';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Portfolio() {
  const { dark, toggle, mounted } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className={dark ? 'dark' : ''}>
        <div className="min-h-screen relative bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
          {/* Global scroll progress */}
          <ScrollProgress />

          {/* Background blobs */}
          <Blobs />

          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            dark={dark}
            toggle={toggle}
            mounted={mounted}
          />

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabContent activeTab={activeTab} />
          </motion.div>

          {/* Contact section always visible */}
          <Contact />

          {/* Scroll to top */}
          <ScrollToTop />
        </div>
      </div>
    </ErrorBoundary>
  );
}
