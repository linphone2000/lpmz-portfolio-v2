'use client';

import React, { useState, useCallback, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ScrollProgress, Blobs } from '../components/Common/Effects';
import { TabNavigation } from '../components/Common/TabNavigation';
import { ScrollToTop } from '../components/Common/ScrollToTop';
import { LoadingSkeleton, LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ErrorBoundary } from '../components/Common/ErrorBoundary';
import { useDarkMode } from '../hooks/useDarkMode';
import { DynamicTabContent, DynamicContact } from '../components/Common/DynamicImport';

export default function Portfolio() {
  const { dark, toggle, mounted } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');

  // Memoized callback to prevent unnecessary re-renders
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Memoize animation variants
  const tabContentVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        {/* Global scroll progress */}
        <ScrollProgress />

        {/* Background blobs */}
        <Blobs activeTab={activeTab} />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          dark={dark}
          toggle={toggle}
          mounted={mounted}
        />

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicTabContent activeTab={activeTab} />
          </Suspense>
        </motion.div>

        {/* Contact section always visible */}
        <Suspense fallback={<LoadingSpinner />}>
          <DynamicContact />
        </Suspense>

        {/* Scroll to top */}
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}
