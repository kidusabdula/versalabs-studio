import Hero from '@/components/sections/Hero';
import ObsidianShowcase from '@/components/sections/ObsidianShowcase';
import CoreCapabilities from '@/components/sections/CoreCapabilities';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FeaturedProjects, { type ShowcaseProject } from '@/components/sections/FeaturedProjects';
import GlobalReach from '@/components/sections/GlobalReach';
import CallToAction from '@/components/sections/CallToAction';
import { getImage, getProjectBySlug } from '@/content/projects';

// The screenshot each home page showcase row uses.
const SHOWCASE_IMAGES: Record<string, string> = {
  'obsidian-erp': '/images/obsidian-erp/mockup-21.webp',
  'threatmatrix-ai': '/images/threatmatrix-ai/mockup-06.webp',
  'pana-sport': '/images/pana-sport/mockup-03.webp',
  'oskaz-ecommerce': '/images/oskaz-ecommerce/mockup-12.webp',
};

export default function Home() {
  const showcase: ShowcaseProject[] = Object.entries(SHOWCASE_IMAGES).flatMap(([slug, src]) => {
    const project = getProjectBySlug(slug);
    return project ? [{ slug, status: project.status, kind: project.kind, image: getImage(project, src) }] : [];
  });
  const obsidian = getProjectBySlug('obsidian-erp');

  return (
    <>
      <Hero />
      <ObsidianShowcase image={obsidian ? getImage(obsidian, SHOWCASE_IMAGES['obsidian-erp']) : undefined} />
      <CoreCapabilities />
      <WhyChooseUs />
      <FeaturedProjects projects={showcase} />
      <GlobalReach />
      <CallToAction />
    </>
  );
}
