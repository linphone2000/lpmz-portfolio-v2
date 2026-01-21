import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
// import { ServicesContent } from '@/components/Services/ServicesContent';

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
      {/* <ServicesContent /> */}
      <section className="py-32 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Coming Soon
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            This page is under construction. Check back soon for details about
            my services.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
