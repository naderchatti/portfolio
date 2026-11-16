import type { MediaName } from './media';
import type { Localized, Text } from './types';

export const labIntro = {
  title: { en: 'The lab', fr: 'Le lab' },
  /** Lead on the /lab page. */
  lead: {
    en: 'The infrastructure I run at home, and the hardware builds around it.',
    fr: 'L’infrastructure que je fais tourner chez moi, et les montages matériels autour.',
  },
  /** Lead on the home-page lab section. */
  homeLead: {
    en: 'I run my own infrastructure at home and write about the builds.',
    fr: 'J’héberge ma propre infrastructure à la maison et je raconte les montages.',
  },
  /** One-line summary under the home-page lab title. */
  summaryLine: {
    en: '14 LXC · 104 devices · 1,942 entities · 23 audio players',
    fr: '14 LXC · 104 appareils · 1 942 entités · 23 lecteurs audio',
  },
  hero: {
    image: 'desk-setup',
    caption: { en: '~/lab — where it all runs from', fr: '~/lab — d’où tout tourne' },
  },
} as const satisfies {
  title: Localized;
  lead: Localized;
  homeLead: Localized;
  summaryLine: Localized;
  hero: { image: MediaName; caption: Localized };
};

export type LabNode = {
  id: string;
  name: Localized;
  hardware: Localized;
  status: 'up' | 'down';
  image?: { name: MediaName; caption: Localized };
};

export const nodes: readonly LabNode[] = [
  {
    id: 'node/01',
    name: { en: 'Edge gateway', fr: 'Passerelle' },
    hardware: {
      en: 'Raspberry Pi 4B 8 GB: Home Assistant, Traefik v3.7, Pi-hole, Tailscale, snapclient',
      fr: 'Raspberry Pi 4B 8 Go : Home Assistant, Traefik v3.7, Pi-hole, Tailscale, snapclient',
    },
    status: 'up',
  },
  {
    id: 'node/02',
    name: { en: 'Hypervisor', fr: 'Hyperviseur' },
    hardware: {
      en: 'Proxmox VE 8.2 on a recycled laptop, an ASUS VivoBook S14 (i7-8550U, 16 GB): 14 LXC, weekly backups to the NAS',
      fr: 'Proxmox VE 8.2 sur un portable recyclé, un ASUS VivoBook S14 (i7-8550U, 16 Go) : 14 LXC, sauvegardes hebdomadaires vers le NAS',
    },
    status: 'up',
  },
  {
    id: 'node/03',
    name: { en: 'Storage', fr: 'Stockage' },
    hardware: {
      en: 'TrueNAS SCALE on a Lenovo IdeaCentre H530 (i7-4790) + TerraMaster 4-bay over USB: 4× 4 TB IronWolf, RAIDZ1',
      fr: 'TrueNAS SCALE sur un Lenovo IdeaCentre H530 (i7-4790) + baie TerraMaster 4 disques en USB : 4× IronWolf 4 To, RAIDZ1',
    },
    status: 'up',
    image: {
      name: 'storage-bay',
      caption: { en: '4× 4 TB IronWolf, RAIDZ1', fr: '4× IronWolf 4 To, RAIDZ1' },
    },
  },
  {
    id: 'node/04',
    name: { en: 'Dev runtime', fr: 'Runtime de dev' },
    hardware: {
      en: 'ASUS laptop (i5, 8 GB): Postgres/pgvector, Temporal, S3 (Garage), BuildKit',
      fr: 'Portable ASUS (i5, 8 Go) : Postgres/pgvector, Temporal, S3 (Garage), BuildKit',
    },
    status: 'up',
  },
];

export const nodesFootnote: Localized = {
  en: '+ a second Pi 4B, TP-Link 8-port switch — all in a rack I built from an old cabinet.',
  fr: '+ un second Pi 4B, un switch TP-Link 8 ports — le tout dans un rack fabriqué à partir d’un vieux meuble.',
};

export type LabStat = { value: Text; label: Localized };

/** Read from Home Assistant's registries, not from memory. */
export const haStats: readonly LabStat[] = [
  { value: '104', label: { en: 'devices', fr: 'appareils' } },
  { value: { en: '1,942', fr: '1 942' }, label: { en: 'entities', fr: 'entités' } },
  { value: '65', label: { en: 'integrations', fr: 'intégrations' } },
  { value: '27', label: { en: 'automations', fr: 'automatisations' } },
  { value: '23', label: { en: 'audio players', fr: 'lecteurs audio' } },
];

export type LabTile = {
  slug: string;
  title: Localized;
  summary: Localized;
  /** Extra paragraph under the summary. */
  note?: Localized;
  bullets?: readonly Localized[];
  stack: readonly string[];
  /** Attribution line (my code vs patched forks). */
  credit?: Localized;
  media?: { main: MediaName; thumbs?: readonly MediaName[]; caption?: Localized };
  /** Log post slug for “Read in the log →”. */
  post?: string;
  /** Secondary log link (label + post slug). */
  secondaryPost?: { label: Localized; slug: string };
  /** Shown as a large card in the home-page “Featured builds” row. */
  featured?: { summary: Localized; tags: readonly string[] };
  /** Shown in the home-page compact list with this meta line. */
  compact?: { title: Localized; meta: Localized };
};

export const tiles: readonly LabTile[] = [
  {
    slug: 'standing-desk',
    title: { en: 'Standing desk over Wi-Fi', fr: 'Bureau assis-debout en Wi-Fi' },
    summary: {
      en: 'Wired an ESP32-S3 into the desk’s RJ12 control bus, following the community’s guide: height, M1–M4 presets and a slider in Home Assistant.',
      fr: 'Un ESP32-S3 câblé sur le bus de commande RJ12 du bureau, en suivant le guide de la communauté : hauteur, positions M1–M4 et un curseur dans Home Assistant.',
    },
    stack: ['ESPHome', 'UART', 'C++ lambdas'],
    media: {
      main: 'desk-esp32-installed',
      thumbs: ['desk-esp32-sealed', 'desk-esp32-board', 'desk-ha-controls'],
      caption: {
        en: 'Installed under the desk · sealed board · wiring · HA controls',
        fr: 'Installé sous le bureau · carte scellée · câblage · commandes HA',
      },
    },
    post: 'standing-desk-over-wifi',
    featured: {
      summary: {
        en: 'Wired an ESP32-S3 into the desk’s RJ12 control bus.',
        fr: 'Un ESP32-S3 câblé sur le bus de commande RJ12 du bureau.',
      },
      tags: ['ESPHome', 'UART'],
    },
  },
  {
    slug: 'rack',
    title: { en: 'The rack', fr: 'Le rack' },
    summary: {
      en: 'Spray-painted a cabinet into a quiet home rack: switch, Proxmox laptops, NAS and mini PC.',
      fr: 'Un meuble repeint à la bombe devenu un rack silencieux : switch, portables Proxmox, NAS et mini PC.',
    },
    stack: ['DIY', 'cable management'],
    media: {
      main: 'rack-night',
      thumbs: ['rack-paint'],
      caption: { en: 'Before and after', fr: 'Avant, après' },
    },
    post: 'homelab-one-lxc-per-service',
    compact: {
      title: { en: 'The rack', fr: 'Le rack' },
      meta: { en: 'painted cabinet', fr: 'meuble repeint' },
    },
  },
  {
    slug: 'smart-usb-kvm',
    title: { en: 'Smart USB KVM', fr: 'KVM USB connecté' },
    summary: {
      en: 'Modded a USB switch: soldered an ESP32-S3 to its button and status LEDs; ESPHome pulses the button and reads the LEDs over ADC, so Home Assistant knows and switches the active PC.',
      fr: 'Un switch USB modifié : un ESP32-S3 soudé sur son bouton et ses LED d’état ; ESPHome actionne le bouton et lit les LED via l’ADC, pour que Home Assistant sache quel PC est actif, et en change.',
    },
    stack: ['ESPHome', 'ADC', 'Home Assistant', 'soldering'],
    media: {
      main: 'kvm-pcb-mod',
      thumbs: ['kvm-under-desk'],
      caption: {
        en: 'Button and LED pads tapped · mounted under the desk',
        fr: 'Pads du bouton et des LED repiqués · fixé sous le bureau',
      },
    },
    post: 'smart-usb-kvm',
    featured: {
      summary: {
        en: 'An ESP32 presses the button and reads the LEDs.',
        fr: 'Un ESP32 appuie sur le bouton et lit les LED.',
      },
      tags: ['ESPHome', 'ADC', 'Home Assistant'],
    },
  },
  {
    slug: 'living-room-tv',
    title: { en: 'Living-room TV, rebuilt', fr: 'La télé du salon, refaite' },
    summary: {
      en: 'Turned a stock TCL Google TV into a custom Ambilight setup: debloated over ADB, replaced the home screen with my own Compose launcher, and patched the open-source grabber and Jellyfin client so every source drives the LEDs.',
      fr: 'Une TCL Google TV d’origine transformée en installation Ambilight sur mesure : allégée via ADB, écran d’accueil remplacé par mon propre launcher Compose, et le grabber open source et le client Jellyfin patchés pour que chaque source pilote les LED.',
    },
    bullets: [
      {
        en: 'Custom Jetpack Compose launcher: animated ribbon background capped at 60 fps, pinned apps, HDMI tile, lights panel',
        fr: 'Launcher Jetpack Compose sur mesure : fond animé en ruban plafonné à 60 fps, applis épinglées, tuile HDMI, panneau des lumières',
      },
      {
        en: 'Accessibility service catches TCL’s Settings key to open a custom quick panel',
        fr: 'Un service d’accessibilité intercepte la touche Paramètres de TCL pour ouvrir un panneau rapide maison',
      },
      {
        en: '25 bloat packages disabled reversibly, with restore scripts',
        fr: '25 paquets superflus désactivés de façon réversible, avec scripts de restauration',
      },
      {
        en: 'Jellyfin build swaps SurfaceView for TextureView so playback is capturable',
        fr: 'Un build de Jellyfin remplace SurfaceView par TextureView pour que la lecture soit capturable',
      },
      {
        en: 'Self-healing daemon handles TV-off, DRM black frames and HDMI source switches (211 LEDs, Hyperion → WLED)',
        fr: 'Un démon auto-réparateur gère la télé éteinte, les images noires dues aux DRM et les changements de source HDMI (211 LED, Hyperion → WLED)',
      },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Android TV', 'ADB', 'Hyperion', 'WLED', 'Home Assistant', 'Docker'],
    credit: {
      en: 'launcher & stack: my code · grabber & Jellyfin: patched forks',
      fr: 'launcher et stack : mon code · grabber et Jellyfin : forks patchés',
    },
    media: {
      main: 'tv-launcher',
      thumbs: ['ambilight-abstract', 'ambilight-game'],
      caption: {
        en: 'My launcher on the TCL Google TV · Ambilight',
        fr: 'Mon launcher sur la TCL Google TV · Ambilight',
      },
    },
    post: 'living-room-tv-rebuilt',
    secondaryPost: { label: { en: 'Launcher', fr: 'Launcher' }, slug: 'custom-google-tv-launcher' },
    featured: {
      summary: {
        en: 'Own launcher, patched grabber and Jellyfin, 211 LEDs.',
        fr: 'Launcher maison, grabber et Jellyfin patchés, 211 LED.',
      },
      tags: ['Kotlin', 'Compose', 'Hyperion'],
    },
  },
  {
    slug: 'voice-satellite',
    title: { en: 'DIY voice satellite', fr: 'Satellite vocal fait maison' },
    summary: {
      en: 'ESP32-S3, I2S mic and amp, on-device wake word.',
      fr: 'ESP32-S3, micro et ampli I2S, mot d’activation détecté sur l’appareil.',
    },
    stack: ['ESPHome', 'microWakeWord'],
    media: { main: 'voice-satellite-build', thumbs: ['voice-satellite-mic', 'voice-satellite-amp'] },
    post: 'bilingual-voice-assistant',
    compact: {
      title: { en: 'DIY voice satellite', fr: 'Satellite vocal fait maison' },
      meta: { en: 'ESP32-S3, wake word', fr: 'ESP32-S3, mot d’activation' },
    },
  },
  {
    slug: 'home-assistant-hub',
    title: { en: 'Home Assistant hub', fr: 'Le hub Home Assistant' },
    summary: {
      en: '104 devices, 1,942 entities, 27 automations, Zigbee via ZHA, and the dashboards that run the flat.',
      fr: '104 appareils, 1 942 entités, 27 automatisations, du Zigbee via ZHA, et les tableaux de bord qui font tourner l’appartement.',
    },
    note: {
      en: 'Dumb wall switches made smart with Sonoff ZBMINIL2 Zigbee modules.',
      fr: 'Des interrupteurs muraux ordinaires rendus connectés avec des modules Zigbee Sonoff ZBMINIL2.',
    },
    stack: ['Home Assistant', 'ZHA', 'ZBMINIL2', 'Frigate'],
    post: 'home-assistant-hub',
    compact: {
      title: { en: 'Home Assistant hub', fr: 'Le hub Home Assistant' },
      meta: { en: '104 devices · 27 automations', fr: '104 appareils · 27 automatisations' },
    },
  },
  {
    slug: 'bilingual-voice-assistant',
    title: { en: 'Bilingual voice assistant', fr: 'Assistant vocal bilingue' },
    summary: {
      en: 'French and English Assist pipelines, local speech-to-text and voices, LLM agent.',
      fr: 'Pipelines Assist en français et en anglais, reconnaissance et synthèse vocales locales, agent LLM.',
    },
    stack: ['Wyoming', 'faster-whisper', 'Piper'],
    post: 'bilingual-voice-assistant',
    compact: {
      title: { en: 'Bilingual voice assistant', fr: 'Assistant vocal bilingue' },
      meta: { en: 'FR + EN, local', fr: 'FR + EN, en local' },
    },
  },
  {
    slug: 'edge-gateway',
    title: { en: 'Edge gateway', fr: 'Passerelle d’entrée' },
    summary: {
      en: 'Traefik v3.7 (36 routers) with wildcard TLS via DNS challenge, security headers, two synced Pi-holes, Tailscale for remote access.',
      fr: 'Traefik v3.7 (36 routeurs) avec TLS wildcard par challenge DNS, en-têtes de sécurité, deux Pi-hole synchronisés, Tailscale pour l’accès distant.',
    },
    stack: ['Traefik v3.7', 'Pi-hole', 'Tailscale'],
    post: 'edge-and-network',
    compact: {
      title: { en: 'Edge gateway', fr: 'Passerelle d’entrée' },
      meta: { en: 'Traefik v3.7 · 36 routers', fr: 'Traefik v3.7 · 36 routeurs' },
    },
  },
  {
    slug: 'one-service-per-lxc',
    title: { en: 'One service per LXC', fr: 'Un service par LXC' },
    summary: {
      en: '14 containers, weekly snapshot backups.',
      fr: '14 conteneurs, sauvegardes hebdomadaires par snapshot.',
    },
    stack: ['Proxmox VE', 'Docker', 'vzdump'],
    post: 'homelab-one-lxc-per-service',
    compact: {
      title: { en: 'One service per LXC', fr: 'Un service par LXC' },
      meta: { en: '14 containers', fr: '14 conteneurs' },
    },
  },
  {
    slug: 'media-server',
    title: { en: 'Media server', fr: 'Serveur multimédia' },
    summary: {
      en: 'Jellyfin in its own LXC, libraries on the ZFS pool, custom library tiles matching my TV launcher.',
      fr: 'Jellyfin dans son propre LXC, bibliothèques sur le pool ZFS, tuiles de bibliothèque assorties à mon launcher TV.',
    },
    stack: ['Jellyfin', 'Docker', 'ZFS'],
    media: { main: 'jellyfin-libraries' },
    post: 'media-and-multiroom-audio',
    compact: {
      title: { en: 'Media server', fr: 'Serveur multimédia' },
      meta: { en: 'Jellyfin in its own LXC', fr: 'Jellyfin dans son propre LXC' },
    },
  },
  {
    slug: 'speakers',
    title: { en: 'Wired speakers, Bluetooth brain', fr: 'Enceintes filaires, cerveau Bluetooth' },
    summary: {
      en: 'ESP32-WROVER + PCM5102 DAC turns my Mackie CR3 speakers into a PIN-protected Bluetooth receiver; the Pi streams Snapcast and MPD to it.',
      fr: 'Un ESP32-WROVER et un DAC PCM5102 transforment mes enceintes Mackie CR3 en récepteur Bluetooth protégé par PIN ; le Pi leur envoie Snapcast et MPD.',
    },
    stack: ['ESP32', 'PCM5102', 'I2S', 'A2DP', 'Snapcast', 'MPD'],
    media: { main: 'speakers-wiring', thumbs: ['speakers-dac-pads', 'speakers-box', 'speakers-cr3-front'] },
    post: 'speakers-bluetooth-esp32',
    compact: {
      title: { en: 'Wired speakers, Bluetooth brain', fr: 'Enceintes filaires, cerveau Bluetooth' },
      meta: { en: 'ESP32 + PCM5102', fr: 'ESP32 + PCM5102' },
    },
  },
  {
    slug: 'observability',
    title: { en: 'Observability', fr: 'Observabilité' },
    summary: {
      en: 'Prometheus with 9 targets at 15 s and Grafana; a custom TrueNAS exporter in ~180 lines of Python.',
      fr: 'Prometheus avec 9 cibles toutes les 15 s et Grafana ; un exporter TrueNAS maison d’environ 180 lignes de Python.',
    },
    stack: ['Prometheus', 'Grafana', 'Python'],
    post: 'observability',
    compact: {
      title: { en: 'Observability', fr: 'Observabilité' },
      meta: { en: 'Prometheus + Grafana', fr: 'Prometheus + Grafana' },
    },
  },
  {
    slug: 'multiroom-audio',
    title: { en: 'Multiroom audio', fr: 'Audio multiroom' },
    summary: {
      en: '23 players across Snapcast, AirPlay and Cast, plus a mobile client.',
      fr: '23 lecteurs entre Snapcast, AirPlay et Cast, plus un client mobile.',
    },
    stack: ['Music Assistant', 'Expo'],
    compact: {
      title: { en: 'Multiroom audio', fr: 'Audio multiroom' },
      meta: { en: '23 players', fr: '23 lecteurs' },
    },
  },
  {
    slug: 'local-nvr',
    title: { en: 'Local NVR', fr: 'NVR local' },
    summary: {
      en: 'Motion and presence-driven recording.',
      fr: 'Enregistrement piloté par le mouvement et la présence.',
    },
    stack: ['Frigate', 'go2rtc', 'MQTT'],
  },
  {
    slug: 'redundant-dns',
    title: { en: 'Redundant DNS', fr: 'DNS redondant' },
    summary: { en: 'Two synced Pi-holes on separate hosts.', fr: 'Deux Pi-hole synchronisés sur des hôtes séparés.' },
    stack: ['Pi-hole'],
    compact: {
      title: { en: 'Redundant DNS', fr: 'DNS redondant' },
      meta: { en: '2× Pi-hole', fr: '2× Pi-hole' },
    },
  },
];

/** Order of the home-page compact list (matches the canvas). */
export const compactOrder = [
  'voice-satellite',
  'edge-gateway',
  'one-service-per-lxc',
  'multiroom-audio',
  'observability',
  'bilingual-voice-assistant',
  'redundant-dns',
  'rack',
  'media-server',
  'speakers',
  'home-assistant-hub',
] as const;

export type SelfHostedService = { name: string; purpose: Localized };

export const services: readonly SelfHostedService[] = [
  { name: 'Nextcloud', purpose: { en: 'files, calendar, contacts', fr: 'fichiers, agenda, contacts' } },
  { name: 'Vaultwarden', purpose: { en: 'passwords', fr: 'mots de passe' } },
  { name: 'Jellyfin', purpose: { en: 'media', fr: 'médias' } },
  { name: 'Portainer', purpose: { en: 'Docker across LXCs', fr: 'Docker sur les LXC' } },
  { name: 'Homepage', purpose: { en: 'dashboard', fr: 'tableau de bord' } },
  { name: 'IT-Tools', purpose: { en: 'dev utilities', fr: 'utilitaires de dev' } },
  { name: 'BentoPDF', purpose: { en: 'PDF toolkit', fr: 'boîte à outils PDF' } },
  { name: 'Music Assistant + Snapcast', purpose: { en: 'multiroom', fr: 'multiroom' } },
  { name: 'Pi-hole ×2', purpose: { en: 'DNS', fr: 'DNS' } },
  { name: 'Grafana + Prometheus', purpose: { en: 'monitoring', fr: 'supervision' } },
  { name: 'Frigate', purpose: { en: 'NVR', fr: 'NVR' } },
  { name: 'ESPHome', purpose: { en: 'firmware', fr: 'firmware' } },
  {
    name: 'Streamer.bot overlays for OBS',
    purpose: { en: 'chat, multichat, ad timer', fr: 'chat, multichat, minuteur de pubs' },
  },
];

export type LabScreen = { image: MediaName; caption: Localized };

export const screens: readonly LabScreen[] = [
  { image: 'grafana', caption: { en: 'Grafana — homelab overview', fr: 'Grafana — vue d’ensemble du homelab' } },
  {
    image: 'ha',
    caption: { en: 'Home Assistant — tablet dashboard', fr: 'Home Assistant — tableau de bord tablette' },
  },
  { image: 'proxmox', caption: { en: 'Proxmox VE 8.2 — 14 LXC', fr: 'Proxmox VE 8.2 — 14 LXC' } },
  {
    image: 'traefik',
    caption: { en: 'Traefik v3.7 — 36 routers, 54 services', fr: 'Traefik v3.7 — 36 routeurs, 54 services' },
  },
  {
    image: 'pihole',
    caption: { en: 'Pi-hole — 29k queries/day, 18% blocked', fr: 'Pi-hole — 29k requêtes/jour, 18 % bloquées' },
  },
  {
    image: 'portainer',
    caption: { en: 'Portainer — Docker across the LXCs', fr: 'Portainer — Docker sur les LXC' },
  },
  { image: 'nextcloud', caption: { en: 'Nextcloud — dashboard', fr: 'Nextcloud — tableau de bord' } },
  {
    image: 'music-assistant',
    caption: { en: 'Music Assistant — Snapcast output', fr: 'Music Assistant — sortie Snapcast' },
  },
];
