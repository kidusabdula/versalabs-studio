import { z } from 'zod';
import { projectSchema, type GalleryImage, type Project, type ProjectInput, type ProjectSection } from '../schema';
import { findBannedTerms } from '../plain-language';
import { PRODUCT_SITES } from '../product-sites';
import { AVAILABILITY } from '../labels';
import { isPhoneScreen, leadShots } from '../../lib/shots';
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
const NOT_COPY = new Set(['slug', 'src', 'poster', 'cover', 'image', 'live', 'credit', 'evidence', 'stage']);

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

const LOADED: Project[] = load(ENTRIES);
const VISIBLE: Project[] = LOADED.filter((project) => project.visibility === 'show');

// Each product site link names a visible product and is an absolute https URL.
for (const [slug, url] of Object.entries(PRODUCT_SITES)) {
  const product = VISIBLE.find((project) => project.slug === slug);
  if (!product || product.section !== 'products') throw new Error(`PRODUCT_SITES lists "${slug}", which is not a visible product`);
  if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(url)) throw new Error(`PRODUCT_SITES["${slug}"] must be an https URL, got "${url}"`);
}

// The order products appear in, everywhere they are listed: the home page, /products, the footer and the product
// index. A product not named here follows at the end, in listing order.
const PRODUCT_ORDER = ['obsidian-erp', 'versa-fx', 'rentflow', 'safeframe', 'versa-estate', 'versalabs-ade'];

export function getAllProjects(): Project[] {
  return VISIBLE;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return VISIBLE.find((project) => project.slug === slug);
}

export function getProjectsInSection(section: ProjectSection): Project[] {
  return VISIBLE.filter((project) => project.section === section);
}

// The products, in PRODUCT_ORDER.
export function getProducts(): Project[] {
  const rank = (slug: string) => (PRODUCT_ORDER.includes(slug) ? PRODUCT_ORDER.indexOf(slug) : PRODUCT_ORDER.length);
  return getProjectsInSection('products')
    .map((project, order) => ({ project, order }))
    .sort((a, b) => rank(a.project.slug) - rank(b.project.slug) || a.order - b.order)
    .map(({ project }) => project);
}

// A product's own site, when it has one (src/content/product-sites.ts).
export function productSite(slug: string): string | undefined {
  return PRODUCT_SITES[slug];
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

// Hidden projects' slugs, for next.config.ts: a parked project must still be in
// the content, hidden, so its redirect can't outlive it or shadow a live page.
export function getHiddenSlugs(): string[] {
  return LOADED.filter((project) => project.visibility === 'hide').map((project) => project.slug);
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
  tagline?: string;
  scope?: string[];
  // One line on whether it can be had today: the product's own line, or the status's.
  availability: string;
  // A public demo or live site the visitor can open.
  live: boolean;
  liveUrl?: string;
  // The product's own site, when it has one (src/content/product-sites.ts).
  site?: string;
  cover?: GalleryImage;
  // A product shown only on phones: the phone screens that stand beside its
  // phone cover (see src/lib/shots.ts). Empty for every other cover.
  coverPhones: GalleryImage[];
}

function leadPhones(project: Project): GalleryImage[] {
  const { lead, beside } = leadShots(project);
  return lead && isPhoneScreen(lead) && lead.src === project.cover ? beside : [];
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
    tagline: project.tagline,
    scope: project.scope,
    availability: project.availability ?? AVAILABILITY[project.status],
    live: Boolean(project.links.live),
    liveUrl: project.links.live,
    site: project.section === 'products' ? PRODUCT_SITES[project.slug] : undefined,
    cover: project.cover ? getImage(project, project.cover) : undefined,
    coverPhones: leadPhones(project),
  };
}
