# ShimmerEffect

## Overview
A shimmer effect component that creates a smooth, animated light sweep across content. Perfect for loading states, highlighting important elements, or adding visual interest to headings and UI components.

## Usage
```typescript
import { ShimmerEffect } from '@/features/visual-effects'

// Basic usage
<ShimmerEffect>
  <h1>Your content here</h1>
</ShimmerEffect>

// With customization
<ShimmerEffect 
  intensity="high"
  speed="slow"
  className="mb-4"
>
  <div>Enhanced shimmer content</div>
</ShimmerEffect>
```

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| children | ReactNode | No | - | Content to apply shimmer effect over |
| intensity | 'low' \| 'medium' \| 'high' | No | 'medium' | Brightness of the shimmer effect |
| speed | 'slow' \| 'normal' \| 'fast' | No | 'normal' | Speed of the shimmer animation |
| width | string | No | '100%' | Width of the shimmer container |
| height | string | No | 'auto' | Height of the shimmer container |
| className | string | No | '' | Additional CSS classes |

## Animation Details
- **Entry animation**: Smooth horizontal sweep from left to right
- **Timing**: Configurable speed (1s fast, 2s normal, 3s slow)
- **Easing**: Linear progression for consistent movement
- **Repeat**: Infinite loop animation
- **Performance**: Uses Framer Motion with GPU acceleration

## Implementation
The component uses:
- **Framer Motion** for smooth animations
- **CSS gradients** for the shimmer effect
- **Absolute positioning** for overlay technique
- **Transform3d** for hardware acceleration

## Examples

### Loading State
```tsx
<ShimmerEffect intensity="low" speed="fast">
  <div className="w-full h-4 bg-gray-200 rounded" />
</ShimmerEffect>
```

### Hero Heading
```tsx
<ShimmerEffect intensity="high" speed="slow">
  <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
</ShimmerEffect>
```

### Button Enhancement
```tsx
<ShimmerEffect intensity="medium" speed="normal">
  <button className="px-6 py-3 bg-blue-600 text-white rounded">
    Click Me
  </button>
</ShimmerEffect>
```

## Testing
```bash
npm run test -- src/features/visual-effects/tests/
```

**Test Coverage:**
- ✅ Component rendering
- ✅ Props handling
- ✅ Animation presence
- ✅ CSS class application

## Dependencies
- framer-motion: Animation library
- react: Core React functionality

## Performance Considerations
- Uses `transform` for animations (GPU accelerated)
- Minimal re-renders with proper prop handling
- Efficient gradient calculations
- Compatible with React Concurrent Features

## Browser Support
- Modern browsers with CSS transform support
- Graceful degradation for older browsers
- Mobile-optimized performance

## Integration Notes
- Works seamlessly with Tailwind CSS
- Compatible with other animation libraries
- Can be nested within other motion components
- Supports server-side rendering (SSR)