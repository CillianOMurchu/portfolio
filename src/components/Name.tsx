import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useOrbOrigin } from "./OrbOriginContext";
import AnimatedGrid from "./AnimatedGrid";
import { useAuth } from "../hooks/useAuth";

const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

export function Name() {
  const location = useLocation();
  const { session } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [orbStart, setOrbStart] = useState({ x: 50, y: 100 });
  const oCharRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isHovered) {
      // Show info box partway through animation
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isHovered]);

  const name = isMobile && session ? "C Ó M" : "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  const isShortCOM = isMobile && session;
  
  // Find the index of Ó character
  const oIndex = name.indexOf("Ó");

  const bioText = "Full-stack developer specializing in modern web technologies and creative digital experiences.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (showText) {
      let index = 0;
      setDisplayedText("");
      const timer = setInterval(() => {
        if (index < bioText.length) {
          setDisplayedText(bioText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [showText]);

  const { setOrbOrigin } = useOrbOrigin();
  useLayoutEffect(() => {
    if (oCharRef.current) {
      const oRect = oCharRef.current.getBoundingClientRect();
      const center = {
        x: oRect.left + oRect.width / 2,
        y: oRect.top + oRect.height / 2,
      };
      setOrbOrigin(center);
    }
    if (isHovered && oCharRef.current && containerRef.current) {
      const oRect = oCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      // Calculate the center of the Ó character
      const oCenterX = oRect.left + oRect.width / 2;
      const oCenterY = oRect.top + oRect.height / 2;
      // Convert to percentage relative to container
      const xPercent = ((oCenterX - containerRect.left) / containerRect.width) * 100;
      const yPercent = ((oCenterY - containerRect.top) / containerRect.height) * 100;
      setOrbStart({
        x: xPercent,
        y: yPercent,
      });
    }
  }, [isHovered, name, setOrbOrigin]);

  // Only allow hover on welcome or auth screens
  const allowHover = ["/", "/auth"].includes(location.pathname);

  return (
    <div className="relative">
      {/* Animated grid background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatedGrid />
      </div>
      <div
        className={
          isShortCOM
            ? "relative w-fit min-w-[4.5rem] px-2 h-10"
            : "relative w-64 h-20"
        }
        onMouseEnter={() => allowHover && setIsHovered(true)}
        onMouseLeave={() => allowHover && setIsHovered(false)}
        ref={containerRef}
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

          .orb {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 10px #10b981, 0 0 20px #10b981, 0 0 30px #10b981;
            opacity: 0;
            z-index: 20;
          }

          .orb-trace {
            transform: translate(-50%, -50%);
            animation: 
              orb-birth 0.2s ease-out forwards,
              orb-glow 0.5s 0.2s ease-in-out forwards,
              orb-down 0.3s 0.7s ease-out forwards,
              orb-fade 0.3s 1.0s ease-out forwards;
          }

          /* Orb appears inside the Ó */
          @keyframes orb-birth {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          /* Orb glows in place */
          @keyframes orb-glow {
            0%, 100% {
              opacity: 1;
              filter: brightness(1);
            }
            50% {
              opacity: 1;
              filter: brightness(1.5);
            }
          }

          /* Orb goes down from Ó to info box */
          @keyframes orb-down {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 1;
              left: 50%;
              top: calc(100% + 2rem);
            }
          }

          @keyframes orb-fade {
            to {
              opacity: 0;
            }
          }

          /* Trail line */
          .trail-line {
            position: absolute;
            background: #10b981;
            box-shadow: 0 0 10px #10b981, 0 0 20px #10b981;
            opacity: 0;
          }

          .trail-down {
            width: 2px;
            height: 0;
            transform: translateX(-50%);
            animation: trail-down-grow 0.3s 0.7s ease-out forwards;
          }

          @keyframes trail-down-grow {
            0% {
              opacity: 1;
              height: 0;
              left: var(--orb-x);
              top: var(--orb-y);
            }
            100% {
              opacity: 1;
              height: calc(100% + 2rem - var(--orb-y) * 1%);
              left: 50%;
              top: var(--orb-y);
            }
          }

          .trail-top {
            left: 50%;
            top: calc(100% + 2rem);
            width: 0;
            height: 2px;
            transform: translateY(-50%);
            animation: trail-top-grow 0.3s 0.2s ease-out forwards,
                       trail-fade 0.2s 0.5s ease-out forwards;
          }

          @keyframes trail-top-grow {
            0% {
              opacity: 1;
              width: 0;
            }
            100% {
              opacity: 1;
              width: 50%;
            }
          }

          .trail-right {
            left: 100%;
            top: calc(100% + 2rem);
            width: 2px;
            height: 0;
            transform: translateX(-50%);
            animation: trail-right-grow 0.3s 0.5s ease-out forwards,
                       trail-fade 0.2s 0.8s ease-out forwards;
          }

          @keyframes trail-right-grow {
            0% {
              opacity: 1;
              height: 0;
            }
            100% {
              opacity: 1;
              height: var(--box-height);
            }
          }

          .trail-bottom {
            left: 100%;
            top: calc(100% + 2rem + var(--box-height));
            width: 0;
            height: 2px;
            transform: translateY(-50%);
            animation: trail-bottom-grow 0.3s 0.8s ease-out forwards,
                       trail-fade 0.2s 1.1s ease-out forwards;
          }

          @keyframes trail-bottom-grow {
            0% {
              opacity: 1;
              width: 0;
            }
            100% {
              opacity: 1;
              width: 100%;
              transform: translateY(-50%) translateX(-100%);
            }
          }

          .trail-left {
            left: 0%;
            top: calc(100% + 2rem + var(--box-height));
            width: 2px;
            height: 0;
            animation: trail-left-grow 0.3s 1.1s ease-out forwards,
                       trail-fade 0.2s 1.4s ease-out forwards;
          }

          @keyframes trail-left-grow {
            0% {
              opacity: 1;
              height: 0;
            }
            100% {
              opacity: 1;
              height: var(--box-height);
              transform: translateY(-100%);
            }
          }

          @keyframes trail-fade {
            to {
              opacity: 0;
            }
          }

          .info-box {
            opacity: 0;
            animation: info-appear 0.3s 0.8s forwards;
          }

          @keyframes info-appear {
            to {
              opacity: 1;
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
          className="absolute inset-0 flex items-center justify-center"
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
                ref={i === oIndex ? oCharRef : null}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </div>

        {/* Animated orb and trail */}
        {isHovered && (
          <>
            <div 
              className="orb orb-trace"
              style={{ left: `${orbStart.x}%`, top: `${orbStart.y}%` }}
            />
            <div 
              className="trail-line trail-down"
              style={{ 
                '--orb-x': `${orbStart.x}%`, 
                '--orb-y': `${orbStart.y}%` 
              } as React.CSSProperties}
            />
          </>
        )}
      </div>

      {/* Info box - directly underneath name */}
      {isHovered && (
        <div
          className="info-box absolute left-0 mt-8 w-80 max-w-[calc(100vw-40px)] h-24 border border-emerald-500/60 bg-black/80 backdrop-blur-sm p-4 rounded"
          style={{
            boxShadow: `0 0 10px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.2), inset 0 0 20px rgba(16,185,129,0.05)`,
          }}
        >
          <p
            className="text-emerald-400 text-sm tracking-wide leading-relaxed"
            style={{
              textShadow: `0 0 3px rgba(16,185,129,0.5)`,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {displayedText}
            {showText && displayedText.length < bioText.length && (
              <span className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-[2px] animate-pulse" />
            )}
          </p>
        </div>
      )}
    </div>
  );
}