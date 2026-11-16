import { generatedImages, generatedVideos } from './media.generated';
import { mediaMeta, type MediaMeta } from './media.meta';
import type { GeneratedImage, GeneratedVideo } from './media.types';

export type { GeneratedImage, GeneratedVideo, ImageSource } from './media.types';

export type GeneratedImageName = keyof typeof generatedImages;
/** Name of a published image, as used in `media:<name>` refs and content files. */
export type MediaName = GeneratedImageName;
export type VideoName = keyof typeof generatedVideos;

export type MediaImage = GeneratedImage & MediaMeta;

export function isMediaName(name: string): name is MediaName {
  return Object.hasOwn(generatedImages, name);
}

export function getImage(name: MediaName): MediaImage {
  return { ...generatedImages[name], ...mediaMeta[name] };
}

/** Lookup for untyped refs (MDX `media:` links, frontmatter covers). */
export function findImage(name: string): MediaImage | undefined {
  return isMediaName(name) ? getImage(name) : undefined;
}

export function getVideo(name: VideoName): GeneratedVideo {
  return generatedVideos[name];
}
