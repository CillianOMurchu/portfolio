# 3D Rotating Icons

A 3D interactive component that displays technology icons in a rotating sphere formation, responding to mouse movement for an engaging user experience.

## Features

- **3D Visualization**: Uses Three.js and React Three Fiber for smooth 3D rendering
- **Mouse Interaction**: Icons rotate and respond to mouse position for dynamic interaction
- **Auto Rotation**: Continuous gentle rotation with OrbitControls for manual manipulation
- **Floating Animation**: Subtle floating motion for each icon to add life to the scene
- **Technology Stack Display**: Shows key technologies used in the portfolio

## Usage

```tsx
import { RotatingIcons3D } from '@/features/three-d-effects';

function MyComponent() {
  return (
    <RotatingIcons3D 
      className="my-custom-styles"
      width="800px"
      height="600px"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `width` | `string` | `'100%'` | Container width |
| `height` | `string` | `'400px'` | Container height |

## Technology Icons

The component displays the following technology icons:
- React
- TypeScript 
- Three.js
- Supabase
- Vite
- Tailwind CSS
- Framer Motion
- Vitest

## Interactive Behaviors

1. **Mouse Movement**: Move mouse over the component to influence rotation
2. **Manual Control**: Drag to manually rotate the scene
3. **Auto Rotation**: Gentle automatic rotation when not interacting
4. **Floating Motion**: Each icon has a subtle up-and-down floating animation

## Implementation Details

- Built with React Three Fiber for React integration with Three.js
- Uses `useFrame` hook for smooth animation loops
- Mouse position converted to 3D rotation influence
- Drei library provides Text and OrbitControls components
- Responsive design with configurable dimensions

## Performance Considerations

- Optimized for 60fps rendering
- Minimal re-renders using refs for animation state
- Efficient mouse event handling with proper cleanup
- Uses Three.js built-in performance optimizations