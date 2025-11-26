import React, { useState } from "react";
import ItemSphere from "./ItemSphere";
import { FaLaptopCode } from "react-icons/fa";

const ToggleSphere: React.FC = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <button
        onClick={() => setVisible((v) => !v)}
        className="absolute top-4 right-4 z-50 px-2 py-1 text-xs  neon-glow-primary bg-transparent text-emerald-300 rounded shadow-lg  hover:text-emerald-200 transition flex items-center justify-center"
        style={{
          minWidth: "48px",
          minHeight: "48px",
          fontSize: "1rem",
        }}
        aria-label={visible ? "Hide Tech" : "Display Tech"}
      >
        {visible ? "Hide Tech Sphere" : <FaLaptopCode />}
      </button>
      {visible && <ItemSphere />}
    </>
  );
};

export default ToggleSphere;
