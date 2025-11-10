// Utility to dynamically import all SVG icons from the assets/programming-icons folder
// This replaces the manual icon list with an automatic discovery system

/**
 * Dynamically discovers and imports all SVG icons from the programming-icons folder.
 * This function uses Vite's import.meta.glob to scan for all .svg files and creates
 * the corresponding import functions automatically.
 */
const createDynamicIconMap = () => {
  // Use Vite's import.meta.glob to get all SVG files in the programming-icons directory
  const iconModules = import.meta.glob('../assets/programming-icons/*.svg');
  
  const allIcons: Array<{ 
    name: string; 
    importIcon: () => Promise<{ default: string }> 
  }> = [];
  
  const techIconMap: Record<string, () => Promise<{ default: string }>> = {};

  // Process each discovered icon file
  Object.entries(iconModules).forEach(([path, importFn]) => {
    // Extract the icon name from the file path
    // Example: '../assets/programming-icons/react.svg' -> 'react'
    const fileName = path.split('/').pop()?.replace('.svg', '') || '';
    
    if (fileName) {
      const iconEntry = {
        name: fileName,
        importIcon: importFn as () => Promise<{ default: string }>
      };
      
      allIcons.push(iconEntry);
      techIconMap[fileName] = iconEntry.importIcon;
    }
  });

  return { allIcons, techIconMap };
};

// Create the dynamic icon collections
const { allIcons, techIconMap } = createDynamicIconMap();

export { allIcons, techIconMap };

// Export a function to get available icon names (useful for debugging)
export const getAvailableIconNames = (): string[] => {
  return allIcons.map(icon => icon.name).sort();
};

// Export a function to check if an icon exists
export const hasIcon = (iconName: string): boolean => {
  return iconName in techIconMap;
};