'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import ProjectCardView from '@/components/case-study/ProjectCardView';
import type { ProjectCard } from '@/content/projects';
import { INDUSTRIES, PROJECT_KINDS, STACK, type ProjectKind } from '@/content/schema';
import { KIND_LABEL } from '@/content/labels';

// The /work listing with its filters. The server renders every card, so the
// page is complete without JavaScript; filtering then happens in the browser.
// Filters live in the URL (?type=client&industry=events&stack=supabase&q=erp),
// so a filtered view can be shared or bookmarked. Within a group any selected
// value matches; across groups every group must match.

type Group = 'type' | 'industry' | 'stack';
type Selection = Record<Group, string[]>;

const EMPTY: Selection = { type: [], industry: [], stack: [] };

// URL-safe value for a filter label: "Sports & Media" → "sports-media".
const toParam = (label: string) =>
  label
    .toLowerCase()
    .replace(/\+/g, ' ')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '');

function readUrl(): { selection: Selection; query: string } {
  const params = new URLSearchParams(window.location.search);
  const list = (key: Group) => (params.get(key) ?? '').split(',').filter(Boolean);
  return { selection: { type: list('type'), industry: list('industry'), stack: list('stack') }, query: params.get('q') ?? '' };
}

function writeUrl(selection: Selection, query: string) {
  const params = new URLSearchParams();
  for (const group of ['type', 'industry', 'stack'] as const) {
    if (selection[group].length) params.set(group, selection[group].join(','));
  }
  if (query.trim()) params.set('q', query.trim());
  const search = params.toString();
  window.history.replaceState(window.history.state, '', search ? `?${search}` : window.location.pathname);
}

interface Option {
  value: string;
  label: string;
}

export default function WorkIndex({ cards }: { cards: ProjectCard[] }) {
  const [selection, setSelection] = useState<Selection>(EMPTY);
  const [query, setQuery] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);

  // Read the filters from the URL once, after the server-rendered list is on screen.
  useEffect(() => {
    const fromUrl = readUrl();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable in the browser
    setSelection(fromUrl.selection);
    setQuery(fromUrl.query);
    if (fromUrl.selection.industry.length || fromUrl.selection.stack.length) setMoreOpen(true);
  }, []);

  // Only offer values some project actually has, in the vocabulary's order.
  const options = useMemo(() => {
    const present = (values: readonly string[], pick: (card: ProjectCard) => readonly string[]): Option[] =>
      values
        .filter((value) => cards.some((card) => pick(card).includes(value)))
        .map((value) => ({ value: toParam(value), label: value }));
    return {
      type: PROJECT_KINDS.filter((kind) => cards.some((card) => card.kind === kind)).map((kind: ProjectKind) => ({
        value: kind,
        label: KIND_LABEL[kind],
      })),
      industry: present(INDUSTRIES, (card) => card.industry),
      stack: present(STACK, (card) => card.stack),
    } satisfies Record<Group, Option[]>;
  }, [cards]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      if (selection.type.length && !selection.type.includes(card.kind)) return false;
      if (selection.industry.length && !card.industry.some((value) => selection.industry.includes(toParam(value)))) return false;
      if (selection.stack.length && !card.stack.some((value) => selection.stack.includes(toParam(value)))) return false;
      if (!q) return true;
      const haystack = [card.title, card.subtitle, card.summary, card.category, ...card.tags, ...card.industry, ...card.stack]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [cards, selection, query]);

  const update = (next: Selection, nextQuery = query) => {
    setSelection(next);
    writeUrl(next, nextQuery);
  };

  const toggle = (group: Group, value: string) => {
    const current = selection[group];
    update({ ...selection, [group]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });
  };

  const active = selection.type.length + selection.industry.length + selection.stack.length + (query.trim() ? 1 : 0);

  const chips = (group: Group, label: string) => (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options[group].map((option) => {
          const pressed = selection[group].includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => toggle(group, option.value)}
              className={`min-h-9 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                pressed
                  ? 'border-white bg-white text-black'
                  : 'border-white/[0.08] bg-[#1C1C1F] text-zinc-300 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <section aria-label="Projects" className="px-6 pb-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-8 rounded-2xl border border-white/[0.06] bg-[#111113] p-5 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {chips('type', 'Type')}
            <div className="relative w-full lg:w-80">
              <label htmlFor="work-search" className="sr-only">
                Search projects
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
              <input
                id="work-search"
                type="search"
                placeholder="Search projects"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  writeUrl(selection, e.target.value);
                }}
                className="w-full rounded-full border border-white/[0.08] bg-[#141417] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-400 focus:border-white/[0.2]"
              />
            </div>
          </div>

          <details open={moreOpen} onToggle={(e) => setMoreOpen(e.currentTarget.open)} className="group">
            <summary className="cursor-pointer text-sm font-medium text-zinc-300 hover:text-white">
              Filter by industry and stack
            </summary>
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {chips('industry', 'Industry')}
              {chips('stack', 'Stack')}
            </div>
          </details>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
            <p aria-live="polite" className="text-sm text-zinc-400">
              Showing {filtered.length} of {cards.length} projects
            </p>
            {active > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  update(EMPTY, '');
                }}
                className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-zinc-300 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((card, i) => (
              <li key={card.slug}>
                <ProjectCardView project={card} eager={i === 0 && active === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-24 text-center text-zinc-400">No projects match these filters.</p>
        )}
      </div>
    </section>
  );
}
