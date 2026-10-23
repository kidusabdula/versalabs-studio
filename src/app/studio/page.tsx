import { getAllProjects, type ProjectEntry } from '@/config/project-database';
import { getMockupImages, getScreenshotImages } from '@/lib/image-discovery';
import StudioClient from '@/components/studio/StudioClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Studio',
  description:
    'Platforms VersaLabs Studio has designed, built and shipped: ERP systems, e-commerce stores, sports media, AI tools and websites.',
  path: '/studio',
});

export interface StudioProjectData extends ProjectEntry {
  mockupImages: string[];
  screenshotImages: string[];
}

export default function StudioPage() {
  const baseProjects = getAllProjects();
  
  const projectsWithImages: StudioProjectData[] = baseProjects.map(p => ({
    ...p,
    mockupImages: getMockupImages(p.title, p.slug, p.imageDir),
    screenshotImages: getScreenshotImages(p.title, p.slug, p.imageDir),
  }));

  return <StudioClient projects={projectsWithImages} />;
}
