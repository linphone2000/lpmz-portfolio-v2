import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import { Hero } from '@/components/Overview/Hero/hero';
import { FeaturedProject } from '@/components/Overview/FeaturedProject/FeaturedProject';
import { Contact } from '@/components/Common/contact';

export const metadata: Metadata = {
  title: 'Home – Lin Phone Myint Zaw',
  description:
    'Overview of Lin Phone Myint Zaw: featured work and professional summary.',
};

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <FeaturedProject />
      <Contact />
    </PageShell>
  );
}
