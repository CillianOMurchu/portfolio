import React, { useEffect, useRef, useState, useMemo } from 'react';

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

// Create array of all available icons with their file names as identifiers and descriptions
const allIcons = [
  { name: 'android-studio', src: androidStudioIcon, description: 'Android Studio - IDE for Android development' },
  { name: 'android', src: androidIcon, description: 'Android - Mobile operating system' },
  { name: 'css3', src: css3Icon, description: 'CSS3 - Styling and layout for web pages' },
  { name: 'cypress', src: cypressIcon, description: 'Cypress - End-to-end testing framework' },
  { name: 'dart', src: dartIcon, description: 'Dart - Programming language for Flutter' },
  { name: 'docker', src: dockerIcon, description: 'Docker - Containerization platform' },
  { name: 'express', src: expressIcon, description: 'Express.js - Fast Node.js web framework' },
  { name: 'figma', src: figmaIcon, description: 'Figma - Collaborative interface design tool' },
  { name: 'firebase', src: firebaseIcon, description: 'Firebase - Google\'s app development platform' },
  { name: 'flutter', src: flutterIcon, description: 'Flutter - Cross-platform mobile framework' },
  { name: 'github', src: githubIcon, description: 'GitHub - Git repository hosting service' },
  { name: 'gitlab', src: gitlabIcon, description: 'GitLab - DevOps lifecycle tool' },
  { name: 'html5', src: html5Icon, description: 'HTML5 - Markup language for web content' },
  { name: 'javascript', src: javascriptIcon, description: 'JavaScript - Dynamic programming language' },
  { name: 'jest', src: jestIcon, description: 'Jest - JavaScript testing framework' },
  { name: 'jira', src: jiraIcon, description: 'Jira - Project management and issue tracking' },
  { name: 'next-js', src: nextjsIcon, description: 'Next.js - React production framework' },
  { name: 'nginx', src: nginxIcon, description: 'Nginx - High-performance web server' },
  { name: 'node-js', src: nodejsIcon, description: 'Node.js - JavaScript runtime environment' },
  { name: 'postgresql', src: postgresqlIcon, description: 'PostgreSQL - Advanced relational database' },
  { name: 'prisma', src: prismaIcon, description: 'Prisma - Next-generation ORM for Node.js' },
  { name: 'react', src: reactIcon, description: 'React - Library for building user interfaces' },
  { name: 'testing-library', src: testingLibraryIcon, description: 'Testing Library - Simple testing utilities' },
  { name: 'typescript', src: typescriptIcon, description: 'TypeScript - Typed superset of JavaScript' },
  { name: 'vercel', src: vercelIcon, description: 'Vercel - Platform for frontend deployment' },
];

interface IconSphere3DProps {
  width?: number;
  height?: number;
  radius?: number;
  baseIconSize?: number;
  onIconHover?: (iconName: string | null, description: string | null, position: { x: number; y: number } | null) => void;
}

interface IconPosition {
  x: number;
  y: number;
  z: number;
}

interface FloatingIconProps {
  icon: typeof allIcons[0];
  position: IconPosition;
  isHovered: boolean;
  onHover: (iconName: string | null, mousePos: { x: number; y: number } | null) => void;
  onLeave: () => void;
}

const FloatingIcon: React.FC<FloatingIconProps> = React.memo(({ 
  icon, 
  position, 
  isHovered, 
  onHover, 
  onLeave,
}) => {
  // Calculate static 3D position - this is stable and won't cause re-renders
  const transform = useMemo(() => {
    const { x, y, z } = position;
    const scale = 300; // Base sphere radius
    const perspective = 800;
    
    // Simple 3D to 2D projection
    const projectedX = (x * scale * perspective) / (perspective + z * scale);
    const projectedY = (y * scale * perspective) / (perspective + z * scale);
    
    // Z-based scaling for depth
    const depthScale = Math.max(0.3, (perspective + z * scale) / (perspective + scale));
    
    return `translate3d(${projectedX}px, ${projectedY}px, 0) scale(${depthScale})`;
  }, [position]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onHover(icon.name, { 
      x: rect.left + rect.width / 2, 
      y: rect.top 
    });
  };

  return (
    <div
      className={`absolute left-1/2 top-1/2 w-12 h-12 cursor-pointer transition-transform duration-200 ${
        isHovered ? 'z-20 scale-125' : 'z-10'
      }`}
      style={{
        transform,
        transformOrigin: 'center center',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={icon.src}
        alt={icon.description}
        className="w-full h-full object-contain filter drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
});

export const IconSphere3D: React.FC<IconSphere3DProps> = ({
  width = 352,
  height = 352,
  onIconHover
}) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const rotationRef = useRef({ x: Math.PI * 0.14, z: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate stable positions using golden spiral
  const positions = useMemo(() => {
    const positions: IconPosition[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
    const count = allIcons.length;
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // Range from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      positions.push({ x, y, z });
    }
    return positions;
  }, []);

  // Animation loop - direct CSS transform updates to avoid React re-renders
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current > 16) { // ~60fps
        if (!hoveredIcon) {
          rotationRef.current = {
            x: rotationRef.current.x + 0.005,
            z: rotationRef.current.z + 0.0035
          };
          
          // Apply rotation directly to the inner container
          const sphereContainer = document.getElementById('icon-sphere-container');
          if (sphereContainer) {
            sphereContainer.style.transform = `rotateX(${rotationRef.current.x}rad) rotateZ(${rotationRef.current.z}rad)`;
          }
        }
        lastTimeRef.current = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredIcon]);

  const handleIconHover = (iconName: string | null, mousePos: { x: number; y: number } | null) => {
    setHoveredIcon(iconName);
    
    if (onIconHover && iconName) {
      const iconData = allIcons.find(icon => icon.name === iconName);
      onIconHover(iconName, iconData?.description || null, mousePos);
    } else if (onIconHover) {
      onIconHover(null, null, null);
    }
  };

  const handleIconLeave = () => {
    setHoveredIcon(null);
    if (onIconHover) {
      onIconHover(null, null, null);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ 
        width, 
        height,
        perspective: '800px',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(0.14rad) rotateZ(0rad)',
          transition: hoveredIcon ? 'transform 0.3s ease-out' : 'none',
        }}
        id="icon-sphere-container"
      >
        {allIcons.map((icon, index) => (
          <FloatingIcon
            key={icon.name}
            icon={icon}
            position={positions[index]}
            isHovered={hoveredIcon === icon.name}
            onHover={handleIconHover}
            onLeave={handleIconLeave}
          />
        ))}
      </div>
    </div>
  );
};