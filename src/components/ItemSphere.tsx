import React, { useRef, useEffect } from "react";
// Vite: Import all SVGs from the programming-icons folder
const svgModules = import.meta.glob("../assets/programming-icons/*.svg", {
  eager: true,
  as: "url",
});
const iconNames = Object.keys(svgModules)
  .map((path) => {
    const match = path.match(/\/([^/]+)\.svg$/);
    return match ? match[1] : "";
  })
  .filter(Boolean);

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

// Store mount time and animation state outside component so they never reset
let globalMountTime: number | null = null;
const persistentState = {
  rx: Math.PI * 0.14,
  rz: 0,
  vx: 0.01,
  vy: 0.015,
};

function getPersistentMountTime() {
  if (globalMountTime === null) {
    globalMountTime = performance.now();
    console.log("[ItemSphere] Mount time set:", globalMountTime);
  } else {
    console.log("[ItemSphere] Mount time reused:", globalMountTime);
  }
  return globalMountTime;
}

export const ItemSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef(100);
  const screenSizeRef = useRef({ width: 0, height: 0 });
  
  // Dynamic icon size based on screen size
  const getIconSize = () => {
    const width = screenSizeRef.current.width;
    if (width >= 1536) return 80; // 2xl screens
    if (width >= 1280) return 70; // xl screens
    if (width >= 1024) return 60; // lg screens
    if (width >= 768) return 50; // md screens
    return 40; // sm and mobile
  };
  
  const positions = generateFibonacciSphere(iconNames.length);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const fadeInDuration = 400;
  const fadeInStagger = 60;

  useEffect(() => {
    if (Object.keys(imagesRef.current).length === iconNames.length) return;
    iconNames.forEach((name) => {
      const img = new window.Image();
      const svgPath = Object.keys(svgModules).find((p) =>
        p.endsWith(`/${name}.svg`)
      );
      if (svgPath) {
        img.src = svgModules[svgPath] as string;
        imagesRef.current[name] = img;
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Update screen size tracking
    const updateScreenSize = () => {
      screenSizeRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    updateScreenSize();
    
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const min = Math.min(rect.width, rect.height);
      sizeRef.current = min;
      canvas.width = min * window.devicePixelRatio;
      canvas.height = min * window.devicePixelRatio;
      canvas.style.width = `${min}px`;
      canvas.style.height = `${min}px`;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );
    };
    resize();
    const ro = new window.ResizeObserver(resize);
    ro.observe(container);

    let animationId: number;
    const mountTime = getPersistentMountTime();
    // Use persistentState for animation so it never resets
    const state = persistentState;
    function draw(now?: number) {
      const nowVal = typeof now === "number" ? now : performance.now();
      const size = sizeRef.current;
      const iconSize = getIconSize();
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(1, 1);
      ctx.translate(-size / 2, -size / 2);
      state.rx += state.vx;
      state.rz += state.vy;
      const projected = positions.map((pos, i) => {
        const { x, y, z } = pos;
        const y1 = y * Math.cos(state.rx) - z * Math.sin(state.rx);
        const z1 = y * Math.sin(state.rx) + z * Math.cos(state.rx);
        const x2 = x * Math.cos(state.rz) - z1 * Math.sin(state.rz);
        const z2 = x * Math.sin(state.rz) + z1 * Math.cos(state.rz);
        return { name: iconNames[i], x: x2, y: y1, z: z2, index: i };
      });
      projected.sort((a, b) => a.z - b.z);
      for (const icon of projected) {
        const perspective = 1.2 / (1.6 - icon.z);
        const x2d = size / 2 + icon.x * size * 0.36 * perspective;
        const y2d = size / 2 + icon.y * size * 0.36 * perspective;
        const scale = perspective;
        const scaledIconSize = iconSize * scale;
        const img = imagesRef.current[icon.name];
        const iconDelay = icon.index * fadeInStagger;
        const elapsed = nowVal - mountTime;
        const fadeInAlpha = Math.min(
          1,
          Math.max(0, (elapsed - iconDelay) / fadeInDuration)
        );
        const fade3d = 0.4 + 0.6 * ((icon.z + 1) / 2);
        const isFrontAndLarge = icon.z > 0.8;
        const finalAlpha = isFrontAndLarge ? 1 : fade3d * fadeInAlpha;
        if (img && img.complete && finalAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = finalAlpha;
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
      ctx.restore();
      animationId = requestAnimationFrame(draw);
    }
    draw();
    
    // Add window resize listener to track screen size changes
    window.addEventListener("resize", updateScreenSize);
    
    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener("resize", updateScreenSize);
    };
  });

  return (
    <div
      className="sphere"
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: -1,
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            borderRadius: "50%",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default ItemSphere;
