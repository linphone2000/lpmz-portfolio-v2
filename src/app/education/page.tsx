import type { Metadata } from 'next';
import { PageShell } from '@/components/Common/PageShell';
import { Experience } from '@/components/Overview/Experience/experience';
import { Education } from '@/components/Education/education';
import { Certifications } from '@/components/Education/certifications';
import { Contact } from '@/components/Common/contact';
import { SectionDivider } from '@/components/Common/SectionDivider';

export const metadata: Metadata = {
  title: 'Education – Lin Phone Myint Zaw',
  description:
    'Education background and certifications of Lin Phone Myint Zaw.',
};

export default function EducationPage() {
  return (
    <PageShell>
      <Experience />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Certifications />
      <Contact />
    </PageShell>
  );
}
