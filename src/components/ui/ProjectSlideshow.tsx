'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/content/schema';

interface ProjectSlideshowProps {
  images: GalleryImage[];
  title: string;
  onImageClick?: (index: number) => void;
  // Fetch the first slide early (it is the first image on the page). Off when something above it on the page comes
  // first.
  priority?: boolean;
}

const CONTROL =
  'absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-2 bg-background/85 text-foreground transition-colors hover:bg-background';

// A manual carousel: it moves only when someone presses an arrow, so there is no timer to pause (WCAG 2.2.2). The
// first slide is painted as it is; later slides fade in with CSS (.fade-in), which reduced motion turns off.
export default function ProjectSlideshow({ images, title, onImageClick, priority = true }: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moved, setMoved] = useState(false);

  if (images.length === 0) return null;

  const image = images[currentIndex];
  const go = (step: number) => {
    setMoved(true);
    setCurrentIndex((prev) => (prev + step + images.length) % images.length);
  };

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      className="object-contain"
      sizes="(max-width: 1280px) 100vw, 1200px"
      preload={priority && currentIndex === 0}
    />
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} pictures`}
      className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div
        key={currentIndex}
        className={`absolute inset-0 ${moved ? 'fade-in' : ''}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${currentIndex + 1} of ${images.length}`}
      >
        {onImageClick ? (
          <button
            type="button"
            onClick={() => onImageClick(currentIndex)}
            aria-label={`View full size: ${image.alt}`}
            className="absolute inset-0 block h-full w-full cursor-zoom-in"
          >
            {picture}
          </button>
        ) : (
          picture
        )}
      </div>

      {images.length > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${CONTROL} left-3`}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${CONTROL} right-3`}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          {/* Position, for sighted users; the slide's own label carries it for screen readers. */}
          <div
            className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-line bg-background/85 px-3 py-1 font-mono text-[12px] text-foreground tabular-nums"
            aria-hidden="true"
          >
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
