import { z } from 'zod';

// The shape of every project and product on the site. Each one lives in its own
// file under src/content/projects/ and is checked against this schema when the
// site builds, so a missing field or a bad link fails the build instead of
// shipping.

// `Coming Soon` is a product in development that is close to launch; it shares
// the in-development badge colour and calls to action with `Development`.
export const PROJECT_STATUSES = ['Production', 'Beta', 'MVP', 'Prototype', 'Demo', 'Development', 'Coming Soon'] as const;
export const PROJECT_KINDS = ['client', 'product', 'internal', 'research'] as const;

// Where a project's page lives: /work/<slug> or /products/<slug>. A product
// defaults to /products and everything else to /work; `section` overrides that.
export const SECTIONS = ['work', 'products'] as const;

// The filter vocabularies on /work. Each project picks from these lists, so two
// projects never spell the same filter differently.
export const INDUSTRIES = [
  'Manufacturing',
  'E-Commerce',
  'Printing',
  'Events',
  'Finance',
  'Real Estate',
  'Hospitality',
  'Sports & Media',
  'Cybersecurity',
  'Online Safety',
  'Developer Tools',
  'Blockchain',
  'Nonprofit',
] as const;

const text = z.string().trim().min(1);

// `image` (optional) is the screenshot that shows the feature: one of the
// project's gallery screenshots, shown beside it on the page.
const feature = z.strictObject({
  title: text,
  description: text,
  image: z.string().optional(),
});

// Credit for third-party material that appears in an image or a loop, such as
// a Creative Commons clip filmed inside a demo. The page shows it next to the
// image or loop, wherever that appears (the gallery, the lightbox, the loop).
const credit = z.strictObject({
  label: text, // what it is, e.g. "Sample video"
  title: text,
  author: text,
  license: text,
  licenseUrl: z.url({ protocol: /^https$/ }),
  source: text,
  sourceUrl: z.url({ protocol: /^https$/ }),
});

// Every image that ships is listed here. `reviewed: true` records that a person
// checked it shows no real customer data, revenue or admin screens.
// scripts/check-images.mjs fails the build if public/images holds a file that no
// project lists, or a project lists a file that doesn't exist.
const galleryImage = z.strictObject({
  src: z.string().regex(/^\/images\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/),
  alt: z.string().trim().min(10),
  kind: z.enum(['mockup', 'screen']),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: credit.optional(),
  reviewed: z.literal(true),
});

// A short, silent screen recording (MP4, H.264) shown near the top of the case
// study. Its poster is one of the project's gallery images, the same page in
// the same state: it paints first, it is all a visitor sees with reduced motion
// on, and the video loads only when it scrolls into view. Videos live in
// public/media/<slug>/ and follow the same listing rule as images.
const loop = z.strictObject({
  src: z.string().regex(/^\/media\/[a-z0-9-]+\/[a-z0-9-]+\.mp4$/),
  poster: z.string(),
  caption: z.string().trim().min(10),
  view: z.enum(['desktop', 'mobile']),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: credit.optional(),
  reviewed: z.literal(true),
});

// An outcome shown on a case study. Only verified numbers belong here, and
// `evidence` says where each one comes from (it is not shown on the page).
const metric = z.strictObject({
  label: text,
  value: text,
  evidence: text,
});

// A public link a visitor can open: a client's live site, or a product's demo.
const links = z.strictObject({
  live: z.url({ protocol: /^https$/ }).optional(),
});

export const projectSchema = z
  .strictObject({
    slug: z.string().regex(/^[a-z0-9]+(?:[-.][a-z0-9]+)*$/),
    title: text,
    subtitle: text,
    summary: text,
    category: text,
    tags: z.array(text).min(1),
    year: z.string().regex(/^20\d\d$/),
    status: z.enum(PROJECT_STATUSES),
    kind: z.enum(PROJECT_KINDS),
    section: z.enum(SECTIONS).optional(),
    industry: z.array(z.enum(INDUSTRIES)).min(1),
    // Shown on the case study when set. Leave it out to keep a client unnamed.
    client: text.optional(),
    links,
    visibility: z.enum(['show', 'hide']).default('show'),
    metrics: z.array(metric).default([]),
    heroGradient: text,
    cover: z.string().optional(),
    gallery: z.array(galleryImage),
    loops: z.array(loop).default([]),

    // The words on the page, in plain business language: what it does for the
    // people who use it, never how it is built (docs/05-CONTENT-TONE-GUIDE.md).
    // There are deliberately no fields for architecture, technology or diagrams,
    // and src/content/plain-language.ts fails the build if their names creep
    // back into any text here.
    //
    // description: the value proposition (a product) or the story in brief (work).
    // need: the problem a product solves, or what the client needed.
    // audience: who a product is for. Products only.
    // delivered: what we delivered for the client's business. Work only.
    // features: what you can do with it, benefit first. A product has 3 to 6;
    // client work has up to 4, shown as highlights of what we delivered.
    description: text,
    need: text,
    audience: text.optional(),
    delivered: text.optional(),
    features: z.array(feature).max(6),
  })
  .superRefine((project, ctx) => {
    const srcs = project.gallery.map((image) => image.src);
    if (new Set(srcs).size !== srcs.length) {
      ctx.addIssue({ code: 'custom', path: ['gallery'], message: 'an image is listed twice' });
    }
    if (project.cover && !srcs.includes(project.cover)) {
      ctx.addIssue({ code: 'custom', path: ['cover'], message: 'the cover must be one of the gallery images' });
    }
    project.gallery.forEach((image, i) => {
      // A credit is shown in the screenshot gallery and its viewer. The mockup
      // carousel and the listing cards have no caption to show it in.
      if (image.credit && image.kind !== 'screen') {
        ctx.addIssue({ code: 'custom', path: ['gallery', i, 'credit'], message: 'only a screenshot can carry a credit' });
      }
      if (image.credit && image.src === project.cover) {
        ctx.addIssue({ code: 'custom', path: ['cover'], message: 'the cover cannot be an image that needs a credit' });
      }
    });
    project.features.forEach((feature, i) => {
      if (!feature.image) return;
      const image = project.gallery.find((entry) => entry.src === feature.image);
      if (!image || image.kind !== 'screen') {
        ctx.addIssue({ code: 'custom', path: ['features', i, 'image'], message: 'a feature image must be one of the gallery screenshots' });
      }
    });
    const loops = project.loops ?? [];
    if (new Set(loops.map((loop) => loop.src)).size !== loops.length) {
      ctx.addIssue({ code: 'custom', path: ['loops'], message: 'a loop is listed twice' });
    }
    loops.forEach((loop, i) => {
      const poster = project.gallery.find((image) => image.src === loop.poster);
      if (!poster) {
        ctx.addIssue({ code: 'custom', path: ['loops', i, 'poster'], message: 'the poster must be one of the gallery images' });
      } else if (Math.abs(poster.width / poster.height - loop.width / loop.height) > 0.01) {
        ctx.addIssue({ code: 'custom', path: ['loops', i, 'poster'], message: 'the poster and the loop must have the same shape' });
      }
    });
    if (new Set(project.industry).size !== project.industry.length) {
      ctx.addIssue({ code: 'custom', path: ['industry'], message: 'a value is listed twice' });
    }
    // A product page is a landing page: it says who the product is for and
    // what you can do with it. A client page says what we delivered.
    const isProduct = (project.section ?? (project.kind === 'product' ? 'products' : 'work')) === 'products';
    if (isProduct) {
      if (!project.audience) ctx.addIssue({ code: 'custom', path: ['audience'], message: 'a product says who it is for' });
      if (project.delivered) ctx.addIssue({ code: 'custom', path: ['delivered'], message: 'only client work has a "delivered" story' });
      if (project.features.length < 3) ctx.addIssue({ code: 'custom', path: ['features'], message: 'a product lists 3 to 6 features' });
    } else {
      if (!project.delivered) ctx.addIssue({ code: 'custom', path: ['delivered'], message: 'client work says what we delivered' });
      if (project.audience) ctx.addIssue({ code: 'custom', path: ['audience'], message: 'only a product has an audience' });
      if (project.features.length > 4) ctx.addIssue({ code: 'custom', path: ['features'], message: 'client work lists up to 4 highlights' });
    }
  })
  .transform((project) => ({
    ...project,
    section: project.section ?? (project.kind === 'product' ? 'products' : 'work'),
  }));

export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.output<typeof projectSchema>;
export type ProjectStatus = Project['status'];
export type ProjectKind = Project['kind'];
export type ProjectSection = Project['section'];
export type Industry = (typeof INDUSTRIES)[number];
export type Metric = Project['metrics'][number];
export type Feature = Project['features'][number];
export type GalleryImage = Project['gallery'][number];
export type Loop = Project['loops'][number];
export type Credit = NonNullable<GalleryImage['credit']>;

// Typed authoring helper: an editor flags mistakes while writing a project file,
// and the build validates the whole set again in src/content/projects/index.ts.
export function defineProject(project: ProjectInput): ProjectInput {
  return project;
}
