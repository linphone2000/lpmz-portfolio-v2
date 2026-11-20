'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRightIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { setSiteMotion, useSiteMotion } from '@/hooks/useSiteMotion';

const navItems = [
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/education' },
  { label: 'Services', href: '/services' },
];

export function TabNavigation() {
  const pathname = usePathname();
  const motionEnabled = useSiteMotion();

  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link
          href="/"
          className="site-wordmark"
          aria-label="Lin Phone Myint Zaw, home"
        >
          <span className="site-wordmark-full" aria-hidden="true">
            linphone<span>.</span>
          </span>
          <span className="site-wordmark-compact" aria-hidden="true">
            LP<span>.</span>
          </span>
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
        <div className="site-header-actions">
          <button
            aria-label="Motion effects"
            aria-pressed={motionEnabled}
            className="site-motion-button"
            title={
              motionEnabled ? 'Pause motion effects' : 'Enable motion effects'
            }
            type="button"
            onClick={() => setSiteMotion(!motionEnabled)}
          >
            {motionEnabled ? (
              <PauseIcon aria-hidden="true" />
            ) : (
              <PlayIcon aria-hidden="true" />
            )}
          </button>
          <a className="site-header-contact" href="#contact">
            <span>Get in touch</span>
            <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
