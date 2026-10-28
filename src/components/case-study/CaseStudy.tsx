import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { Project } from '@/content/schema';
import { projectPath, type ProjectCard } from '@/content/projects';
import { AVAILABILITY, KIND_LABEL, KIND_BADGE, STATUS_BADGE, callToAction, type CallToAction } from '@/content/labels';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import JsonLd from './JsonLd';
import ProjectCardView from './ProjectCardView';
import { MockupCarousel, ScreenGallery } from './Galleries';
import LoopShowcase from './LoopShowcase';

// The page for /products/<slug> and /work/<slug>. It renders on the server with
// no entrance animation, so the title and the promise paint at once. Only the
// recordings, the carousel and the gallery need JavaScript.
//
// A product page is a landing page: the promise → who it's for → what you can
// do → see it work → status → one call to action.
// A work page is a short client story: the client → their need → what we
// delivered → see it → start a similar project.
// Neither says how anything is built (docs/05-CONTENT-TONE-GUIDE.md).

// A live link on client work opens the real site; on anything else it is a demo.
const LIVE_STATUSES: Project['status'][] = ['Production', 'Beta', 'MVP'];

const SECTION_LABEL = 'mb-4 block text-[11px] font-semibold uppercase tracking-widest text-zinc-400';
const SECTION_TITLE = 'mb-8 text-3xl font-bold tracking-tight text-white';
const BUTTON_PRIMARY =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200';
const BUTTON_SECONDARY =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-[#1A1A1A] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#222222]';

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

// Screen recordings first, then the mockups, then the screenshots.
function Visuals({ project }: { project: Project }) {
  const mockups = project.gallery.filter((image) => image.kind === 'mockup');
  const screens = project.gallery.filter((image) => image.kind === 'screen');
  if (project.loops.length === 0 && mockups.length === 0 && screens.length === 0) return null;

  return (
    <section aria-labelledby="see-it" className="mb-24">
      <span className={SECTION_LABEL}>See It</span>
      <h2 id="see-it" className={SECTION_TITLE}>
        {project.section === 'products' ? 'See It Work' : 'What It Looks Like'}
      </h2>
      {project.loops.length > 0 && (
        <div className="mx-auto mb-16 max-w-[1200px]">
          <LoopShowcase loops={project.loops} />
        </div>
      )}
      {mockups.length > 0 && (
        <div className="mx-auto mb-16 max-w-[1200px] overflow-hidden rounded-2xl border border-white/[0.04] shadow-2xl">
          {/* The first slide is fetched early only when it is the first image on the page. */}
          <MockupCarousel images={mockups} title={project.title} priority={project.loops.length === 0} />
        </div>
      )}
      {screens.length > 0 && (
        <>
          <h3 className="mb-6 text-lg font-semibold text-white">Screenshots</h3>
          <ScreenGallery images={screens} title={project.title} />
        </>
      )}
    </section>
  );
}

function Outcomes({ project }: { project: Project }) {
  if (project.metrics.length === 0) return null;
  return (
    <section aria-labelledby="outcomes" className="mb-24">
      <span className={SECTION_LABEL}>Outcomes</span>
      <h2 id="outcomes" className={SECTION_TITLE}>What Changed</h2>
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse rounded-xl border border-white/[0.06] bg-[#141417] p-6">
            <dt className="text-sm text-zinc-400">{metric.label}</dt>
            <dd className="mb-2 text-4xl font-bold tracking-tight text-white">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Related({ related, isProduct }: { related: ProjectCard[]; isProduct: boolean }) {
  if (related.length === 0) return null;
  return (
    <section aria-labelledby="related">
      <span className={SECTION_LABEL}>Related</span>
      <h2 id="related" className={SECTION_TITLE}>{isProduct ? 'More Products' : 'More Client Work'}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {related.map((card) => (
          <ProjectCardView key={card.slug} project={card} headingLevel="h3" sizes="(max-width: 768px) 100vw, 33vw" />
        ))}
      </div>
    </section>
  );
}

export default function CaseStudy({ project, related }: { project: Project; related: ProjectCard[] }) {
  const isProduct = project.section === 'products';
  const path = projectPath(project);
  const cta = callToAction(project);
  const cover = project.cover ? project.gallery.find((image) => image.src === project.cover) : undefined;

  // Client work links to the client's live site; a demo link on a product is
  // the call to action itself, so it isn't repeated here.
  const liveLink =
    !isProduct && project.links.live
      ? { label: LIVE_STATUSES.includes(project.status) ? 'Visit the Live Site' : 'Open the Demo', href: project.links.live }
      : undefined;
  const isClient = project.kind === 'client';

  return (
    <article className="min-h-screen bg-[#0A0A0C] pb-24">
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

      <header className="relative overflow-hidden border-b border-white/[0.04] pt-32 pb-16 md:pb-20">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <Link
            href={isProduct ? '/products' : '/work'}
            className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {isProduct ? 'All Products' : 'All Client Work'}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* The status stays at the top too, so nothing in development reads as shipped. */}
            <span className={`rounded-sm px-3 py-1.5 text-xs font-medium ${STATUS_BADGE[project.status]}`}>
              {project.status}
            </span>
            {!isProduct && (
              <span className={`rounded-sm px-3 py-1.5 text-xs font-medium ${KIND_BADGE[project.kind]}`}>
                {KIND_LABEL[project.kind]}
              </span>
            )}
            <span className="rounded-sm border border-white/[0.06] bg-[#141417] px-3 py-1.5 text-xs font-medium text-zinc-300">
              {project.industry.join(' · ')}
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">{project.title}</h1>
          <p className="mb-4 max-w-3xl text-xl leading-relaxed text-zinc-300 md:text-2xl">{project.subtitle}</p>
          <p className="mb-10 max-w-3xl text-[17px] leading-relaxed text-zinc-400">{project.description}</p>

          {!isProduct && project.client && (
            <p className="mb-10 text-sm text-zinc-400">
              Client: <span className="text-white">{project.client}</span>
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
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
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pt-16">
        {isProduct ? (
          <>
            <section aria-labelledby="audience" className="mb-24 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              <div>
                <span className={SECTION_LABEL}>Who It&apos;s For</span>
                <h2 id="audience" className="text-3xl font-bold tracking-tight text-white">Made for Teams Like Yours</h2>
              </div>
              <div className="flex flex-col gap-5 text-[17px] leading-[1.8]">
                <p className="text-zinc-200">{project.audience}</p>
                <p className="text-zinc-400">{project.need}</p>
              </div>
            </section>

            <section aria-labelledby="features" className="mb-24">
              <span className={SECTION_LABEL}>What You Can Do</span>
              <h2 id="features" className={SECTION_TITLE}>What {project.title} Does for You</h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.features.map((feature) => (
                  <li key={feature.title} className="rounded-xl border border-white/[0.06] bg-[#141417] p-6">
                    <h3 className="mb-3 font-semibold text-white">{feature.title}</h3>
                    <p className="text-[14px] leading-[1.7] text-zinc-400">{feature.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <Visuals project={project} />
            <Outcomes project={project} />

            <section
              aria-labelledby="cta"
              className="mb-24 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#141417] to-[#111113] p-10 md:p-14"
            >
              <span className={`mb-6 inline-block rounded-sm px-3 py-1.5 text-xs font-medium ${STATUS_BADGE[project.status]}`}>
                {project.status}
              </span>
              <h2 id="cta" className="mb-4 text-2xl font-bold text-white md:text-3xl">
                {cta.label === 'Get Notified' ? `Hear When ${project.title} Launches` : `See ${project.title} for Yourself`}
              </h2>
              <p className="mb-8 max-w-xl text-[16px] text-zinc-400">{AVAILABILITY[project.status]}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <CtaButton cta={cta} />
                <Link href="/products" className={BUTTON_SECONDARY}>
                  See All Products
                </Link>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="mb-24 grid gap-12 md:grid-cols-2">
              <section aria-labelledby="need">
                <span className={SECTION_LABEL}>{isClient ? 'The Client' : 'The Need'}</span>
                <h2 id="need" className="mb-6 text-2xl font-bold text-white">{isClient ? 'What They Needed' : 'Why It Exists'}</h2>
                <p className="text-[16px] leading-[1.9] text-zinc-400">{project.need}</p>
              </section>
              <section aria-labelledby="delivered">
                <span className={SECTION_LABEL}>{isClient ? 'Our Work' : 'The Result'}</span>
                <h2 id="delivered" className="mb-6 text-2xl font-bold text-white">{isClient ? 'What We Delivered' : 'What We Made'}</h2>
                <p className="text-[16px] leading-[1.9] text-zinc-400">{project.delivered}</p>
                {project.features.length > 0 && (
                  <ul className="mt-8 flex flex-col gap-4">
                    {project.features.map((feature) => (
                      <li key={feature.title} className="rounded-xl border border-white/[0.06] bg-[#141417] p-5">
                        <h3 className="mb-1 text-[15px] font-semibold text-white">{feature.title}</h3>
                        <p className="text-[14px] leading-[1.7] text-zinc-400">{feature.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <Visuals project={project} />
            <Outcomes project={project} />

            <section
              aria-labelledby="cta"
              className="mb-24 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#141417] to-[#111113] p-10 md:p-14"
            >
              <h2 id="cta" className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Need Something Like This?
              </h2>
              <p className="mb-8 max-w-xl text-[16px] text-zinc-400">
                Tell us about your business and what you want to change. We&apos;ll reply with how we would approach it.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <CtaButton cta={cta} />
                <Link href="/work" className={BUTTON_SECONDARY}>
                  See More Client Work
                </Link>
              </div>
            </section>
          </>
        )}

        <Related related={related} isProduct={isProduct} />
      </div>
    </article>
  );
}
