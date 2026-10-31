import type { FeatureStage, ProjectKind, ProjectStatus } from '@/content/schema';
import { FEATURE_STAGE, KIND_LABEL, STATUS_LABEL, STATUS_TONE, TONE_CLASS, type StatusTone } from '@/content/labels';
import { BADGE } from './styles';

function Tone({ tone, label, className = '' }: { tone: StatusTone; label: string; className?: string }) {
  const { badge, dot } = TONE_CLASS[tone];
  return (
    <span className={`${BADGE} ${badge} ${className}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

// Where a product or project stands. Status is the one place colour appears on the site.
export function StatusBadge({ status, className = '' }: { status: ProjectStatus; className?: string }) {
  return <Tone tone={STATUS_TONE[status]} label={STATUS_LABEL[status]} className={className} />;
}

// A feature's own stage on a product that is still being built.
export function StageBadge({ stage, className = '' }: { stage: FeatureStage; className?: string }) {
  const { label, tone } = FEATURE_STAGE[stage];
  return <Tone tone={tone} label={label} className={className} />;
}

// What kind of work a client page shows (client project, studio build, research). Neutral, with no dot.
export function KindBadge({ kind, className = '' }: { kind: ProjectKind; className?: string }) {
  return <span className={`${BADGE} border-line-2 text-fg-2 ${className}`}>{KIND_LABEL[kind]}</span>;
}
