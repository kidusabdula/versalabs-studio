import type { MetadataRoute } from 'next';
import { getAllProjects, projectPath } from '@/content/projects';
import { SITE_URL } from '@/lib/site';

// Generated from the project files, so it lists exactly the visible projects,
// each at its own section's URL. Hidden entries, redirects and /notes (empty and
// noindex until its first note) never appear.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/products', '/services', '/about', '/contact', '/privacy'];

  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getAllProjects().map((project) => ({ url: `${SITE_URL}${projectPath(project)}` })),
  ];
}
