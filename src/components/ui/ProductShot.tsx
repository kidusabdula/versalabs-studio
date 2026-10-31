import Image from 'next/image';
import type { GalleryImage } from '@/content/schema';

// How the site shows a product: a straight screenshot in a plain frame. A desktop screen sits in a neutral browser
// frame at a fixed 16:10, a phone screen in a simple phone outline at 9:19.5, and a mockup (an image that is already
// composed) as it is. The frame fixes the shape before the image loads, so nothing shifts. Frames carry no colour.
// Something with no screenshots yet gets a Plate: its own words on the hairline grid, never a made-up interface.

const DESKTOP_RATIO = 16 / 10;

export function isPortrait(image: Pick<GalleryImage, 'width' | 'height'>) {
  return image.height > image.width;
}

// A screenshot slightly wider than 16:10 (a 16:9 capture) is cropped from the top left, where an app keeps its menu
// and a website its logo.
function desktopFit(image: Pick<GalleryImage, 'width' | 'height'>) {
  return Math.abs(image.width / image.height - DESKTOP_RATIO) < 0.02 ? 'object-cover object-top' : 'object-cover object-left-top';
}

export function BrowserFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line-2 bg-surface-2 shadow-frame ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
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
    <div className={`rounded-[2rem] border border-line-2 bg-surface-2 p-[5px] shadow-frame ${className}`}>
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
        className={`relative w-full overflow-hidden rounded-xl border border-line bg-background ${className}`}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        {picture('object-cover')}
      </div>
    );
  }
  if (isPortrait(image)) return <PhoneFrame className={className}>{picture('object-cover object-top')}</PhoneFrame>;
  return <BrowserFrame className={className}>{picture(desktopFit(image))}</BrowserFrame>;
}

// A product (or a project) with no screenshots yet, shown as type on the hairline grid at 16:10:
// - `words`: what it covers (a product's scope), each in a ruled cell;
// - or, with no words, its `title` set large;
// - `top` and `foot`: one mono line above and below.
// It sizes its type to its own width (a container query), so the same plate works in a card and leading a page.
// `label` makes it an image with that description (leading a page); without one it is decorative (in a card, whose
// text says the same). `flush` drops the border and radius, for a plate that fills a card's media area.
export function Plate({
  words = [],
  title,
  top,
  foot,
  label,
  flush = false,
  className = '',
}: {
  words?: string[];
  title?: string;
  top?: string;
  foot?: string;
  label?: string;
  flush?: boolean;
  className?: string;
}) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <div
      {...a11y}
      className={`@container relative aspect-[16/10] w-full overflow-hidden bg-surface ${flush ? '' : 'rounded-xl border border-line'} ${className}`}
    >
      <div className="grid-paper absolute inset-0 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_45%,#000_35%,transparent_100%)]" />
      <div className="relative flex h-full flex-col justify-between p-4 @md:p-7 @2xl:p-10">
        {top ? <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-3 @md:text-[12px]">{top}</p> : <span />}
        {words.length > 0 ? (
          <ul className={`grid border-t border-l border-line-2 ${words.length === 3 ? 'grid-cols-3' : 'grid-cols-2 @4xl:grid-cols-4'}`}>
            {words.map((word, i) => (
              <li
                key={word}
                className="flex items-end justify-between gap-2 border-r border-b border-line-2 bg-background/40 px-3 pt-5 pb-2.5 @md:px-5 @md:pt-10 @md:pb-4 @2xl:pt-14"
              >
                <span className="font-display text-[15px] font-medium tracking-[-0.02em] text-fg-2 @md:text-[24px] @2xl:text-[34px]">
                  {word}
                </span>
                <span className="font-mono text-[9px] text-fg-4 @md:text-[11px]">{String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        ) : (
          title && (
            <p className="font-display text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] text-fg-2 @md:text-[40px] @2xl:text-[56px]">
              {title}
            </p>
          )
        )}
        {foot ? <p className="font-mono text-[10px] text-fg-3 @md:text-[12px]">{foot}</p> : <span />}
      </div>
    </div>
  );
}

// A surface panel with generous padding, for a shot that leads a page. `tight` is for a shot beside text.
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
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-surface ${padding} ${className}`}>
      <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}
