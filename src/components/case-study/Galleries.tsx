'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProjectSlideshow from '@/components/ui/ProjectSlideshow';
import ImageLightbox from '@/components/ui/ImageLightbox';
import type { GalleryImage } from '@/content/schema';
import MediaCredit from './MediaCredit';

// Mockups play in the carousel near the top and screenshots fill the gallery
// further down, so no image shows twice. Each has its own full-size viewer.

export function MockupCarousel({
  images,
  title,
  priority = true,
}: {
  images: GalleryImage[];
  title: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  return (
    <>
      <ProjectSlideshow
        images={images}
        title={title}
        priority={priority}
        onImageClick={(i) => {
          setIndex(i);
          setOpen(true);
        }}
      />
      <ImageLightbox
        images={images}
        currentIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
        onNavigate={setIndex}
        title={title}
      />
    </>
  );
}

const INITIAL_COUNT = 6;

export function ScreenGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  if (images.length === 0) return null;

  const visible = showAll ? images : images.slice(0, INITIAL_COUNT);

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {visible.map((image, i) => (
          <li key={image.src}>
            <figure>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                aria-label={`View full size: ${image.alt}`}
                className="relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/[0.06] bg-[#0E0E10]"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </button>
              <figcaption className="mt-3 text-[13px] leading-relaxed text-zinc-400">
                {image.alt}
                {image.credit && <MediaCredit credit={image.credit} className="mt-1 block" />}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {images.length > INITIAL_COUNT && !showAll && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            Show All {images.length} Screenshots
          </button>
        </div>
      )}
      <ImageLightbox
        images={images}
        currentIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
        onNavigate={setIndex}
        title={title}
      />
    </>
  );
}
