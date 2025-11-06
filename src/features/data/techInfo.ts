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
      'RESTful API development with Express.js',
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
      'Extensive libraries for data science and AI',
      'Web frameworks like Django and Flask',
      'Automation and scripting capabilities'
    ],
    category: 'backend',
    experience: '4+ years',
    projects: ['Data Analysis Tools', 'Web APIs', 'Automation Scripts']
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
  docker: {
    name: 'Docker',
    description: 'Containerization platform for consistent application deployment.',
    image: '/src/assets/programming-icons/docker.svg',
    details: [
      'Containerized development environments',
      'Consistent deployment across platforms',
      'Docker Compose for multi-container applications',
      'Container orchestration with Kubernetes'
    ],
    category: 'tools',
    experience: '2+ years',
    projects: ['Microservices', 'CI/CD Pipelines', 'Development Environments']
  },
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
  github: {
    name: 'GitHub',
    description: 'Version control and collaborative development platform.',
    image: '/src/assets/programming-icons/github.svg',
    details: [
      'Git version control and branching strategies',
      'Pull requests and code review workflows',
      'GitHub Actions for CI/CD automation',
      'Issues and project management tools'
    ],
    category: 'tools',
    experience: '5+ years',
    projects: ['Open Source Contributions', 'Team Collaboration', 'Automated Deployments']
  },
  figma: {
    name: 'Figma',
    description: 'Collaborative design tool for creating user interfaces.',
    image: '/src/assets/programming-icons/figma.svg',
    details: [
      'Vector-based design with component systems',
      'Real-time collaboration and commenting',
      'Prototyping and interactive animations',
      'Design system management and tokens'
    ],
    category: 'tools',
    experience: '3+ years',
    projects: ['UI/UX Design', 'Design Systems', 'Prototypes']
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
  jest: {
    name: 'Jest',
    description: 'JavaScript testing framework with built-in assertions and mocking.',
    image: '/src/assets/programming-icons/jest.svg',
    details: [
      'Zero-configuration testing setup',
      'Built-in test runner, assertions, and mocking',
      'Code coverage reporting',
      'Snapshot testing for React components'
    ],
    category: 'tools',
    experience: '3+ years',
    projects: ['Unit Testing', 'Integration Tests', 'TDD Development']
  },
  cypress: {
    name: 'Cypress',
    description: 'End-to-end testing framework for web applications.',
    image: '/src/assets/programming-icons/cypress.svg',
    details: [
      'Real browser testing environment',
      'Time-travel debugging capabilities',
      'Network request stubbing and mocking',
      'Visual regression testing'
    ],
    category: 'tools',
    experience: '2+ years',
    projects: ['E2E Testing', 'User Journey Tests', 'CI/CD Integration']
  },
  'testing-library': {
    name: 'Testing Library',
    description: 'Testing utilities focused on user-centered test practices.',
    image: '/src/assets/programming-icons/testing-library.svg',
    details: [
      'User-centric testing approach',
      'Accessibility-focused test queries',
      'Framework-agnostic testing utilities',
      'Encourages testing best practices'
    ],
    category: 'tools',
    experience: '3+ years',
    projects: ['Component Testing', 'Accessibility Testing', 'User Behavior Tests']
  },
  prisma: {
    name: 'Prisma',
    description: 'Next-generation ORM for Node.js and TypeScript.',
    image: '/src/assets/programming-icons/prisma.svg',
    details: [
      'Type-safe database client generation',
      'Database schema management and migrations',
      'Built-in connection pooling',
      'Support for multiple database providers'
    ],
    category: 'database',
    experience: '2+ years',
    projects: ['Database Modeling', 'API Development', 'Type-safe Queries']
  },
  vercel: {
    name: 'Vercel',
    description: 'Platform for frontend deployment and serverless functions.',
    image: '/src/assets/programming-icons/vercel.svg',
    details: [
      'Instant deployments with Git integration',
      'Global CDN and edge network',
      'Serverless functions and API routes',
      'Preview deployments for every commit'
    ],
    category: 'cloud',
    experience: '2+ years',
    projects: ['Frontend Hosting', 'Serverless APIs', 'Preview Environments']
  },
  nginx: {
    name: 'Nginx',
    description: 'High-performance web server and reverse proxy.',
    image: '/src/assets/programming-icons/nginx.svg',
    details: [
      'High-performance HTTP server',
      'Reverse proxy and load balancing',
      'SSL/TLS termination',
      'Static file serving and caching'
    ],
    category: 'tools',
    experience: '2+ years',
    projects: ['Web Server Configuration', 'Load Balancing', 'SSL Setup']
  },
  gitlab: {
    name: 'GitLab',
    description: 'Complete DevOps platform for source code management.',
    image: '/src/assets/programming-icons/gitlab.svg',
    details: [
      'Git repository management',
      'Built-in CI/CD pipelines',
      'Issue tracking and project management',
      'Security scanning and monitoring'
    ],
    category: 'tools',
    experience: '2+ years',
    projects: ['CI/CD Pipelines', 'Code Review', 'Project Management']
  },
  jira: {
    name: 'Jira',
    description: 'Project management and issue tracking software.',
    image: '/src/assets/programming-icons/jira.svg',
    details: [
      'Agile project management workflows',
      'Customizable issue tracking',
      'Sprint planning and reporting',
      'Integration with development tools'
    ],
    category: 'tools',
    experience: '3+ years',
    projects: ['Sprint Planning', 'Bug Tracking', 'Project Coordination']
  },
  flutter: {
    name: 'Flutter',
    description: 'Google\'s UI toolkit for building natively compiled applications.',
    image: '/src/assets/programming-icons/flutter.svg',
    details: [
      'Single codebase for multiple platforms',
      'Rich set of customizable widgets',
      'Hot reload for fast development',
      'Native performance and look'
    ],
    category: 'mobile',
    experience: '1+ years',
    projects: ['Cross-platform Apps', 'Mobile Prototypes', 'UI Components']
  },
  dart: {
    name: 'Dart',
    description: 'Programming language optimized for building user interfaces.',
    image: '/src/assets/programming-icons/dart.svg',
    details: [
      'Object-oriented with null safety',
      'Just-in-time and ahead-of-time compilation',
      'Garbage collection and memory management',
      'Optimized for Flutter development'
    ],
    category: 'mobile',
    experience: '1+ years',
    projects: ['Flutter Applications', 'Mobile Development', 'UI Logic']
  },
  android: {
    name: 'Android',
    description: 'Mobile operating system and development platform.',
    image: '/src/assets/programming-icons/android.svg',
    details: [
      'Native Android app development',
      'Kotlin and Java programming languages',
      'Material Design principles',
      'Google Play Store distribution'
    ],
    category: 'mobile',
    experience: '1+ years',
    projects: ['Native Android Apps', 'Mobile UI/UX', 'Play Store Apps']
  },
  'android-studio': {
    name: 'Android Studio',
    description: 'Official IDE for Android app development.',
    image: '/src/assets/programming-icons/android-studio.svg',
    details: [
      'IntelliJ-based development environment',
      'Visual layout editor and design tools',
      'Built-in emulator and debugging tools',
      'Gradle build system integration'
    ],
    category: 'tools',
    experience: '1+ years',
    projects: ['Android Development', 'Mobile App Testing', 'UI Design']
  }
};