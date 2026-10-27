import { z } from 'zod';

// The shape of every project and product on the site. Each one lives in its own
// file under src/content/projects/ and is checked against this schema when the
// site builds, so a missing field or a bad link fails the build instead of
// shipping.

export const PROJECT_STATUSES = ['Production', 'Beta', 'MVP', 'Prototype', 'Demo', 'Development'] as const;
export const PROJECT_KINDS = ['client', 'product', 'internal', 'research'] as const;

const text = z.string().trim().min(1);

const techDependency = z.strictObject({
  name: text,
  version: text.optional(),
  purpose: text,
});

const techLayer = z.strictObject({
  label: text,
  items: z.array(techDependency).min(1),
});

const boundedContext = z.strictObject({
  name: text,
  responsibility: text,
  entities: z.array(text),
});

const schemaTable = z.strictObject({
  name: text,
  description: text,
  keyFields: z.array(text),
});

const feature = z.strictObject({
  title: text,
  description: text,
});

const adr = z.strictObject({
  id: text,
  title: text,
  status: z.enum(['Accepted', 'Proposed', 'Deprecated']),
  rationale: text,
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
  reviewed: z.literal(true),
});

const links = z.strictObject({
  live: z.url({ protocol: /^https$/ }).optional(),
  repo: z.url({ protocol: /^https$/, hostname: /^github\.com$/ }).optional(),
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
    client: text.optional(),
    links,
    visibility: z.enum(['show', 'hide']).default('show'),
    heroGradient: text,
    cover: z.string().optional(),
    gallery: z.array(galleryImage),

    description: text,
    businessProblem: text,
    architecturalSolution: text,
    systemFlow: text,

    techStack: z.array(techLayer),
    architecture: z.strictObject({
      pattern: text,
      diagram: text,
      designPatterns: z.array(text),
    }),
    boundedContexts: z.array(boundedContext),
    schema: z.array(schemaTable),
    features: z.array(feature),
    adrs: z.array(adr),
  })
  .superRefine((project, ctx) => {
    const srcs = project.gallery.map((image) => image.src);
    if (new Set(srcs).size !== srcs.length) {
      ctx.addIssue({ code: 'custom', path: ['gallery'], message: 'an image is listed twice' });
    }
    if (project.cover && !srcs.includes(project.cover)) {
      ctx.addIssue({ code: 'custom', path: ['cover'], message: 'the cover must be one of the gallery images' });
    }
  });

export type ProjectInput = z.input<typeof projectSchema>;
export type Project = z.output<typeof projectSchema>;
export type ProjectStatus = Project['status'];
export type ProjectKind = Project['kind'];
export type TechLayer = Project['techStack'][number];
export type BoundedContext = Project['boundedContexts'][number];
export type SchemaTable = Project['schema'][number];
export type Feature = Project['features'][number];
export type ADRRecord = Project['adrs'][number];
export type GalleryImage = Project['gallery'][number];

// Typed authoring helper: an editor flags mistakes while writing a project file,
// and the build validates the whole set again in src/content/projects/index.ts.
export function defineProject(project: ProjectInput): ProjectInput {
  return project;
}
