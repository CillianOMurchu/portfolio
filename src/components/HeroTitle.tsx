import React from "react";

interface HeroTitleProps {
  className?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: -1,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <span className="block text-slate-500/15 text-8xl lg:text-[12rem] xl:text-[14rem] whitespace-nowrap">
            Fintech
          </span>
          <span className="block text-slate-500/15 text-6xl lg:text-[12rem] xl:text-[14rem] whitespace-nowrap">
            Hospitality
          </span>
          <span className="block text-slate-500/15 text-8xl lg:text-[12rem] xl:text-[14rem] whitespace-nowrap">
            iGaming
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroTitle;
