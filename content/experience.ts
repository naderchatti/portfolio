import type { Localized, Text } from './types';

export type Experience = {
  slug: string;
  period: Text;
  /** Still ongoing. */
  current: boolean;
  role: Localized;
  org: string;
  summary: Localized;
  /** At most three. */
  bullets: readonly Localized[];
  stack: readonly string[];
  /** One engineering decision worth calling out. */
  detail?: Localized;
  link?: { href: string; label: string };
};

export const experience: readonly Experience[] = [
  {
    slug: 'effiloche',
    period: { en: '2025 — now', fr: '2025 — auj.' },
    current: true,
    role: { en: 'Tech lead (all IT & software)', fr: 'Tech lead (toute l’informatique et le logiciel)' },
    org: 'L’Effiloché',
    summary: {
      en: 'Street food de qualité & coffee shop: designed, built and run the whole digital stack.',
      fr: 'Street food de qualité & coffee shop : conception, développement et exploitation de toute la stack numérique.',
    },
    bullets: [
      {
        en: 'In-store display system: playlists on 4 TV players, wide and vertical layouts',
        fr: 'Affichage en boutique : playlists sur 4 lecteurs TV, formats paysage et portrait',
      },
      {
        en: 'Online ordering, plus admin, staff, kitchen and driver apps',
        fr: 'Commande en ligne, plus les applis admin, équipe, cuisine et livreur',
      },
      {
        en: 'Delivery tours selling from finite truck stock, with atomic checkout',
        fr: 'Tournées de livraison vendant un stock de camion limité, avec un paiement atomique',
      },
    ],
    stack: ['pnpm monorepo', 'Next.js', 'Expo', 'Prisma', 'PostgreSQL', 'Better Auth', 'web push'],
    detail: {
      en: 'Realtime via a Postgres outbox + relay: every screen gets each change exactly once.',
      fr: 'Temps réel via un outbox Postgres et un relais : chaque écran reçoit chaque changement exactement une fois.',
    },
  },
  {
    slug: 'aidiagme',
    period: { en: '2024 — now', fr: '2024 — auj.' },
    current: true,
    role: { en: 'Lead fullstack · top contributor', fr: 'Lead fullstack · principal contributeur' },
    org: 'AI Diag Me',
    summary: {
      en: 'AI health platform interpreting lab reports and questionnaires for humans and animals: multi-brand, 5 languages, multi-currency Stripe, telehealth.',
      fr: 'Plateforme de santé IA qui interprète bilans biologiques et questionnaires, pour les humains comme pour les animaux : multimarque, 5 langues, Stripe multidevise, téléconsultation.',
    },
    bullets: [
      { en: 'PDF/OCR pipeline with anonymisation', fr: 'Pipeline PDF/OCR avec anonymisation' },
      {
        en: 'Ranked multi-provider LLM fallback (OpenRouter, Claude, Gemini)',
        fr: 'Repli LLM multi-fournisseur par ordre de priorité (OpenRouter, Claude, Gemini)',
      },
      {
        en: 'Kubernetes autoscaling on European clouds, plus an internal load-testing tool',
        fr: 'Autoscaling Kubernetes sur des clouds européens, plus un outil interne de tests de charge',
      },
    ],
    stack: ['Next.js 16', 'NextAuth', 'Prisma', 'PostgreSQL', 'Redis/BullMQ', 'Python OCR', 'Kubernetes'],
    detail: {
      en: 'Split OCR into its own 4-CPU worker after production previews timed out.',
      fr: 'OCR isolé dans son propre worker à 4 CPU après des aperçus qui expiraient en production.',
    },
    link: { href: 'https://aidiagme.com', label: 'aidiagme.com' },
  },
  {
    slug: 'bati-azure-reno',
    period: '2024',
    current: false,
    role: { en: 'Fullstack developer', fr: 'Développeur fullstack' },
    org: 'Bati Azure Reno',
    summary: {
      en: 'Rénovation Devis, a web app producing detailed estimates for renovation and construction.',
      fr: 'Rénovation Devis, une application web qui produit des devis détaillés pour la rénovation et la construction.',
    },
    bullets: [],
    stack: ['Next.js', 'Node.js', 'Cloudflare Workers', 'D1'],
  },
  {
    slug: 'mhm-labs',
    period: '2023',
    current: false,
    role: { en: 'Fullstack developer', fr: 'Développeur fullstack' },
    org: 'MHM Labs',
    summary: {
      en: 'MyHotelMatch, a matching platform for hotels and travelers.',
      fr: 'MyHotelMatch, une plateforme de mise en relation entre hôtels et voyageurs.',
    },
    bullets: [{ en: 'Amadeus certification', fr: 'Certification Amadeus' }],
    stack: ['Python', 'FastAPI', 'React', 'React Native', 'Node.js', 'MongoDB'],
  },
  {
    slug: 'vastappli',
    period: '2022',
    current: false,
    role: { en: 'Sole developer', fr: 'Développeur unique' },
    org: 'Vasta Piscine · Vastappli',
    summary: {
      en: 'Field operations for a pool company: clients, pools, scheduled service visits, anomaly reports, staff and notifications, replacing a paper-based system.',
      fr: 'Gestion terrain pour une entreprise de piscines : clients, bassins, passages d’entretien planifiés, signalements d’anomalies, équipe et notifications, à la place d’un système papier.',
    },
    bullets: [],
    stack: ['Java (Android)', 'Spring Boot', 'React Native/Expo'],
  },
  {
    slug: 'hes',
    period: '2018',
    current: false,
    role: { en: 'Internship', fr: 'Stage' },
    org: 'HES · Smart Home',
    summary: {
      en: 'Smart home platform on IPX800 hardware, controlled from an app and the Jarvis voice assistant.',
      fr: 'Plateforme domotique sur matériel IPX800, pilotée depuis une application et l’assistant vocal Jarvis.',
    },
    bullets: [],
    stack: ['Vue.js', 'Node.js', 'Kotlin', 'IPX800'],
  },
];
