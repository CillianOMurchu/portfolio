import React, { useEffect, useRef } from "react";
import { allIcons, techIconMap } from "./3dBall.const";

// Global image cache to prevent reloading icons
const iconCache: Record<string, HTMLImageElement> = {};
const iconLoadState: Record<string, { 
  loaded: boolean; 
  opacity: number; 
  loadTime: number;
  flyProgress: number;
  startX: number;
  startY: number;
  startZ: number;
}> = {};
const CACHE_KEY = 'portfolio-icon-cache';
const CACHE_VERSION = '1.0';

// Save icon URLs to localStorage for faster subsequent visits
function saveIconToCache(tech: string, dataUrl: string) {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cached[tech] = { dataUrl, version: CACHE_VERSION, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch (error) {
    console.warn('Failed to cache icon:', error);
  }
}

// Load icon from localStorage cache
function loadIconFromCache(tech: string): string | null {
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

function loadIconsCascading(techs: string[], onIconLoaded?: (tech: string) => void): Promise<Record<string, HTMLImageElement>> {
  // Initialize load states with fly-in animation properties
  techs.forEach(tech => {
    // Generate random starting positions around the sphere
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 100; // Start 200-300px away from center
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;
    const startZ = (Math.random() - 0.5) * 200; // Random depth
    
    iconLoadState[tech] = { 
      loaded: false, 
      opacity: 0, 
      loadTime: 0,
      flyProgress: 0,
      startX,
      startY,
      startZ
    };
  });

  const promises = techs.map((tech, index) => {
    return new Promise<void>((resolve) => {
      // Calculate accelerating delay - starts slow, gets faster
      const maxDelay = 600; // Maximum delay for first icon
      const minDelay = 30;  // Minimum delay for last icons
      const progressRatio = index / Math.max(1, techs.length - 1);
      
      // Use exponential decay for delay - starts high, drops quickly
      const delay = maxDelay * Math.pow(0.1, progressRatio * 1.5) + minDelay;
      
      setTimeout(() => {
        if (iconCache[tech]) {
          iconLoadState[tech] = { loaded: true, opacity: 0, loadTime: Date.now() }; // Start with 0 opacity for fade-in
          if (onIconLoaded) onIconLoaded(tech);
          resolve();
          return;
        }
        
        // Try loading from cache first
        const cachedDataUrl = loadIconFromCache(tech);
        if (cachedDataUrl) {
          const img = new Image();
          img.src = cachedDataUrl;
          iconCache[tech] = img;
          iconLoadState[tech] = { loaded: true, opacity: 0, loadTime: Date.now() }; // Start with 0 opacity for fade-in
          if (onIconLoaded) onIconLoaded(tech);
          resolve();
          return;
        }
        
        const iconImporter = techIconMap[tech];
        if (!iconImporter) {
          console.warn(`No icon found for ${tech}`);
          resolve();
          return;
        }
        
        iconImporter().then(module => {
          const img = new Image();
          img.src = module.default;
          img.onload = () => {
            iconCache[tech] = img;
            iconLoadState[tech] = { loaded: true, opacity: 0, loadTime: Date.now() };
            
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
            
            if (onIconLoaded) onIconLoaded(tech);
            resolve();
          };
          img.onerror = (error) => {
            console.warn(`Failed to load icon for ${tech}:`, error);
            resolve();
          };
        });
      }, delay);
    });
  });

  return Promise.all(promises).then(() => iconCache);
}

// Update icon opacity for fade-in effect with accelerating timing
function updateIconOpacity(tech: string, deltaTime: number, iconIndex: number, totalIcons: number) {
  const state = iconLoadState[tech];
  if (!state || !state.loaded) return 0;
  
  if (state.opacity < 1) {
    // Calculate fade speed based on icon index - later icons fade in faster
    const progressRatio = iconIndex / Math.max(1, totalIcons - 1);
    const speedMultiplier = 1 + (progressRatio * 2); // Speed increases from 1x to 3x
    const fadeSpeed = 0.003 * speedMultiplier;
    
    state.opacity = Math.min(1, state.opacity + deltaTime * fadeSpeed);
    
    // Add easing for smoother animation
    const easedOpacity = 1 - Math.pow(1 - state.opacity, 2); // Ease-out quad
    state.opacity = easedOpacity;
  }
  
  return state.opacity;
}

interface WordSphereOptions {
  width?: number;
  height?: number;
  radius?: number;
  padding?: number;
  iconSize?: number;
  tilt?: number;
  initialVelocityX?: number;
  initialVelocityY?: number;
  initialRotationX?: number;
  initialRotationZ?: number;
}

interface ThreeDBallProps {
  words?: string[];
  options?: WordSphereOptions;
}

// Extract just the names for the default words array
const defaultWords = allIcons.map((icon) => icon.name);

export const ThreeDBall: React.FC<ThreeDBallProps> = ({
  words = defaultWords, // Use all available icons by default
  options = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef<number>(0);
  const rotationRef = useRef({
    rx: 0,
    rz: 0,
    vx: 0,
    vy: 0,
    clicked: false,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Generate better sphere distribution using golden spiral
    const generateSpherePositions = (count: number) => {
      const positions = [];
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // Range from 1 to -1
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        positions.push({ x, y, z });
      }
      return positions;
    };

    const mergedOptions: WordSphereOptions = {
      tilt: Math.PI / 9,
      initialVelocityX: 0.02,
      initialVelocityY: 0.03,
      initialRotationX: Math.PI * 0.14,
      initialRotationZ: 0,
      ...options,
    };

    // Initialize rotation with options
    rotationRef.current.rx = mergedOptions.initialRotationX || 0;
    rotationRef.current.rz = mergedOptions.initialRotationZ || 0;
    rotationRef.current.vx = mergedOptions.initialVelocityX || 0;
    rotationRef.current.vy = mergedOptions.initialVelocityY || 0;

    const cleanup = setupCanvas(
      canvas,
      mergedOptions,
      rotationRef
    );

    // Start render loop immediately (icons will fade in as they load)
    const renderLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;
      
      drawCanvasWithFadeIn(canvas, words, generateSpherePositions(words.length), mergedOptions, rotationRef.current, deltaTime);
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    // Start cascading icon loading
    loadIconsCascading(words, (tech) => {
      console.log(`Icon loaded: ${tech}`);
    });

    // Start render loop immediately
    animationRef.current = requestAnimationFrame(renderLoop);

    // Cleanup function to remove event listeners and stop animation
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cleanup();
    };
  }, [words, options]);

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ width: "352px", height: "352px" }}
    />
  );
};

/**
 * Setup canvas and event listeners
 * @returns cleanup function to remove event listeners
 */
function setupCanvas(
  canvas: HTMLCanvasElement,
  options: WordSphereOptions,
  rotationRef: React.MutableRefObject<{
    rx: number;
    rz: number;
    vx: number;
    vy: number;
    clicked: boolean;
    lastX: number;
    lastY: number;
  }>
): () => void {
  const {
    width = 500,
    height = 500,
  } = options;

  // canvas setup
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    // Return a no-op cleanup function if context is not available
    return () => {};
  }

  // Hi-DPI support
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(2, 2);

  // Create event handlers as named functions for proper cleanup
  const handleMouseDown = (event: MouseEvent) => {
    rotationRef.current.clicked = true;
    rotationRef.current.lastX = event.screenX;
    rotationRef.current.lastY = event.screenY;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!rotationRef.current.clicked) return;
    const dx = event.screenX - rotationRef.current.lastX;
    const dy = event.screenY - rotationRef.current.lastY;
    rotationRef.current.lastX = event.screenX;
    rotationRef.current.lastY = event.screenY;

    // rotation update
    rotationRef.current.rz += -dy * 0.01;
    rotationRef.current.rx += dx * 0.01;

    // velocity update
    rotationRef.current.vx = dx * 0.1;
    rotationRef.current.vy = dy * 0.1;
  };

  const handleMouseUp = () => (rotationRef.current.clicked = false);
  const handleMouseLeave = () => (rotationRef.current.clicked = false);

  // Add event listeners
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  // Return cleanup function to remove event listeners
  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Draw canvas with fade-in effect for cascading icon loading
 */
function drawCanvasWithFadeIn(
  canvas: HTMLCanvasElement,
  techs: string[],
  positions: { x: number; y: number; z: number }[],
  options: WordSphereOptions,
  rotation: {
    rx: number;
    rz: number;
    vx: number;
    vy: number;
    clicked: boolean;
    lastX: number;
    lastY: number;
  },
  deltaTime: number
): void {
  const {
    width = 500,
    height = 500,
    radius = 150,
    iconSize = 32,
    tilt = 0,
  } = options;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function rot(x: number, y: number, t: number): [number, number] {
    return [
      x * Math.cos(t) - y * Math.sin(t),
      x * Math.sin(t) + y * Math.cos(t),
    ];
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  techs.forEach((tech, i) => {
    if (i >= positions.length) return;

    const pos = positions[i];
    let x = radius * pos.x;
    let y = radius * pos.y;
    let z = radius * pos.z;

    // camera transform
    [y, z] = rot(y, z, tilt);
    [x, z] = rot(x, z, rotation.rz);
    [x, y] = rot(x, y, rotation.rx);

    // convert to cartesian and apply depth-based effects
    const baseAlpha = 0.6 + 0.4 * (x / radius);
    const size = iconSize + 2 + 8 * (x / radius);

    const img = iconCache[tech];
    if (img) {
      // Get cascading fade-in opacity
      const fadeOpacity = updateIconOpacity(tech, deltaTime, i, techs.length);
      const finalAlpha = baseAlpha * fadeOpacity;
      
      ctx.globalAlpha = finalAlpha;
      ctx.drawImage(
        img,
        y + width / 2 - size / 2,
        -z + height / 2 - size / 2,
        size,
        size
      );
      ctx.globalAlpha = 1;
    }
  });

  // Update rotation for next frame
  // Add continuous auto-rotation
  const autoRotationSpeed = 0.005;
  rotation.rx += autoRotationSpeed;
  rotation.rz += autoRotationSpeed * 0.7;

  // deacceleration for mouse interaction
  if (rotation.vx > 0) rotation.vx = rotation.vx - 0.01;
  if (rotation.vy > 0) rotation.vy = rotation.vy - 0.01;
  if (rotation.vx < 0) rotation.vx = rotation.vx + 0.01;
  if (rotation.vy < 0) rotation.vy = rotation.vy + 0.01;

  // Apply mouse interaction velocity
  rotation.rz += rotation.vy * 0.01;
  rotation.rx += rotation.vx * 0.01;
}

export default ThreeDBall;
