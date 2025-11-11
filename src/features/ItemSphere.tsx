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

interface Props {
  iconSize: number;
}

export const ItemSphere: React.FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef(100); // Will be set by ResizeObserver
  const iconSize = props.iconSize || 40;
  const positions = generateFibonacciSphere(iconNames.length);
  // Preload all SVG images as HTMLImageElement
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});

  // Cascade fade-in timing
  const fadeInDuration = 400; // ms for each icon to fade in
  const fadeInStagger = 60; // ms delay between each icon
  const mountTimeRef = useRef<number>(0);

  useEffect(() => {
    // Only load once
    if (Object.keys(imagesRef.current).length === iconNames.length) return;
    iconNames.forEach((name) => {
      const img = new window.Image();
      // Vite import.meta.glob returns a URL string
      const svgPath = Object.keys(svgModules).find((p) =>
        p.endsWith(`/${name}.svg`)
      );
      if (svgPath) {
        img.src = svgModules[svgPath] as string;
        imagesRef.current[name] = img;
      }
    });
  }, []);

  // Rotation state
  const state = useRef({
    rx: Math.PI * 0.14, // X axis rotation
    rz: 0, // Y axis rotation
    vx: 0.01, // X velocity
    vy: 0.015, // Y velocity
    dragging: false,
    lastX: 0,
    lastY: 0,
    auto: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive: observe container size
    //
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
    if (!mountTimeRef.current) mountTimeRef.current = performance.now();
    function draw() {
      const now = performance.now();
      const size = sizeRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      if (state.current.auto && !state.current.dragging) {
        state.current.rx += state.current.vx;
        state.current.rz += state.current.vy;
      }
      const projected = positions.map((pos, i) => {
        const { x, y, z } = pos;
        const y1 = y * Math.cos(state.current.rx) - z * Math.sin(state.current.rx);
        const z1 = y * Math.sin(state.current.rx) + z * Math.cos(state.current.rx);
        const x2 = x * Math.cos(state.current.rz) - z1 * Math.sin(state.current.rz);
        const z2 = x * Math.sin(state.current.rz) + z1 * Math.cos(state.current.rz);
        return { name: iconNames[i], x: x2, y: y1, z: z2, index: i };
      });
      projected.sort((a, b) => b.z - a.z);
      for (const icon of projected) {
        const perspective = 1.2 / (1.6 - icon.z);
        const x2d = size / 2 + icon.x * size * 0.36 * perspective;
        const y2d = size / 2 + icon.y * size * 0.36 * perspective;
        const scale = perspective;
        const scaledIconSize = iconSize * scale;
        const img = imagesRef.current[icon.name];
        // Cascade fade-in calculation
        const iconDelay = icon.index * fadeInStagger;
        const elapsed = now - mountTimeRef.current;
        const fadeInAlpha = Math.min(1, Math.max(0, (elapsed - iconDelay) / fadeInDuration));
        // 3D fade as before
        const fade3d = 0.4 + 0.6 * ((icon.z + 1) / 2);
        const finalAlpha = fade3d * fadeInAlpha;
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
      state.current.rz += dx * 0.01;
      state.current.rx += dy * 0.01;
      state.current.rx = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, state.current.rx)
      );
    }
    function onPointerUp() {
      dragging = false;
      state.current.dragging = false;
      setTimeout(() => {
        state.current.auto = true;
      }, 1200);
    }
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      ro.disconnect();
    };
  });

  return (
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
          boxShadow: "0 2px 16px #0001",
          display: "block",
        }}
      />
    </div>
  );
};

export default ItemSphere;
