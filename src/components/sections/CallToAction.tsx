import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/motion';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, H2, LEAD, RULE, SECTION } from '@/components/ui/styles';

// A page's closing call to action: one primary action (talk to us) and one way to keep reading, which defaults to the
// products. It sits on the hairline grid, the same texture as the home page's first view, so a page ends where the
// site began.
export default function CallToAction({
  title = 'Tell Us What Your Business Needs',
  text = 'Ask for a demo of one of our products, or tell us about the software you have in mind. We reply by email.',
  secondary = { href: '/products', label: 'See Our Products' },
}: {
  title?: string;
  text?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="get-in-touch" className={`${RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-14 md:px-14 md:py-20">
          <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_100%_100%,#000_20%,transparent_75%)]" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 id="get-in-touch" className={H2}>
                {title}
              </h2>
              <p className={`${LEAD} mt-5`}>{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
              <Link href="/contact" className={BUTTON_PRIMARY}>
                Start a Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={secondary.href} className={BUTTON_SECONDARY}>
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
