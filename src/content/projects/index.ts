import { z } from 'zod';
import { projectSchema, type GalleryImage, type Project, type ProjectInput } from '../schema';
import obsidianErp from './obsidian-erp';
import threatmatrixAi from './threatmatrix-ai';
import jarvis from './jarvis';
import panaSport from './pana-sport';
import pavilion360 from './pavilion-360';
import printonlineEt from './printonline-et';
import oskazEcommerce from './oskaz-ecommerce';
import fastpay from './fastpay';
import unlockEthiopiaPotential from './unlock-ethiopia-potential';
import panaWeb from './pana-web';
import potentia from './potentia';
import liveAddis from './live-addis';
import minabClothing from './minab-clothing';
import tibeb from './tibeb';

// Every project on the site, in listing order. This is the single source of
// truth: the home page, the work listing, the case study pages and the sitemap
// all read from here. Hidden entries (visibility: 'hide') never leave this file,
// so they get no card, no route and no sitemap URL.
const ENTRIES: ProjectInput[] = [
  obsidianErp,
  threatmatrixAi,
  jarvis,
  panaSport,
  pavilion360,
  printonlineEt,
  oskazEcommerce,
  fastpay,
  unlockEthiopiaPotential,
  panaWeb,
  potentia,
  liveAddis,
  minabClothing,
  tibeb,
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

export function getAllSlugs(): string[] {
  return VISIBLE.map((project) => project.slug);
}

export function getImage(project: Project, src: string): GalleryImage | undefined {
  return project.gallery.find((image) => image.src === src);
}

// What a listing card needs, and nothing more. Client components receive this
// instead of the full project, which keeps the case study text, tech stack and
// gallery out of the listing pages' payload.
export interface ProjectCard {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  tags: string[];
  year: string;
  status: Project['status'];
  kind: Project['kind'];
  heroGradient: string;
  cover?: GalleryImage;
}

export function toCard(project: Project): ProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    summary: project.summary,
    category: project.category,
    tags: project.tags,
    year: project.year,
    status: project.status,
    kind: project.kind,
    heroGradient: project.heroGradient,
    cover: project.cover ? getImage(project, project.cover) : undefined,
  };
}
