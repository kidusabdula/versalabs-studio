import Link from 'next/link';
import { pageMetadata } from '@/lib/site';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, H1_QUIET, LEAD } from '@/components/ui/styles';

// Notes replaces the old "coming soon" blog. Until the first note is published
// it stays out of the index and the sitemap.
export const metadata = pageMetadata({
  title: 'Notes',
  description: 'News and updates from VersaLabs Studio.',
  path: '/notes',
  noindex: true,
});

export default function NotesPage() {
  return (
    <div className={`${CONTAINER} flex min-h-[70svh] items-center justify-center py-16 md:py-28`}>
      <div className="max-w-xl text-center">
        <h1 className={H1_QUIET}>Notes</h1>
        <p className={`${LEAD} mx-auto mt-6 mb-10`}>
          Short news and updates on our products and client launches will be published here. There are no notes yet.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/work"
            className={BUTTON_PRIMARY}
          >
            See Client Work
          </Link>
          <Link
            href="/products"
            className={BUTTON_SECONDARY}
          >
            See Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}
