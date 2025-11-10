import React from 'react';
import { motion } from 'framer-motion';
import { HolographicSphere, createSphereItems } from '../features';
import type { SphereItem } from '../features/types/holographicSphere';

interface BarebellsPageProps {
  onBack: () => void;
}

// Barebells chocolate bar data
const bareBellsData: Partial<SphereItem>[] = [
  {
    id: 'caramel-cashew',
    name: 'Caramel Cashew',
    description: 'Smooth caramel with crunchy cashews',
    image: '/images/barebells/caramel-cashew.jpg',
    category: 'protein-bar',
    metadata: { 
      protein: '20g', 
      calories: 199,
      flavor: 'Sweet & Nutty',
      ingredients: ['cashew', 'caramel', 'protein', 'chocolate']
    }
  },
  {
    id: 'cookies-cream',
    name: 'Cookies & Cream',
    description: 'Classic cookies and cream flavor',
    image: '/images/barebells/cookies-cream.jpg',
    category: 'protein-bar',
    metadata: { 
      protein: '20g', 
      calories: 199,
      flavor: 'Sweet & Creamy',
      ingredients: ['cookies', 'cream', 'protein', 'chocolate']
    }
  },
  {
    id: 'salty-peanut',
    name: 'Salty Peanut',
    description: 'Perfect balance of salty and sweet',
    image: '/images/barebells/salty-peanut.jpg',
    category: 'protein-bar',
    metadata: { 
      protein: '20g', 
      calories: 199,
      flavor: 'Salty & Sweet',
      ingredients: ['peanuts', 'salt', 'protein', 'chocolate']
    }
  },
  {
    id: 'coconut-cocoa',
    name: 'Coconut Cocoa',
    description: 'Tropical coconut meets rich cocoa',
    image: '/images/barebells/coconut-cocoa.jpg',
    category: 'protein-bar',
    metadata: { 
      protein: '20g', 
      calories: 199,
      flavor: 'Tropical & Rich',
      ingredients: ['coconut', 'cocoa', 'protein', 'chocolate']
    }
  },
  {
    id: 'mint-dark-chocolate',
    name: 'Mint Dark Chocolate',
    description: 'Refreshing mint with dark chocolate',
    image: '/images/barebells/mint-chocolate.jpg',
    category: 'protein-bar',
    metadata: { 
      protein: '20g', 
      calories: 199,
      flavor: 'Fresh & Dark',
      ingredients: ['mint', 'dark chocolate', 'protein']
    }
  },
  {
    id: 'vanilla-milkshake',
    name: 'Vanilla Milkshake',
    description: 'Creamy vanilla milkshake taste',
    image: '/images/barebells/vanilla-milkshake.jpg',
    category: 'protein-bar',
    metadata: { 
      protein: '20g', 
      calories: 199,
      flavor: 'Creamy & Vanilla',
      ingredients: ['vanilla', 'milk protein', 'cream']
    }
  }
];

export const BarebellsPage: React.FC<BarebellsPageProps> = ({ onBack }) => {
  const barebellsItems = createSphereItems(bareBellsData);

  const handleBarebellClick = (item: SphereItem, position: { x: number; y: number }) => {
    console.log(`Selected Barebell: ${item.name}`, {
      details: item.description,
      protein: item.metadata?.protein,
      calories: item.metadata?.calories,
      flavor: item.metadata?.flavor,
      position
    });
    
    // Could open a detailed nutrition view, add to cart, etc.
    alert(`${item.name} - ${item.metadata?.protein} protein, ${item.metadata?.calories} calories`);
  };

  const handleBarebellHover = (item: SphereItem | null, position: { x: number; y: number } | null) => {
    if (item && position) {
      console.log(`Hovering over ${item.name}:`, {
        description: item.description,
        protein: item.metadata?.protein,
        flavor: item.metadata?.flavor,
        position
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex flex-col items-center justify-center min-h-screen relative"
      >
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="absolute top-8 left-8 px-6 py-3 btn-glass rounded-xl font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Home
        </motion.button>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-glass mb-4">
            🍫 Barebells
          </h1>
          <p className="text-xl text-glass-secondary max-w-2xl mx-auto">
            Discover the delicious world of protein bars that taste like candy bars
          </p>
        </motion.div>

        {/* Interactive Barebells Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <HolographicSphere
            items={barebellsItems}
            sphereOptions={{
              width: 280,
              height: 280,
              radius: 110,
              iconSize: 36,
              initialVelocityX: 0.008,
              initialVelocityY: 0.012,
              enableHover: true,
              enableClick: true,
              allowDragRotation: false
            }}
            onItemHover={handleBarebellHover}
            onItemClick={handleBarebellClick}
            className="mx-auto"
            showDescriptions={false}
            enableLineAnimations={true}
          />
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-8 max-w-lg mx-auto"
        >
          <p className="text-glass-secondary">
            Hover over the sphere to see different Barebell flavors. Click on any bar to see its nutritional information!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BarebellsPage;