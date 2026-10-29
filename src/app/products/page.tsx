import Link from 'next/link';
import ProductBento from '@/components/sections/ProductBento';
import { Reveal } from '@/components/ui/motion';
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CONTAINER,
  DISPLAY,
  H2,
  LEAD,
  SECTION,
  SECTION_RULE,
} from '@/components/ui/styles';
import { getProjectsInSection, toCard } from '@/content/projects';
import { pageMetadata } from '@/lib/site';

const names = getProjectsInSection('products').map((product) => product.title);

export const metadata = pageMetadata({
  title: 'Products',
  description: `Software from VersaLabs Studio, ready to set up for your business: ${names.slice(0, -1).join(', ')} and ${names.at(-1)}. Each one says whether it is available now or coming soon.`,
  path: '/products',
});

// The products, flagship first, as the same bento as the home page. The
// heading and intro render on the server with no entrance animation, and the
// flagship's screenshot is fetched first: on every screen it is the largest
// thing in the first view.
export default function ProductsPage() {
  const products = getProjectsInSection('products').map(toCard);

  return (
    <>
      <header className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className={CONTAINER}>
          <h1 className={DISPLAY}>Our Products</h1>
          <p className={`${LEAD} mt-6`}>
            Software we build and keep improving, ready to set up for your business. Each one says whether it is
            available now, coming soon or still in development.
          </p>
        </div>
      </header>

      <section aria-label="Products" className="pb-16 md:pb-28">
        <div className={CONTAINER}>
          <ProductBento products={products} as="h2" lead="priority" />
        </div>
      </section>

      <section aria-labelledby="products-cta" className={`${SECTION_RULE} ${SECTION}`}>
        <Reveal className={`${CONTAINER} text-center`}>
          <h2 id="products-cta" className={H2}>
            Want to See One Running?
          </h2>
          <p className={`${LEAD} mx-auto mt-5`}>
            Ask for a walkthrough, or tell us what you would change to fit how your business works.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={BUTTON_PRIMARY}>
              Request a Demo
            </Link>
            <Link href="/work" className={BUTTON_SECONDARY}>
              See Client Work
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
