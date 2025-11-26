# Creative Developer Portfolio 🚀

An interactive, imaginative portfolio website showcasing programming skills through creative visual experiences and educational tools.

## 🎯 Project Vision

This isn't just a portfolio - it's a playground of creativity that demonstrates technical skills through engaging, interactive experiences. Built with cutting-edge web technologies to showcase passion for:

- **Apex Legends** - Gaming analytics and interactive elements
- **Padel** - Sports tracking and visualization tools  
- **Calisthenics** - Workout planners and progress tracking
- **Programming** - Code showcases and technical demos
- **Music** - Drum videos, guitar/piano showcases, audio visualizations

## ✨ Creative Features

### Visual Effects & Animations
- **3D Molecule Effects** - Interactive particle systems using Three.js
- **Scroll Animations** - Framer Motion powered scroll-triggered animations
- **Shimmer Effects** - Dynamic loading states and hover effects
- **SVG Face Expressions** - Mouse proximity-based facial animations
- **Parallax Scrolling** - Multi-layer depth animations

### Interactive Elements
- **Mouse-Following Particles** - Dynamic visual feedback
- **Morphing Shapes** - CSS/Canvas animations
- **Color Gradients** - Dynamic theme changes
- **Sound Visualizations** - Audio-reactive components

## 🛠 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Authentication**: Supabase Auth (Google OAuth + Visitor Mode)
- **Database**: Supabase PostgreSQL
- **Real-time**: Supabase Realtime subscriptions
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel/Netlify ready

## 🎮 Supabase-Powered Features

### 1. Interactive Learning Game
**"Code Quest"** - Educational programming game demonstrating Supabase capabilities:
- **Real-time Leaderboards** - Live score updates
- **Progress Tracking** - User journey persistence
- **Social Features** - Multiplayer challenges
- **Achievement System** - Unlock-based progression

### 2. Interview Practice Tool
**"Interview Ace"** - Timed practice sessions for:
- **Verbal Reasoning** - Text comprehension challenges
- **Numerical Reasoning** - Math and logic problems  
- **Personality Tests** - Behavioral assessment prep
- **Custom Question Banks** - User-generated content
- **Performance Analytics** - Track improvement over time

### 3. Content Management
- **Drum Video of the Week** - Curated music content
- **Project Showcases** - Dynamic portfolio updates
- **Blog System** - Technical articles and tutorials
- **Comment System** - Community engagement

## 📋 Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Project restructure for new concept
- [ ] Basic 3D scene setup with Three.js
- [ ] Scroll animation framework
- [ ] Supabase schema design

### Phase 2: Visual Magic (Weeks 3-4)
- [ ] 3D molecule particle system
- [ ] SVG face animation system
- [ ] Shimmer and hover effects
- [ ] Responsive design system

### Phase 3: Interactive Features (Weeks 5-6)
- [ ] Interview practice tool MVP
- [ ] Code Quest game foundation
- [ ] Drum video management system
- [ ] Real-time features integration

### Phase 4: Polish & Deploy (Weeks 7-8)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] SEO and accessibility
- [ ] Production deployment

## 🧪 Development Protocol

### Feature Implementation Process:
1. **Test First** - Write failing test for new feature
2. **Implement** - Build feature to pass the test
3. **Verify** - Ensure test passes
4. **Document** - Create feature documentation
5. **Demo** - Add to showcase section

### File Structure:
```
src/
├── features/
│   ├── visual-effects/
│   ├── interview-tool/
│   ├── code-quest/
│   └── content-management/
├── components/
│   ├── ui/
│   ├── animations/
│   └── three/
├── hooks/
├── utils/
└── tests/
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev

# Run tests in watch mode
npm run test

# Run tests once (CI/CD)
npm run test:run

# Run tests with UI interface
npm run test:ui

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing Infrastructure

This project uses **Vitest** with **React Testing Library** for comprehensive testing:

- **Unit Tests** - Component and utility function testing
- **Integration Tests** - Feature workflow testing  
- **Visual Tests** - Animation and UI behavior testing
- **TDD Workflow** - Test-first development protocol

**Test Commands:**
- `npm run test` - Interactive watch mode for development
- `npm run test:run` - Single run for CI/CD pipelines
- `npm run test:ui` - Visual test interface with coverage reports

**Test Structure:**
```
src/features/[feature-name]/tests/
├── [Component].test.tsx    # Component tests
├── hooks.test.ts          # Custom hooks tests
└── utils.test.ts          # Utility function tests
```

## 🎨 Design Philosophy

This portfolio embodies the intersection of technical skill and creative expression. Every feature serves dual purposes:
1. **Showcase technical abilities** through implementation complexity
2. **Engage visitors** with memorable, interactive experiences

The goal is to create a portfolio that people remember and want to explore, demonstrating both programming expertise and creative vision.

## 📱 Responsive Design

Built mobile-first with progressive enhancement:
- **Mobile**: Touch-optimized interactions
- **Tablet**: Enhanced visual effects
- **Desktop**: Full 3D and complex animations
- **Ultra-wide**: Immersive experiences

## 🔧 Development Tools

- **Vite**: Lightning-fast development server with HMR
- **TypeScript**: Type safety and enhanced developer experience  
- **Vitest**: Fast, modern test runner with instant feedback
- **React Testing Library**: Component testing best practices
- **ESLint/Prettier**: Code quality and consistent formatting
- **Tailwind CSS**: Utility-first styling with JIT compilation
- **Framer Motion**: Production-ready motion library
- **Supabase**: Backend-as-a-Service with real-time features
- **Husky**: Git hooks for automated quality gates
- **GitHub Actions**: Continuous integration and deployment

## 🎯 Quality Assurance

- **Test Coverage**: Minimum 80% code coverage requirement
- **TDD Workflow**: Test-first development methodology
- **Type Safety**: Strict TypeScript configuration
- **Performance Budgets**: Bundle size and loading time limits
- **Accessibility**: WCAG 2.1 AA compliance
- **Code Reviews**: Pull request validation process



