'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollProgress, Blobs } from '@/components/Common/Effects';
import { TabNavigation } from '@/components/Common/TabNavigation';
import { ScrollToTop } from '@/components/Common/ScrollToTop';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary';
import { useDarkMode } from '@/hooks/useDarkMode';

interface PageShellProps {
  children: React.ReactNode;
}

const getActiveTab = (pathname: string) => {
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/education')) return 'education';
  if (pathname.startsWith('/overview')) return 'experience';
  // home and any service-related paths
  return 'home';
};

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const { dark, toggle, mounted } = useDarkMode();
  const pathname = usePathname();
  const activeTab = useMemo(() => getActiveTab(pathname), [pathname]);
  const prevTabRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  if (!mounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <ScrollProgress />
        <Blobs activeTab={activeTab} />

        <TabNavigation
          activeTab={activeTab}
          dark={dark}
          toggle={toggle}
          mounted={mounted}
        />

        <div className="animate-[fadeInUp_0.3s_ease-out_forwards]">
          {children}
        </div>

        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
};

PageShell.displayName = 'PageShell';
