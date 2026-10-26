import Link from 'next/link';
import WorkIndex from '@/components/work/WorkIndex';
import { getAllProjects, toCard } from '@/content/projects';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Platforms VersaLabs Studio has designed and built: ERP systems, online stores, ticketing, AI tools and websites. Filter by industry, stack and type.',
  path: '/work',
});

export default function WorkPage() {
  const cards = getAllProjects().map(toCard);

  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      {/* Rendered on the server with no entrance animation: on a phone the
          heading and intro are the first view, so they paint immediately. */}
      <header className="px-6 pt-36 pb-12">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">Our Work</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Client platforms, our own products, studio builds and research. Every card says where the project stands
            today: in production, in beta, an MVP, a prototype, a demo or still in development.
          </p>
        </div>
      </header>

      <WorkIndex cards={cards} />

      <section aria-labelledby="work-cta" className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="work-cta" className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Have something like this in mind?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
            Tell us what you need built. We&apos;ll reply with how we would approach it.
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
