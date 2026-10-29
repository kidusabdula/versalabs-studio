import Link from 'next/link';
import WorkIndex from '@/components/work/WorkIndex';
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

export const metadata = pageMetadata({
  title: 'Client Work',
  description:
    'Software VersaLabs Studio has delivered for businesses: online stores, ordering and ticketing, event and sports websites, and more. See what each client needed and what we delivered.',
  path: '/work',
});

export default function WorkPage() {
  const cards = getProjectsInSection('work').map(toCard);

  return (
    <>
      {/* Rendered on the server with no entrance animation: on a phone the
          heading and intro are the first view, so they paint immediately. */}
      <header className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className={CONTAINER}>
          <h1 className={DISPLAY}>Client Work</h1>
          <p className={`${LEAD} mt-6`}>
            The businesses we&apos;ve built for, what they needed and what we delivered. Every card says where the work
            stands today, and which pieces are our own builds rather than a client&apos;s.
          </p>
        </div>
      </header>

      <WorkIndex cards={cards} />

      <section aria-labelledby="work-cta" className={`${SECTION_RULE} ${SECTION}`}>
        <Reveal className={`${CONTAINER} text-center`}>
          <h2 id="work-cta" className={H2}>
            Have Something Like This in Mind?
          </h2>
          <p className={`${LEAD} mx-auto mt-5`}>
            Tell us about your business and what you want to change. We&apos;ll reply with how we would approach it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className={BUTTON_PRIMARY}>
              Start a Project
            </Link>
            <Link href="/products" className={BUTTON_SECONDARY}>
              See Our Products
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
