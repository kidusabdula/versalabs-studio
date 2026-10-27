import Link from 'next/link';
import { pageMetadata } from '@/lib/site';

// Notes replaces the old "coming soon" blog. Until the first note is published
// it stays out of the index and the sitemap.
export const metadata = pageMetadata({
  title: 'Notes',
  description: 'Engineering notes and a changelog from VersaLabs Studio.',
  path: '/notes',
  noindex: true,
});

export default function NotesPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0C] px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white">Notes</h1>
        <p className="mb-10 text-lg leading-relaxed text-zinc-400">
          Short engineering notes, and a changelog of what we ship, will be published here. There are no notes yet.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/work"
            className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            See Our Work
          </Link>
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#1A1A1A] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#222222]"
          >
            See Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}
