'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import type { Loop } from '@/content/schema';
import MediaCredit from './MediaCredit';

// A silent screen recording that never costs the first paint:
// - The poster (one of the project's screenshots, the same page in the same
//   state) renders on the server like any other image, and loads lazily.
// - The <video> joins the page only after hydration, and only when the visitor
//   hasn't asked for reduced motion. With reduced motion on, the poster is all
//   there is.
// - preload="none" and no autoplay attribute: nothing downloads until the video
//   scrolls into view, it plays muted and looping while in view, and it pauses
//   when it leaves. It fades in over the poster once it is actually playing.
// - The pause button stops it for good (WCAG 2.2.2), until pressed again.
// The video is aria-hidden: the caption below says what it shows.
export default function LoopVideo({ loop, sizes, className = '' }: { loop: Loop; sizes: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const captionId = useId();

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setMotionAllowed(!query.matches);
      setStarted(false);
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!motionAllowed || !video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [motionAllowed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (motionAllowed && inView && !userPaused) {
      video.muted = true;
      video.play().catch(() => {
        // Autoplay refused or the format isn't supported: the poster stays.
      });
    } else {
      video.pause();
    }
  }, [motionAllowed, inView, userPaused]);

  const isPhone = loop.view === 'mobile';

  return (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden border border-white/[0.06] bg-[#0E0E10] ${isPhone ? 'rounded-[1.75rem]' : 'rounded-xl'}`}
        style={{ aspectRatio: `${loop.width} / ${loop.height}` }}
      >
        <Image src={loop.poster} alt="" fill sizes={sizes} className="object-cover" />
        {motionAllowed && (
          <>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              width={loop.width}
              height={loop.height}
              onPlaying={() => setStarted(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${started ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={loop.src} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={() => setUserPaused((paused) => !paused)}
              aria-label={userPaused ? 'Play the recording' : 'Pause the recording'}
              aria-describedby={captionId}
              className="absolute right-3 bottom-3 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              {userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          </>
        )}
      </div>
      <figcaption id={captionId} className="mt-3 text-[13px] leading-relaxed text-zinc-400">
        {loop.caption}
        {loop.credit && <MediaCredit credit={loop.credit} className="mt-1 block" />}
      </figcaption>
    </figure>
  );
}
