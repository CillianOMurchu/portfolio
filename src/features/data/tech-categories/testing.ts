import type { TechInfo } from '../../types/interactiveIcon';

export const testingTech: Record<string, TechInfo> = {
  jest: {
    name: 'Jest',
    description: 'JavaScript testing framework with built-in assertions and mocking.',
    image: '/src/assets/programming-icons/jest.svg',
    details: [
      'Zero-configuration testing setup',
      'Built-in test runner, assertions, and mocking',
      'Snapshot testing for UI components',
      'Code coverage reporting'
    ],
    category: 'tools',
    experience: '3+ years',
    projects: ['Unit Testing', 'Integration Tests', 'TDD Workflows']
  },
  cypress: {
    name: 'Cypress',
    description: 'End-to-end testing framework for web applications.',
    image: '/src/assets/programming-icons/cypress.svg',
    details: [
      'Real browser testing environment',
      'Time travel debugging with snapshots',
      'Network traffic stubbing and mocking',
      'Visual regression testing capabilities'
    ],
    category: 'tools',
    experience: '2+ years',
    projects: ['E2E Testing', 'User Journey Tests', 'CI Integration']
  },
  'testing-library': {
    name: 'Testing Library',
    description: 'Simple and complete testing utilities for React components.',
    image: '/src/assets/programming-icons/testing-library.svg',
    details: [
      'User-centric testing approach',
      'Simple API for component testing',
      'Accessibility-focused queries',
      'Framework-agnostic utilities'
    ],
    category: 'tools',
    experience: '3+ years',
    projects: ['Component Testing', 'Accessibility Tests', 'User Behavior Tests']
  },
};