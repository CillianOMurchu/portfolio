import React, { useEffect, useRef } from 'react';

interface WordSphereOptions {
  width?: number;
  height?: number;
  radius?: number;
  padding?: number;
  fontSize?: number;
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
  words = [
    'HTML5', 'Javascript', 'Scala', 'Kotlin', 'Erlang',
    'CSS', 'Python', 'Java', 'PostgreSQL', 'MongoDB',
    'C++', 'Swift', 'Rust', 'Go', 'PHP', 'Ruby', 'Docker',
    'Node.js', 'React', 'Vue', 'Angular', 'GraphQL',
    'TypeScript', 'React', 'Three.js'
  ],
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

    wordSphere(canvas, words, generateSpherePositions(words.length), mergedOptions);
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
 * WordSphere
 * Written by Hyojun Kim in 2017. Licensed in MIT.
 * Modified for React TypeScript compatibility
 */
function wordSphere(
  canvas: HTMLCanvasElement, 
  texts: string[], 
  positions: { x: number; y: number; z: number }[], 
  options: WordSphereOptions
) {
  const {
    width = 500,
    height = 500,
    radius = 150,
    fontSize = 22,
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
  
  ctx.textAlign = 'center';
  
  // Hi-DPI support
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(2,2); 

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

    texts.forEach((text, i) => {
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
      const size = fontSize + 2 + 5*(x/radius);
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.font = `${size}px "Helvetica Neue", sans-serif`;
      ctx.fillText(text, y + width/2, -z + height/2);
    });
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
  
  startLoop();
}
