# Auto Tech Data System

This system automatically generates tech entries for any SVG icons found in the `/src/assets/programming-icons/` folder.

## How It Works

1. **Scans for Icons**: Uses Vite's `import.meta.glob` to find all `.svg` files
2. **Auto-generates Tech Info**: Creates default tech entries for each icon
3. **Displays in Sphere**: All icons automatically appear in the 3D ball

## Usage

### Adding New Technologies
Simply drop any `.svg` icon file into `/src/assets/programming-icons/` and it will:
- ✅ Automatically appear in the 3D sphere
- ✅ Have default tech information generated
- ✅ Be clickable with hover effects

### Customizing Tech Information
To override the auto-generated info with custom details:

1. Add an entry to the appropriate category file (e.g., `frontend.ts`, `backend.ts`)
2. Use the same key as the SVG filename (without `.svg`)
3. Your custom entry will override the auto-generated one

Example in `frontend.ts`:
```typescript
export const frontendTech: Record<string, TechInfo> = {
  react: {
    name: 'React',
    description: 'Custom description for React',
    // ... custom details
  }
};
```

## Current Status
- 📁 Icons detected: `angular.svg`
- 🎯 Technologies in sphere: 1
- ✨ Auto-generation: Active

## Testing the System

To test with more icons, try adding some common ones like:
- `react.svg`
- `typescript.svg` 
- `javascript.svg`
- `python.svg`

The system will immediately detect them and add to the sphere!

## Debug Info

In browser console (dev mode):
```javascript
window.debugIconSystem() // Shows dynamic icon loading
window.debugAutoTechData() // Shows auto-generated tech entries (coming soon)
```