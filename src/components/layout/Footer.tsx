import Link from 'next/link';
import Image from 'next/image';
import { getProjectBySlug, projectPath } from '@/content/projects';
import { CONTACT_EMAIL } from '@/lib/site';
import { CONTAINER } from '@/components/ui/styles';

// The products linked in the footer. Their URLs come from the project files, and
// a hidden project simply drops out of the list.
const FOOTER_PRODUCTS = ['obsidian-erp', 'versa-fx', 'versa-estate', 'rentflow'];

const productLinks = FOOTER_PRODUCTS.flatMap((slug) => {
  const project = getProjectBySlug(slug);
  return project ? [{ label: project.title, href: projectPath(project) }] : [];
});

const companyLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Client Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/versalabs-studio', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
  { label: 'Telegram', href: 'https://t.me/kidusabdula', icon: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' },
];

const HEADING = 'mb-4 font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-400';
const LINK = 'text-[14px] text-zinc-400 transition-colors hover:text-foreground';

// Four columns: the studio, its products, the company pages and how to reach us.
export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className={`${CONTAINER} pt-16 pb-10`}>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image src="/versalabs-logo-light.png" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="text-[16px] font-semibold tracking-wide text-foreground">VersaLabs Studio</span>
            </Link>
            <p className="max-w-[32ch] text-[14px] leading-[1.6] text-zinc-400">
              Addis Ababa, Ethiopia · Building for the world
            </p>
          </div>

          <nav aria-labelledby="footer-products">
            <h2 id="footer-products" className={HEADING}>Products</h2>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className={HEADING}>Company</h2>
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
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-2`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={link.icon} />
                    </svg>
                    {link.label}
                    <span className="sr-only">(opens in a new tab)</span>
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

        <div className="mt-14 border-t border-border pt-6">
          <p className="text-[13px] text-zinc-400">© {new Date().getFullYear()} VersaLabs Studio</p>
        </div>
      </div>
    </footer>
  );
}
