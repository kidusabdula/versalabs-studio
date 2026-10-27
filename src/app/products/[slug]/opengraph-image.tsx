import { OG_SIZE, projectOgImage } from '@/lib/og';
import { findProject, sectionParams } from '@/lib/project-page';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Project card from VersaLabs Studio with the project name, type, status and year';

export function generateStaticParams() {
  return sectionParams('products');
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return projectOgImage(findProject('products', (await params).slug));
}
