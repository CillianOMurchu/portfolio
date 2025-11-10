import { techIconMap } from "../../3dBall.const";
import { skillsButtonPosition } from "../../../utils/skillsButtonPosition";

// Constants
export const CACHE_KEY = 'portfolio-icon-cache';
export const CACHE_VERSION = '1.0';

// Types
export interface IconLoadState {
  loaded: boolean;
  opacity: number;
  loadTime: number;
  flyProgress: number;
  startX: number;
  startY: number;
  startZ: number;
}

// Global state
export const iconCache: Record<string, HTMLImageElement> = {};
export const iconLoadState: Record<string, IconLoadState> = {};

/**
 * Save icon URLs to localStorage for faster subsequent visits
 */
export function saveIconToCache(tech: string, dataUrl: string): void {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cached[tech] = { dataUrl, version: CACHE_VERSION, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch (error) {
    console.warn('Failed to cache icon:', error);
  }
}

/**
 * Load icon from localStorage cache
 */
export function loadIconFromCache(tech: string): string | null {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const item = cached[tech];
    if (item && item.version === CACHE_VERSION) {
      // Cache is valid for 7 days
      const isExpired = Date.now() - item.timestamp > 7 * 24 * 60 * 60 * 1000;
      if (!isExpired) {
        return item.dataUrl;
      }
    }
  } catch (error) {
    console.warn('Failed to load from cache:', error);
  }
  return null;
}

/**
 * Calculate starting position based on Skills button location
 */
function calculateSkillsButtonPosition(): { x: number; y: number; z: number } {
  let skillsButtonX = 0, skillsButtonY = 0, skillsButtonZ = 0;
  
  if (skillsButtonPosition) {
    const buttonScreenX = skillsButtonPosition.x;
    const buttonScreenY = skillsButtonPosition.y;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    // Convert to canvas 3D coordinates
    skillsButtonY = buttonScreenX - (canvasWidth / 2);
    skillsButtonZ = -(buttonScreenY - (canvasHeight / 2));
    skillsButtonX = 0;
    
    console.log('Using actual button position:', { 
      screenX: buttonScreenX, 
      screenY: buttonScreenY,
      canvasY: skillsButtonY,
      canvasZ: skillsButtonZ
    });
  } else {
    // Fallback to estimated position
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const buttonScreenX = window.innerWidth - 24 - 40;
    const buttonScreenY = 24 + 20;
    
    skillsButtonY = buttonScreenX - (canvasWidth / 2);
    skillsButtonZ = -(buttonScreenY - (canvasHeight / 2));
    skillsButtonX = 0;
    
    console.log('Using estimated button position (fallback)');
  }
  
  return { x: skillsButtonX, y: skillsButtonY, z: skillsButtonZ };
}

/**
 * Load a single icon with caching
 */
async function loadSingleIcon(tech: string): Promise<void> {
  if (iconCache[tech]) {
    return;
  }
  
  // Try loading from cache first
  const cachedDataUrl = loadIconFromCache(tech);
  if (cachedDataUrl) {
    const img = new Image();
    img.src = cachedDataUrl;
    iconCache[tech] = img;
    return;
  }
  
  // Load from dynamic import
  const iconImporter = techIconMap[tech];
  if (!iconImporter) {
    console.warn(`No icon found for ${tech}`);
    return;
  }
  
  const module = await iconImporter();
  const img = new Image();
  
  return new Promise<void>((resolve, reject) => {
    img.onload = () => {
      iconCache[tech] = img;
      
      // Convert to data URL and cache it
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        try {
          const dataUrl = canvas.toDataURL('image/png');
          saveIconToCache(tech, dataUrl);
        } catch (error) {
          console.warn('Failed to create data URL for caching:', error);
        }
      }
      
      resolve();
    };
    
    img.onerror = (error) => {
      console.warn(`Failed to load icon for ${tech}:`, error);
      reject(error);
    };
    
    img.src = module.default;
  });
}

/**
 * Load icons with cascading animation effect
 */
export async function loadIconsCascading(
  techs: string[], 
  onIconLoaded?: (tech: string) => void
): Promise<Record<string, HTMLImageElement>> {
  const startPosition = calculateSkillsButtonPosition();
  
  // Initialize load states
  techs.forEach(tech => {
    iconLoadState[tech] = { 
      loaded: false, 
      opacity: 0, 
      loadTime: 0,
      flyProgress: 0,
      startX: startPosition.x,
      startY: startPosition.y,
      startZ: startPosition.z
    };
  });

  const promises = techs.map((tech, index) => {
    return new Promise<void>((resolve) => {
      // Calculate cascading delay
      const maxDelay = 1200;
      const minDelay = 100;
      const progressRatio = index / Math.max(1, techs.length - 1);
      const delay = maxDelay * Math.pow(0.15, progressRatio * 1.2) + minDelay;
      
      setTimeout(async () => {
        try {
          await loadSingleIcon(tech);
          const state = iconLoadState[tech];
          iconLoadState[tech] = { 
            ...state,
            loaded: true, 
            opacity: 0, 
            loadTime: Date.now() 
          };
          if (onIconLoaded) onIconLoaded(tech);
        } catch (error) {
          console.warn(`Failed to load icon ${tech}:`, error);
        }
        resolve();
      }, delay);
    });
  });

  await Promise.all(promises);
  return iconCache;
}