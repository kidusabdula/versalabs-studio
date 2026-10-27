import type { ProjectKind, ProjectStatus } from './schema';

// One mapping for project badges on the home page, the work listing and the
// case study pages, so a status or kind always reads and looks the same.

export const KIND_LABEL: Record<ProjectKind, string> = {
  product: 'Product',
  client: 'Client Project',
  internal: 'Studio Build',
  research: 'Research',
};

export const KIND_BADGE: Record<ProjectKind, string> = {
  product: 'text-blue-400 bg-blue-500/10 border border-blue-500/20',
  client: 'text-violet-400 bg-violet-500/10 border border-violet-500/20',
  internal: 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20',
  research: 'text-zinc-300 bg-white/[0.04] border border-white/[0.08]',
};

// Emerald: running in production. Amber: early or partial (beta, MVP,
// prototype, demo). Violet: still in development (Development, Coming Soon).
const EMERALD = 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20';
const AMBER = 'text-amber-400 bg-amber-500/10 border border-amber-500/20';
const VIOLET = 'text-violet-400 bg-violet-500/10 border border-violet-500/20';

export const STATUS_BADGE: Record<ProjectStatus, string> = {
  Production: EMERALD,
  Beta: AMBER,
  MVP: AMBER,
  Prototype: AMBER,
  Demo: AMBER,
  Development: VIOLET,
  'Coming Soon': VIOLET,
};

// Statuses for software that isn't released yet. A product in one of these
// with no public demo offers "Get Notified" instead of "Request a Demo".
export const IN_DEVELOPMENT: ProjectStatus[] = ['Development', 'Coming Soon'];

// The one call to action on a page, decided by what the visitor can actually
// do next (docs/05-CONTENT-TONE-GUIDE.md):
// - a product with a public demo: try it;
// - a product that hasn't shipped and has no demo: hear when it does;
// - a product in production: ask for a demo;
// - client work: start a similar project.
// The contact form reads `topic` and `interest` to start the message for them.
export interface CallToAction {
  label: string;
  href: string;
  external: boolean;
}

export function callToAction(project: {
  slug: string;
  section: 'work' | 'products';
  status: ProjectStatus;
  links: { live?: string };
}): CallToAction {
  if (project.section === 'work') {
    return { label: 'Start a Similar Project', href: `/contact?topic=${project.slug}&interest=similar`, external: false };
  }
  if (project.links.live) return { label: 'Try the Live Demo', href: project.links.live, external: true };
  if (IN_DEVELOPMENT.includes(project.status)) {
    return { label: 'Get Notified', href: `/contact?topic=${project.slug}&interest=notify`, external: false };
  }
  return { label: 'Request a Demo', href: `/contact?topic=${project.slug}&interest=demo`, external: false };
}

// One line under the status badge on a product page.
export const AVAILABILITY: Record<ProjectStatus, string> = {
  Production: 'Available now, and running for businesses today.',
  Beta: 'Available now in beta.',
  MVP: 'Available now as a first release.',
  Prototype: 'A working prototype.',
  Demo: 'A working demo with sample data.',
  Development: 'In development. It has not launched yet.',
  'Coming Soon': 'Coming soon. It is close to launch.',
};
