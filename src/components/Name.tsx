const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { createAnimationQueue, createAnimationStep } from "../utils/animationQueue";

export function Name() {
  const { session } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const animationQueueRef = useRef(createAnimationQueue());

  const isActive = clickActive || hoverActive;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup animation queue on unmount
      animationQueueRef.current.stop();
    };
  }, []);

  const name = isMobile && session ? "C Ó M" : "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  const isShortCOM = isMobile && session;

  const bioText =
    "Full-stack developer specializing in modern web technologies and creative digital experiences.";
  const [displayedText, setDisplayedText] = useState("");
  const [showText, setShowText] = useState(false);
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Stop any existing animation queue
      animationQueueRef.current.stop();

      // Create new animation sequence
      const queue = createAnimationQueue();

      // Step 1: Show info box (wait for orbs animation to finish)
      queue.add(createAnimationStep(
        'show-info-box',
        () => setIsVisible(true),
        1200
      ));

      // Step 2: Wait for orbs to finish (1.2s total), then start typing
      queue.add(createAnimationStep(
        'start-typing',
        () => setShowText(true),
        1200
      ));

      // Start the animation sequence
      animationQueueRef.current = queue;
      queue.start();
    } else {
      // Stop animation queue and start fade out
      animationQueueRef.current.stop();
      setShowText(false);
      setIsFadingOut(true);
      // Start fade out immediately, hide after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsFadingOut(false);
        setDisplayedText("");
        setIsTypingFinished(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (showText) {
      let index = 0;
      setDisplayedText("");
      setIsTypingFinished(false);
      const timer = setInterval(() => {
        if (index < bioText.length) {
          setDisplayedText(bioText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTypingFinished(true);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [showText, bioText]);

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
    <>
      <div className="relative w-fit h-20">
        <div
          ref={nameRef}
          className={
            isShortCOM
              ? "relative w-fit min-w-[4.5rem] px-2 h-10"
              : "relative w-64 h-20"
          }
          onClick={isMobile ? () => setClickActive(!clickActive) : undefined}
          onMouseEnter={!isMobile ? () => setHoverActive(true) : undefined}
          onMouseLeave={!isMobile ? () => setHoverActive(false) : undefined}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          style={{
            cursor: "pointer",
            transform: isPressed ? "scale(0.95)" : "scale(1)",
            transition: "transform 0.1s cubic-bezier(.25,.75,.5,1.25)",
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
            z-index: 20;
          }

          .orb-center {
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            animation: orb-down 0.4s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .orb-left {
            left: 50%;
            top: calc(100% + 2rem);
            transform: translateX(-50%);
            animation: orb-left-horizontal 0.4s 0.4s cubic-bezier(.25,.75,.5,1.25) forwards,
                       orb-left-vertical 0.5s 0.8s cubic-bezier(.25,.75,.5,1.25) forwards,
                       orb-left-bottom 0.4s 1.3s cubic-bezier(.25,.75,.5,1.25) forwards,
                       orb-fade-out 0.3s 1.7s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .orb-right {
            left: 50%;
            top: calc(100% + 2rem);
            transform: translateX(-50%);
            animation: orb-right-horizontal 0.4s 0.4s cubic-bezier(.25,.75,.5,1.25) forwards,
                       orb-right-vertical 0.5s 0.8s cubic-bezier(.25,.75,.5,1.25) forwards,
                       orb-right-bottom 0.4s 1.3s cubic-bezier(.25,.75,.5,1.25) forwards,
                       orb-fade-out 0.3s 1.7s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          /* Center orb going down */
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

          /* Left orb - horizontal to left edge */
          @keyframes orb-left-horizontal {
            0% {
              opacity: 1;
              left: 50%;
              top: calc(100% + 2rem);
            }
            100% {
              opacity: 1;
              left: calc(50% - 10rem);
              top: calc(100% + 2rem);
            }
          }

          /* Left orb - down the left side */
          @keyframes orb-left-vertical {
            0% {
              left: calc(50% - 10rem);
              top: calc(100% + 2rem);
            }
            100% {
              left: calc(50% - 10rem);
              top: calc(100% + 2rem + 6rem);
            }
          }

          /* Left orb - along bottom to center */
          @keyframes orb-left-bottom {
            0% {
              left: calc(50% - 10rem);
              top: calc(100% + 2rem + 6rem);
            }
            100% {
              left: calc(50% - 5rem);
              top: calc(100% + 2rem + 6rem);
            }
          }

          /* Right orb - horizontal to right edge */
          @keyframes orb-right-horizontal {
            0% {
              opacity: 1;
              left: 50%;
              top: calc(100% + 2rem);
            }
            100% {
              opacity: 1;
              left: calc(50% + 10rem);
              top: calc(100% + 2rem);
            }
          }

          /* Right orb - down the right side */
          @keyframes orb-right-vertical {
            0% {
              left: calc(50% + 10rem);
              top: calc(100% + 2rem);
            }
            100% {
              left: calc(50% + 10rem);
              top: calc(100% + 2rem + 6rem);
            }
          }

          /* Right orb - along bottom to center */
          @keyframes orb-right-bottom {
            0% {
              left: calc(50% + 10rem);
              top: calc(100% + 2rem + 6rem);
            }
            100% {
              left: calc(50% + 5rem);
              top: calc(100% + 2rem + 6rem);
            }
          }

          @keyframes orb-fade-out {
            to {
              opacity: 0;
            }
          }

          /* Trail lines */
          .trail-line {
            position: absolute;
            background: linear-gradient(90deg, transparent, #10b981, transparent);
            box-shadow: 0 0 10px #10b981, 0 0 20px #10b981;
            opacity: 0;
          }

          .trail-vertical-center {
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            width: 2px;
            height: 0;
            animation: trail-vertical-center 0.4s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .trail-horizontal-left {
            left: 50%;
            top: calc(100% + 2rem);
            transform: translateY(-50%);
            height: 2px;
            width: 0;
            animation: trail-horizontal-left 0.4s 0.4s cubic-bezier(.25,.75,.5,1.25) forwards,
                       trail-fade 0.3s 2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .trail-horizontal-right {
            left: 50%;
            top: calc(100% + 2rem);
            transform: translateY(-50%);
            height: 2px;
            width: 0;
            animation: trail-horizontal-right 0.4s 0.4s cubic-bezier(.25,.75,.5,1.25) forwards,
                       trail-fade 0.3s 2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .trail-vertical-left {
            left: calc(50% - 10rem);
            top: calc(100% + 2rem);
            transform: translateX(-50%);
            width: 2px;
            height: 0;
            animation: trail-vertical-side 0.5s 0.8s cubic-bezier(.25,.75,.5,1.25) forwards,
                       trail-fade 0.3s 2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .trail-vertical-right {
            left: calc(50% + 10rem);
            top: calc(100% + 2rem);
            transform: translateX(-50%);
            width: 2px;
            height: 0;
            animation: trail-vertical-side 0.5s 0.8s cubic-bezier(.25,.75,.5,1.25) forwards,
                       trail-fade 0.3s 2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .trail-bottom-left {
            left: calc(50% - 10rem);
            top: calc(100% + 2rem + 6rem);
            transform: translateY(-50%);
            height: 2px;
            width: 0;
            animation: trail-bottom-segment 0.4s 1.3s cubic-bezier(.25,.75,.5,1.25) forwards,
                       trail-fade 0.3s 2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          .trail-bottom-right {
            right: calc(50% - 10rem);
            top: calc(100% + 2rem + 6rem);
            transform: translateY(-50%);
            height: 2px;
            width: 0;
            animation: trail-bottom-segment 0.4s 1.3s cubic-bezier(.25,.75,.5,1.25) forwards,
                       trail-fade 0.3s 2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          @keyframes trail-vertical-center {
            0% {
              opacity: 1;
              height: 0;
            }
            100% {
              opacity: 1;
              height: 2rem;
            }
          }

          @keyframes trail-horizontal-left {
            0% {
              opacity: 1;
              width: 0;
            }
            100% {
              opacity: 1;
              width: 10rem;
              transform: translateY(-50%) translateX(-100%);
            }
          }

          @keyframes trail-horizontal-right {
            0% {
              opacity: 1;
              width: 0;
            }
            100% {
              opacity: 1;
              width: 10rem;
            }
          }

          @keyframes trail-vertical-side {
            0% {
              opacity: 1;
              height: 0;
            }
            100% {
              opacity: 1;
              height: 6rem;
            }
          }

          @keyframes trail-bottom-segment {
            0% {
              opacity: 1;
              width: 0;
            }
            100% {
              opacity: 1;
              width: 5rem;
            }
          }

          @keyframes trail-fade {
            to {
              opacity: 0;
            }
          }

          .border-draw {
            opacity: 0;
            animation: border-appear 0.4s 1.2s cubic-bezier(.25,.75,.5,1.25) forwards;
          }

          @keyframes border-appear {
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
            className={[
              "absolute inset-0 flex items-center",
              isMobile && !session ? "justify-center" : "justify-center",
            ].join(" ")}
          >
            <span
              className={
                isShortCOM
                  ? "text-emerald-400 text-[18px] tracking-[0.25em]"
                  : "text-emerald-400 text-[18px] tracking-wider"
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

          {/* Animated orbs and trails */}
          {isActive && (
            <>
              <div className="orb orb-center" />
              <div className="orb orb-left" />
              <div className="orb orb-right" />
              
              {/* Trail lines */}
              <div className="trail-line trail-vertical-center" />
              <div className="trail-line trail-horizontal-left" />
              <div className="trail-line trail-horizontal-right" />
              <div className="trail-line trail-vertical-left" />
              <div className="trail-line trail-vertical-right" />
              <div className="trail-line trail-bottom-left" />
              <div className="trail-line trail-bottom-right" />
            </>
          )}
        </div>

        {isVisible && (
          <div
            className="border-draw absolute left-1/2 -translate-x-1/2 mt-8 w-80 max-w-[90vw] border border-emerald-500/60 bg-black/80 backdrop-blur-sm p-4 rounded"
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
              {!isTypingFinished && !isFadingOut && (
                <span className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-[2px] animate-pulse" />
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Name;
