import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import ProductShot, { ShotPlaceholder, isPortrait } from '@/components/ui/ProductShot';
import { KindBadge, StatusBadge } from '@/components/ui/Badge';
import { CARD_LINK } from '@/components/ui/styles';

interface Props {
  project: ProjectCard;
  // Heading level inside the page's outline: h2 on a listing, h3 under a section heading.
  headingLevel?: 'h2' | 'h3';
  // The first cards in view load their cover at once; the rest load as they scroll in.
  eager?: boolean;
  sizes?: string;
}

// The top of a card: a fixed 3:2 box, so every card in a row lines up before
// its image loads. A screenshot sits in its frame on the card's surface and runs
// off the bottom edge; a mockup (already a composed picture) fills the box. A
// project with no images shows its name in an empty frame. The image is
// decorative here (alt=""): the title names the link, and the project's page
// shows the same image with its full description.
export function CardMedia({ project, sizes, eager = false }: { project: ProjectCard; sizes: string; eager?: boolean }) {
  const cover = project.cover;
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-border">
      {cover?.kind === 'mockup' ? (
        <Image src={cover.src} alt="" fill sizes={sizes} loading={eager ? 'eager' : undefined} className="object-cover" />
      ) : (
        <div className={`absolute top-5 sm:top-6 ${cover && isPortrait(cover) ? 'inset-x-[30%]' : 'inset-x-5 sm:inset-x-6'}`}>
          {cover ? (
            <ProductShot image={cover} alt="" sizes={sizes} eager={eager} />
          ) : (
            <ShotPlaceholder title={project.title} />
          )}
        </div>
      )}
    </div>
  );
}

// One listing card for /work, the related projects under a page, and anywhere
// else a project is listed. Every card shows the status, and work cards also
// say what kind of work it was, so a demo never reads like a client's
// production system.
export default function ProjectCardView({
  project,
  headingLevel = 'h2',
  eager = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px',
}: Props) {
  const Heading = headingLevel;
  return (
    <Link href={project.href} className={`${CARD_LINK} flex h-full flex-col overflow-hidden`}>
      <CardMedia project={project} sizes={sizes} eager={eager} />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          {project.section === 'work' && <KindBadge kind={project.kind} />}
        </div>

        <Heading className="mb-2 flex items-start justify-between gap-3 text-[19px] font-semibold tracking-[-0.01em] text-foreground">
          {project.title}
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-foreground"
            aria-hidden="true"
          />
        </Heading>
        {project.client && project.client !== project.title && (
          <p className="mb-1 text-[14px] font-medium text-zinc-300">For {project.client}</p>
        )}
        <p className="mb-3 text-[14px] text-zinc-300">{project.subtitle}</p>
        <p className="mb-6 line-clamp-3 flex-1 text-[14px] leading-[1.6] text-zinc-400">{project.summary}</p>

        <p className="mt-auto border-t border-border pt-4 font-mono text-[12px] uppercase tracking-[0.06em] text-zinc-400">
          {project.industry.join(' · ')}
        </p>
      </div>
    </Link>
  );
}
