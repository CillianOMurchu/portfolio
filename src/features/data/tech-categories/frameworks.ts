import type { TechInfo } from '../../types/interactiveIcon';

export const frameworksTech: Record<string, TechInfo> = {
  'next-js': {
    name: 'Next.js',
    description: 'React framework for production-ready web applications.',
    image: '/src/assets/programming-icons/next-js.svg',
    details: [
      'Server-side rendering and static site generation',
      'Built-in routing and API routes',
      'Image optimization and performance features',
      'Deployment optimization for Vercel'
    ],
    category: 'frontend',
    experience: '2+ years',
    projects: ['E-commerce Sites', 'Blogs', 'Marketing Pages']
  },
};