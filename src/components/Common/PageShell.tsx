'use client';

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollProgress, Blobs } from '@/components/Common/Effects';
import { TabNavigation } from '@/components/Common/TabNavigation';
import { ScrollToTop } from '@/components/Common/ScrollToTop';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary';
import MotionRoot from '@/components/Motion/MotionRoot';
import { useDarkMode } from '@/hooks/useDarkMode';
import { PortfolioDataProvider } from '@/providers/PortfolioDataProvider';

interface PageShellProps {
  children: ReactNode;
}

const getActiveTab = (pathname: string) => {
  if (pathname === '/' || pathname.startsWith('/overview')) return 'home';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/education')) return 'about';
  return 'home';
};

export const PageShell = ({ children }: PageShellProps) => {
  const { dark, toggle, mounted } = useDarkMode();
  const pathname = usePathname();
  const activeTab = useMemo(() => getActiveTab(pathname), [pathname]);
  const prevTabRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  if (!mounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <PortfolioDataProvider>
        <div className="relative min-h-[100dvh] bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
          <ScrollProgress />
          <Blobs activeTab={activeTab} />

          <TabNavigation
            activeTab={activeTab}
            dark={dark}
            toggle={toggle}
            mounted={mounted}
          />

          <MotionRoot>{children}</MotionRoot>

          <ScrollToTop />
        </div>
      </PortfolioDataProvider>
    </ErrorBoundary>
  );
};