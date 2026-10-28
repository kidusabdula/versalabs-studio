import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import ProductShot, { ShotPlaceholder } from '@/components/ui/ProductShot';
import { StatusBadge } from '@/components/ui/Badge';
import { CARD_LINK } from '@/components/ui/styles';
import { CardMedia } from '@/components/case-study/ProjectCardView';

// Our products as a bento: the flagship across the full width with its
// screenshot large, then two products side by side, then the rest in threes.
// Products not named here follow at the end.
const ORDER = ['obsidian-erp', 'safeframe', 'versa-fx', 'versalabs-ade', 'versa-estate', 'rentflow'];

function ordered(products: ProjectCard[]) {
  const rank = (slug: string) => (ORDER.includes(slug) ? ORDER.indexOf(slug) : ORDER.length);
  return [...products].sort((a, b) => rank(a.slug) - rank(b.slug));
}

function Title({ product, as: Heading }: { product: ProjectCard; as: 'h2' | 'h3' }) {
  return (
    <Heading className="flex items-start justify-between gap-3 text-[20px] font-semibold tracking-[-0.01em] text-foreground">
      {product.title}
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-foreground" aria-hidden="true" />
    </Heading>
  );
}

function Flagship({ product, as, lead }: { product: ProjectCard; as: 'h2' | 'h3'; lead: 'priority' | 'eager' }) {
  return (
    <Link href={product.href} className={`${CARD_LINK} grid gap-8 p-5 sm:p-6 md:p-10 lg:grid-cols-12 lg:items-center lg:gap-10`}>
      <div className="lg:order-2 lg:col-span-8">
        {product.cover ? (
          <ProductShot
            image={product.cover}
            alt=""
            sizes="(max-width: 1024px) calc(100vw - 90px), 740px"
            priority={lead === 'priority'}
            eager={lead === 'eager'}
          />
        ) : (
          <ShotPlaceholder title={product.title} />
        )}
      </div>
      <div className="lg:order-1 lg:col-span-4">
        <StatusBadge status={product.status} className="mb-5" />
        <Title product={product} as={as} />
        <p className="mt-2 text-[16px] text-zinc-300">{product.subtitle}</p>
        <p className="mt-4 text-[15px] leading-[1.6] text-zinc-400">{product.summary}</p>
      </div>
    </Link>
  );
}

function Tile({ product, as, sizes }: { product: ProjectCard; as: 'h2' | 'h3'; sizes: string }) {
  return (
    <Link href={product.href} className={`${CARD_LINK} flex h-full flex-col overflow-hidden`}>
      <CardMedia project={product} sizes={sizes} />
      <div className="flex flex-1 flex-col p-6">
        <StatusBadge status={product.status} className="mb-4 self-start" />
        <Title product={product} as={as} />
        <p className="mt-2 text-[15px] leading-[1.5] text-zinc-400">{product.subtitle}</p>
      </div>
    </Link>
  );
}

// `as`: the products' heading level (h3 under a section heading, h2 on /products).
// `lead`: how the flagship's screenshot loads. "priority" where it is the
// largest thing in the first view on every screen (/products); "eager" where it
// is in the first view on a desktop only (the home page, below the hero).
export default function ProductBento({
  products,
  as = 'h3',
  lead = 'eager',
}: {
  products: ProjectCard[];
  as?: 'h2' | 'h3';
  lead?: 'priority' | 'eager';
}) {
  const [flagship, ...rest] = ordered(products);
  if (!flagship) return null;

  return (
    <ul className="grid gap-5 md:grid-cols-6 lg:gap-6">
      <li className="md:col-span-6">
        <Flagship product={flagship} as={as} lead={lead} />
      </li>
      {rest.map((product, i) => (
        <li key={product.slug} className={i < 2 ? 'md:col-span-3' : 'md:col-span-2'}>
          <Tile
            product={product}
            as={as}
            sizes={i < 2 ? '(max-width: 768px) calc(100vw - 90px), 560px' : '(max-width: 768px) calc(100vw - 90px), 360px'}
          />
        </li>
      ))}
    </ul>
  );
}
