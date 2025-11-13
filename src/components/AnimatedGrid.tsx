import { useEffect, useState } from "react";


export default function AnimatedGrid() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const spacing = 10;

  type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
  };
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    function updateDimensions() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    const generated: Line[] = [];
    for (let x = 0; x <= width; x += spacing) {
      const delay = Math.random() * 1.5;
      generated.push({ x1: x, y1: 0, x2: x, y2: height, delay });
    }
    for (let y = 0; y <= height; y += spacing) {
      const delay = Math.random() * 1.5;
      generated.push({ x1: 0, y1: y, x2: width, y2: y, delay });
    }
    setLines(generated);
  }, [dimensions]);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
      <svg
        className="w-full h-full"
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {lines.map((line, i) => {
          const length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#065f46"
              strokeWidth="0.5"
              opacity="0.4"
              strokeDasharray={length}
              strokeDashoffset={length}
              style={{
                animation: `drawLine 1s forwards ease-in-out`,
                animationDelay: `${line.delay}s`,
              }}
            />
          );
        })}
      </svg>
      {/* Global style for animation */}
      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
