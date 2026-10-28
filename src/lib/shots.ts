import type { GalleryImage, Project } from '@/content/schema';

// Which images lead a project page, and which are left for the gallery, so no
// image shows twice.
//
// The lead shot is the project's cover (a straight screenshot where one
// exists), or its first desktop screenshot. What stands beside it:
// - a desktop capture named screen-<page>-desktop: screen-<page>-mobile when the
//   project has it, the same page on a phone;
// - a phone screen (a product shown only on phones): the next two phone
//   screens, so the lead reads as a product rather than one small screen.
export function leadShots(project: Project): { lead?: GalleryImage; beside: GalleryImage[] } {
  const find = (src?: string) => (src ? project.gallery.find((image) => image.src === src) : undefined);
  const lead =
    find(project.cover) ??
    project.gallery.find((image) => image.kind === 'screen' && image.width > image.height) ??
    project.gallery.find((image) => image.kind === 'mockup');
  if (!lead) return { beside: [] };

  if (isPhoneScreen(lead)) {
    const featured = new Set(project.features.map((feature) => feature.image));
    const phones = project.gallery.filter(
      (image) => isPhoneScreen(image) && image.src !== lead.src && !featured.has(image.src),
    );
    return { lead, beside: phones.slice(0, 2) };
  }
  const twin = /-desktop\.webp$/.test(lead.src) ? find(lead.src.replace(/-desktop\.webp$/, '-mobile.webp')) : undefined;
  return { lead, beside: twin ? [twin] : [] };
}

export function isPhoneScreen(image: GalleryImage) {
  return image.kind === 'screen' && image.height > image.width;
}

// The gallery: everything not already shown at the top of the page or beside a feature.
export function galleryRest(project: Project, shown: (GalleryImage | undefined)[]): GalleryImage[] {
  const used = new Set([...shown.map((image) => image?.src), ...project.features.map((feature) => feature.image)]);
  return project.gallery.filter((image) => !used.has(image.src));
}
