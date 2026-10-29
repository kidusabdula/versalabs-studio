'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import ProjectCardView from '@/components/case-study/ProjectCardView';
import type { ProjectCard } from '@/content/projects';
import { INDUSTRIES } from '@/content/schema';
import { CARD, CONTAINER } from '@/components/ui/styles';

// The /work listing: the businesses we've built for, filterable by industry
// and searchable. The server renders every card, so the page is complete
// without JavaScript; filtering then happens in the browser. Filters live in
// the URL (?industry=events,printing&q=store), so a filtered view can be shared.

// URL-safe value for an industry: "Sports & Media" → "sports-media".
const toParam = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function readUrl(): { industry: string[]; query: string } {
  const params = new URLSearchParams(window.location.search);
  return { industry: (params.get('industry') ?? '').split(',').filter(Boolean), query: params.get('q') ?? '' };
}

function writeUrl(industry: string[], query: string) {
  const params = new URLSearchParams();
  if (industry.length) params.set('industry', industry.join(','));
  if (query.trim()) params.set('q', query.trim());
  const search = params.toString();
  window.history.replaceState(window.history.state, '', search ? `?${search}` : window.location.pathname);
}

export default function WorkIndex({ cards }: { cards: ProjectCard[] }) {
  const [industry, setIndustry] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  // Read the filters from the URL once, after the server-rendered list is on screen.
  useEffect(() => {
    const fromUrl = readUrl();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable in the browser
    setIndustry(fromUrl.industry);
    setQuery(fromUrl.query);
  }, []);

  // Only offer industries some card actually has, in the vocabulary's order.
  const options = useMemo(
    () =>
      INDUSTRIES.filter((value) => cards.some((card) => card.industry.includes(value))).map((value) => ({
        value: toParam(value),
        label: value,
      })),
    [cards],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      if (industry.length && !card.industry.some((value) => industry.includes(toParam(value)))) return false;
      if (!q) return true;
      const haystack = [card.title, card.client ?? '', card.subtitle, card.summary, card.category, ...card.tags, ...card.industry]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [cards, industry, query]);

  const toggle = (value: string) => {
    const next = industry.includes(value) ? industry.filter((v) => v !== value) : [...industry, value];
    setIndustry(next);
    writeUrl(next, query);
  };

  const active = industry.length + (query.trim() ? 1 : 0);

  return (
    <section aria-label="Client work" className="pb-16 md:pb-28">
      <div className={CONTAINER}>
        <div className={`${CARD} mb-10 flex flex-col gap-6 p-5 md:p-8`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <fieldset className="min-w-0">
              <legend className="mb-3 font-mono text-[12px] uppercase tracking-[0.08em] text-zinc-400">Industry</legend>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const pressed = industry.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => toggle(option.value)}
                      className={`min-h-9 rounded-full border px-4 py-1.5 text-[14px] font-medium transition-colors ${
                        pressed
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-surface-elevated text-zinc-300 hover:border-border-hover hover:text-foreground'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="relative w-full shrink-0 lg:w-80">
              <label htmlFor="work-search" className="sr-only">
                Search client work
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
              <input
                id="work-search"
                type="search"
                placeholder="Search client work"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  writeUrl(industry, e.target.value);
                }}
                className="w-full rounded-full border border-border bg-background py-2.5 pr-4 pl-10 text-[14px] text-foreground placeholder:text-zinc-400 focus:border-border-hover"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <p aria-live="polite" className="text-[14px] text-zinc-400">
              Showing {filtered.length} of {cards.length}
            </p>
            {active > 0 && (
              <button
                type="button"
                onClick={() => {
                  setIndustry([]);
                  setQuery('');
                  writeUrl([], '');
                }}
                className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-[14px] font-medium text-zinc-300 hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((card, i) => (
              <li key={card.slug}>
                <ProjectCardView project={card} eager={i === 0 && active === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-24 text-center text-zinc-400">Nothing matches these filters.</p>
        )}
      </div>
    </section>
  );
}
