import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import type { GalleryImage } from '@/content/schema';
import { STATUS_LABEL } from '@/content/labels';
import ProductShot, { Plate, ShotPanel, isPortrait } from '@/components/ui/ProductShot';
import { StatusBadge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/case-study/ProjectCardView';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CHIP, H2, MONO, SUBTITLE } from '@/components/ui/styles';

const number = (i: number) => String(i + 1).padStart(2, '0');

// The products as a ruled index: number, name, what it is for, and where it stands. It leads the home page, beside
// the heading, so every product and its status are in the first view. Text only, so it paints with the HTML.
export function ProductIndex({ products }: { products: ProjectCard[] }) {
  return (
    <nav aria-labelledby="product-index" className="rounded-xl border border-line bg-surface/80">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 id="product-index" className={MONO}>
          Product Index
        </h2>
        <span className={`${MONO} text-fg-4`} aria-hidden="true">
          Status
        </span>
      </div>
      <ol>
        {products.map((product, i) => (
          <li key={product.slug} className="border-b border-line last:border-b-0">
            <Link
              href={product.href}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-5 py-4 transition-colors hover:bg-wash sm:grid-cols-[auto_minmax(0,1fr)_auto]"
            >
              <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                {number(i)}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-display text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                  {product.title}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-fg-4 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                {product.tagline && <span className="mt-0.5 block text-[14px] text-fg-3">{product.tagline}</span>}
              </span>
              <StatusBadge status={product.status} className="col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end" />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// The products as cards, three to a row on a desktop.
export function ProductGrid({ products, headingLevel = 'h3' }: { products: ProjectCard[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {products.map((product, i) => (
        <li key={product.slug}>
          <ProductCard product={product} index={i} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}

// A product's picture in a row: its cover in a frame on the panel (with the same page on a phone beside it when
// there is one), or its plate.
function RowMedia({ product, priority }: { product: ProjectCard; priority: boolean }) {
  const cover: GalleryImage | undefined = product.cover;
  if (!cover) {
    return (
      <Plate
        words={product.scope}
        top={`${product.title} / ${STATUS_LABEL[product.status]}`}
        foot={product.tagline}
        label={`${product.title}: ${product.scope?.join(', ')}. No screenshots yet: it is ${STATUS_LABEL[product.status].toLowerCase()}.`}
      />
    );
  }
  if (isPortrait(cover)) {
    const phones = [cover, ...product.coverPhones].slice(0, 3);
    return (
      <ShotPanel>
        <div className="flex items-start justify-center gap-[4%]">
          {phones.map((image, i) => (
            <ProductShot key={image.src} image={image} alt="" sizes="(max-width: 1024px) 28vw, 200px" eager={priority && i === 0} className="w-[30%]" />
          ))}
        </div>
      </ShotPanel>
    );
  }
  return (
    <ShotPanel>
      <ProductShot
        image={cover}
        alt=""
        sizes="(max-width: 1024px) calc(100vw - 80px), 680px"
        priority={priority}
      />
    </ShotPanel>
  );
}

// The products one to a row, picture and words side by side, alternating: the /products page.
export function ProductRows({ products }: { products: ProjectCard[] }) {
  return (
    <ol className="flex flex-col">
      {products.map((product, i) => (
        <li key={product.slug} id={product.slug} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20">
          <article aria-labelledby={`${product.slug}-title`} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <RowMedia product={product} priority={i === 0} />
            </div>
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                  {number(i)}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                <StatusBadge status={product.status} />
              </div>
              <h2 id={`${product.slug}-title`} className={H2}>
                {product.title}
              </h2>
              <p className={`${SUBTITLE} mt-3`}>{product.subtitle}</p>
              <p className="mt-5 text-[16px] leading-[1.65] text-fg-3">{product.summary}</p>
              {product.scope && (
                <ul aria-label="What it covers" className="mt-6 flex flex-wrap gap-2">
                  {product.scope.map((word) => (
                    <li key={word} className={CHIP}>
                      {word}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-6 border-l-2 border-line-2 pl-4 text-[14px] leading-[1.6] text-fg-2">{product.availability}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={product.href} className={BUTTON_PRIMARY}>
                  About {product.title}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {product.liveUrl && (
                  <a href={product.liveUrl} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
                    Try the Live Demo
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {product.site && (
                  <a href={product.site} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
                    Product Site
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
