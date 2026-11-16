'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type RgbLoopProps = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Describes the clip; also the poster's alt under reduced motion. */
  label: string;
  playLabel: string;
  pauseLabel: string;
};

/**
 * Muted autoplaying loop with a pause control. Under `prefers-reduced-motion` the video is hidden and
 * paused, and only its poster is shown.
 */
export function RgbLoop({ src, poster, width, height, label, playLabel, pauseLabel }: RgbLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React does not serialise `muted`; set it so autoplay is allowed after hydration.
    video.muted = true;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (query.matches) video.pause();
      else if (!video.dataset.userPaused) void video.play().catch(() => undefined);
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      delete video.dataset.userPaused;
      void video.play().catch(() => undefined);
    } else {
      video.dataset.userPaused = 'true';
      video.pause();
    }
  };

  const style = { aspectRatio: `${width} / ${height}` };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        className="block w-full rounded-card border bg-muted object-cover motion-reduce:hidden"
        style={style}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, poster is a plain JPEG */}
      <img
        src={poster}
        alt={label}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="hidden w-full rounded-card border bg-muted object-cover motion-reduce:block"
        style={style}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? playLabel : pauseLabel}
        className="absolute right-2 bottom-2 inline-flex size-11 items-center justify-center rounded-lg border bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-secondary motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
      </button>
    </div>
  );
}
