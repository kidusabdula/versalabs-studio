'use client';

// Next.js passes `error` too; this page shows the same message for any failure.
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t load this project page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
