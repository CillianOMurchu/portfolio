import React from "react";
import HeroTitle from "../HeroTitle";
import ItemSphere from "../ItemSphere";

const HomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="name">
        <HeroTitle />
      </div>

      <div
        className="sphere"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
        }}
      >
        <ItemSphere />
      </div>
    </div>
  );
};

export default HomeScreen;
