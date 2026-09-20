import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/Common/PageShell';
import CaseStudy from '@/components/Portfolio/CaseStudy';
import {
  getDisplayName,
  getProjectBySlug,
  getProjects,
  getProjectSlug,
  getCaseStudyMeta,
} from '@/lib/project-utils';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: getProjectSlug(project),
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project – Lin Phone Myint Zaw' };
  return {
    title: `${getDisplayName(project)} – Lin Phone Myint Zaw`,
    description: getCaseStudyMeta(project).outcome,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell>
      <CaseStudy project={project} />
    </PageShell>
  );
}
