'use client';

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export default function WhyChooseUs() {
  const stats = [
    { label: 'AI-Assisted Development', desc: 'We use AI tooling across design and engineering, so a small team can move quickly without cutting corners.' },
    { label: 'Built Around Your Workflow', desc: 'Every system is designed around how your business actually works, not adapted from a generic theme.' },
    { label: 'Direct Line to the Builders', desc: 'You talk to the people designing and building your platform, from the first call to launch.' },
  ];

  return (
    <section className="px-6 py-32 border-t border-white/[0.04] bg-[#0A0A0C]">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-emerald-400/70 mb-6 block">
            Why Businesses Choose Us
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.1] font-semibold tracking-tighter text-white max-w-4xl">
            Your idea deserves more than a template.{' '}
            <span className="text-zinc-500">
              Most agencies hand you a WordPress theme and call it a day. We architect real systems — platforms that handle your data, automate your workflows, and grow with your business. That&apos;s the VersaLabs difference.
            </span>
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/[0.04]">
          {stats.map((stat, idx) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col h-full border-r border-b border-white/[0.04] overflow-hidden group">
                <div className="p-8 pb-0">
                  <span className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase mb-8 block">
                    FIG 0.{idx + 1}
                  </span>
                  
                  {/* Visual: Isometric geometric placeholder mapping to value */}
                  <div className="h-48 w-full flex items-center justify-center relative transition-transform duration-700 ease-out group-hover:-translate-y-2">
                    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden="true">
                      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600">
                        {idx === 0 && (
                           <>
                             <path d="M100 40 L160 70 L100 100 L40 70 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                             <path d="M100 70 L160 100 L100 130 L40 100 Z" />
                             <path d="M100 100 L160 130 L100 160 L40 130 Z" />
                           </>
                        )}
                        {idx === 1 && (
                           <>
                             <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.4)" strokeDasharray="4 4" />
                             <circle cx="100" cy="100" r="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
                             <path d="M60 100 L140 100 M100 60 L100 140" stroke="rgba(255,255,255,0.2)" />
                           </>
                        )}
                        {idx === 2 && (
                           <>
                             <path d="M50 140 L60 135 L60 145 L50 150 Z" />
                             <path d="M80 124 L90 119 L90 139 L80 144 Z" />
                             <path d="M110 108 L120 103 L120 133 L110 138 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.3)" />
                             <path d="M140 102 L150 97 L150 127 L140 132 Z" />
                           </>
                        )}
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="mt-auto p-8 pt-6 bg-gradient-to-t from-[#101012] to-transparent border-t border-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white mb-2">{stat.label}</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-500">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
