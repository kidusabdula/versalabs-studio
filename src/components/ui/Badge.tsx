import type { ProjectKind, ProjectStatus } from '@/content/schema';
import { KIND_BADGE, KIND_LABEL, STATUS_BADGE } from '@/content/labels';
import { BADGE } from './styles';

// The status of a product or project. It is the one place colour appears on the site.
export function StatusBadge({ status, className = '' }: { status: ProjectStatus; className?: string }) {
  return <span className={`${BADGE} ${STATUS_BADGE[status]} ${className}`}>{status}</span>;
}

// What kind of work a client page shows (client project, studio build, research). Neutral.
export function KindBadge({ kind, className = '' }: { kind: ProjectKind; className?: string }) {
  return <span className={`${BADGE} ${KIND_BADGE[kind]} ${className}`}>{KIND_LABEL[kind]}</span>;
}
