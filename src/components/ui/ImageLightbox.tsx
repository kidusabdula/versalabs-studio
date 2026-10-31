'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
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

const CONTROL =
  'absolute z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition-colors hover:border-white/40';

// The full-size viewer. It renders in a portal on <body>, so no transformed ancestor (a section settling into view)
// can trap its fixed position. Escape closes it, the arrow keys step through, focus starts on Close and returns to
// what opened it. The image cross-fades in with CSS (.fade-in), which reduced motion turns off. The viewer is always
// dark, whatever the theme: photos read best on black.
export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  title = 'Gallery',
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the portal target only exists in the browser
    setMounted(true);
  }, []);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;

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

  useEffect(() => {
    if (!isOpen) returnFocus.current?.focus();
  }, [isOpen]);

  if (!mounted || !isOpen) return null;
  const image = images[currentIndex];
  if (!image) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
      <div onClick={onClose} className="fade-in absolute inset-0 bg-black/95" aria-hidden="true" />

      <button type="button" autoFocus onClick={onClose} aria-label="Close gallery" className={`${CONTROL} top-5 right-5`}>
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <p className="absolute top-8 left-6 z-20 font-mono text-[13px] text-white/75 tabular-nums">
        {currentIndex + 1} / {images.length}
      </p>

      {images.length > 1 && (
        <>
          <button type="button" onClick={goPrev} aria-label="Previous image" className={`${CONTROL} left-3 md:left-8`}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={goNext} aria-label="Next image" className={`${CONTROL} right-3 md:right-8`}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}

      <div key={currentIndex} className="fade-in relative z-10 h-[80vh] w-[90vw] max-w-[1400px]">
        <Image src={image.src} alt={image.alt} fill className="object-contain" sizes="90vw" priority />
      </div>

      {/* A licence credit travels with its image. */}
      {image.credit && (
        <p className="absolute bottom-4 left-1/2 z-20 w-[90vw] max-w-[1400px] -translate-x-1/2 text-center">
          <MediaCredit credit={image.credit} onDark />
        </p>
      )}
    </div>,
    document.body,
  );
}
