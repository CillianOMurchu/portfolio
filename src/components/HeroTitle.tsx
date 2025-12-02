import React from "react";
import "./HeroTitle.anim.css";

interface HeroTitleProps {
  className?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = () => {
  const items = [
    { text: "SASS", className: " text-8xl lg:text-[12rem] xl:text-[14rem]" },
    {
      text: "Hospitality",
      className: "text-6xl lg:text-[8rem] xl:text-[10rem]",
    },
    { text: "iGaming", className: "text-8xl lg:text-[12rem] xl:text-[14rem]" },
  ];

  return (
    <div
      className="hero-title "
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: -1,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {items.map((item, i) => (
          <button
            key={item.text}
            className={`block text-slate-500/15${item.text === "Hospitality" ? "" : " font-bold"} ${item.className} whitespace-nowrap transition-shadow duration-200`}
            style={{
              opacity: 0,
              transform: "translateY(80px)",
              animation: `flyInUp 0.8s cubic-bezier(.4,0,.2,1) forwards`,
              animationDelay: `${i * 0.5}s`,
              textAlign: "center",
              width: "100%",
              left: 0,
              right: 0,
              margin: "0 auto",
              position: "relative",
              ...(item.text === "Hospitality" ? {} : { fontWeight: 700 }),
            }}
            aria-label={item.text}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--neon-glow-primary)";
              e.currentTarget.style.color = "var(--color-accent-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.color = "";
            }}
          >
            {item.text}
          </button>
        ))}
      </div>
      <style>{`
            @keyframes flyInUp {
              0% {
                opacity: 0;
                transform: translateY(80px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
    </div>
  );
};

export default HeroTitle;
