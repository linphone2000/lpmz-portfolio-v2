import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import { ServicesContent } from '@/components/Services/ServicesContent';

export const metadata: Metadata = {
  title: 'Services – Lin Phone Myint Zaw',
  description:
    'Professional web and mobile app development services in Myanmar. Full-stack development with modern technologies.',
  openGraph: {
    title: 'Services – Lin Phone Myint Zaw',
    description:
      'Professional web and mobile app development services in Myanmar.',
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesContent />
    </PageShell>
  );
}
