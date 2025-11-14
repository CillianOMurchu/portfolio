import React from "react";

interface HeroTitleProps {
  className?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = () => {
  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-4">
                <span
                  className="flex text-slate-500/15 tracking-wider w-screen text-center justify-center"
                  style={{ fontSize: "clamp(2.5rem, 16vw, 7.5rem)", width: "100vw" }}
                >
                  Fintech
                </span>
                <span
                  className="flex text-slate-500/15 tracking-wider w-screen text-center justify-center"
                  style={{ fontSize: "clamp(2.5rem, 16vw, 7.5rem)", width: "100vw" }}
                >
                  Hospitality
                </span>
                <span
                  className="flex text-slate-500/15 tracking-wider w-screen text-center justify-center"
                  style={{ fontSize: "clamp(2.5rem, 16vw, 7.5rem)", width: "100vw" }}
                >
                  iGaming
                </span>
        </div>
      </div>

    </div>
  );
};

export default HeroTitle;
