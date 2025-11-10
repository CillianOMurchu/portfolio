import type { TechInfo } from '../../types/interactiveIcon';

export const backendTech: Record<string, TechInfo> = {
  'node-js': {
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development.',
    image: '/src/assets/programming-icons/node-js.svg',
    details: [
      'Event-driven, non-blocking I/O model',
      'NPM ecosystem with millions of packages',
      'Server-side JavaScript execution',
      'Microservices and API development'
    ],
    category: 'backend',
    experience: '4+ years',
    projects: ['REST APIs', 'Microservices', 'Real-time Applications']
  },
  python: {
    name: 'Python',
    description: 'Versatile programming language for web development, data science, and automation.',
    image: '/src/assets/programming-icons/python.svg',
    details: [
      'Clean, readable syntax for rapid development',
      'Extensive libraries for data science and AI',
      'Web frameworks like Django and Flask',
      'Automation and scripting capabilities'
    ],
    category: 'backend',
    experience: '4+ years',
    projects: ['Data Analysis Tools', 'Web APIs', 'Automation Scripts']
  },
  express: {
    name: 'Express.js',
    description: 'Fast, minimalist web framework for Node.js.',
    image: '/src/assets/programming-icons/express.svg',
    details: [
      'Lightweight and flexible web framework',
      'Middleware ecosystem for extensibility',
      'RESTful API development patterns',
      'Template engines and static file serving'
    ],
    category: 'backend',
    experience: '3+ years',
    projects: ['REST APIs', 'Web Servers', 'Middleware Development']
  },
};