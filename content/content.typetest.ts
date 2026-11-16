// Compile-time checks only (run by `pnpm typecheck`); nothing here is imported at runtime.
import type { MediaName, VideoName } from './media';
import type { Project } from './projects';
import { t, type Localized } from './types';

export const okName: MediaName = 'desk-esp32-installed';
// @ts-expect-error — unknown media names are rejected
export const badName: MediaName = 'stirling-pdf';
export const okVideo: VideoName = 'pc-rgb-loop';

export const okText: Localized = { en: 'Read', fr: 'Lire' };
// @ts-expect-error — a localized string needs both languages
export const missingFr: Localized = { en: 'Read' };

export const resolved: string = t(okText, 'fr');
// @ts-expect-error — only site locales are accepted
t(okText, 'de');

export const badStatus: Pick<Project, 'status'> = {
  // @ts-expect-error — statuses are a closed set
  status: 'beta',
};
