export interface Realisation {
  title: string;
  description: string;
  role?: string;
  tech: string;
  status: string;
  link: string;
  redirect: boolean;
}

export const realisations: Realisation[] = [
  {
    title: 'eGouvernement',
    description:
      'A platform, web app and mobile app providing quick and easy access to French administration procedures.',
    role: 'Co-Founder',
    tech: 'Next.js, TypeScript, React Native, Swift, FastAPI, PostgreSQL, ML Model, LLM',
    status: 'In Development',
    link: 'https://egouvernement.fr',
    redirect: true,
  },
  {
    title: 'Goodworker',
    description:
      'A mobile app for finding and hiring skilled workers for various tasks.',
    role: 'Co-Founder & CTO',
    tech: 'React Native, Node.js, MongoDB, Stripe',
    status: 'In Development',
    link: 'https://goodworker.fr',
    redirect: true,
  },
  {
    title: 'Portfolio',
    description: 'My personal portfolio website',
    tech: 'Next.js, Tailwind, TypeScript, Cloudflare, Pages, Workers',
    status: 'Active',
    link: 'https://naderchatti.com',
    redirect: false,
  },
];
