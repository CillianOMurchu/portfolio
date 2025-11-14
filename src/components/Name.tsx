const hexagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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

      // Step 1: Show info box (orbs are already animating via CSS)
      queue.add(createAnimationStep(
        'show-info-box',
        () => setIsVisible(true),
        0
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFadingOut ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 mt-4 p-4 bg-black/80 backdrop-blur-sm border border-emerald-500/30 rounded-lg shadow-lg max-w-md"
          >
            <p className="text-emerald-400 font-mono text-lg leading-relaxed">
              {displayedText}
              {!isTypingFinished && !isFadingOut && <span className="animate-pulse">|</span>}
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Name;
