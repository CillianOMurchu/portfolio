import React, { useRef, useEffect } from "react";

// Vite: Import all SVGs from the programming-icons folder
const svgModules = import.meta.glob('../assets/programming-icons/*.svg', { eager: true, as: 'url' });
const iconNames = Object.keys(svgModules).map((path) => {
  const match = path.match(/\/([^/]+)\.svg$/);
  return match ? match[1] : '';
}).filter(Boolean);


// Fibonacci sphere algorithm for 3D positions
function generateFibonacciSphere(count: number) {
  const positions = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    positions.push({ x, y, z });
  }
  return positions;
}


export const ItemSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 320;
  const iconSize = 40;
  const positions = generateFibonacciSphere(iconNames.length);
  // Preload all SVG images as HTMLImageElement
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    // Only load once
    if (Object.keys(imagesRef.current).length === iconNames.length) return;
    iconNames.forEach((name) => {
      const img = new window.Image();
      // Vite import.meta.glob returns a URL string
      const svgPath = Object.keys(svgModules).find((p) => p.endsWith(`/${name}.svg`));
      if (svgPath) {
        img.src = svgModules[svgPath] as string;
        imagesRef.current[name] = img;
      }
    });
  }, []);

  // Rotation state
  const state = useRef({
    rx: Math.PI * 0.14, // X axis rotation
    rz: 0,              // Y axis rotation
    vx: 0.01,           // X velocity
    vy: 0.015,          // Y velocity
    dragging: false,
    lastX: 0,
    lastY: 0,
    auto: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      // Update rotation
      if (state.current.auto && !state.current.dragging) {
        state.current.rx += state.current.vx;
        state.current.rz += state.current.vy;
      }

      // Project and draw each icon
      const projected = positions.map((pos, i) => {
        // 3D rotation
        // Rotate around X (rx) and then Y (rz)
        const { x, y, z } = pos;
        // X axis
        const y1 = y * Math.cos(state.current.rx) - z * Math.sin(state.current.rx);
        const z1 = y * Math.sin(state.current.rx) + z * Math.cos(state.current.rx);
        // Y axis
        const x2 = x * Math.cos(state.current.rz) - z1 * Math.sin(state.current.rz);
        const z2 = x * Math.sin(state.current.rz) + z1 * Math.cos(state.current.rz);
        return { name: iconNames[i], x: x2, y: y1, z: z2 };
      });
      // Sort by z for painter's algorithm
      projected.sort((a, b) => b.z - a.z);
      for (const icon of projected) {
        // 3D to 2D projection
        const perspective = 1.2 / (1.6 - icon.z);
        const x2d = size / 2 + icon.x * size * 0.36 * perspective;
        const y2d = size / 2 + icon.y * size * 0.36 * perspective;
        // Scale icon size based on perspective (closer = bigger)
        const scale = perspective; // scale is proportional to perspective
        const scaledIconSize = iconSize * scale;
        // Draw preloaded SVG image at (x2d, y2d)
        const img = imagesRef.current[icon.name];
        if (img && img.complete) {
          ctx.save();
          // Fade based on z: front = 1, back = 0.4 (make front icons much clearer)
          const fade = 0.4 + 0.6 * ((icon.z + 1) / 2); // z in [-1,1] → [0.4,1]
          ctx.globalAlpha = fade;
          ctx.drawImage(
            img,
            x2d - scaledIconSize / 2,
            y2d - scaledIconSize / 2,
            scaledIconSize,
            scaledIconSize
          );
          ctx.restore();
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();

    // Drag interaction
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      state.current.dragging = true;
      state.current.auto = false;
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      // Adjust rotation speed for drag
      state.current.rz += dx * 0.01;
      state.current.rx += dy * 0.01;
      // Clamp rx to avoid flipping
      state.current.rx = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.current.rx));
    }
    function onPointerUp() {
      dragging = false;
      state.current.dragging = false;
      // Resume auto-rotation after short delay
      setTimeout(() => { state.current.auto = true; }, 1200);
    }
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [positions]);

  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={canvasRef} width={size} height={size} style={{ background: "#fff", borderRadius: "50%", boxShadow: "0 2px 16px #0001" }} />
    </div>
  );
};

export default ItemSphere;