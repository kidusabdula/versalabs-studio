import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import CallToAction from '@/components/sections/CallToAction';
import { HowWeWork, SectionHeader } from '@/components/sections/HomeSections';
import { Reveal } from '@/components/ui/motion';
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CARD,
  CONTAINER,
  DISPLAY,
  EYEBROW,
  H3,
  LEAD,
  SECTION,
  SECTION_RULE,
  TEXT_LINK,
} from '@/components/ui/styles';
import { HOW_WE_WORK, SERVICES, serviceExamples } from '@/content/services';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Custom ERP and business systems, online stores, websites and AI tools, designed and built for your business by VersaLabs Studio in Addis Ababa.',
  path: '/services',
});

// A small label over a list inside a service card.
const LABEL = 'mb-4 font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-400';

// What we build for clients, one offer at a time: what it does for the
// business, what you get, and who we've done it for. Server-rendered; the
// first view has no entrance animation, so the copy is on screen from the first frame.
const EXPECT = [
  {
    title: 'Clear Scope and Milestones',
    text: 'We agree on what we are building and when before we start, and you see working software along the way.',
  },
  {
    title: 'Built Around Your Business',
    text: 'Every system follows the way your company already works, not a generic template.',
  },
  {
    title: 'Support After Launch',
    text: 'We train your team and stay on after launch. Support is agreed with you up front.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <header className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className={CONTAINER}>
          <span className={EYEBROW}>Services</span>
          <h1 className={`${DISPLAY} max-w-[18ch]`}>Software Built Around Your Business</h1>
          <p className={`${LEAD} mt-6`}>
            When a ready-made product doesn&apos;t fit, we design and build the system your business needs: a custom
            ERP, an online store, a website or an AI tool. Then we help your team use it.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={BUTTON_PRIMARY}>
              Start a Project
            </Link>
            <Link href="/products" className={BUTTON_SECONDARY}>
              See Our Products
            </Link>
          </div>
        </div>
      </header>

      <section aria-label="What we offer" className="pb-16 md:pb-28">
        <div className={`${CONTAINER} grid gap-5 lg:gap-6`}>
          {SERVICES.map((service) => {
            const examples = serviceExamples(service);
            return (
              <article
                key={service.id}
                id={service.id}
                className={`${CARD} grid scroll-mt-24 gap-10 p-7 md:p-12 lg:grid-cols-[1.1fr_1fr]`}
              >
                <div>
                  <h2 className="mb-4 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[36px]">
                    {service.title}
                  </h2>
                  <p className="mb-5 text-[18px] font-medium leading-[1.5] text-zinc-200">{service.promise}</p>
                  <p className="mb-8 text-[16px] leading-[1.6] text-zinc-400">{service.description}</p>
                  <Link href={`/contact?service=${service.id}`} className={TEXT_LINK}>
                    Talk to Us About {service.short}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className={LABEL}>What You Get</h3>
                    <ul className="grid gap-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-[15px] leading-[1.6] text-zinc-300">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {examples.length > 0 && (
                    <div className="border-t border-border pt-6">
                      <h3 className={LABEL}>Examples</h3>
                      <ul className="flex flex-wrap gap-2">
                        {examples.map((example) => (
                          <li key={example.slug}>
                            <Link
                              href={example.href}
                              className="inline-flex min-h-9 items-center rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-[14px] font-medium text-zinc-300 transition-colors hover:border-border-hover hover:text-foreground"
                            >
                              {example.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <HowWeWork steps={HOW_WE_WORK} />

      <section aria-labelledby="what-to-expect" className={`${SECTION_RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="what-to-expect" eyebrow="Working With Us" title="What You Can Expect" />
          <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {EXPECT.map((item) => (
              <li key={item.title} className={`${CARD} p-7`}>
                <h3 className={`${H3} mb-3`}>{item.title}</h3>
                <p className="text-[15px] leading-[1.6] text-zinc-400">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <CallToAction secondary={{ href: '/products', label: 'See Our Products' }} />
    </>
  );
}
