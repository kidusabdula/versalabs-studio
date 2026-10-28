import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CallToAction from '@/components/sections/CallToAction';
import { VISIBLE_TEAM } from '@/content/team';
import { pageMetadata } from '@/lib/site';

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

const LABEL = 'mb-4 block text-[11px] font-semibold uppercase tracking-widest text-zinc-400';
const TITLE = 'mb-5 text-[32px] font-bold leading-[1.1] tracking-tighter text-white md:text-[44px]';

function Initials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]">
      <span
        className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.06] text-3xl font-bold tracking-tight text-white/80"
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
      <section className="relative overflow-hidden px-6 pb-20 pt-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[120vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/6 via-white/[0.02] to-indigo-500/6 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <span className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            About VersaLabs Studio
          </span>
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">
            A Software Studio in{' '}
            <span className="bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Addis Ababa
            </span>
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-zinc-400">
            VersaLabs Studio makes business software. We sell products of our own and build custom systems for
            companies, organisations and events in Ethiopia and abroad, then help their teams put it to work.
          </p>
        </div>
      </section>

      <section aria-labelledby="what-we-do" className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <span className={LABEL}>What We Do</span>
          <h2 id="what-we-do" className={`${TITLE} mb-12`}>
            Products and Custom Builds
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {OFFERS.map((offer) => (
              <li key={offer.title} className="flex flex-col rounded-2xl border border-white/[0.06] bg-[#111113] p-7 md:p-9">
                <h3 className="mb-3 text-xl font-semibold text-white">{offer.title}</h3>
                <p className="mb-6 flex-1 text-[15px] leading-relaxed text-zinc-400">{offer.text}</p>
                <Link
                  href={offer.href}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
                >
                  {offer.link}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-we-work-with-you" className="border-t border-white/[0.04] bg-[#0A0A0C] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <span className={LABEL}>Our Approach</span>
          <h2 id="how-we-work-with-you" className={`${TITLE} mb-12`}>
            How We Work With You
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title} className="rounded-2xl border border-white/[0.06] bg-[#111113] p-7">
                <h3 className="mb-3 text-lg font-semibold text-white">{principle.title}</h3>
                <p className="text-[14px] leading-[1.7] text-zinc-400">{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="team" className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <span className={LABEL}>People</span>
          <h2 id="team" className={TITLE}>
            The People You&apos;ll Work With
          </h2>
          <p className="mb-12 max-w-xl text-[16px] text-zinc-400">
            A small team, so you work directly with the people designing and building your software.
          </p>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VISIBLE_TEAM.map((member) => (
              <li
                key={member.name}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#161618]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0E0E10]">
                  {member.portrait ? (
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <Initials name={member.name} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-[16px] font-bold text-white">{member.name}</h3>
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-zinc-300">{member.role}</p>
                  <p className="text-[13px] leading-relaxed text-zinc-400">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="milestones" className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <span className={LABEL}>Our Journey</span>
          <h2 id="milestones" className={`${TITLE} mb-12`}>
            Milestones
          </h2>
          <ol className="relative flex flex-col gap-8 before:absolute before:bottom-0 before:left-[18px] before:top-0 before:w-px before:bg-gradient-to-b before:from-white/[0.1] before:to-transparent">
            {MILESTONES.map((milestone) => (
              <li key={milestone.event} className="relative flex items-start gap-6">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[#161618]"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-white/40" />
                </span>
                <div>
                  <span className="mb-1 block font-mono text-[11px] text-zinc-400">{milestone.year}</span>
                  <p className="text-[15px] font-medium text-zinc-300">{milestone.event}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CallToAction secondary={{ href: '/products', label: 'See Our Products' }} />
    </>
  );
}
