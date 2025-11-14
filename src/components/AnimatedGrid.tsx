import { useEffect, useState } from "react";


export default function AnimatedGrid() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
    duration: number;
    isVertical: boolean;
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
    const gridSpacing = 48;
    // Vertical lines
    for (let x = 0; x <= width; x += gridSpacing) {
      const delay = 0;
      const duration = 0.7 + Math.random() * 0.7;
      generated.push({
        x1: x,
        y1: 0,
        x2: x,
        y2: height,
        delay,
        duration,
        isVertical: true,
      });
    }
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSpacing) {
      const delay = 0;
      const duration = 0.7 + Math.random() * 0.7;
      generated.push({
        x1: 0,
        y1: y,
        x2: width,
        y2: y,
        delay,
        duration,
        isVertical: false,
      });
    }
    setLines(generated);
  }, [dimensions]);

  return (
  <div className="absolute w-full h-full pointer-events-none z-0">
      <svg
        className="w-full h-full"
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {lines.map((line, i) => {
          // Animate line growth for grid: vertical grows y1->y2, horizontal grows x1->x2
          return (
            <g key={i}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.isVertical ? line.x1 : line.x2}
                y2={line.isVertical ? line.y1 : line.y2}
                stroke="#10b981"
                strokeWidth="1.5"
                opacity="0.7"
              >
                {line.isVertical ? (
                  <animate
                    attributeName="y2"
                    from={line.y1}
                    to={line.y2}
                    dur={`${line.duration}s`}
                    begin={`${line.delay}s`}
                    fill="freeze"
                    keySplines="0.42 0 0.58 1"
                    calcMode="spline"
                  />
                ) : (
                  <animate
                    attributeName="x2"
                    from={line.x1}
                    to={line.x2}
                    dur={`${line.duration}s`}
                    begin={`${line.delay}s`}
                    fill="freeze"
                    keySplines="0.42 0 0.58 1"
                    calcMode="spline"
                  />
                )}
              </line>
              {/* Green orb at the growing end */}
              <circle
                r={4.5}
                fill="url(#orbGradient)"
                opacity="0.85"
                cx={line.isVertical ? line.x1 : line.x2}
                cy={line.isVertical ? line.y1 : line.y2}
              >
                {line.isVertical ? (
                  <animate
                    attributeName="cy"
                    from={line.y1}
                    to={line.y2}
                    dur={`${line.duration}s`}
                    begin={`${line.delay}s`}
                    fill="freeze"
                    keySplines="0.42 0 0.58 1"
                    calcMode="spline"
                  />
                ) : (
                  <animate
                    attributeName="cx"
                    from={line.x1}
                    to={line.x2}
                    dur={`${line.duration}s`}
                    begin={`${line.delay}s`}
                    fill="freeze"
                    keySplines="0.42 0 0.58 1"
                    calcMode="spline"
                  />
                )}
                <animate
                  attributeName="opacity"
                  from="0"
                  to="0.85"
                  dur="0.2s"
                  begin={`${line.delay}s`}
                  fill="freeze"
                />
              </circle>
            </g>
          );
        })}
        {/* Orb gradient definition */}
        <defs>
          <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="1" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
