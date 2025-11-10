// Debug utilities for the dynamic icon system
// This file helps verify that the dynamic icon loading is working correctly

import { allIcons, getAvailableIconNames, hasIcon } from '../../3dBall.const';

/**
 * Console utility to debug the dynamic icon system
 * Call this function in the browser console to see loaded icons
 */
export const debugIconSystem = async () => {
  console.group('🔍 Dynamic Icon System Debug');
  
  const availableNames = getAvailableIconNames();
  console.log(`📊 Total icons discovered: ${availableNames.length}`);
  console.log('📁 Available icon names:', availableNames);
  
  console.groupCollapsed('🧪 Testing icon loading...');
  
  // Test loading a few sample icons
  const testIcons = ['react', 'typescript', 'javascript', 'python'].filter(name => hasIcon(name));
  
  for (const iconName of testIcons) {
    try {
      const iconEntry = allIcons.find((icon: { name: string; importIcon: () => Promise<{ default: string }> }) => icon.name === iconName);
      if (iconEntry) {
        const module = await iconEntry.importIcon();
        console.log(`✅ ${iconName}: loaded successfully`, module.default);
      } else {
        console.log(`❌ ${iconName}: not found in allIcons`);
      }
    } catch (error) {
      console.log(`❌ ${iconName}: failed to load`, error);
    }
  }
  
  console.groupEnd();
  console.groupEnd();
  
  return {
    totalIcons: availableNames.length,
    availableNames,
    testResults: testIcons
  };
};

// Auto-run debug in development mode
if (import.meta.env.DEV) {
  // Add to window for easy access in browser console
  (window as unknown as Record<string, unknown>).debugIconSystem = debugIconSystem;
  console.log('🛠️ Debug utility available: window.debugIconSystem()');
}