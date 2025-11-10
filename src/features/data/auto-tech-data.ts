// Auto-generated tech info based on available SVG icons
// This file automatically creates tech entries for any SVG icons found in the assets folder

import type { TechInfo } from '../types/interactiveIcon';

/**
 * Creates a tech info entry for any icon file
 * This provides default information that can be customized later
 */
const createDefaultTechInfo = (iconName: string): TechInfo => {
  // Capitalize and format the name
  const displayName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    name: displayName,
    description: `${displayName} technology for modern development.`,
    image: `/src/assets/programming-icons/${iconName}.svg`,
    details: [
      `Modern ${displayName.toLowerCase()} development`,
      'Industry-standard technology',
      'Used in professional projects',
      'Continuously evolving ecosystem'
    ],
    category: 'tools', // Default category for auto-generated entries
    experience: '1+ years',
    projects: ['Various Projects', 'Learning & Development', 'Professional Work']
  };
};

/**
 * Automatically generates tech info for all available SVG icons
 * This uses Vite's import.meta.glob to scan the assets folder
 */
const generateAutoTechData = (): Record<string, TechInfo> => {
  const iconModules = import.meta.glob('../../assets/programming-icons/*.svg');
  const autoTechData: Record<string, TechInfo> = {};

  Object.keys(iconModules).forEach((path) => {
    // Extract icon name from path: '../../assets/programming-icons/angular.svg' -> 'angular'
    const fileName = path.split('/').pop()?.replace('.svg', '') || '';
    
    if (fileName) {
      autoTechData[fileName] = createDefaultTechInfo(fileName);
    }
  });

  return autoTechData;
};

// Export the auto-generated tech data
export const autoTechData = generateAutoTechData();

// Export a function to get available tech names
export const getAvailableTechNames = (): string[] => {
  return Object.keys(autoTechData).sort();
};

// Export a function to check if a tech exists
export const hasTech = (techName: string): boolean => {
  return techName in autoTechData;
};