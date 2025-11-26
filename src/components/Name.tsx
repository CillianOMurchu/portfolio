import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useOrbOrigin } from "./OrbOriginContext";
import "./NameAnimations.css";

interface NameDisplayProps {
  name: string;
  letters: string[];
  oIndex: number;
  oCharRef: React.RefObject<HTMLSpanElement | null>;
}
const NameDisplay: React.FC<NameDisplayProps> = ({
  letters,
  oIndex,
  oCharRef,
}) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <span
      className="text-emerald-400 text-[11px] tracking-wider"
      style={{
        textShadow:
          "0 0 5px rgba(16,185,129,0.8),0 0 10px rgba(16,185,129,0.6),0 0 15px rgba(16,185,129,0.4),0 0 20px rgba(16,185,129,0.3)",
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
);

// InfoBox component for bio text and typing effect
interface InfoBoxProps {
  showText: boolean;
  displayedText: string;
  bioText: string;
}
const InfoBox: React.FC<InfoBoxProps> = ({
  showText,
  displayedText,
  bioText,
}) => (
  <div
    className="info-box absolute left-0 mt-8 w-80 max-w-[calc(100vw-40px)] h-24 border border-emerald-500/60 bg-black/80 backdrop-blur-sm p-4 rounded"
    style={{
      boxShadow:
        "0 0 10px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.2), inset 0 0 20px rgba(16,185,129,0.05)",
    }}
  >
    <p
      className="text-emerald-400 text-sm tracking-wide leading-relaxed"
      style={{
        textShadow: "0 0 3px rgba(16,185,129,0.5)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {displayedText}
      {showText && displayedText.length < bioText.length && (
        <span className="inline-block w-[2px] h-[1em] bg-emerald-400 ml-[2px] animate-pulse" />
      )}
    </p>
  </div>
);

// OrbTrace component for animated orb
interface OrbTraceProps {
  isHovered: boolean;
  orbStart: { x: number; y: number };
}
const OrbTrace: React.FC<OrbTraceProps> = ({ isHovered, orbStart }) =>
  isHovered ? (
    <div
      className="orb orb-trace"
      style={{ left: `${orbStart.x}%`, top: `${orbStart.y}%` }}
    />
  ) : null;

// Main Name component
export function Name() {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [orbStart, setOrbStart] = useState({ x: 50, y: 100 });
  const oCharRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const name = "CILLIAN Ó MURCHÚ";
  const letters = name.split("");
  const oIndex = name.indexOf("Ó");

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

  // Hover logic for info box
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isHovered]);

  // Orb position sharing
  const { setOrbOrigin, setOCharPosition } = useOrbOrigin();
  useLayoutEffect(() => {
    if (oCharRef.current) {
      const oRect = oCharRef.current.getBoundingClientRect();
      const center = {
        x: oRect.left + oRect.width / 2,
        y: oRect.top + oRect.height / 2,
      };
      setOrbOrigin(center);
      setOCharPosition(center);
    }
    if (isHovered && oCharRef.current && containerRef.current) {
      const oRect = oCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const oCenterX = oRect.left + oRect.width / 2;
      const oCenterY = oRect.top + oRect.height / 2;
      const xPercent =
        ((oCenterX - containerRect.left) / containerRect.width) * 100;
      const yPercent =
        ((oCenterY - containerRect.top) / containerRect.height) * 100;
      setOrbStart({ x: xPercent, y: yPercent });
    }
  }, [isHovered, name, setOrbOrigin, setOCharPosition]);

  const hexagonClip =
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

  return (
    <div className="relative">
      <div
        className="relative w-40 h-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        <div className="absolute inset-0" />
        <div
          className="absolute inset-3 border border-emerald-500/25"
          style={{ clipPath: hexagonClip }}
        />
        <NameDisplay
          name={name}
          letters={letters}
          oIndex={oIndex}
          oCharRef={oCharRef}
        />
        <OrbTrace isHovered={isHovered} orbStart={orbStart} />
      </div>
      {isHovered && (
        <InfoBox
          showText={showText}
          displayedText={displayedText}
          bioText={bioText}
        />
      )}
    </div>
  );
}
