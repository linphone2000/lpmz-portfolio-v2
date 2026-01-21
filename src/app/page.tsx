import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import { Hero } from '@/components/Overview/Hero/hero';
import { FeaturedProject } from '@/components/Overview/FeaturedProject/FeaturedProject';
import { Experience } from '@/components/Overview/Experience/experience';

export const metadata: Metadata = {
  title: 'Home – Lin Phone Myint Zaw',
  description:
    'Overview of Lin Phone Myint Zaw: experience, featured work, and professional summary.',
};

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <FeaturedProject />
      <Experience />
    </PageShell>
  );
}
