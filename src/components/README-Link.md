# Link Component

A unified, reusable navigation link component that replaces the separate MusicalIcon and BarebellsIcon components with a single, configurable solution.

## Features

### 🎨 Fully Customizable
- **Icon**: Any emoji or symbol
- **Particles**: Custom floating animation elements  
- **Colors**: Configurable glow and shadow colors
- **Text Color**: Customizable text styling

### ⚡ Uniform Animation System
- **Hover-Only Animations**: All effects only trigger on hover
- **Consistent Timing**: Standardized duration and easing across all instances
- **No Infinite Loops**: Animations properly stop when hover ends
- **Smooth Transitions**: 0.3s return to static state

### 🔧 Props Interface

```typescript
interface LinkProps {
  onExitComplete: () => void;      // Callback when exit animation completes
  isAnimatingOut: boolean;         // Controls exit animation state
  isClicked?: boolean;             // Optional glow effect for clicked state
  icon: string;                    // Main emoji/symbol to display
  particles: string[];             // Array of particles for hover effect
  glowColor: string;               // Hex color for glow/ripple effects
  shadowColor: string;             // Drop shadow color with opacity
  textColor?: string;              // Tailwind text color class (default: text-white)
}
```

## Usage Examples

### Music Link
```tsx
<Link 
  onExitComplete={handleMusicExit}
  isAnimatingOut={isMusicAnimating}
  isClicked={clickedIcon === 'music'}
  icon="🎵"
  particles={["♪", "♫"]}
  glowColor="#a855f7"
  shadowColor="rgba(168, 85, 247, 0.6)"
  textColor="text-white"
/>
```

### Barebells Link  
```tsx
<Link 
  onExitComplete={handleBarebellsExit}
  isAnimatingOut={isBarebellsAnimating}
  isClicked={clickedIcon === 'barebells'}
  icon="🍫"
  particles={["🍫", "🍪"]}
  glowColor="#f59e0b"
  shadowColor="rgba(245, 158, 11, 0.6)"
  textColor="text-amber-200"
/>
```

### Custom Link
```tsx
<Link 
  icon="🚀"
  particles={["⭐", "✨"]}
  glowColor="#06b6d4"
  shadowColor="rgba(6, 182, 212, 0.6)"
  textColor="text-cyan-200"
  // ...other props
/>
```

## Animation Behavior

### Static State (Not Hovered)
- Icon at normal size (scale: 1) and rotation (0°)
- Subtle glow effect at low opacity (0.1)
- No particle animations
- Clean, minimal appearance

### Hover State
- Icon scales and rotates in loop: `[1, 1.2, 1]` and `[0, 10, -10, 0]`
- Particle effects appear and animate infinitely
- Ripple border effect expands from center
- Glow effect pulses between opacity levels
- All animations use `repeat: Infinity`

### Hover End
- All infinite loops immediately stop (`repeat: 0`)
- Icon returns to static state in 0.3s
- Particles disappear via `AnimatePresence`
- Glow fades to static level
- Ripple effect stops

### Click & Exit
- Clicked icon receives enhanced glow and shadow
- Upward fade animation (-80px) with scale increase
- Cascade timing: primary icon → 100ms delay → secondary icon
- Page transition triggered by primary icon's completion

## Benefits

### 🔄 Code Reusability
- Single component handles all navigation links
- Easy to add new links with different themes
- Consistent behavior across all instances
- Reduced bundle size (removed duplicate code)

### 🎭 Visual Consistency  
- Uniform animation timing and easing
- Standardized hover and click behaviors
- Consistent sizing and layout
- Professional, cohesive design

### 🚀 Performance Optimization
- No continuous animations when not in use
- Efficient AnimatePresence for particles
- Minimal re-renders with proper state management
- Hardware-accelerated transforms

### 🛠️ Maintainability
- Single source of truth for link animations
- Easy to update all links at once
- Clear, documented prop interface
- Simplified testing and debugging

This unified approach eliminates code duplication while providing maximum flexibility for creating themed navigation links with consistent, professional animations.