import { Picture } from '@/components/media/picture';
import { t } from '@/content/types';
import type { Locale } from '@/lib/i18n';
import { DiagramFrame, ScrollBox, diagramStyles as styles, type Connection } from './diagram-frame';
import { SpeakersBackSvg } from './svg/speakers-back';
import { SpeakersFrontSvg } from './svg/speakers-front';

const connections: Connection[] = [
  { from: 'ESP32 5V', to: 'PCM5102A VIN', signal: { en: 'power', fr: 'alimentation' } },
  {
    from: { en: 'ESP32 GND (next to 13)', fr: 'ESP32 GND (à côté de 13)' },
    to: 'PCM5102A GND',
    signal: { en: 'ground', fr: 'masse' },
  },
  {
    from: 'PCM5102A GND',
    to: 'PCM5102A SCK',
    signal: { en: 'tie low (internal clock)', fr: 'à la masse (horloge interne)' },
  },
  { from: 'ESP32 GPIO26', to: 'PCM5102A BCK', signal: { en: 'I2S bit clock', fr: 'horloge bit I2S' } },
  { from: 'ESP32 GPIO25', to: 'PCM5102A LCK', signal: { en: 'I2S word select', fr: 'sélection de mot I2S' } },
  { from: 'ESP32 GPIO22', to: 'PCM5102A DIN', signal: { en: 'I2S data', fr: 'données I2S' }, accent: true },
  {
    from: { en: 'PCM5102A line out', fr: 'PCM5102A sortie ligne' },
    to: { en: 'Mackie CR3 RCA in', fr: 'Mackie CR3 entrée RCA' },
    signal: { en: 'analog audio', fr: 'audio analogique' },
  },
];

const copy = {
  title: { en: 'Speakers', fr: 'Enceintes' },
  subtitle: 'ESP32-WROVER DevKitC → GY-PCM5102 (PCM5102A) → Mackie CR3 · I2S',
  front: {
    en: 'Speakers wiring: ESP32-WROVER DevKitC to GY-PCM5102 DAC. 5V to VIN, GND to GND, GPIO26 to BCK, GPIO25 to LCK, GPIO22 to DIN (highlighted), and SCK tied to GND on the DAC.',
    fr: 'Câblage des enceintes : ESP32-WROVER DevKitC vers le DAC GY-PCM5102. 5V vers VIN, GND vers GND, GPIO26 vers BCK, GPIO25 vers LCK, GPIO22 vers DIN (mis en avant), et SCK relié à GND sur le DAC.',
  },
  step: {
    en: 'STEP 2 — Configure the back-side jumpers (required — no sound without this)',
    fr: 'ÉTAPE 2 — Configurer les ponts au dos (obligatoire — sans ça, aucun son)',
  },
  back: {
    en: 'Back view of the GY-PCM5102 with the header on the right and four jumpers in a 2×2 grid: H2L and H1L on top, H4L and H3L below. H1L (FLT), H2L (DEMP) and H4L (FMT) are bridged centre + right pad, L (low). H3L (XSMT) is bridged centre + left pad, H (high).',
    fr: 'Vue de dos du GY-PCM5102, connecteur à droite, quatre ponts en grille 2×2 : H2L et H1L en haut, H4L et H3L en bas. H1L (FLT), H2L (DEMP) et H4L (FMT) sont pontés pad central + pad droit, L (bas). H3L (XSMT) est ponté pad central + pad gauche, H (haut).',
  },
  photo: {
    en: 'My board after the fix — header on the right.',
    fr: 'Ma carte après la correction — connecteur à droite.',
  },
} as const;

function Callout({ lang }: { lang: Locale }) {
  if (lang === 'fr') {
    return (
      <p className={styles.callout}>
        Configurez par fonction, pas par « gauche/droite » : <b>FLT = L</b>, <b>DEMP = L</b>,{' '}
        <b className={styles.accent}>XSMT = H (son actif)</b>, <b>FMT = L (I2S)</b>. Les consignes qui disent
        « gauche » ou « droite » dépendent du sens dans lequel on tient la carte — je les ai suivies en miroir et
        j’ai obtenu le silence sur deux DAC.
      </p>
    );
  }
  return (
    <p className={styles.callout}>
      Configure by function, not by ‘left/right’: <b>FLT = L</b>, <b>DEMP = L</b>,{' '}
      <b className={styles.accent}>XSMT = H (unmute)</b>, <b>FMT = L (I2S)</b>. Instructions that say ‘left’ or
      ‘right’ depend on how you hold the board — I followed them mirrored and got silence on two DACs.
    </p>
  );
}

export function SpeakersDiagram({ lang }: { lang: Locale }) {
  const title = t(copy.title, lang);
  return (
    <DiagramFrame
      lang={lang}
      slug="speakers"
      title={title}
      subtitle={copy.subtitle}
      drawing={<SpeakersFrontSvg label={t(copy.front, lang)} />}
      connections={connections}
    >
      <div className="mt-4 flex flex-col gap-4">
        <p className={styles.step}>{t(copy.step, lang)}</p>
        <ScrollBox label={t(copy.step, lang)} className="max-w-[640px]">
          <SpeakersBackSvg label={t(copy.back, lang)} />
        </ScrollBox>
        <figure className="m-0 max-w-[440px]">
          <Picture
            image="speakers-dac-pads"
            lang={lang}
            fit="contain"
            sizes="(min-width: 640px) 440px, 100vw"
            className="aspect-[4/3] rounded-card border bg-secondary"
          />
          <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{t(copy.photo, lang)}</figcaption>
        </figure>
        <Callout lang={lang} />
      </div>
    </DiagramFrame>
  );
}
