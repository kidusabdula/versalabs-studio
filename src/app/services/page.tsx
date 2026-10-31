import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import CallToAction from '@/components/sections/CallToAction';
import { HowWeWork, SectionHeader } from '@/components/sections/HomeSections';
import { Reveal } from '@/components/ui/motion';
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CONTAINER,
  DISPLAY,
  EYEBROW,
  H2,
  H3,
  LEAD,
  PAGE_HEAD,
  PILL,
  PILL_IDLE,
  RULE,
  SECTION,
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

// A small label over a list inside a service.
const LABEL = 'mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-3';

// What we build for clients, one offer at a time: what it does for the business, what you get, and who we've done it
// for. Server-rendered; the first view has no entrance animation, so the copy is on screen from the first frame.
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
      <header className={`${PAGE_HEAD} border-b border-line`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-12 lg:items-end`}>
          <div className="lg:col-span-8">
            <span className={EYEBROW}>Services</span>
            <h1 className={`${DISPLAY} mt-5 max-w-[16ch]`}>Software Built Around Your Business</h1>
            <p className={`${LEAD} mt-6`}>
              When a ready-made product doesn&apos;t fit, we design and build the system your business needs: a custom
              ERP, an online store, a website or an AI tool. Then we help your team use it.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={BUTTON_PRIMARY}>
                Start a Project
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/products" className={BUTTON_SECONDARY}>
                See Our Products
              </Link>
            </div>
          </div>
          <nav aria-label="Services on this page" className="lg:col-span-4">
            <ol className="border-t border-line">
              {SERVICES.map((service, i) => (
                <li key={service.id} className="border-b border-line">
                  <a
                    href={`#${service.id}`}
                    className="flex items-baseline gap-4 py-3.5 text-[15px] font-medium text-fg-2 transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[12px] font-normal text-fg-4" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>

      <div>
        {SERVICES.map((service, i) => {
          const examples = serviceExamples(service);
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className={`${i > 0 ? RULE : ''} scroll-mt-16 py-16 md:py-24`}
            >
              <Reveal className={`${CONTAINER} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
                <div className="lg:col-span-6">
                  <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 id={`${service.id}-title`} className={`${H2} mt-4`}>
                    {service.title}
                  </h2>
                  <p className="mt-5 text-[19px] font-medium leading-[1.5] text-fg-2">{service.promise}</p>
                  <p className="mt-4 text-[16px] leading-[1.65] text-fg-3">{service.description}</p>
                  <Link href={`/contact?service=${service.id}`} className={`${TEXT_LINK} mt-8`}>
                    Talk to Us About {service.short}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
                <div className="flex flex-col gap-10 lg:col-span-6">
                  <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
                    <h3 className={LABEL}>What You Get</h3>
                    <ul className="grid gap-3.5">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-[15px] leading-[1.6] text-fg-2">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-fg-3" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {examples.length > 0 && (
                    <div>
                      <h3 className={LABEL}>Examples</h3>
                      <ul className="flex flex-wrap gap-2">
                        {examples.map((example) => (
                          <li key={example.slug}>
                            <Link href={example.href} className={`${PILL} ${PILL_IDLE}`}>
                              {example.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>

      <HowWeWork steps={HOW_WE_WORK} />

      <section aria-labelledby="what-to-expect" className={`${RULE} ${SECTION}`}>
        <Reveal className={CONTAINER}>
          <SectionHeader id="what-to-expect" eyebrow="Working With Us" title="What You Can Expect" />
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {EXPECT.map((item) => (
              <li key={item.title} className="border-t border-line-2 pt-6">
                <h3 className={H3}>{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-fg-3">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <CallToAction secondary={{ href: '/products', label: 'See Our Products' }} />
    </>
  );
}
