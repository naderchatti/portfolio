import type { Localized } from './types';

/** UI strings for the image previewer (lightbox). */
export const uiMedia = {
  /** Accessible name prefix of a zoomable image: “View full size: <alt>”. */
  open: { en: 'View full size', fr: 'Agrandir' },
  dialog: { en: 'Image viewer', fr: 'Visionneuse d’images' },
  close: { en: 'Close', fr: 'Fermer' },
  previous: { en: 'Previous image', fr: 'Image précédente' },
  next: { en: 'Next image', fr: 'Image suivante' },
  /** “Image 3 of 8” for screen readers; the visible counter is “3 / 8”. */
  position: { en: 'Image {index} of {total}', fr: 'Image {index} sur {total}' },
} as const satisfies Record<string, Localized>;
