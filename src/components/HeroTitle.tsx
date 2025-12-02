import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroTitle.anim.css";

interface HeroTitleProps {
  className?: string;
}

const HeroTitle: React.FC<HeroTitleProps> = () => {

  const navigate = useNavigate();
  
  const items = [
    { text: "SASS", className: " text-8xl lg:text-[12rem] xl:text-[14rem]" },
    {
      text: "Hospitality",
      className: "text-6xl lg:text-[8rem] xl:text-[10rem]",
    },
    { text: "iGaming", className: "text-8xl lg:text-[12rem] xl:text-[14rem]" },
  ];

  const handleClick = (text: string) => {
    // const navigate = useNavigate();
    const itemIndex = items.findIndex((item) => item.text === text);
    const buttons = document.querySelectorAll(".hero-title button");
    const button = buttons[itemIndex];
    if (!button) return;

    // Split text into spans if not already
    if (!button.querySelector("span")) {
      button.innerHTML = "";
      Array.from(text).forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.transition =
          "transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.6s";
        span.style.transitionDelay = `${i * 0.05}s`;
        button.appendChild(span);
      });
    }

    // Animate each letter
    const spans = button.querySelectorAll("span");
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.style.transform = `translateY(-120px) scale(1.2) rotate(${(i % 2 ? 1 : -1) * 30}deg)`;
        span.style.opacity = "0";
      }, i * 50);
      setTimeout(() => {
      }, 1000);
    });

    // Navigate after animation
    // setTimeout(
    //   () => {
    //     navigate(`/${text.toLowerCase()}`);
    //   },
    //   spans.length * 50 + 600
    // );
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
            onAnimationEnd={(e) => {
              animationEnded();
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
