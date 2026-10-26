'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FadeIn, MotionLink } from '@/components/ui/motion';
import { KIND_LABEL, KIND_BADGE, STATUS_BADGE } from '@/content/labels';
import type { GalleryImage, ProjectKind, ProjectStatus } from '@/content/schema';

// Status, kind and screenshot come from the project files (see src/app/page.tsx),
// so a badge or an image never drifts from the case study.
export interface ShowcaseProject {
  slug: string;
  status: ProjectStatus;
  kind: ProjectKind;
  image?: GalleryImage;
}

interface FeaturedProjectsProps {
  projects?: ShowcaseProject[];
}

const SHOWCASE_CONFIG = [
  { 
    slug: 'obsidian-erp',
    title: 'Obsidian ERP',
    invert: false,
    description: 'Run your entire business from one dashboard. Obsidian connects sales, customers, inventory, manufacturing, and accounting — so nothing falls through the cracks.',
    capabilities: ['Sales & Customer Management', 'Inventory Tracking', 'Manufacturing Control', 'Financial Reports'],
  },
  { 
    slug: 'threatmatrix-ai',
    title: 'ThreatMatrix AI',
    invert: true,
    description: 'A network security command center built as a university senior project by a team of four. It watches live traffic, flags unusual activity with machine learning, and explains each alert in plain language.',
    capabilities: ['Live Threat Map', 'Machine-Learning Detection', 'AI Analyst Chat', 'Forensics Lab']
  },
  {
    slug: 'pana-sport',
    title: 'Pana Sports',
    invert: false,
    description: 'A home for Ethiopian football fans. Live scores, league tables, team and player profiles, and news, in English and Amharic.',
    capabilities: ['Live Score Updates', 'League Standings', 'Bilingual Content', 'Match Control Panel']
  },
  {
    slug: 'oskaz-ecommerce',
    title: 'OSKAZ E-Commerce',
    invert: true,
    description: "An online store connected live to the company's ERP. Customers see real stock and prices, order in a few clicks, and pay on delivery.",
    capabilities: ['Sign In Once', 'ERP-Backed Inventory', 'Orders Straight Into the ERP', 'Cash on Delivery Checkout']
  }
];

export default function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  // Entries missing from the project files (hidden ones) are skipped.
  const showcase = SHOWCASE_CONFIG.flatMap((item) => {
    const entry = projects.find((p) => p.slug === item.slug);
    return entry ? [{ ...item, ...entry }] : [];
  });

  return (
    <section className="px-6 py-32 bg-[#0A0A0C] border-t border-white/[0.04]">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-24 md:text-center max-w-3xl md:mx-auto">
          <FadeIn>
            <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-tighter text-white mb-6">
              Featured Work.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[17px] text-zinc-500">
              Platforms we&apos;ve designed, built and shipped.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {showcase.map((project, projectIdx) => {
            const isTextRight = !project.invert;

            return (
              <motion.div 
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className={`flex flex-col gap-10 md:gap-16 ${isTextRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
              >
                  
                  {/* Cinematic Massive Image Pane (65% Width) */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: isTextRight ? -60 : 60, scale: 0.95 },
                      visible: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20, duration: 1.2 } }
                    }}
                    className="w-full lg:w-[65%] relative group"
                  >
                    <Link href={`/projects/${project.slug}`} aria-label={`${project.title} case study`} className="block relative">
                      <motion.div 
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.03)]"
                      >
                        {project.image && (
                        <Image
                          src={project.image.src}
                          alt={project.image.alt}
                          width={project.image.width}
                          height={project.image.height}
                          className="w-full h-auto rounded-xl border border-white/[0.04]"
                          sizes="(max-width: 1024px) 100vw, 65vw"
                          priority={projectIdx === 0}
                        />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Context Pane (35% Width) */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, x: isTextRight ? 60 : -60, filter: 'blur(8px)' },
                      visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20, duration: 1.2, delay: 0.2 } }
                    }}
                    className="w-full lg:w-[35%] flex flex-col justify-center"
                  >
                    {/* Product Type Badge */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full ${KIND_BADGE[project.kind]}`}>
                        {KIND_LABEL[project.kind]}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full ${STATUS_BADGE[project.status]}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-[42px] font-semibold tracking-tighter text-white mb-6">
                      {project.title}
                    </h3>
                    
                    <p className="text-[16px] leading-[1.7] text-zinc-400 mb-8 max-w-xl">
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-3 mb-12">
                      {project.capabilities.map((cap, capIdx) => (
                         <motion.div 
                           key={cap} 
                           initial={{ opacity: 0, x: -10 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.5 + capIdx * 0.1, duration: 0.5 }}
                           className="flex items-center gap-3 text-[13px] text-zinc-300 font-medium"
                         >
                           <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                           {cap}
                         </motion.div>
                      ))}
                    </div>

                    <div>
                      <MotionLink
                        href={`/projects/${project.slug}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center px-6 py-3.5 text-[13px] font-semibold tracking-wide text-black bg-white rounded-full transition-colors hover:bg-zinc-200 group"
                      >
                        Explore Details<span className="sr-only">: {project.title}</span>
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </MotionLink>
                    </div>
                  </motion.div>

              </motion.div>
            );
          })}
        </div>

        <div className="mt-40 text-center pt-16 border-t border-white/[0.04]">
          <Link href="/studio" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            View All Work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
