import Link from 'next/link';
import type { Metadata } from 'next';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, EYEBROW, H1, LEAD } from '@/components/ui/styles';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

// Every unknown URL, and every project slug that isn't public (dynamicParams is off), lands here with a 404.
export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-paper grid-paper-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className={`${CONTAINER} relative flex min-h-[70svh] items-center py-16 md:py-28`}>
        <div className="max-w-2xl">
          <span className={EYEBROW}>Error 404</span>
          <h1 className={`${H1} mt-5`}>Page Not Found</h1>
          <p className={`${LEAD} mt-6 mb-10`}>
            This page doesn&apos;t exist, or it has moved. Our products and client work are a click away.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className={BUTTON_PRIMARY}>
              See Our Products
            </Link>
            <Link href="/" className={BUTTON_SECONDARY}>
              Go to the Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
