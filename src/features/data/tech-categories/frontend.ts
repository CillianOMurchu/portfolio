import type { TechInfo } from '../../types/interactiveIcon';

export const frontendTech: Record<string, TechInfo> = {
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
      'Utility-first approach for rapid development',
      'Highly customizable design system',
      'Built-in responsive design utilities',
      'PurgeCSS integration for optimized builds'
    ],
    category: 'frontend',
    experience: '3+ years',
    projects: ['Modern Web Apps', 'Component Libraries', 'Design Systems']
  },
};