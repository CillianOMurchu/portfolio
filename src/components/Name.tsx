const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Name() {
  const { session } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isHovered) {
      // Show info box partway through animation
      const timer = setTimeout(() => setShowText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isHovered]);

  const name = isMobile && session ? "C Ó M" : "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  const isShortCOM = isMobile && session;

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

  return (
    <div className="relative">
      <div
        className={
          isShortCOM
            ? "relative w-fit min-w-[4.5rem] px-2 h-10"
            : "relative w-64 h-20"
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            left: 50%;
            top: 100%;
            transform: translate(-50%, -50%);
            animation: 
              orb-down 0.3s ease-out forwards,
              orb-fade 0.3s 0.3s ease-out forwards;
          }

          /* Orb goes down from name to info box */
          @keyframes orb-down {
            0% {
              opacity: 1;
              left: 50%;
              top: 100%;
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
            left: 50%;
            top: 100%;
            width: 2px;
            height: 0;
            transform: translateX(-50%);
            animation: trail-down-grow 0.2s ease-out forwards,
                       trail-fade 0.2s 0.2s ease-out forwards;
          }

          @keyframes trail-down-grow {
            0% {
              opacity: 1;
              height: 0;
            }
            100% {
              opacity: 1;
              height: 2rem;
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
            animation: info-appear 0.3s 0.3s forwards;
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
            />
            <div 
              className="trail-line trail-down"
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