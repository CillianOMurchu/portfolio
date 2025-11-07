import type { TechInfo } from '../types/interactiveIcon';
import type { SphereItem } from '../types/holographicSphere';

/**
 * Convert tech data to generic sphere items
 */
export const convertTechDataToSphereItems = (techData: Record<string, TechInfo>): SphereItem[] => {
  return Object.entries(techData).map(([id, tech]) => ({
    id,
    name: tech.name,
    description: tech.description,
    image: tech.image,
    details: tech.details,
    category: tech.category,
    metadata: {
      experience: tech.experience,
      projects: tech.projects
    }
  }));
};

/**
 * Create sphere items for any type of data
 * Usage example for chocolate bars:
 * 
 * const chocolateBars: SphereItem[] = createSphereItems([
 *   {
 *     id: 'snickers',
 *     name: 'Snickers',
 *     description: 'Chocolate bar with peanuts and caramel',
 *     image: '/images/snickers.jpg',
 *     category: 'candy',
 *     metadata: { calories: 250, price: 1.50 }
 *   }
 * ]);
 */
export const createSphereItems = (items: Partial<SphereItem>[]): SphereItem[] => {
  return items.map((item, index) => ({
    id: item.id || `item-${index}`,
    name: item.name || 'Unknown Item',
    description: item.description || '',
    image: item.image || '',
    details: item.details || [],
    category: item.category || 'default',
    metadata: item.metadata || {}
  }));
};