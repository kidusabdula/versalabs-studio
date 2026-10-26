import type { Metadata } from 'next';
import { getAllProjects, getProjectBySlug, getProjectsInSection, projectPath, toCard, type ProjectCard } from '@/content/projects';
import type { Project, ProjectSection } from '@/content/schema';
import { pageMetadata } from '@/lib/site';

// Shared by /work/[slug] and /products/[slug] and their Open Graph images.

export function sectionParams(section: ProjectSection): { slug: string }[] {
  return getProjectsInSection(section).map(({ slug }) => ({ slug }));
}

// A project is only found under its own section; the other section's URL is a
// redirect (next.config.ts), never a second copy of the page.
export function findProject(section: ProjectSection, slug: string): Project | undefined {
  const project = getProjectBySlug(slug);
  return project?.section === section ? project : undefined;
}

export function projectMetadata(project: Project): Metadata {
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: projectPath(project),
    generatedImage: true,
  });
}

// Up to three related projects: a shared industry counts most, then the same
// category, then shared tags and stack. Ties keep the listing order.
export function relatedTo(project: Project, limit = 3): ProjectCard[] {
  const shared = (a: readonly string[], b: readonly string[]) => a.filter((value) => b.includes(value)).length;
  return getAllProjects()
    .filter((other) => other.slug !== project.slug)
    .map((other, order) => ({
      other,
      order,
      score:
        3 * shared(other.industry, project.industry) +
        2 * Number(other.category === project.category) +
        shared(other.tags, project.tags) +
        shared(other.stack, project.stack),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map(({ other }) => toCard(other));
}
