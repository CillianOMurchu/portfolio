import type { TechInfo } from '../../types/interactiveIcon';

export const toolsTech: Record<string, TechInfo> = {
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