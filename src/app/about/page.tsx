import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CallToAction from '@/components/sections/CallToAction';
import { VISIBLE_TEAM } from '@/content/team';
import { pageMetadata } from '@/lib/site';
import { SectionHeader } from '@/components/sections/HomeSections';
import { Reveal } from '@/components/ui/motion';
import { CARD, CONTAINER, DISPLAY, EYEBROW, H3, LEAD, SECTION, SECTION_RULE, TEXT_LINK } from '@/components/ui/styles';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'VersaLabs Studio is a software company in Addis Ababa. We make business software products and build custom systems for companies in Ethiopia and abroad.',
  path: '/about',
});

// About the company: what we do, how we work with clients, the people you'll
// work with, and where we've come from. Plain business language only
// (docs/05-CONTENT-TONE-GUIDE.md). Server-rendered with no entrance animation.

const OFFERS = [
  {
    title: 'Our Products',
    text: 'Ready-to-use business software, such as Obsidian ERP for running a whole company and Versa FX for forex bureaus. We set each one up for your business.',
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

const MILESTONES = [
  { year: '2023', event: 'VersaLabs Studio founded in Addis Ababa' },
  { year: '2025', event: 'Pavilion360 website built for an event production company in Indianapolis' },
  { year: '2025', event: "OSKAZ online store launched, connected live to the company's business system" },
  { year: '2026', event: 'Obsidian ERP released as a product' },
];

function Initials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-elevated">
      <span
        className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-surface text-3xl font-semibold tracking-[-0.02em] text-zinc-300"
        aria-hidden="true"
      >
        {initials}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className={CONTAINER}>
          <span className={EYEBROW}>About VersaLabs Studio</span>
          <h1 className={`${DISPLAY} max-w-[18ch]`}>A Software Studio in Addis Ababa</h1>
          <p className={`${LEAD} mt-6`}>
            VersaLabs Studio makes business software. We sell products of our own and build custom systems for
            companies, organisations and events in Ethiopia and abroad, then help their teams put it to work.
          </p>
        </div>
      </header>

      <section aria-labelledby="what-we-do" className={`${SECTION_RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="what-we-do" eyebrow="What We Do" title="Products and Custom Builds" />
          <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {OFFERS.map((offer) => (
              <li key={offer.title} className={`${CARD} flex flex-col p-7 md:p-9`}>
                <h3 className={`${H3} mb-3`}>{offer.title}</h3>
                <p className="mb-6 flex-1 text-[16px] leading-[1.6] text-zinc-400">{offer.text}</p>
                <Link href={offer.href} className={TEXT_LINK}>
                  {offer.link}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="how-we-work-with-you" className={`${SECTION_RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="how-we-work-with-you" eyebrow="Our Approach" title="How We Work With You" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title} className={`${CARD} p-7`}>
                <h3 className={`${H3} mb-3`}>{principle.title}</h3>
                <p className="text-[15px] leading-[1.6] text-zinc-400">{principle.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="team" className={`${SECTION_RULE} ${SECTION}`}>
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
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-border bg-surface-elevated">
                  {member.portrait ? (
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                  ) : (
                    <Initials name={member.name} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-[16px] font-semibold text-foreground">{member.name}</h3>
                  <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.06em] text-zinc-300">{member.role}</p>
                  <p className="text-[14px] leading-[1.6] text-zinc-400">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="milestones" className={`${SECTION_RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="milestones" eyebrow="Our Journey" title="Milestones" />
          <ol className="relative flex max-w-3xl flex-col gap-8 before:absolute before:top-0 before:bottom-0 before:left-[18px] before:w-px before:bg-border">
            {MILESTONES.map((milestone) => (
              <li key={milestone.event} className="relative flex items-start gap-6">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />
                </span>
                <div>
                  <span className="mb-1 block font-mono text-[12px] text-zinc-400">{milestone.year}</span>
                  <p className="text-[16px] font-medium text-zinc-300">{milestone.event}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <CallToAction secondary={{ href: '/products', label: 'See Our Products' }} />
    </>
  );
}
