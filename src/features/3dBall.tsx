import React, { useEffect, useRef } from "react";
import { allIcons, techIconMap } from "./3dBall.const";

// Global image cache to prevent reloading icons
const iconCache: Record<string, HTMLImageElement> = {};

function loadIcons(techs: string[]): Promise<Record<string, HTMLImageElement>> {
  const promises = techs.map(tech => {
    if (iconCache[tech]) return Promise.resolve();
    
    const iconImporter = techIconMap[tech];
    if (!iconImporter) {
      console.warn(`No icon found for ${tech}`);
      return Promise.resolve();
    }
    
    return iconImporter().then(module => {
      const img = new Image();
      img.src = module.default;
      return new Promise<void>((resolve) => {
        img.onload = () => {
          iconCache[tech] = img;
          resolve();
        };
        img.onerror = (error) => {
          console.warn(`Failed to load icon for ${tech}:`, error);
          resolve();
        };
      });
    });
  });

  return Promise.all(promises).then(() => iconCache);
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

    // Start stable render loop
    const renderLoop = () => {
      drawCanvas(canvas, words, generateSpherePositions(words.length), mergedOptions, rotationRef.current);
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    // Load icons first, then start render loop
    loadIcons(words).then(() => {
      renderLoop();
    });

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
 * Draw canvas frame
 */
function drawCanvas(
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
    let x = radius * pos.x;
    let y = radius * pos.y;
    let z = radius * pos.z;

    // camera transform
    [y, z] = rot(y, z, tilt);
    [x, z] = rot(x, z, rotation.rz);
    [x, y] = rot(x, y, rotation.rx);

    // convert to cartesian and then draw.
    const alpha = 0.6 + 0.4 * (x / radius);
    const size = iconSize + 2 + 8 * (x / radius);

    const img = iconCache[tech];
    if (img) {
      ctx.globalAlpha = alpha;
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
