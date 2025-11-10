# Dynamic Icon System

This directory contains the dynamic icon loading system that automatically discovers and imports all SVG icons from the `assets/programming-icons` folder.

## How It Works

The system uses Vite's `import.meta.glob` to automatically scan for all `.svg` files in the programming icons directory and creates the necessary import functions dynamically.

### Key Features

- **Automatic Discovery**: No need to manually add each icon to the code
- **Lazy Loading**: Icons are only loaded when needed
- **Type Safety**: Full TypeScript support with proper typing
- **Debug Support**: Built-in debugging utilities for development

### Files

- `dynamic-icons.ts` - Core dynamic loading logic
- `debug-icons.ts` - Development debugging utilities

## Usage

### Adding New Icons

1. Simply drop any `.svg` file into `/src/assets/programming-icons/`
2. The system will automatically discover it
3. The icon will be available in the 3D ball with the filename (without `.svg`) as the key

### Available Icons

Currently discovered icons:
- angular, css3, cypress, docker, express, figma, firebase
- github, gitlab, html5, javascript, jest, jira, mongodb
- next-js, nginx, node-js, postgresql, postman, puppeteer
- python, react, rxjs, sass, storybook, tailwindcss
- testing-library, typescript, vercel

### API

```typescript
import { allIcons, techIconMap, getAvailableIconNames, hasIcon } from './3dBall.const';

// Get all available icon names
const iconNames = getAvailableIconNames();

// Check if an icon exists
const exists = hasIcon('react');

// Load an icon dynamically
const iconImporter = techIconMap['react'];
const iconModule = await iconImporter();
```

### Debug Tools

In development mode, use the browser console:

```javascript
// Debug the icon system
window.debugIconSystem();
```

This will show:
- Total number of discovered icons
- List of all available icon names  
- Test loading of common icons

## Migration from Manual System

The old manual import system in `3dBall.const.tsx` has been replaced with this dynamic approach. The API remains the same, so existing code continues to work without changes.

### Benefits

- **Maintainability**: No more manual icon list updates
- **Scalability**: Easily add hundreds of icons without code changes
- **Reliability**: No risk of forgetting to add new icons to the list
- **Performance**: Same lazy loading benefits as before