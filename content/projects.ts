import type { MediaName } from './media';
import type { Localized, Text } from './types';

export type ProjectStatus = 'launching-soon' | 'live' | 'in-development' | 'archived';

export type ProjectMedia =
  /** One wide screenshot, with an optional light-theme variant shown in light mode. */
  | { kind: 'landing'; dark: MediaName; light?: MediaName; caption: Text }
  /** A row of phone screenshots. */
  | { kind: 'screens'; items: readonly MediaName[] };

/** Attribution line: `before` + linked `name` + optional `after`. */
export type Credit = { before: Localized; name: string; href: string; after?: Localized };

const erdal = { name: 'Erdal Toprak', href: 'https://erdaltoprak.com/' } as const;

const builtAtChtprk: Credit = {
  before: { en: 'Built at CHTPRK with ', fr: 'Réalisé chez CHTPRK avec ' },
  ...erdal,
};

export type Project = {
  slug: string;
  name: string;
  period: Text;
  status: ProjectStatus;
  /** Closed-source / not publicly available. */
  private?: boolean;
  /** Role or affiliation shown next to the name. */
  affiliation: Localized;
  summary: Localized;
  bullets: readonly Localized[];
  stack: readonly string[];
  /** One engineering decision worth calling out (kept as data; not rendered on the home page). */
  detail: Localized;
  /** Who it was built with. */
  credit?: Credit;
  media: ProjectMedia;
  link?: { href: string; label: string };
};

export const projects: readonly Project[] = [
  {
    slug: 'ugckit',
    name: 'UGCKit',
    period: { en: '2025 → now', fr: '2025 → auj.' },
    status: 'launching-soon',
    affiliation: { en: 'Co-founded at CHTPRK', fr: 'Cofondateur · CHTPRK' },
    summary: {
      en: 'Turns a creator’s own media into short videos, images, voice-overs and hooks, published to TikTok, Instagram and YouTube.',
      fr: 'Transforme les médias d’un créateur en vidéos courtes, images, voix off et accroches, publiées sur TikTok, Instagram et YouTube.',
    },
    bullets: [
      {
        en: 'Canvas for image and video generation, background removal, TTS',
        fr: 'Canvas pour générer images et vidéos, détourage, synthèse vocale',
      },
      { en: 'AI avatars and a draft editor', fr: 'Avatars IA et éditeur de brouillons' },
      { en: 'OAuth social publishing', fr: 'Publication sur les réseaux via OAuth' },
      { en: 'Stripe subscriptions and credits', fr: 'Abonnements Stripe et crédits' },
    ],
    stack: [
      'Next.js 16',
      'Better Auth',
      'Prisma',
      'PostgreSQL',
      'Redis',
      '4 Temporal workers',
      'FFmpeg',
      'S3 (Garage)',
      'OpenTelemetry → ClickHouse',
      'fal.ai',
    ],
    detail: {
      en: 'Credits are reserved, then settled only against verified provider results — exact decimals, never floats.',
      fr: 'Les crédits sont réservés, puis réglés uniquement sur des résultats fournisseur vérifiés — décimales exactes, jamais de flottants.',
    },
    media: {
      kind: 'landing',
      dark: 'ugckit-landing',
      light: 'ugckit-landing-light',
      caption: { en: 'ugckit.ai · landing', fr: 'ugckit.ai · accueil' },
    },
    credit: builtAtChtprk,
    link: { href: 'https://ugckit.ai', label: 'ugckit.ai' },
  },
  {
    slug: 'chtprk',
    name: 'CHTPRK',
    period: { en: '2025 → now', fr: '2025 → auj.' },
    status: 'live',
    affiliation: { en: 'Co-founder', fr: 'Cofondateur' },
    summary: {
      en: 'A studio of two independent engineers: a multilingual site and the shared production platform behind our products.',
      fr: 'Un studio de deux ingénieurs indépendants : un site multilingue et la plateforme de production commune derrière nos produits.',
    },
    bullets: [
      {
        en: 'Single server, Cloudflare Tunnel as the only ingress',
        fr: 'Un seul serveur, Cloudflare Tunnel comme unique point d’entrée',
      },
      {
        en: 'Postgres + PgBouncer + pgBackRest, Redis, Temporal, ClickHouse/OTel',
        fr: 'Postgres + PgBouncer + pgBackRest, Redis, Temporal, ClickHouse/OTel',
      },
      {
        en: 'Encrypted secrets in git, 20+ ADRs, manual image promotion',
        fr: 'Secrets chiffrés dans git, plus de 20 ADR, promotion manuelle des images',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Temporal', 'ClickHouse', 'Cloudflare Tunnel'],
    detail: {
      en: 'App CI never holds server credentials; deploy is a separate gated step.',
      fr: 'La CI des applis ne détient jamais d’accès au serveur ; le déploiement est une étape séparée et contrôlée.',
    },
    media: {
      kind: 'landing',
      dark: 'chtprk-landing',
      light: 'chtprk-landing-light',
      caption: { en: 'chtprk.com · landing', fr: 'chtprk.com · accueil' },
    },
    credit: {
      before: { en: 'Co-founded with ', fr: 'Cofondé avec ' },
      ...erdal,
      after: {
        en: ', who also writes code and leads most of the infrastructure and servers.',
        fr: ', qui code aussi et pilote l’essentiel de l’infrastructure et des serveurs.',
      },
    },
    link: { href: 'https://chtprk.com', label: 'chtprk.com' },
  },
  {
    slug: 'fourma',
    name: 'Fourma',
    period: { en: '2025 → now', fr: '2025 → auj.' },
    status: 'in-development',
    private: true,
    affiliation: { en: 'Solo', fr: 'Solo' },
    summary: {
      en: 'Personal workout app: program builder, guided live workouts and progress charts, offline-safe during sessions, with a 199-exercise library in French and English.',
      fr: 'Application d’entraînement personnelle : création de programmes, séances guidées en direct et graphiques de progression, fiable hors ligne pendant la séance, avec une bibliothèque de 199 exercices en français et en anglais.',
    },
    bullets: [
      {
        en: 'Supersets with rest and side-switch timers',
        fr: 'Supersets avec minuteurs de repos et de changement de côté',
      },
      { en: 'NativeWind design tokens, light and dark', fr: 'Design tokens NativeWind, thème clair et sombre' },
      {
        en: 'Custom Kotlin Android “Live Update” notification module',
        fr: 'Module Kotlin sur mesure pour les notifications Android « Live Update »',
      },
    ],
    stack: [
      'Expo',
      'React Native',
      'expo-router',
      'NativeWind',
      'TanStack Query',
      'FastAPI',
      'PostgreSQL',
      'Alembic',
      'Kotlin',
    ],
    detail: {
      en: 'Every screen is reviewed against its design board in light and dark.',
      fr: 'Chaque écran est vérifié par rapport à sa maquette, en thème clair comme en thème sombre.',
    },
    media: { kind: 'screens', items: ['fourma-store-home', 'fourma-store-live', 'fourma-store-progress'] },
  },
  {
    slug: 'egouvernement',
    name: 'eGouvernement',
    period: '2024–25',
    status: 'archived',
    affiliation: { en: 'Co-founder · CHTPRK', fr: 'Cofondateur · CHTPRK' },
    summary: {
      en: 'AI assistant for French administrative procedures: streaming chat with tool calls to official sources (legal texts, Service-Public, government news), on web, Android and iOS.',
      fr: 'Assistant IA pour les démarches administratives françaises : chat en streaming avec appels d’outils vers les sources officielles (textes de loi, Service-Public, actualités du gouvernement), sur le web, Android et iOS.',
    },
    bullets: [],
    stack: ['FastAPI', 'Mistral', 'SQLAlchemy', 'PostgreSQL', 'Next.js ×2', 'Expo', 'Swift'],
    detail: {
      en: 'Tool registry + executor so answers cite official sources instead of model memory.',
      fr: 'Un registre d’outils et un exécuteur pour que les réponses citent les sources officielles plutôt que la mémoire du modèle.',
    },
    credit: builtAtChtprk,
    media: {
      kind: 'landing',
      dark: 'egov-desktop',
      caption: { en: 'Web · Android · iOS', fr: 'Web · Android · iOS' },
    },
  },
];
