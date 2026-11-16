import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { DiagramFrame, type Connection } from './diagram-frame';
import { SmartUsbKvmSvg } from './svg/smart-usb-kvm';

const connections: Connection[] = [
  {
    from: 'ESP32 GPIO4',
    to: { en: 'select-button pad', fr: 'pad du bouton de sélection' },
    signal: { en: 'pulled LOW 100 ms = press', fr: 'tiré à LOW 100 ms = appui' },
    accent: true,
  },
  {
    from: { en: 'profile-1 LED pad', fr: 'pad LED profil 1' },
    to: 'ESP32 GPIO1 (ADC)',
    signal: { en: 'LED level', fr: 'niveau de la LED' },
  },
  {
    from: { en: 'profile-2 LED pad', fr: 'pad LED profil 2' },
    to: 'ESP32 GPIO2 (ADC)',
    signal: { en: 'LED level', fr: 'niveau de la LED' },
  },
  {
    from: { en: 'switch USB 5V', fr: 'USB 5V du switch' },
    to: 'ESP32 5V',
    signal: { en: 'power', fr: 'alimentation' },
  },
  { from: 'GND', to: 'GND', signal: { en: 'common ground', fr: 'masse commune' } },
];

const copy = {
  title: { en: 'Smart USB KVM', fr: 'KVM USB connecté' },
  subtitle: {
    en: 'ESP32-S3-Zero ↔ UGREEN 30768 USB switch PCB · button pulse + LED sensing over ADC',
    fr: 'ESP32-S3-Zero ↔ PCB du switch USB UGREEN 30768 · impulsion bouton + lecture des LED par ADC',
  },
  label: {
    en: 'Smart USB KVM wiring: ESP32-S3-Zero to the UGREEN 30768 switch PCB. 5V to USB 5V, GND to GND, GPIO1 and GPIO2 read the two profile LEDs, GPIO4 drives the select button (highlighted).',
    fr: 'Câblage du KVM USB : ESP32-S3-Zero vers le PCB du switch UGREEN 30768. 5V vers l’USB 5V, GND vers GND, GPIO1 et GPIO2 lisent les deux LED de profil, GPIO4 pilote le bouton de sélection (mis en avant).',
  },
  note: {
    title: { en: 'Reading the LEDs', fr: 'Lire les LED' },
    body: {
      en: 'LED > 0.7 V and the other < 0.3 V = active profile. GPIO4 pulled LOW for 100 ms = press, floating when idle. PCB drawn as a simplified block.',
      fr: 'LED > 0,7 V et l’autre < 0,3 V = profil actif. GPIO4 tiré à LOW 100 ms = appui, flottant au repos. PCB dessiné en bloc simplifié.',
    },
  },
} as const;

export function SmartUsbKvmDiagram({ lang }: { lang: Locale }) {
  return (
    <DiagramFrame
      lang={lang}
      slug="smart-usb-kvm"
      title={t(copy.title, lang)}
      subtitle={t(copy.subtitle, lang)}
      drawing={<SmartUsbKvmSvg label={t(copy.label, lang)} />}
      connections={connections}
      note={{ title: t(copy.note.title, lang), body: t(copy.note.body, lang) }}
    />
  );
}
