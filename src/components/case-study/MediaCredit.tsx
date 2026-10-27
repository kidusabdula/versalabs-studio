import type { Credit } from '@/content/schema';

// The licence credit for third-party material inside a screenshot or a loop,
// worded as the licence asks: what it is, its title, its author, the licence
// (linked) and where it comes from (linked). Shown wherever that material is.
export default function MediaCredit({ credit, className = '' }: { credit: Credit; className?: string }) {
  const link = 'underline underline-offset-2 transition-colors hover:text-white';
  return (
    <small className={`text-[12px] leading-relaxed text-zinc-400 ${className}`}>
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
