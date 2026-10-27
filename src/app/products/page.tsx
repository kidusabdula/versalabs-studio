import Link from 'next/link';
import ProjectCardView from '@/components/case-study/ProjectCardView';
import { getProjectsInSection, toCard } from '@/content/projects';
import { pageMetadata } from '@/lib/site';

const names = getProjectsInSection('products').map((product) => product.title);

export const metadata = pageMetadata({
  title: 'Products',
  description: `Software from VersaLabs Studio, ready to set up for your business: ${names.slice(0, -1).join(', ')} and ${names.at(-1)}. Each one says whether it is available now or coming soon.`,
  path: '/products',
});

export default function ProductsPage() {
  const products = getProjectsInSection('products').map(toCard);

  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      <header className="px-6 pt-36 pb-12">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">Our Products</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Software we build and keep improving, ready to set up for your business. Each one says whether it is
            available now, coming soon or still in development.
          </p>
        </div>
      </header>

      <section aria-label="Products" className="px-6 pb-24">
        <ul className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((card, i) => (
            <li key={card.slug}>
              <ProjectCardView project={card} eager={i === 0} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="products-cta" className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="products-cta" className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
            Want to See One Running?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
            Ask for a walkthrough, or tell us what you would change to fit how your business works.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              Request a Demo
            </Link>
            <Link
              href="/work"
              className="flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#1A1A1A] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#222222]"
            >
              See Client Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
