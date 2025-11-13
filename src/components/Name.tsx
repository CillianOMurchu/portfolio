import AnimatedGrid from "./AnimatedGrid";

const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

export function Name() {
  const name = "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  return (
    <div className="relative w-64 h-20">
      <style>{`
        .fadein-letter {
          opacity: 0;
          display: inline-block;
          will-change: opacity, transform;
          transform: translateY(10px);
          animation: fadein-up 0.5s forwards;
        }
        @keyframes fadein-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <AnimatedGrid />


      <div className="absolute inset-0" style={{ /* clipPath: hexagonClip */ }} />
      <div className="absolute inset-3 border border-emerald-500/25" style={{ clipPath: hexagonClip }} />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-emerald-400 text-[11px] tracking-wider" style={{ textShadow: `0 0 5px rgba(16,185,129,0.8),0 0 10px rgba(16,185,129,0.6),0 0 15px rgba(16,185,129,0.4),0 0 20px rgba(16,185,129,0.3)` }}>
          {letters.map((char, i) => (
            <span
              key={i}
              className="fadein-letter"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
