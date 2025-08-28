'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { cx } from '../../lib/utils';
import { useThrottledScroll } from '../../hooks/useThrottledScroll';
import { useExitAnimation } from '../../hooks/useExitAnimation';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  dark: boolean;
  toggle: () => void;
  mounted: boolean;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const TabNavigation: React.FC<TabNavigationProps> = React.memo(
  ({ activeTab, onTabChange, dark, toggle, mounted }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Use exit animation hook for mobile menu
    const { isVisible: isMenuVisible, isExiting, hide: hideMenu, show: showMenu } = useExitAnimation({
      duration: 300,
      onExit: () => setIsMobileMenuOpen(false)
    });

    // Memoize tabs array to prevent unnecessary re-renders
    const tabs: TabItem[] = useMemo(() => [
      {
        id: 'overview',
        label: 'Overview',
        icon: <HomeIcon className="h-4 w-4" />,
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        icon: <BriefcaseIcon className="h-4 w-4" />,
      },
      {
        id: 'education',
        label: 'Education',
        icon: <AcademicCapIcon className="h-4 w-4" />,
      },
    ], []);

    // Memoized callbacks to prevent unnecessary re-renders
    const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTabChange(tabId);
      }
    }, [onTabChange]);

    const handleTabClick = useCallback((tabId: string) => {
      onTabChange(tabId);
      hideMenu();
    }, [onTabChange, hideMenu]);

    const handleMobileMenuToggle = useCallback(() => {
      if (isMobileMenuOpen) {
        hideMenu();
      } else {
        setIsMobileMenuOpen(true);
        showMenu();
      }
    }, [isMobileMenuOpen, hideMenu, showMenu]);

    const handleEscapeKey = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideMenu();
      }
    }, [hideMenu]);

    // Throttled scroll handler for better performance
    const handleScroll = useCallback((currentScrollY: number) => {
      // Show navbar when scrolling up or at top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    // Use throttled scroll hook
    useThrottledScroll(handleScroll, { throttleMs: 16 });

    return (
      <header
        className={`sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => handleTabClick('overview')}
            className="font-extrabold tracking-tight text-lg text-neutral-900 dark:text-neutral-100 transform hover:scale-110 transition-transform duration-200"
            aria-label="Go to overview"
          >
            LPMZ<span className="text-primary-500">.</span>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-3"
            role="tablist"
            aria-label="Portfolio sections"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
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

          <div className="flex items-center gap-4">
            <ThemeToggle dark={dark} toggle={toggle} mounted={mounted} />

            {/* Desktop Download CV Button */}
            <div className="hidden sm:block">
              <Button href="/lpmz-cv.pdf" download>
                Download CV
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              onKeyDown={handleEscapeKey}
              className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <div className="transform rotate-0 opacity-100 transition-all duration-200">
                    <XMarkIcon className="h-6 w-6" />
                  </div>
                ) : (
                  <div className="transform rotate-0 opacity-100 transition-all duration-200">
                    <Bars3Icon className="h-6 w-6" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {(isMobileMenuOpen || isMenuVisible) && (
          <div
            id="mobile-menu"
            className={`md:hidden absolute top-16 right-4 z-50 transition-all duration-300 ease-in-out ${
              isMenuVisible && !isExiting 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Menu Content */}
            <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-lg min-w-[200px]">
              <div className="px-6 py-4 space-y-3">
                {/* Mobile Navigation Tabs */}
                <nav role="tablist" aria-label="Portfolio sections">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      onKeyDown={(e) => handleKeyDown(e, tab.id)}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`tabpanel-${tab.id}`}
                      tabIndex={activeTab === tab.id ? 0 : -1}
                      className={cx(
                        'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                        activeTab === tab.id
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isMenuVisible && !isExiting ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>

                {/* Mobile Download CV Button */}
                <div
                  className="pt-2"
                  style={{
                    animationDelay: '400ms',
                    animation: isMenuVisible && !isExiting ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <Button
                    href="/lpmz-cv.pdf"
                    download
                    className="w-full justify-center"
                  >
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }
);

TabNavigation.displayName = 'TabNavigation';
