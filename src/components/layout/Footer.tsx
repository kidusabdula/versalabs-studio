import Link from 'next/link';
import { getProducts, projectPath } from '@/content/projects';
import { STATUS_LABEL, STATUS_TONE, TONE_CLASS, TONE_LEGEND } from '@/content/labels';
import { CONTACT_EMAIL } from '@/lib/site';
import { BUTTON_PRIMARY_SMALL, CONTAINER } from '@/components/ui/styles';
import Logo from './Logo';

// Every product, in the site's product order, each with its status dot. A hidden product drops out on its own.
const productLinks = getProducts().map((product) => ({
  label: product.title,
  href: projectPath(product),
  status: product.status,
}));

const companyLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Client Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/versalabs-studio' },
  { label: 'Telegram', href: 'https://t.me/kidusabdula' },
];

const HEADING = 'mb-5 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-3';
const LINK = 'text-[14px] text-fg-2 transition-colors hover:text-foreground';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className={`${CONTAINER} pt-16 pb-10 md:pt-20`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-md" aria-label="VersaLabs Studio, home">
              <Logo className="h-[22px] w-auto" />
              <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                VersaLabs <span className="font-normal text-fg-3">Studio</span>
              </span>
            </Link>
            <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.6] text-fg-3">
              Business software products, and custom software built for companies in Ethiopia and abroad. From Addis
              Ababa.
            </p>
            <Link href="/contact" className={`${BUTTON_PRIMARY_SMALL} mt-7`}>
              Start a Project
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <nav aria-labelledby="footer-products" className="col-span-2 sm:col-span-1">
              <h2 id="footer-products" className={HEADING}>
                Products
              </h2>
              <ul className="flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={`${LINK} inline-flex items-center gap-2.5`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${TONE_CLASS[STATUS_TONE[link.status]].dot}`} aria-hidden="true" />
                      {link.label}
                      <span className="sr-only">({STATUS_LABEL[link.status]})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-company">
              <h2 id="footer-company" className={HEADING}>
                Company
              </h2>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className={HEADING}>Connect</h2>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VersaLabs Studio. Addis Ababa, Ethiopia.</p>
          <ul aria-label="Status key" className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em]">
            {TONE_LEGEND.map(({ tone, label }) => (
              <li key={tone} className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${TONE_CLASS[tone].dot}`} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
