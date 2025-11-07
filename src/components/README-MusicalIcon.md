# MusicalIcon Component

A beautifully animated musical icon component that serves as the entry point to the Music Studio section of the portfolio.

## Features

### 🎯 Interactive Animations
- **Entry Animation**: Scales in from 0 with a 180° rotation and smooth backOut easing
- **Exit Animation**: Scales out to 0 with a 360° rotation while moving off-screen (left and up)
- **Hover Effects**: Scale transformation, gradient color cycling, and enhanced glow effects

### 🎵 Musical Elements
- **Floating Notes**: When hovered, animated musical note symbols (♪, ♫) float around the icon
- **Color Cycling**: Gradient background cycles through purple → pink → red → purple when hovered
- **Pulsing Main Icon**: The central 🎵 emoji scales and rotates rhythmically on hover

### ✨ Visual Effects
- **Ripple Effect**: Expanding border animation creates a ripple-like effect on hover
- **Dynamic Glow**: Blurred background that pulses and scales with the main icon
- **Tooltip Label**: "Music Studio" label appears below on hover with smooth fade-in

### 🎮 Interaction States
- **Hover**: Activates all floating animations and color cycling
- **Click**: Triggers exit animation before page transition
- **Animation Timing**: Staggered delays for floating notes create organic movement

## Props

```typescript
interface MusicalIconProps {
  onExitComplete: () => void;    // Called when exit animation completes
  isAnimatingOut: boolean;       // Controls whether exit animation is active
}
```

## Usage

```tsx
<MusicalIcon 
  onExitComplete={handleTransitionComplete}
  isAnimatingOut={isExiting}
/>
```

## Animation Timeline

1. **Initial State**: Icon enters with 180° counter-rotation and scale from 0
2. **Hover State**: 
   - Gradient color cycling begins (2s loop)
   - Floating musical notes start appearing with staggered delays
   - Main icon begins rhythmic pulsing
   - Ripple effects activate
3. **Click State**: 
   - `isAnimatingOut` becomes true
   - Icon exits with 360° rotation, moving left and up
   - `onExitComplete` fires when animation finishes

## Performance Notes

- Uses Framer Motion's `AnimatePresence` for smooth enter/exit transitions
- Floating notes are conditionally rendered only on hover
- Color cycling uses CSS gradient interpolation for smooth transitions
- All animations use hardware-accelerated properties (scale, rotate, opacity)

## Design Philosophy

The component embodies the creative and interactive nature of the portfolio's music section, using smooth animations and playful elements to create an engaging entry point that hints at the musical content within.