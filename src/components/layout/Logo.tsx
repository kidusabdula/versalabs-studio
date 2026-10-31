// The VersaLabs mark, traced from public/versalabs-logo.png as four flat facets. Inline, so it paints with the HTML
// (no image request in the first view) and follows the theme through --logo-1/2/3 in src/app/globals.css: the light
// mark on dark, the dark mark on light. Decorative: the wordmark beside it, or the link's label, names it.
export default function Logo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 608 518" className={className} aria-hidden="true" focusable="false">
      <path d="M0 0H207V347Z" fill="var(--logo-1)" />
      <path d="M207 0L410 347H207Z" fill="var(--logo-2)" />
      <path d="M410 0H608L410 347L311 178Z" fill="var(--logo-3)" />
      <path d="M207 347H410L310 518Z" fill="var(--logo-1)" />
    </svg>
  );
}
