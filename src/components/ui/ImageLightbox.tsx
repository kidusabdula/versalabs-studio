'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '@/content/schema';
import MediaCredit from '@/components/case-study/MediaCredit';

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  title?: string;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title = 'Gallery',
}: ImageLightboxProps) {
  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, goNext, goPrev, onClose]);

  const credit = images[currentIndex]?.credit;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95"
          />

          {/* Close Button */}
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-6 right-6 z-20 rounded-full border border-border bg-surface p-3 text-foreground transition-colors hover:border-border-hover"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 z-20 text-sm text-zinc-400 font-mono">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-4 z-20 rounded-full border border-border bg-surface p-3 text-foreground transition-colors hover:border-border-hover md:left-8"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-4 z-20 rounded-full border border-border bg-surface p-3 text-foreground transition-colors hover:border-border-hover md:right-8"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-[90vw] h-[80vh] max-w-[1400px]"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          {/* A licence credit travels with its image. */}
          {credit && (
            <p className="absolute bottom-4 left-1/2 z-20 w-[90vw] max-w-[1400px] -translate-x-1/2 text-center">
              <MediaCredit credit={credit} />
            </p>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
