import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import { Education } from '@/components/Education/education';
import { Certifications } from '@/components/Education/certifications';

export const metadata: Metadata = {
  title: 'Education – Lin Phone Myint Zaw',
  description:
    'Education background and certifications of Lin Phone Myint Zaw.',
};

export default function EducationPage() {
  return (
    <PageShell>
      <Education />
      <Certifications />
    </PageShell>
  );
}
