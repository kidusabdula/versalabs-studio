import Link from 'next/link';
import WorkIndex from '@/components/work/WorkIndex';
import { getProjectsInSection, toCard } from '@/content/projects';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Client Work',
  description:
    'Software VersaLabs Studio has delivered for businesses: online stores, ordering and ticketing, event and sports websites, and more. See what each client needed and what we delivered.',
  path: '/work',
});

export default function WorkPage() {
  const cards = getProjectsInSection('work').map(toCard);

  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      {/* Rendered on the server with no entrance animation: on a phone the
          heading and intro are the first view, so they paint immediately. */}
      <header className="px-6 pt-36 pb-12">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">Client Work</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            The businesses we&apos;ve built for, what they needed and what we delivered. Every card says where the work
            stands today, and which pieces are our own builds rather than a client&apos;s.
          </p>
        </div>
      </header>

      <WorkIndex cards={cards} />

      <section aria-labelledby="work-cta" className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="work-cta" className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Have Something Like This in Mind?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
            Tell us about your business and what you want to change. We&apos;ll reply with how we would approach it.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Start a Project
            </Link>
            <Link
              href="/products"
              className="flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#1A1A1A] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#222222]"
            >
              See Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
