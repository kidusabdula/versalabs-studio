'use client';

import { useState } from 'react';
import { Search, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, GlassCard } from '@/components/ui/motion';
import type { FeaturedCard } from '@/app/studio/page';
import type { ProjectCard } from '@/content/projects';
import { KIND_LABEL, KIND_BADGE, STATUS_BADGE } from '@/content/labels';

interface StudioClientProps {
  projects: ProjectCard[];
  featured: FeaturedCard[];
}

export default function StudioClient({ projects, featured }: StudioClientProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const allCategories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = projects.filter((p) => {
    const matchesSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">

      {/* =================================================================== */}
      {/* HERO SECTION — Featured Products                                  */}
      {/* =================================================================== */}
      <section className="relative px-6 pt-40 pb-24 bg-[#0A0A0C] overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px]" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest text-zinc-300 uppercase">Product Portfolio</span>
                </div>
                <h1 className="text-6xl md:text-[80px] leading-[1.05] font-bold tracking-tighter text-white mb-6">
                  Our Best Work.
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
                  Business platforms, online stores, AI tools, and websites. Browse what we&apos;ve designed, built, and shipped.
                </p>
              </FadeIn>
            </div>
            
            {/* Stats / Interactive Data Pane */}
            <div className="lg:col-span-4 flex flex-col gap-4 justify-end">
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-4 relative">
                  {/* Floating Elements overlay */}
                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
                    className="absolute -top-12 -right-8 w-24 h-24 border border-white/[0.05] rounded-full pointer-events-none"
                  />
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">ERP<span className="text-emerald-400">.</span></div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Business Systems</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">Web<span className="text-violet-400">.</span></div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Stores and Sites</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] backdrop-blur-md relative overflow-hidden group"
                  >
                    {/* Animated pulse indicator */}
                    <div className="absolute top-6 right-6 flex items-center justify-center">
                      <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-emerald-400 opacity-20"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </div>

                    <div className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Honest Status Labels</div>
                    <div className="text-sm text-zinc-400 leading-relaxed">Every project shows where it stands today: in production, an MVP, a prototype, or a demo.</div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            {featured.map((project, idx) => (
              <FadeIn key={project.slug} delay={idx * 0.15}>
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div className="relative overflow-hidden rounded-2xl bg-[#111113] border border-white/[0.06]">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        className="relative w-full h-full"
                      >
                        {project.hero && (
                        <Image
                          src={project.hero.src}
                          alt={project.hero.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1280px) 100vw, 1280px"
                          priority={idx === 0}
                        />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                      </motion.div>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-sm bg-gradient-to-r ${project.heroGradient} border border-white/[0.06] text-white`}>
                            {project.category}
                          </span>
                          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-sm ${STATUS_BADGE[project.status]}`}>
                            {project.status}
                          </span>
                          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-sm ${KIND_BADGE[project.kind]}`}>
                            {KIND_LABEL[project.kind]}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-3">
                          {project.title}
                        </h2>
                        <p className="text-[17px] text-zinc-400 max-w-2xl leading-relaxed">
                          {project.summary}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                          Explore
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* FULL CATALOG                                                      */}
      {/* =================================================================== */}
      <section className="px-6 py-24 bg-[#0A0A0C] border-t border-white/[0.04]">
        <div className="mx-auto max-w-[1400px]">

          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
              All Projects
            </h2>
            <p className="text-[16px] text-zinc-500 mb-12 max-w-xl">
              Every project in the studio, from ERP systems to mobile apps. Filter by category to find what you need.
            </p>
          </FadeIn>

          {/* Filters */}
          <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              {allCategories.map((cat: string) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-[#1C1C1F] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                aria-label="Search projects"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-white/[0.08] bg-[#141417] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-colors"
              />
            </div>
          </div>

          {/* 2-Column Product Grid */}
          <StaggerContainer staggerDelay={0.08}>
            <div className="grid gap-8 md:grid-cols-2">
              {filtered.map((project) => (
                <StaggerItem key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="block h-full group">
                    <GlassCard className="h-full flex flex-col overflow-hidden transition-colors hover:border-white/[0.12]">
                      
                      {project.cover && (
                        <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#0E0E10]">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200, damping: 30 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={project.cover.src}
                              alt={project.cover.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </motion.div>
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm bg-gradient-to-r ${project.heroGradient} border border-white/[0.06] text-white/90`}>
                            {project.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-zinc-500 border border-white/[0.06] px-2 py-0.5 rounded-sm">
                              {project.year}
                            </span>
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-sm ${STATUS_BADGE[project.status]}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center justify-between group-hover:text-zinc-300 transition-colors">
                          {project.title}
                          <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-zinc-400" />
                        </h3>

                        <p className="text-[13px] font-medium text-zinc-400 mb-3 line-clamp-1">
                          {project.subtitle}
                        </p>

                        <p className="text-sm text-zinc-500 leading-relaxed mb-6 line-clamp-3 flex-1">
                          {project.summary}
                        </p>

                        <div className="mt-auto pt-5 border-t border-white/[0.04] flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="text-xs text-zinc-500">#{tag}</span>
                            ))}
                          </div>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${KIND_BADGE[project.kind]}`}>
                            {KIND_LABEL[project.kind]}
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-zinc-500">No projects match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 bg-[#0A0A0C] border-t border-white/[0.04] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
              Ready to build something great?
            </h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
              Whether you need a custom platform built from scratch or want something like one of our projects, we&apos;re ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center h-12 px-8 rounded-full bg-white text-black text-[15px] font-semibold tracking-wide transition-colors hover:bg-zinc-200">
                  Start a Project
                </motion.div>
              </Link>
              <Link href="/services">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center h-12 px-8 rounded-full bg-[#1A1A1A] border border-white/[0.08] text-white text-[15px] font-semibold tracking-wide transition-colors hover:bg-[#222222]">
                  View Services
                </motion.div>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
