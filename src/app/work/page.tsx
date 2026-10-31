import WorkIndex from '@/components/work/WorkIndex';
import CallToAction from '@/components/sections/CallToAction';
import { CONTAINER, DISPLAY, EYEBROW, LEAD, PAGE_HEAD } from '@/components/ui/styles';
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
      {/* Rendered on the server with no entrance animation: on a phone the heading and intro are the first view, so
          they paint immediately. */}
      <header className={PAGE_HEAD}>
        <div className={CONTAINER}>
          <span className={EYEBROW}>Proof That We Ship</span>
          <h1 className={`${DISPLAY} mt-5`}>Client Work</h1>
          <p className={`${LEAD} mt-6`}>
            The businesses we&apos;ve built for, what they needed and what we delivered. Every card says what kind of
            work it was and where it stands today, so our own builds never read as a client&apos;s.
          </p>
        </div>
      </header>

      <WorkIndex cards={cards} />

      <CallToAction
        title="Have Something Like This in Mind?"
        text="Tell us about your business and what you want to change. We'll reply with how we would approach it."
      />
    </>
  );
}
