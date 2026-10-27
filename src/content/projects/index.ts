import { z } from 'zod';
import { projectSchema, type GalleryImage, type Project, type ProjectInput, type ProjectSection } from '../schema';
import obsidianErp from './obsidian-erp';
import safeframe from './safeframe';
import printonlineEt from './printonline-et';
import eventology from './eventology';
import threatmatrixAi from './threatmatrix-ai';
import panaSport from './pana-sport';
import pavilion360 from './pavilion-360';
import oskazEcommerce from './oskaz-ecommerce';
import tamemKitfo from './tamem-kitfo';
import versaFx from './versa-fx';
import versaEstate from './versa-estate';
import rentflow from './rentflow';
import versalabsAde from './versalabs-ade';
import jarvis from './jarvis';
import unlockEthiopiaPotential from './unlock-ethiopia-potential';
import liveAddis from './live-addis';
import minabClothing from './minab-clothing';

// Every project on the site, in listing order. This is the single source of
// truth: the home page, the work listing, the case study pages and the sitemap
// all read from here. Hidden entries (visibility: 'hide') never leave this file,
// so they get no card, no route and no sitemap URL.
const ENTRIES: ProjectInput[] = [
  obsidianErp,
  safeframe,
  printonlineEt,
  eventology,
  threatmatrixAi,
  panaSport,
  pavilion360,
  oskazEcommerce,
  tamemKitfo,
  versaFx,
  versaEstate,
  rentflow,
  versalabsAde,
  jarvis,
  unlockEthiopiaPotential,
  liveAddis,
  minabClothing,
];

function load(entries: ProjectInput[]): Project[] {
  const projects = entries.map((entry) => {
    const result = projectSchema.safeParse(entry);
    if (!result.success) {
      throw new Error(`Project "${entry.slug}" is invalid:\n${z.prettifyError(result.error)}`);
    }
    return result.data;
  });

  const seen = new Set<string>();
  for (const { slug } of projects) {
    if (seen.has(slug)) throw new Error(`Two projects share the slug "${slug}"`);
    seen.add(slug);
  }
  return projects;
}

const VISIBLE: Project[] = load(ENTRIES).filter((project) => project.visibility === 'show');

export function getAllProjects(): Project[] {
  return VISIBLE;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return VISIBLE.find((project) => project.slug === slug);
}

export function getProjectsInSection(section: ProjectSection): Project[] {
  return VISIBLE.filter((project) => project.section === section);
}

// The one place a project's URL is built. Links, the sitemap, canonical URLs,
// JSON-LD and the redirects in next.config.ts all use it.
export function projectPath(project: Pick<Project, 'section' | 'slug'>): string {
  return `/${project.section}/${project.slug}`;
}

// Every visible project, for next.config.ts: old /projects/<slug> URLs and a
// slug requested under the wrong section redirect to the project's real page.
export function getProjectRoutes(): { slug: string; section: ProjectSection }[] {
  return VISIBLE.map(({ slug, section }) => ({ slug, section }));
}

export function getImage(project: Project, src: string): GalleryImage | undefined {
  return project.gallery.find((image) => image.src === src);
}

// What a listing card needs, and nothing more. Client components receive this
// instead of the full project, which keeps the case study text, tech stack and
// gallery out of the listing pages' payload.
export interface ProjectCard {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  tags: string[];
  year: string;
  status: Project['status'];
  kind: Project['kind'];
  industry: Project['industry'];
  stack: Project['stack'];
  heroGradient: string;
  cover?: GalleryImage;
}

export function toCard(project: Project): ProjectCard {
  return {
    slug: project.slug,
    href: projectPath(project),
    title: project.title,
    subtitle: project.subtitle,
    summary: project.summary,
    category: project.category,
    tags: project.tags,
    year: project.year,
    status: project.status,
    kind: project.kind,
    industry: project.industry,
    stack: project.stack,
    heroGradient: project.heroGradient,
    cover: project.cover ? getImage(project, project.cover) : undefined,
  };
}
