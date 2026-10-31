import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, DISPLAY, EYEBROW, LEAD } from '@/components/ui/styles';
import { ProductIndex } from './Products';

// The home page's first view: what we do in one line, and every product with its status beside it. Text only and
// rendered on the server with no entrance animation, so the heading and the lead (the largest paint) appear with the
// HTML and no image competes with them.
export default function Hero({ products }: { products: ProjectCard[] }) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-line">
      <div className="grid-paper grid-paper-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className={`${CONTAINER} relative grid gap-12 pt-14 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:items-center lg:gap-16`}>
        <div className="lg:col-span-7">
          <span className={EYEBROW}>Product Studio, Addis Ababa</span>
          <h1 id="hero-heading" className={`${DISPLAY} mt-5`}>
            Software That Runs Your Business
          </h1>
          <p className={`${LEAD} mt-6`}>
            VersaLabs Studio makes business software products, and builds custom systems for companies in Ethiopia and
            abroad: ERP, online stores, websites and AI tools.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/products" className={BUTTON_PRIMARY}>
              Explore the Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={BUTTON_SECONDARY}>
              Start a Project
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ProductIndex products={products} />
        </div>
      </div>
    </section>
  );
}
