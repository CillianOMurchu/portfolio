# Simple SVG Sphere System

This is a streamlined system that automatically displays all SVG icons from the `assets/programming-icons` folder directly in the 3D sphere.

## How It Works

1. **Scan SVG Files**: Uses Vite's `import.meta.glob` to find all `.svg` files in `/src/assets/programming-icons/`
2. **Generate Sphere Items**: Automatically creates sphere items with:
   - `id`: filename without `.svg`
   - `name`: formatted display name (e.g., "next-js" → "Next Js")
   - `description`: simple description
   - `image`: path to the SVG file
3. **Display in Sphere**: All items appear directly in the 3D ball

## Usage

### Adding Icons
Simply drop any `.svg` file into `/src/assets/programming-icons/` and it will automatically appear in the sphere.

### Current Icons
- `angular.svg` → "Angular" 

### No Configuration Needed
- ✅ No manual tech data entries required
- ✅ No backend system needed  
- ✅ No complex configuration
- ✅ Just add SVG files and they appear

## Debug Tools

In browser console (development mode):
```javascript
window.debugSVGSphere() // Shows generated sphere items
```

## Files

- `src/features/utils/svgToSphere.ts` - Core SVG scanning logic
- `src/features/HolographicSkillsSphere.tsx` - Updated to use SVG system
- `/src/assets/programming-icons/` - Drop SVG files here

## Testing

To test with more icons:
```bash
# Add any SVG icon to the folder
cp icon.svg /src/assets/programming-icons/
# It will automatically appear in the sphere
```

The system is now completely automated and requires zero configuration!