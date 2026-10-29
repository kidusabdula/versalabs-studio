// The site's shared look, as class strings that server and client components
// both use. Colour comes only from the tokens in globals.css (@theme): the
// background, the two surface steps, zinc text and hairline borders. Depth
// comes from those surface steps and 1px borders, never from glows or blur.
// docs/03-UI-UX-GUIDELINES.md describes the system.

// A 1200px content column with its side gutter.
export const CONTAINER = 'mx-auto w-full max-w-[1248px] px-5 sm:px-6';

// Vertical rhythm between page sections: 64px on phones, 112px on desktop.
export const SECTION = 'py-16 md:py-28';
export const SECTION_RULE = 'border-t border-border';

// Type.
export const EYEBROW = 'mb-4 block font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-400';
export const DISPLAY =
  'text-[38px] font-semibold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[48px] md:text-[64px] lg:text-[72px]';
export const H1_QUIET =
  'text-[36px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[44px] md:text-[56px]';
export const H2 = 'text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[44px]';
export const H3 = 'text-[19px] font-semibold leading-snug tracking-[-0.01em] text-foreground';
export const LEAD = 'max-w-[68ch] text-[17px] leading-[1.6] text-zinc-400 md:text-[18px]';
export const BODY = 'max-w-[68ch] text-[16px] leading-[1.6] text-zinc-400';

// One button system. Primary: white with near-black text. Secondary: a hairline.
const BUTTON = 'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors';
const SIZE = 'h-11 px-6 text-[15px]';
const PRIMARY = 'bg-foreground text-background hover:bg-zinc-200';
export const BUTTON_PRIMARY = `${BUTTON} ${SIZE} ${PRIMARY}`;
export const BUTTON_PRIMARY_SMALL = `${BUTTON} h-9 px-4 text-[14px] ${PRIMARY}`;
export const BUTTON_SECONDARY = `${BUTTON} ${SIZE} border border-border text-foreground hover:border-border-hover hover:bg-white/[0.03]`;
export const TEXT_LINK =
  'inline-flex items-center gap-2 text-[15px] font-medium text-foreground underline-offset-4 transition-colors hover:text-zinc-300 hover:underline';

// Cards: a 16px radius on the first surface step. A linked card only
// brightens its border and lifts 2px on hover.
export const CARD = 'rounded-2xl border border-border bg-surface';
export const CARD_LINK = `${CARD} group transition duration-200 hover:-translate-y-0.5 hover:border-border-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0`;

// Status and kind badges (their colours live in src/content/labels.ts).
export const BADGE = 'inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium leading-none';
