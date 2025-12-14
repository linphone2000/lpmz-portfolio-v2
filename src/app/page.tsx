'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ScrollProgress, Blobs } from '@/components/Common/Effects';
import { TabNavigation } from '@/components/Common/TabNavigation';
import { ScrollToTop } from '@/components/Common/ScrollToTop';
import { TabContent } from '@/components/Common/TabContent';
import { ChatBot } from '@/components/Common/ChatBot';

import { ErrorBoundary } from '@/components/Common/ErrorBoundary';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function Portfolio() {
  const { dark, toggle, mounted } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');
  const prevTabRef = useRef<string>(activeTab);

  // Memoized callback to prevent unnecessary re-renders
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Scroll to top when tab changes
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevTabRef.current = activeTab;
    }
  }, [activeTab]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
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
        <div
          key={activeTab}
          className="animate-[fadeInUp_0.3s_ease-out_forwards]"
        >
          <TabContent activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Scroll to top */}
        <ScrollToTop />

        {/* AI Chat Bot */}
        <ChatBot />
      </div>
    </ErrorBoundary>
  );
}
