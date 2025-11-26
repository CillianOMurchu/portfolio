import React, { useState } from "react";
import ItemSphere from "./ItemSphere";

const ToggleSphere: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => setVisible((v) => !v)}
        className="fixed top-4 right-4 z-50 px-2 py-1 text-xs border-2 border-emerald-400 neon-glow-primary bg-transparent text-emerald-300 rounded shadow-lg hover:border-emerald-300 hover:text-emerald-200 transition"
        style={{
          minWidth: "80px",
          fontSize: "0.85rem",
        }}
      >
        {visible ? "Hide Tech" : "Display Tech"}
      </button>
      {visible && <ItemSphere />}
    </>
  );
};

export default ToggleSphere;
