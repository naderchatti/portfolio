import type { Localized, Text } from './types';

export type StackGroup = { id: string; label: Localized; items: readonly Text[] };

/** Grouped from what actually shipped, not from a wish list. */
export const stack: readonly StackGroup[] = [
  {
    id: 'fe',
    label: { en: 'Frontend', fr: 'Frontend' },
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'shadcn/Radix', 'TanStack', 'Framer Motion'],
  },
  {
    id: 'be',
    label: { en: 'Backend', fr: 'Backend' },
    items: ['Node.js', 'FastAPI', 'Prisma', 'SQLAlchemy', 'Auth.js / better-auth', 'Stripe'],
  },
  {
    id: 'data',
    label: { en: 'Data & queues', fr: 'Données et files d’attente' },
    items: ['PostgreSQL', 'pgvector', 'Redis', 'BullMQ', 'Temporal', 'MongoDB'],
  },
  {
    id: 'ai',
    label: { en: 'AI', fr: 'IA' },
    items: ['Anthropic', 'Gemini', { en: 'OCR pipelines', fr: 'Pipelines OCR' }, 'Hugging Face'],
  },
  {
    id: 'ops',
    label: { en: 'Infra', fr: 'Infra' },
    items: ['Docker', 'Kubernetes', 'Proxmox', 'Cloudflare', 'GitHub Actions', 'OpenTelemetry', 'Grafana'],
  },
  {
    id: 'mob',
    label: { en: 'Mobile', fr: 'Mobile' },
    items: ['Expo / React Native', 'Swift'],
  },
];
