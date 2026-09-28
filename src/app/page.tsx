import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import HomePage from '@/components/Home/HomePage';

export const metadata: Metadata = {
  title: 'Home – Lin Phone Myint Zaw',
  description:
    'Overview of Lin Phone Myint Zaw: featured work and professional summary.',
};

export default function Page() {
  return (
    <PageShell>
      <HomePage />
    </PageShell>
  );
}
