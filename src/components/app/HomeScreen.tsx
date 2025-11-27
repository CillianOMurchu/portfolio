import React, { useState } from "react";
import HeroTitle from "../HeroTitle";
import ToggleSphere from "../ToggleSphere";
import ItemSphere from "../ItemSphere";

const HomeScreen: React.FC = () => {
  const [showSphere, setShowSphere] = useState(true);
  return (
    <div className="home-screen">
      <ToggleSphere
        onToggle={(next) => setShowSphere(next)}
      />
      <HeroTitle />
      <div
        className="sphere"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: showSphere ? "auto" : "none",
          opacity: showSphere ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <ItemSphere />
      </div>
    </div>
  );
};

export default HomeScreen;
