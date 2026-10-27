'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/content/schema';

interface ProjectSlideshowProps {
  images: GalleryImage[];
  title: string;
  onImageClick?: (index: number) => void;
  // Fetch the first slide early (it is the first image on the page). Off when
  // something above it on the page comes first.
  priority?: boolean;
}

// A manual carousel: it moves only when someone presses an arrow, so there is no
// timer to pause (WCAG 2.2.2). The first slide is painted as it is, without a
// fade, because on a phone it can be the largest thing in the first view.
export default function ProjectSlideshow({ images, title, onImageClick, priority = true }: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const image = images[currentIndex];
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      className="object-contain"
      sizes="(max-width: 1200px) 100vw, 1200px"
      priority={priority && currentIndex === 0}
    />
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      className="relative w-full aspect-[3/2] overflow-hidden rounded-xl border border-white/[0.04] bg-[#0A0A0C] group"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0"
          aria-roledescription="slide"
          aria-label={`${currentIndex + 1} of ${images.length}`}
        >
          {onImageClick ? (
            <button
              type="button"
              onClick={() => onImageClick(currentIndex)}
              aria-label={`View full size: ${image.alt}`}
              className="absolute inset-0 block w-full h-full cursor-zoom-in"
            >
              {picture}
            </button>
          ) : (
            picture
          )}
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          {/* Position, for sighted users; the slide's own label carries it for screen readers. */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white tabular-nums" aria-hidden="true">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
