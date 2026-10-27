import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from '@/components/case-study/CaseStudy';
import { findProject, projectMetadata, relatedTo, sectionParams } from '@/lib/project-page';

type PageProps = { params: Promise<{ slug: string }> };

// Only the slugs from generateStaticParams exist. Anything else, hidden projects
// included, is a hard 404 instead of a streamed not-found page with status 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return sectionParams('work');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = findProject('work', (await params).slug);
  return project ? projectMetadata(project) : {};
}

export default async function Page({ params }: PageProps) {
  const project = findProject('work', (await params).slug);
  if (!project) notFound();
  return <CaseStudy project={project} related={relatedTo(project)} />;
}
