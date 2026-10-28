import Link from 'next/link';

// A page's closing call to action: one primary action (talk to us) and one way
// to keep reading, which defaults to what we offer.
export default function CallToAction({
  secondary = { href: '/services', label: 'See Our Services' },
}: {
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="get-in-touch" className="relative overflow-hidden border-t border-white/[0.04] px-6 py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[120vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full bg-gradient-to-br from-violet-500/8 via-white/[0.03] to-indigo-500/8 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 id="get-in-touch" className="mb-6 text-4xl font-bold tracking-tighter text-white md:text-5xl">
          Tell Us What Your Business Needs
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
          Ask for a demo of one of our products, or tell us about the software you have in mind. We reply by email.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Start a Project
          </Link>
          <Link
            href={secondary.href}
            className="flex h-12 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] px-8 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.08]"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
