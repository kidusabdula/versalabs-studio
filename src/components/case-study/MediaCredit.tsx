import type { Credit } from '@/content/schema';

// The licence credit for third-party material inside a screenshot or a loop, worded as the licence asks: what it is,
// its title, its author, the licence (linked) and where it comes from (linked). Shown wherever that material is.
// `onDark`: inside the full-size viewer, which is black in both themes.
export default function MediaCredit({ credit, className = '', onDark = false }: { credit: Credit; className?: string; onDark?: boolean }) {
  const link = `underline underline-offset-2 transition-colors ${onDark ? 'hover:text-white' : 'hover:text-foreground'}`;
  return (
    <small className={`text-[12px] leading-relaxed ${onDark ? 'text-white/80' : 'text-fg-3'} ${className}`}>
      {credit.label}: &quot;{credit.title}&quot; by {credit.author},{' '}
      <a href={credit.licenseUrl} target="_blank" rel="license noopener noreferrer" className={link}>
        {credit.license}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      , via{' '}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {credit.source}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </small>
  );
}
