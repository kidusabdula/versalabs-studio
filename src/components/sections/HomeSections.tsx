import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCardView from '@/components/case-study/ProjectCardView';
import type { ProjectCard } from '@/content/projects';
import type { ExampleLink, Service, Step } from '@/content/services';

// The home page below the hero, in the order a buyer reads it: our products,
// what we build for clients, who we've built for, how we work. Rendered on the
// server with no entrance animation (docs/05-CONTENT-TONE-GUIDE.md, "Home").

const LABEL = 'mb-4 block text-[11px] font-semibold uppercase tracking-widest text-zinc-400';
const TITLE = 'mb-5 text-[32px] font-bold leading-[1.1] tracking-tighter text-white md:text-[44px]';
const INTRO = 'max-w-2xl text-[17px] leading-relaxed text-zinc-400';
const MORE =
  'inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 transition-colors hover:text-zinc-300 hover:underline';

export function ProductsSection({ products }: { products: ProjectCard[] }) {
  return (
    <section aria-labelledby="our-products" className="border-t border-white/[0.04] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className={LABEL}>Our Products</span>
            <h2 id="our-products" className={TITLE}>
              Software You Can Put to Work
            </h2>
            <p className={INTRO}>
              Products we build and keep improving, ready to set up for your business. Each one says whether it is
              available now or still on its way.
            </p>
          </div>
          <Link href="/products" className={MORE}>
            See All Products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((card) => (
            <li key={card.slug}>
              <ProjectCardView project={card} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesSection({ services }: { services: (Service & { exampleLinks: ExampleLink[] })[] }) {
  return (
    <section aria-labelledby="services" className="border-t border-white/[0.04] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className={LABEL}>Services</span>
            <h2 id="services" className={TITLE}>
              Built for Your Business
            </h2>
            <p className={INTRO}>
              When a ready-made product doesn&apos;t fit, we build the software your business needs, and stay on to
              support it.
            </p>
          </div>
          <Link href="/services" className={MORE}>
            See Our Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.id} className="flex flex-col rounded-2xl border border-white/[0.06] bg-[#111113] p-7 md:p-9">
              <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mb-6 flex-1 text-[15px] leading-relaxed text-zinc-400">{service.promise}</p>
              {service.exampleLinks.length > 0 && (
                <p className="border-t border-white/[0.06] pt-5 text-sm text-zinc-400">
                  <span className="mr-2 text-zinc-300">Examples:</span>
                  {service.exampleLinks.map((example, i) => (
                    <span key={example.slug}>
                      {i > 0 && ', '}
                      <Link href={example.href} className="text-white underline-offset-4 hover:underline">
                        {example.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClientsSection({ clients }: { clients: ExampleLink[] }) {
  if (clients.length === 0) return null;
  return (
    <section aria-labelledby="clients" className="border-t border-white/[0.04] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <span className={LABEL}>Clients</span>
        <h2 id="clients" className={TITLE}>
          Businesses We&apos;ve Worked With
        </h2>
        <p className={`${INTRO} mb-12`}>
          Companies, organisations and events in Ethiopia and abroad. Each name opens the story of what they needed and
          what we delivered.
        </p>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((client) => (
            <li key={client.slug} className="bg-[#0A0A0C]">
              <Link
                href={client.href}
                className="flex min-h-24 items-center justify-center px-6 py-8 text-center text-lg font-semibold tracking-tight text-zinc-300 transition-colors hover:bg-[#111113] hover:text-white"
              >
                {client.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowWeWork({ steps }: { steps: Step[] }) {
  return (
    <section aria-labelledby="how-we-work" className="border-t border-white/[0.04] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <span className={LABEL}>How We Work</span>
        <h2 id="how-we-work" className={`${TITLE} mb-12`}>
          From First Call to Launch
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.step} className="rounded-2xl border border-white/[0.06] bg-[#111113] p-7">
              <span className="mb-6 block font-mono text-sm text-zinc-400" aria-hidden="true">
                {step.step}
              </span>
              <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-[14px] leading-[1.7] text-zinc-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
