'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../lib/data';
import { Button } from '../components/Common/Button';
import { Hero } from '../components/Sections/hero';
import { Experience } from '../components/Sections/experience';
import { Projects } from '../components/Sections/projects';
import { Skills } from '../components/Sections/skills';
import { Education } from '../components/Sections/education';
import { Contact } from '../components/Sections/contact';
import { ScrollProgress, Blobs } from '../components/Common/Effects';
import { Card } from '../components/Common/Card';
import { Badge } from '../components/Common/Badge';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

// Dark mode hook with SSR safety
function useDarkMode() {
  const [dark, setDark] = useState<boolean>(false); // Start with false for SSR
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Get the theme from localStorage
    const saved = localStorage.getItem('lpmz.theme');
    if (saved === 'dark') {
      setDark(true);
    } else if (saved === 'light') {
      setDark(false);
    } else {
      // Only use system preference if no manual preference is saved
      try {
        const systemDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setDark(systemDark);
        // Save the system preference as the initial choice
        localStorage.setItem('lpmz.theme', systemDark ? 'dark' : 'light');
      } catch {
        setDark(false);
        localStorage.setItem('lpmz.theme', 'light');
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('lpmz.theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark, mounted]);

  // Listen for system theme changes (only if user hasn't manually set a preference)
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('lpmz.theme');
      // Only update if user hasn't manually set a preference
      if (!saved) {
        setDark(e.matches);
        localStorage.setItem('lpmz.theme', e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const toggle = () => setDark((d) => !d);
  return { dark, toggle, mounted } as const;
}

// Tab navigation component
const TabNavigation: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ activeTab, onTabChange }) => {
  const { dark, toggle, mounted } = useDarkMode();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '' },
    { id: 'portfolio', label: 'Portfolio', icon: '' },
    { id: 'education', label: 'Education', icon: '' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-[#0B1220]/50 border-b border-black/5 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => onTabChange('overview')}
          className="font-extrabold tracking-tight text-lg"
        >
          LPMZ<span className="text-sky-600">.</span>
        </motion.button>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'hover:bg-black/5 dark:hover:bg-white/10'
              )}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
            {mounted && dark ? '☀️' : '🌙'}
          </Button>
          <Button href={`mailto:${DATA.email}`}>Contact</Button>
        </div>
      </div>
    </header>
  );
};

// Featured Project Component
const FeaturedProject: React.FC = () => {
  const featuredProject =
    DATA.projects.find((p) => p.highlight) || DATA.projects[0];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Project</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A showcase of my most impactful work, demonstrating technical skills
            and problem-solving approach.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated border container */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 animate-gradient-x">
            <div className="bg-white dark:bg-[#0B1220] rounded-2xl p-8">
              <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold">
                      {featuredProject.name}
                    </h3>
                    <Badge className="bg-sky-500/10 text-sky-700 dark:text-sky-300">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {featuredProject.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.stack.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-slate-100 dark:bg-slate-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {featuredProject.href && (
                    <Button
                      href={featuredProject.href}
                      className="w-full md:w-auto"
                    >
                      View Project Details →
                    </Button>
                  )}
                </div>
                <div className="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Interactive demo available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Tab Content Components
const OverviewTab: React.FC = () => (
  <div>
    <Hero />
    <FeaturedProject />
    <Experience />
  </div>
);

const PortfolioTab: React.FC = () => (
  <div>
    <Projects />
    <Skills />
  </div>
);

const EducationTab: React.FC = () => (
  <div>
    <Education />
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Certifications</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Professional certifications and continuous learning achievements.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.certs.map((cert, index) => (
            <Card key={index} className="text-center">
              <div className="text-2xl mb-3">🏆</div>
              <h3 className="font-semibold mb-2">{cert}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default function Portfolio() {
  const { dark, mounted } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,195,247,0.18),transparent_60%),radial-gradient(60%_70%_at_100%_30%,rgba(2,119,189,0.12),transparent_60%),linear-gradient(180deg,#F8FAFC,transparent_40%)] text-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'portfolio':
        return <PortfolioTab />;
      case 'education':
        return <EducationTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen relative bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,195,247,0.18),transparent_60%),radial-gradient(60%_70%_at_100%_30%,rgba(2,119,189,0.12),transparent_60%),linear-gradient(180deg,#F8FAFC,transparent_40%)] dark:bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,195,247,0.12),transparent_60%),linear-gradient(180deg,#0B1220,transparent_50%)] text-slate-900 dark:text-slate-100">
        {/* Global scroll progress */}
        <ScrollProgress />

        {/* Background blobs */}
        <Blobs />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Contact section always visible */}
        <Contact />

        {/* Scroll to top */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 rounded-full bg-black text-white dark:bg-white dark:text-black w-11 h-11 grid place-items-center shadow-lg transition-all duration-200"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      </div>
    </div>
  );
}
