import Link from 'next/link';
import { Reveal } from '@/components/ui/motion';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, H2, LEAD, SECTION, SECTION_RULE } from '@/components/ui/styles';

// A page's closing call to action: one primary action (talk to us) and one way
// to keep reading, which defaults to what we offer.
export default function CallToAction({
  secondary = { href: '/services', label: 'See Our Services' },
}: {
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="get-in-touch" className={`${SECTION_RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <div className="rounded-2xl border border-border bg-surface px-6 py-14 text-center md:px-12 md:py-20">
          <h2 id="get-in-touch" className={H2}>
            Tell Us What Your Business Needs
          </h2>
          <p className={`${LEAD} mx-auto mt-5`}>
            Ask for a demo of one of our products, or tell us about the software you have in mind. We reply by email.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={BUTTON_PRIMARY}>
              Start a Project
            </Link>
            <Link href={secondary.href} className={BUTTON_SECONDARY}>
              {secondary.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
