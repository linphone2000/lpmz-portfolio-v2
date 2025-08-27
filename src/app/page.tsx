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
        <div className="min-h-screen relative bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,195,247,0.18),transparent_60%),radial-gradient(60%_70%_at_100%_30%,rgba(2,119,189,0.12),transparent_60%),linear-gradient(180deg,#F8FAFC,transparent_40%)] dark:bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,195,247,0.12),transparent_60%),linear-gradient(180deg,#0B1220,transparent_50%)] text-slate-900 dark:text-slate-100">
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
