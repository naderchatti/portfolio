import type { ComponentType } from 'react';
import type { Locale } from '@/lib/i18n';
import { SmartUsbKvmDiagram } from './smart-usb-kvm';
import { SpeakersDiagram } from './speakers';
import { StandingDeskDiagram } from './standing-desk';
import { VoiceSatelliteDiagram } from './voice-satellite';

/** `![alt](diagram:<slug>)` targets. Keep in sync with DIAGRAMS in scripts/check-content.mjs. */
export const diagrams = {
  speakers: SpeakersDiagram,
  'standing-desk': StandingDeskDiagram,
  'smart-usb-kvm': SmartUsbKvmDiagram,
  'voice-satellite': VoiceSatelliteDiagram,
} as const satisfies Record<string, ComponentType<{ lang: Locale }>>;

export type DiagramSlug = keyof typeof diagrams;

export function isDiagramSlug(slug: string): slug is DiagramSlug {
  return Object.hasOwn(diagrams, slug);
}
