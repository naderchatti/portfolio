import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { DiagramFrame, type Connection } from './diagram-frame';
import { VoiceSatelliteSvg } from './svg/voice-satellite';

const power = { en: 'power', fr: 'alimentation' };
const ground = { en: 'ground', fr: 'masse' };

const connections: Connection[] = [
  { from: 'ESP32 3V3', to: 'INMP441 VDD', signal: power },
  { from: 'ESP32 GND (J3)', to: 'INMP441 GND', signal: ground },
  { from: 'INMP441 L/R', to: 'INMP441 GND', signal: { en: 'tie low, left channel', fr: 'à la masse, canal gauche' } },
  { from: 'ESP32 GPIO2', to: 'INMP441 SCK', signal: { en: 'mic bit clock', fr: 'horloge bit micro' } },
  { from: 'ESP32 GPIO3', to: 'INMP441 WS', signal: { en: 'mic word select', fr: 'sélection de mot micro' } },
  { from: 'INMP441 SD', to: 'ESP32 GPIO4', signal: { en: 'mic data', fr: 'données micro' }, accent: true },
  { from: 'ESP32 5V', to: 'MAX98357A VIN', signal: power },
  { from: 'ESP32 GND (J1)', to: 'MAX98357A GND', signal: ground },
  { from: 'ESP32 GPIO7', to: 'MAX98357A BCLK', signal: { en: 'amp bit clock', fr: 'horloge bit ampli' } },
  { from: 'ESP32 GPIO6', to: 'MAX98357A LRC', signal: { en: 'amp word select', fr: 'sélection de mot ampli' } },
  { from: 'ESP32 GPIO8', to: 'MAX98357A DIN', signal: { en: 'amp data', fr: 'données ampli' }, accent: true },
  {
    from: 'MAX98357A + / −',
    to: { en: '3 W speaker', fr: 'haut-parleur 3 W' },
    signal: { en: 'speaker', fr: 'haut-parleur' },
  },
];

const copy = {
  title: { en: 'Voice satellite', fr: 'Satellite vocal' },
  subtitle: {
    en: 'ESP32-S3-DevKitC-1 (N8R2) ↔ INMP441 microphone + MAX98357A amplifier · two I2S buses',
    fr: 'ESP32-S3-DevKitC-1 (N8R2) ↔ micro INMP441 + ampli MAX98357A · deux bus I2S',
  },
  label: {
    en: 'Voice satellite wiring: ESP32-S3-DevKitC-1 to an INMP441 microphone (3V3, GND, SCK on GPIO2, WS on GPIO3, SD into GPIO4) and a MAX98357A amplifier (5V, GND, BCLK on GPIO7, LRC on GPIO6, DIN on GPIO8) driving a 3 W speaker. The two data lines are highlighted.',
    fr: 'Câblage du satellite vocal : ESP32-S3-DevKitC-1 vers un micro INMP441 (3V3, GND, SCK sur GPIO2, WS sur GPIO3, SD vers GPIO4) et un ampli MAX98357A (5V, GND, BCLK sur GPIO7, LRC sur GPIO6, DIN sur GPIO8) qui alimente un haut-parleur 3 W. Les deux lignes de données sont mises en avant.',
  },
  note: {
    title: { en: 'Audio path', fr: 'Chemin audio' },
    body: {
      en: 'Mic in on one I2S bus, amp out on the other. GPIO48 is the onboard LED. INMP441 and MAX98357A pin layouts per vendor pinout. Wiring after Amrut Prabhu’s guide (Smart Home Circle).',
      fr: 'Micro en entrée sur un bus I2S, ampli en sortie sur l’autre. GPIO48 est la LED de la carte. Brochages INMP441 et MAX98357A selon le fabricant. Câblage d’après le guide d’Amrut Prabhu (Smart Home Circle).',
    },
  },
} as const;

export function VoiceSatelliteDiagram({ lang }: { lang: Locale }) {
  return (
    <DiagramFrame
      lang={lang}
      slug="voice-satellite"
      title={t(copy.title, lang)}
      subtitle={t(copy.subtitle, lang)}
      drawing={<VoiceSatelliteSvg label={t(copy.label, lang)} />}
      connections={connections}
      note={{ title: t(copy.note.title, lang), body: t(copy.note.body, lang) }}
    />
  );
}
