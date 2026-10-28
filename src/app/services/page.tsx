import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import CallToAction from '@/components/sections/CallToAction';
import { HowWeWork } from '@/components/sections/HomeSections';
import { HOW_WE_WORK, SERVICES, serviceExamples } from '@/content/services';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Custom ERP and business systems, online stores, websites and AI tools, designed and built for your business by VersaLabs Studio in Addis Ababa.',
  path: '/services',
});

// What we build for clients, one offer at a time: what it does for the
// business, what you get, and who we've done it for. Server-rendered with no
// entrance animation, so the copy is on screen from the first frame.
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
      <section className="relative overflow-hidden px-6 pb-20 pt-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[120vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/8 via-white/[0.02] to-indigo-500/8 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <span className="mb-6 block text-xs font-semibold uppercase tracking-widest text-zinc-400">Services</span>
            <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">
              Software Built Around{' '}
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Your Business</span>
            </h1>
            <p className="mb-10 max-w-2xl text-xl leading-relaxed text-zinc-400">
              When a ready-made product doesn&apos;t fit, we design and build the system your business needs: a custom
              ERP, an online store, a website or an AI tool. Then we help your team use it.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Start a Project
              </Link>
              <Link
                href="/products"
                className="flex h-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] px-8 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                See Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="What we offer" className="px-6 pb-24">
        <div className="mx-auto grid max-w-[1400px] gap-6">
          {SERVICES.map((service) => {
            const examples = serviceExamples(service);
            return (
              <article
                key={service.id}
                id={service.id}
                className="grid scroll-mt-28 gap-10 rounded-3xl border border-white/[0.06] bg-[#111113] p-7 md:p-12 lg:grid-cols-[1.1fr_1fr]"
              >
                <div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{service.title}</h2>
                  <p className="mb-5 text-lg font-medium text-zinc-200">{service.promise}</p>
                  <p className="mb-8 text-[15px] leading-relaxed text-zinc-400">{service.description}</p>
                  <Link
                    href={`/contact?service=${service.id}`}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Talk to Us About {service.short}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">What You Get</h3>
                    <ul className="grid gap-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-[15px] leading-relaxed text-zinc-300">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {examples.length > 0 && (
                    <div className="border-t border-white/[0.06] pt-6">
                      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                        Examples
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {examples.map((example) => (
                          <li key={example.slug}>
                            <Link
                              href={example.href}
                              className="inline-flex min-h-9 items-center rounded-full border border-white/[0.08] bg-[#1C1C1F] px-4 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
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

      <section aria-labelledby="what-to-expect" className="border-t border-white/[0.04] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Working With Us
          </span>
          <h2
            id="what-to-expect"
            className="mb-12 text-[32px] font-bold leading-[1.1] tracking-tighter text-white md:text-[44px]"
          >
            What You Can Expect
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {EXPECT.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/[0.06] bg-[#111113] p-7">
                <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-[14px] leading-[1.7] text-zinc-400">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction secondary={{ href: '/products', label: 'See Our Products' }} />
    </>
  );
}
