import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CallToAction from '@/components/sections/CallToAction';
import { SectionHeader } from '@/components/sections/HomeSections';
import { Reveal } from '@/components/ui/motion';
import { CARD, CONTAINER, DISPLAY, EYEBROW, H2, H3, LEAD, PAGE_HEAD, RULE, SECTION, TEXT_LINK } from '@/components/ui/styles';
import { OBSIDIAN, VERSA_ESTATE } from '@/content/product-names';
import { VISIBLE_TEAM } from '@/content/team';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'VersaLabs Studio is a software company in Addis Ababa. We make business software products and build custom systems for companies in Ethiopia and abroad.',
  path: '/about',
});

// About the company: what we do, how we work with clients, the people you'll work with, and where we've come from.
// Plain business language only (docs/05-CONTENT-TONE-GUIDE.md). Server-rendered with no entrance animation in the
// first view.

const OFFERS = [
  {
    title: 'Our Products',
    text: `Business software of our own. Versa FX, for forex bureaus, is open as a live demo, and ${OBSIDIAN}, RentFlow and ${VERSA_ESTATE} are in development. We set each one up for the business that uses it.`,
    href: '/products',
    link: 'See Our Products',
  },
  {
    title: 'Custom Software',
    text: 'When a ready-made product doesn’t fit, we build what your business needs: a custom ERP, an online store, a website or an AI tool.',
    href: '/services',
    link: 'See Our Services',
  },
];

const PRINCIPLES = [
  {
    title: 'Your Business First',
    text: 'We start by learning how your business runs, then build around it, not around a template.',
  },
  {
    title: 'Progress You Can See',
    text: 'We show you working software in short steps, so you can give feedback early and often.',
  },
  {
    title: 'Only What You Need',
    text: 'Every feature earns its place. We keep the software simple, fast and easy to use.',
  },
  {
    title: 'A Partner After Launch',
    text: 'We work alongside your team and stay on after launch to support and improve what we built.',
  },
];

// Facts from the project files only (years and launches); nothing here claims a product has shipped that hasn't.
const MILESTONES = [
  { year: '2023', event: 'VersaLabs Studio founded in Addis Ababa' },
  { year: '2025', event: 'Pavilion360 website built for an event production company in Indianapolis' },
  { year: '2025', event: "OSKAZ online store launched, built on the company's business system" },
  { year: '2026', event: `Our own products in development: ${OBSIDIAN}, RentFlow, ${VERSA_ESTATE} and VersaLabs ADE` },
];

function Initials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');
  return (
    <div className="grid-paper flex h-full w-full items-center justify-center bg-surface-2" aria-hidden="true">
      <span className="flex h-24 w-24 items-center justify-center rounded-2xl border border-line-2 bg-surface font-display text-3xl font-semibold tracking-[-0.02em] text-fg-2">
        {initials}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className={`${PAGE_HEAD} relative overflow-hidden border-b border-line`}>
        <div className="grid-paper grid-paper-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className={`${CONTAINER} relative`}>
          <span className={EYEBROW}>About VersaLabs Studio</span>
          <h1 className={`${DISPLAY} mt-5 max-w-[16ch]`}>A Product Studio in Addis Ababa</h1>
          <p className={`${LEAD} mt-6`}>
            VersaLabs Studio makes business software. We make products of our own and build custom systems for
            companies, organisations and events in Ethiopia and abroad, then help their teams put it to work.
          </p>
        </div>
      </header>

      <section aria-labelledby="what-we-do" className={SECTION}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="what-we-do" eyebrow="What We Do" title="Products and Custom Builds" />
          <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {OFFERS.map((offer, i) => (
              <li key={offer.title} className={`${CARD} flex flex-col p-7 md:p-10`}>
                <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 font-display text-[26px] font-semibold tracking-[-0.02em] text-foreground">{offer.title}</h3>
                <p className="mt-3 mb-8 flex-1 text-[16px] leading-[1.65] text-fg-3">{offer.text}</p>
                <Link href={offer.href} className={`${TEXT_LINK} self-start`}>
                  {offer.link}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="how-we-work-with-you" className={`${RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="how-we-work-with-you" eyebrow="Our Approach" title="How We Work With You" />
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title} className="border-t border-line-2 pt-6">
                <h3 className={H3}>{principle.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-fg-3">{principle.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="team" className={`${RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader
            id="team"
            eyebrow="People"
            title="The People You'll Work With"
            intro="A small team, so you work directly with the people designing and building your software."
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {VISIBLE_TEAM.map((member) => (
              <li key={member.name} className={`${CARD} flex h-full flex-col overflow-hidden`}>
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-line bg-surface-2">
                  {member.portrait ? (
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 300px"
                    />
                  ) : (
                    <Initials name={member.name} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[17px] font-semibold text-foreground">{member.name}</h3>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-2">{member.role}</p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-fg-3">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="milestones" className={`${RULE} ${SECTION}`}>
        <Reveal className={`${CONTAINER} grid gap-10 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <span className={EYEBROW}>Our Journey</span>
            <h2 id="milestones" className={`${H2} mt-4`}>
              Milestones
            </h2>
          </div>
          <ol className="border-t border-line lg:col-span-8">
            {MILESTONES.map((milestone) => (
              <li key={milestone.event} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-6 border-b border-line py-5 md:grid-cols-[6rem_minmax(0,1fr)]">
                <span className="pt-0.5 font-mono text-[13px] text-fg-3">{milestone.year}</span>
                <p className="text-[16px] leading-[1.55] text-fg-2">{milestone.event}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <CallToAction />
    </>
  );
}
