import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import { KIND_LABEL, KIND_BADGE, STATUS_BADGE } from '@/content/labels';

interface Props {
  project: ProjectCard;
  // Heading level inside the page's outline: h2 on a listing, h3 under a section heading.
  headingLevel?: 'h2' | 'h3';
  // The first cards in view load their cover eagerly; the rest load as they scroll in.
  eager?: boolean;
  sizes?: string;
}

// One listing card for /work, /products and related work. Every card shows the
// status, year and type, so a demo never reads like a production system.
export default function ProjectCardView({
  project,
  headingLevel = 'h2',
  eager = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
}: Props) {
  const Heading = headingLevel;
  return (
    <Link
      href={project.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111113] transition-colors hover:border-white/[0.14]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#0E0E10]">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes={sizes}
            priority={eager}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16161A] to-[#0E0E10]">
            <span className="text-2xl font-semibold tracking-tight text-zinc-400">{project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`rounded-sm px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[project.status]}`}>
            {project.status}
          </span>
          <span className="rounded-sm border border-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-zinc-400">
            {project.year}
          </span>
          <span className={`rounded-sm px-2 py-0.5 text-[11px] font-medium ${KIND_BADGE[project.kind]}`}>
            {KIND_LABEL[project.kind]}
          </span>
        </div>

        <Heading className="mb-2 flex items-start justify-between gap-3 text-xl font-semibold text-white">
          {project.title}
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-white"
            aria-hidden="true"
          />
        </Heading>
        <p className="mb-3 text-[13px] font-medium text-zinc-400">{project.subtitle}</p>
        <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">{project.summary}</p>

        <p className="mt-auto border-t border-white/[0.04] pt-4 text-xs text-zinc-400">
          {project.industry.join(' · ')}
        </p>
      </div>
    </Link>
  );
}
