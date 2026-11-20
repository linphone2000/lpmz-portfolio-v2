import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import Projects from '@/components/Portfolio/projects';
import { Skills } from '@/components/Portfolio/skills';

export const metadata: Metadata = {
  title: 'Selected Work | Lin Phone Myint Zaw',
  description:
    'Explore mobile apps, web platforms, and backend systems built by Lin Phone Myint Zaw, with project roles, screenshots, and technical details.',
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <div className="site-container">
        <Projects />
        <Skills />
      </div>
    </PageShell>
  );
}
