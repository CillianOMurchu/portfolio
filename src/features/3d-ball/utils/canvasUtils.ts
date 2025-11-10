import type { WordSphereOptions, RotationState } from "../types";
import { iconCache, iconLoadState } from "./iconCache";

interface InteractionProps {
  isInteractionDisabled?: boolean;
  allowDragRotation?: boolean;
  onIconClick?: (iconKey: string, position: { x: number; y: number }) => void;
  onIconHover?: (iconKey: string | null, position: { x: number; y: number } | null) => void;
  iconPositionsRef: React.MutableRefObject<Record<string, { 
    x: number; 
    y: number; 
    size: number; 
    visible: boolean; 
  }>>;
  centerIcon?: (iconName: string) => void;
  onIconCentered?: (iconName: string) => void;
}

/**
 * Setup canvas with event listeners and Hi-DPI support
 */
export function setupCanvas(
  canvas: HTMLCanvasElement,
  options: WordSphereOptions,
  rotationRef: React.MutableRefObject<RotationState>,
  interactionProps?: InteractionProps
): () => void {
  const { width = 240, height = 240 } = options;

  // Canvas setup
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  // Hi-DPI support
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(2, 2);

  const handleMouseMove = (event: MouseEvent) => {
    if (interactionProps?.isInteractionDisabled) return;
    
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    const sphereRadius = Math.min(rect.width, rect.height) * 0.4;
    const isOverSphere = distanceFromCenter <= sphereRadius;
    
    // Store previous mouse position for velocity calculation
    rotationRef.current.prevMouseX = rotationRef.current.lastMouseX;
    rotationRef.current.prevMouseY = rotationRef.current.lastMouseY;
    rotationRef.current.lastMouseX = mouseX;
    rotationRef.current.lastMouseY = mouseY;
    
    if (isOverSphere) {
      if (!rotationRef.current.hovering) {
        rotationRef.current.hovering = true;
        rotationRef.current.hoverStartTime = Date.now();
        rotationRef.current.pausedRx = rotationRef.current.rx;
        rotationRef.current.pausedRz = rotationRef.current.rz;
      }
      
      // Calculate rotation based on proximity
      const normalizedDistance = distanceFromCenter / sphereRadius;
      const baseSpeed = 0.012;
      const rotationSpeed = baseSpeed * normalizedDistance;
      const angle = Math.atan2(deltaY, deltaX);
      
      if (!rotationRef.current.autoRotationStopped) {
        rotationRef.current.rx -= Math.cos(angle) * rotationSpeed;
        rotationRef.current.rz -= Math.sin(angle) * rotationSpeed;
        
        const velocityScale = 150;
        rotationRef.current.vx = -Math.cos(angle) * rotationSpeed * velocityScale;
        rotationRef.current.vy = -Math.sin(angle) * rotationSpeed * velocityScale;
        
        rotationRef.current.autoRotationDirectionX = rotationRef.current.vx >= 0 ? 1 : -1;
        rotationRef.current.autoRotationDirectionZ = rotationRef.current.vy >= 0 ? 1 : -1;
      }
      
      return;
    } else {
      if (rotationRef.current.hovering) {
        rotationRef.current.hovering = false;
      }
    }
  };

  const handleMouseLeave = () => {
    if (rotationRef.current.hovering) {
      const mouseVelocityX = rotationRef.current.lastMouseX - rotationRef.current.prevMouseX;
      const mouseVelocityY = rotationRef.current.lastMouseY - rotationRef.current.prevMouseY;
      
      rotationRef.current.autoRotationDirectionX = mouseVelocityX >= 0 ? 1 : -1;
      rotationRef.current.autoRotationDirectionZ = mouseVelocityY >= 0 ? 1 : -1;
      
      if (Math.abs(mouseVelocityX) < 2 && Math.abs(mouseVelocityY) < 2) {
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = rotationRef.current.lastMouseX - centerX;
        const deltaY = rotationRef.current.lastMouseY - centerY;
        
        rotationRef.current.autoRotationDirectionX = deltaX >= 0 ? 1 : -1;
        rotationRef.current.autoRotationDirectionZ = deltaY >= 0 ? 1 : -1;
      }
    }
    
    rotationRef.current.hovering = false;
  };

  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Utility function for 2D rotation
 */
function rot(x: number, y: number, t: number): [number, number] {
  return [
    x * Math.cos(t) - y * Math.sin(t),
    x * Math.sin(t) + y * Math.cos(t),
  ];
}

/**
 * Update icon opacity and animation state
 */
function updateIconOpacity(tech: string): { opacity: number; flyProgress: number } {
  const state = iconLoadState[tech];
  if (!state || !state.loaded) {
    return { opacity: 0, flyProgress: 0 };
  }
  
  const timeSinceLoaded = Date.now() - state.loadTime;
  
  // Opacity fade-in (fast)
  const fadeInDuration = 300;
  const opacity = Math.min(1, timeSinceLoaded / fadeInDuration);
  
  // Fly-in animation (slower, more dramatic)
  const flyInDuration = 800;
  const flyProgress = Math.min(1, timeSinceLoaded / flyInDuration);
  
  // Store state for access in draw function
  state.opacity = opacity;
  state.flyProgress = flyProgress;
  
  return { opacity, flyProgress };
}

/**
 * Draw canvas with fade-in effect for cascading icon loading
 */
export function drawCanvasWithFadeIn(
  canvas: HTMLCanvasElement,
  techs: string[],
  positions: { x: number; y: number; z: number }[],
  options: WordSphereOptions,
  rotation: RotationState,
  interactionProps?: {
    iconPositionsRef: React.MutableRefObject<Record<string, { 
      x: number; 
      y: number; 
      size: number; 
      visible: boolean; 
    }>>;
    onIconCentered?: (iconName: string) => void;
  }
): void {
  const {
    width = 240,
    height = 240,
    radius = 100,
    iconSize = 32,
    tilt = 0,
  } = options;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  techs.forEach((tech, i) => {
    if (i >= positions.length) return;

    const pos = positions[i];
    const targetX = radius * pos.x;
    const targetY = radius * pos.y;
    const targetZ = radius * pos.z;

    // Get animation state
    const animState = updateIconOpacity(tech);
    const { opacity, flyProgress } = animState;
    
    if (opacity <= 0) return;
    
    // Get starting position for fly-in animation
    const state = iconLoadState[tech];
    const startX = state?.startX || 0;
    const startY = state?.startY || 0;
    const startZ = state?.startZ || 0;
    
    let x, y, z;
    
    if (flyProgress < 1) {
      const easedProgress = 1 - Math.pow(1 - flyProgress, 3); // Cubic ease-out
      
      x = startX + (targetX - startX) * easedProgress;
      y = startY + (targetY - startY) * easedProgress;
      z = startZ + (targetZ - startZ) * easedProgress;
      
      // Add arc to movement
      const arcHeight = 50;
      const arcProgress = Math.sin(easedProgress * Math.PI);
      y += arcProgress * arcHeight;
    } else {
      x = targetX;
      y = targetY;
      z = targetZ;
    }

    // Apply camera transforms
    [y, z] = rot(y, z, tilt);
    [x, z] = rot(x, z, rotation.rz);
    [x, y] = rot(x, y, rotation.rx);

    // Calculate depth-based effects
    const baseAlpha = 0.6 + 0.4 * (x / radius);
    const size = iconSize + 2 + 8 * (x / radius);

    const img = iconCache[tech];
    if (img) {
      const finalAlpha = baseAlpha * opacity;
      const screenX = y + width / 2 - size / 2;
      const screenY = -z + height / 2 - size / 2;
      
      // Track icon positions for click detection
      if (interactionProps?.iconPositionsRef) {
        interactionProps.iconPositionsRef.current[tech] = {
          x: screenX + size / 2,
          y: screenY + size / 2,
          size: size,
          visible: finalAlpha > 0.1
        };
      }
      
      ctx.globalAlpha = finalAlpha;
      ctx.drawImage(img, screenX, screenY, size, size);
      ctx.globalAlpha = 1;
    }
  });

  // Handle rotation updates
  if (rotation.isRotatingToCenter) {
    const deltaRx = rotation.targetRx - rotation.rx;
    const deltaRz = rotation.targetRz - rotation.rz;
    
    // Handle angle wrapping
    const adjustedDeltaRx = ((deltaRx + Math.PI) % (2 * Math.PI)) - Math.PI;
    const adjustedDeltaRz = ((deltaRz + Math.PI) % (2 * Math.PI)) - Math.PI;
    
    const threshold = 0.05;
    
    if (Math.abs(adjustedDeltaRx) < threshold && Math.abs(adjustedDeltaRz) < threshold) {
      rotation.rx = rotation.targetRx;
      rotation.rz = rotation.targetRz;
      rotation.isRotatingToCenter = false;
      
      if (rotation.centeringIconName && interactionProps?.onIconCentered) {
        interactionProps.onIconCentered(rotation.centeringIconName);
      }
      rotation.centeringIconName = null;
    } else {
      rotation.rx += adjustedDeltaRx * rotation.centeringSpeed;
      rotation.rz += adjustedDeltaRz * rotation.centeringSpeed;
    }
  } else if (!rotation.hovering && !rotation.autoRotationStopped) {
    const autoRotationSpeed = 0.022;
    const velocityDecay = 0.98;
    
    rotation.rx += rotation.vx * 0.01;
    rotation.rz += rotation.vy * 0.01;
    
    rotation.rx += autoRotationSpeed * rotation.autoRotationDirectionX;
    rotation.rz += autoRotationSpeed * 0.7 * rotation.autoRotationDirectionZ;
    
    rotation.vx *= velocityDecay;
    rotation.vy *= velocityDecay;
  }
}