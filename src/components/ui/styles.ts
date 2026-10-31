// The site's shared look, as class strings that server and client components both use. Every colour is a semantic
// token from src/app/globals.css (background, surface, surface-2, foreground, fg-2 to fg-4, line, line-2), so both
// themes follow from one set of classes. Colour appears only on status. docs/03-UI-UX-GUIDELINES.md describes the
// system; use these instead of writing new ones.

// A 1280px column with a 16px gutter on a phone, 24px on a tablet and 40px on a desktop.
export const CONTAINER = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10';

// Vertical rhythm between page sections: 80px on a phone, 112px on a desktop, a hairline between them.
export const SECTION = 'py-20 md:py-24 lg:py-28';
export const RULE = 'border-t border-line';

// A page's first view (its header): room under the navigation bar, less than a full section.
export const PAGE_HEAD = 'pt-12 pb-14 md:pt-20 md:pb-20';

// Type. Outfit for headings (font-display, tighter and heavier) and text, Geist Mono for labels.
export const EYEBROW = 'block font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-fg-3';
export const DISPLAY =
  'font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground text-balance sm:text-[56px] lg:text-[72px]';
export const H1 =
  'font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance sm:text-[48px] lg:text-[60px]';
export const H2 =
  'font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground text-balance sm:text-[38px] lg:text-[46px]';
export const H3 = 'font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-foreground';
export const SUBTITLE = 'font-display text-[20px] leading-[1.35] tracking-[-0.01em] text-fg-2 text-balance md:text-[24px]';
export const LEAD = 'max-w-[62ch] text-[17px] leading-[1.6] text-fg-3 text-pretty sm:text-[18px]';
export const BODY = 'max-w-[68ch] text-[15px] leading-[1.65] text-fg-3 text-pretty';
export const SMALL = 'text-[13px] leading-[1.55] text-fg-3';
// A mono label beside a value: an index number, a fact's name, a year.
export const MONO = 'font-mono text-[12px] uppercase tracking-[0.1em] text-fg-3';

// One button system: 44px tall, an 8px radius. Primary is the foreground colour (white on dark, near-black on light);
// secondary is a hairline.
const BUTTON =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium transition-[background-color,border-color,color,opacity] duration-150';
export const BUTTON_PRIMARY = `${BUTTON} h-11 px-5 text-[15px] bg-foreground text-background hover:opacity-85`;
export const BUTTON_PRIMARY_SMALL = `${BUTTON} h-9 px-3.5 text-[14px] bg-foreground text-background hover:opacity-85`;
export const BUTTON_SECONDARY = `${BUTTON} h-11 px-5 text-[15px] border border-line-2 text-foreground hover:bg-wash hover:border-fg-4`;
export const ICON_BUTTON =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-fg-2 transition-colors hover:border-line-2 hover:bg-wash hover:text-foreground';
export const TEXT_LINK =
  'group/link inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-line-2 underline-offset-[6px] transition-colors hover:decoration-foreground';
// A link inside running text.
export const INLINE_LINK = 'text-foreground underline decoration-line-2 underline-offset-4 hover:decoration-foreground';

// Cards: a 12px radius on the first surface step, with a hairline. A linked card brightens its border on hover and
// nothing moves.
export const CARD = 'rounded-xl border border-line bg-surface';
export const CARD_LINK = `${CARD} group transition-colors duration-150 hover:border-line-2`;

// A ruled table of facts or features: hairlines between cells, no card chrome.
export const RULED_GRID = 'grid gap-px overflow-hidden rounded-xl border border-line bg-line';
export const RULED_CELL = 'bg-background';

// Badges and chips: mono, small, on a hairline. A status badge adds its tone (src/content/labels.ts).
export const BADGE =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em]';
export const CHIP = 'inline-flex items-center rounded-md border border-line px-2 py-1 font-mono text-[12px] leading-none text-fg-2';
// A pill that is also a control or a link (filters, examples).
export const PILL =
  'inline-flex min-h-9 items-center rounded-full border px-4 py-1.5 text-[14px] font-medium transition-colors';
export const PILL_IDLE = 'border-line bg-surface text-fg-2 hover:border-line-2 hover:text-foreground';
export const PILL_ON = 'border-foreground bg-foreground text-background';

// Form fields, recessed on a card.
export const INPUT =
  'w-full rounded-lg border border-line-2 bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-fg-4 transition-colors hover:border-fg-4 focus:border-foreground aria-[invalid=true]:border-err-line';
