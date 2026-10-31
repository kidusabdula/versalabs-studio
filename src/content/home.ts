import { getProjectBySlug, getProjectsInSection, toCard, type ProjectCard } from './projects';

// The client stories the home page shows large, by slug: client projects in production, with pictures, one of them
// abroad. A slug that is hidden or missing fails the build instead of leaving a gap. The rest of /work follows them as
// a list. PrintOnline stays a list entry, not a feature, while its place in the portfolio is Kidus's open question.
const FEATURED_WORK = ['oskaz-ecommerce', 'pavilion-360', 'live-addis'];

export function featuredWork(): ProjectCard[] {
  return FEATURED_WORK.map((slug) => {
    const project = getProjectBySlug(slug);
    if (!project || project.section !== 'work') {
      throw new Error(`The home page features "${slug}", but no visible client work has that slug.`);
    }
    return toCard(project);
  });
}

export function moreWork(): ProjectCard[] {
  return getProjectsInSection('work')
    .filter((project) => !FEATURED_WORK.includes(project.slug))
    .map(toCard);
}
