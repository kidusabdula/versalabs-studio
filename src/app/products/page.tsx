import CallToAction from '@/components/sections/CallToAction';
import { ProductRows } from '@/components/sections/Products';
import { CONTAINER, DISPLAY, EYEBROW, LEAD, PAGE_HEAD } from '@/components/ui/styles';
import { getProducts, toCard } from '@/content/projects';
import { pageMetadata } from '@/lib/site';

const products = getProducts().map(toCard);
const names = products.map((product) => product.title);

export const metadata = pageMetadata({
  title: 'Products',
  description: `Business software from VersaLabs Studio: ${names.slice(0, -1).join(', ')} and ${names.at(-1)}. Each one says whether it is in production, open as a demo or still in development.`,
  path: '/products',
});

// Every product, one to a row, in the site's product order. The heading and intro render on the server with no
// entrance animation; the first product's picture is fetched first.
export default function ProductsPage() {
  return (
    <>
      <header className={`${PAGE_HEAD} border-b border-line`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-12 lg:items-end`}>
          <div className="lg:col-span-8">
            <span className={EYEBROW}>Products</span>
            <h1 className={`${DISPLAY} mt-5`}>Our Products</h1>
            <p className={`${LEAD} mt-6`}>
              Business software we make and keep improving, each set up for the business that uses it. There&apos;s no
              online sign-up: we arrange each one with you directly.
            </p>
          </div>
          <ul aria-label="Jump to a product" className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
            {products.map((product) => (
              <li key={product.slug}>
                <a
                  href={`#${product.slug}`}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-3.5 text-[14px] font-medium text-fg-2 transition-colors hover:border-line-2 hover:text-foreground"
                >
                  {product.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section aria-label="All products" className="py-16 md:py-24">
        <div className={CONTAINER}>
          <ProductRows products={products} />
        </div>
      </section>

      <CallToAction
        title="Want to See One Running?"
        text="Ask for a walkthrough of a product, or tell us what you would change to fit how your business works."
        secondary={{ href: '/work', label: 'See Client Work' }}
      />
    </>
  );
}
