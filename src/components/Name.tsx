const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

export function Name() {
  const { session } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);

  const isActive = clickActive || hoverActive;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Delay text appearance until orbs complete their animation
      const timer = setTimeout(() => setShowText(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isActive]);

  const name = isMobile && session ? "C Ó M" : "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  const isShortCOM = isMobile && session;

  const bioText =
    "Full-stack developer specializing in modern web technologies and creative digital experiences.";
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

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow fade out
      const timer = setTimeout(() => setIsVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (isMobile && isActive) {
      const handleClickOutside = (e: MouseEvent) => {
        if (nameRef.current && !nameRef.current.contains(e.target as Node)) {
          // Clicked outside the name
          setClickActive(false);
        } else if (e.clientY > window.innerHeight / 2) {
          // Clicked in bottom 50%
          setClickActive(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobile, isActive]);

  return (
    <div className="relative w-fit-content h-20">
      <div 
        ref={nameRef}
        className={
          isShortCOM
            ? "relative w-fit min-w-[4.5rem] px-2 h-10"
            : "relative w-64 h-20"
        }
        onClick={() => setClickActive(!clickActive)}
        onMouseEnter={!isMobile ? () => setHoverActive(true) : undefined}
        onMouseLeave={!isMobile ? () => setHoverActive(false) : undefined}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          cursor: "pointer",
          transform: isPressed ? "scale(0.95)" : "scale(1)",
          transition: "transform 0.1s ease-out",
          height: "100%",
        }}
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
          }

          .orb-center {
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            animation: orb-down 0.6s ease-out forwards;
          }

          .orb-left {
            left: 50%;
            top: calc(100% + 2rem);
            transform: translateX(-50%);
            animation: orb-left 0.6s 0.6s ease-out forwards;
          }

          .orb-right {
            left: 50%;
            top: calc(100% + 2rem);
            transform: translateX(-50%);
            animation: orb-right 0.6s 0.6s ease-out forwards;
          }

          @keyframes orb-down {
            0% {
              opacity: 1;
              top: 100%;
            }
            100% {
              opacity: 1;
              top: calc(100% + 2rem);
            }
          }

          @keyframes orb-left {
            0% {
              opacity: 1;
              left: 50%;
            }
            100% {
              opacity: 0;
              left: 0%;
            }
          }

          @keyframes orb-right {
            0% {
              opacity: 1;
              left: 50%;
            }
            100% {
              opacity: 0;
              left: 100%;
            }
          }

          .border-draw {
            opacity: 0;
            animation: border-appear 0.4s 1.2s forwards;
          }

          @keyframes border-appear {
            to {
              opacity: 1;
            }
          }

          .fade-out {
            animation: exit-sequence 0.8s ease-out forwards;
            overflow: hidden;
          }

          @keyframes exit-sequence {
            0% { width: 320px; height: auto; opacity: 1; }
            30% { width: 320px; height: auto; opacity: 0; }
            60% { width: 0px; height: auto; opacity: 0; }
            100% { width: 0px; height: 0px; opacity: 0; }
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
          className={[
            "absolute inset-0 flex items-center",
            isMobile && !session ? "justify-center" : "justify-center",
          ].join(" ")}
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

        {/* Animated orbs */}
        {isActive && (
          <>
            <div className="orb orb-center" />
            <div className="orb orb-left" />
            <div className="orb orb-right" />
          </>
        )}
      </div>

      {isVisible && (
        <div
          className={`info-box border-draw relative left-1/2 -translate-x-1/2 mt-2 w-80 max-w-[90vw] border border-emerald-500/60 bg-black/80 backdrop-blur-sm p-4 rounded ${
            isActive ? "" : "fade-out"
          }`}
          style={{
            boxShadow: `0 0 10px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.2), inset 0 0 20px rgba(16,185,129,0.05)`,
            transform: "translate(-50%, 0)",
            maxWidth: "calc(100vw - 2rem)", // Ensure it respects screen boundaries
            left: "50%", // Center horizontally
          }}
        >
          <p
            className="text-emerald-400 text-sm tracking-wide leading-relaxed"
            style={{
              textShadow: `0 0 3px rgba(16,185,129,0.5)`,
              fontFamily: "system-ui, -apple-system, sans-serif",
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
