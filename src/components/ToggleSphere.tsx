import React, { useState } from "react";

type ToggleSphereProps = {
  onToggle?: (next: boolean) => void;
};

const ToggleSphere: React.FC<ToggleSphereProps> = ({ onToggle }) => {
  const [toggled, setToggled] = useState(false);
  const pillWidth = typeof window !== "undefined" && window.innerWidth < 500 ? 44 : 64;
  const pillHeight = typeof window !== "undefined" && window.innerWidth < 500 ? 22 : 32;

  const handleToggle = () => {
    const next = !toggled;
    setToggled(next);
    if (onToggle) onToggle(next);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={handleToggle}
        aria-label={toggled ? "Hide Tech Sphere" : "Show Tech Sphere"}
        style={{
          width: pillWidth + "px",
          height: pillHeight + "px",
          borderRadius: pillHeight / 2 + "px",
          border: `2px solid var(--color-accent-primary)`,
          background: toggled ? "var(--color-bg-surface)" : "var(--color-bg-primary)",
          boxShadow: toggled
            ? `var(--neon-glow-primary)`
            : `0 0 8px 2px var(--color-accent-primary)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          transition: "border 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
          cursor: "pointer",
          outline: "none",
          padding: "0 8px",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: toggled
              ? `calc(${pillWidth - pillHeight * 0.6 - 8}px)`
              : "4px",
            top: "50%",
            transform: "translateY(-50%)",
            width: pillHeight * 0.6 + "px",
            height: pillHeight * 0.6 + "px",
            borderRadius: "50%",
            background: toggled ? "var(--color-accent-primary)" : "var(--color-accent-secondary)",
            boxShadow: toggled ? `var(--neon-glow-primary)` : "var(--neon-glow-secondary)",
            border: `2px solid var(--color-accent-primary)`,
            transition: "left 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </button>
    </div>
  );
};

export default ToggleSphere;
