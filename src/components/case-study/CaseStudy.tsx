import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Layers, X } from 'lucide-react';
import type { Project } from '@/content/schema';
import { projectPath, type ProjectCard } from '@/content/projects';
import { KIND_LABEL, KIND_BADGE, STATUS_BADGE } from '@/content/labels';
import { getDiagramSvg } from '@/lib/diagrams';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import DialogOpenButton from './DialogOpenButton';
import JsonLd from './JsonLd';
import ProjectCardView from './ProjectCardView';
import { MockupCarousel, ScreenGallery } from './Galleries';

// The case study template for /work/<slug> and /products/<slug>. It renders on
// the server with no entrance animation, so the title and summary paint at once
// (they are the largest content in a phone's first view). Only the carousel,
// the gallery and the dialog's open button need JavaScript.
//
// Order: what it is → why it exists → what we built → what you get →
// architecture → outcomes → screenshots → stack → call to action.

const LIVE_STATUSES: Project['status'][] = ['Production', 'Beta', 'MVP'];

// Closing line for the call to action, by project kind.
const INTEREST_COPY: Record<Project['kind'], (title: string) => string> = {
  product: (title) => `Deploy ${title} for your organization, or ask us to adapt it to how you work.`,
  client: () => 'We built this for a client, and we can build something like it for you. Tell us what you need.',
  internal: () => 'We built this in-house, and we can build something like it for you. Tell us what you need.',
  research: () =>
    'This began as a university research project. If you need something similar, we can build it for you. Tell us what you need.',
};

const DIALOG_ID = 'architecture-dialog';

const SECTION_LABEL = 'mb-4 block text-[11px] font-semibold uppercase tracking-widest text-zinc-400';
const SECTION_TITLE = 'mb-8 text-3xl font-bold tracking-tight text-white';
const BUTTON_SECONDARY =
  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1C1C1F] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#27272A]';

export default function CaseStudy({ project, related }: { project: Project; related: ProjectCard[] }) {
  const isProduct = project.section === 'products';
  const inDevelopment = project.status === 'Development';
  const path = projectPath(project);

  const mockups = project.gallery.filter((image) => image.kind === 'mockup');
  const screens = project.gallery.filter((image) => image.kind === 'screen');
  const steps = project.systemFlow.split('→').map((step) => step.trim()).filter(Boolean);
  const diagram = getDiagramSvg(project.slug);
  const hasDeepDetail =
    project.boundedContexts.length > 0 ||
    project.schema.length > 0 ||
    project.adrs.length > 0 ||
    project.architecture.designPatterns.length > 0;

  const liveLabel = LIVE_STATUSES.includes(project.status)
    ? 'Visit the Live Site'
    : project.kind === 'product' && inDevelopment
      ? 'Open the Demo (Demo Data)'
      : 'Open the Demo';
  const primaryCta = isProduct ? (inDevelopment ? `Ask About ${project.title}` : 'Request a Demo') : 'Build Something Like This';
  const interestCopy =
    project.kind === 'product' && inDevelopment
      ? `${project.title} is still in development. If it fits a problem you have, tell us about it.`
      : INTEREST_COPY[project.kind](project.title);

  const cover = project.cover ? project.gallery.find((image) => image.src === project.cover) : undefined;

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

      {/* What it is */}
      <header className="relative overflow-hidden border-b border-white/[0.04] pt-32 pb-16 md:pb-20">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <Link
            href={isProduct ? '/products' : '/work'}
            className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {isProduct ? 'All Products' : 'All Work'}
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className={`rounded-sm px-3 py-1.5 text-xs font-medium ${STATUS_BADGE[project.status]}`}>
              {project.status}
            </span>
            <span className={`rounded-sm px-3 py-1.5 text-xs font-medium ${KIND_BADGE[project.kind]}`}>
              {KIND_LABEL[project.kind]}
            </span>
            <span className="rounded-sm border border-white/[0.06] bg-[#141417] px-3 py-1.5 text-xs font-medium text-zinc-300">
              {project.year}
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">{project.title}</h1>
          <p className="mb-4 max-w-3xl text-xl leading-relaxed text-zinc-300 md:text-2xl">{project.subtitle}</p>
          <p className="mb-8 max-w-3xl text-[17px] leading-relaxed text-zinc-400">{project.description}</p>

          <dl className="mb-10 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-3 text-sm sm:grid-cols-[auto_1fr]">
            {project.client && (
              <>
                <dt className="text-zinc-400">Client</dt>
                <dd className="text-white">{project.client}</dd>
              </>
            )}
            <dt className="text-zinc-400">Industry</dt>
            <dd className="text-white">{project.industry.join(', ')}</dd>
            {project.stack.length > 0 && (
              <>
                <dt className="text-zinc-400">Built With</dt>
                <dd className="text-white">{project.stack.join(', ')}</dd>
              </>
            )}
          </dl>

          <div className="flex flex-wrap items-center gap-4">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                {liveLabel}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
                <Code2 className="h-4 w-4" aria-hidden="true" />
                View the Code
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <Link href="/contact" className={BUTTON_SECONDARY}>
              {primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pt-16">
        {mockups.length > 0 && (
          <div className="mx-auto mb-24 max-w-[1200px] overflow-hidden rounded-2xl border border-white/[0.04] shadow-2xl">
            <MockupCarousel images={mockups} title={project.title} />
          </div>
        )}

        {/* Why it exists, and what we built */}
        <div className="mb-24 grid gap-12 md:grid-cols-2">
          <section aria-labelledby="problem">
            <span className={SECTION_LABEL}>The Problem</span>
            <h2 id="problem" className="mb-6 text-2xl font-bold text-white">Why This Exists</h2>
            <p className="text-[16px] leading-[1.9] text-zinc-400">{project.businessProblem}</p>
          </section>
          <section aria-labelledby="built">
            <span className={SECTION_LABEL}>The Build</span>
            <h2 id="built" className="mb-6 text-2xl font-bold text-white">What We Built</h2>
            <p className="text-[16px] leading-[1.9] text-zinc-400">{project.architecturalSolution}</p>
          </section>
        </div>

        {project.features.length > 0 && (
          <section aria-labelledby="features" className="mb-24">
            <span className={SECTION_LABEL}>Capabilities</span>
            <h2 id="features" className={SECTION_TITLE}>What You Get</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature) => (
                <li key={feature.title} className="rounded-xl border border-white/[0.06] bg-[#141417] p-6">
                  <h3 className="mb-3 font-semibold text-white">{feature.title}</h3>
                  <p className="text-[14px] leading-[1.7] text-zinc-400">{feature.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="architecture" className="mb-24">
          <span className={SECTION_LABEL}>Architecture</span>
          <h2 id="architecture" className="mb-3 text-3xl font-bold tracking-tight text-white">How It Works</h2>
          <p className="mb-10 max-w-3xl text-[16px] leading-relaxed text-zinc-400">{project.architecture.pattern}</p>

          {diagram && (
            <figure className="mb-12 rounded-2xl border border-white/[0.06] bg-[#0E0E10] p-4 md:p-8">
              {/* Our own SVG, rendered from src/content/diagrams/<slug>.mmd and checked at build. */}
              <div className="diagram mx-auto max-w-[900px]" dangerouslySetInnerHTML={{ __html: diagram }} />
              <figcaption className="mt-6 text-center text-[13px] text-zinc-400">
                {project.title} architecture. The steps below describe the same flow in text.
              </figcaption>
            </figure>
          )}

          <h3 className="mb-6 text-lg font-semibold text-white">The Flow, Step by Step</h3>
          <ol className="mb-10 grid gap-3 md:grid-cols-2">
            {steps.map((step, i) => (
              <li key={`${i}-${step}`} className="flex gap-4 rounded-xl border border-white/[0.06] bg-[#141417] p-4">
                <span className="w-6 shrink-0 font-mono text-sm text-zinc-400 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] leading-relaxed text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>

          {hasDeepDetail && (
            <DialogOpenButton target={DIALOG_ID} className={BUTTON_SECONDARY}>
              <Layers className="h-4 w-4" aria-hidden="true" />
              View the Full Architecture
            </DialogOpenButton>
          )}
        </section>

        {project.metrics.length > 0 && (
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
        )}

        {screens.length > 0 && (
          <section aria-labelledby="screens" className="mb-24">
            <span className={SECTION_LABEL}>Screenshots</span>
            <h2 id="screens" className={SECTION_TITLE}>See It in Action</h2>
            <ScreenGallery images={screens} title={project.title} />
          </section>
        )}

        {project.techStack.length > 0 && (
          <section aria-labelledby="stack" className="mb-24">
            <span className={SECTION_LABEL}>Stack</span>
            <h2 id="stack" className={SECTION_TITLE}>What It Runs On</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.techStack.map((layer) => (
                <div key={layer.label} className="rounded-xl border border-white/[0.06] bg-[#141417] p-6">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-300">{layer.label}</h3>
                  <ul className="flex flex-col gap-3">
                    {layer.items.map((item) => (
                      <li key={item.name}>
                        <span className="text-[14px] text-white">{item.name}</span>
                        {item.version && (
                          <span className="ml-2 rounded bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
                            {item.version}
                          </span>
                        )}
                        <span className="block text-[13px] text-zinc-400">{item.purpose}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call to action */}
        <section
          aria-labelledby="cta"
          className="mb-24 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#141417] to-[#111113] p-10 md:p-14"
        >
          <h2 id="cta" className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Interested in {project.title}?
          </h2>
          <p className="mb-8 max-w-xl text-[16px] text-zinc-400">{interestCopy}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              {primaryCta}
            </Link>
            <Link
              href={isProduct ? '/products' : '/work'}
              className="flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#1A1A1A] px-8 text-[15px] font-semibold text-white transition-colors hover:bg-[#222222]"
            >
              {isProduct ? 'See All Products' : 'See More Work'}
            </Link>
          </div>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related">
            <span className={SECTION_LABEL}>Related</span>
            <h2 id="related" className={SECTION_TITLE}>You May Also Like</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((card) => (
                <ProjectCardView key={card.slug} project={card} headingLevel="h3" sizes="(max-width: 768px) 100vw, 33vw" />
              ))}
            </div>
          </section>
        )}
      </div>

      {hasDeepDetail && (
        <dialog
          id={DIALOG_ID}
          aria-labelledby="architecture-dialog-title"
          className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-[1100px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C] p-0 text-white backdrop:bg-black/80"
        >
          <div className="flex max-h-[90vh] flex-col">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.06] p-6 md:p-8">
              <div>
                <h2 id="architecture-dialog-title" className="mb-1 text-2xl font-bold">
                  Full Architecture
                </h2>
                <p className="text-sm text-zinc-400">Engineering detail for {project.title}</p>
              </div>
              <form method="dialog">
                <button
                  type="submit"
                  aria-label="Close the full architecture"
                  className="rounded-full bg-white/[0.04] p-3 text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-12 overflow-y-auto p-6 md:p-10">
              {project.architecture.designPatterns.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Design Patterns</h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.architecture.designPatterns.map((pattern) => (
                      <li
                        key={pattern}
                        className="rounded-md border border-white/[0.06] bg-[#1C1C1F] px-3 py-1.5 text-[12px] text-zinc-300"
                      >
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(project.boundedContexts.length > 0 || project.schema.length > 0) && (
                <div className="grid gap-8 lg:grid-cols-2">
                  {project.boundedContexts.length > 0 && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold">Bounded Contexts</h3>
                      <ul className="flex flex-col gap-4">
                        {project.boundedContexts.map((context) => (
                          <li key={context.name} className="rounded-xl border border-white/[0.06] bg-[#141417] p-5">
                            <h4 className="mb-2 font-semibold">{context.name}</h4>
                            <p className="mb-3 text-[13px] text-zinc-400">{context.responsibility}</p>
                            <p className="font-mono text-[11px] text-zinc-400">{context.entities.join(' · ')}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.schema.length > 0 && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold">Core Schema</h3>
                      <ul className="flex flex-col gap-4">
                        {project.schema.map((table) => (
                          <li key={table.name} className="rounded-xl border border-white/[0.06] bg-[#141417] p-5">
                            <h4 className="mb-2 font-mono text-sm font-semibold">{table.name}</h4>
                            <p className="mb-3 text-[13px] text-zinc-400">{table.description}</p>
                            <p className="font-mono text-[11px] text-zinc-400">{table.keyFields.join(' · ')}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {project.adrs.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Architecture Decisions</h3>
                  <ul className="flex flex-col gap-3">
                    {project.adrs.map((adr) => (
                      <li
                        key={adr.id}
                        className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#141417] p-4 md:flex-row md:items-start"
                      >
                        <span className="shrink-0 font-mono text-[11px] text-zinc-400 md:w-24">
                          {adr.id} · {adr.status}
                        </span>
                        <span>
                          <span className="mb-1 block text-sm font-medium">{adr.title}</span>
                          <span className="block text-[13px] text-zinc-400">{adr.rationale}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}
