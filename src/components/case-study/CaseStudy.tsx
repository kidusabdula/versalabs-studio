import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { Feature, GalleryImage, Project } from '@/content/schema';
import { projectPath, type ProjectCard } from '@/content/projects';
import { AVAILABILITY, callToAction, type CallToAction } from '@/content/labels';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { galleryRest, leadShots } from '@/lib/shots';
import { Reveal } from '@/components/ui/motion';
import ProductShot, { ShotPanel, ShotPlaceholder } from '@/components/ui/ProductShot';
import { KindBadge, StatusBadge } from '@/components/ui/Badge';
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CARD,
  CONTAINER,
  DISPLAY,
  EYEBROW,
  H1_QUIET,
  H2,
  H3,
  LEAD,
  SECTION,
  SECTION_RULE,
} from '@/components/ui/styles';
import JsonLd from './JsonLd';
import ProjectCardView from './ProjectCardView';
import MediaCredit from './MediaCredit';
import { MockupCarousel, ScreenGallery } from './Galleries';
import LoopShowcase from './LoopShowcase';

// The page for /products/<slug> and /work/<slug>. It renders on the server; the
// first view (the title, the promise and the lead screenshot) has no entrance
// animation, so it paints at once. Only the recordings, the carousel and the
// gallery need JavaScript.
//
// A product page is a landing page: the promise and the product, side by side
// with its call to action → who it's for → what you can do, each feature beside
// the screen that shows it → see it work → its status and one call to action.
// A work page is the same system, quieter: the client → their need → what we
// delivered → see it → start a similar project.
// Neither says how anything is built (docs/05-CONTENT-TONE-GUIDE.md).

// A live link on client work opens the real site; on anything else it is a demo.
const LIVE_STATUSES: Project['status'][] = ['Production', 'Beta', 'MVP'];

const STORY_TITLE = 'mb-5 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground md:text-[28px]';

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

function SectionTitle({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <span className={EYEBROW}>{eyebrow}</span>
      <h2 id={id} className={H2}>
        {title}
      </h2>
    </div>
  );
}

// The screenshot that leads the page, in its frame on a surface panel, with
// the same page on a phone beside it when there is one. A product with no
// screenshots yet shows its name, status and availability in the frame.
function LeadShot({ project, desktop, phone }: { project: Project; desktop?: GalleryImage; phone?: GalleryImage }) {
  if (!desktop) {
    if (project.section !== 'products') return null;
    return (
      <ShotPanel>
        <ShotPlaceholder
          title={project.title}
          status={project.status}
          line={AVAILABILITY[project.status]}
          className="mx-auto max-w-[760px]"
        />
      </ShotPanel>
    );
  }
  if (!phone) {
    return (
      <ShotPanel>
        <ProductShot image={desktop} sizes="(max-width: 1248px) calc(100vw - 64px), 1120px" priority />
      </ShotPanel>
    );
  }
  return (
    <ShotPanel>
      <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.3fr)] md:gap-8">
        <ProductShot image={desktop} sizes="(max-width: 768px) calc(100vw - 64px), (max-width: 1248px) 72vw, 860px" priority />
        <ProductShot image={phone} sizes="260px" className="mx-auto hidden w-full max-w-[260px] md:block" />
      </div>
    </ShotPanel>
  );
}

// Each feature that has a screenshot gets a row: the screenshot on one side,
// the feature on the other, alternating. The rest follow as a grid of cards.
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
          {rows.map(({ feature, shot }, i) => {
            return (
              <li key={feature.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <figure className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ShotPanel tight>
                    <ProductShot image={shot} sizes="(max-width: 1024px) calc(100vw - 64px), 660px" />
                  </ShotPanel>
                  <figcaption className="mt-3 text-[13px] leading-[1.5] text-zinc-400">
                    {shot.alt}
                    {shot.credit && <MediaCredit credit={shot.credit} className="mt-1 block" />}
                  </figcaption>
                </figure>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="mb-4 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground md:text-[30px]">
                    {feature.title}
                  </h3>
                  <p className={LEAD}>{feature.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {others.length > 0 && (
        <ul
          className={`grid gap-5 sm:grid-cols-2 lg:gap-6 ${others.length % 2 === 0 && others.length < 6 ? '' : 'lg:grid-cols-3'} ${rows.length > 0 ? 'mt-16 md:mt-24' : ''}`}
        >
          {others.map((feature) => (
            <li key={feature.title} className={`${CARD} p-7`}>
              <h3 className={`${H3} mb-3`}>{feature.title}</h3>
              <p className="text-[15px] leading-[1.6] text-zinc-400">{feature.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// The recordings, then the mockups, then the screenshots not shown above.
function Visuals({ project, rest }: { project: Project; rest: GalleryImage[] }) {
  const mockups = rest.filter((image) => image.kind === 'mockup');
  const screens = rest.filter((image) => image.kind === 'screen');
  if (project.loops.length === 0 && mockups.length === 0 && screens.length === 0) return null;

  return (
    <section aria-labelledby="see-it" className={`${SECTION_RULE} ${SECTION}`}>
      <div className={CONTAINER}>
        <SectionTitle
          id="see-it"
          eyebrow="See It"
          title={project.section === 'products' ? 'See It Work' : 'What It Looks Like'}
        />
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
    <section aria-labelledby="outcomes" className={`${SECTION_RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionTitle id="outcomes" eyebrow="Outcomes" title="What Changed" />
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {project.metrics.map((metric) => (
            <div key={metric.label} className={`${CARD} flex flex-col-reverse p-7`}>
              <dt className="text-[14px] text-zinc-400">{metric.label}</dt>
              <dd className="mb-2 text-[40px] font-semibold tracking-[-0.02em] text-foreground">{metric.value}</dd>
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
    <section aria-labelledby="related" className={`${SECTION_RULE} ${SECTION}`}>
      <Reveal className={CONTAINER}>
        <SectionTitle id="related" eyebrow="Related" title={isProduct ? 'More Products' : 'More Client Work'} />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {related.map((card) => (
            <ProjectCardView key={card.slug} project={card} headingLevel="h3" sizes="(max-width: 768px) 100vw, 400px" />
          ))}
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
  const cover = project.cover ? project.gallery.find((image) => image.src === project.cover) : undefined;
  const { desktop, phone } = leadShots(project);
  const rest = galleryRest(project, [desktop, phone]);

  // Client work links to the client's live site; a demo link on a product is
  // the call to action itself, so it isn't repeated here.
  const liveLink =
    !isProduct && project.links.live
      ? { label: LIVE_STATUSES.includes(project.status) ? 'Visit the Live Site' : 'Open the Demo', href: project.links.live }
      : undefined;

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

      <header className="pt-8 pb-16 md:pt-12 md:pb-28">
        <div className={CONTAINER}>
          <Link
            href={isProduct ? '/products' : '/work'}
            className="mb-10 inline-flex items-center gap-2 text-[14px] text-zinc-400 transition-colors hover:text-foreground md:mb-14"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {isProduct ? 'All Products' : 'All Client Work'}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* The status stays at the top too, so nothing in development reads as shipped. */}
            <StatusBadge status={project.status} />
            {!isProduct && <KindBadge kind={project.kind} />}
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-400">
              {project.industry.join(' · ')}
            </span>
          </div>

          <h1 className={isProduct ? DISPLAY : H1_QUIET}>{project.title}</h1>
          <p className="mt-5 max-w-[40ch] text-[20px] leading-[1.4] text-zinc-300 md:text-[24px]">{project.subtitle}</p>
          <p className={`${LEAD} mt-6`}>{project.description}</p>

          {!isProduct && project.client && (
            <p className="mt-6 text-[15px] text-zinc-400">
              Client: <span className="text-foreground">{project.client}</span>
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CtaButton cta={cta} />
            {liveLink && (
              <a href={liveLink.href} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
                {liveLink.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>

        {(desktop || isProduct) && (
          <div className={`${CONTAINER} mt-12 md:mt-16`}>
            <LeadShot project={project} desktop={desktop} phone={phone} />
          </div>
        )}
      </header>

      {isProduct ? (
        <>
          <section aria-labelledby="audience" className={`${SECTION_RULE} ${SECTION}`}>
            <Reveal className={`${CONTAINER} grid gap-8 md:grid-cols-2 md:gap-12`}>
              <div>
                <span className={EYEBROW}>Who It&apos;s For</span>
                <h2 id="audience" className={H2}>
                  Made for Teams Like Yours
                </h2>
              </div>
              <div className="flex flex-col gap-5">
                <p className="max-w-[68ch] text-[17px] leading-[1.6] text-zinc-200 md:text-[18px]">{project.audience}</p>
                <p className={LEAD}>{project.need}</p>
              </div>
            </Reveal>
          </section>

          <section aria-labelledby="features" className={`${SECTION_RULE} ${SECTION}`}>
            <div className={CONTAINER}>
              <SectionTitle id="features" eyebrow="What You Can Do" title={`What ${project.title} Does for You`} />
              <Features project={project} />
            </div>
          </section>

          <Visuals project={project} rest={rest} />
          <Outcomes project={project} />

          <section aria-labelledby="cta" className={`${SECTION_RULE} ${SECTION}`}>
            <Reveal className={CONTAINER}>
              <div className={`${CARD} px-6 py-12 md:px-12 md:py-16`}>
                <StatusBadge status={project.status} className="mb-6" />
                <h2 id="cta" className={H2}>
                  {cta.label === 'Get Notified' ? `Hear When ${project.title} Launches` : `See ${project.title} for Yourself`}
                </h2>
                <p className={`${LEAD} mt-5`}>{AVAILABILITY[project.status]}</p>
                <div className="mt-10">
                  <CtaButton cta={cta} />
                </div>
              </div>
            </Reveal>
          </section>
        </>
      ) : (
        <>
          <section aria-label="The story" className={`${SECTION_RULE} ${SECTION}`}>
            <Reveal className={`${CONTAINER} grid gap-12 md:grid-cols-2`}>
              <div>
                <span className={EYEBROW}>{isClient ? 'The Client' : 'The Need'}</span>
                <h2 id="need" className={STORY_TITLE}>
                  {isClient ? 'What They Needed' : 'Why It Exists'}
                </h2>
                <p className={LEAD}>{project.need}</p>
              </div>
              <div>
                <span className={EYEBROW}>{isClient ? 'Our Work' : 'The Result'}</span>
                <h2 id="delivered" className={STORY_TITLE}>
                  {isClient ? 'What We Delivered' : 'What We Made'}
                </h2>
                <p className={LEAD}>{project.delivered}</p>
                {project.features.length > 0 && (
                  <ul className="mt-8 flex flex-col gap-4">
                    {project.features.map((feature) => (
                      <li key={feature.title} className={`${CARD} p-5`}>
                        <h3 className="mb-1 text-[16px] font-semibold text-foreground">{feature.title}</h3>
                        <p className="text-[15px] leading-[1.6] text-zinc-400">{feature.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </section>

          <Visuals project={project} rest={rest} />
          <Outcomes project={project} />

          <section aria-labelledby="cta" className={`${SECTION_RULE} ${SECTION}`}>
            <Reveal className={CONTAINER}>
              <div className={`${CARD} px-6 py-12 md:px-12 md:py-16`}>
                <h2 id="cta" className={H2}>
                  Need Something Like This?
                </h2>
                <p className={`${LEAD} mt-5`}>
                  Tell us about your business and what you want to change. We&apos;ll reply with how we would approach it.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <CtaButton cta={cta} />
                  <Link href="/work" className={BUTTON_SECONDARY}>
                    See More Client Work
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </>
      )}

      <Related related={related} isProduct={isProduct} />
    </article>
  );
}
