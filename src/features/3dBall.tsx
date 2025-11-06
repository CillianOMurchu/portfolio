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
  // Initialize load states with dramatic dive-in animation properties
  techs.forEach(tech => {
    // Icons start much closer to the viewer and to the side of the sphere
    const startX = (Math.random() - 0.5) * 400; // Random horizontal spread wider
    const startY = -50 - Math.random() * 100; // Start slightly above the sphere (-50 to -150)
    const startZ = 300 + Math.random() * 100; // Start much closer to viewer (300-400 Z)
    
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
      // Calculate slower cascading delay - much more dramatic timing
      const maxDelay = 1200; // Maximum delay for first icon (doubled)
      const minDelay = 100;   // Minimum delay for last icons (increased)
      const progressRatio = index / Math.max(1, techs.length - 1);
      
      // Use exponential decay for delay - starts high, drops more gradually
      const delay = maxDelay * Math.pow(0.15, progressRatio * 1.2) + minDelay;
      
      setTimeout(() => {
        if (iconCache[tech]) {
          const state = iconLoadState[tech];
          iconLoadState[tech] = { 
            ...state,
            loaded: true, 
            opacity: 0, 
            loadTime: Date.now() 
          }; // Start with 0 opacity for fade-in
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
          const state = iconLoadState[tech];
          iconLoadState[tech] = { 
            ...state,
            loaded: true, 
            opacity: 0, 
            loadTime: Date.now() 
          }; // Start with 0 opacity for fade-in
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
            const state = iconLoadState[tech];
            iconLoadState[tech] = { 
              ...state,
              loaded: true, 
              opacity: 0, 
              loadTime: Date.now() 
            };
            
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

// Update icon opacity and dramatic dive-in animation
function updateIconOpacity(tech: string, deltaTime: number, iconIndex: number, totalIcons: number) {
  const state = iconLoadState[tech];
  if (!state || !state.loaded) return { opacity: 0, flyProgress: 0 };
  
  // Update dive-in progress - much slower for more dramatic effect
  if (state.flyProgress < 1) {
    // Calculate dive speed based on icon index - very gradual speed increase
    const progressRatio = iconIndex / Math.max(1, totalIcons - 1);
    const speedMultiplier = 1 + (progressRatio * 0.3); // Speed increases from 1x to 1.3x (much more gradual)
    const diveSpeed = 0.0008 * speedMultiplier; // Much slower base speed for dramatic dive motion
    
    state.flyProgress = Math.min(1, state.flyProgress + deltaTime * diveSpeed);
  }
  
  // Start fading in early for visibility during dive
  if (state.flyProgress > 0.05 && state.opacity < 1) {
    // Calculate fade speed - also slower for better visibility
    const progressRatio = iconIndex / Math.max(1, totalIcons - 1);
    const speedMultiplier = 1 + (progressRatio * 1.0); // Speed increases from 1x to 2x
    const fadeSpeed = 0.004 * speedMultiplier; // Slower fade for better control
    
    state.opacity = Math.min(1, state.opacity + deltaTime * fadeSpeed);
    
    // Add easing for smoother fade animation (ease-out quad)
    const easedOpacity = 1 - Math.pow(1 - state.opacity, 2);
    state.opacity = easedOpacity;
  }
  
  return { opacity: state.opacity, flyProgress: state.flyProgress };
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
    lastY: 0,
    hovering: false,
    lastMouseX: 0,
    lastMouseY: 0,
    autoRotationDirectionX: 1,
    autoRotationDirectionZ: 1,
    pausedRx: 0,
    pausedRz: 0,
    hoverStartTime: 0,
    prevMouseX: 0,
    prevMouseY: 0
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
      className="block cursor-pointer"
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
    hovering: boolean;
    lastMouseX: number;
    lastMouseY: number;
    autoRotationDirectionX: number;
    autoRotationDirectionZ: number;
    pausedRx: number;
    pausedRz: number;
    hoverStartTime: number;
    prevMouseX: number;
    prevMouseY: number;
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
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Always track mouse position for exit direction calculation
    rotationRef.current.lastMouseX = event.clientX;
    rotationRef.current.lastMouseY = event.clientY;
    
    // Calculate distance from center to determine if cursor is over sphere
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Use sphere radius for hit detection (assuming sphere takes up most of the canvas)
    const sphereRadius = Math.min(rect.width, rect.height) * 0.4; // Adjust this value as needed
    const isOverSphere = distanceFromCenter <= sphereRadius;
    
    // If we're starting to hover, store the current rotation position and time
    if (isOverSphere && !rotationRef.current.hovering) {
      rotationRef.current.pausedRx = rotationRef.current.rx;
      rotationRef.current.pausedRz = rotationRef.current.rz;
      rotationRef.current.hoverStartTime = Date.now();
    }
    
    // Track previous mouse position for velocity calculation
    if (rotationRef.current.hovering) {
      rotationRef.current.prevMouseX = rotationRef.current.lastMouseX;
      rotationRef.current.prevMouseY = rotationRef.current.lastMouseY;
    }
    
    // Update hovering state based on sphere hit detection
    rotationRef.current.hovering = isOverSphere;
    
    if (!rotationRef.current.clicked && isOverSphere) {
      // Calculate smooth pause transition
      const hoverDuration = Date.now() - rotationRef.current.hoverStartTime;
      const pauseTransitionTime = 300; // 300ms to smoothly transition to paused state
      const pauseProgress = Math.min(1, hoverDuration / pauseTransitionTime);
      const smoothPause = 1 - Math.pow(1 - pauseProgress, 3); // Cubic ease-out for smooth transition
      
      // Gentle opposite movement on hover (only when over sphere)
      // Calculate distance from center (normalized to -1 to 1)
      const normalizedDeltaX = deltaX / sphereRadius;
      const normalizedDeltaY = deltaY / sphereRadius;
      
      // Apply small adjustments to the paused position, with smooth transition
      const sensitivity = 0.08; // Even smaller for gentler movement
      const targetRx = rotationRef.current.pausedRx + (-normalizedDeltaX * sensitivity);
      const targetRz = rotationRef.current.pausedRz + (normalizedDeltaY * sensitivity);
      
      // Smoothly interpolate to target position during pause transition
      rotationRef.current.rx = rotationRef.current.rx + (targetRx - rotationRef.current.rx) * 0.1 * smoothPause;
      rotationRef.current.rz = rotationRef.current.rz + (targetRz - rotationRef.current.rz) * 0.1 * smoothPause;
      
      return;
    }
    
    // Original drag behavior when clicked
    if (rotationRef.current.clicked) {
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
    }
  };

  const handleMouseUp = () => (rotationRef.current.clicked = false);
  
  const handleMouseLeave = () => {
    rotationRef.current.clicked = false;
    
    // Only calculate exit direction and reset if we were actually hovering over the sphere
    if (rotationRef.current.hovering) {
      // Calculate exit velocity based on recent mouse movement
      const mouseVelocityX = rotationRef.current.lastMouseX - rotationRef.current.prevMouseX;
      const mouseVelocityY = rotationRef.current.lastMouseY - rotationRef.current.prevMouseY;
      
      // Set continuous rotation direction based on exit velocity
      // Positive velocity = moving right/down, so continue in that direction
      rotationRef.current.autoRotationDirectionX = mouseVelocityX >= 0 ? 1 : -1;
      rotationRef.current.autoRotationDirectionZ = mouseVelocityY >= 0 ? 1 : -1;
      
      // If no significant movement, use fallback based on final position
      if (Math.abs(mouseVelocityX) < 2 && Math.abs(mouseVelocityY) < 2) {
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = rotationRef.current.lastMouseX - centerX;
        const deltaY = rotationRef.current.lastMouseY - centerY;
        
        // Continue in the direction of final position
        rotationRef.current.autoRotationDirectionX = deltaX >= 0 ? 1 : -1;
        rotationRef.current.autoRotationDirectionZ = deltaY >= 0 ? 1 : -1;
      }
    }
    
    rotationRef.current.hovering = false;
  };

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
    hovering: boolean;
    lastMouseX: number;
    lastMouseY: number;
    autoRotationDirectionX: number;
    autoRotationDirectionZ: number;
    pausedRx: number;
    pausedRz: number;
    hoverStartTime: number;
    prevMouseX: number;
    prevMouseY: number;
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
    const targetX = radius * pos.x;
    const targetY = radius * pos.y;
    const targetZ = radius * pos.z;

    // Get animation state
    const animState = updateIconOpacity(tech, deltaTime, i, techs.length);
    const { opacity, flyProgress } = animState;
    
    // Skip if not visible yet
    if (opacity <= 0) return;
    
    // Get starting position for dramatic rocket-ship fly-in animation
    const state = iconLoadState[tech];
    const startX = state?.startX || 0;
    const startY = state?.startY || 0;
    const startZ = state?.startZ || 0;
    
    // Create dramatic dive-in trajectory: hover close to viewer, then dive down into sphere
    let x, y, z;
    
    if (flyProgress < 0.4) {
      // Phase 1: Hover close to the viewer (0-40% of animation)
      const phase1Progress = flyProgress / 0.4;
      const easedProgress = Math.sin(phase1Progress * Math.PI * 0.5); // Gentle sine easing
      
      // Stay close to viewer with subtle movement
      x = startX + (startX * 0.05) * easedProgress; // Very slight horizontal drift
      y = startY - (30) * easedProgress; // Slight upward movement before dive
      z = startZ - (startZ * 0.1) * easedProgress; // Move slightly further back
      
    } else if (flyProgress < 0.8) {
      // Phase 2: Begin the dive (40-80% of animation)
      const phase2Progress = (flyProgress - 0.4) / 0.4;
      const diveProgress = phase2Progress * phase2Progress; // Quadratic acceleration for dive
      
      // Calculate intermediate dive position (halfway to target)
      const midX = startX + (targetX - startX) * 0.3;
      const midY = startY + (targetY - startY) * 0.3;
      const midZ = startZ + (targetZ - startZ) * 0.6; // Move significantly toward sphere depth
      
      // Dive from hover position to intermediate position
      x = startX + (midX - startX) * diveProgress;
      y = (startY - 30) + (midY - (startY - 30)) * diveProgress; // From raised position
      z = (startZ * 0.9) + (midZ - (startZ * 0.9)) * diveProgress;
      
    } else {
      // Phase 3: Complete the dive to final position (80-100% of animation)
      const phase3Progress = (flyProgress - 0.8) / 0.2;
      const finalProgress = 1 - Math.pow(1 - phase3Progress, 2); // Ease-out quad for smooth landing
      
      // Calculate the intermediate position (end of phase 2)
      const midX = startX + (targetX - startX) * 0.3;
      const midY = startY + (targetY - startY) * 0.3;
      const midZ = startZ + (targetZ - startZ) * 0.6;
      
      // Final dive from intermediate to target position
      x = midX + (targetX - midX) * finalProgress;
      y = midY + (targetY - midY) * finalProgress;
      z = midZ + (targetZ - midZ) * finalProgress;
    }

    // camera transform
    [y, z] = rot(y, z, tilt);
    [x, z] = rot(x, z, rotation.rz);
    [x, y] = rot(x, y, rotation.rx);

    // convert to cartesian and apply depth-based effects
    const baseAlpha = 0.6 + 0.4 * (x / radius);
    
    // Keep original size calculation - no artificial size scaling
    const size = iconSize + 2 + 8 * (x / radius);

    const img = iconCache[tech];
    if (img) {
      const finalAlpha = baseAlpha * opacity;
      
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
  // Add continuous auto-rotation only when not hovering, using calculated directions
  if (!rotation.hovering) {
    const autoRotationSpeed = 0.005;
    rotation.rx += autoRotationSpeed * rotation.autoRotationDirectionX;
    rotation.rz += autoRotationSpeed * 0.7 * rotation.autoRotationDirectionZ;
  }

  // deacceleration for mouse interaction (only when not hovering)
  if (!rotation.hovering) {
    if (rotation.vx > 0) rotation.vx = rotation.vx - 0.01;
    if (rotation.vy > 0) rotation.vy = rotation.vy - 0.01;
    if (rotation.vx < 0) rotation.vx = rotation.vx + 0.01;
    if (rotation.vy < 0) rotation.vy = rotation.vy + 0.01;

    // Apply mouse interaction velocity
    rotation.rz += rotation.vy * 0.01;
    rotation.rx += rotation.vx * 0.01;
  }
}

export default ThreeDBall;
