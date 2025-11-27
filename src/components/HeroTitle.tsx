import React from "react";
import "./HeroTitle.anim.css";

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
          {[
            { text: "Fintech", className: "text-8xl lg:text-[12rem] xl:text-[14rem]" },
            { text: "Hospitality", className: "text-6xl lg:text-[8rem] xl:text-[10rem]" },
            { text: "iGaming", className: "text-8xl lg:text-[12rem] xl:text-[14rem]" },
          ].map((item, i) => (
            <span
              key={item.text}
              className={`block text-slate-500/15 ${item.className} whitespace-nowrap`}
              style={{
                opacity: 0,
                transform: "translateX(-80px)",
                animation: `fadeSlideIn 0.8s cubic-bezier(.4,0,.2,1) forwards`,
                animationDelay: `${i * 0.5}s`,
                textAlign: "center",
                width: "100%",
                left: 0,
                right: 0,
                margin: "0 auto",
                position: "relative",
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTitle;
