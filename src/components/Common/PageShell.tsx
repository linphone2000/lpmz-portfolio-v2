'use client';

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollProgress, Blobs } from '@/components/Common/Effects';
import { TabNavigation } from '@/components/Common/TabNavigation';
import { ScrollToTop } from '@/components/Common/ScrollToTop';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary';
import MotionRoot from '@/components/Motion/MotionRoot';
import { PortfolioDataProvider } from '@/providers/PortfolioDataProvider';

interface PageShellProps {
  children: ReactNode;
}

const getActiveTab = (pathname: string) => {
  if (pathname === '/' || pathname.startsWith('/overview')) return 'home';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/education')) return 'education';
  return 'home';
};

export const PageShell = ({ children }: PageShellProps) => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const activeTab = useMemo(() => getActiveTab(pathname), [pathname]);
  const prevTabRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  return (
    <ErrorBoundary>
      <PortfolioDataProvider>
        <div className="relative min-h-[100dvh] bg-[#090a0c] text-[#f3f0e9]">
          {isHome ? null : (
            <>
              <ScrollProgress />
              <Blobs activeTab={activeTab} />
            </>
          )}
          <TabNavigation activeTab={activeTab} />
          {isHome ? (
            children
          ) : (
            <MotionRoot>
              {children}
              <ScrollToTop />
            </MotionRoot>
          )}
        </div>
      </PortfolioDataProvider>
    </ErrorBoundary>
  );
};
