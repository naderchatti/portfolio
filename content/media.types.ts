export type ImageSource = { src: string; width: number };

export type GeneratedImage = {
  name: string;
  /** Intrinsic size of the largest source (after EXIF orientation). */
  width: number;
  height: number;
  /** Tiny WebP data URI used as a blurred background while loading. */
  placeholder: string;
  sources: { avif: readonly ImageSource[]; webp: readonly ImageSource[] };
};

export type GeneratedVideo = {
  name: string;
  src: string;
  poster: string;
  width: number;
  height: number;
};
