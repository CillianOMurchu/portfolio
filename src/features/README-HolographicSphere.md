# HolographicSphere - Generic 3D Sphere Component

A flexible, reusable React component for creating interactive 3D spheres with any type of items.

## Overview

The `HolographicSphere` component generalizes the previous skills-specific sphere to work with any type of data - chocolate bars, movies, books, products, or anything else you can imagine!

## Key Features

- ✨ **Fully Generic** - Works with any data type via `SphereItem` interface
- 🎛️ **Configurable** - Customize size, behavior, interactions via `SphereOptions`
- 🖱️ **Interactive** - Optional hover and click handlers
- 🎨 **Visual Effects** - Optional line animations and descriptions
- 🔄 **Auto-rotation** - Smooth continuous rotation with hover pause
- 📱 **Responsive** - Configurable dimensions and icon sizes

## Basic Usage

```tsx
import { HolographicSphere, createSphereItems } from './features/HolographicSphere';

// Define your items
const myItems = createSphereItems([
  {
    id: 'item1',
    name: 'Item One',
    description: 'Description of item one',
    image: '/path/to/image.jpg',
    category: 'category1'
  },
  // ... more items
]);

// Use the sphere
<HolographicSphere
  items={myItems}
  sphereOptions={{
    width: 200,
    height: 200,
    enableHover: true,
    enableClick: true
  }}
  onItemClick={(item) => console.log('Clicked:', item.name)}
/>
```

## SphereItem Interface

```typescript
interface SphereItem {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Short description
  image: string;                 // Path to image/icon
  details?: string[];            // Optional detailed information
  category?: string;             // Optional category
  metadata?: Record<string, unknown>; // Any additional data
}
```

## SphereOptions

```typescript
interface SphereOptions {
  width?: number;                // Sphere container width (default: 150)
  height?: number;               // Sphere container height (default: 150)
  radius?: number;               // Sphere radius (default: 65)
  iconSize?: number;             // Icon size in pixels (default: 24)
  initialVelocityX?: number;     // Horizontal rotation speed (default: 0.01)
  initialVelocityY?: number;     // Vertical rotation speed (default: 0.015)
  enableHover?: boolean;         // Enable hover interactions (default: true)
  enableClick?: boolean;         // Enable click interactions (default: false)
  allowDragRotation?: boolean;   // Allow mouse drag rotation (default: false)
}
```

## Component Props

```typescript
interface HolographicSphereProps {
  items: SphereItem[];                    // Array of items to display
  sphereOptions?: SphereOptions;          // Sphere configuration
  onItemHover?: (item, position) => void; // Hover callback
  onItemClick?: (item, position) => void; // Click callback
  className?: string;                     // CSS classes
  showDescriptions?: boolean;             // Enable description overlay
  enableLineAnimations?: boolean;         // Enable line animations on interaction
}
```

## Examples

### Chocolate Bars Sphere
```tsx
const chocolateBars = createSphereItems([
  {
    id: 'snickers',
    name: 'Snickers',
    description: 'Chocolate bar with peanuts and caramel',
    image: '/images/snickers.jpg',
    metadata: { calories: 250, price: 1.50 }
  },
  // ... more chocolate bars
]);

<HolographicSphere
  items={chocolateBars}
  onItemClick={(item) => alert(`Selected: ${item.name} - $${item.metadata?.price}`)}
/>
```

### Movie Collection Sphere
```tsx
const movies = createSphereItems([
  {
    id: 'inception',
    name: 'Inception',
    description: 'Mind-bending sci-fi thriller',
    image: '/images/inception.jpg',
    metadata: { 
      year: 2010, 
      director: 'Christopher Nolan',
      rating: 8.8 
    }
  },
  // ... more movies
]);
```

### Product Catalog Sphere
```tsx
const products = createSphereItems([
  {
    id: 'laptop',
    name: 'Gaming Laptop',
    description: 'High-performance laptop for gaming',
    image: '/images/laptop.jpg',
    category: 'electronics',
    metadata: { 
      price: 1299.99,
      brand: 'TechCorp',
      specs: { ram: '16GB', storage: '512GB SSD' }
    }
  },
  // ... more products
]);
```

## Migration from Skills Sphere

The original `HolographicSkillsSphere` now uses the generic component internally:

```tsx
// Old way (still works)
<HolographicSkillsSphere />

// New equivalent
<HolographicSphere
  items={convertTechDataToSphereItems(techInfoData)}
  sphereOptions={{
    width: 150,
    height: 150,
    enableHover: true,
    enableClick: false
  }}
/>
```

## Utility Functions

- `createSphereItems(items)` - Convert partial data to full SphereItem objects
- `convertTechDataToSphereItems(techData)` - Convert existing tech data format

## Customization Tips

1. **Size Scaling**: Adjust `width`, `height`, `radius`, and `iconSize` proportionally
2. **Rotation Speed**: Lower values for `initialVelocityX/Y` = slower rotation
3. **Interactions**: Disable `enableHover` for pure visual display
4. **Visual Effects**: Enable `showDescriptions` and `enableLineAnimations` for rich interactions
5. **Data Structure**: Use `metadata` for any custom properties specific to your domain

## Performance Notes

- Items are memoized for optimal re-rendering
- Large datasets (50+ items) may affect performance
- Consider lazy loading images for better initial load times
- The 3D sphere uses canvas rendering for smooth animations