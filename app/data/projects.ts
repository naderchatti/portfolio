export interface Project {
  title: string;
  description: string;
  tech: string;
  status: string;
  link: string;
  redirect: boolean;
}

export const projects: Project[] = [
  {
    title: 'SaaS Analytics Platform',
    description:
      'A real-time analytics dashboard for SaaS businesses with user behavior tracking and revenue metrics.',
    tech: 'Next.js, TypeScript, Prisma, PostgreSQL',
    status: 'In Development',
    link: '#',
    redirect: false,
  },
  {
    title: 'E-commerce Solution',
    description:
      'A modern e-commerce platform with inventory management and payment processing capabilities.',
    tech: 'React, Node.js, MongoDB, Stripe',
    status: 'Active',
    link: '#',
    redirect: true,
  },
  // Add more projects as needed
];
