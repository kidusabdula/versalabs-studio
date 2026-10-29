'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BUTTON_PRIMARY, BUTTON_PRIMARY_SMALL } from '@/components/ui/styles';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Client Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// A sticky bar with a hairline under it. It sits in the page flow, so pages
// start right below it without padding for a fixed header.
export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-[1248px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/versalabs-logo-light.png" alt="" width={28} height={28} priority className="h-7 w-7" />
          <span className="text-[16px] font-semibold tracking-wide text-foreground">VersaLabs</span>
        </Link>

        <div className="flex items-center gap-3 lg:gap-8">
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                    isActive(href) ? 'text-foreground' : 'text-zinc-400 hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contact" className={`${BUTTON_PRIMARY_SMALL} max-sm:hidden`}>
            Start a Project
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-foreground lg:hidden"
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!isMenuOpen} className="absolute inset-x-0 top-full border-b border-border bg-background lg:hidden">
        <ul className="mx-auto flex w-full max-w-[1248px] flex-col gap-1 px-5 py-4 sm:px-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-lg px-4 py-3 text-[15px] transition-colors ${
                  isActive(href) ? 'bg-surface text-foreground' : 'text-zinc-400 hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-3 border-t border-border pt-4">
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`${BUTTON_PRIMARY} w-full`}>
              Start a Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
