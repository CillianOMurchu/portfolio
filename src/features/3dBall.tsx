import React, { useEffect, useRef } from "react";
import { allIcons, techIconMap } from "./3dBall.const";
import { skillsButtonPosition } from '../utils/skillsButtonPosition';

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
  // Initialize load states with icons starting from Skills button position
  techs.forEach(tech => {
    // Calculate Skills button position in canvas 3D coordinates
    let skillsButtonX = 0, skillsButtonY = 0, skillsButtonZ = 0;
    
    if (skillsButtonPosition) {
      // Use the actual button position from the click event
      const buttonScreenX = skillsButtonPosition.x;
      const buttonScreenY = skillsButtonPosition.y;
      
      // Canvas dimensions (full screen)
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      
      // Convert to canvas 3D coordinates
      // From drawing function: screenX = y + width/2, screenY = -z + height/2
      // So: y = screenX - width/2, z = -(screenY - height/2)
      skillsButtonY = buttonScreenX - (canvasWidth / 2);  // y maps to screen X
      skillsButtonZ = -(buttonScreenY - (canvasHeight / 2)); // z maps to screen Y (flipped)
      skillsButtonX = 0; // x is depth/rotation, start at 0 for center depth
      
      console.log('Using actual button position:', { 
        screenX: buttonScreenX, 
        screenY: buttonScreenY,
        canvasY: skillsButtonY,
        canvasZ: skillsButtonZ
      });
    } else {
      // Fallback to estimated position if button position not available
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const buttonScreenX = window.innerWidth - 24 - 40; // right-6 minus half button width
      const buttonScreenY = 24 + 20; // top-6 plus half button height
      
      skillsButtonY = buttonScreenX - (canvasWidth / 2);
      skillsButtonZ = -(buttonScreenY - (canvasHeight / 2));
      skillsButtonX = 0;
      
      console.log('Using estimated button position (fallback)');
    }
    
    iconLoadState[tech] = { 
      loaded: false, 
      opacity: 0, 
      loadTime: 0,
      flyProgress: 0,
      startX: skillsButtonX,
      startY: skillsButtonY,
      startZ: skillsButtonZ
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

// Update icon opacity and travel animation from Skills button
function updateIconOpacity(tech: string, deltaTime: number, iconIndex: number, totalIcons: number) {
  const state = iconLoadState[tech];
  if (!state || !state.loaded) return { opacity: 0, flyProgress: 0 };
  
  // Update travel progress - faster for more visible movement
  if (state.flyProgress < 1) {
    // Calculate travel speed based on icon index - staggered arrival
    const progressRatio = iconIndex / Math.max(1, totalIcons - 1);
    const speedMultiplier = 1 + (progressRatio * 0.5); // Speed increases from 1x to 1.5x
    const travelSpeed = 0.002 * speedMultiplier; // Faster base speed for visible travel
    
    state.flyProgress = Math.min(1, state.flyProgress + deltaTime * travelSpeed);
  }
  
  // Start fading in immediately for visibility during travel
  if (state.flyProgress > 0.02 && state.opacity < 1) {
    // Calculate fade speed - faster for immediate visibility
    const progressRatio = iconIndex / Math.max(1, totalIcons - 1);
    const speedMultiplier = 1 + (progressRatio * 0.8); // Speed increases from 1x to 1.8x
    const fadeSpeed = 0.006 * speedMultiplier; // Faster fade for better visibility
    
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
  onIconClick?: (iconKey: string, position: { x: number; y: number }) => void;
  isInteractionDisabled?: boolean;
}

// Extract just the names for the default words array
const defaultWords = allIcons.map((icon) => icon.name);

export const ThreeDBall: React.FC<ThreeDBallProps> = ({
  words = defaultWords, // Use all available icons by default
  options = {},
  onIconClick,
  isInteractionDisabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef<number>(0);
  const iconPositionsRef = useRef<Record<string, { x: number; y: number; size: number; visible: boolean }>>({});
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
      rotationRef,
      {
        isInteractionDisabled,
        onIconClick,
        iconPositionsRef
      }
    );

    // Start render loop immediately (icons will fade in as they load)
    const renderLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;
      
      drawCanvasWithFadeIn(canvas, words, generateSpherePositions(words.length), mergedOptions, rotationRef.current, deltaTime, {
        iconPositionsRef
      });
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
  }, [words, options, isInteractionDisabled, onIconClick]);

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
  }>,
  interactionProps?: {
    isInteractionDisabled?: boolean;
    onIconClick?: (iconKey: string, position: { x: number; y: number }) => void;
    iconPositionsRef: React.MutableRefObject<Record<string, { x: number; y: number; size: number; visible: boolean }>>;
  }
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
    if (interactionProps?.isInteractionDisabled) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Check if click is on any icon
    if (interactionProps?.iconPositionsRef && interactionProps?.onIconClick) {
      const clickedIcon = Object.entries(interactionProps.iconPositionsRef.current).find(([, pos]) => {
        if (!pos.visible) return false;
        
        const distance = Math.sqrt(
          Math.pow(clickX - pos.x, 2) + Math.pow(clickY - pos.y, 2)
        );
        return distance <= pos.size / 2;
      });
      
      if (clickedIcon) {
        const [techName] = clickedIcon;
        interactionProps.onIconClick(techName, { x: clickX, y: clickY });
        return; // Don't start drag rotation if icon was clicked
      }
    }
    
    // Original drag behavior
    rotationRef.current.clicked = true;
    rotationRef.current.lastX = event.screenX;
    rotationRef.current.lastY = event.screenY;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (interactionProps?.isInteractionDisabled) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to canvas
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Use sphere radius for hit detection
    const sphereRadius = Math.min(rect.width, rect.height) * 0.4;
    const isOverSphere = distanceFromCenter <= sphereRadius;
    
    // Store previous mouse position for velocity calculation
    rotationRef.current.prevMouseX = rotationRef.current.lastMouseX;
    rotationRef.current.prevMouseY = rotationRef.current.lastMouseY;
    rotationRef.current.lastMouseX = mouseX;
    rotationRef.current.lastMouseY = mouseY;
    
    if (isOverSphere) {
      // Inside sphere: implement proximity-based rotation
      if (!rotationRef.current.hovering) {
        rotationRef.current.hovering = true;
        rotationRef.current.hoverStartTime = Date.now();
        rotationRef.current.pausedRx = rotationRef.current.rx;
        rotationRef.current.pausedRz = rotationRef.current.rz;
      }
      
      // Calculate normalized distance from center (0 = center, 1 = edge)
      const normalizedDistance = distanceFromCenter / sphereRadius;
      
      // Calculate rotation speed based on distance from center
      // Closer to center = slower rotation, further = faster rotation
      const baseSpeed = 0.012;
      const rotationSpeed = baseSpeed * normalizedDistance;
      
      // Calculate direction based on mouse position relative to center
      const angle = Math.atan2(deltaY, deltaX);
      
      // Apply rotation in opposite direction
      rotationRef.current.rx -= Math.cos(angle) * rotationSpeed;
      rotationRef.current.rz -= Math.sin(angle) * rotationSpeed;
      
      // Store current rotation speed and direction for when mouse leaves
      const velocityScale = 150; // Scale up for momentum
      rotationRef.current.vx = -Math.cos(angle) * rotationSpeed * velocityScale;
      rotationRef.current.vy = -Math.sin(angle) * rotationSpeed * velocityScale;
      
      // Set auto rotation direction based on current movement
      rotationRef.current.autoRotationDirectionX = rotationRef.current.vx >= 0 ? 1 : -1;
      rotationRef.current.autoRotationDirectionZ = rotationRef.current.vy >= 0 ? 1 : -1;
      
      return;
    } else {
      // Outside sphere: reset hovering state but keep momentum
      if (rotationRef.current.hovering) {
        rotationRef.current.hovering = false;
        // The velocity and auto rotation direction are already set from the last mouse position
      }
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
  deltaTime: number,
  interactionProps?: {
    iconPositionsRef: React.MutableRefObject<Record<string, { x: number; y: number; size: number; visible: boolean }>>;
  }
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
    
    // Create smooth travel animation from Skills button to sphere position
    let x, y, z;
    
    if (flyProgress < 1) {
      // Smooth easing function for natural movement
      const easedProgress = 1 - Math.pow(1 - flyProgress, 3); // Cubic ease-out
      
      // Direct interpolation from start position to target position
      x = startX + (targetX - startX) * easedProgress;
      y = startY + (targetY - startY) * easedProgress;
      z = startZ + (targetZ - startZ) * easedProgress;
      
      // Add slight arc to the movement for more natural trajectory
      const arcHeight = 50; // Height of the arc
      const arcProgress = Math.sin(easedProgress * Math.PI); // Sine wave for arc
      y += arcProgress * arcHeight;
      
    } else {
      // Animation complete - use final position
      x = targetX;
      y = targetY;
      z = targetZ;
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
      const screenX = y + width / 2 - size / 2;
      const screenY = -z + height / 2 - size / 2;
      
      // Track icon positions for click detection
      if (interactionProps?.iconPositionsRef) {
        interactionProps.iconPositionsRef.current[tech] = {
          x: screenX + size / 2, // Center of icon
          y: screenY + size / 2, // Center of icon
          size: size,
          visible: finalAlpha > 0.1 // Only clickable when sufficiently visible
        };
      }
      
      ctx.globalAlpha = finalAlpha;
      ctx.drawImage(
        img,
        screenX,
        screenY,
        size,
        size
      );
      ctx.globalAlpha = 1;
    }
  });

  // Update rotation for next frame
  // Add continuous auto-rotation when not hovering, using stored velocity and direction
  if (!rotation.hovering) {
    // Use stored velocity from mouse interaction for smoother continuation
    const autoRotationSpeed = 0.022;
    const velocityDecay = 0.98; // Gradual slowdown
    
    // Apply stored velocity with decay
    rotation.rx += rotation.vx * 0.01;
    rotation.rz += rotation.vy * 0.01;
    
    // Also apply auto-rotation in the stored direction
    rotation.rx += autoRotationSpeed * rotation.autoRotationDirectionX;
    rotation.rz += autoRotationSpeed * 0.7 * rotation.autoRotationDirectionZ;
    
    // Apply velocity decay for gradual slowdown
    rotation.vx *= velocityDecay;
    rotation.vy *= velocityDecay;
  }
}

export default ThreeDBall;
