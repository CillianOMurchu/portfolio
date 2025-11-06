# Piano Loading Component

A beautiful, interactive piano keyboard loading screen with cascading key animations and floating musical notes.

## Features

- **21 White Keys + 15 Black Keys**: Realistic piano layout across 3 octaves
- **Cascading Animation**: Keys animate in sequence with staggered delays
- **Floating Musical Notes**: Dynamic ♪ and ♫ symbols with floating animations
- **Progress Bar**: Smooth gradient progress indicator
- **Animated Background**: Subtle blob animations with color mixing
- **Debug Mode**: Special development mode for styling and testing

## Usage

### Normal Mode
```tsx
<PianoLoading 
  onComplete={() => setLoading(false)}
  duration={3500}
/>
```

### Debug Mode
Access debug mode by adding `?debug=loading` to your URL:
```
http://localhost:5173/?debug=loading
```

## Debug Mode Features

### Visual Indicators
- **Glow Border**: Debug panel has animated purple glow
- **Status Indicators**: Real-time animation state and timer
- **Key Interaction**: Click piano keys to test hover effects
- **Color-coded Status**: Green for active, yellow for pending

### Controls
- **Exit Debug**: Return to normal application
- **Reset Timer**: Restart the countdown timer
- **ESC Key**: Quick exit from debug mode
- **Key Clicking**: Test individual piano key interactions

### Debug Panel Information
- Current URL parameter
- Animation duration and remaining time
- Key count (white/black)
- Animation state (Active/Pending)
- Interactive instructions

## Styling Customization

### CSS Classes Available
- `.animate-piano-key`: White key press animation
- `.animate-piano-key-black`: Black key press animation  
- `.animate-float-note`: Musical note floating up
- `.animate-float-note-reverse`: Musical note floating down
- `.animate-loading-bar`: Progress bar fill animation
- `.animate-blob`: Background blob movement
- `.animate-glow-border`: Debug mode glow effect
- `.animate-pulse-debug`: Debug info pulsing

### Animation Timing
- **Key Animation**: 0.8s ease-out with staggered delays
- **Musical Notes**: 4-5s linear infinite loops
- **Progress Bar**: Matches component duration
- **Background Blobs**: 7s infinite movement cycles

## Development Tips

1. **Use Debug Mode** for styling adjustments:
   ```
   npm run dev
   # Then visit: http://localhost:5173/?debug=loading
   ```

2. **Test Key Interactions** by clicking piano keys in debug mode

3. **Adjust Timing** by modifying the `duration` prop

4. **Customize Colors** by updating Tailwind classes or CSS animations

5. **Monitor Performance** using browser dev tools while in debug mode

## Performance Considerations

- Uses CSS transforms for smooth 60fps animations
- Optimized z-index layering for proper key rendering
- Efficient animation delays prevent layout thrashing
- Lightweight DOM structure with minimal re-renders

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS animations and transforms
- ES6+ JavaScript features
- Responsive design for mobile and desktop