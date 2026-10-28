import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import type { ExampleLink, Service, Step } from '@/content/services';
import { Reveal } from '@/components/ui/motion';
import { CARD, CONTAINER, EYEBROW, H2, H3, LEAD, SECTION, SECTION_RULE, TEXT_LINK } from '@/components/ui/styles';
import ProductBento from './ProductBento';

// The home page below the hero, in the order a buyer reads it: our products,
// what we build for clients, who we've built for, how we work. Rendered on the
// server; each section fades up once as it scrolls into view.

// A section's heading on the left and its introduction on the right, so the
// content below starts high on a desktop screen.
export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  more,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  more?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-2 md:items-end md:gap-12">
      <div>
        <span className={EYEBROW}>{eyebrow}</span>
        <h2 id={id} className={H2}>
          {title}
        </h2>
      </div>
      {(intro || more) && (
        <div className="flex flex-col items-start gap-5">
          {intro && <p className={LEAD}>{intro}</p>}
          {more && (
            <Link href={more.href} className={TEXT_LINK}>
              {more.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// The products follow the hero with no rule between them, so on a desktop
// screen the flagship's screenshot starts in the first view.
export function ProductsSection({ products }: { products: ProjectCard[] }) {
  return (
    <section aria-labelledby="our-products" className="pb-16 md:pb-28">
      <div className={CONTAINER}>
        <SectionHeader
          id="our-products"
          eyebrow="Our Products"
          title="Software You Can Put to Work"
          intro="Products we build and keep improving, ready to set up for your business. Each one says whether it is available now or still on its way."
          more={{ href: '/products', label: 'See All Products' }}
        />
        <ProductBento products={products} lead="eager" />
      </div>
    </section>
  );
}

export function ServicesSection({ services }: { services: (Service & { exampleLinks: ExampleLink[] })[] }) {
  return (
    <section aria-labelledby="services" className={`${SECTION_RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionHeader
          id="services"
          eyebrow="Services"
          title="Built for Your Business"
          intro="When a ready-made product doesn't fit, we build the software your business needs, and stay on to support it."
          more={{ href: '/services', label: 'See Our Services' }}
        />
        <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {services.map((service) => (
            <li key={service.id} className={`${CARD} flex flex-col p-7 md:p-9`}>
              <h3 className={`${H3} mb-3`}>{service.title}</h3>
              <p className="mb-6 flex-1 text-[16px] leading-[1.6] text-zinc-400">{service.promise}</p>
              {service.exampleLinks.length > 0 && (
                <p className="border-t border-border pt-5 text-[14px] text-zinc-400">
                  <span className="mr-2 text-zinc-300">Examples:</span>
                  {service.exampleLinks.map((example, i) => (
                    <span key={example.slug}>
                      {i > 0 && ', '}
                      <Link href={example.href} className="text-foreground underline-offset-4 hover:underline">
                        {example.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function ClientsSection({ clients }: { clients: ExampleLink[] }) {
  if (clients.length === 0) return null;
  return (
    <section aria-labelledby="clients" className={`${SECTION_RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionHeader
          id="clients"
          eyebrow="Clients"
          title="Businesses We've Worked With"
          intro="Companies, organisations and events in Ethiopia and abroad. Each name opens the story of what they needed and what we delivered."
        />
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((client) => (
            <li key={client.slug} className="bg-background">
              <Link
                href={client.href}
                className="flex min-h-24 items-center justify-center px-6 py-8 text-center text-[17px] font-medium tracking-[-0.01em] text-zinc-300 transition-colors hover:bg-surface hover:text-foreground"
              >
                {client.name}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function HowWeWork({ steps }: { steps: Step[] }) {
  return (
    <section aria-labelledby="how-we-work" className={`${SECTION_RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionHeader id="how-we-work" eyebrow="How We Work" title="From First Call to Launch" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <li key={step.step} className={`${CARD} p-7`}>
              <span className="mb-6 block font-mono text-[13px] text-zinc-400" aria-hidden="true">
                {step.step}
              </span>
              <h3 className={`${H3} mb-3`}>{step.title}</h3>
              <p className="text-[15px] leading-[1.6] text-zinc-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
