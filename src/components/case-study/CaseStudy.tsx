import Link from 'next/link';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import type { Feature, GalleryImage, Project } from '@/content/schema';
import { productSite, projectPath, type ProjectCard } from '@/content/projects';
import {
  AVAILABILITY,
  IN_DEVELOPMENT,
  STATUS_LABEL,
  callToAction,
  type CallToAction,
} from '@/content/labels';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { galleryRest, isPhoneScreen, leadShots } from '@/lib/shots';
import { Reveal } from '@/components/ui/motion';
import ProductShot, { Plate, ShotPanel } from '@/components/ui/ProductShot';
import { KindBadge, StageBadge, StatusBadge } from '@/components/ui/Badge';
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CHIP,
  CONTAINER,
  DISPLAY,
  EYEBROW,
  H1,
  H2,
  H3,
  LEAD,
  RULE,
  SECTION,
  SUBTITLE,
} from '@/components/ui/styles';
import JsonLd from './JsonLd';
import ProjectCardView, { ProductCard } from './ProjectCardView';
import MediaCredit from './MediaCredit';
import { MockupCarousel, ScreenGallery } from './Galleries';
import LoopShowcase from './LoopShowcase';

// The page for /products/<slug> and /work/<slug>. It renders on the server; the first view (the title, the promise,
// the facts and the lead picture) has no entrance animation, so it paints at once. Only the recordings, the carousel
// and the gallery need JavaScript.
//
// A product page: the promise and the facts side by side → its picture (or plate) → who it's for → what it does, each
// feature with its stage while it is being built → see it work → where it stands and one call to action.
// A client story: the same system, quieter: the client and the facts → the picture → what they needed and what we
// delivered → see it → start a similar project.
// Neither says how anything is built (docs/05-CONTENT-TONE-GUIDE.md).

// A live link on client work opens the real site; on anything else it is a demo.
const LIVE_STATUSES: Project['status'][] = ['Production', 'Beta', 'MVP'];

function CtaButton({ cta, className = BUTTON_PRIMARY }: { cta: CallToAction; className?: string }) {
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function OutLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
      {label}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function SectionTitle({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        <span className={EYEBROW}>{eyebrow}</span>
        <h2 id={id} className={`${H2} mt-4`}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Breadcrumb({ section, title }: { section: Project['section']; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 md:mb-14">
      <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-fg-3">
        <li>
          <Link href={`/${section}`} className="transition-colors hover:text-foreground">
            {section === 'products' ? 'Products' : 'Client Work'}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 text-fg-4" />
        </li>
        <li aria-current="page" className="text-fg-2">
          {title}
        </li>
      </ol>
    </nav>
  );
}

// The facts beside the title: a ruled list of what a buyer checks first.
function Facts({ rows }: { rows: { term: string; value: React.ReactNode }[] }) {
  return (
    <dl className="rounded-xl border border-line bg-surface/80">
      {rows.map(({ term, value }) => (
        <div key={term} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-b border-line px-5 py-4 last:border-b-0">
          <dt className="pt-0.5 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-3">{term}</dt>
          <dd className="text-[15px] leading-[1.55] text-fg-2">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

// The picture that leads the page, in its frame on a surface panel, with the same page on a phone beside it when
// there is one. A product shown only on phones leads with three phone screens, its cover in the middle (one on a
// phone). A product with no screenshots yet shows its plate.
function LeadShot({ project, lead, beside }: { project: Project; lead?: GalleryImage; beside: GalleryImage[] }) {
  if (!lead) {
    if (project.section !== 'products') return null;
    return (
      <Plate
        words={project.scope}
        top={`${project.title} / ${STATUS_LABEL[project.status]}`}
        foot={project.tagline}
        label={`${project.title}: ${project.scope?.join(', ')}. No screenshots yet: it is ${STATUS_LABEL[project.status].toLowerCase()}.`}
        className="md:aspect-[16/6]"
      />
    );
  }
  if (isPhoneScreen(lead)) {
    const [left, right] = beside;
    const side = 'hidden w-full max-w-[240px] md:block';
    // A phone lead is never the largest paint (the intro paragraph is), so it loads eagerly but is not preloaded at
    // high priority: a high-priority preload only competes with the fonts and CSS that the paragraph waits for.
    return (
      <ShotPanel>
        <div className="flex items-start justify-center gap-10">
          {left && <ProductShot image={left} sizes="240px" className={side} />}
          <ProductShot image={lead} sizes="(max-width: 768px) 280px, 240px" eager className="w-full max-w-[280px] md:max-w-[240px]" />
          {right && <ProductShot image={right} sizes="240px" className={side} />}
        </div>
      </ShotPanel>
    );
  }
  const [phone] = beside;
  if (!phone) {
    return (
      <ShotPanel>
        <ProductShot image={lead} sizes="(max-width: 1280px) calc(100vw - 64px), 1120px" priority />
      </ShotPanel>
    );
  }
  return (
    <ShotPanel>
      <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.3fr)] md:gap-8">
        <ProductShot image={lead} sizes="(max-width: 768px) calc(100vw - 64px), (max-width: 1280px) 72vw, 860px" priority />
        <ProductShot image={phone} sizes="260px" className="mx-auto hidden w-full max-w-[260px] md:block" />
      </div>
    </ShotPanel>
  );
}

// Each feature that has a screenshot gets a row: the screenshot on one side, the feature on the other, alternating.
// The rest follow as a ruled grid. A feature on a product still being built carries its own stage.
function Features({ project }: { project: Project }) {
  const image = (feature: Feature) => project.gallery.find((entry) => entry.src === feature.image);
  const rows = project.features.flatMap((feature) => {
    const shot = image(feature);
    return shot ? [{ feature, shot }] : [];
  });
  const others = project.features.filter((feature) => !image(feature));

  return (
    <>
      {rows.length > 0 && (
        <ul className="flex flex-col gap-16 md:gap-24">
          {rows.map(({ feature, shot }, i) => (
            <li key={feature.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <figure className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <ShotPanel tight>
                  <ProductShot image={shot} sizes="(max-width: 1024px) calc(100vw - 64px), 660px" />
                </ShotPanel>
                <figcaption className="mt-3 text-[13px] leading-[1.5] text-fg-3">
                  {shot.alt}
                  {shot.credit && <MediaCredit credit={shot.credit} className="mt-1 block" />}
                </figcaption>
              </figure>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {feature.stage && <StageBadge stage={feature.stage} className="ml-3" />}
                <h3 className="mt-4 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[32px]">
                  {feature.title}
                </h3>
                <p className={`${LEAD} mt-4`}>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {others.length > 0 && (
        <ul
          className={`grid gap-x-8 gap-y-12 sm:grid-cols-2 ${others.length % 2 === 0 && others.length < 6 ? '' : 'lg:grid-cols-3'} ${rows.length > 0 ? 'mt-16 md:mt-24' : ''}`}
        >
          {others.map((feature, i) => (
            <li key={feature.title} className="flex flex-col border-t border-line-2 pt-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                  {String(rows.length + i + 1).padStart(2, '0')}
                </span>
                {feature.stage && <StageBadge stage={feature.stage} />}
              </div>
              <h3 className={`${H3} mt-6`}>{feature.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-fg-3">{feature.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// The key to the feature stages, shown when any feature has one.
function StageKey() {
  return (
    <dl className="flex flex-col gap-2 text-[14px] text-fg-3 md:items-end">
      <div className="flex items-center gap-3">
        <dt>
          <StageBadge stage="in-development" />
        </dt>
        <dd>Being built now</dd>
      </div>
      <div className="flex items-center gap-3">
        <dt>
          <StageBadge stage="planned" />
        </dt>
        <dd>Comes after</dd>
      </div>
    </dl>
  );
}

// The recordings, then the mockups, then the screenshots not shown above. Not wrapped in Reveal: the galleries open a
// full-screen viewer.
function Visuals({ project, rest }: { project: Project; rest: GalleryImage[] }) {
  const mockups = rest.filter((image) => image.kind === 'mockup');
  const screens = rest.filter((image) => image.kind === 'screen');
  if (project.loops.length === 0 && mockups.length === 0 && screens.length === 0) return null;

  return (
    <section aria-labelledby="see-it" className={`${RULE} ${SECTION}`}>
      <div className={CONTAINER}>
        <SectionTitle id="see-it" eyebrow="See It" title={project.section === 'products' ? 'See It Work' : 'What It Looks Like'} />
        {project.loops.length > 0 && (
          <div className="mb-16 md:mb-24">
            <LoopShowcase loops={project.loops} />
          </div>
        )}
        {mockups.length > 0 && (
          <div className="mb-16 md:mb-24">
            <MockupCarousel images={mockups} title={project.title} />
          </div>
        )}
        {screens.length > 0 && (
          <>
            <h3 className={`${H3} mb-8`}>Screenshots</h3>
            <ScreenGallery images={screens} title={project.title} />
          </>
        )}
      </div>
    </section>
  );
}

function Outcomes({ project }: { project: Project }) {
  if (project.metrics.length === 0) return null;
  return (
    <section aria-labelledby="outcomes" className={`${RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionTitle id="outcomes" eyebrow="Outcomes" title="What Changed" />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse border-t border-line-2 pt-6">
              <dt className="text-[14px] text-fg-3">{metric.label}</dt>
              <dd className="mb-2 font-display text-[40px] font-semibold tracking-[-0.03em] text-foreground">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Related({ related, isProduct }: { related: ProjectCard[]; isProduct: boolean }) {
  if (related.length === 0) return null;
  return (
    <section aria-labelledby="related" className={`${RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionTitle id="related" eyebrow="Related" title={isProduct ? 'More Products' : 'More Client Work'}>
          <Link
            href={isProduct ? '/products' : '/work'}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline decoration-line-2 underline-offset-[6px] hover:decoration-foreground"
          >
            {isProduct ? 'All Products' : 'All Client Work'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </SectionTitle>
        <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {related.map((card) => (
            <li key={card.slug}>
              {isProduct ? (
                <ProductCard product={card} sizes="(max-width: 768px) calc(100vw - 32px), 400px" />
              ) : (
                <ProjectCardView project={card} headingLevel="h3" sizes="(max-width: 768px) calc(100vw - 32px), 400px" />
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

// The closing panel: where it stands and the one thing to do next.
function ClosingCta({
  badge,
  title,
  text,
  children,
}: {
  badge?: React.ReactNode;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby="cta" className={`${RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 md:px-14 md:py-16">
          <div className="grid-paper pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_100%_100%,#000_20%,transparent_75%)]" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              {badge}
              <h2 id="cta" className={`${H2} ${badge ? 'mt-6' : ''}`}>
                {title}
              </h2>
              <p className={`${LEAD} mt-5`}>{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">{children}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function CaseStudy({ project, related }: { project: Project; related: ProjectCard[] }) {
  const isProduct = project.section === 'products';
  const isClient = project.kind === 'client';
  const path = projectPath(project);
  const cta = callToAction(project);
  const site = isProduct ? productSite(project.slug) : undefined;
  const cover = project.cover ? project.gallery.find((image) => image.src === project.cover) : undefined;
  const { lead, beside } = leadShots(project);
  const rest = galleryRest(project, [lead, ...beside]);
  const availability = project.availability ?? AVAILABILITY[project.status];
  const unreleased = IN_DEVELOPMENT.includes(project.status);
  const staged = project.features.some((feature) => feature.stage);

  // Client work links to the client's live site; a demo link on a product is the call to action itself, so it isn't
  // repeated here.
  const liveLink =
    !isProduct && project.links.live
      ? { label: LIVE_STATUSES.includes(project.status) ? 'Visit the Live Site' : 'Open the Demo', href: project.links.live }
      : undefined;

  const facts = isProduct
    ? [
        { term: 'Status', value: <StatusBadge status={project.status} /> },
        { term: 'Availability', value: availability },
        ...(project.scope
          ? [
              {
                term: 'Covers',
                value: (
                  <ul className="flex flex-wrap gap-1.5">
                    {project.scope.map((word) => (
                      <li key={word} className={CHIP}>
                        {word}
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]
          : []),
        { term: 'Category', value: project.category },
      ]
    : [
        ...(project.client ? [{ term: 'Client', value: project.client }] : []),
        { term: 'Industry', value: project.industry.join(', ') },
        { term: 'Year', value: project.year },
        { term: 'Status', value: <StatusBadge status={project.status} /> },
      ];

  return (
    <article>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          headline: project.subtitle,
          description: project.summary,
          url: `${SITE_URL}${path}`,
          dateCreated: project.year,
          genre: project.category,
          keywords: project.tags.join(', '),
          about: project.industry,
          ...(cover ? { image: `${SITE_URL}${cover.src}` } : {}),
          creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        }}
      />

      <header className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="grid-paper grid-paper-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className={`${CONTAINER} relative`}>
          <Breadcrumb section={project.section} title={project.title} />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {/* The status stays at the top too, so nothing in development reads as shipped. */}
                {isProduct ? <StatusBadge status={project.status} /> : <KindBadge kind={project.kind} />}
                <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-fg-3">
                  {isProduct ? project.category : project.industry.join(' / ')}
                </span>
              </div>
              <h1 className={isProduct ? DISPLAY : H1}>{project.title}</h1>
              <p className={`${SUBTITLE} mt-5 max-w-[34ch]`}>{project.subtitle}</p>
              <p className={`${LEAD} mt-6`}>{project.description}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CtaButton cta={cta} />
                {liveLink && <OutLink href={liveLink.href} label={liveLink.label} />}
                {site && <OutLink href={site} label="Product Site" />}
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <Facts rows={facts} />
            </div>
          </div>
        </div>

        {(lead || isProduct) && (
          <div className={`${CONTAINER} relative mt-12 md:mt-16`}>
            <LeadShot project={project} lead={lead} beside={beside} />
          </div>
        )}
      </header>

      {isProduct ? (
        <>
          <section aria-labelledby="audience" className={`${RULE} ${SECTION}`}>
            <Reveal className={`${CONTAINER} grid gap-8 md:grid-cols-12 md:gap-12`}>
              <div className="md:col-span-5">
                <span className={EYEBROW}>Who It&apos;s For</span>
                <h2 id="audience" className={`${H2} mt-4`}>
                  Made for Teams Like Yours
                </h2>
              </div>
              <div className="flex flex-col gap-5 md:col-span-7">
                <p className="max-w-[62ch] text-[18px] leading-[1.6] text-fg-2 md:text-[20px]">{project.audience}</p>
                <p className={LEAD}>{project.need}</p>
              </div>
            </Reveal>
          </section>

          <section aria-labelledby="features" className={`${RULE} ${SECTION}`}>
            <div className={CONTAINER}>
              <SectionTitle
                id="features"
                eyebrow={unreleased ? 'What It Will Do' : 'What You Can Do'}
                title={unreleased ? `What ${project.title} Will Do for You` : `What ${project.title} Does for You`}
              >
                {staged && <StageKey />}
              </SectionTitle>
              <Features project={project} />
            </div>
          </section>

          <Visuals project={project} rest={rest} />
          <Outcomes project={project} />

          <ClosingCta
            badge={<StatusBadge status={project.status} />}
            title={cta.label === 'Get Notified' ? `Hear When ${project.title} Launches` : `See ${project.title} for Yourself`}
            text={availability}
          >
            <CtaButton cta={cta} />
            {site && <OutLink href={site} label="Product Site" />}
          </ClosingCta>
        </>
      ) : (
        <>
          <section aria-label="The story" className={`${RULE} ${SECTION}`}>
            <Reveal className={`${CONTAINER} grid gap-14 lg:grid-cols-2 lg:gap-20`}>
              <div>
                <span className={EYEBROW}>{isClient ? 'The Client' : 'The Need'}</span>
                <h2 id="need" className={`${H2} mt-4`}>
                  {isClient ? 'What They Needed' : 'Why It Exists'}
                </h2>
                <p className={`${LEAD} mt-6`}>{project.need}</p>
              </div>
              <div>
                <span className={EYEBROW}>{isClient ? 'Our Work' : 'The Result'}</span>
                <h2 id="delivered" className={`${H2} mt-4`}>
                  {isClient ? 'What We Delivered' : 'What We Made'}
                </h2>
                <p className={`${LEAD} mt-6`}>{project.delivered}</p>
              </div>
            </Reveal>
            {project.features.length > 0 && (
              <Reveal className={`${CONTAINER} mt-14 md:mt-20`}>
                <ul
                  className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${project.features.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}
                >
                  {project.features.map((feature, i) => (
                    <li key={feature.title} className="border-t border-line-2 pt-6">
                      <span className="font-mono text-[12px] text-fg-4" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-5 text-[17px] font-semibold leading-[1.35] text-foreground">{feature.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-fg-3">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </section>

          <Visuals project={project} rest={rest} />
          <Outcomes project={project} />

          <ClosingCta
            title="Need Something Like This?"
            text="Tell us about your business and what you want to change. We'll reply with how we would approach it."
          >
            <CtaButton cta={cta} />
            <Link href="/work" className={BUTTON_SECONDARY}>
              More Client Work
            </Link>
          </ClosingCta>
        </>
      )}

      <Related related={related} isProduct={isProduct} />
    </article>
  );
}
