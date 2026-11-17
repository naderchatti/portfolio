'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import type { LightboxItem } from '@/components/media/zoomable';
import { cn } from '@/lib/utils';

export type LightboxStrings = {
  dialog: string;
  close: string;
  previous: string;
  next: string;
  /** Template with `{index}` and `{total}`. */
  position: string;
};

type State = { items: LightboxItem[]; index: number };

const SWIPE_THRESHOLD = 50;

function isVisible(element: HTMLElement): boolean {
  return element.getClientRects().length > 0;
}

function parseItem(element: HTMLElement): LightboxItem | null {
  try {
    return JSON.parse(element.dataset.lightboxItem ?? '') as LightboxItem;
  } catch {
    return null;
  }
}

/**
 * Site-wide image previewer. Any `[data-lightbox]` button (see `Zoomable`) opens it; images sharing the
 * same `data-lightbox` group and currently rendered (light/dark duplicates are skipped) are browsable
 * with the arrow keys, the on-screen buttons or a horizontal swipe. Radix Dialog provides the focus
 * trap, Escape and the scroll lock; focus returns to the trigger on close.
 */
export function Lightbox({ strings }: { strings: LightboxStrings }) {
  const [state, setState] = useState<State | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  /** The button that opened the viewer; focus returns to it on close. */
  const trigger = useRef<HTMLElement | null>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-lightbox]') : null;
      if (!target) return;
      const group = target.dataset.lightbox ?? '';
      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-lightbox]')).filter(
        (element) => element.dataset.lightbox === group && (element === target || isVisible(element)),
      );
      const entries = elements
        .map((element) => ({ element, item: parseItem(element) }))
        .filter((entry): entry is { element: HTMLElement; item: LightboxItem } => entry.item !== null);
      const index = entries.findIndex((entry) => entry.element === target);
      if (index === -1) return;
      event.preventDefault();
      trigger.current = target;
      setState({ items: entries.map((entry) => entry.item), index });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const total = state?.items.length ?? 0;
  const go = useCallback(
    (delta: number) =>
      setState((current) =>
        current && current.items.length > 1
          ? { ...current, index: (current.index + delta + current.items.length) % current.items.length }
          : current,
      ),
    [],
  );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  const item = state ? state.items[state.index] : undefined;
  const counter = state ? `${state.index + 1} / ${total}` : '';
  const position = state
    ? strings.position.replace('{index}', String(state.index + 1)).replace('{total}', String(total))
    : '';
  const navButton =
    'absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-secondary max-sm:top-auto max-sm:bottom-4 max-sm:translate-y-0';

  return (
    <DialogPrimitive.Root
      open={state !== null}
      onOpenChange={(open) => {
        if (!open) setState(null);
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/[0.97] backdrop-blur-md motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-label={strings.dialog}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={(event) => {
            // A click on the empty backdrop around the image closes the viewer.
            const target = event.target as Element;
            if (target === event.currentTarget || target.matches('figure, picture')) setState(null);
          }}
          ref={content}
          tabIndex={-1}
          onOpenAutoFocus={(event) => {
            // Focus the viewer itself so arrow keys work without a focus ring on a control.
            event.preventDefault();
            content.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            const element = trigger.current;
            if (element?.isConnected) {
              event.preventDefault();
              element.focus();
            }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 px-4 pt-16 pb-6 outline-none sm:px-20 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">{item?.caption ?? item?.alt ?? strings.dialog}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{position}</DialogPrimitive.Description>

          {item ? (
            <figure className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-3">
              <picture key={item.src} className="flex min-h-0 w-full flex-1 items-center justify-center">
                <source type="image/avif" srcSet={item.avif} sizes="100vw" />
                <source type="image/webp" srcSet={item.webp} sizes="100vw" />
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  decoding="async"
                  className="block h-auto max-h-full w-auto max-w-full rounded-card border bg-muted object-contain"
                  style={{ maxHeight: 'calc(100dvh - 9rem)' }}
                />
              </picture>
              <figcaption className="flex max-w-[720px] flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center font-mono text-xs text-muted-foreground max-sm:pb-14">
                {total > 1 ? (
                  <span aria-hidden="true" className="font-medium text-foreground tabular-nums">
                    {counter}
                  </span>
                ) : null}
                {item.caption ? <span>{item.caption}</span> : null}
              </figcaption>
            </figure>
          ) : null}

          {total > 1 ? (
            <>
              <button type="button" onClick={() => go(-1)} aria-label={strings.previous} className={cn(navButton, 'left-4')}>
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={strings.next} className={cn(navButton, 'right-4')}>
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </>
          ) : null}

          <DialogPrimitive.Close
            aria-label={strings.close}
            className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full border bg-background/85 text-foreground backdrop-blur transition-colors hover:bg-secondary"
          >
            <XIcon aria-hidden="true" className="size-5" />
          </DialogPrimitive.Close>
          <p aria-live="polite" className="sr-only">
            {position}
          </p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
