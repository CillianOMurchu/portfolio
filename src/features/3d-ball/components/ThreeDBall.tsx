import React, { useEffect, useRef, useCallback } from "react";
import { allIcons } from "../../3dBall.const";
import type { ThreeDBallProps, WordSphereOptions, RotationState } from "../types";
import { loadIconsCascading } from "../utils/iconCache";
import { setupCanvas, drawCanvasWithFadeIn } from "../utils/canvasUtils";
import { generateFibonacciSphere, calculateCenteringRotation } from "../utils/sphereUtils";

// Extract just the names for the default words array
const defaultWords = allIcons.map((icon) => icon.name);

export const ThreeDBall: React.FC<ThreeDBallProps> = ({
  words = defaultWords,
  options = {},
  onIconClick,
  onIconHover,
  onIconCentered,
  isInteractionDisabled = false,
  allowDragRotation = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const iconPositionsRef = useRef<Record<string, { 
    x: number; 
    y: number; 
    size: number; 
    visible: boolean; 
  }>>({});
  
  const rotationRef = useRef<RotationState>({
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
    autoRotationDirectionX: Math.random() > 0.5 ? 1 : -1,
    autoRotationDirectionZ: Math.random() > 0.5 ? 1 : -1,
    currentMouseX: 0,
    currentMouseY: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    pausedRx: 0,
    pausedRz: 0,
    hoverStartTime: 0,
    isRotatingToCenter: false,
    targetRx: 0,
    targetRz: 0,
    centeringSpeed: 0.1,
    centeringIconName: null,
    autoRotationStopped: false,
  });

  // Function to center an icon by rotating sphere
  const centerIcon = useCallback((iconName: string) => {
    const iconIndex = words.indexOf(iconName);
    if (iconIndex === -1) return;

    const { targetRx, targetRz } = calculateCenteringRotation(
      iconIndex, 
      words.length, 
      rotationRef.current
    );

    // Start centering animation
    rotationRef.current.isRotatingToCenter = true;
    rotationRef.current.targetRx = targetRx;
    rotationRef.current.targetRz = targetRz;
    rotationRef.current.centeringIconName = iconName;
    rotationRef.current.vx = 0;
    rotationRef.current.vy = 0;
    rotationRef.current.autoRotationStopped = true;
  }, [words]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
        allowDragRotation,
        onIconClick,
        onIconHover: (iconName: string | null, position: { x: number; y: number } | null) => {
          // Log icon information on hover (only when actually hovering an icon)
          if (iconName && position) {
            const iconInfo = allIcons.find(icon => icon.name === iconName);
            console.log('Hovering icon:', {
              name: iconName,
              position,
              iconData: iconInfo
            });
          } else if (!iconName) {
            console.log('Hover ended');
          }
          
          // Call the original onIconHover callback if it exists
          if (onIconHover) {
            onIconHover(iconName, position);
          }
        },
        iconPositionsRef,
        centerIcon,
        onIconCentered
      }
    );

    // Start render loop
    const renderLoop = () => {
      const spherePositions = generateFibonacciSphere(words.length);
      
      drawCanvasWithFadeIn(
        canvas, 
        words, 
        spherePositions, 
        mergedOptions, 
        rotationRef.current,
        { iconPositionsRef, onIconCentered }
      );
      
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    // Start cascading icon loading with reduced logging
    loadIconsCascading(words, (tech) => {
      // Only log the first few icons to avoid console spam
      if (words.indexOf(tech) < 3) {
        console.log(`Core icon loaded: ${tech}`);
      }
    });

    // Start render loop immediately
    animationRef.current = requestAnimationFrame(renderLoop);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cleanup();
    };
  }, [words, options, isInteractionDisabled, allowDragRotation, onIconClick, onIconHover, centerIcon, onIconCentered]);

  return (
    <canvas
      ref={canvasRef}
      className="block"
      style={{ width: "352px", height: "352px" }}
    />
  );
};

export default ThreeDBall;