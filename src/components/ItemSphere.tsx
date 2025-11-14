import React, { useRef, useEffect, useState } from "react";
// Velvet rope SVG component
const VelvetRope: React.FC<{ onPull: () => void }> = ({ onPull }) => (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      right: 20,
      zIndex: 10,
      cursor: "pointer",
      userSelect: "none",
      pointerEvents: "auto",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
    }}
    onClick={onPull}
    aria-label="Toggle ItemSphere collapse"
  >
    <svg width="50" height="120" viewBox="0 0 50 120" fill="none">
      {/* Rope body */}
      <rect
        x="20"
        y="10"
        width="10"
        height="80"
        rx="5"
        fill="#8B0000"
        stroke="#4A0000"
        strokeWidth="1"
      />
      <rect x="22" y="12" width="6" height="76" rx="3" fill="#B22222" />
      {/* Tassels at bottom */}
      <ellipse
        cx="25"
        cy="95"
        rx="15"
        ry="8"
        fill="#8B0000"
        stroke="#4A0000"
        strokeWidth="1"
      />
      <ellipse cx="25" cy="100" rx="12" ry="6" fill="#B22222" />
      <ellipse cx="25" cy="105" rx="10" ry="4" fill="#8B0000" opacity="0.8" />
      {/* Knot at top */}
      <circle
        cx="25"
        cy="15"
        r="8"
        fill="#8B0000"
        stroke="#4A0000"
        strokeWidth="1"
      />
      <circle cx="25" cy="15" r="5" fill="#B22222" />
      {/* Small details */}
      <rect
        x="18"
        y="20"
        width="14"
        height="2"
        rx="1"
        fill="#4A0000"
        opacity="0.5"
      />
      <rect
        x="18"
        y="30"
        width="14"
        height="2"
        rx="1"
        fill="#4A0000"
        opacity="0.5"
      />
      <rect
        x="18"
        y="40"
        width="14"
        height="2"
        rx="1"
        fill="#4A0000"
        opacity="0.5"
      />
    </svg>
  </div>
);

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
  iconSize?: number;
}

export const ItemSphere: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
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
    // Collapse animation state
    const collapseAnim = { progress: 0, target: collapsed ? 1 : 0 };
    let collapseStart: number | null = null;
    function draw(now?: number) {
      const nowVal = typeof now === "number" ? now : performance.now();
      const size = sizeRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      // Apply collapse scale to shrink to center
      const collapseScale = 1 - 0.8 * collapseAnim.progress;
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(collapseScale, collapseScale);
      ctx.translate(-size / 2, -size / 2);
      if (state.current.auto && !state.current.dragging) {
        state.current.rx += state.current.vx;
        state.current.rz += state.current.vy;
      }
      // Animate collapse progress
      collapseAnim.target = collapsed ? 1 : 0;
      if (collapseAnim.progress !== collapseAnim.target) {
        if (collapseStart === null) collapseStart = nowVal;
        const elapsed = nowVal - collapseStart;
        const direction = collapseAnim.target > collapseAnim.progress ? 1 : -1;
        collapseAnim.progress += direction * (elapsed / 700);
        collapseAnim.progress = Math.max(0, Math.min(1, collapseAnim.progress));
        if (Math.abs(collapseAnim.progress - collapseAnim.target) < 0.01) {
          collapseAnim.progress = collapseAnim.target;
          collapseStart = null;
        }
      } else {
        collapseStart = null;
      }

      const projected = positions.map((pos, i) => {
        const { x, y, z } = pos;
        const y1 =
          y * Math.cos(state.current.rx) - z * Math.sin(state.current.rx);
        const z1 =
          y * Math.sin(state.current.rx) + z * Math.cos(state.current.rx);
        const x2 =
          x * Math.cos(state.current.rz) - z1 * Math.sin(state.current.rz);
        const z2 =
          x * Math.sin(state.current.rz) + z1 * Math.cos(state.current.rz);
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
        const elapsed = nowVal - mountTimeRef.current;
        const fadeInAlpha = Math.min(
          1,
          Math.max(0, (elapsed - iconDelay) / fadeInDuration)
        );
        // 3D fade as before
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
      ctx.restore(); // Restore after collapse scale
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
      className="sphere"
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: -1,
      }}
    >
      <VelvetRope onPull={() => setCollapsed(!collapsed)} />
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
