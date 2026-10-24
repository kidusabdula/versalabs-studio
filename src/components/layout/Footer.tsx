'use client';

import Link from 'next/link';
import FooterCTA from '../ui/FooterCTA';

const projectLinks = [
  { label: 'Obsidian ERP', href: '/projects/obsidian-erp-v3.0' },
  { label: 'ThreatMatrix AI', href: '/projects/threatmatrix-ai' },
  { label: 'JARVIS', href: '/projects/jarvis' },
  { label: 'Pana Sports', href: '/projects/pana-sport' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Studio', href: '/studio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/versalabs-studio', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
  { label: 'GitHub', href: 'https://github.com/VersaLabs-Studio', icon: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' },
  { label: 'Telegram', href: 'https://t.me/kidusabdula', icon: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' },
];

interface FooterProps {
  showCTA?: boolean;
  ctaProps?: React.ComponentProps<typeof FooterCTA>;
}

export default function Footer({ showCTA = false, ctaProps }: FooterProps = {}) {
  return (
    <footer className="border-t border-white/[0.04] bg-[#0A0A0C]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        
        {/* Top Grid: 3 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16">

          {/* Projects */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-5">Projects</h3>
            <ul className="flex flex-col gap-3">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-5">Company</h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-5">Connect</h3>
            <ul className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      <path d={link.icon} />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:contact@versalabs-studio.com" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Email Us
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Optional CTA Section */}
        {showCTA && (
          <div className="border-t border-white/[0.04] -mx-6">
            <FooterCTA {...ctaProps} />
          </div>
        )}

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <img 
              src="/versalabs-logo-light.png" 
              alt=""
              width={24}
              height={24}
              className="h-6 w-auto opacity-60"
            />
            <span className="text-[13px] text-zinc-600">
              © {new Date().getFullYear()} VersaLabs Studio
            </span>
          </div>
          <div className="text-[12px] text-zinc-600">
            Addis Ababa, Ethiopia · Building for the world
          </div>
        </div>
      </div>
    </footer>
  );
}
