import type { ProjectEntry, ProjectStatus } from './project-database';

// One mapping for project badges on the home page, the studio listing and the
// case study pages, so a status or type always reads and looks the same.

export const PRODUCT_TYPE_LABEL: Record<ProjectEntry['productType'], string> = {
  saas: 'Product',
  'client-project': 'Client Project',
  internal: 'Studio Build',
  research: 'Research',
};

export const PRODUCT_TYPE_BADGE: Record<ProjectEntry['productType'], string> = {
  saas: 'text-blue-400 bg-blue-500/10 border border-blue-500/20',
  'client-project': 'text-violet-400 bg-violet-500/10 border border-violet-500/20',
  internal: 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20',
  research: 'text-zinc-300 bg-white/[0.04] border border-white/[0.08]',
};

// Emerald: running in production. Amber: early or partial (beta, MVP,
// prototype, demo). Violet: still in development.
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
};
