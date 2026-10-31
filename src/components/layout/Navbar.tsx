'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BUTTON_PRIMARY, BUTTON_PRIMARY_SMALL, CONTAINER, ICON_BUTTON } from '@/components/ui/styles';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

// Products first, then the proof, then what we build to order.
const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/work', label: 'Client Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// A sticky bar with a hairline under it. It sits in the page flow, so pages start right below it without padding for
// a fixed header. Below lg the links fold into a menu that closes on Escape, on a link and on navigation.
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a new page closes the menu
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <nav aria-label="Main" className={`${CONTAINER} flex h-16 items-center justify-between gap-6`}>
        <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label="VersaLabs Studio, home">
          <Logo className="h-[22px] w-auto" />
          <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-foreground">
            VersaLabs <span className="font-normal text-fg-3">Studio</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`relative rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                  isActive(href)
                    ? 'text-foreground after:absolute after:inset-x-3 after:-bottom-[13px] after:h-px after:bg-foreground'
                    : 'text-fg-3 hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className={`${BUTTON_PRIMARY_SMALL} max-sm:hidden`}>
            Start a Project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`${ICON_BUTTON} lg:hidden`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-background lg:hidden">
        <ul className={`${CONTAINER} flex flex-col py-4`}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <li key={href} className="border-b border-line last:border-b-0">
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-baseline gap-4 py-4 font-display text-[22px] font-medium tracking-[-0.02em] transition-colors ${
                  isActive(href) ? 'text-foreground' : 'text-fg-2 hover:text-foreground'
                }`}
              >
                <span className="font-mono text-[12px] font-normal text-fg-4" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Link href="/contact" onClick={() => setOpen(false)} className={`${BUTTON_PRIMARY} w-full`}>
              Start a Project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
