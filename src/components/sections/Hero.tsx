import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, DISPLAY, EYEBROW, LEAD } from '@/components/ui/styles';

// The home page's first view: what we do, in one line, and the way to our
// products. Rendered on the server with no entrance animation, so the heading
// and the line under it (the largest text in the first view) paint at once.
// The products follow straight after, so they share the first view on a
// desktop screen.
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-14 pb-12 md:pt-20 md:pb-16">
      <div className={CONTAINER}>
        <span className={EYEBROW}>Software Products and Custom Builds</span>
        <h1 id="hero-heading" className={DISPLAY}>
          <span className="sm:block">Software That Runs</span> <span className="sm:block">Your Business</span>
        </h1>
        <p className={`${LEAD} mt-6`}>
          VersaLabs Studio makes ready-to-use business software and builds custom systems for companies: ERP, online
          stores, websites and AI tools. Based in Addis Ababa, working with clients in Ethiopia and abroad.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/products" className={BUTTON_PRIMARY}>
            Explore Our Products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/contact" className={BUTTON_SECONDARY}>
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
