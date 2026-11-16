import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { DiagramFrame, type Connection } from './diagram-frame';
import { StandingDeskSvg } from './svg/standing-desk';

const connections: Connection[] = [
  { from: { en: 'RJ12 pin 2', fr: 'RJ12 broche 2' }, to: 'ESP32 GND', signal: { en: 'ground', fr: 'masse' } },
  {
    from: { en: 'RJ12 pin 3 (handset TX)', fr: 'RJ12 broche 3 (TX combiné)' },
    to: 'ESP32 GPIO44 (RX)',
    signal: { en: 'UART, desk → ESP', fr: 'UART, bureau → ESP' },
    accent: true,
  },
  {
    from: 'ESP32 GPIO43 (TX)',
    to: { en: 'RJ12 pin 5 (handset RX)', fr: 'RJ12 broche 5 (RX combiné)' },
    signal: { en: 'UART, ESP → desk', fr: 'UART, ESP → bureau' },
    accent: true,
  },
  {
    from: { en: 'RJ12 pin 4', fr: 'RJ12 broche 4' },
    to: 'ESP32 5V',
    signal: { en: 'power from the desk', fr: 'alimentation par le bureau' },
  },
  { from: { en: 'RJ12 pins 1, 6', fr: 'RJ12 broches 1, 6' }, to: '—', signal: { en: 'unused', fr: 'non utilisées' } },
];

const copy = {
  title: { en: 'Standing desk', fr: 'Bureau assis-debout' },
  subtitle: {
    en: 'ESP32-S3-Zero ↔ Maidesite RJ12 handset port · UART 9600 baud · powered from the desk',
    fr: 'ESP32-S3-Zero ↔ port combiné RJ12 Maidesite · UART 9600 bauds · alimenté par le bureau',
  },
  label: {
    en: 'Desk wiring: ESP32-S3-Zero to the Maidesite RJ12 handset port. RJ12 pin 2 to GND, pin 3 (handset TX) to GPIO44 RX, GPIO43 TX to pin 5 (handset RX), pin 4 5V to the ESP32 5V. Pins 1 and 6 unused.',
    fr: 'Câblage du bureau : ESP32-S3-Zero vers le port combiné RJ12 Maidesite. Broche 2 vers GND, broche 3 (TX combiné) vers GPIO44 RX, GPIO43 TX vers la broche 5 (RX combiné), broche 4 5V vers le 5V de l’ESP32. Broches 1 et 6 non utilisées.',
  },
  note: {
    title: { en: 'UART · 9600 baud', fr: 'UART · 9600 bauds' },
    body: {
      en: 'Shades66 recommends a 1.5k/3k divider on RX; it worked without it on the S3-Zero (as in lukas-berger’s post #22). RJ12 contact layout per vendor pinout.',
      fr: 'Shades66 recommande un pont diviseur 1,5k/3k sur RX ; ça a fonctionné sans sur le S3-Zero (comme dans le message #22 de lukas-berger). Disposition des contacts RJ12 selon le brochage du fabricant.',
    },
  },
} as const;

export function StandingDeskDiagram({ lang }: { lang: Locale }) {
  return (
    <DiagramFrame
      lang={lang}
      slug="standing-desk"
      title={t(copy.title, lang)}
      subtitle={t(copy.subtitle, lang)}
      drawing={<StandingDeskSvg label={t(copy.label, lang)} />}
      connections={connections}
      note={{ title: t(copy.note.title, lang), body: t(copy.note.body, lang) }}
    />
  );
}
