import React from "react";

interface RedVelvetBackgroundProps {
  children?: React.ReactNode;
  noteCount?: number;
  noteColor?: string;
  noteOpacity?: number;
  rainSpeed?: "slow" | "medium" | "fast";
  className?: string;
  style?: React.CSSProperties;
}

export const RedVelvetBackground: React.FC<RedVelvetBackgroundProps> = ({
  children,
  noteCount = 25,
  noteColor = "text-rose-400",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`red-velvet-background relative h-[100vh] bg-gradient-to-br from-slate-900 via-red-950 to-slate-950 ${className}`}
      style={style}
    >
      {children && <div className="relative z-10 size-full">{children}</div>}
    </div>
  );
};

export default RedVelvetBackground;
