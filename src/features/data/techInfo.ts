import type { TechInfo } from '../types/interactiveIcon';

export const techInfoData: Record<string, TechInfo> = {
  react: {
    name: 'React',
    description: 'A JavaScript library for building user interfaces with component-based architecture.',
    image: '/src/assets/programming-icons/react.svg',
    details: [
      'Component-based architecture for reusable UI elements',
      'Virtual DOM for optimal performance',
      'Hooks for state management and side effects',
      'Extensive ecosystem with React Router, Redux, and more'
    ],
    category: 'frontend',
    experience: '4+ years',
    projects: ['Interactive Portfolio', 'E-commerce Platform', 'Real-time Chat App']
  },
  typescript: {
    name: 'TypeScript',
    description: 'Strongly typed programming language that builds on JavaScript.',
    image: '/src/assets/programming-icons/typescript.svg',
    details: [
      'Static type checking for fewer runtime errors',
      'Enhanced IDE support with autocomplete and refactoring',
      'Modern ECMAScript features with backward compatibility',
      'Better code documentation through type definitions'
    ],
    category: 'frontend',
    experience: '3+ years',
    projects: ['Type-safe APIs', 'Complex Data Models', 'Large-scale Applications']
  },
  javascript: {
    name: 'JavaScript',
    description: 'Dynamic programming language for web development and beyond.',
    image: '/src/assets/programming-icons/javascript.svg',
    details: [
      'ES6+ features for modern development',
      'Asynchronous programming with Promises and async/await',
      'Functional and object-oriented programming paradigms',
      'Cross-platform development capabilities'
    ],
    category: 'frontend',
    experience: '5+ years',
    projects: ['Interactive Websites', 'Node.js APIs', 'Browser Extensions']
  },
  'node-js': {
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development.',
    image: '/src/assets/programming-icons/node-js.svg',
    details: [
      'Non-blocking I/O for high-performance applications',
      'NPM ecosystem with millions of packages',
      'RESTful APIs and GraphQL servers',
      'Real-time applications with WebSockets'
    ],
    category: 'backend',
    experience: '3+ years',
    projects: ['REST APIs', 'Real-time Chat', 'Microservices']
  },
  python: {
    name: 'Python',
    description: 'Versatile programming language for web development, data science, and automation.',
    image: '/src/assets/programming-icons/python.svg',
    details: [
      'Clean, readable syntax for rapid development',
      'Extensive libraries for data science and ML',
      'Django and Flask for web development',
      'Automation and scripting capabilities'
    ],
    category: 'backend',
    experience: '4+ years',
    projects: ['Data Analysis Tools', 'Web Scrapers', 'API Backends']
  },
  html5: {
    name: 'HTML5',
    description: 'Modern markup language for structuring web content.',
    image: '/src/assets/programming-icons/html5.svg',
    details: [
      'Semantic elements for better accessibility',
      'Canvas and SVG for graphics and animations',
      'Local storage and offline capabilities',
      'Native form validation and input types'
    ],
    category: 'frontend',
    experience: '6+ years',
    projects: ['Responsive Websites', 'Interactive Graphics', 'Progressive Web Apps']
  },
  css3: {
    name: 'CSS3',
    description: 'Styling language for beautiful and responsive web interfaces.',
    image: '/src/assets/programming-icons/css3.svg',
    details: [
      'Flexbox and Grid for modern layouts',
      'Animations and transitions for smooth UX',
      'Custom properties (CSS variables)',
      'Responsive design with media queries'
    ],
    category: 'frontend',
    experience: '6+ years',
    projects: ['Responsive Layouts', 'Animation Libraries', 'Design Systems']
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development.',
    image: '/src/assets/programming-icons/tailwindcss.svg',
    details: [
      'Utility-first approach for consistent design',
      'Customizable design system with configuration',
      'JIT compiler for optimal bundle sizes',
      'Built-in responsive and dark mode support'
    ],
    category: 'frontend',
    experience: '2+ years',
    projects: ['Design Systems', 'Rapid Prototyping', 'Component Libraries']
  },
  // Add more technologies as needed...
};

export const getRandomTechInfo = (): TechInfo => {
  const techs = Object.values(techInfoData);
  return techs[Math.floor(Math.random() * techs.length)];
};

export const getTechInfo = (techKey: string): TechInfo | undefined => {
  return techInfoData[techKey];
};