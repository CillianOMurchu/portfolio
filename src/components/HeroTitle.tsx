import React from "react";
import "./HeroTitle.anim.css";

type ItemType = "SASS" | "Hospitality" | "iGaming" | null;

interface HeroTitleProps {
  className?: string;
  onItemClick?: (item: ItemType) => void;
  selectedItem?: ItemType;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ onItemClick, selectedItem }) => {
  const items = [
    { text: "SASS", className: " text-8xl lg:text-[12rem] xl:text-[14rem]" },
    {
      text: "Hospitality",
      className: "text-6xl lg:text-[8rem] xl:text-[10rem]",
    },
    { text: "iGaming", className: "text-8xl lg:text-[12rem] xl:text-[14rem]" },
  ];

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, item: string) => {
    // Apply glow if nothing is selected, or if this is the selected item
    if (!selectedItem || selectedItem === (item as ItemType)) {
      e.currentTarget.style.boxShadow = "var(--neon-glow-primary)";
      e.currentTarget.style.color = "var(--color-accent-primary)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = "";
    e.currentTarget.style.color = "";
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
            className={`block text-slate-500/15${item.text === "Hospitality" ? "" : " font-bold"} ${item.className} whitespace-nowrap transition-all duration-300 cursor-pointer`}
            style={{
              opacity: selectedItem && selectedItem !== (item.text as ItemType) ? 0.3 : undefined,
              transform: selectedItem && selectedItem !== (item.text as ItemType)
                ? "scale(0.9) translateY(20px)" 
                : "translateY(0)",
              animation: `flyInUp 0.8s cubic-bezier(.4,0,.2,1) forwards`,
              animationDelay: `${i * 0.5}s`,
              textAlign: "center",
              width: "100%",
              left: 0,
              right: 0,
              margin: "0 auto",
              position: "relative",
              willChange: "opacity, transform",
              ...(item.text === "Hospitality" ? {} : { fontWeight: 700 }),
            }}
            aria-label={item.text}
            onClick={() => onItemClick?.(item.text as ItemType)}
            title={selectedItem === (item.text as ItemType) ? "Click to deactivate" : "Click to explore"}
            onMouseEnter={(e) => handleMouseEnter(e, item.text)}
            onMouseLeave={handleMouseLeave}
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
