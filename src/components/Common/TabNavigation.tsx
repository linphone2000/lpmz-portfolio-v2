'use client';

import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface TabNavigationProps {
  activeTab: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/', index: '01' },
  { id: 'services', label: 'Services', href: '/services', index: '02' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio', index: '03' },
  { id: 'education', label: 'Education', href: '/education', index: '04' },
];

export const TabNavigation = ({ activeTab }: TabNavigationProps) => {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Lin Phone home">
        linphone<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={active ? 'active' : undefined}
              aria-current={active ? 'page' : undefined}
            >
              {item.label} <span>{item.index}</span>
            </Link>
          );
        })}
      </nav>
      <a className="header-contact" href="/#contact">
        Let’s talk <ArrowUpRightIcon />
      </a>
    </header>
  );
};

TabNavigation.displayName = 'TabNavigation';
