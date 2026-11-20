import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import HomePage from '@/components/Home/HomePage';

export const metadata: Metadata = {
  title: 'Lin Phone Myint Zaw | Senior Full-Stack Developer',
  description:
    'Mobile and web engineering by Lin Phone Myint Zaw. Explore SchoolFlow, Perfume Tower, and selected full-stack projects.',
};

export default function Page() {
  return (
    <PageShell>
      <HomePage />
    </PageShell>
  );
}
