import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getAllSlugs, getImage, getProjectBySlug, toCard } from '@/content/projects';
import { pageMetadata } from '@/lib/site';
import ProjectDetailClient from '@/components/studio/ProjectDetailClient';

type PageProps = { params: Promise<{ slug: string }> };

// Only slugs from generateStaticParams exist. Anything else, hidden projects
// included, is a hard 404 instead of a streamed not-found page with status 200.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const cover = project.cover ? getImage(project, project.cover) : undefined;
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: cover ? { url: cover.src, width: cover.width, height: cover.height, alt: cover.alt } : undefined,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Related work: same category or a shared tag, excluding this project.
  const similar = getAllProjects()
    .filter((p) => p.slug !== project.slug)
    .filter((p) => p.category === project.category || p.tags.some((t) => project.tags.includes(t)))
    .slice(0, 3)
    .map(toCard);

  return <ProjectDetailClient project={project} similarProjects={similar} />;
}
