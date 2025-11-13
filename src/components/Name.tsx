const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Name() {
  // Responsive name: short for mobile, full for larger screens, only show short if signed in
  const { session } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const name = isMobile && session ? "C Ó M" : "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  const isShortCOM = isMobile && session;
  return (
    <div
      className={
        isShortCOM
          ? "relative w-fit min-w-[4.5rem] px-2 h-10"
          : "relative w-64 h-20"
      }
    >
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

      <div className="absolute inset-0" />
      {!isShortCOM && (
        <div
          className="absolute inset-3 border border-emerald-500/25"
          style={{ clipPath: hexagonClip }}
        />
      )}

      <div
        className={
          [
            "absolute inset-0 flex items-center",
            (isMobile && !session) ? "justify-center" : "justify-center"
          ].join(" ")
        }
      >
        <span
          className={
            isShortCOM
              ? "text-emerald-400 text-[13px] tracking-[0.25em]"
              : "text-emerald-400 text-[11px] tracking-wider"
          }
          style={{
            textShadow: `0 0 5px rgba(16,185,129,0.8),0 0 10px rgba(16,185,129,0.6),0 0 15px rgba(16,185,129,0.4),0 0 20px rgba(16,185,129,0.3)`,
          }}
        >
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
