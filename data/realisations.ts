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
    title: 'Goodworker',
    description: {
      en: 'A mobile app for finding and hiring skilled workers for various tasks.',
      fr: 'Une application mobile pour trouver et embaucher des travailleurs qualifiés pour diverses tâches.',
    },
    role: {
      en: 'Co-Founder & CTO',
      fr: 'Co-Fondateur & CTO',
    },
    tech: 'React Native, Node.js, MongoDB, Stripe',
    status: {
      en: 'In Development',
      fr: 'En Développement',
    },
    link: 'https://goodworker.fr',
    redirect: true,
  },
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
      en: 'Active',
      fr: 'Actif',
    },
    link: 'https://egouvernement.fr',
    redirect: true,
  },
];
