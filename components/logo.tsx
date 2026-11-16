'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  LEFT_EAR,
  LEFT_EYE,
  LEFT_PATCH,
  MOUTH,
  RIGHT_EAR,
  RIGHT_EYE,
  RIGHT_PATCH,
} from '@/lib/cat-paths';

const EYE_RANGE = 14;
const TRACKING_QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)';

type LogoProps = {
  className?: string;
  /** Eyes follow the pointer (fine pointers only, never with reduced motion). */
  tracking?: boolean;
  /** Accessible name; omit for a decorative mark. */
  label?: string;
};

export function Logo({ className, tracking = false, label }: LogoProps) {
  const leftEyeRef = useRef<SVGPathElement>(null);
  const rightEyeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!tracking) return;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    if (!leftEye || !rightEye) return;

    const query = window.matchMedia(TRACKING_QUERY);
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const offset = (eye: SVGPathElement, x: number, y: number) => {
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(y - cy, x - cx);
      const distance = Math.min(1, Math.hypot(x - cx, y - cy) / 150);
      return `translate(${(Math.cos(angle) * distance * EYE_RANGE).toFixed(1)}px, ${(
        Math.sin(angle) * distance * EYE_RANGE
      ).toFixed(1)}px)`;
    };

    const render = () => {
      frame = 0;
      if (!pointer) return;
      leftEye.style.transform = offset(leftEye, pointer.x, pointer.y);
      rightEye.style.transform = offset(rightEye, pointer.x, pointer.y);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(render);
    };

    const reset = () => {
      leftEye.style.transform = '';
      rightEye.style.transform = '';
    };

    const start = () => window.addEventListener('pointermove', onMove, { passive: true });
    const stop = () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      reset();
    };

    const sync = () => (query.matches ? start() : stop());
    sync();
    query.addEventListener('change', sync);

    return () => {
      query.removeEventListener('change', sync);
      stop();
    };
  }, [tracking]);

  const eyeClass = 'fill-cat-face transition-transform duration-100 ease-out motion-reduce:transition-none';

  return (
    <svg
      viewBox="50 30 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-full', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <circle
        cx="250"
        cy="230"
        r="190"
        className="fill-cat-face stroke-cat-ring"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <path className="fill-cat-fur" d={LEFT_PATCH} />
      <path ref={leftEyeRef} className={eyeClass} d={LEFT_EYE} />
      <path className="fill-cat-fur" d={MOUTH} />
      <path className="fill-cat-fur" d={RIGHT_PATCH} />
      <path ref={rightEyeRef} className={eyeClass} d={RIGHT_EYE} />
      <path className="fill-cat-fur" d={LEFT_EAR} />
      <path className="fill-cat-fur" d={RIGHT_EAR} />
    </svg>
  );
}
