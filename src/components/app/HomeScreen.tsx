import React from "react";
import HeroTitle from "../HeroTitle";
import ItemSphere from "../ItemSphere";
import ToggleSphere from "../ToggleSphere";

const HomeScreen: React.FC = () => {
  return (
    <div className="home-screen">
      <ToggleSphere />
      <HeroTitle />
    </div>
  );
};

export default HomeScreen;
