import type { MediaName, VideoName } from './media';
import type { Localized, Text } from './types';

/** `href` starting with `/` is locale-relative: prefix it with `/${lang}`. */
export type UsesLink = { label: Localized; href: string; external?: boolean };

export type UsesItem = { label: Localized; value: Text; link?: UsesLink };

export type UsesFigure = { image: MediaName; caption: Localized; index?: string };

export type UsesSection = {
  id: string;
  title: Localized;
  items: readonly UsesItem[];
  figures?: readonly UsesFigure[];
  /** Build gallery: numbered thumbnails that open in the lightbox as one group. */
  gallery?: readonly UsesFigure[];
  video?: { name: VideoName; fallback: MediaName; label: Localized; caption: Localized };
};

export const usesIntro = {
  title: { en: 'Uses', fr: 'Setup' },
  lead: {
    en: 'The hardware and software I build, game and stream with.',
    fr: 'Le matériel et les logiciels avec lesquels je développe, je joue et je streame.',
  },
  figures: [
    { image: 'desk-cat', caption: { en: 'The real operator.', fr: 'Le vrai opérateur.' } },
    {
      image: 'cat-on-pc',
      caption: {
        en: 'The other operator. Keeps the 360 mm radiator warm.',
        fr: 'L’autre opérateur. Garde le radiateur de 360 mm au chaud.',
      },
    },
  ],
  home: {
    lead: {
      en: 'Servers, storage, smart-home hardware and the rack.',
      fr: 'Serveurs, stockage, domotique et le rack.',
    },
    link: { en: 'The homelab lives in ~/lab →', fr: 'Le homelab vit dans ~/lab →' },
  },
} as const satisfies {
  title: Localized;
  lead: Localized;
  figures: readonly UsesFigure[];
  home: { lead: Localized; link: Localized };
};

export const usesSections: readonly UsesSection[] = [
  {
    id: 'workstation',
    title: { en: 'Gaming & streaming PC', fr: 'PC gaming et streaming' },
    items: [
      { label: { en: 'Case', fr: 'Boîtier' }, value: 'ASUS ROG Hyperion GR701' },
      { label: { en: 'Motherboard', fr: 'Carte mère' }, value: 'ROG Strix Z790-E Gaming WiFi' },
      { label: { en: 'CPU', fr: 'Processeur' }, value: 'Intel Core i7-13700K' },
      { label: { en: 'GPU', fr: 'Carte graphique' }, value: 'ROG Strix GeForce RTX 4080' },
      {
        label: { en: 'RAM', fr: 'Mémoire' },
        value: {
          en: 'G.Skill Trident Z5 RGB DDR5, 32 GB (2×16), 6400 MT/s',
          fr: 'G.Skill Trident Z5 RGB DDR5, 32 Go (2×16), 6400 MT/s',
        },
      },
      {
        label: { en: 'Storage', fr: 'Stockage' },
        value: { en: '2× Samsung 990 Pro 2 TB NVMe (PCIe 4.0)', fr: '2× Samsung 990 Pro 2 To NVMe (PCIe 4.0)' },
      },
      { label: { en: 'Cooling', fr: 'Refroidissement' }, value: 'ROG Ryujin III 360 ARGB' },
      { label: { en: 'PSU', fr: 'Alimentation' }, value: 'ROG Thor 1000W Platinum II' },
      {
        label: { en: 'Extras', fr: 'Extras' },
        value: {
          en: 'Lian Li Strimer Plus V2 cables, ROG Herculx GPU holder',
          fr: 'Câbles Lian Li Strimer Plus V2, support de GPU ROG Herculx',
        },
      },
    ],
    video: {
      name: 'pc-rgb-loop',
      fallback: 'pc-rgb',
      label: {
        en: 'Short loop of the finished PC with white and blue RGB lighting',
        fr: 'Courte boucle du PC terminé, éclairé en RGB blanc et bleu',
      },
      caption: { en: 'Lights on', fr: 'Lumières allumées' },
    },
    gallery: [
      { index: '01', image: 'pc-gallery-flatlay', caption: { en: 'Parts', fr: 'Pièces' } },
      { index: '02', image: 'pc-gallery-case', caption: { en: 'Case', fr: 'Boîtier' } },
      { index: '03', image: 'pc-gallery-motherboard', caption: { en: 'Motherboard', fr: 'Carte mère' } },
      { index: '04', image: 'pc-gallery-cpu', caption: { en: 'CPU', fr: 'Processeur' } },
      { index: '05', image: 'pc-gallery-ram', caption: { en: 'RAM', fr: 'Mémoire' } },
      { index: '06', image: 'pc-gallery-ssd', caption: { en: 'Storage', fr: 'Stockage' } },
      { index: '07', image: 'pc-gallery-gpu', caption: { en: 'GPU', fr: 'Carte graphique' } },
      { index: '08', image: 'pc-gallery-lights-on', caption: { en: 'Lights on', fr: 'Lumières allumées' } },
    ],
  },
  {
    id: 'desk',
    title: { en: 'Desk & peripherals', fr: 'Bureau et périphériques' },
    items: [
      {
        label: { en: 'Desk', fr: 'Bureau' },
        value: { en: 'Maidesite standing desk', fr: 'Bureau assis-debout Maidesite' },
        link: {
          label: { en: 'made smart with an ESP32 →', fr: 'rendu connecté avec un ESP32 →' },
          href: '/log/standing-desk-over-wifi/',
        },
      },
      {
        label: { en: 'Monitors', fr: 'Écrans' },
        value: {
          en: '2× ASUS TUF Gaming VG24VQ1B — 24″ curved, 1080p, 165 Hz (one vertical, one landscape, on arms)',
          fr: '2× ASUS TUF Gaming VG24VQ1B — 24″ incurvés, 1080p, 165 Hz (un vertical, un paysage, sur bras)',
        },
      },
      {
        label: { en: 'Switching', fr: 'Commutation' },
        value: { en: 'Smart USB KVM', fr: 'KVM USB connecté' },
        link: { label: { en: 'in the lab →', fr: 'dans le lab →' }, href: '/lab/' },
      },
      { label: { en: 'Keyboard', fr: 'Clavier' }, value: 'Logitech G915 TKL Lightspeed' },
      { label: { en: 'Mouse', fr: 'Souris' }, value: 'Logitech G502 Lightspeed' },
      { label: { en: 'Headset', fr: 'Casque' }, value: 'Astro A50' },
    ],
    figures: [{ image: 'keyboard', caption: { en: 'Logitech G915 TKL', fr: 'Logitech G915 TKL' } }],
  },
  {
    id: 'stream',
    title: { en: 'Streaming', fr: 'Streaming' },
    items: [
      {
        label: { en: 'Camera', fr: 'Caméra' },
        value: { en: 'Canon EOS 70D as webcam', fr: 'Canon EOS 70D en webcam' },
      },
      { label: { en: 'Microphone', fr: 'Micro' }, value: 'Beacn Mic' },
      { label: { en: 'Light', fr: 'Éclairage' }, value: 'Elgato Key Light Mini' },
      {
        label: { en: 'Control', fr: 'Contrôle' },
        value: { en: 'Elgato Stream Deck app on an iPad', fr: 'Appli Elgato Stream Deck sur un iPad' },
      },
      {
        label: { en: 'Overlays', fr: 'Overlays' },
        value: {
          en: 'OBS overlays via Streamer.bot (chat, multichat, ad timer), adapted from nuttylmao’s open-source projects — my own versions are on the to-do list.',
          fr: 'Overlays OBS via Streamer.bot (chat, multichat, minuteur de pubs), adaptés des projets open source de nuttylmao — mes propres versions sont prévues.',
        },
      },
      {
        label: { en: 'Channel', fr: 'Chaîne' },
        value: '',
        link: {
          label: { en: 'twitch.tv/naderolli', fr: 'twitch.tv/naderolli' },
          href: 'https://www.twitch.tv/naderolli/',
          external: true,
        },
      },
    ],
  },
  {
    id: 'dev',
    title: { en: 'Dev laptop & software', fr: 'Portable de dev et logiciels' },
    items: [
      { label: { en: 'Laptop', fr: 'Portable' }, value: 'ASUS ROG Zephyrus G14 (GA401QM)' },
      { label: { en: 'CPU / GPU', fr: 'CPU / GPU' }, value: 'AMD Ryzen 9 5900HS · RTX 3060 Laptop GPU' },
      { label: { en: 'Memory', fr: 'Mémoire' }, value: { en: '32 GB RAM', fr: '32 Go de RAM' } },
      { label: { en: 'OS', fr: 'OS' }, value: 'Omarchy (Arch + Hyprland)' },
      { label: { en: 'Editor', fr: 'Éditeur' }, value: 'Zed' },
      { label: { en: 'Terminal', fr: 'Terminal' }, value: 'Kitty' },
      { label: { en: 'AI coding', fr: 'Code avec l’IA' }, value: 'Claude Code, Codex (CLI)' },
      { label: { en: 'Tools', fr: 'Outils' }, value: 'Docker, pnpm, gh CLI' },
    ],
    figures: [
      { image: 'laptop-open', caption: { en: 'Zephyrus G14 · Omarchy', fr: 'Zephyrus G14 · Omarchy' } },
      { image: 'laptop-lid', caption: { en: 'AniMe Matrix lid', fr: 'Capot AniMe Matrix' } },
    ],
  },
];
