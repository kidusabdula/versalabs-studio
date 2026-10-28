import { z } from 'zod';
import { projectSchema, type GalleryImage, type Project, type ProjectInput, type ProjectSection } from '../schema';
import { findBannedTerms } from '../plain-language';
import obsidianErp from './obsidian-erp';
import safeframe from './safeframe';
import printonlineEt from './printonline-et';
import eventology from './eventology';
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

// Fields that hold paths, links, class names or a licence credit, not copy.
const NOT_COPY = new Set(['slug', 'src', 'poster', 'cover', 'live', 'heroGradient', 'credit', 'evidence']);

// Every piece of copy in a project, with where it sits, for the plain-language check.
function copyIn(value: unknown, at: string, out: { at: string; text: string }[] = []) {
  if (typeof value === 'string') out.push({ at, text: value });
  else if (Array.isArray(value)) value.forEach((item, i) => copyIn(item, `${at}[${i}]`, out));
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) if (!NOT_COPY.has(key)) copyIn(item, at ? `${at}.${key}` : key, out);
  }
  return out;
}

function load(entries: ProjectInput[]): Project[] {
  const projects = entries.map((entry) => {
    const result = projectSchema.safeParse(entry);
    if (!result.success) {
      throw new Error(`Project "${entry.slug}" is invalid:\n${z.prettifyError(result.error)}`);
    }
    // Hidden entries too: a project can be shown again with one line.
    const jargon = copyIn(entry, '').flatMap(({ at, text }) => findBannedTerms(text).map((term) => `${at}: "${term}"`));
    if (jargon.length) {
      throw new Error(
        `Project "${entry.slug}" names how it is built (see src/content/plain-language.ts):\n  ${jargon.join('\n  ')}`,
      );
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
// instead of the full project, which keeps the page text and the gallery out
// of the listing pages' payload.
export interface ProjectCard {
  slug: string;
  href: string;
  section: ProjectSection;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  tags: string[];
  year: string;
  status: Project['status'];
  kind: Project['kind'];
  industry: Project['industry'];
  client?: string;
  heroGradient: string;
  cover?: GalleryImage;
}

export function toCard(project: Project): ProjectCard {
  return {
    slug: project.slug,
    href: projectPath(project),
    section: project.section,
    title: project.title,
    subtitle: project.subtitle,
    summary: project.summary,
    category: project.category,
    tags: project.tags,
    year: project.year,
    status: project.status,
    kind: project.kind,
    industry: project.industry,
    client: project.client,
    heroGradient: project.heroGradient,
    cover: project.cover ? getImage(project, project.cover) : undefined,
  };
}
