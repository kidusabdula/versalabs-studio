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

// Statuses for software that isn't released yet. Case studies show these with
// "Ask About ..." instead of "Request a Demo", and demo links say "Demo Data".
export const IN_DEVELOPMENT: ProjectStatus[] = ['Development', 'Coming Soon'];
