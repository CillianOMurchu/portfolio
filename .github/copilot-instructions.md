# Creative Developer Portfolio Instructions

This is a React frontend project for an interactive, imaginative portfolio website showcasing programming skills through creative visual experiences and educational tools.

## Project Concept
A creative playground demonstrating technical skills through engaging interactive experiences focused on:
- **Apex Legends** - Gaming analytics and interactive elements
- **Padel** - Sports tracking and visualization tools  
- **Calisthenics** - Workout planners and progress tracking
- **Programming** - Code showcases and technical demos
- **Music** - Drum videos, guitar/piano showcases, audio visualizations

## Technical Stack
- Frontend: React 18 + TypeScript + Vite
- Styling: Tailwind CSS + Framer Motion
- 3D Graphics: Three.js + React Three Fiber
- Authentication: Supabase Auth (Google OAuth + Visitor Mode)
- Database: Supabase PostgreSQL with real-time subscriptions
- Testing: Vitest + React Testing Library

## Creative Features Guidelines
- **3D Molecule Effects** - Interactive particle systems using Three.js
- **Scroll Animations** - Framer Motion powered scroll-triggered animations
- **Shimmer Effects** - Dynamic loading states and hover effects
- **SVG Face Expressions** - Mouse proximity-based facial animations
- **Interactive Elements** - Mouse-following particles, morphing shapes

## Development Protocol
1. **Test First** - Write failing test for new feature
2. **Implement** - Build feature to pass the test
3. **Verify** - Ensure test passes
4. **Document** - Create feature documentation in feature folder
5. **Demo** - Add to showcase section

## Feature Structure
Use modular feature-based architecture:
```
src/features/[feature-name]/
├── README.md
├── [FeatureName].tsx
├── components/
├── hooks/
├── utils/
├── types/
└── tests/
```

## Supabase Integration Opportunities
- **Interview Practice Tool** - Timed assessments with progress tracking
- **Code Quest Game** - Educational programming game with leaderboards
- **Content Management** - Drum video curation, blog posts
- **Real-time Features** - Live score updates, social interactions
- **User Progress** - Achievement systems, learning paths

## Animation Guidelines
- Use Framer Motion for all animations and transitions
- Implement scroll-triggered animations for content reveal
- Primary animations: elements slide in from various directions with fade effects
- Apply consistent animation timing and easing curves
- Ensure animations enhance UX without being distracting
- Use `will-change` CSS property for performance optimization

## Performance Standards
- First Contentful Paint: < 1.5s
- Main bundle: < 250KB gzipped
- Feature bundles: < 50KB each
- Mobile-first responsive design
- Progressive enhancement for desktop features

## Code Quality
- TypeScript for type safety
- ESLint + Prettier for consistency
- Pre-commit hooks with Husky
- Test coverage > 80%
- WCAG 2.1 AA accessibility compliance