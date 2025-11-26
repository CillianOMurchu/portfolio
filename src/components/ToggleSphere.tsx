import React, { useState } from "react";
import { FaLaptopCode, FaRegCircle } from "react-icons/fa";

const NEON_GREEN = "#34d399";
const NEON_GREY = "#64748b";

type ToggleSphereProps = {
  onToggle?: (next: boolean) => void;
};

const ToggleSphere: React.FC<ToggleSphereProps> = ({ onToggle }) => {
  const [toggled, setToggled] = useState(false);
  const pillWidth =
    typeof window !== "undefined" && window.innerWidth < 500 ? 44 : 64;
  const pillHeight =
    typeof window !== "undefined" && window.innerWidth < 500 ? 22 : 32;
  const iconSize = pillHeight - 8;

  const handleToggle = () => {
    const next = !toggled;
    setToggled(next);
    if (onToggle) onToggle(next);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={handleToggle}
        className="neon-toggle-switch"
        aria-label={toggled ? "Hide Tech Sphere" : "Show Tech Sphere"}
        style={{
          width: pillWidth + "px",
          height: pillHeight + "px",
          borderRadius: pillHeight / 2 + "px",
          border: `2px solid ${NEON_GREEN}`,
          background: toggled ? NEON_GREEN : NEON_GREY,
          boxShadow: `0 0 12px 2px ${NEON_GREEN}80`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          transition: "background 0.3s cubic-bezier(.4,0,.2,1)",
          cursor: "pointer",
          outline: "none",
          padding: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: toggled ? pillWidth / 2 + "px" : "4px",
            top: "2px",
            width: iconSize + "px",
            height: iconSize + "px",
            borderRadius: "50%",
            background: "#0f172a",
            boxShadow: `0 0 8px 2px ${NEON_GREEN}80`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "left 0.3s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {toggled ? "tech" : "tech"}
        </span>
      </button>
    </div>
  );
};

export default ToggleSphere;
