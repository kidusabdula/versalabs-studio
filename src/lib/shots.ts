import type { GalleryImage, Project } from '@/content/schema';

// Which images lead a project page, and which are left for the gallery, so no
// image shows twice.
//
// The lead shot is the project's cover (a straight screenshot where one
// exists), or its first desktop screenshot. A desktop capture named
// screen-<page>-desktop is paired with screen-<page>-mobile when the project has
// it: the same page on a phone, shown beside it.
export function leadShots(project: Project): { desktop?: GalleryImage; phone?: GalleryImage } {
  const find = (src?: string) => (src ? project.gallery.find((image) => image.src === src) : undefined);
  const desktop =
    find(project.cover) ??
    project.gallery.find((image) => image.kind === 'screen' && image.width > image.height) ??
    project.gallery.find((image) => image.kind === 'mockup');
  const phone = desktop && /-desktop\.webp$/.test(desktop.src) ? find(desktop.src.replace(/-desktop\.webp$/, '-mobile.webp')) : undefined;
  return { desktop, phone };
}

// The gallery: everything not already shown at the top of the page or beside a feature.
export function galleryRest(project: Project, shown: (GalleryImage | undefined)[]): GalleryImage[] {
  const used = new Set([...shown.map((image) => image?.src), ...project.features.map((feature) => feature.image)]);
  return project.gallery.filter((image) => !used.has(image.src));
}
