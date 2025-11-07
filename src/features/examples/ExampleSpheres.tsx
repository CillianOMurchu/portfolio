import React from 'react';
import { HolographicSphere } from '../HolographicSphere';
import { createSphereItems } from '../utils/sphereData';
import type { SphereItem } from '../types/holographicSphere';

// Example: Chocolate bars sphere
const chocolateData: Partial<SphereItem>[] = [
  {
    id: 'snickers',
    name: 'Snickers',
    description: 'Chocolate bar with peanuts and caramel',
    image: '/images/chocolate/snickers.jpg',
    category: 'candy',
    metadata: { 
      calories: 250, 
      price: 1.50,
      brand: 'Mars',
      ingredients: ['chocolate', 'peanuts', 'caramel', 'nougat']
    }
  },
  {
    id: 'kitkat',
    name: 'Kit Kat',
    description: 'Crispy wafer bars covered in chocolate',
    image: '/images/chocolate/kitkat.jpg',
    category: 'candy',
    metadata: { 
      calories: 210, 
      price: 1.25,
      brand: 'Nestlé',
      ingredients: ['chocolate', 'wafer', 'sugar', 'cocoa']
    }
  },
  {
    id: 'twix',
    name: 'Twix',
    description: 'Caramel cookie bars covered in chocolate',
    image: '/images/chocolate/twix.jpg',
    category: 'candy',
    metadata: { 
      calories: 280, 
      price: 1.75,
      brand: 'Mars',
      ingredients: ['chocolate', 'caramel', 'cookie', 'sugar']
    }
  },
  {
    id: 'mars',
    name: 'Mars Bar',
    description: 'Chocolate bar with soft nougat and caramel',
    image: '/images/chocolate/mars.jpg',
    category: 'candy',
    metadata: { 
      calories: 230, 
      price: 1.40,
      brand: 'Mars',
      ingredients: ['chocolate', 'nougat', 'caramel', 'glucose']
    }
  },
  {
    id: 'bounty',
    name: 'Bounty',
    description: 'Coconut chocolate bar',
    image: '/images/chocolate/bounty.jpg',
    category: 'candy',
    metadata: { 
      calories: 285, 
      price: 1.60,
      brand: 'Mars',
      ingredients: ['chocolate', 'coconut', 'sugar', 'glucose']
    }
  },
  {
    id: 'milkyway',
    name: 'Milky Way',
    description: 'Fluffy nougat chocolate bar',
    image: '/images/chocolate/milkyway.jpg',
    category: 'candy',
    metadata: { 
      calories: 240, 
      price: 1.35,
      brand: 'Mars',
      ingredients: ['chocolate', 'nougat', 'caramel', 'malt']
    }
  }
];

export const HolographicChocolateSphere: React.FC = () => {
  const chocolateItems = createSphereItems(chocolateData);

  const handleChocolateHover = (item: SphereItem | null, position: { x: number; y: number } | null) => {
    if (item && position) {
      console.log(`Hovering over ${item.name}:`, {
        description: item.description,
        calories: item.metadata?.calories,
        brand: item.metadata?.brand,
        position
      });
    }
  };

  const handleChocolateClick = (item: SphereItem, position: { x: number; y: number }) => {
    console.log(`Clicked on ${item.name}:`, {
      details: item.details,
      ingredients: item.metadata?.ingredients,
      price: item.metadata?.price,
      position
    });
    
    // Example: Could open a detailed view, add to cart, etc.
    alert(`Selected: ${item.name} - $${item.metadata?.price}`);
  };

  return (
    <HolographicSphere
      items={chocolateItems}
      sphereOptions={{
        width: 200,
        height: 200,
        radius: 80,
        iconSize: 32,
        initialVelocityX: 0.008,
        initialVelocityY: 0.012,
        enableHover: true,
        enableClick: true,
        allowDragRotation: false
      }}
      onItemHover={handleChocolateHover}
      onItemClick={handleChocolateClick}
      className="mx-auto"
      showDescriptions={true}
      enableLineAnimations={true}
    />
  );
};

// Example: Simple sphere with minimal config
export const SimpleItemSphere: React.FC<{ items: SphereItem[] }> = ({ items }) => {
  return (
    <HolographicSphere
      items={items}
      sphereOptions={{
        enableHover: true,
        enableClick: false
      }}
      className="my-4"
    />
  );
};

// Example: Large interactive sphere
export const InteractiveSphere: React.FC<{ 
  items: SphereItem[];
  onItemSelect?: (item: SphereItem) => void;
}> = ({ items, onItemSelect }) => {
  return (
    <HolographicSphere
      items={items}
      sphereOptions={{
        width: 300,
        height: 300,
        radius: 120,
        iconSize: 40,
        enableHover: true,
        enableClick: true,
        allowDragRotation: true
      }}
      onItemClick={(item: SphereItem) => onItemSelect?.(item)}
      showDescriptions={true}
      enableLineAnimations={true}
    />
  );
};