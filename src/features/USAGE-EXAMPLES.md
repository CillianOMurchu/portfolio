# Generic HolographicSphere Usage Examples

## Quick Start

```tsx
import { HolographicSphere, createSphereItems } from './features';

// Example 1: Chocolate Bars
const chocolateItems = createSphereItems([
  {
    id: 'snickers',
    name: 'Snickers',
    description: 'Chocolate bar with peanuts and caramel',
    image: '/images/snickers.jpg',
    metadata: { calories: 250, price: 1.50 }
  },
  {
    id: 'kitkat',
    name: 'Kit Kat', 
    description: 'Crispy wafer bars covered in chocolate',
    image: '/images/kitkat.jpg',
    metadata: { calories: 210, price: 1.25 }
  }
]);

<HolographicSphere 
  items={chocolateItems}
  sphereOptions={{ enableClick: true }}
  onItemClick={(item) => console.log('Selected:', item.name)}
/>

// Example 2: Books
const bookItems = createSphereItems([
  {
    id: 'lotr',
    name: 'Lord of the Rings',
    description: 'Epic fantasy adventure',
    image: '/images/lotr.jpg',
    metadata: { author: 'J.R.R. Tolkien', pages: 1216 }
  }
]);

// Example 3: Movies  
const movieItems = createSphereItems([
  {
    id: 'inception',
    name: 'Inception',
    description: 'Mind-bending thriller',
    image: '/images/inception.jpg',
    metadata: { year: 2010, director: 'Christopher Nolan' }
  }
]);
```

## Component Features

✅ **Fully Generic** - Works with any data type  
✅ **Configurable Interactions** - Hover, click, drag  
✅ **Customizable Size** - Width, height, radius, icon size  
✅ **Auto-rotation** - Smooth continuous spinning  
✅ **Visual Effects** - Line animations, descriptions  
✅ **TypeScript Support** - Fully typed interfaces  

## Migration Complete

The original `HolographicSkillsSphere` now uses the generic component internally, maintaining all existing functionality while enabling unlimited customization for any type of data!