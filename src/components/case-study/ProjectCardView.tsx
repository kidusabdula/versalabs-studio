import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import ProductShot, { Plate, isPortrait } from '@/components/ui/ProductShot';
import { KindBadge, StatusBadge } from '@/components/ui/Badge';
import { CARD_LINK } from '@/components/ui/styles';

// The top of a card: a fixed 16:10 box on the card's surface, so every card in a row lines up before its image
// loads.
// - a mockup (already a composed picture) fills the box;
// - a desktop screenshot sits in its browser frame and runs off the bottom edge;
// - a phone screenshot stands in the middle;
// - with no images yet, a plate: a product's scope words, or the project's name.
// The image is decorative here (alt=""): the title names the link, and the project's page shows the same image with
// its full description.
export function CardMedia({ project, sizes, eager = false }: { project: ProjectCard; sizes: string; eager?: boolean }) {
  const cover = project.cover;
  if (!cover) {
    return project.scope ? (
      <Plate flush words={project.scope} top={project.title} foot={project.tagline} className="border-b border-line" />
    ) : (
      <Plate flush title={project.title} top={project.category} foot={project.industry.join(' / ')} className="border-b border-line" />
    );
  }
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
      {cover.kind === 'mockup' ? (
        <Image src={cover.src} alt="" fill sizes={sizes} loading={eager ? 'eager' : undefined} className="object-cover transition-transform duration-500 group-hover:scale-[1.015]" />
      ) : (
        <>
          <div className="grid-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent)]" aria-hidden="true" />
          <div className={`absolute top-5 sm:top-6 ${isPortrait(cover) ? 'inset-x-[32%]' : 'inset-x-5 sm:inset-x-7'}`}>
            <ProductShot image={cover} alt="" sizes={sizes} eager={eager} />
          </div>
        </>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <ArrowUpRight
      className="mt-1.5 h-4 w-4 shrink-0 text-fg-4 transition-[color,transform] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
      aria-hidden="true"
    />
  );
}

// A product: status, name and what it is for, with its scope underneath. `index` is its place in the product order.
export function ProductCard({
  product,
  index,
  headingLevel = 'h3',
  sizes = '(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) 50vw, 400px',
  eager = false,
}: {
  product: ProjectCard;
  index?: number;
  headingLevel?: 'h2' | 'h3';
  sizes?: string;
  eager?: boolean;
}) {
  const Heading = headingLevel;
  return (
    <Link href={product.href} className={`${CARD_LINK} flex h-full flex-col overflow-hidden`}>
      <CardMedia project={product} sizes={sizes} eager={eager} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <StatusBadge status={product.status} />
          {index !== undefined && (
            <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>
        <Heading className="flex items-start justify-between gap-3 font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">
          {product.title}
          <Arrow />
        </Heading>
        <p className="mt-2 text-[15px] leading-[1.55] text-fg-3">{product.subtitle}</p>
        {product.live && (
          <p className="mt-auto pt-5 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-2">Live demo available</p>
        )}
      </div>
    </Link>
  );
}

// One listing card for client work: what kind of work it was and where it stands, so a demo never reads like a
// client's production system.
export default function ProjectCardView({
  project,
  headingLevel = 'h2',
  eager = false,
  sizes = '(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) 50vw, 400px',
}: {
  project: ProjectCard;
  // Heading level inside the page's outline: h2 on a listing, h3 under a section heading.
  headingLevel?: 'h2' | 'h3';
  // The first cards in view load their cover at once; the rest load as they scroll in.
  eager?: boolean;
  sizes?: string;
}) {
  const Heading = headingLevel;
  return (
    <Link href={project.href} className={`${CARD_LINK} flex h-full flex-col overflow-hidden`}>
      <CardMedia project={project} sizes={sizes} eager={eager} />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <KindBadge kind={project.kind} />
          <StatusBadge status={project.status} />
        </div>
        <Heading className="flex items-start justify-between gap-3 font-display text-[21px] font-semibold tracking-[-0.02em] text-foreground">
          {project.title}
          <Arrow />
        </Heading>
        {project.client && project.client !== project.title && (
          <p className="mt-1 text-[14px] font-medium text-fg-2">For {project.client}</p>
        )}
        <p className="mt-2 text-[15px] leading-[1.55] text-fg-3">{project.subtitle}</p>
        <div className="mt-auto pt-6">
          <p className="flex items-center justify-between gap-4 border-t border-line pt-4 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">
            <span>{project.industry.join(' / ')}</span>
            <span>{project.year}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
