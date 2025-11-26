import React from "react";
import HeroTitle from "../HeroTitle";
import ItemSphere from "../ItemSphere";

const HomeScreen: React.FC = () => {
  return (
    <div className="home-screen">
      <ItemSphere />
      <HeroTitle />
    </div>
  );
};

export default HomeScreen;
