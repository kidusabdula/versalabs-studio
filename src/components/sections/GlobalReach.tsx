'use client';

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

export default function GlobalReach() {
  const pillars = [
    { title: 'Built to Be Relied On', text: 'Built for businesses that need reliability, with security treated as a requirement from the first day.' },
    { title: 'Locally Rooted', text: 'We understand the Ethiopian market: Amharic content, local payment gateways such as Chapa, and design that resonates locally.' },
    { title: 'Globally Ready', text: 'Stripe payments for international customers, and clients from Addis Ababa to Indianapolis.' },
    { title: 'AI Where It Helps', text: "We add AI where it earns its place, like ThreatMatrix's plain-language alerts and the JARVIS assistant, and leave it out where it doesn't." },
  ];

  return (
    <section className="px-6 py-32 border-t border-white/[0.04] bg-[#0A0A0C]">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-violet-400/70 mb-6 block">
            From Addis Ababa to the World
          </span>
          <h2 className="text-[32px] md:text-[40px] leading-[1.1] font-semibold tracking-tighter text-white max-w-4xl">
            Software that speaks your language —{' '}
            <span className="text-zinc-500">
              literally. We build platforms for businesses here in Ethiopia and abroad, from bilingual English and Amharic content to international card payments.
            </span>
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.15} className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-white/[0.04]">
          {pillars.map((pillar, idx) => (
            <StaggerItem key={pillar.title}>
              <div className="flex flex-col h-full border-r border-b border-white/[0.04] overflow-hidden group">
                <div className="p-8 pb-0">
                  <span className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase mb-8 block">
                    FIG 0.{idx + 4}
                  </span>
                  
                  {/* Visual: Isometric geometric placeholder */}
                  <div className="h-48 w-full flex items-center justify-center relative transition-transform duration-700 ease-out group-hover:-translate-y-2">
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-600">
                        {idx === 0 && (
                          <>
                            <path d="M50 100 L100 70 L150 100 L100 130 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                            <path d="M50 100 L50 120 L100 150 L100 130 Z" />
                            <path d="M150 100 L150 120 L100 150 L100 130 Z" fill="rgba(255,255,255,0.02)" />
                          </>
                        )}
                        {idx === 1 && (
                          <>
                            <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.2)" />
                            <ellipse cx="100" cy="100" rx="40" ry="15" stroke="rgba(255,255,255,0.4)" />
                            <ellipse cx="100" cy="100" rx="15" ry="40" stroke="rgba(255,255,255,0.2)" />
                          </>
                        )}
                        {idx === 2 && (
                          <>
                            <path d="M60 60 L140 60 L140 140 L60 140 Z" strokeDasharray="4 4" stroke="rgba(255,255,255,0.2)" />
                            <path d="M70 70 L130 70 L130 130 L70 130 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                            <circle cx="100" cy="100" r="4" fill="white" />
                          </>
                        )}
                        {idx === 3 && (
                          <>
                            <path d="M100 40 L160 70 L100 100 L40 70 Z" stroke="rgba(255,255,255,0.2)" />
                            <path d="M100 70 L160 100 L100 130 L40 100 Z" stroke="rgba(255,255,255,0.2)" />
                            <path d="M100 100 L160 130 L100 160 L40 130 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                          </>
                        )}
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="mt-auto p-8 pt-6 bg-gradient-to-t from-[#101012] to-transparent border-t border-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-500">
                    {pillar.text}
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
