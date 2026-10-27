import type { Loop } from '@/content/schema';
import LoopVideo from './LoopVideo';

// The case study's screen recordings, in rows: each desktop loop sits beside the
// phone loop of the same row at the same height (the columns are in the ratio of
// a 16:10 screen to a 390x844 phone), and they stack below lg.
export default function LoopShowcase({ loops }: { loops: Loop[] }) {
  const desktop = loops.filter((loop) => loop.view === 'desktop');
  const mobile = loops.filter((loop) => loop.view === 'mobile');
  const rows = Array.from({ length: Math.max(desktop.length, mobile.length) }, (_, i) => ({
    wide: desktop[i],
    phone: mobile[i],
  }));

  return (
    <div className="flex flex-col gap-12">
      {rows.map(({ wide, phone }) => (
        <div
          key={(wide ?? phone).src}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.4621fr)] lg:gap-6"
        >
          {wide ? <LoopVideo loop={wide} sizes="(max-width: 1024px) 100vw, 900px" /> : <div className="hidden lg:block" />}
          {phone && (
            <LoopVideo loop={phone} sizes="280px" className="mx-auto w-full max-w-[280px] lg:max-w-none" />
          )}
        </div>
      ))}
    </div>
  );
}
