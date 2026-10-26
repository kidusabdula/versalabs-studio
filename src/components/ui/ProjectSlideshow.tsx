'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/content/schema';

interface ProjectSlideshowProps {
  images: GalleryImage[];
  title: string;
  intervalMs?: number;
  hoverOnly?: boolean;
  onImageClick?: (index: number) => void;
}

export default function ProjectSlideshow({
  images,
  title,
  intervalMs = 2500,
  hoverOnly = false,
  onImageClick,
}: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const reduceMotion = useReducedMotion();

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1 || reduceMotion) return;
    if (hoverOnly && !isHovered) return;
    // Hold still while someone is reading or using the controls.
    if (!hoverOnly && (isHovered || hasFocus)) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs, isHovered, hasFocus, hoverOnly, reduceMotion]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[3/2] bg-[#141417] border border-white/[0.04] flex items-center justify-center rounded-xl overflow-hidden">
        <span className="text-zinc-600 text-sm">Visuals Unavailable</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-[3/2] overflow-hidden rounded-xl border border-white/[0.04] bg-[#0A0A0C] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasFocus(false);
      }}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {onImageClick ? (
            <button
              type="button"
              onClick={() => onImageClick(currentIndex)}
              aria-label={`View full size, slide ${currentIndex + 1} of ${images.length}`}
              className="absolute inset-0 block w-full h-full cursor-pointer"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority={currentIndex === 0}
              />
            </button>
          ) : (
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority={currentIndex === 0}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows: always shown on touch screens, on hover or keyboard focus elsewhere */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Progress indicator. Decorative: the arrows are the controls, and up to
          25 slides would not fit as 24px touch targets on a phone. */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10" aria-hidden="true">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
