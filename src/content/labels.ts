import type { FeatureStage, ProjectKind, ProjectStatus } from './schema';

// One mapping for project badges on the home page, the listings and the project pages, so a status or kind always
// reads and looks the same.

export const KIND_LABEL: Record<ProjectKind, string> = {
  product: 'Product',
  client: 'Client Project',
  internal: 'Studio Build',
  research: 'Research',
};

// What a status badge says. "Development" reads as "In Development" so nothing unfinished reads as shipped.
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  Production: 'In Production',
  Beta: 'Beta',
  MVP: 'MVP',
  Prototype: 'Prototype',
  Demo: 'Demo',
  Development: 'In Development',
  'Coming Soon': 'Coming Soon',
};

// The status colours are the only colour on the site. Emerald: running in production. Amber: early or partial
// (beta, MVP, prototype, demo). Violet: still in development (Development, Coming Soon). Each is a token pair from
// globals.css, tuned for AA in both themes.
export type StatusTone = 'ok' | 'warn' | 'dev' | 'idle';

export const STATUS_TONE: Record<ProjectStatus, StatusTone> = {
  Production: 'ok',
  Beta: 'warn',
  MVP: 'warn',
  Prototype: 'warn',
  Demo: 'warn',
  Development: 'dev',
  'Coming Soon': 'dev',
};

export const TONE_CLASS: Record<StatusTone, { badge: string; dot: string; text: string }> = {
  ok: { badge: 'text-ok bg-ok-bg border-ok-line', dot: 'bg-ok', text: 'text-ok' },
  warn: { badge: 'text-warn bg-warn-bg border-warn-line', dot: 'bg-warn', text: 'text-warn' },
  dev: { badge: 'text-dev bg-dev-bg border-dev-line', dot: 'bg-dev', text: 'text-dev' },
  idle: { badge: 'text-fg-2 bg-wash border-line-2', dot: 'bg-fg-4', text: 'text-fg-3' },
};

// The key to the status colours, in the footer.
export const TONE_LEGEND: { tone: StatusTone; label: string }[] = [
  { tone: 'ok', label: 'In Production' },
  { tone: 'warn', label: 'Beta, MVP or Demo' },
  { tone: 'dev', label: 'In Development' },
];

// A feature's own stage on a product that is still being built: in development now, or planned for later.
export const FEATURE_STAGE: Record<FeatureStage, { label: string; tone: StatusTone }> = {
  'in-development': { label: 'In Development', tone: 'dev' },
  planned: { label: 'Planned', tone: 'idle' },
};

// Statuses for software that isn't released yet. A product in one of these with no public demo offers "Get
// Notified" instead of "Request a Demo".
export const IN_DEVELOPMENT: ProjectStatus[] = ['Development', 'Coming Soon'];

// The one call to action on a page, decided by what the visitor can actually do next
// (docs/05-CONTENT-TONE-GUIDE.md):
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

// One line on availability, under the status on a product page, unless the product file says it more exactly
// (`availability`).
export const AVAILABILITY: Record<ProjectStatus, string> = {
  Production: 'Available now, and running for businesses today.',
  Beta: 'Available now in beta.',
  MVP: 'Available now as a first release.',
  Prototype: 'A working prototype.',
  Demo: 'A working demo with sample data.',
  Development: 'In development. It has not launched yet.',
  'Coming Soon': 'Coming soon. It is close to launch.',
};
