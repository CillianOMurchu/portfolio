import type { TechInfo } from '../../types/interactiveIcon';

export const mobileTech: Record<string, TechInfo> = {
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
};