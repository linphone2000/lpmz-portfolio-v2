import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import { Projects } from '@/components/Portfolio/projects';
import { Skills } from '@/components/Portfolio/skills';

export const metadata: Metadata = {
  title: 'Portfolio – Lin Phone Myint Zaw',
  description: 'Selected projects and technical skills of Lin Phone Myint Zaw.',
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <Projects />
      <Skills />
    </PageShell>
  );
}
