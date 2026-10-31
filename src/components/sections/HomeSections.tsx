import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ProjectCard } from '@/content/projects';
import type { ExampleLink, Service, Step } from '@/content/services';
import { STATUS_LABEL } from '@/content/labels';
import { Reveal } from '@/components/ui/motion';
import ProjectCardView from '@/components/case-study/ProjectCardView';
import { CONTAINER, EYEBROW, H2, H3, LEAD, RULE, SECTION, TEXT_LINK } from '@/components/ui/styles';
import { ProductGrid } from './Products';

// The home page below the hero, in the order a buyer reads it: the products, the client work that proves we ship,
// what we build to order, how we work. Rendered on the server; each section settles into place as it scrolls in.

// A section's heading on the left and its introduction on the right, so the content below starts high on a desktop.
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
        <h2 id={id} className={`${H2} mt-4`}>
          {title}
        </h2>
      </div>
      {(intro || more) && (
        <div className="flex flex-col items-start gap-5">
          {intro && <p className={LEAD}>{intro}</p>}
          {more && (
            <Link href={more.href} className={TEXT_LINK}>
              {more.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function ProductsSection({ products }: { products: ProjectCard[] }) {
  return (
    <section aria-labelledby="our-products" className={SECTION}>
      <Reveal className={CONTAINER}>
        <SectionHeader
          id="our-products"
          eyebrow="Our Products"
          title="Software We Make and Keep Improving"
          intro="Each product says plainly where it stands: in production, open as a demo, or still in development. We set each one up for the business that uses it."
          more={{ href: '/products', label: 'Compare the Products' }}
        />
        <ProductGrid products={products} />
      </Reveal>
    </section>
  );
}

// The proof: three client stories large, then the rest of the work as a ruled list.
export function WorkSection({ featured, more }: { featured: ProjectCard[]; more: ProjectCard[] }) {
  return (
    <section aria-labelledby="client-work" className={`${RULE} ${SECTION}`}>
      <div className={CONTAINER}>
        <SectionHeader
          id="client-work"
          eyebrow="Client Work"
          title="Built for Real Businesses"
          intro="What our clients needed and what we delivered. Every story says where the work stands today."
          more={{ href: '/work', label: 'See All Client Work' }}
        />
        <Reveal as="ul" className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {featured.map((card) => (
            <li key={card.slug}>
              <ProjectCardView project={card} headingLevel="h3" sizes="(max-width: 768px) calc(100vw - 32px), 400px" />
            </li>
          ))}
        </Reveal>
        {more.length > 0 && (
          <Reveal className="mt-12 md:mt-16">
            <h3 className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-3">More Work</h3>
            <ul className="border-t border-line">
              {more.map((card) => (
                <li key={card.slug} className="border-b border-line">
                  <Link
                    href={card.href}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1 py-5 transition-colors hover:bg-wash md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto_auto] md:px-3"
                  >
                    <span className="font-display text-[18px] font-semibold tracking-[-0.01em] text-foreground">{card.title}</span>
                    <span className="col-start-1 row-start-2 text-[14px] text-fg-3 md:col-start-2 md:row-start-1">{card.subtitle}</span>
                    <span className="hidden font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3 md:block">
                      {STATUS_LABEL[card.status]}
                    </span>
                    <ArrowUpRight
                      className="col-start-2 row-span-2 h-4 w-4 text-fg-4 transition-colors group-hover:text-foreground md:col-start-4 md:row-span-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// What we build to order, as a ruled grid: one cell per service, with the client work that shows it.
export function ServicesSection({ services }: { services: (Service & { exampleLinks: ExampleLink[] })[] }) {
  return (
    <section aria-labelledby="services" className={`${RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionHeader
          id="services"
          eyebrow="Services"
          title="Custom Software, Built Around You"
          intro="When a ready-made product doesn't fit, we build the software your business needs, and stay on to support it."
          more={{ href: '/services', label: 'See Our Services' }}
        />
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.id} className="flex flex-col bg-background p-6 md:p-7">
              <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={`${H3} mt-8`}>
                <Link href={`/services#${service.id}`} className="hover:underline hover:decoration-line-2 hover:underline-offset-4">
                  {service.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-fg-3">{service.promise}</p>
              {service.exampleLinks.length > 0 && (
                <p className="mt-6 border-t border-line pt-4 text-[13px] leading-[1.7] text-fg-3">
                  <span className="mr-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-3">Examples</span>
                  {service.exampleLinks.map((example, j) => (
                    <span key={example.slug}>
                      {j > 0 && ', '}
                      <Link href={example.href} className="text-fg-2 underline decoration-line-2 underline-offset-4 hover:text-foreground hover:decoration-foreground">
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

// Four steps on a line, each numbered on the rule.
export function HowWeWork({ steps }: { steps: Step[] }) {
  return (
    <section aria-labelledby="how-we-work" className={`${RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionHeader id="how-we-work" eyebrow="How We Work" title="From First Call to Launch" />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step) => (
            <li key={step.step} className="border-t border-line-2 pt-6">
              <span className="font-mono text-[12px] text-fg-3" aria-hidden="true">
                {step.step}
              </span>
              <h3 className={`${H3} mt-4`}>{step.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-fg-3">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
