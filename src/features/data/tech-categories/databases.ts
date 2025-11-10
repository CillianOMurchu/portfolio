import type { TechInfo } from '../../types/interactiveIcon';

export const databaseCloudTech: Record<string, TechInfo> = {
  postgresql: {
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database system.',
    image: '/src/assets/programming-icons/postgresql.svg',
    details: [
      'ACID compliance and advanced SQL features',
      'JSON/JSONB support for flexible data storage',
      'Full-text search and GIS capabilities',
      'Extensible with custom functions and types'
    ],
    category: 'database',
    experience: '3+ years',
    projects: ['E-commerce Platforms', 'Analytics Systems', 'Content Management']
  },
  firebase: {
    name: 'Firebase',
    description: 'Google\'s platform for building and deploying web and mobile apps.',
    image: '/src/assets/programming-icons/firebase.svg',
    details: [
      'Real-time database and Firestore',
      'Authentication and user management',
      'Cloud functions for serverless computing',
      'Hosting and analytics tools'
    ],
    category: 'cloud',
    experience: '2+ years',
    projects: ['Real-time Apps', 'User Authentication', 'Serverless Functions']
  },
  vercel: {
    name: 'Vercel',
    description: 'Cloud platform for static sites and serverless functions.',
    image: '/src/assets/programming-icons/vercel.svg',
    details: [
      'Instant deployments from Git',
      'Edge network for global performance',
      'Serverless functions and API routes',
      'Preview environments for every commit'
    ],
    category: 'cloud',
    experience: '2+ years',
    projects: ['Frontend Hosting', 'Serverless APIs', 'Preview Environments']
  },
  prisma: {
    name: 'Prisma',
    description: 'Next-generation ORM for Node.js and TypeScript.',
    image: '/src/assets/programming-icons/prisma.svg',
    details: [
      'Type-safe database access',
      'Auto-generated client with IntelliSense',
      'Database migrations and introspection',
      'Works with multiple database providers'
    ],
    category: 'database',
    experience: '2+ years',
    projects: ['Type-safe APIs', 'Database Design', 'ORM Integration']
  },
};