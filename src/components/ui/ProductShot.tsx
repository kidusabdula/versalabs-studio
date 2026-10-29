import Image from 'next/image';
import type { GalleryImage, ProjectStatus } from '@/content/schema';
import { StatusBadge } from './Badge';

// How the site shows a product: a straight screenshot in a plain frame, on a
// surface panel. A desktop screen sits in a neutral browser frame at a fixed
// 16:10, a phone screen in a simple phone outline at 9:19.5, and a mockup (an
// image that is already composed) as it is. The frame fixes the shape before
// the image loads, so nothing shifts. Frames carry no colour, only the zinc
// dots of a browser bar.

const DESKTOP_RATIO = 16 / 10;

export function isPortrait(image: Pick<GalleryImage, 'width' | 'height'>) {
  return image.height > image.width;
}

// A screenshot slightly wider than 16:10 (a 16:9 capture) is cropped from the
// top left, where an app keeps its menu and a website its logo.
function desktopFit(image: Pick<GalleryImage, 'width' | 'height'>) {
  return Math.abs(image.width / image.height - DESKTOP_RATIO) < 0.02 ? 'object-cover object-top' : 'object-cover object-left-top';
}

export function BrowserFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-[0_1px_3px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-border px-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-muted" />
        <span className="h-2 w-2 rounded-full bg-muted" />
        <span className="h-2 w-2 rounded-full bg-muted" />
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[2rem] border border-border-hover bg-surface-elevated p-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.35)] ${className}`}>
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.7rem] bg-background">{children}</div>
    </div>
  );
}

interface ShotProps {
  image: GalleryImage;
  sizes: string;
  // The lead shot of a page: preloaded and fetched first.
  priority?: boolean;
  // In the first view on a desktop but not on a phone: loaded at once, not preloaded.
  eager?: boolean;
  // Pass "" where the shot is decorative (a card whose title names the link).
  alt?: string;
  className?: string;
}

// One image in the frame that suits it.
export default function ProductShot({ image, sizes, priority = false, eager = false, alt = image.alt, className = '' }: ShotProps) {
  const picture = (fit: string) => (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={priority}
      fetchPriority={priority ? 'high' : undefined}
      loading={eager && !priority ? 'eager' : undefined}
      className={fit}
    />
  );

  if (image.kind === 'mockup') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-border bg-background ${className}`}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        {picture('object-cover')}
      </div>
    );
  }
  if (isPortrait(image)) return <PhoneFrame className={className}>{picture('object-cover object-top')}</PhoneFrame>;
  return <BrowserFrame className={className}>{picture(desktopFit(image))}</BrowserFrame>;
}

// A product with no screenshots yet: the same frame, holding its name, and on
// its own page its status and one line too. No made-up interface and no stock
// art. In a card, where the badge and the line sit right below, the frame
// holds the name alone.
export function ShotPlaceholder({
  title,
  status,
  line,
  className = '',
}: {
  title: string;
  status?: ProjectStatus;
  line?: string;
  className?: string;
}) {
  const full = Boolean(status && line);
  return (
    <BrowserFrame className={className}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
        {status && <StatusBadge status={status} />}
        <p
          className={`font-semibold tracking-[-0.02em] ${full ? 'text-[26px] text-foreground sm:text-[40px] md:text-[52px]' : 'text-[20px] text-zinc-400 sm:text-[24px]'}`}
        >
          {title}
        </p>
        {line && <p className="max-w-[44ch] text-[14px] text-zinc-400 sm:text-[16px]">{line}</p>}
      </div>
    </BrowserFrame>
  );
}

// A surface panel with generous padding, for a shot that leads a page or a tile.
// `tight` is for a shot beside text, where the panel needs less air.
export function ShotPanel({
  children,
  tight = false,
  className = '',
}: {
  children: React.ReactNode;
  tight?: boolean;
  className?: string;
}) {
  const padding = tight ? 'p-3 sm:p-5' : 'p-3 sm:p-6 md:p-10';
  return <div className={`rounded-2xl border border-border bg-surface ${padding} ${className}`}>{children}</div>;
}
