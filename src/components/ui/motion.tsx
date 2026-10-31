// The site's only motion: a section settles upward as it scrolls into view (`.reveal` in src/app/globals.css). It is
// pure CSS, driven by the scroll position, so this is a server component and no motion library ships to the browser.
//
// Never wrap the first view of a page (a hero or a page heading) in Reveal, and never wrap anything that opens a
// full-screen viewer: the viewer renders in a portal for that reason, but keep galleries outside Reveal anyway.

export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'ul' | 'ol';
}) {
  return <Tag className={`reveal ${className}`}>{children}</Tag>;
}
