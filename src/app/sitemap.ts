import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/content/projects';
import { SITE_URL } from '@/lib/site';

// Generated from the project files, so it lists exactly the visible projects.
// Hidden entries and the /projects redirect never appear.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/studio', '/services', '/about', '/contact', '/privacy'];

  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getAllSlugs().map((slug) => ({ url: `${SITE_URL}/projects/${slug}` })),
  ];
}
