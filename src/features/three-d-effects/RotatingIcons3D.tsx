import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './types';

interface IconData {
  id: string;
  text: string;
  color: string;
  position: [number, number, number];
}

const icons: IconData[] = [
  { id: '1', text: 'React', color: '#61DAFB', position: [0, 0, 0] }, // Will be calculated
  { id: '2', text: 'TypeScript', color: '#3178C6', position: [0, 0, 0] },
  { id: '3', text: 'Three.js', color: '#000000', position: [0, 0, 0] },
  { id: '4', text: 'Supabase', color: '#3ECF8E', position: [0, 0, 0] },
  { id: '5', text: 'Vite', color: '#646CFF', position: [0, 0, 0] },
  { id: '6', text: 'Tailwind', color: '#06B6D4', position: [0, 0, 0] },
  { id: '7', text: 'Framer', color: '#0055FF', position: [0, 0, 0] },
  { id: '8', text: 'Vitest', color: '#6E9F18', position: [0, 0, 0] },
];

// Sphere radius
const SPHERE_RADIUS = 3;

// Calculate positions on sphere surface using golden spiral
const calculateSpherePositions = (): [number, number, number][] => {
  const positions: [number, number, number][] = [];
  const count = icons.length;
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = (i * 2.4) % (2 * Math.PI); // Golden angle approximation
    
    const x = radiusAtY * Math.cos(theta);
    const z = radiusAtY * Math.sin(theta);
    
    positions.push([
      x * SPHERE_RADIUS,
      y * SPHERE_RADIUS,
      z * SPHERE_RADIUS
    ]);
  }
  
  return positions;
};

const spherePositions = calculateSpherePositions();

interface IconProps {
  icon: IconData;
  index: number;
  mousePosition: THREE.Vector2;
}

function Icon({ icon, index }: IconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  // Get position on sphere
  const spherePosition = spherePositions[index];

  useFrame((state) => {
    if (!meshRef.current) return;

    // Keep icons always facing the camera (billboard effect)
    meshRef.current.lookAt(state.camera.position);
    
    // Calculate distance from camera for scaling and opacity
    const distance = meshRef.current.position.distanceTo(state.camera.position);
    const normalizedDistance = (distance - 4) / 4; // Normalize between front and back of sphere
    
    // Scale: closer = larger (0.6 to 1.4)
    const newScale = Math.max(0.4, Math.min(1.6, 1.6 - normalizedDistance * 0.8));
    setScale(newScale);
    
    // Opacity: closer = more opaque (0.3 to 1.0)
    const newOpacity = Math.max(0.2, Math.min(1.0, 1.0 - normalizedDistance * 0.6));
    setOpacity(newOpacity);
  });

  return (
    // @ts-expect-error - React Three Fiber mesh element
    <mesh 
      ref={meshRef} 
      position={spherePosition}
      scale={[scale, scale, scale]}
    >
      {/* @ts-expect-error - Three.js geometry component */}
      <boxGeometry args={[0.4, 0.4, 0.1]} />
      {/* @ts-expect-error - Three.js material component */}
      <meshStandardMaterial 
        color={icon.color} 
        transparent={true}
        opacity={opacity}
      />
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        material-opacity={opacity}
      >
        {icon.text}
      </Text>
      {/* @ts-expect-error - React Three Fiber mesh element */}
    </mesh>
  );
}

interface SceneProps {
  mousePosition: THREE.Vector2;
}

function Scene({ mousePosition }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    // Rotate the entire sphere smoothly in all directions
    groupRef.current.rotation.y += delta * 0.3; // Y-axis rotation
    groupRef.current.rotation.x += delta * 0.2; // X-axis rotation
    groupRef.current.rotation.z += delta * 0.1; // Z-axis rotation (slight)
    
    // Mouse influence on rotation speed
    const mouseInfluence = 0.0008;
    groupRef.current.rotation.y += mousePosition.x * mouseInfluence;
    groupRef.current.rotation.x += mousePosition.y * mouseInfluence;
  });

  return (
    // @ts-expect-error - React Three Fiber group element
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <Icon 
          key={icon.id} 
          icon={icon} 
          index={index}
          mousePosition={mousePosition}
        />
      ))}
      
      {/* @ts-expect-error - Three.js light component */}
      <ambientLight intensity={0.4} />
      
      {/* @ts-expect-error - Three.js light component */}
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      
      {/* @ts-expect-error - Three.js light component */}
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#ffffff" />
      {/* @ts-expect-error - React Three Fiber group element */}
    </group>
  );
}

export interface RotatingIcons3DProps {
  className?: string;
}

export const RotatingIcons3D: React.FC<RotatingIcons3DProps> = ({
  className = ''
}) => {
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      setMousePosition(new THREE.Vector2(x, y));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: '352px', height: '352px' }}
      data-testid="rotating-icons-3d"
    >
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 45 
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene mousePosition={mousePosition} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={false}
          minDistance={6}
          maxDistance={12}
        />
      </Canvas>
      
      {/* Overlay info */}
      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded-lg p-2 text-sm">
        <div>Tech Stack Sphere</div>
        <div>Mouse: influence rotation</div>
        <div>Scroll: zoom in/out</div>
      </div>
    </div>
  );
};

export default RotatingIcons3D;