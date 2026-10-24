'use client';

import { FadeIn, StaggerContainer, StaggerItem, GlassCard } from '@/components/ui/motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ArchitecturePhilosophy() {
  return (
    <section id="architecture" className="px-6 py-32 border-t border-white/[0.04] bg-[#0A0A0C]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20">
          <FadeIn>
            <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-semibold tracking-tighter text-white mb-6">
              Architecture Philosophy.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[17px] text-zinc-500 max-w-2xl">
              Every system we build follows an uncompromising set of operational constraints. From lightweight APIs to autonomous AI orchestrators, our architectural models are zero-bloat, infinitely scalable, and meticulously structured.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer staggerDelay={0.15}>
          {/* Asymmetric Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Schema-First Design (2 Columns) */}
            <StaggerItem className="md:col-span-2">
              <GlassCard className="h-full flex flex-col md:flex-row overflow-hidden group border border-white/[0.04]">
                <div className="p-10 flex-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-6 font-medium">Foundation</span>
                  <h3 className="text-2xl font-semibold text-white mb-4">Schema-First Execution</h3>
                  <p className="text-[14px] leading-relaxed text-zinc-500">
                    We start by rigidly defining the data models and API contracts entirely isolated from UI constraints. This guarantees that your core business logic dictates the platform&apos;s behavior autonomously, resulting in incredibly sturdy schemas immune to UI turbulence.
                  </p>
                </div>
                {/* Large Multi-Layer Schema SVG */}
                <div className="w-full md:w-[45%] bg-white/[0.02] flex items-center justify-center p-8 relative overflow-hidden border-t md:border-t-0 md:border-l border-white/[0.04]">
                  <svg viewBox="0 0 200 200" className="w-full h-full opacity-60 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-700 ease-out">
                    <g fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600">
                      {/* Database Platter Base */}
                      <ellipse cx="100" cy="140" rx="60" ry="20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.4)" />
                      <ellipse cx="100" cy="120" rx="60" ry="20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.4)" />
                      <line x1="40" y1="120" x2="40" y2="140" stroke="rgba(255,255,255,0.4)" />
                      <line x1="160" y1="120" x2="160" y2="140" stroke="rgba(255,255,255,0.4)" />
                      
                      {/* Connection Threads */}
                      <path d="M100 120 L100 60" strokeDasharray="3 3" />
                      <path d="M80 115 L60 70 M120 115 L140 70" strokeDasharray="3 3" />
                      
                      {/* API/Logic Layer Entities */}
                      <rect x="70" y="40" width="60" height="20" rx="4" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1.5" />
                      <rect x="40" y="60" width="40" height="15" rx="3" fill="rgba(255,255,255,0.02)" />
                      <rect x="120" y="60" width="40" height="15" rx="3" fill="rgba(255,255,255,0.02)" />
                      
                      {/* Interactive Nodes */}
                      <circle cx="100" cy="40" r="3" fill="white" />
                      <circle cx="60" cy="60" r="2" fill="currentColor" />
                      <circle cx="140" cy="60" r="2" fill="currentColor" />
                    </g>
                  </svg>
                </div>
              </GlassCard>
            </StaggerItem>

            {/* Box 2: Zero-Bloat (1 Column) */}
            <StaggerItem>
              <GlassCard className="h-full flex flex-col overflow-hidden group border border-white/[0.04]">
                <div className="flex-1 p-8 h-48 flex items-center justify-center bg-white/[0.02] relative">
                  <svg viewBox="0 0 200 200" className="w-full h-full opacity-60 group-hover:scale-[1.05] group-hover:opacity-100 transition-all duration-700">
                    <g fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600">
                      {/* Singular Intense Focus Beam */}
                      <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="2" opacity="0.3" className="group-hover:opacity-100 transition-opacity duration-700" />
                      <rect x="90" y="80" width="20" height="40" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.5" />
                      
                      {/* Bypassed bloat nodes */}
                      <circle cx="50" cy="60" r="4" opacity="0.3" />
                      <circle cx="150" cy="140" r="4" opacity="0.3" />
                      <circle cx="60" cy="150" r="3" opacity="0.2" />
                      <circle cx="140" cy="50" r="3" opacity="0.2" />
                      <path d="M50 60 L100 80 M150 140 L100 120" strokeDasharray="1 4" opacity="0.3" />
                    </g>
                  </svg>
                </div>
                <div className="p-8 bg-[#101012] border-t border-white/[0.04]">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600 mb-3 block font-medium">Efficiency</span>
                  <h3 className="text-[17px] font-semibold text-white mb-2">Zero-Bloat</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-500">
                    Ruthlessly stripping away legacy IT frameworks. We ship hyper-optimized execution environments.
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>

            {/* Box 3: Domain-Driven Architecture (3 Columns) */}
            <StaggerItem className="md:col-span-3">
              <GlassCard className="h-full flex flex-col md:flex-row overflow-hidden group border border-white/[0.04]">
                {/* Very Large Contextual SVG Area */}
                <div className="w-full md:w-1/2 bg-white/[0.02] flex items-center justify-center p-8 h-64 md:h-80 relative overflow-hidden">
                  <svg viewBox="0 0 400 200" className="w-full h-full opacity-60 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700 ease-out">
                    <g fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600">
                      {/* Bounded Context A */}
                      <rect x="40" y="40" width="120" height="120" rx="8" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
                      <rect x="60" y="60" width="80" height="80" rx="4" fill="rgba(255,255,255,0.02)" stroke="white" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="15" fill="rgba(255,255,255,0.05)" stroke="white" />
                      
                      {/* Bounded Context B */}
                      <rect x="240" y="40" width="120" height="120" rx="8" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
                      <rect x="260" y="60" width="80" height="80" rx="4" fill="rgba(255,255,255,0.02)" stroke="white" strokeWidth="1.5" />
                      <rect x="290" y="90" width="20" height="20" rx="2" fill="white" />
                      
                      {/* Rigid Communications Bridge */}
                      <path d="M160 100 L240 100" stroke="white" strokeWidth="2" opacity="0.5" className="group-hover:opacity-100 group-hover:stroke-white transition-opacity duration-700" />
                      <circle cx="200" cy="100" r="4" fill="white" />
                      <path d="M190 90 L210 90 M190 110 L210 110" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                    </g>
                  </svg>
                </div>
                
                <div className="p-10 md:p-14 flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/[0.04]">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-6 font-medium">Structure</span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Domain-Driven Architecture</h3>
                  <p className="text-[15px] leading-relaxed text-zinc-500 mb-8">
                    Complex enterprise software requires rigorous bounding. We deliberately segment multi-tier applications into highly compartmentalized, self-sufficient autonomous zones. This isolates risk, prevents monolithic codebase entanglement, and ensures distinct areas of your platform scale infinitely without dragging on parallel operations.
                  </p>
                  
                  <div>
                    <Link
                      href="/api/contact"
                      className="inline-flex items-center gap-2 text-[13px] font-semibold text-white uppercase tracking-wider hover:text-zinc-300 transition-colors"
                    >
                      Audit Your Architecture
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>

          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
