// Simple SVG to Sphere Items converter
// Directly converts SVG files in assets/programming-icons to sphere items

import type { SphereItem } from '../types/holographicSphere';

/**
 * Directly generates sphere items from available SVG icons
 * This bypasses the complex tech data system and just uses the SVG files
 */
const generateSphereItemsFromSVGs = (): SphereItem[] => {
  // Use Vite's import.meta.glob to get all SVG files
  const iconModules = import.meta.glob('../../assets/programming-icons/*.svg');
  const sphereItems: SphereItem[] = [];

  Object.keys(iconModules).forEach((path) => {
    // Extract icon name from path: '../../assets/programming-icons/angular.svg' -> 'angular'
    const fileName = path.split('/').pop()?.replace('.svg', '') || '';
    
    if (fileName) {
      // Create a simple sphere item
      const displayName = fileName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      sphereItems.push({
        id: fileName,
        name: displayName,
        description: `${displayName} technology`,
        image: `/src/assets/programming-icons/${fileName}.svg`,
        details: [`${displayName} development`],
        category: 'technology'
      });
    }
  });

  return sphereItems;
};

/**
 * Creates a techIconMap compatible with the existing 3D ball system
 * This maps icon names to import functions for the existing icon loading system
 */
const generateTechIconMapFromSVGs = (): Record<string, () => Promise<{ default: string }>> => {
  const iconModules = import.meta.glob('../../assets/programming-icons/*.svg');
  const techIconMap: Record<string, () => Promise<{ default: string }>> = {};

  Object.entries(iconModules).forEach(([path, importFn]) => {
    const fileName = path.split('/').pop()?.replace('.svg', '') || '';
    if (fileName) {
      techIconMap[fileName] = importFn as () => Promise<{ default: string }>;
    }
  });

  return techIconMap;
};

/**
 * Get list of available SVG icons for debugging
 */
const getAvailableSVGIcons = (): string[] => {
  const iconModules = import.meta.glob('../../assets/programming-icons/*.svg');
  return Object.keys(iconModules)
    .map(path => path.split('/').pop()?.replace('.svg', '') || '')
    .filter(name => name)
    .sort();
};

/**
 * Debug function for development - shows what sphere items will be generated
 */
const debugSVGSphere = () => {
  const items = generateSphereItemsFromSVGs();
  console.group('🔍 SVG Sphere Debug');
  console.log(`📊 Total sphere items: ${items.length}`);
  console.log('📋 Generated items:');
  items.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.name} (${item.id})`);
    console.log(`     Image: ${item.image}`);
    console.log(`     Description: ${item.description}`);
  });
  console.groupEnd();
  return items;
};

// Auto-run debug in development mode
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).debugSVGSphere = debugSVGSphere;
  console.log('🛠️ SVG Debug utility available: window.debugSVGSphere()');
}

// Export all functions
export { generateSphereItemsFromSVGs, generateTechIconMapFromSVGs, getAvailableSVGIcons, debugSVGSphere };