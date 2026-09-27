'use client';

import { useState, useCallback, useMemo, type ReactNode } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

import { Button } from '@/components/Common/Button';
import { ThemeToggle } from '@/components/Common/ThemeToggle';
import { cx } from '@/lib/utils';
import { useThrottledScroll } from '@/hooks/useThrottledScroll';

interface TabNavigationProps {
  activeTab: string;
  dark: boolean;
  toggle: () => void;
  mounted: boolean;
}

interface TabItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
}

export const TabNavigation = ({
  activeTab,
  dark,
  toggle,
  mounted,
}: TabNavigationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Memoize tabs array to prevent unnecessary re-renders
  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: 'home',
        label: 'Home',
        icon: <HomeIcon className="h-4 w-4" />,
        href: '/',
      },
      {
        id: 'services',
        label: 'Services',
        icon: <BuildingOffice2Icon className="h-4 w-4" />,
        href: '/services',
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        icon: <BriefcaseIcon className="h-4 w-4" />,
        href: '/portfolio',
      },
      {
        id: 'about',
        label: 'About Me',
        icon: <AcademicCapIcon className="h-4 w-4" />,
        href: '/education',
      },
    ],
    []
  );

  // Memoized callbacks to prevent unnecessary re-renders
  // Throttled scroll handler for better performance
  const handleScroll = useCallback(
    (currentScrollY: number) => {
      // Show navbar when scrolling up or at top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    },
    [lastScrollY]
  );

  // Use throttled scroll hook
  useThrottledScroll(handleScroll, { throttleMs: 16 });

  return (
    <header
      className={cx(
        'sticky top-0 z-40 border-b backdrop-blur transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        'border-neutral-200 bg-white/60 dark:border-neutral-700 dark:bg-neutral-900/50'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="cursor-pointer text-lg font-extrabold tracking-tight text-neutral-900 transition-transform duration-200 hover:scale-110 dark:text-neutral-100"
          aria-label="Go to home"
        >
          LPMZ<span className="text-primary-500">.</span>
        </Link>

        {/* Navigation Tabs - Desktop shows text, Mobile shows only icons */}
        <nav className="flex items-center gap-3" aria-label="Site sections">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={cx(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none',
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              )}
            >
              <span>{tab.icon}</span>
              {/* Hide text on mobile, show on desktop */}
              <span className="hidden md:inline">{tab.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle dark={dark} toggle={toggle} mounted={mounted} />

          {/* Download CV Button - Hide on mobile, show on desktop */}
          <div className="hidden md:block">
            <Button href="/LPMZ%20Resume.docx" download>
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

TabNavigation.displayName = 'TabNavigation';
