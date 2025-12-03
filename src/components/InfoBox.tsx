import React from "react";

interface InfoBoxProps {
  isVisible: boolean;
  displayedText: string;
  showText: boolean;
  isActive: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  isVisible,
  displayedText,
  showText,
  isActive,
}) => {
  if (!isVisible) return null;

  return (
    <>
      <style>{`
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
          animation: exit-sequence 0.8s cubic-bezier(.25,.75,.5,1.25) forwards;
          overflow: hidden;
        }

        @keyframes exit-sequence {
          0% { width: 320px; height: auto; opacity: 1; }
          30% { width: 320px; height: auto; opacity: 0; }
          60% { width: 0px; height: auto; opacity: 0; }
          100% { width: 0px; height: 0px; opacity: 0; }
        }
      `}</style>
      <div
        className={`info-box border-draw absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[90vw] border border-accent-subtle bg-black/80 backdrop-blur-sm p-4 rounded ${
          isActive ? "" : "fade-out"
        }`}
        style={{
          boxShadow: `0 0 10px rgba(16,185,129,0.3), 0 0 20px rgba(16,185,129,0.2), inset 0 0 20px rgba(16,185,129,0.05)`,
          maxWidth: "calc(100vw - 2rem)", // Ensure it respects screen boundaries
          zIndex: 10, // Ensure it's above other content
        }}
      >
        <p
          className="text-accent text-sm tracking-wide leading-relaxed"
          style={{
            textShadow: "0 0 3px rgba(16,185,129,0.5)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {displayedText}
          {showText && (
            <span className="inline-block w-[2px] h-[1em] bg-accent ml-[2px] animate-pulse" />
          )}
        </p>
      </div>
    </>
  );
};

export default InfoBox;