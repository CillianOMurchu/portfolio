# Interactive Icon System

A reusable React component system for creating interactive icons with animated lines and information panels.

## Features

- **Line Animation**: Smooth growing lines from icon to info panel
- **Icon Travel**: Icons morph into balls and travel along the line
- **Info Panels**: Rich information displays with animations
- **Return Animation**: Icons travel back and line shrinks
- **Reusable**: Single component instance handles all icons
- **TypeScript**: Fully typed for better development experience

## Usage

### Basic Setup

```tsx
import { InteractiveIconSystem, iconSystemData } from './features/components';

function MyComponent() {
  return (
    <InteractiveIconSystem iconData={iconSystemData}>
      {({ handleIconClick, selectedIcon, isAnimating }) => (
        <div>
          {/* Your icon elements */}
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
              };
              handleIconClick('react', center);
            }}
            disabled={isAnimating}
          >
            <img src="/react-icon.svg" alt="React" />
          </button>
        </div>
      )}
    </InteractiveIconSystem>
  );
}
```

### Data Structure

The system expects an object with tech information:

```tsx
const iconData = {
  react: {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    image: '/path/to/react-icon.svg',
    details: [
      'Component-based architecture',
      'Virtual DOM for performance',
      'Hooks for state management'
    ],
    category: 'frontend',
    experience: '4+ years',
    projects: ['Portfolio', 'E-commerce App']
  },
  // ... more technologies
};
```

### Props Provided by the System

- `handleIconClick(iconKey: string, position: {x: number, y: number})`: Call this when an icon is clicked
- `selectedIcon: string | null`: Currently selected/animating icon
- `isAnimating: boolean`: Whether any animation is in progress

### Animation Sequence

1. **Line Growth** (600ms): Line grows from icon to panel position
2. **Panel Appear**: Info panel fades in with content
3. **Icon Travel** (800ms): Icon morphs to ball and travels along line
4. **Absorb Phase**: Icon stays at panel, user can read info
5. **Return Animation** (1000ms): Icon travels back, line shrinks, panel disappears

### Categories

Icons are color-coded by category:
- `frontend`: Blue to Purple gradient
- `backend`: Green to Teal gradient  
- `database`: Yellow to Orange gradient
- `tools`: Gray to Slate gradient
- `cloud`: Sky to Blue gradient
- `mobile`: Pink to Rose gradient

### Performance

- Single component instance manages all interactions
- Efficient state management with minimal re-renders
- Smooth 60fps animations using requestAnimationFrame
- TypeScript for compile-time optimization

### Integration with 3D Components

To integrate with 3D icon spheres or other complex components:

1. Pass the `handleIconClick` function to your 3D component
2. Calculate screen positions from 3D coordinates
3. Call `handleIconClick` with the icon key and screen position
4. Use `isAnimating` to disable interactions during animations

## Demo

Run the development server and click "Show Interactive Demo" to see the system in action!