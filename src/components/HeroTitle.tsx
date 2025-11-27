import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroTitle.anim.css";

interface HeroTitleProps {
  className?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = () => {
  const items = [
    { text: "Fintech", className: " text-8xl lg:text-[12rem] xl:text-[14rem]" },
    {
      text: "Hospitality",
      className: "text-6xl lg:text-[8rem] xl:text-[10rem]",
    },
    { text: "iGaming", className: "text-8xl lg:text-[12rem] xl:text-[14rem]" },
  ];
  const navigate = useNavigate();
  const handleClick = (name: string) => {
    navigate(`/${name.toLowerCase()}`);
  };
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
            className={`block text-slate-500/15${item.text === "Hospitality" ? "" : " font-bold"} ${item.className} whitespace-nowrap`}
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
              ...(item.text === "Hospitality" ? {} : { fontWeight: 700 }),
            }}
            onClick={() => handleClick(item.text)}
            aria-label={`Go to ${item.text}`}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroTitle;
