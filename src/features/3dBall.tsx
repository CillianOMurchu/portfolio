import React, { useEffect, useRef } from 'react';

// Import all SVG icons dynamically
import androidStudioIcon from '../assets/programming-icons/android-studio.svg';
import androidIcon from '../assets/programming-icons/android.svg';
import css3Icon from '../assets/programming-icons/css3.svg';
import cypressIcon from '../assets/programming-icons/cypress.svg';
import dartIcon from '../assets/programming-icons/dart.svg';
import dockerIcon from '../assets/programming-icons/docker.svg';
import expressIcon from '../assets/programming-icons/express.svg';
import figmaIcon from '../assets/programming-icons/figma.svg';
import firebaseIcon from '../assets/programming-icons/firebase.svg';
import flutterIcon from '../assets/programming-icons/flutter.svg';
import githubIcon from '../assets/programming-icons/github.svg';
import gitlabIcon from '../assets/programming-icons/gitlab.svg';
import html5Icon from '../assets/programming-icons/html5.svg';
import javascriptIcon from '../assets/programming-icons/javascript.svg';
import jestIcon from '../assets/programming-icons/jest.svg';
import jiraIcon from '../assets/programming-icons/jira.svg';
import nextjsIcon from '../assets/programming-icons/next-js.svg';
import nginxIcon from '../assets/programming-icons/nginx.svg';
import nodejsIcon from '../assets/programming-icons/node-js.svg';
import postgresqlIcon from '../assets/programming-icons/postgresql.svg';
import prismaIcon from '../assets/programming-icons/prisma.svg';
import reactIcon from '../assets/programming-icons/react.svg';
import testingLibraryIcon from '../assets/programming-icons/testing-library.svg';
import typescriptIcon from '../assets/programming-icons/typescript.svg';
import vercelIcon from '../assets/programming-icons/vercel.svg';

// Create array of all available icons with their file names as identifiers
const allIcons = [
  { name: 'android-studio', src: androidStudioIcon },
  { name: 'android', src: androidIcon },
  { name: 'css3', src: css3Icon },
  { name: 'cypress', src: cypressIcon },
  { name: 'dart', src: dartIcon },
  { name: 'docker', src: dockerIcon },
  { name: 'express', src: expressIcon },
  { name: 'figma', src: figmaIcon },
  { name: 'firebase', src: firebaseIcon },
  { name: 'flutter', src: flutterIcon },
  { name: 'github', src: githubIcon },
  { name: 'gitlab', src: gitlabIcon },
  { name: 'html5', src: html5Icon },
  { name: 'javascript', src: javascriptIcon },
  { name: 'jest', src: jestIcon },
  { name: 'jira', src: jiraIcon },
  { name: 'next-js', src: nextjsIcon },
  { name: 'nginx', src: nginxIcon },
  { name: 'node-js', src: nodejsIcon },
  { name: 'postgresql', src: postgresqlIcon },
  { name: 'prisma', src: prismaIcon },
  { name: 'react', src: reactIcon },
  { name: 'testing-library', src: testingLibraryIcon },
  { name: 'typescript', src: typescriptIcon },
  { name: 'vercel', src: vercelIcon },
];

// Create mapping from names to icon sources
const techIconMap: Record<string, string> = {};
allIcons.forEach(icon => {
  techIconMap[icon.name] = icon.src;
});

// Extract just the names for the default words array
const defaultWords = allIcons.map(icon => icon.name);

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

export const ThreeDBall: React.FC<ThreeDBallProps> = ({ 
  words = defaultWords, // Use all available icons by default
  options = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      ...options
    };

    iconSphere(canvas, words, generateSpherePositions(words.length), mergedOptions);
  }, [words, options]);

  return (
    <canvas 
      ref={canvasRef}
      className="block"
      style={{ width: '352px', height: '352px' }}
    />
  );
};

/**
 * IconSphere
 * Based on WordSphere by Hyojun Kim in 2017. Licensed in MIT.
 * Modified for React TypeScript compatibility and icon rendering
 */
function iconSphere(
  canvas: HTMLCanvasElement, 
  techs: string[], 
  positions: { x: number; y: number; z: number }[], 
  options: WordSphereOptions
) {
  const {
    width = 500,
    height = 500,
    radius = 150,
    iconSize = 32,
    tilt = 0,
    initialVelocityX = 0,
    initialVelocityY = 0,
    initialRotationX = 0,
    initialRotationZ = 0,
  } = options;
  
  let vx = initialVelocityX, vy = initialVelocityY;
  let rx = initialRotationX, rz = initialRotationZ;
  
  // canvas setup
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Hi-DPI support
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(2,2);

  // Load images for each technology
  const images: Record<string, HTMLImageElement> = {};
  const imagePromises = techs.map((tech) => {
    return new Promise<void>((resolve) => {
      const iconSrc = techIconMap[tech];
      if (iconSrc) {
        const img = new Image();
        img.onload = () => {
          images[tech] = img;
          resolve();
        };
        img.onerror = (error) => {
          console.warn(`Failed to load icon for ${tech}:`, error);
          resolve();
        };
        img.src = iconSrc;
      } else {
        console.warn(`No icon found for ${tech}`);
        resolve();
      }
    });
  });

  // Wait for all images to load before starting rendering
  Promise.all(imagePromises).then(() => {
    startLoop();
  }); 

  // scrolling
  let clicked = false;
  let lastX = 0;
  let lastY = 0;
  
  canvas.addEventListener('mousedown', (event: MouseEvent) => {
    clicked = true;
    lastX = event.screenX;
    lastY = event.screenY;
  });
  
  canvas.addEventListener('mousemove', (event: MouseEvent) => {
    if (!clicked) return;
    const dx = event.screenX - lastX;
    const dy = event.screenY - lastY;
    lastX = event.screenX;
    lastY = event.screenY;

    // rotation update
    rz += -dy * 0.01;
    rx += dx * 0.01;

    // velocity update
    vx = dx * 0.1;
    vy = dy * 0.1;

    if (!looping) startLoop();
  });
  
  canvas.addEventListener('mouseup', () => clicked = false);
  canvas.addEventListener('mouseleave', () => clicked = false);
  
  function rot(x: number, y: number, t: number): [number, number] {
    return [x*Math.cos(t)-y*Math.sin(t), x*Math.sin(t)+y*Math.cos(t)];
  }

  function render() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let renderedCount = 0;
    techs.forEach((tech, i) => {
      if (i >= positions.length) return;
      
      const pos = positions[i];
      let x = radius * pos.x;
      let y = radius * pos.y; 
      let z = radius * pos.z;

      // camera transform
      [y,z] = rot(y, z, tilt);
      [x,z] = rot(x, z, rz);
      [x,y] = rot(x, y, rx);

      // convert to cartesian and then draw.
      const alpha = 0.6 + 0.4 * (x/radius);
      const size = iconSize + 2 + 8*(x/radius);
      
      const img = images[tech];
      if (img) {
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          img,
          y + width/2 - size/2,
          -z + height/2 - size/2,
          size,
          size
        );
        ctx.globalAlpha = 1;
        renderedCount++;
      }
    });
    
    // Debug: Log how many icons are being rendered (only occasionally to avoid spam)
    if (Math.random() < 0.01) { // 1% chance to log
      console.log(`Rendered ${renderedCount} out of ${techs.length} icons`);
    }
  }

  // renderer
  let looping = false;
  function rendererLoop() {
    if (looping) window.requestAnimationFrame(rendererLoop);
    render();
    
    // Add continuous auto-rotation
    const autoRotationSpeed = 0.005;
    rx += autoRotationSpeed;
    rz += autoRotationSpeed * 0.7;
    
    // deacceleration for mouse interaction
    if (vx > 0) vx = vx - 0.01;
    if (vy > 0) vy = vy - 0.01;
    if (vx < 0) vx = vx + 0.01;
    if (vy < 0) vy = vy + 0.01;
    
    // Apply mouse interaction velocity
    rz += vy * 0.01;
    rx += vx * 0.01;
  }

  function startLoop() {
    looping = true;
    window.requestAnimationFrame(rendererLoop);
  }
  
  // Don't start the loop here - it's started after images load
}
