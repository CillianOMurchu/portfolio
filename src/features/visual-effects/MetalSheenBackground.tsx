import React from "react";

interface MetalSheenBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Metal sheen effect using gradients and highlights
export const MetalSheenBackground: React.FC<MetalSheenBackgroundProps> = ({
  children,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`metal-sheen-background relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #23272a 0%, #4b5563 40%, #d1d5db 60%, #23272a 100%)",
        position: "relative",
        ...style,
      }}
    >
      {/* Sheen highlight */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 20%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)",
          mixBlendMode: "screen",
        }}
      />
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
};

export default MetalSheenBackground;
