import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllSlugs, getAllProjects, type ProjectEntry } from '@/config/project-database';
import { getMockupImages, getScreenshotImages } from '@/lib/image-discovery';
import { pageMetadata } from '@/lib/site';
import ProjectDetailClient from '@/components/studio/ProjectDetailClient';

export interface DetailProjectData extends ProjectEntry {
  mockupImages: string[];
  screenshotImages: string[];
}

export interface SimilarProject {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  heroGradient: string;
  thumbnail?: string;
}

type PageProps = { params: Promise<{ slug: string }> };

// Only slugs from generateStaticParams exist. Anything else, hidden projects
// included, is a hard 404 instead of a streamed not-found page with status 200.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.thumbnail ? { url: project.thumbnail, alt: `${project.title}: ${project.subtitle}` } : undefined,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectWithImages: DetailProjectData = {
    ...project,
    mockupImages: getMockupImages(project.title, project.slug, project.imageDir),
    screenshotImages: getScreenshotImages(project.title, project.slug, project.imageDir),
  };

  // Get similar projects (same category or shared tags, excluding self)
  const allProjects = getAllProjects();
  const similar: SimilarProject[] = allProjects
    .filter(p => p.slug !== project.slug)
    .filter(p => p.category === project.category || p.tags.some(t => project.tags.includes(t)))
    .slice(0, 3)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      heroGradient: p.heroGradient,
      thumbnail: p.thumbnail,
    }));

  return <ProjectDetailClient project={projectWithImages} similarProjects={similar} />;
}
