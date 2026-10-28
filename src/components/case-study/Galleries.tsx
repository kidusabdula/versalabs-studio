'use client';

import { useState } from 'react';
import ProjectSlideshow from '@/components/ui/ProjectSlideshow';
import ImageLightbox from '@/components/ui/ImageLightbox';
import ProductShot, { isPortrait } from '@/components/ui/ProductShot';
import { BUTTON_SECONDARY } from '@/components/ui/styles';
import type { GalleryImage } from '@/content/schema';
import MediaCredit from './MediaCredit';

// Mockups play in the carousel and screenshots fill the gallery, so no image
// shows twice. Each has its own full-size viewer.

export function MockupCarousel({
  images,
  title,
  priority = false,
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

// How many of each kind show before "Show All".
const INITIAL_DESKTOP = 4;
const INITIAL_PHONE = 4;

function Shot({ image, sizes, onOpen }: { image: GalleryImage; sizes: string; onOpen: () => void }) {
  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View full size: ${image.alt}`}
        className="block w-full cursor-zoom-in rounded-xl text-left transition-opacity hover:opacity-90"
      >
        <ProductShot image={image} alt="" sizes={sizes} />
      </button>
      <figcaption className="mt-3 text-[13px] leading-[1.5] text-zinc-400">
        {image.alt}
        {image.credit && <MediaCredit credit={image.credit} className="mt-1 block" />}
      </figcaption>
    </figure>
  );
}

// Desktop screenshots in browser frames, two to a row; phone screenshots in
// phone outlines, up to four to a row.
export function ScreenGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  if (images.length === 0) return null;

  const desktop = images.filter((image) => !isPortrait(image));
  const phone = images.filter((image) => isPortrait(image));
  // The viewer steps through the screenshots in the order they appear.
  const ordered = [...desktop, ...phone];
  const shownDesktop = showAll ? desktop : desktop.slice(0, INITIAL_DESKTOP);
  const shownPhone = showAll ? phone : phone.slice(0, INITIAL_PHONE);
  const hidden = ordered.length - shownDesktop.length - shownPhone.length;
  const openAt = (image: GalleryImage) => {
    setIndex(ordered.indexOf(image));
    setOpen(true);
  };

  return (
    <>
      {shownDesktop.length > 0 && (
        <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2">
          {shownDesktop.map((image) => (
            <li key={image.src}>
              <Shot image={image} sizes="(max-width: 768px) calc(100vw - 40px), 590px" onOpen={() => openAt(image)} />
            </li>
          ))}
        </ul>
      )}
      {shownPhone.length > 0 && (
        <ul className={`grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 ${shownDesktop.length > 0 ? 'mt-12' : ''}`}>
          {shownPhone.map((image) => (
            <li key={image.src}>
              <Shot image={image} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px" onOpen={() => openAt(image)} />
            </li>
          ))}
        </ul>
      )}
      {hidden > 0 && (
        <div className="mt-12 text-center">
          <button type="button" onClick={() => setShowAll(true)} className={BUTTON_SECONDARY}>
            Show All {images.length} Screenshots
          </button>
        </div>
      )}
      <ImageLightbox
        images={ordered}
        currentIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
        onNavigate={setIndex}
        title={title}
      />
    </>
  );
}
