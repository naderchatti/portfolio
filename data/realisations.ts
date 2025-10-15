import { ValidLocale } from '@/lib/i18n';

export interface Realisation {
  title: string;
  description: Record<ValidLocale, string>;
  role?: Record<ValidLocale, string>;
  tech: string;
  status: Record<ValidLocale, string>;
  link: string;
  redirect: boolean;
}

export const realisations: Realisation[] = [
  {
    title: 'CHTPRK',
    description: {
      en: `Our landing page, where we showcase our SaaS products and services.`,
      fr: `Notre landing page, où nous présentons nos produits SaaS et services.`,
    },
    role: {
      en: 'Co-Founder',
      fr: 'Co-Fondateur',
    },
    tech: 'Next.js, TypeScript, TailwindCSS',
    status: {
      en: 'Active',
      fr: 'Actif',
    },
    link: 'https://chtprk.com',
    redirect: true,
  },
  {
    title: 'eGouvernement',
    description: {
      en: 'A platform, web app and mobile app providing quick and easy access to French administration procedures.',
      fr: 'Une plateforme, application web et mobile offrant un accès rapide et facile aux démarches administratives françaises.',
    },
    tech: 'Next.js, TypeScript, React Native, Swift, FastAPI, PostgreSQL, ML Model, LLM',
    status: {
      en: 'Offline',
      fr: 'Hors ligne',
    },
    link: 'https://egouvernement.fr',
    redirect: true,
  },
  {
    title: 'UGCKit',
    description: {
      en: 'An AI-driven social network content creation platform with AI video generation.',
      fr: 'Une plateforme de création de contenu pour réseaux sociaux avec IA et génération de vidéos',
    },
    tech: 'Next.js, TypeScript, OAuth, Stripe, Python, FastAPI, PostgreSQL, Prisma, ML Model, LLM, FFMPEG, S3',
    status: {
      en: 'In Development',
      fr: 'En Développement',
    },
    link: 'https://ugckit.ai',
    redirect: true,
  },
];
