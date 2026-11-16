'use client';

import { useEffect, useRef, useState } from 'react';

type LazyVideoProps = {
  src: string;
  poster: string;
  width: number;
  height: number;
  label?: string;
};

/**
 * Muted, inline video with native controls, shown at its own aspect ratio (never cropped).
 * Only the poster loads until the player nears the viewport; it then autoplays while at least half
 * visible, unless the reader prefers reduced motion or has used the controls.
 */
export function LazyVideo({ src, poster, width, height, label }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not serialise `muted`; set it so autoplay is allowed after hydration.
    video.muted = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userControlled = false;
    const markUser = () => {
      userControlled = true;
    };
    // Only real interaction counts; the programmatic play()/pause() below does not trigger these.
    video.addEventListener('pointerdown', markUser);
    video.addEventListener('keydown', markUser);

    const nearObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    const visibleObserver = new IntersectionObserver(
      (entries) => {
        if (userControlled || reduced.matches) return;
        if (entries.some((entry) => entry.isIntersecting)) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.5 },
    );
    nearObserver.observe(video);
    visibleObserver.observe(video);
    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
      video.removeEventListener('pointerdown', markUser);
      video.removeEventListener('keydown', markUser);
    };
  }, []);

  return (
    <video
      ref={ref}
      // The source is attached only once the player is near the viewport.
      src={near ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      controls
      muted
      loop
      playsInline
      preload={near ? 'metadata' : 'none'}
      aria-label={label}
      className="block h-auto w-full rounded-card border bg-muted object-contain"
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}
