'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/education' },
  { label: 'Services', href: '/services' },
];

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link
          href="/"
          className="site-wordmark"
          aria-label="Lin Phone Myint Zaw, home"
        >
          linphone<span>.</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href
                  ? 'page'
                  : pathname.startsWith(`${href}/`)
                    ? 'location'
                    : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <a className="site-header-contact" href="#contact">
          <span>Get in touch</span>
          <ArrowUpRightIcon aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
