import { getAllProjects, getImage, toCard, type ProjectCard } from '@/content/projects';
import type { GalleryImage } from '@/content/schema';
import StudioClient from '@/components/studio/StudioClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Studio',
  description:
    'Platforms VersaLabs Studio has designed, built and shipped: ERP systems, e-commerce stores, sports media, AI tools and websites.',
  path: '/studio',
});

// The two projects shown large at the top, each with its widest screenshot.
const FEATURED: { slug: string; image: string }[] = [
  { slug: 'obsidian-erp', image: '/images/obsidian-erp/mockup-21.webp' },
  { slug: 'threatmatrix-ai', image: '/images/threatmatrix-ai/mockup-06.webp' },
];

export interface FeaturedCard extends ProjectCard {
  hero?: GalleryImage;
}

export default function StudioPage() {
  const projects = getAllProjects();
  const featured: FeaturedCard[] = FEATURED.flatMap(({ slug, image }) => {
    const project = projects.find((p) => p.slug === slug);
    return project ? [{ ...toCard(project), hero: getImage(project, image) ?? toCard(project).cover }] : [];
  });

  return <StudioClient projects={projects.map(toCard)} featured={featured} />;
}
