'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, ArrowRight, X, Layers, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, GlassCard, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import ProjectSlideshow from '@/components/ui/ProjectSlideshow';
import ImageLightbox from '@/components/ui/ImageLightbox';
import type { Project, TechLayer, BoundedContext, SchemaTable, Feature, ADRRecord } from '@/content/schema';
import type { ProjectCard } from '@/content/projects';
import { KIND_LABEL, KIND_BADGE, STATUS_BADGE } from '@/content/labels';

// Closing line for the inline call to action, by project kind.
const INTEREST_COPY: Record<Project['kind'], (title: string) => string> = {
  product: (title) => `Deploy ${title} for your organization, or let us customize it for your specific industry needs.`,
  client: () => 'We built this for a client, and we can build something like it for you. Tell us what you need.',
  internal: () => 'We built this in-house, and we can build something like it for you. Tell us what you need.',
  research: () => 'This began as a university research project. If you need something similar, we can build it for you. Tell us what you need.',
};

// A product still in development can't be deployed yet, so it gets its own copy.
const IN_DEVELOPMENT_COPY = (title: string) =>
  `${title} is still in development. If it fits a problem you have, tell us about it.`;

// Live sites get "Visit"; demos, prototypes and products in development get
// "Open the Demo". A product still in development runs on demo data, and says so.
const LIVE_STATUSES: Project['status'][] = ['Production', 'Beta', 'MVP'];

interface Props {
  project: Project;
  similarProjects: ProjectCard[];
}

const INITIAL_GALLERY_COUNT = 6;

export default function ProjectDetailClient({ project, similarProjects }: Props) {
  const [showTechnical, setShowTechnical] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAllGallery, setShowAllGallery] = useState(false);

  // Mockups play in the slideshow and screenshots fill the gallery, so no image
  // shows twice. The lightbox steps through both, slideshow first.
  const slides = project.gallery.filter((image) => image.kind === 'mockup');
  const allGalleryImages = project.gallery.filter((image) => image.kind === 'screen');
  const lightboxImages = [...slides, ...allGalleryImages];
  const visibleGallery = showAllGallery ? allGalleryImages : allGalleryImages.slice(0, INITIAL_GALLERY_COUNT);
  const hasMoreImages = allGalleryImages.length > INITIAL_GALLERY_COUNT;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!showTechnical) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowTechnical(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showTechnical]);

  // Kind-aware CTA text
  const isProduct = project.kind === 'product';
  const inDevelopment = project.status === 'Development';
  const primaryCTA = !isProduct ? 'Build Something Like This' : inDevelopment ? 'Ask About This Product' : 'Deploy This Platform';
  const secondaryCTA = !isProduct ? 'Get a Custom Version' : inDevelopment ? 'Get in Touch' : 'Schedule a Demo';
  const interestCopy = isProduct && inDevelopment ? IN_DEVELOPMENT_COPY(project.title) : INTEREST_COPY[project.kind](project.title);
  const liveLabel = LIVE_STATUSES.includes(project.status)
    ? 'Visit the Live Site'
    : isProduct && inDevelopment
      ? 'Open the Demo (Demo Data)'
      : 'Open the Demo';

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-32">

      {/* HERO HEADER */}
      <div className="w-full pt-32 pb-24 border-b border-white/[0.04] relative overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b ${project.heroGradient} blur-[120px] rounded-full pointer-events-none opacity-40`} />

        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <FadeIn>
            <Link href="/studio" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-12">
              <ArrowLeft className="h-4 w-4" />
              Back to Studio
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded-sm bg-gradient-to-r ${project.heroGradient} border border-white/[0.06] text-white`}>
                {project.category}
              </span>
              <span className="text-xs font-medium text-zinc-400 border border-white/[0.06] px-3 py-1.5 rounded-sm bg-[#141417]">
                {project.year}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-sm ${STATUS_BADGE[project.status]}`}>
                {project.status}
              </span>
              <span className={`text-xs font-medium px-3 py-1.5 rounded-sm ${KIND_BADGE[project.kind]}`}>
                {KIND_LABEL[project.kind]}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mb-4">
              {project.subtitle}
            </p>
            <p className="text-[17px] text-zinc-500 leading-relaxed max-w-3xl mb-10">
              {project.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold transition-all hover:bg-zinc-200 hover:scale-[1.02]">
                  {liveLabel}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1C1C1F] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#27272A] hover:scale-[1.02]">
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  View the Code
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <button type="button" onClick={() => setShowTechnical(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#1C1C1F] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#27272A] hover:scale-[1.02]">
                <Layers className="h-4 w-4" />
                View Architecture
              </button>
              <Link href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-medium text-zinc-400 transition-all hover:text-white hover:border-white/20">
                {primaryCTA}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pt-16">

        {/* SLIDESHOW */}
        {slides.length > 0 && (
          <FadeIn delay={0.4}>
            <div className="mb-24 max-w-[1200px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/[0.04]">
              <ProjectSlideshow
                images={slides}
                title={project.title}
                intervalMs={4500}
                hoverOnly={false}
                onImageClick={(idx) => openLightbox(idx)}
              />
            </div>
          </FadeIn>
        )}

        {/* PROBLEM & SOLUTION */}
        <StaggerContainer className="grid md:grid-cols-2 gap-12 mb-24">
          <StaggerItem>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500">The Challenge</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">Why This Exists</h2>
            <p className="text-[16px] leading-[1.9] text-zinc-400">
              {project.businessProblem}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500">The Solution</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">How We Solved It</h2>
            <p className="text-[16px] leading-[1.9] text-zinc-400">
              {project.architecturalSolution}
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* KEY FEATURES */}
        {project.features.length > 0 && (
        <FadeIn>
          <div className="mb-24">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-4">Capabilities</span>
            <h2 className="text-3xl font-bold text-white mb-12">What You Get</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature: Feature, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-white/[0.06] bg-[#141417] hover:border-white/[0.12] transition-colors"
                >
                  <h3 className="text-white font-semibold mb-3">{feature.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-zinc-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
        )}

        {/* INLINE CTA */}
        <FadeIn>
          <div className="mb-24 p-10 md:p-14 rounded-2xl bg-gradient-to-br from-[#141417] to-[#111113] border border-white/[0.06] relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-[300px] h-[200px] bg-gradient-to-bl ${project.heroGradient} blur-[80px] opacity-30 pointer-events-none`} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Interested in {project.title}?
              </h3>
              <p className="text-[16px] text-zinc-400 mb-8 max-w-lg">
                {interestCopy}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-[15px] font-semibold transition-colors hover:bg-zinc-200">
                    {secondaryCTA}
                  </motion.div>
                </Link>
                <Link href="/studio">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center h-12 px-8 rounded-full bg-[#1A1A1A] border border-white/[0.08] text-white text-[15px] font-semibold transition-colors hover:bg-[#222222]">
                    Explore More Work
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* GALLERY with Load More */}
        {allGalleryImages.length > 0 && (
          <FadeIn>
            <div className="mb-24">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-4">Visual Gallery</span>
              <h2 className="text-3xl font-bold text-white mb-12">See It in Action</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {visibleGallery.map((img, idx) => (
                  <motion.button
                    type="button"
                    key={img.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.5 }}
                    viewport={{ once: true }}
                    onClick={() => openLightbox(slides.length + idx)}
                    aria-label={`View full size: ${img.alt}`}
                    className={`block w-full relative overflow-hidden rounded-xl border border-white/[0.04] bg-[#0E0E10] cursor-pointer group ${
                      idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[3/2]'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      className="object-contain group-hover:scale-[1.02] transition-transform duration-700"
                      sizes={idx === 0 ? '100vw' : '50vw'}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                        View Full Size
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
              {hasMoreImages && !showAllGallery && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllGallery(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    Load More ({allGalleryImages.length - INITIAL_GALLERY_COUNT} remaining)
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* SIMILAR PROJECTS */}
        {similarProjects.length > 0 && (
          <FadeIn>
            <div className="mb-24">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-4">Related Work</span>
              <h2 className="text-3xl font-bold text-white mb-12">You May Also Like</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {similarProjects.map((sp) => (
                  <Link key={sp.slug} href={`/projects/${sp.slug}`} className="block group">
                    <div className="rounded-xl border border-white/[0.06] bg-[#141417] overflow-hidden hover:border-white/[0.12] transition-colors">
                      {sp.cover && (
                        <div className="relative aspect-[3/2] overflow-hidden">
                          <Image
                            src={sp.cover.src}
                            alt={sp.cover.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-sm bg-gradient-to-r ${sp.heroGradient} border border-white/[0.06] text-white/80 inline-block mb-3`}>
                          {sp.category}
                        </span>
                        <h3 className="text-white font-semibold mb-1 group-hover:text-zinc-300 transition-colors">{sp.title}</h3>
                        <p className="text-[13px] text-zinc-500 line-clamp-2">{sp.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* BOTTOM CTA */}
        <FadeIn>
          <div className="mb-24 text-center py-20 border-t border-b border-white/[0.04]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              Let&apos;s build your next platform.
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-lg mx-auto">
              Every product in our studio started as a conversation. Tell us what you need, and we&apos;ll show you what&apos;s possible.
            </p>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 h-12 px-10 rounded-full bg-white text-black text-[15px] font-semibold transition-colors hover:bg-zinc-200">
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </div>
        </FadeIn>

        {/* ARCHITECTURE MODAL */}
        <AnimatePresence>
          {showTechnical && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTechnical(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="architecture-title"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[1200px] max-h-[90vh] bg-[#0A0A0C] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/[0.04] bg-[#0A0A0C] z-10 shrink-0">
                  <div>
                    <h2 id="architecture-title" className="text-2xl font-bold text-white mb-2">Technical Architecture</h2>
                    <p className="text-sm text-zinc-400">Engineering details for {project.title}</p>
                  </div>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setShowTechnical(false)}
                    aria-label="Close technical architecture"
                    className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-12">
                  <div className="flex flex-col gap-12">

                  <GlassCard className="p-8">
                    <h3 className="text-lg font-semibold text-white mb-6">System Architecture</h3>
                    <div className="mb-6">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Pattern</span>
                      <div className="text-[15px] text-white font-medium">{project.architecture.pattern}</div>
                    </div>
                    <div className="mb-6">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 block">Data Flow</span>
                      <div className="p-4 rounded-lg bg-[#141417] border border-white/[0.04] font-mono text-[13px] text-emerald-400 leading-relaxed overflow-x-auto">
                        {project.systemFlow}
                      </div>
                    </div>
                    {project.architecture.designPatterns.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 block">Design Patterns</span>
                      <div className="flex flex-wrap gap-2">
                        {project.architecture.designPatterns.map(pattern => (
                          <span key={pattern} className="px-3 py-1.5 rounded-md bg-[#1C1C1F] border border-white/[0.06] text-[12px] text-zinc-300">
                            {pattern}
                          </span>
                        ))}
                      </div>
                    </div>
                    )}
                  </GlassCard>

                  {(project.boundedContexts.length > 0 || project.schema.length > 0) && (
                  <div className="grid lg:grid-cols-2 gap-8">
                    {project.boundedContexts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-6">Bounded Contexts</h3>
                      <div className="flex flex-col gap-4">
                        {project.boundedContexts.map((ctx: BoundedContext) => (
                          <div key={ctx.name} className="p-5 rounded-xl border border-white/[0.06] bg-[#141417]">
                            <h4 className="text-white font-semibold mb-2">{ctx.name}</h4>
                            <p className="text-[12px] text-zinc-400 mb-3">{ctx.responsibility}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {ctx.entities.map(entity => (
                                <span key={entity} className="px-2 py-1 bg-white/[0.03] border border-white/[0.04] rounded text-[10px] font-mono text-zinc-400">
                                  {entity}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    )}

                    {project.schema.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-6">Core Schema</h3>
                      <div className="flex flex-col gap-4">
                        {project.schema.map((table: SchemaTable) => (
                          <div key={table.name} className="p-5 rounded-xl border border-white/[0.06] bg-[#141417]">
                            <h4 className="text-white font-semibold font-mono text-sm mb-2">{table.name}</h4>
                            <p className="text-[12px] text-zinc-400 mb-3">{table.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {table.keyFields.map(field => (
                                <span key={field} className="px-2 py-1 bg-white/[0.03] border border-white/[0.04] rounded text-[10px] font-mono text-emerald-400/80">
                                  {field}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
                  </div>
                  )}

                  {project.techStack.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-6">Technology Stack</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {project.techStack.map((layer: TechLayer) => (
                        <GlassCard key={layer.label} className="p-6">
                          <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-5">{layer.label}</h4>
                          <div className="flex flex-col gap-3">
                            {layer.items.map(item => (
                              <div key={item.name} className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-white text-[14px]">{item.name}</span>
                                  {item.version && <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] px-1.5 py-0.5 rounded">{item.version}</span>}
                                </div>
                                <span className="text-[12px] text-zinc-400">{item.purpose}</span>
                              </div>
                            ))}
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>

                  )}

                  {project.adrs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-6">Architecture Decision Records</h3>
                    <div className="flex flex-col gap-3">
                      {project.adrs.map((adr: ADRRecord) => (
                        <div key={adr.id} className="p-4 rounded-xl border border-white/[0.06] bg-[#141417] flex flex-col md:flex-row md:items-center gap-3">
                          <div className="md:w-28 shrink-0">
                            <span className="text-[10px] font-mono text-zinc-500 block mb-1">{adr.id}</span>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm inline-block ${
                              adr.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              adr.status === 'Deprecated' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {adr.status}
                            </span>
                          </div>
                          <div className="flex-1 md:border-l md:border-white/[0.04] md:pl-4">
                            <h4 className="text-white text-sm font-medium mb-1">{adr.title}</h4>
                            <p className="text-[12px] text-zinc-400">{adr.rationale}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
        title={project.title}
      />
    </div>
  );
}
