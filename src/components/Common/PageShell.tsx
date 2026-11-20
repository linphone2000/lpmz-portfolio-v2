import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary';
import { TabNavigation } from '@/components/Common/TabNavigation';
import { DATA } from '@/lib/data';
import { PortfolioDataProvider } from '@/providers/PortfolioDataProvider';

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <ErrorBoundary>
      <PortfolioDataProvider>
        <div className="site-shell" id="top">
          <a className="site-skip" href="#main-content">
            Skip to content
          </a>
          <TabNavigation />
          <main id="main-content" tabIndex={-1} className="site-main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </PortfolioDataProvider>
    </ErrorBoundary>
  );
}

function SiteFooter() {
  return (
    <footer
      id="contact"
      className="site-footer"
      aria-labelledby="contact-heading"
    >
      <div className="site-container">
        <div className="site-footer-contact">
          <div className="site-footer-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <h2 id="contact-heading">Let’s work together.</h2>
            <a className="site-footer-email" href={`mailto:${DATA.email}`}>
              {DATA.email} <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
          <nav
            className="site-footer-links"
            aria-label="Social and résumé links"
          >
            <a href={DATA.links.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <a href={DATA.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <a href="/lpmz-cv.pdf" target="_blank" rel="noreferrer">
              Résumé <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </nav>
        </div>
        <div className="site-footer-end">
          <Link
            href="/"
            className="site-wordmark"
            aria-label="Lin Phone Myint Zaw, home"
          >
            linphone<span>.</span>
          </Link>
          <p>{DATA.location}</p>
          <a href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
