'use client';

import React, { useState, useCallback, useMemo } from 'react';
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
  icon: React.ReactNode;
  href: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = React.memo(
  ({ activeTab, dark, toggle, mounted }) => {
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
        className={`sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-extrabold tracking-tight text-lg text-neutral-900 dark:text-neutral-100 transform hover:scale-110 transition-transform duration-200 cursor-pointer"
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
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus:outline-none',
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
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
              <Button href="/lpmz-cv.pdf" download>
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

TabNavigation.displayName = 'TabNavigation';
